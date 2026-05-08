import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const SOURCE_DB = "mongodb+srv://bac-ielts:bac-ielts@cluster0.b5kfivm.mongodb.net/bac-ielts?retryWrites=true&w=majority&appName=Cluster0";
const DEST_DB = process.env.DATABASE_URL || "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

async function migrate() {
    try {
        // Connect to SOURCE database
        console.log("🔗 Connecting to SOURCE database (bac-ielts)...");
        const sourceConn = await mongoose.createConnection(SOURCE_DB).asPromise();
        const sourceDb = sourceConn.db;
        if (!sourceDb) throw new Error("Source DB connection failed");
        console.log("✅ Source DB connected!");

        // Connect to DESTINATION database
        console.log("🔗 Connecting to DESTINATION database (bestieltsbd)...");
        const destConn = await mongoose.createConnection(DEST_DB).asPromise();
        const destDb = destConn.db;
        if (!destDb) throw new Error("Destination DB connection failed");
        console.log("✅ Destination DB connected!");

        // Get admin user from destination for createdBy
        const adminUser = await destDb.collection("users").findOne({ role: "admin" });
        if (!adminUser) {
            throw new Error("No admin user found in destination DB. Please create one first.");
        }
        console.log(`👤 Admin user found: ${adminUser.email}`);

        // ============ LISTENING TESTS (set 2 & 3) ============
        console.log("\n📋 Migrating LISTENING tests (testNumber 2 & 3)...");
        const sourceListeningCollection = sourceDb.collection("listeningtests");
        const destListeningCollection = destDb.collection("listeningtests");

        const listeningTests = await sourceListeningCollection
            .find({ testNumber: { $in: [2, 3] } })
            .toArray();

        console.log(`   Found ${listeningTests.length} listening tests in source`);

        for (const test of listeningTests) {
            // Check if already exists
            const existing = await destListeningCollection.findOne({ testNumber: test.testNumber });
            if (existing) {
                console.log(`   ⚠️ Listening test ${test.testNumber} already exists, skipping...`);
                continue;
            }

            // Remove _id so MongoDB generates a new one
            const { _id, ...testData } = test;
            testData.createdBy = adminUser._id;
            testData.usageCount = 0;
            testData.isActive = true;

            await destListeningCollection.insertOne(testData);
            console.log(`   ✅ Listening test ${test.testNumber} (${test.title}) migrated!`);
        }

        // ============ READING TESTS (set 2 & 3) ============
        console.log("\n📋 Migrating READING tests (testNumber 2 & 3)...");
        const sourceReadingCollection = sourceDb.collection("readingtests");
        const destReadingCollection = destDb.collection("readingtests");

        const readingTests = await sourceReadingCollection
            .find({ testNumber: { $in: [2, 3] } })
            .toArray();

        console.log(`   Found ${readingTests.length} reading tests in source`);

        for (const test of readingTests) {
            const existing = await destReadingCollection.findOne({ testNumber: test.testNumber });
            if (existing) {
                console.log(`   ⚠️ Reading test ${test.testNumber} already exists, skipping...`);
                continue;
            }

            const { _id, ...testData } = test;
            testData.createdBy = adminUser._id;
            testData.usageCount = 0;
            testData.isActive = true;

            await destReadingCollection.insertOne(testData);
            console.log(`   ✅ Reading test ${test.testNumber} (${test.title}) migrated!`);
        }

        // ============ WRITING TESTS (set 2 & 3) ============
        console.log("\n📋 Migrating WRITING tests (testNumber 2 & 3)...");
        const sourceWritingCollection = sourceDb.collection("writingtests");
        const destWritingCollection = destDb.collection("writingtests");

        const writingTests = await sourceWritingCollection
            .find({ testNumber: { $in: [2, 3] } })
            .toArray();

        console.log(`   Found ${writingTests.length} writing tests in source`);

        for (const test of writingTests) {
            const existing = await destWritingCollection.findOne({ testNumber: test.testNumber });
            if (existing) {
                console.log(`   ⚠️ Writing test ${test.testNumber} already exists, skipping...`);
                continue;
            }

            const { _id, ...testData } = test;
            testData.createdBy = adminUser._id;
            testData.usageCount = 0;
            testData.isActive = true;

            await destWritingCollection.insertOne(testData);
            console.log(`   ✅ Writing test ${test.testNumber} (${test.title}) migrated!`);
        }

        // Summary
        console.log("\n🎉 Migration Summary:");
        const destListeningCount = await destListeningCollection.countDocuments();
        const destReadingCount = await destReadingCollection.countDocuments();
        const destWritingCount = await destWritingCollection.countDocuments();
        console.log(`   Listening tests in destination: ${destListeningCount}`);
        console.log(`   Reading tests in destination: ${destReadingCount}`);
        console.log(`   Writing tests in destination: ${destWritingCount}`);

        // Disconnect
        await sourceConn.close();
        await destConn.close();
        console.log("\n✅ All connections closed. Migration complete!");

    } catch (error) {
        console.error("❌ Migration error:", error);
        process.exit(1);
    }
}

migrate();
