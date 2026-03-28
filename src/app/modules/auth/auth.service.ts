import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from "../user/user.model";
import { IUser, ILoginCredentials } from "../user/user.interface";
import config from "../../config";
import { sendPasswordResetEmail, sendWelcomeEmail } from "../../utils/email.service";

// In-memory OTP store: email → { otp, expiresAt, resetToken? }
const otpStore = new Map<string, { otp: string; expiresAt: number; resetToken?: string }>();

const register = async (userData: IUser) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const emailDomain = userData.email.toLowerCase().split("@")[1];
    if (emailDomain === "bestieltsbd.com") {
        userData.role = "admin";
    }

    const user = await User.create(userData);

    // Send welcome email (non-blocking)
    sendWelcomeEmail({ name: user.name, email: user.email }).catch(() => {});

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        config.jwt_secret as jwt.Secret,
        { expiresIn: config.jwt_expires_in as jwt.SignOptions["expiresIn"] }
    );

    return {
        user: { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role },
        token,
    };
};


const login = async (credentials: ILoginCredentials) => {
    const { email, password } = credentials;

    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid email or password");

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        config.jwt_secret as jwt.Secret,
        { expiresIn: config.jwt_expires_in as jwt.SignOptions["expiresIn"] }
    );

    return {
        user: { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role },
        token,
    };
};

// Google OAuth — find or create user by Google account
const googleLogin = async (googleData: {
    email: string;
    name: string;
    googleId: string;
    picture?: string;
}) => {
    let user = await User.findOne({ email: googleData.email });

    if (!user) {
        // Auto-create account for Google users
        user = await User.create({
            name: googleData.name,
            email: googleData.email,
            googleId: googleData.googleId,
            picture: googleData.picture || "",
            password: await bcrypt.hash(googleData.googleId + Date.now().toString(), 10),
            role: "user",
            authProvider: "google",
        });
    } else {
        // Update googleId if not already stored
        if (!(user as any).googleId) {
            await User.findByIdAndUpdate(user._id, {
                googleId: googleData.googleId,
                authProvider: "google",
                picture: googleData.picture || (user as any).picture,
            });
        }
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        config.jwt_secret as jwt.Secret,
        { expiresIn: config.jwt_expires_in as jwt.SignOptions["expiresIn"] }
    );

    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            picture: (user as any).picture || googleData.picture,
        },
        token,
    };
};

const changePassword = async (userId: string, currentPassword: string, newPassword: string) => {
    const user = await User.findById(userId).select("+password");
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) throw new Error("Current password is incorrect");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return { message: "Password changed successfully" };
};

// ── Forgot Password: generate OTP and send email ──────────────────────────────
const forgotPassword = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("No account found with this email");

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(email, { otp, expiresAt });

    // Send OTP email
    await sendPasswordResetEmail({
        name: user.name,
        email: user.email,
        otp,
        expiresInMinutes: 10,
    });

    return { message: "OTP sent to your email" };
};

// ── Verify OTP: returns a one-time reset token ────────────────────────────────
const verifyOtp = async (email: string, otp: string) => {
    const record = otpStore.get(email);
    if (!record) throw new Error("No OTP requested for this email. Please request again.");
    if (Date.now() > record.expiresAt) {
        otpStore.delete(email);
        throw new Error("OTP has expired. Please request a new one.");
    }
    if (record.otp !== otp) throw new Error("Invalid OTP. Please try again.");

    // Generate a one-time reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    otpStore.set(email, { ...record, resetToken });

    return { resetToken };
};

// ── Reset Password: validate token and update password ────────────────────────
const resetPassword = async (email: string, resetToken: string, newPassword: string) => {
    const record = otpStore.get(email);
    if (!record || record.resetToken !== resetToken) {
        throw new Error("Invalid or expired reset token. Please request a new OTP.");
    }
    if (Date.now() > record.expiresAt) {
        otpStore.delete(email);
        throw new Error("Reset token has expired. Please request a new OTP.");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("User not found");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    otpStore.delete(email); // Invalidate token after use

    return { message: "Password reset successfully. You can now log in." };
};

export const AuthService = {
    register,
    login,
    googleLogin,
    forgotPassword,
    verifyOtp,
    resetPassword,
    changePassword,
};
