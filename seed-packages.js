const mongoose = require("mongoose");
require("dotenv").config();

const DATABASE_URL = process.env.DATABASE_URL;

async function seedMockPackages() {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log("✅ Connected to MongoDB");

        const db = mongoose.connection.db;
        const collection = db.collection("mockpackages");

        // Clear existing
        await collection.deleteMany({});
        console.log("🗑️ Cleared existing mock packages");

        const packages = [
            {
                title: "IELTS Mock Test - Set 1 (Free)",
                description: "Your first free mock test! Complete IELTS experience with Listening, Reading & Writing modules. Auto-graded with instant results.",
                price: 0,
                originalPrice: 99,
                currency: "BDT",
                examSets: {
                    listeningSetNumber: 1,
                    readingSetNumber: 1,
                    writingSetNumber: 1,
                },
                isFree: true,
                isActive: true,
                totalPurchases: 0,
                difficulty: "medium",
                tags: ["free", "beginner"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "IELTS Mock Test - Set 2",
                description: "Full IELTS mock test with unique questions. Practice under real exam conditions with timer, auto-grading & examiner feedback.",
                price: 99,
                originalPrice: 199,
                currency: "BDT",
                examSets: {
                    listeningSetNumber: 2,
                    readingSetNumber: 2,
                    writingSetNumber: 2,
                },
                isFree: false,
                isActive: true,
                totalPurchases: 127,
                difficulty: "medium",
                tags: ["popular", "recommended"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "IELTS Mock Test - Set 3",
                description: "Advanced difficulty mock test. Challenging passages and audio for serious IELTS preparation. Includes Writing examiner review.",
                price: 99,
                originalPrice: 199,
                currency: "BDT",
                examSets: {
                    listeningSetNumber: 3,
                    readingSetNumber: 3,
                    writingSetNumber: 3,
                },
                isFree: false,
                isActive: true,
                totalPurchases: 89,
                difficulty: "hard",
                tags: ["advanced"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "IELTS Mock Test - Set 4",
                description: "Fresh exam set with new reading passages, listening recordings & writing topics. Like a brand new IELTS sitting.",
                price: 99,
                originalPrice: 149,
                currency: "BDT",
                examSets: {
                    listeningSetNumber: 4,
                    readingSetNumber: 4,
                    writingSetNumber: 4,
                },
                isFree: false,
                isActive: true,
                totalPurchases: 45,
                difficulty: "medium",
                tags: ["new"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "IELTS Mock Test - Set 5",
                description: "Our latest mock test with 2024 exam pattern questions. Stay up-to-date with the most recent IELTS format changes.",
                price: 99,
                originalPrice: 199,
                currency: "BDT",
                examSets: {
                    listeningSetNumber: 5,
                    readingSetNumber: 5,
                    writingSetNumber: 5,
                },
                isFree: false,
                isActive: true,
                totalPurchases: 23,
                difficulty: "medium",
                tags: ["latest", "2024"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        const result = await collection.insertMany(packages);
        console.log(`✅ Created ${result.insertedCount} mock packages`);

        // Also create a sample coupon
        const couponCollection = db.collection("coupons");
        await couponCollection.deleteMany({});
        await couponCollection.insertOne({
            code: "FIRST50",
            discountType: "percentage",
            discountValue: 50,
            maxUses: 100,
            currentUses: 0,
            validFrom: new Date(),
            validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            minPurchase: 0,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log("✅ Created sample coupon: FIRST50 (50% off)");

        await mongoose.disconnect();
        console.log("\n🎉 Seed completed!");

    } catch (error) {
        console.error("❌ Seed failed:", error.message);
        process.exit(1);
    }
}

seedMockPackages();
