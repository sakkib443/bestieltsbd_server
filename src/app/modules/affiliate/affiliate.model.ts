import { Schema, model } from "mongoose";
import { IAffiliate, IAffiliateCommission, IAffiliateWithdrawal } from "./affiliate.interface";

// =================== AFFILIATE SCHEMA ===================
const affiliateSchema = new Schema<IAffiliate>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        type: { type: String, enum: ["personal", "company"], required: true, default: "personal" },
        referralCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
        customCode: { type: String, unique: true, sparse: true, uppercase: true, trim: true },

        // Personal/Company Info
        name: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },

        // Company only
        companyName: { type: String, trim: true },
        companyAddress: { type: String, trim: true },

        // Commission
        commissionRate: { type: Number, required: true, default: 10 },

        // Stats
        totalClicks: { type: Number, default: 0 },
        totalReferrals: { type: Number, default: 0 },
        totalPurchases: { type: Number, default: 0 },
        totalEarnings: { type: Number, default: 0 },
        pendingEarnings: { type: Number, default: 0 },
        withdrawnEarnings: { type: Number, default: 0 },

        // Payment
        paymentMethod: { type: String, enum: ["bkash", "nagad", "rocket"], default: "bkash" },
        paymentNumber: { type: String, trim: true },

        // Status
        status: { type: String, enum: ["active", "suspended", "pending"], default: "active" },

        // Company tracking
        monthlyStudents: { type: Number, default: 0 },
    },
    { timestamps: true }
);

affiliateSchema.index({ referralCode: 1 });
affiliateSchema.index({ customCode: 1 });
affiliateSchema.index({ userId: 1 });

// =================== COMMISSION SCHEMA ===================
const commissionSchema = new Schema<IAffiliateCommission>(
    {
        affiliateId: { type: Schema.Types.ObjectId, ref: "Affiliate", required: true },
        referrerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        purchaseId: { type: Schema.Types.ObjectId, ref: "Purchase", required: true },
        paymentId: { type: Schema.Types.ObjectId, ref: "Payment" },

        purchaseAmount: { type: Number, required: true },
        commissionRate: { type: Number, required: true },
        commissionAmount: { type: Number, required: true },

        status: { type: String, enum: ["pending", "approved", "paid", "cancelled"], default: "approved" },
        paidAt: { type: Date },
    },
    { timestamps: true }
);

commissionSchema.index({ affiliateId: 1, status: 1 });
commissionSchema.index({ buyerId: 1 });

// =================== WITHDRAWAL SCHEMA ===================
const withdrawalSchema = new Schema<IAffiliateWithdrawal>(
    {
        affiliateId: { type: Schema.Types.ObjectId, ref: "Affiliate", required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

        amount: { type: Number, required: true },
        method: { type: String, enum: ["bkash", "nagad", "rocket"], required: true },
        accountNumber: { type: String, required: true },

        status: { type: String, enum: ["pending", "approved", "completed", "rejected"], default: "pending" },
        adminNote: { type: String },
        transactionId: { type: String },

        processedAt: { type: Date },
        processedBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

withdrawalSchema.index({ affiliateId: 1, status: 1 });

export const Affiliate = model<IAffiliate>("Affiliate", affiliateSchema);
export const AffiliateCommission = model<IAffiliateCommission>("AffiliateCommission", commissionSchema);
export const AffiliateWithdrawal = model<IAffiliateWithdrawal>("AffiliateWithdrawal", withdrawalSchema);
