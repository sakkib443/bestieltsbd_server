import { Request, Response } from "express";
import { AIChatService } from "./aiChat.service";
import { AIChatTopic, AIChatRequest } from "./aiChat.interface";

// Validate body shape lightly (zod would be overkill for this internal endpoint)
function isValidTopic(t: any): t is AIChatTopic {
    return t === "listening" || t === "reading";
}

function isValidBody(b: any): b is AIChatRequest {
    if (!b || typeof b !== "object") return false;
    if (!b.message || typeof b.message !== "object") return false;
    if (!["user", "model"].includes(b.message.role)) return false;
    return true;
}

export const AIChatController = {
    async chat(req: Request, res: Response): Promise<void> {
        const topic = req.params.topic;
        if (!isValidTopic(topic)) {
            res.status(400).json({ success: false, message: "Invalid topic — use 'listening' or 'reading'" });
            return;
        }
        if (!isValidBody(req.body)) {
            res.status(400).json({ success: false, message: "Invalid body — expect { message: { role, text?, attachments? }, history?: [...] }" });
            return;
        }

        try {
            const result = await AIChatService.chat(topic, req.body as AIChatRequest);
            res.json({ success: true, data: result });
        } catch (err: any) {
            // eslint-disable-next-line no-console
            console.error("[aiChat] error:", err?.message || err);
            res.status(500).json({
                success: false,
                message: err?.message || "AI chat failed",
            });
        }
    },
};
