import { Router } from "express";
import { AIChatController } from "./aiChat.controller";
import { auth, authorize } from "../../middlewares/auth";

const router = Router();

// Admin-only AI chat for question structuring.
// Topic is one of: "listening" | "reading".
// Body must already contain base64-encoded attachments — DO NOT send multipart files here.
// Body size limit is bumped in app.ts (see AI_BODY_LIMIT).
router.post(
    "/:topic",
    auth,
    authorize("admin", "mentor"),
    AIChatController.chat,
);

export const AIChatRoutes = router;
