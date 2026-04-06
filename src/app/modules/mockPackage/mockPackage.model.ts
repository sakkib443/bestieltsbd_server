import { Schema, model } from "mongoose";
import { IMockPackage, IPurchase, IPayment, ICoupon } from "./mockPackage.interface";

// =================== MOCK PACKAGE SCHEMA ===================
const mockPackageSchema = new Schema<IMockPackage>(
    {
        title: {
            type: String,
            required: [true, "Package title is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            default: 99,
        },
        originalPrice: {
            type: Number,
        },
        currency: {
            type: String,
            default: "BDT",
        },
        examSets: {
            listeningSetNumber: { type: Number, required: true },
            readingSetNumber: { type: Number, required: true },
            writingSetNumber: { type: Number, required: true },
        },
        bundleSize: {
            type: Number,
            default: 1,
            min: 1,
        },
        bundleExamSets: [{
            listeningSetNumber: { type: Number },
            readingSetNumber: { type: Number },
            writingSetNumber: { type: Number },
        }],
        badge: {
            type: String,
            trim: true,
        },
        features: [String],
        isFree: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        totalPurchases: {
            type: Number,
            default: 0,
        },
        thumbnail: String,
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "medium",
        },
        tags: [String],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

// =================== PURCHASE SCHEMA ===================
const purchaseSchema = new Schema<IPurchase>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        packageId: {
            type: Schema.Types.ObjectId,
            ref: "MockPackage",
            required: true,
        },
        paymentId: {
            type: Schema.Types.ObjectId,
            ref: "Payment",
        },
        status: {
            type: String,
            enum: ["active", "completed", "expired", "refunded", "paused"],
            default: "active",
        },
        isFree: {
            type: Boolean,
            default: false,
        },
        examId: {
            type: String,
            unique: true,
            sparse: true,
        },
        studentRecordId: {
            type: Schema.Types.ObjectId,
            ref: "Student",
        },
        examStatus: {
            type: String,
            enum: ["not-started", "in-progress", "completed"],
            default: "not-started",
        },
        purchasedAt: {
            type: Date,
            default: Date.now,
        },
        expiresAt: Date,
        completedAt: Date,
    },
    { timestamps: true }
);

// Index for fast lookups
purchaseSchema.index({ userId: 1, status: 1 });
purchaseSchema.index({ examId: 1 });

// =================== PAYMENT SCHEMA ===================
const paymentSchema = new Schema<IPayment>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        purchaseId: {
            type: Schema.Types.ObjectId,
            ref: "Purchase",
        },
        packageId: {
            type: Schema.Types.ObjectId,
            ref: "MockPackage",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: "BDT",
        },
        method: {
            type: String,
            enum: ["bkash", "nagad", "rocket", "ssl", "stripe", "bank", "free"],
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed", "refunded", "cancelled"],
            default: "pending",
        },
        transactionId: String,
        gatewayResponse: Schema.Types.Mixed,
        gatewayPaymentId: String,
        couponCode: String,
        discountAmount: {
            type: Number,
            default: 0,
        },
        refundReason: String,
        paidAt: Date,
    },
    { timestamps: true }
);

paymentSchema.index({ userId: 1, status: 1 });
paymentSchema.index({ transactionId: 1 });

// =================== COUPON SCHEMA ===================
const couponSchema = new Schema<ICoupon>(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        discountType: {
            type: String,
            enum: ["percentage", "fixed", "override"],
            required: true,
        },
        discountValue: {
            type: Number,
            required: true,
        },
        maxUses: {
            type: Number,
            required: true,
        },
        currentUses: {
            type: Number,
            default: 0,
        },
        validFrom: {
            type: Date,
            required: true,
        },
        validUntil: {
            type: Date,
            required: true,
        },
        minPurchase: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

couponSchema.index({ code: 1 });

export const MockPackage = model<IMockPackage>("MockPackage", mockPackageSchema);
export const Purchase = model<IPurchase>("Purchase", purchaseSchema);
export const Payment = model<IPayment>("Payment", paymentSchema);
export const Coupon = model<ICoupon>("Coupon", couponSchema);
