import { Request, Response } from "express";
import { NotificationService } from "./notification.service";

const getAll = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 50;
        const data = await NotificationService.getAll(limit);
        res.status(200).json({ success: true, data });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getUnreadCount = async (req: Request, res: Response) => {
    try {
        const count = await NotificationService.getUnreadCount();
        res.status(200).json({ success: true, data: { count } });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const markAllRead = async (req: Request, res: Response) => {
    try {
        await NotificationService.markAllRead();
        res.status(200).json({ success: true, message: "All notifications marked as read" });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const markOneRead = async (req: Request, res: Response) => {
    try {
        await NotificationService.markOneRead(req.params.id);
        res.status(200).json({ success: true, message: "Notification marked as read" });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const NotificationController = { getAll, getUnreadCount, markAllRead, markOneRead };
