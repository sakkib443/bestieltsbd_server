import mongoose from 'mongoose';
import { WritingTest } from '../src/app/modules/writing/writing.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

async function run() {
    try {
        await mongoose.connect(uri);
        const tests = await WritingTest.find({testType: "academic"}).sort({testNumber: 1});
        const numbers = tests.map(t => t.testNumber);
        console.log("Academic Test Numbers:", numbers);
    } catch(e) {
        console.log(e);
    } finally {
        await mongoose.disconnect();
    }
}
run();
