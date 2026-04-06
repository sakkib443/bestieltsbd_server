import mongoose from "mongoose";

// MongoDB connection cache for serverless environments
let isConnected = false;
let connectionPromise: Promise<typeof mongoose> | null = null;

export const connectDB = async (): Promise<typeof mongoose> => {
    // If already connected, return immediately
    if (isConnected && mongoose.connection.readyState === 1) {
        return mongoose;
    }

    // If connection is in progress, wait for it
    if (connectionPromise) {
        return connectionPromise;
    }

    // Create new connection with optimized settings for serverless
    connectionPromise = mongoose.connect(process.env.DATABASE_URL as string, {
        maxPoolSize: 5,           // Reduced for serverless (fewer concurrent ops)
        minPoolSize: 1,           // Keep at least 1 alive
        serverSelectionTimeoutMS: 3000,  // Fail faster on connection issues
        socketTimeoutMS: 30000,   // Reduced from 45s — fail faster on stuck queries
        heartbeatFrequencyMS: 10000,     // Keep connection alive with heartbeats
        bufferCommands: false,
        autoIndex: process.env.NODE_ENV !== "production",  // Skip index building in prod
    }).then((db) => {
        isConnected = true;
        console.log("MongoDB connected (cached)");
        return db;
    }).catch((err) => {
        connectionPromise = null;
        isConnected = false;
        throw err;
    });

    // Listen for disconnection events to reset state
    mongoose.connection.on("disconnected", () => {
        isConnected = false;
        connectionPromise = null;
    });

    return connectionPromise;
};

// For Vercel serverless: ensure connection before each request
export const ensureDbConnection = async () => {
    if (mongoose.connection.readyState !== 1) {
        await connectDB();
    }
};
