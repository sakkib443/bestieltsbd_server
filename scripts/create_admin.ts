import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import { User } from "../src/app/modules/user/user.model";

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), ".env") });

const createAdmin = async () => {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is not defined in .env");
        }

        console.log("Connecting to database...");
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to MongoDB!");

        const adminData = {
            name: "Admin User",
            email: "admin@gmail.com",
            phone: "01335202802", // Using the updated number from previous turns
            password: "admin@gmail.com",
            role: "admin",
        };

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminData.email });
        if (existingAdmin) {
            console.log("Admin user already exists!");
            process.exit(0);
        }

        // The password hashing is handled by the model's pre-save hook
        const newAdmin = await User.create(adminData);

        console.log("Admin user created successfully!");
        console.log("Email:", newAdmin.email);
        console.log("Role:", newAdmin.role);

    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
        process.exit(0);
    }
};

createAdmin();
