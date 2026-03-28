import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const register = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.register(req.body);
    sendResponse(res, { statusCode: 201, success: true, message: "User registered successfully", data: result });
});

const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);
    sendResponse(res, { statusCode: 200, success: true, message: "User logged in successfully", data: result });
});

// Google OAuth login/register
const googleLogin = catchAsync(async (req: Request, res: Response) => {
    const { email, name, googleId, picture } = req.body;
    if (!email || !googleId) {
        return sendResponse(res, { statusCode: 400, success: false, message: "Google email and ID are required", data: null });
    }
    const result = await AuthService.googleLogin({ email, name, googleId, picture });
    sendResponse(res, { statusCode: 200, success: true, message: "Google login successful", data: result });
});

// Step 1: Send OTP to email
const forgotPassword = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
        return sendResponse(res, { statusCode: 400, success: false, message: "Email is required", data: null });
    }
    const result = await AuthService.forgotPassword(email);
    sendResponse(res, { statusCode: 200, success: true, message: "OTP sent to your email", data: result });
});

// Step 2: Verify OTP
const verifyOtp = catchAsync(async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return sendResponse(res, { statusCode: 400, success: false, message: "Email and OTP are required", data: null });
    }
    const result = await AuthService.verifyOtp(email, otp);
    sendResponse(res, { statusCode: 200, success: true, message: "OTP verified successfully", data: result });
});

// Step 3: Reset password with verified token
const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const { email, resetToken, newPassword } = req.body;
    if (!email || !resetToken || !newPassword) {
        return sendResponse(res, { statusCode: 400, success: false, message: "Email, reset token and new password are required", data: null });
    }
    const result = await AuthService.resetPassword(email, resetToken, newPassword);
    sendResponse(res, { statusCode: 200, success: true, message: "Password reset successfully", data: result });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
        return sendResponse(res, { statusCode: 400, success: false, message: "Current password and new password are required", data: null });
    }
    const result = await AuthService.changePassword(userId, currentPassword, newPassword);
    sendResponse(res, { statusCode: 200, success: true, message: result.message, data: null });
});

export const AuthController = {
    register,
    login,
    googleLogin,
    forgotPassword,
    verifyOtp,
    resetPassword,
    changePassword,
};
