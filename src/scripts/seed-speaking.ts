/**
 * Seed Script: British Council Standard IELTS Speaking Test
 * 
 * Creates a proper Speaking test set and assigns it (speakingSetNumber: 1)
 * to ALL existing student records.
 * 
 * Run: npx ts-node src/scripts/seed-speaking.ts
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const MONGO_URI = process.env.DATABASE_URL || process.env.MONGO_URI || "";

// ── British Council Standard Speaking Test Data ──
const SPEAKING_TEST = {
    testId: "SPEAKING_001",
    testNumber: 1,
    title: "IELTS Speaking Test — Set 1 (British Council Standard)",
    description: "A full-length IELTS Speaking test following British Council / IDP examination standards. Covers all three parts: Introduction & Interview, Individual Long Turn (Cue Card), and Two-way Discussion.",
    source: "British Council Standard Format",
    difficulty: "medium",
    isActive: true,
    usageCount: 0,

    part1: {
        topics: [
            {
                topicName: "Home & Accommodation",
                questions: [
                    "Do you live in a house or an apartment?",
                    "What do you like most about your home?",
                    "Is there anything you would like to change about your home?",
                    "How long have you been living in your current home?",
                ]
            },
            {
                topicName: "Daily Routine",
                questions: [
                    "What is your typical daily routine?",
                    "Do you usually have the same routine every day?",
                    "What part of your day do you enjoy the most?",
                    "Would you like to change anything about your daily routine?",
                ]
            },
            {
                topicName: "Work or Studies",
                questions: [
                    "Do you work or are you a student?",
                    "What do you like about your work/studies?",
                    "Why did you choose this field of work/study?",
                    "What are your future plans regarding your career/studies?",
                ]
            }
        ],
        duration: 5,
    },

    part2: {
        topic: "Describe a time when you helped someone",
        cueCard: "Describe a time when you helped someone.\n\nYou should say:\n• who you helped\n• how you helped this person\n• why you helped this person\n\nand explain how you felt after helping this person.",
        bulletPoints: [
            "who you helped",
            "how you helped this person",
            "why you helped this person",
            "and explain how you felt after helping this person"
        ],
        followUpQuestion: "Do you think it's important to help others? Why or why not?",
        preparationTime: 60,
        speakingTime: 120,
        followUpQuestions: [
            "Is it common for people in your country to help strangers?",
            "Do you think helping others can sometimes be difficult?"
        ]
    },

    part3: {
        topic: "Helping Others & Community Support",
        questions: [
            "Why do some people enjoy helping others while some don't?",
            "Do you think people are less willing to help others now compared to the past? Why?",
            "In what ways can governments encourage people to help each other?",
            "Do you think children should be taught to help others from a young age? How?",
            "What role do charities and non-profit organisations play in modern society?",
            "Some people believe that helping others too much can make them dependent. Do you agree?"
        ],
        duration: 5,
    },

    totalQuestions: 16, // 12 Part1 + 1 Part2 cue + 1 followup + 6 Part3 = ~16
    duration: 14, // 5 + 4 + 5 = 14 minutes
};

async function seedSpeaking() {
    try {
        console.log("🔌 Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected!\n");

        const db = mongoose.connection.db;
        if (!db) throw new Error("DB connection failed");

        // ═══ Step 1: Create the Speaking Test ═══
        console.log("📝 Creating British Council Standard Speaking Test...");

        const speakingCollection = db.collection("speakingtests");

        // Check if test already exists
        const existing = await speakingCollection.findOne({ testNumber: 1 });
        if (existing) {
            console.log("⚠️  Speaking Test #1 already exists. Updating...");
            await speakingCollection.updateOne(
                { testNumber: 1 },
                { $set: { ...SPEAKING_TEST, updatedAt: new Date() } }
            );
            console.log("✅ Speaking Test #1 updated.\n");
        } else {
            await speakingCollection.insertOne({
                ...SPEAKING_TEST,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            console.log("✅ Speaking Test #1 created successfully!\n");
        }

        // ═══ Step 2: Add speakingSetNumber to ALL student records ═══
        console.log("🎯 Adding speakingSetNumber: 1 to ALL student records...");

        const studentsCollection = db.collection("students");

        // Count all students
        const totalStudents = await studentsCollection.countDocuments({});
        console.log(`   Found ${totalStudents} student records.`);

        // Update all student records to include speakingSetNumber: 1
        const updateResult = await studentsCollection.updateMany(
            {}, // all students
            {
                $set: {
                    "assignedSets.speakingSetNumber": 1,
                }
            }
        );

        console.log(`✅ Updated ${updateResult.modifiedCount} / ${totalStudents} student records.\n`);

        // ═══ Step 3: Also add speaking to fullSets if they exist ═══
        console.log("📦 Checking fullSets arrays for speaking assignment...");

        // Find students that have fullSets
        const studentsWithFullSets = await studentsCollection.find({
            "assignedSets.fullSets": { $exists: true, $ne: [] }
        }).toArray();

        let updatedFullSets = 0;
        for (const student of studentsWithFullSets) {
            const fullSets = student.assignedSets?.fullSets || [];
            let changed = false;

            for (let i = 0; i < fullSets.length; i++) {
                if (!fullSets[i].speakingSetNumber) {
                    fullSets[i].speakingSetNumber = 1;
                    changed = true;
                }
            }

            if (changed) {
                await studentsCollection.updateOne(
                    { _id: student._id },
                    { $set: { "assignedSets.fullSets": fullSets } }
                );
                updatedFullSets++;
            }
        }

        console.log(`✅ Updated ${updatedFullSets} students' fullSets with speakingSetNumber: 1\n`);

        // ═══ Summary ═══
        console.log("════════════════════════════════════════════");
        console.log("✅ SEED COMPLETE!");
        console.log(`   • Speaking Test: SPEAKING_001 (testNumber: 1)`);
        console.log(`   • Title: ${SPEAKING_TEST.title}`);
        console.log(`   • Part 1: ${SPEAKING_TEST.part1.topics.length} topics, ${SPEAKING_TEST.part1.topics.reduce((s, t) => s + t.questions.length, 0)} questions`);
        console.log(`   • Part 2: Cue Card — "${SPEAKING_TEST.part2.topic}"`);
        console.log(`   • Part 3: ${SPEAKING_TEST.part3.questions.length} discussion questions`);
        console.log(`   • Assigned to ${updateResult.modifiedCount} student records`);
        console.log("════════════════════════════════════════════");

    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await mongoose.disconnect();
        console.log("\n🔌 Disconnected from MongoDB.");
        process.exit(0);
    }
}

seedSpeaking();
