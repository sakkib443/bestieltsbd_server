import { Affiliate, AffiliateCommission, AffiliateWithdrawal } from "./affiliate.model";
import { User } from "../user/user.model";
import crypto from "crypto";

// =================== HELPERS ===================

const generateReferralCode = (): string => {
    return crypto.randomBytes(3).toString("hex").toUpperCase().slice(0, 6);
};

const findAffiliateByCode = async (code: string) => {
    const upperCode = code.toUpperCase();
    // Check both referralCode and customCode
    return await Affiliate.findOne({
        $or: [{ referralCode: upperCode }, { customCode: upperCode }],
        status: "active",
    });
};

// =================== REGISTRATION ===================

const register = async (userId: string, data: any) => {
    // Check if already registered
    const existing = await Affiliate.findOne({ userId });
    if (existing) throw new Error("You are already registered as an affiliate partner");

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Generate unique referral code
    let referralCode = generateReferralCode();
    while (await Affiliate.findOne({ referralCode })) {
        referralCode = generateReferralCode();
    }

    // Check custom code uniqueness
    if (data.customCode) {
        const customExists = await Affiliate.findOne({ customCode: data.customCode.toUpperCase() });
        if (customExists) throw new Error("This custom code is already taken");
        // Also check if it matches any referral code
        const refExists = await Affiliate.findOne({ referralCode: data.customCode.toUpperCase() });
        if (refExists) throw new Error("This code is already in use");
    }

    // Set commission rate based on type
    const commissionRate = data.type === "company" ? 50 : 10;

    const affiliate = await Affiliate.create({
        userId,
        type: data.type || "personal",
        referralCode,
        customCode: data.customCode?.toUpperCase() || undefined,
        name: data.name,
        phone: data.phone,
        email: data.email,
        location: data.location,
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        commissionRate,
        paymentMethod: data.paymentMethod || "bkash",
        paymentNumber: data.paymentNumber || data.phone,
        status: "active", // Auto-approved
    });

    return affiliate;
};

// =================== GET MY INFO ===================

const getMyInfo = async (userId: string) => {
    const affiliate = await Affiliate.findOne({ userId });
    if (!affiliate) return null;
    return affiliate;
};

// =================== GET MY COMMISSIONS ===================

const getMyCommissions = async (userId: string) => {
    const affiliate = await Affiliate.findOne({ userId });
    if (!affiliate) throw new Error("Not registered as affiliate");

    const commissions = await AffiliateCommission.find({ affiliateId: affiliate._id })
        .populate("buyerId", "name email")
        .sort({ createdAt: -1 })
        .limit(50);

    return commissions;
};

// =================== GET MY STATS ===================

const getMyStats = async (userId: string) => {
    const affiliate = await Affiliate.findOne({ userId });
    if (!affiliate) throw new Error("Not registered as affiliate");

    const recentCommissions = await AffiliateCommission.find({ affiliateId: affiliate._id })
        .populate("buyerId", "name")
        .sort({ createdAt: -1 })
        .limit(10);

    const withdrawals = await AffiliateWithdrawal.find({ affiliateId: affiliate._id })
        .sort({ createdAt: -1 })
        .limit(10);

    return {
        affiliate,
        recentCommissions,
        withdrawals,
    };
};

// =================== TRACK CLICK ===================

const trackClick = async (code: string) => {
    const affiliate = await findAffiliateByCode(code);
    if (!affiliate) throw new Error("Invalid referral code");

    // Increment click count
    await Affiliate.findByIdAndUpdate(affiliate._id, { $inc: { totalClicks: 1 } });

    return {
        valid: true,
        code: affiliate.customCode || affiliate.referralCode,
        name: affiliate.name,
        type: affiliate.type,
    };
};

// =================== CREATE COMMISSION (called during purchase) ===================

const createCommission = async (
    referralCode: string,
    buyerId: string,
    purchaseId: string,
    paymentId: string,
    purchaseAmount: number
) => {
    const affiliate = await findAffiliateByCode(referralCode);
    if (!affiliate) return null;

    // Self-referral check
    if (affiliate.userId.toString() === buyerId) {
        console.log("Self-referral blocked:", buyerId);
        return null;
    }

    // Check if commission already exists for this purchase
    const existingCommission = await AffiliateCommission.findOne({ purchaseId });
    if (existingCommission) return existingCommission;

    const commissionAmount = Math.round((purchaseAmount * affiliate.commissionRate) / 100);

    const commission = await AffiliateCommission.create({
        affiliateId: affiliate._id,
        referrerId: affiliate.userId,
        buyerId,
        purchaseId,
        paymentId,
        purchaseAmount,
        commissionRate: affiliate.commissionRate,
        commissionAmount,
        status: "approved", // auto-approved since bKash payment is verified
    });

    // Update affiliate stats
    await Affiliate.findByIdAndUpdate(affiliate._id, {
        $inc: {
            totalPurchases: 1,
            totalEarnings: commissionAmount,
            pendingEarnings: commissionAmount,
        },
    });

    return commission;
};

// =================== WITHDRAW ===================

