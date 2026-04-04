import { MockPackage, Purchase, Payment, Coupon } from "./mockPackage.model";
import { Student } from "../student/student.model";
import { User } from "../user/user.model";
import { Types } from "mongoose";
import { sendPurchaseConfirmationEmail } from "../../utils/email.service";

// =================== MOCK PACKAGE SERVICE ===================

const createPackage = async (data: any, userId: string) => {
    const pkg = await MockPackage.create({ ...data, createdBy: userId });
    return pkg;
};

const getAllPackages = async (onlyActive = false) => {
    const filter = onlyActive ? { isActive: true } : {};
    const packages = await MockPackage.find(filter).sort({ createdAt: -1 });
    return packages;
};

const getPackageById = async (id: string) => {
    const pkg = await MockPackage.findById(id);
    if (!pkg) throw new Error("Package not found");
    return pkg;
};

const updatePackage = async (id: string, data: any) => {
    const pkg = await MockPackage.findByIdAndUpdate(id, data, { new: true });
    if (!pkg) throw new Error("Package not found");
    return pkg;
};

const deletePackage = async (id: string) => {
    const pkg = await MockPackage.findByIdAndDelete(id);
    if (!pkg) throw new Error("Package not found");
    return pkg;
};

// =================== PURCHASE SERVICE ===================

// Generate unique exam ID: BESTIELTS + YYMM + 4-digit serial
const generateExamId = async (): Promise<string> => {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const prefix = `BESTIELTS${yy}${mm}`;

    // Find the latest exam ID with this prefix
    const latest = await Purchase.findOne(
        { examId: { $regex: `^${prefix}` } },
        { examId: 1 }
    ).sort({ examId: -1 });

    let serial = 1;
    if (latest?.examId) {
        const lastSerial = parseInt(latest.examId.slice(prefix.length), 10);
        serial = lastSerial + 1;
    }

    return `${prefix}${String(serial).padStart(4, "0")}`;
};

// Check if user has used free mock already
const hasUsedFreeMock = async (userId: string): Promise<boolean> => {
    const freeCount = await Purchase.countDocuments({
        userId: new Types.ObjectId(userId),
        isFree: true,
    });
    return freeCount > 0;
};

// Get the free package (first one)
const getFreePackage = async () => {
    let freePkg = await MockPackage.findOne({ isFree: true, isActive: true });
    return freePkg;
};

