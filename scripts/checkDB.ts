import mongoose from 'mongoose';
import { WritingTest } from '../src/app/modules/writing/writing.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

async function run() {
    try {
        await mongoose.connect(uri);
        const tests = await WritingTest.find({}).sort({testNumber: 1});
        console.log("All Writing Tests in DB:");
        tests.forEach(t => {
            const hasTask1Image = t.tasks.some(task => task.taskNumber === 1 && task.images && task.images.length > 0);
            console.log(`Test ${t.testNumber}: type -> ${t.testType}, hasImage -> ${hasTask1Image}`);
        });
    } catch(e) {
        console.log(e);
    } finally {
        await mongoose.disconnect();
    }
}
run();
