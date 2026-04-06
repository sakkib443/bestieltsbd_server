import { Types } from "mongoose";

// Affiliate Partner Types
export type AffiliateType = "personal" | "company";
export type AffiliateStatus = "active" | "suspended" | "pending";
export type CommissionStatus = "pending" | "approved" | "paid" | "cancelled";
export type WithdrawalStatus = "pending" | "approved" | "completed" | "rejected";

// Affiliate Partner
export interface IAffiliate {
    userId: Types.ObjectId;
    type: AffiliateType; // personal or company
    referralCode: string; // auto-generated
    customCode?: string; // user-chosen custom code

    // Personal Info
    name: string;
    phone: string;
    email: string;
    location: string;

    // Company Info (only for company type)
    companyName?: string;
    companyAddress?: string;

    // Commission Settings
    commissionRate: number; // 10 for personal, 50 for company (admin adjustable)

    // Stats (denormalized for performance)
    totalClicks: number;
    totalReferrals: number;
    totalPurchases: number;
    totalEarnings: number;
    pendingEarnings: number;
    withdrawnEarnings: number;

    // Payment Info
    paymentMethod: string; // bkash, nagad, rocket
    paymentNumber: string;

    // Status
    status: AffiliateStatus;

    // Company requirement tracking
    monthlyStudents?: number; // company: must hit 50/month

    createdAt?: Date;
    updatedAt?: Date;
}

// Commission Record
export interface IAffiliateCommission {
    affiliateId: Types.ObjectId;
    referrerId: Types.ObjectId; // affiliate's user ID
    buyerId: Types.ObjectId; // who purchased
    purchaseId: Types.ObjectId;
    paymentId?: Types.ObjectId;

    purchaseAmount: number;
    commissionRate: number;
    commissionAmount: number;

    status: CommissionStatus;
    paidAt?: Date;

    createdAt?: Date;
    updatedAt?: Date;
}

// Withdrawal Request
export interface IAffiliateWithdrawal {
    affiliateId: Types.ObjectId;
    userId: Types.ObjectId;

    amount: number;
    method: string; // bkash, nagad, rocket
    accountNumber: string;

    status: WithdrawalStatus;
    adminNote?: string;
    transactionId?: string;

    processedAt?: Date;
    processedBy?: Types.ObjectId;

    createdAt?: Date;
    updatedAt?: Date;
}
