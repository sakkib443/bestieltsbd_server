/**
 * Migration: Auto-publish all completed exam results
 * Run once: node auto-publish-results.js
 */

require("dotenv").config();
const mongoose = require("mongoose");

const DB_URL = process.env.DATABASE_URL;

async function run() {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(DB_URL);
    console.log("Connected!\n");

    const Student = mongoose.model("Student", new mongoose.Schema({}, { strict: false }));

    // Find all completed students where resultsPublished is not true
    const result = await Student.updateMany(
        {
            examStatus: "completed",
            $or: [
                { resultsPublished: false },
                { resultsPublished: { $exists: false } },
                { resultsPublished: null },
            ]
        },
        {
            $set: { resultsPublished: true }
        }
    );

    console.log(`✅ Auto-published results for ${result.modifiedCount} students`);
    console.log(`   (${result.matchedCount} matched, ${result.modifiedCount} updated)`);

    await mongoose.disconnect();
    console.log("\nDone!");
}

run().catch(err => {
    console.error("Error:", err);
    process.exit(1);
});
