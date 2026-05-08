import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const MONGODB_URI =
  process.env.DATABASE_URL || "mongodb://localhost:27017/besiieltsbd";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection not established");
    }
    const usersCollection = db.collection("users");

    // Check if admin already exists
    const existing = await usersCollection.findOne({ email: "admin@gmail.com" });
    if (existing) {
      console.log("Admin user already exists!");
      await mongoose.disconnect();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin@gmail.com", 12);

    // Insert admin user
    await usersCollection.insertOne({
      name: "Admin",
      email: "admin@gmail.com",
      phone: "01700000000",
      nid: "",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("✅ Admin user created successfully!");
    console.log("   Email: admin@gmail.com");
    console.log("   Password: admin@gmail.com");
    console.log("   Role: admin");

    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Error seeding admin:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedAdmin();