// Claim free mock test (1st time only)
const claimFreeMock = async (userId: string) => {
    // Check if user already claimed free mock
    const alreadyClaimed = await hasUsedFreeMock(userId);
    if (alreadyClaimed) {
        throw new Error("You have already claimed your free mock test");
    }

    // Find free package
    const freePkg = await getFreePackage();
    if (!freePkg) {
        throw new Error("No free mock test available at this time");
    }

    // Generate exam ID
    const examId = await generateExamId();

    // Create purchase record
    const purchase = await Purchase.create({
        userId: new Types.ObjectId(userId),
        packageId: freePkg._id,
        status: "active",
        isFree: true,
        examId,
        examStatus: "not-started",
        purchasedAt: new Date(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    // Create free payment record
    await Payment.create({
        userId: new Types.ObjectId(userId),
        purchaseId: purchase._id,
        packageId: freePkg._id,
        amount: 0,
        method: "free",
        status: "completed",
        paidAt: new Date(),
    });

    // Update total purchases count
    await MockPackage.findByIdAndUpdate(freePkg._id, {
        $inc: { totalPurchases: 1 },
    });

    // Create student record for this exam
    const user = await User.findById(userId);
    if (user) {
        // ═══ SMART SET DETECTION for free claim ═══
        const existingRecords = await Student.find(
            { userId: new Types.ObjectId(userId) },
            { "assignedSets.fullSets": 1, "assignedSets.listeningSetNumber": 1, "assignedSets.readingSetNumber": 1, "assignedSets.writingSetNumber": 1 }
        ).lean();

        const usedL = new Set<number>();
        const usedR = new Set<number>();
        const usedW = new Set<number>();

        for (const rec of existingRecords) {
            const a = (rec as any).assignedSets || {};
            if (a.listeningSetNumber) usedL.add(a.listeningSetNumber);
            if (a.readingSetNumber) usedR.add(a.readingSetNumber);
            if (a.writingSetNumber) usedW.add(a.writingSetNumber);
            for (const fs of (a.fullSets || [])) {
                if (fs.listeningSetNumber) usedL.add(fs.listeningSetNumber);
                if (fs.readingSetNumber) usedR.add(fs.readingSetNumber);
                if (fs.writingSetNumber) usedW.add(fs.writingSetNumber);
            }
        }

        const MAX_SETS = 20;
        const nextAvail = (base: number, used: Set<number>) => {
            let c = base; let a = 0;
            while (used.has(c) && a < MAX_SETS) { c++; if (c > MAX_SETS) c = 1; a++; }
            return c;
        };

        const smartL = nextAvail(freePkg.examSets.listeningSetNumber, usedL);
        const smartR = nextAvail(freePkg.examSets.readingSetNumber, usedR);
        const smartW = nextAvail(freePkg.examSets.writingSetNumber, usedW);

        console.log(`[SmartSetDetection-Free] User ${userId} → L:${smartL} R:${smartR} W:${smartW}`);

        const studentRecord = await Student.create({
            examId,
            nameEnglish: user.name,
            email: user.email,
            phone: user.phone || "N/A",
            password: user.phone || user.email,
            paymentStatus: "paid",
            paymentAmount: 0,
            paymentMethod: "other",
            examDate: new Date(), // Can take anytime
            assignedSets: {
                fullSets: [{
                    label: freePkg.title,
                    listeningSetNumber: smartL,
                    readingSetNumber: smartR,
                    writingSetNumber: smartW,
                    speakingSetNumber: 1,
                }],
                speakingSetNumber: 1,
            },
            examStatus: "not-started",
            isActive: true,
            canRetake: false,
            resultsPublished: false,
            violations: [],
            totalViolations: 0,
            createdBy: new Types.ObjectId(userId),
            userId: new Types.ObjectId(userId),
        });

        // Link student record to purchase
        await Purchase.findByIdAndUpdate(purchase._id, {
            studentRecordId: studentRecord._id,
        });
    }

    // Send purchase confirmation email (non-blocking)
    if (user) {
        sendPurchaseConfirmationEmail({
            name: user.name,
            email: user.email,
            packageTitle: freePkg.title + " (Free)",
            bundleSize: 1,
            amount: 0,
            paymentMethod: "Free",
            transactionId: "FREE-MOCK",
            examIds: [examId],
        }).catch(() => {});
    }

    return {
        purchase,
        examId,
        package: freePkg,
    };
};

// Purchase a mock test with payment (supports bundles)
const purchaseMock = async (
    userId: string,
    packageId: string,
    paymentMethod: string,
    transactionId: string,
    couponCode?: string,
    bundleSizeOverride?: number,
    customPrice?: number
) => {
    const pkg = await MockPackage.findById(packageId);
    if (!pkg) throw new Error("Package not found");
    if (!pkg.isActive) throw new Error("This package is no longer available");

    // Use custom price for plan-based purchases, otherwise use package price
    const effectivePrice = customPrice && bundleSizeOverride && bundleSizeOverride > 1
        ? customPrice
        : pkg.price;

    let finalAmount = effectivePrice;
    let discountAmount = 0;

    // Apply coupon if provided
    if (couponCode) {
        const coupon = await Coupon.findOne({
            code: couponCode.toUpperCase(),
            isActive: true,
            validFrom: { $lte: new Date() },
            validUntil: { $gte: new Date() },
        });

        if (coupon && coupon.currentUses < coupon.maxUses) {
            if (coupon.discountType === "percentage") {
                discountAmount = Math.round((effectivePrice * coupon.discountValue) / 100);
            } else {
                discountAmount = coupon.discountValue;
            }
            finalAmount = Math.max(0, effectivePrice - discountAmount);

            // Increment coupon usage
            await Coupon.findByIdAndUpdate(coupon._id, {
                $inc: { currentUses: 1 },
            });
        }
    }

    // Use override bundleSize from frontend plan, otherwise use package bundleSize
    const bundleSize = bundleSizeOverride || pkg.bundleSize || 1;

    // Create payment record (single payment for the whole bundle)
    const payment = await Payment.create({
        userId: new Types.ObjectId(userId),
        packageId: pkg._id,
        amount: finalAmount,
        method: paymentMethod,
        status: "completed",
        transactionId,
        couponCode: couponCode?.toUpperCase(),
        discountAmount,
        paidAt: new Date(),
    });

    const user = await User.findById(userId);
    const examIds: string[] = [];
    const purchases: any[] = [];

    // ═══ SMART SET DETECTION ═══
    // Find all set numbers this user has already been assigned (across all previous purchases).
    // This ensures re-purchases always give new, unique sets.
    const existingStudentRecords = await Student.find(
        { userId: new Types.ObjectId(userId) },
        { "assignedSets.fullSets": 1 }
    ).lean();

    // Collect all previously used set numbers for each module
    const usedListeningSets = new Set<number>();
    const usedReadingSets = new Set<number>();
    const usedWritingSets = new Set<number>();

    for (const rec of existingStudentRecords) {
        const fullSets = (rec as any).assignedSets?.fullSets || [];
        for (const fs of fullSets) {
            if (fs.listeningSetNumber) usedListeningSets.add(fs.listeningSetNumber);
            if (fs.readingSetNumber) usedReadingSets.add(fs.readingSetNumber);
            if (fs.writingSetNumber) usedWritingSets.add(fs.writingSetNumber);
        }
        // Also check legacy single set format
        const legacy = (rec as any).assignedSets || {};
        if (legacy.listeningSetNumber) usedListeningSets.add(legacy.listeningSetNumber);
        if (legacy.readingSetNumber) usedReadingSets.add(legacy.readingSetNumber);
        if (legacy.writingSetNumber) usedWritingSets.add(legacy.writingSetNumber);
    }

    // Helper: find next available set number that hasn't been used
    // Starts from baseSetNumber and increments; wraps around after maxSets
    const MAX_AVAILABLE_SETS = 20; // adjust if you add more question sets
    const getNextAvailableSet = (baseSetNumber: number, usedSets: Set<number>): number => {
        let candidate = baseSetNumber;
        let attempts = 0;
        while (usedSets.has(candidate) && attempts < MAX_AVAILABLE_SETS) {
            candidate = candidate + 1;
            // Wrap around: if we exceed MAX_AVAILABLE_SETS, start from 1
            if (candidate > MAX_AVAILABLE_SETS) candidate = 1;
            attempts++;
        }
        // If all sets are used, just return the base (allow re-use as fallback)
        return candidate;
    };

    // Track sets assigned in THIS purchase batch to avoid duplicates within the bundle
    const batchListening = new Set<number>(usedListeningSets);
    const batchReading = new Set<number>(usedReadingSets);
    const batchWriting = new Set<number>(usedWritingSets);

    // Create N purchases for bundle
    for (let i = 0; i < bundleSize; i++) {
        const examId = await generateExamId();
        examIds.push(examId);

        // Pick exam sets: use bundleExamSets[i] if available, else fallback to examSets
        const baseSets = (pkg.bundleExamSets && pkg.bundleExamSets[i])
            ? pkg.bundleExamSets[i]
            : pkg.examSets;

        // Smart assignment: find the next unused set for each module
        const smartListeningSet = getNextAvailableSet(baseSets.listeningSetNumber, batchListening);
        const smartReadingSet = getNextAvailableSet(baseSets.readingSetNumber, batchReading);
        const smartWritingSet = getNextAvailableSet(baseSets.writingSetNumber, batchWriting);

        // Mark these as used for subsequent iterations in this batch
        batchListening.add(smartListeningSet);
        batchReading.add(smartReadingSet);
        batchWriting.add(smartWritingSet);

        console.log(`[SmartSetDetection] User ${userId} | Exam ${examId} | Base L:${baseSets.listeningSetNumber} R:${baseSets.readingSetNumber} W:${baseSets.writingSetNumber} → Smart L:${smartListeningSet} R:${smartReadingSet} W:${smartWritingSet}`);

        const purchase = await Purchase.create({
            userId: new Types.ObjectId(userId),
            packageId: pkg._id,
            paymentId: payment._id,
            status: "active",
            isFree: false,
            examId,
            examStatus: "not-started",
            purchasedAt: new Date(),
            expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        });

        purchases.push(purchase);

        // Create student record with SMART set numbers
        if (user) {
            const studentRecord = await Student.create({
                examId,
                nameEnglish: user.name,
                email: user.email,
                phone: user.phone || "N/A",
                password: user.phone || user.email,
                paymentStatus: "paid",
                paymentAmount: Math.round(finalAmount / bundleSize),
                paymentMethod: paymentMethod as any,
                examDate: new Date(),
                    assignedSets: {
                    fullSets: [{
                        label: `${pkg.title} (${i + 1}/${bundleSize})`,
                        listeningSetNumber: smartListeningSet,
                        readingSetNumber: smartReadingSet,
                        writingSetNumber: smartWritingSet,
                        speakingSetNumber: 1,
                    }],
                    speakingSetNumber: 1,
                },
                examStatus: "not-started",
                isActive: true,
                canRetake: false,
                resultsPublished: false,
                violations: [],
                totalViolations: 0,
                createdBy: new Types.ObjectId(userId),
                userId: new Types.ObjectId(userId),
            });

            await Purchase.findByIdAndUpdate(purchase._id, {
                studentRecordId: studentRecord._id,
            });
        }
    }

    // Update payment with first purchase ID
    await Payment.findByIdAndUpdate(payment._id, {
        purchaseId: purchases[0]._id,
    });

    // Update total purchases
    await MockPackage.findByIdAndUpdate(pkg._id, {
        $inc: { totalPurchases: bundleSize },
    });

    // Send purchase confirmation email (non-blocking)
    if (user) {
        sendPurchaseConfirmationEmail({
            name: user.name,
            email: user.email,
            packageTitle: pkg.title,
            bundleSize,
            amount: finalAmount,
            paymentMethod,
            transactionId,
            examIds,
        }).catch(() => {});
    }

    return {
        purchases,
        payment,
        examIds,
        examId: examIds[0], // backward compat
        package: pkg,
        bundleSize,
    };
};

// Get user's purchased mocks
const getMyPurchases = async (userId: string) => {
    const purchases = await Purchase.find({
        userId: new Types.ObjectId(userId),
    })
        .populate("packageId")
        .populate("paymentId", "amount method transactionId paidAt discountAmount couponCode")
        .sort({ purchasedAt: -1 });

    // Enrich with student data (scores, status)
    const enriched = await Promise.all(
        purchases.map(async (p) => {
            const studentData = p.examId
                ? await Student.findOne({ examId: p.examId }).select(
                    "scores examStatus completedModules resultsPublished"
                )
                : null;
            return {
                ...p.toObject(),
                studentData,
            };
        })
    );

    return enriched;
};

// Get user's payment history
const getPaymentHistory = async (userId: string) => {
    const payments = await Payment.find({
        userId: new Types.ObjectId(userId),
    })
        .populate("packageId", "title price")
        .sort({ createdAt: -1 });
    return payments;
};

// =================== ANALYTICS SERVICE ===================

const getAnalytics = async () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
        totalRevenue,
        todayRevenue,
        monthRevenue,
        totalStudents,
        todayStudents,
        totalPurchases,
        totalExamsTaken,
        avgScore,
    ] = await Promise.all([
        Payment.aggregate([
            { $match: { status: "completed", method: { $ne: "free" } } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]),
        Payment.aggregate([
            { $match: { status: "completed", method: { $ne: "free" }, paidAt: { $gte: today } } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]),
        Payment.aggregate([
            { $match: { status: "completed", method: { $ne: "free" }, paidAt: { $gte: thisMonth } } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]),
        User.countDocuments({ role: "user" }),
        User.countDocuments({ role: "user", createdAt: { $gte: today } }),
        Purchase.countDocuments(),
        Student.countDocuments({ examStatus: "completed" }),
        Student.aggregate([
            { $match: { "scores.overall": { $exists: true, $gt: 0 } } },
            { $group: { _id: null, avg: { $avg: "$scores.overall" } } },
        ]),
    ]);

    // Revenue by method
    const revenueByMethod = await Payment.aggregate([
        { $match: { status: "completed", method: { $ne: "free" } } },
        { $group: { _id: "$method", total: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]);

    // Monthly revenue trend (last 6 months)
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const monthlyRevenue = await Payment.aggregate([
        { $match: { status: "completed", method: { $ne: "free" }, paidAt: { $gte: sixMonthsAgo } } },
        {
            $group: {
                _id: {
                    year: { $year: "$paidAt" },
                    month: { $month: "$paidAt" },
                },
                total: { $sum: "$amount" },
                count: { $sum: 1 },
            },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Recent purchases (last 10)
    const recentPurchases = await Purchase.find()
        .populate("userId", "name email")
        .populate("packageId", "title price")
        .sort({ purchasedAt: -1 })
        .limit(10);

    return {
        revenue: {
            total: totalRevenue[0]?.total || 0,
            today: todayRevenue[0]?.total || 0,
            thisMonth: monthRevenue[0]?.total || 0,
            byMethod: revenueByMethod,
            monthly: monthlyRevenue,
        },
        students: {
            total: totalStudents,
            today: todayStudents,
        },
        purchases: {
            total: totalPurchases,
        },
        exams: {
            total: totalExamsTaken,
            averageScore: avgScore[0]?.avg ? Math.round(avgScore[0].avg * 10) / 10 : 0,
        },
        recentPurchases,
    };
};

// Validate coupon
const validateCoupon = async (code: string, packagePrice: number) => {
    const coupon = await Coupon.findOne({
        code: code.toUpperCase(),
        isActive: true,
        validFrom: { $lte: new Date() },
        validUntil: { $gte: new Date() },
    });

    if (!coupon) throw new Error("Invalid or expired coupon code");
    if (coupon.currentUses >= coupon.maxUses) throw new Error("This coupon has reached its usage limit");
    if (packagePrice < coupon.minPurchase) throw new Error(`Minimum purchase amount is ৳${coupon.minPurchase}`);

    let discount = 0;
    if (coupon.discountType === "percentage") {
        discount = Math.round((packagePrice * coupon.discountValue) / 100);
    } else {
        discount = coupon.discountValue;
    }

    return {
        valid: true,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount: discount,
        finalPrice: Math.max(0, packagePrice - discount),
    };
};

// CRUD for coupons
const createCoupon = async (data: any, userId: string) => {
    return await Coupon.create({ ...data, createdBy: userId });
};

const getAllCoupons = async () => {
    return await Coupon.find().sort({ createdAt: -1 });
};

const deleteCoupon = async (id: string) => {
    return await Coupon.findByIdAndDelete(id);
};

// Get ALL purchases (admin — for Reports page)
const getAllPurchases = async () => {
    const purchases = await Purchase.find()
        .populate("userId", "name email phone")
        .populate("packageId", "title price isFree")
        .populate("paymentId", "amount method transactionId status")
        .sort({ purchasedAt: -1 });
    return purchases;
};

// Admin: Update purchase status (pause/activate/complete)
const updatePurchaseStatus = async (purchaseId: string, status: string) => {
    const validStatuses = ["active", "completed", "expired", "refunded", "paused"];
    if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
    }
    const purchase = await Purchase.findByIdAndUpdate(
        purchaseId,
        { status },
        { new: true }
    ).populate("userId", "name email phone")
     .populate("packageId", "title price isFree");
    if (!purchase) throw new Error("Purchase not found");
    return purchase;
};

// Admin: Delete a purchase and associated student record
const deletePurchase = async (purchaseId: string) => {
    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) throw new Error("Purchase not found");
    
    // Try to delete associated student record
    try {
        if (purchase.studentRecordId) {
            await Student.findByIdAndDelete(purchase.studentRecordId).catch(() => {});
        }
        if (purchase.examId) {
            await Student.deleteMany({ examId: purchase.examId }).catch(() => {});
        }
    } catch (e) {
        console.error("Error deleting student record:", e);
        // Continue with purchase deletion even if student deletion fails
    }
    
    // Also delete associated payment
    try {
        if (purchase.paymentId) {
            await Payment.findByIdAndDelete(purchase.paymentId).catch(() => {});
        }
    } catch (e) {
        console.error("Error deleting payment:", e);
    }
    
    await Purchase.findByIdAndDelete(purchaseId);
    return { message: "Purchase deleted successfully" };
};

// Admin: Bulk delete purchases
const bulkDeletePurchases = async (purchaseIds: string[]) => {
    let deleted = 0;
    for (const id of purchaseIds) {
        try {
            await deletePurchase(id);
            deleted++;
        } catch (e) {
            console.error(`Failed to delete purchase ${id}:`, e);
        }
    }
    return { deleted, total: purchaseIds.length };
};

// Admin: Bulk update purchase status
const bulkUpdateStatus = async (purchaseIds: string[], status: string) => {
    const validStatuses = ["active", "completed", "expired", "refunded", "paused"];
    if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status`);
    }
    const result = await Purchase.updateMany(
        { _id: { $in: purchaseIds.map(id => new Types.ObjectId(id)) } },
        { $set: { status } }
    );
    return { updated: result.modifiedCount, total: purchaseIds.length };
};


export const MockPackageService = {
    // Packages
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage,
    // Purchases
    claimFreeMock,
    purchaseMock,
    getMyPurchases,
    getAllPurchases,
    updatePurchaseStatus,
    deletePurchase,
    bulkDeletePurchases,
    bulkUpdateStatus,
    hasUsedFreeMock,
    getFreePackage,
    // Payments
    getPaymentHistory,
    // Analytics
    getAnalytics,
    // Coupons
    validateCoupon,
    createCoupon,
    getAllCoupons,
    deleteCoupon,
};
