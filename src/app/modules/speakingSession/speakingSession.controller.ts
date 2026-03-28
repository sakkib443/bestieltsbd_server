import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SpeakingSessionService } from "./speakingSession.service";

const submitSession = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const result = await SpeakingSessionService.submitSpeakingSession({ ...req.body, userId });
    sendResponse(res, { statusCode: 200, success: true, message: result.message, data: result });
});

const getMySession = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const { examId } = req.params;
    const result = await SpeakingSessionService.getSessionByExam(userId, examId);
    sendResponse(res, { statusCode: 200, success: true, message: "Session fetched", data: result });
});

const pollStatus = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const { examId } = req.params;
    const result = await SpeakingSessionService.pollSessionStatus(userId, examId);
    sendResponse(res, { statusCode: 200, success: true, message: "Status fetched", data: result });
});

const getAllSessions = catchAsync(async (req: Request, res: Response) => {
    const result = await SpeakingSessionService.getAllSessions(req.query);
    sendResponse(res, { statusCode: 200, success: true, message: "Sessions fetched", data: result });
});

export const SpeakingSessionController = {
    submitSession,
    getMySession,
    pollStatus,
    getAllSessions,
};
