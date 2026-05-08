import mongoose from 'mongoose';
import { ReadingTest } from '../src/app/modules/reading/reading.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

async function run() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB.");

        const acName = "Reading Mock Test 01 - Academic";
        const doc: any = await ReadingTest.findOne({ title: acName });

        if (doc && doc.sections && doc.sections.length > 2) {
            console.log("Part 3 Question Groups:");
            doc.sections[2].questionGroups.forEach((g: any, i: number) => {
                 console.log(`Group ${i}: `, g.groupType);
            });
        }
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

run();
