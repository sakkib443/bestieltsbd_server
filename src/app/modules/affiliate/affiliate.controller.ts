import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AffiliateService } from "./affiliate.service";

// =================== USER ROUTES ===================

const register = catchAsync(async (req: Request, res: Response) => {
    const result = await AffiliateService.register(req.user._id, req.body);
    res.status(201).json({
        success: true,
        message: "Affiliate registration successful! You can start sharing your link now.",
        data: result,
    });
});

const getMyInfo = catchAsync(async (req: Request, res: Response) => {
    const result = await AffiliateService.getMyInfo(req.user._id);
    res.json({ success: true, data: result });
});

const getMyCommissions = catchAsync(async (req: Request, res: Response) => {
    const result = await AffiliateService.getMyCommissions(req.user._id);
    res.json({ success: true, data: result });
});

const getMyStats = catchAsync(async (req: Request, res: Response) => {
    const result = await AffiliateService.getMyStats(req.user._id);
    res.json({ success: true, data: result });
});

const requestWithdrawal = catchAsync(async (req: Request, res: Response) => {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
        return res.status(400).json({ success: false, message: "Valid amount is required" });
    }
    const result = await AffiliateService.requestWithdrawal(req.user._id, Number(amount));
    res.status(201).json({
        success: true,
        message: "Withdrawal request submitted successfully",
        data: result,
    });
});

const updatePaymentInfo = catchAsync(async (req: Request, res: Response) => {
    const result = await AffiliateService.updatePaymentInfo(req.user._id, req.body);
    res.json({ success: true, message: "Payment info updated", data: result });
});

const setCustomCode = catchAsync(async (req: Request, res: Response) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ success: false, message: "Code is required" });
    const result = await AffiliateService.setCustomCode(req.user._id, code);
    res.json({ success: true, message: "Custom code set successfully", data: result });
});

// =================== PUBLIC ===================

const trackClick = catchAsync(async (req: Request, res: Response) => {
    const { code } = req.query;
    if (!code) return res.status(400).json({ success: false, message: "Referral code required" });
    const result = await AffiliateService.trackClick(code as string);
    res.json({ success: true, data: result });
});

// =================== ADMIN ===================

const getAllAffiliates = catchAsync(async (req: Request, res: Response) => {
    const result = await AffiliateService.getAllAffiliates();
    res.json({ success: true, data: result });
});

const getAllWithdrawals = catchAsync(async (req: Request, res: Response) => {
    const status = req.query.status as string | undefined;
    const result = await AffiliateService.getAllWithdrawals(status);
    res.json({ success: true, data: result });
});

const processWithdrawal = catchAsync(async (req: Request, res: Response) => {
    const { action, transactionId, adminNote } = req.body;
    if (!action || !["complete", "reject"].includes(action)) {
        return res.status(400).json({ success: false, message: "Action must be 'complete' or 'reject'" });
    }
    const result = await AffiliateService.processWithdrawal(
        req.params.id, action, req.user._id, { transactionId, adminNote }
    );
    res.json({ success: true, message: `Withdrawal ${action}d`, data: result });
});

const updateAffiliate = catchAsync(async (req: Request, res: Response) => {
    const result = await AffiliateService.updateAffiliate(req.params.id, req.body);
    res.json({ success: true, message: "Affiliate updated", data: result });
});

const getAnalytics = catchAsync(async (req: Request, res: Response) => {
    const result = await AffiliateService.getAffiliateAnalytics();
    res.json({ success: true, data: result });
});

export const AffiliateController = {
    register,
    getMyInfo,
    getMyCommissions,
    getMyStats,
    requestWithdrawal,
    updatePaymentInfo,
    setCustomCode,
    trackClick,
    // Admin
    getAllAffiliates,
    getAllWithdrawals,
    processWithdrawal,
    updateAffiliate,
    getAnalytics,
};
