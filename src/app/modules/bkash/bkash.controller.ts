import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BkashService } from "./bkash.service";
import { MockPackageService } from "../mockPackage/mockPackage.service";
import { Payment } from "../mockPackage/mockPackage.model";
import { AffiliateService } from "../affiliate/affiliate.service";

const FRONTEND_URL = process.env.FRONTEND_URL || "https://bestieltsbd.vercel.app";
const BACKEND_URL = process.env.BACKEND_URL || "https://bestieltsbd-server.vercel.app";

/**
 * POST /api/bkash/create-payment
 * Body: { packageId, bundleSize?, couponCode?, customPrice? }
 * Returns: { bkashURL } — frontend should redirect user here
 */
const createPayment = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user._id;
    const { packageId, bundleSize, couponCode, customPrice, referralCode } = req.body;

    if (!packageId) {
        return res.status(400).json({ success: false, message: "Package ID is required" });
    }

    // Get package to determine price
    const pkg = await MockPackageService.getPackageById(packageId);
    if (!pkg || !pkg.isActive) {
        return res.status(400).json({ success: false, message: "Package not found or inactive" });
    }

    // Calculate final price
    let amount = customPrice && bundleSize && bundleSize > 1 ? customPrice : pkg.price;

    // Apply coupon if provided
    if (couponCode) {
        try {
            const couponResult = await MockPackageService.validateCoupon(couponCode, amount);
            amount = couponResult.finalPrice;
        } catch (e: any) {
            return res.status(400).json({ success: false, message: e.message });
        }
    }

    if (amount <= 0) {
        return res.status(400).json({ success: false, message: "Invalid payment amount" });
    }

    // Generate a unique invoice number
    const invoiceNumber = `BIELTS-${Date.now()}-${userId.toString().slice(-4)}`;

    // Build callback URL — bKash will redirect here after payment
    const callbackURL = `${BACKEND_URL}/api/bkash/callback`;

    // Create bKash payment
    const bkashResult = await BkashService.createPayment(amount, invoiceNumber, callbackURL);

    // Store pending payment info temporarily so we can process it in the callback
    // We store in a Payment record with status: "pending"
    await Payment.create({
        userId,
        packageId: pkg._id,
        amount,
        currency: "BDT",
        method: "bkash",
        status: "pending",
        transactionId: bkashResult.paymentID, // Store bKash paymentID here temporarily
        gatewayPaymentId: bkashResult.paymentID,
        gatewayResponse: {
            invoiceNumber,
            bundleSize: bundleSize || 1,
            couponCode: couponCode || null,
            customPrice: customPrice || null,
            referralCode: referralCode || null,
        },
    });

    res.json({
        success: true,
        data: {
            bkashURL: bkashResult.bkashURL,
            paymentID: bkashResult.paymentID,
        },
    });
});

/**
 * GET /api/bkash/callback?paymentID=xxx&status=success|failure|cancel
 * bKash redirects user here after payment attempt.
 * We execute the payment, create the purchase, then redirect to frontend.
 */
const handleCallback = catchAsync(async (req: Request, res: Response) => {
    const { paymentID, status } = req.query;

    if (!paymentID || typeof paymentID !== "string") {
        return res.redirect(`${FRONTEND_URL}/mock-tests?payment=error&msg=Invalid+callback`);
    }

    // Handle user cancellation or failure
    if (status === "cancel") {
        // Clean up pending payment
        await Payment.findOneAndDelete({ gatewayPaymentId: paymentID, status: "pending" });
        return res.redirect(`${FRONTEND_URL}/mock-tests?payment=cancelled`);
    }

    if (status === "failure") {
        await Payment.findOneAndDelete({ gatewayPaymentId: paymentID, status: "pending" });
        return res.redirect(`${FRONTEND_URL}/mock-tests?payment=failed`);
    }

    // Find the pending payment record
    const pendingPayment = await Payment.findOne({
        gatewayPaymentId: paymentID,
        status: "pending",
    });

    if (!pendingPayment) {
        return res.redirect(`${FRONTEND_URL}/mock-tests?payment=error&msg=Payment+not+found`);
    }

    try {
        // Execute the payment on bKash
        const execResult = await BkashService.executePayment(paymentID);

        // Update pending payment → completed
        pendingPayment.status = "completed";
        pendingPayment.transactionId = execResult.trxID;
        pendingPayment.paidAt = new Date();
        pendingPayment.gatewayResponse = {
            ...((pendingPayment.gatewayResponse as any) || {}),
            executeResult: execResult,
        };
        await pendingPayment.save();

        // Now create the actual purchase + student record via MockPackageService
        const storedMeta = (pendingPayment.gatewayResponse as any) || {};
        const bundleSize = storedMeta.bundleSize || 1;
        const couponCode = storedMeta.couponCode || undefined;
        const customPrice = storedMeta.customPrice || undefined;

        const purchaseResult = await MockPackageService.purchaseMock(
            pendingPayment.userId.toString(),
            pendingPayment.packageId.toString(),
            "bkash",
            execResult.trxID,
            couponCode,
            bundleSize,
            customPrice
        );

        // Create affiliate commission if referral code exists
        const refCode = storedMeta.referralCode;
        if (refCode) {
            try {
                await AffiliateService.createCommission(
                    refCode,
                    pendingPayment.userId.toString(),
                    purchaseResult.purchases?.[0]?._id?.toString() || "",
                    pendingPayment._id.toString(),
                    pendingPayment.amount
                );
            } catch (affErr: any) {
                console.error("[Affiliate Commission] Error:", affErr.message);
            }
        }

        // Redirect to success page with exam IDs
        const examIds = purchaseResult.examIds?.join(",") || purchaseResult.examId;
        return res.redirect(
            `${FRONTEND_URL}/mock-tests?payment=success&examIds=${examIds}&trxID=${execResult.trxID}`
        );
    } catch (err: any) {
        console.error("[bKash Callback] Error:", err);
        // If execution failed, mark payment as failed
        pendingPayment.status = "failed";
        pendingPayment.gatewayResponse = {
            ...((pendingPayment.gatewayResponse as any) || {}),
            error: err.message,
        };
        await pendingPayment.save();

        return res.redirect(
            `${FRONTEND_URL}/mock-tests?payment=failed&msg=${encodeURIComponent(err.message || "Payment execution failed")}`
        );
    }
});

/**
 * POST /api/bkash/query-payment
 * Body: { paymentID }
 * Admin endpoint to check payment status.
 */
const queryPayment = catchAsync(async (req: Request, res: Response) => {
    const { paymentID } = req.body;
    if (!paymentID) {
        return res.status(400).json({ success: false, message: "paymentID required" });
    }
    const result = await BkashService.queryPayment(paymentID);
    res.json({ success: true, data: result });
});

export const BkashController = {
    createPayment,
    handleCallback,
    queryPayment,
};
