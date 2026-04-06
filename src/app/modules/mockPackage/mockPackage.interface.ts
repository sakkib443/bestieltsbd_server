import { Types } from "mongoose";

// Mock Package — Available mock tests for purchase
export interface IMockPackage {
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    currency: string;
    examSets: {
        listeningSetNumber: number;
        readingSetNumber: number;
        writingSetNumber: number;
    };
    bundleSize: number; // 1 = single, 3 = 3-pack, 5 = 5-pack
    bundleExamSets?: Array<{
        listeningSetNumber: number;
        readingSetNumber: number;
        writingSetNumber: number;
    }>;
    badge?: string; // e.g. "FREE", "POPULAR", "BEST VALUE"
    features?: string[]; // Feature list for display
    isFree: boolean;
    isActive: boolean;
    totalPurchases: number;
    thumbnail?: string;
    difficulty?: "easy" | "medium" | "hard";
    tags?: string[];
    createdBy?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

// Purchase — Student's purchased mock
export type PurchaseStatus = "active" | "completed" | "expired" | "refunded";

export interface IPurchase {
    userId: Types.ObjectId;
    packageId: Types.ObjectId;
    paymentId?: Types.ObjectId;
    status: PurchaseStatus;
    isFree: boolean;
    examId?: string; // Generated exam ID like BESTIELTS260001
    studentRecordId?: Types.ObjectId; // Link to student collection
    examStatus: "not-started" | "in-progress" | "completed";
    purchasedAt: Date;
    expiresAt?: Date;
    completedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

// Payment
export type PaymentMethod = "bkash" | "nagad" | "ssl" | "stripe" | "bank" | "free";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded" | "cancelled";

export interface IPayment {
    userId: Types.ObjectId;
    purchaseId?: Types.ObjectId;
    packageId: Types.ObjectId;
    amount: number;
    currency: string;
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId?: string;
    gatewayResponse?: any;
    gatewayPaymentId?: string;
    couponCode?: string;
    discountAmount?: number;
    refundReason?: string;
    paidAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

// Coupon/Promo Code
export interface ICoupon {
    code: string;
    discountType: "percentage" | "fixed" | "override";
    discountValue: number;
    maxUses: number;
    currentUses: number;
    validFrom: Date;
    validUntil: Date;
    minPurchase: number;
    isActive: boolean;
    createdBy?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