const requestWithdrawal = async (userId: string, amount: number) => {
    const affiliate = await Affiliate.findOne({ userId, status: "active" });
    if (!affiliate) throw new Error("Affiliate account not found or suspended");

    // Minimum withdrawal check
    const minWithdraw = affiliate.type === "company" ? 300 : 100;
    if (amount < minWithdraw) {
        throw new Error(`Minimum withdrawal amount is ৳${minWithdraw}`);
    }

    if (amount > affiliate.pendingEarnings) {
        throw new Error(`Insufficient balance. Available: ৳${affiliate.pendingEarnings}`);
    }

    if (!affiliate.paymentNumber) {
        throw new Error("Please set your payment number first");
    }

    // Check for pending withdrawal
    const pendingWithdrawal = await AffiliateWithdrawal.findOne({
        affiliateId: affiliate._id,
        status: { $in: ["pending", "approved"] },
    });
    if (pendingWithdrawal) {
        throw new Error("You already have a pending withdrawal request");
    }

    const withdrawal = await AffiliateWithdrawal.create({
        affiliateId: affiliate._id,
        userId: affiliate.userId,
        amount,
        method: affiliate.paymentMethod,
        accountNumber: affiliate.paymentNumber,
    });

    // Deduct from pending earnings
    await Affiliate.findByIdAndUpdate(affiliate._id, {
        $inc: { pendingEarnings: -amount },
    });

    return withdrawal;
};

// =================== UPDATE PAYMENT INFO ===================

const updatePaymentInfo = async (userId: string, data: any) => {
    const affiliate = await Affiliate.findOneAndUpdate(
        { userId },
        {
            paymentMethod: data.paymentMethod,
            paymentNumber: data.paymentNumber,
        },
        { new: true }
    );
    if (!affiliate) throw new Error("Affiliate not found");
    return affiliate;
};

// =================== SET CUSTOM CODE ===================

const setCustomCode = async (userId: string, code: string) => {
    const upperCode = code.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (upperCode.length < 4 || upperCode.length > 15) {
        throw new Error("Custom code must be 4-15 characters (letters & numbers only)");
    }

    // Check uniqueness
    const existing = await Affiliate.findOne({
        $or: [{ referralCode: upperCode }, { customCode: upperCode }],
    });
    if (existing && existing.userId.toString() !== userId) {
        throw new Error("This code is already taken");
    }

    const affiliate = await Affiliate.findOneAndUpdate(
        { userId },
        { customCode: upperCode },
        { new: true }
    );
    if (!affiliate) throw new Error("Affiliate not found");
    return affiliate;
};

// =================== ADMIN: GET ALL AFFILIATES ===================

const getAllAffiliates = async () => {
    return await Affiliate.find()
        .populate("userId", "name email phone")
        .sort({ createdAt: -1 });
};

// =================== ADMIN: GET ALL WITHDRAWALS ===================

const getAllWithdrawals = async (status?: string) => {
    const filter: any = {};
    if (status) filter.status = status;

    return await AffiliateWithdrawal.find(filter)
        .populate("userId", "name email phone")
        .populate("affiliateId", "name type referralCode customCode paymentMethod paymentNumber")
        .sort({ createdAt: -1 });
};

// =================== ADMIN: PROCESS WITHDRAWAL ===================

const processWithdrawal = async (withdrawalId: string, action: string, adminId: string, data: any) => {
    const withdrawal = await AffiliateWithdrawal.findById(withdrawalId);
    if (!withdrawal) throw new Error("Withdrawal not found");

    if (action === "complete") {
        withdrawal.status = "completed";
        withdrawal.transactionId = data.transactionId || "";
        withdrawal.adminNote = data.adminNote || "";
        withdrawal.processedAt = new Date();
        withdrawal.processedBy = adminId as any;
        await withdrawal.save();

        // Update affiliate withdrawn amount
        await Affiliate.findByIdAndUpdate(withdrawal.affiliateId, {
            $inc: { withdrawnEarnings: withdrawal.amount },
        });
    } else if (action === "reject") {
        withdrawal.status = "rejected";
        withdrawal.adminNote = data.adminNote || "";
        withdrawal.processedAt = new Date();
        withdrawal.processedBy = adminId as any;
        await withdrawal.save();

        // Refund pending earnings
        await Affiliate.findByIdAndUpdate(withdrawal.affiliateId, {
            $inc: { pendingEarnings: withdrawal.amount },
        });
    }

    return withdrawal;
};

// =================== ADMIN: UPDATE AFFILIATE ===================

const updateAffiliate = async (affiliateId: string, data: any) => {
    const affiliate = await Affiliate.findByIdAndUpdate(affiliateId, data, { new: true });
    if (!affiliate) throw new Error("Affiliate not found");
    return affiliate;
};

// =================== ADMIN: ANALYTICS ===================

const getAffiliateAnalytics = async () => {
    const totalAffiliates = await Affiliate.countDocuments();
    const personalCount = await Affiliate.countDocuments({ type: "personal" });
    const companyCount = await Affiliate.countDocuments({ type: "company" });
    const activeCount = await Affiliate.countDocuments({ status: "active" });

    const earningsAgg = await Affiliate.aggregate([
        { $group: { _id: null, totalEarnings: { $sum: "$totalEarnings" }, totalWithdrawn: { $sum: "$withdrawnEarnings" }, totalPending: { $sum: "$pendingEarnings" } } },
    ]);

    const pendingWithdrawals = await AffiliateWithdrawal.countDocuments({ status: "pending" });
    const pendingAmount = await AffiliateWithdrawal.aggregate([
        { $match: { status: "pending" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    return {
        totalAffiliates,
        personalCount,
        companyCount,
        activeCount,
        totalEarnings: earningsAgg[0]?.totalEarnings || 0,
        totalWithdrawn: earningsAgg[0]?.totalWithdrawn || 0,
        totalPending: earningsAgg[0]?.totalPending || 0,
        pendingWithdrawals,
        pendingWithdrawalAmount: pendingAmount[0]?.total || 0,
    };
};

export const AffiliateService = {
    register,
    getMyInfo,
    getMyCommissions,
    getMyStats,
    trackClick,
    createCommission,
    requestWithdrawal,
    updatePaymentInfo,
    setCustomCode,
    // Admin
    getAllAffiliates,
    getAllWithdrawals,
    processWithdrawal,
    updateAffiliate,
    getAffiliateAnalytics,
};
