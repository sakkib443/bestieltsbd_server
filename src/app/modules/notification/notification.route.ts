import express from "express";
import { NotificationController } from "./notification.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth("admin", "super-admin"), NotificationController.getAll);
router.get("/unread-count", auth("admin", "super-admin"), NotificationController.getUnreadCount);
router.patch("/read-all", auth("admin", "super-admin"), NotificationController.markAllRead);
router.patch("/:id/read", auth("admin", "super-admin"), NotificationController.markOneRead);

export const NotificationRoutes = router;
