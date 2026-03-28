import { Router } from "express";
import { SpeakingSessionController } from "./speakingSession.controller";
import { auth, authorize } from "../../middlewares/auth";

const router = Router();

// Student: submit speaking session
router.post("/submit", auth, SpeakingSessionController.submitSession);

// Student: get own session by examId
router.get("/exam/:examId", auth, SpeakingSessionController.getMySession);

// Student: poll grading status
router.get("/poll/:examId", auth, SpeakingSessionController.pollStatus);

// Admin: all sessions
router.get("/", auth, authorize("admin"), SpeakingSessionController.getAllSessions);

export const SpeakingSessionRoutes = router;
