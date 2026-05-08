import mongoose from 'mongoose';
import { ReadingTest } from '../src/app/modules/reading/reading.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

async function run() {
    try {
        await mongoose.connect(uri);
        const acName = "Reading Mock Test 01 - Academic";
        const doc: any = await ReadingTest.findOne({ title: acName });
        const section = doc.sections[2];
        console.log("Section 3 questions count directly:", section.questions?.length);
        console.log("Section 3 Groups:");
        section.questionGroups.forEach((g, i) => {
             const qCount = g.questions?.length || g.markers?.length || g.mcQuestions?.length || g.matchingItems?.length || g.summarySegments?.filter(s => s.type === 'blank').length || 0;
             console.log(`- Group ${i} (${g.groupType}): ${qCount} questions. bounds: [${g.startQuestion}, ${g.endQuestion}]`);
        });
    } finally {
        await mongoose.disconnect();
    }
}
run();
