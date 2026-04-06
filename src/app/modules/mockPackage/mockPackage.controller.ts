import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { MockPackageService } from "./mockPackage.service";

// =================== MOCK PACKAGES ===================

const createPackage = catchAsync(async (req: Request, res: Response) => {
    const result = await MockPackageService.createPackage(req.body, req.user._id);
    res.status(201).json({
        success: true,
        message: "Mock package created successfully",
        data: result,
    });
});

const getAllPackages = catchAsync(async (req: Request, res: Response) => {
    const onlyActive = req.query.active === "true";
    const result = await MockPackageService.getAllPackages(onlyActive);
    res.json({
        success: true,
        data: result,
    });
});

const getActivePackages = catchAsync(async (req: Request, res: Response) => {
    const result = await MockPackageService.getAllPackages(true);
    res.json({
        success: true,
        data: result,
    });
});

// Get available set counts per module (public)
const getSetLimits = catchAsync(async (req: Request, res: Response) => {
    const result = await MockPackageService.getAvailableSetCounts();
    res.json({
        success: true,
        data: result,
    });
});

const getPackageById = catchAsync(async (req: Request, res: Response) => {
    const result = await MockPackageService.getPackageById(req.params.id);
    res.json({
        success: true,
        data: result,
    });
});

const updatePackage = catchAsync(async (req: Request, res: Response) => {
    const result = await MockPackageService.updatePackage(req.params.id, req.body);
    res.json({
        success: true,
        message: "Package updated successfully",
        data: result,
    });
});

const deletePackage = catchAsync(async (req: Request, res: Response) => {
    await MockPackageService.deletePackage(req.params.id);
    res.json({
        success: true,
        message: "Package deleted successfully",
    });
});

// =================== PURCHASES ===================

const claimFreeMock = catchAsync(async (req: Request, res: Response) => {
    const result = await MockPackageService.claimFreeMock(req.user._id);
    res.status(201).json({
        success: true,
        message: "Free mock test claimed successfully!",
        data: result,
    });
});

const purchaseMock = catchAsync(async (req: Request, res: Response) => {
    const { packageId, paymentMethod, transactionId, couponCode, bundleSize, customPrice } = req.body;

    if (!packageId || !paymentMethod || !transactionId) {
        return res.status(400).json({
            success: false,
            message: "Package ID, payment method and transaction ID are required",
        });
    }

    const result = await MockPackageService.purchaseMock(
        req.user._id,
        packageId,
        paymentMethod,
        transactionId,
        couponCode,
        bundleSize,
        customPrice
    );

    res.status(201).json({
        success: true,
        message: "Mock test purchased successfully!",
        data: result,
    });
});

const getMyPurchases = catchAsync(async (req: Request, res: Response) => {
    const result = await MockPackageService.getMyPurchases(req.user._id);
    res.json({
        success: true,
        data: result,
    });
});

const checkFreeMockStatus = catchAsync(async (req: Request, res: Response) => {
    const hasUsed = await MockPackageService.hasUsedFreeMock(req.user._id);
    const freePkg = await MockPackageService.getFreePackage();
    res.json({
        success: true,
        data: {
            hasUsedFreeMock: hasUsed,
            freePackageAvailable: !!freePkg,
            freePackage: freePkg,
        },
    });
});

// =================== PAYMENTS ===================

const getPaymentHistory = catchAsync(async (req: Request, res: Response) => {
    const result = await MockPackageService.getPaymentHistory(req.user._id);
    res.json({
        success: true,
        data: result,
    });
});

// =================== ANALYTICS (Admin) ===================

const getAnalytics = catchAsync(async (req: Request, res: Response) => {
    const result = await MockPackageService.getAnalytics();
    res.json({
        success: true,
        data: result,
    });
});

// =================== COUPONS ===================

const validateCoupon = catchAsync(async (req: Request, res: Response) => {
    const { code, packagePrice } = req.body;
    if (!code || !packagePrice) {
        return res.status(400).json({
            success: false,
            message: "Coupon code and package price are required",
        });
    }
    const result = await MockPackageService.validateCoupon(code, packagePrice);
    res.json({
        success: true,
        data: result,
    });
});

const createCoupon = catchAsync(async (req: Request, res: Response) => {
    const result = await MockPackageService.createCoupon(req.body, req.user._id);
    res.status(201).json({
        success: true,
        message: "Coupon created successfully",
        data: result,
    });
});

const getAllCoupons = catchAsync(async (req: Request, res: Response) => {
    const result = await MockPackageService.getAllCoupons();
    res.json({
        success: true,
        data: result,
    });
});

const deleteCoupon = catchAsync(async (req: Request, res: Response) => {
    await MockPackageService.deleteCoupon(req.params.id);
    res.json({
        success: true,
        message: "Coupon deleted successfully",
    });
});

const updateCoupon = catchAsync(async (req: Request, res: Response) => {
    const result = await MockPackageService.updateCoupon(req.params.id, req.body);
    res.json({
        success: true,
        message: "Coupon updated successfully",
        data: result,
    });
});

const getAllPurchases = catchAsync(async (req: Request, res: Response) => {
    const result = await MockPackageService.getAllPurchases();
    res.json({
        success: true,
        data: result,
    });
});

const updatePurchaseStatus = catchAsync(async (req: Request, res: Response) => {
    const { status } = req.body;
    const result = await MockPackageService.updatePurchaseStatus(req.params.id, status);
    res.json({
        success: true,
        message: `Purchase status updated to ${status}`,
        data: result,
    });
});

const deletePurchase = catchAsync(async (req: Request, res: Response) => {
    const result = await MockPackageService.deletePurchase(req.params.id);
    res.json({
        success: true,
        message: "Purchase deleted successfully",
        data: result,
    });
});

const bulkDeletePurchases = catchAsync(async (req: Request, res: Response) => {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ success: false, message: "ids array is required" });
    }
    const result = await MockPackageService.bulkDeletePurchases(ids);
    res.json({
        success: true,
        message: `${result.deleted} of ${result.total} purchases deleted`,
        data: result,
    });
});

const bulkUpdateStatus = catchAsync(async (req: Request, res: Response) => {
    const { ids, status } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0 || !status) {
        return res.status(400).json({ success: false, message: "ids array and status required" });
    }
    const result = await MockPackageService.bulkUpdateStatus(ids, status);
    res.json({
        success: true,
        message: `${result.updated} of ${result.total} purchases updated to ${status}`,
        data: result,
    });
});

export const MockPackageController = {
    createPackage,
    getAllPackages,
    getActivePackages,
    getPackageById,
    updatePackage,
    deletePackage,
    claimFreeMock,
    purchaseMock,
    getMyPurchases,
    getAllPurchases,
    updatePurchaseStatus,
    deletePurchase,
    bulkDeletePurchases,
    bulkUpdateStatus,
    checkFreeMockStatus,
    getSetLimits,
    getPaymentHistory,
    getAnalytics,
    validateCoupon,
    createCoupon,
    getAllCoupons,
    updateCoupon,
    deleteCoupon,
};
