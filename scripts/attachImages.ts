import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { WritingTest } from '../src/app/modules/writing/writing.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";
const imageDir = path.resolve(__dirname, "../../bestieltsbd_client/public/mock/writingimg");

async function run() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB.");

        const files = fs.readdirSync(imageDir);
        const academicTests = await WritingTest.find({ testType: "academic" }).sort({ testNumber: 1 }).limit(20);
        let updatedCount = 0;

        for (let i = 0; i < academicTests.length; i++) {
            const doc = academicTests[i];
            const imageNumber = i + 1; // 1 to 20
            const fileName = `${imageNumber}.png`;

            // Find the task index inside the array
            const taskIndex = doc.tasks.findIndex(t => t.taskNumber === 1);
            if (taskIndex === -1) {
                console.log(`⚠️ Academic Test #${doc.testNumber} has no Task 1.`);
                continue;
            }

            if (files.includes(fileName)) {
                // Use updateOne to bypass mongoose document validation (e.g. invalid enums saved previously)
                await WritingTest.updateOne(
                    { _id: doc._id },
                    { $set: { [`tasks.${taskIndex}.images`]: [{
                        url: `/mock/writingimg/${fileName}`,
                        description: `Task 1 Visual for Test ${doc.testNumber}`,
                        caption: ""
                    }] } }
                );
                console.log(`✅ Mapped ${fileName} to ${i+1}th Academic Test (TestNumber: ${doc.testNumber})`);
                updatedCount++;
            } else {
                await WritingTest.updateOne(
                    { _id: doc._id },
                    { $set: { [`tasks.${taskIndex}.images`]: [] } }
                );
                console.log(`Missing ${fileName} - Cleared images for ${i+1}th Academic Test (TestNumber: ${doc.testNumber})`);
            }
        }
        
        console.log(`\nProcess finished. Successfully updated ${updatedCount} exams.`);
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

run();
