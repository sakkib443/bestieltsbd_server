import { Request, Response } from "express";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import config from "../../config";

// Get all users (admin + super-admin accounts)
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({})
            .select("-password")
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to retrieve users",
        });
    }
};

// Create a new user (admin or super-admin)
const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, password, role } = req.body;

        // Only super-admin can create users
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, phone, and password are required",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists",
            });
        }

        // Create user with specified or default role
        const validRoles = ["user", "admin", "super-admin"];
        const userRole = validRoles.includes(role) ? role : "admin";

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            phone,
            password,
            role: userRole,
        });

        res.status(201).json({
            success: true,
            message: `${userRole === "super-admin" ? "Super Admin" : "Admin"} created successfully`,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                createdAt: user.createdAt,
            },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to create user",
        });
    }
};

// Delete a user
const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const currentUser = (req as any).user;

        // Cannot delete yourself
        if (currentUser._id.toString() === id) {
            return res.status(400).json({
                success: false,
                message: "You cannot delete your own account",
            });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete user",
        });
    }
};

// Update user role
const updateRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const currentUser = (req as any).user;

        // Cannot change your own role
        if (currentUser._id.toString() === id) {
            return res.status(400).json({
                success: false,
                message: "You cannot change your own role",
            });
        }

        const validRoles = ["user", "admin", "super-admin"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role. Must be: user, admin, or super-admin",
            });
        }

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: `User role updated to ${role}`,
            data: user,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to update role",
        });
    }
};

export const UserController = {
    getAllUsers,
    createUser,
    deleteUser,
    updateRole,
};
