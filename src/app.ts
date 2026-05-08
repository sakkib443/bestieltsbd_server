import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { ensureDbConnection } from "./app/config/db";

const app: Application = express();

// middleware
// Bumped JSON body limit to 25 MB so the AI-chat endpoint can accept base64-encoded images / PDFs.
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(cors({
  origin: [
    "https://bestieltsbd.vercel.app",
    "http://localhost:3000",
  ],
  credentials: true,
}));

// Serve locally uploaded files (e.g. videos uploaded via Design > Videos > Local)
// NOTE: On read-only / serverless platforms (e.g. Vercel) local writes won't persist,
// in which case admins should use Cloudinary or YouTube source instead.
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Ensure DB connection before processing requests (for Vercel serverless)
app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ensureDbConnection();
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Database connection failed" });
  }
});

// API routes
app.use("/api", router);

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Best IELTS BD API is running!",
    version: "1.0.0",
  });
});

// Global error handler
app.use(globalErrorHandler);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
