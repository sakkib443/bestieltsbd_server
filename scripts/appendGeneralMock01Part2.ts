import mongoose from 'mongoose';
import { ReadingTest } from '../src/app/modules/reading/reading.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

const newGroup = {
    groupType: "true-false-not-given",
    startQuestion: 21,
    endQuestion: 27,
    mainInstruction: "Questions 21-27",
    subInstruction: "In boxes 21 - 27 on your answer sheet write: TRUE if the statement is true, FALSE if the statement is false, NOT GIVEN if the information is not given in the reading passage.",
    statements: [
        { questionNumber: 21, text: "You can send documents weighing one and a half kilograms by Linkletter.", correctAnswer: "TRUE" },
        { questionNumber: 22, text: "Deliveries can be made at any time on Saturdays using the UK Domestic Product.", correctAnswer: "FALSE" },
        { questionNumber: 23, text: "Pets can be sent within the UK on payment of a special fee.", correctAnswer: "FALSE" },
        { questionNumber: 24, text: "For a fee, packages can be picked up by Parcel Fox from any address in the UK.", correctAnswer: "TRUE" },
        { questionNumber: 25, text: "A bespoke service for your delivery requirements can be arranged at any time during the year.", correctAnswer: "NOT GIVEN" },
        { questionNumber: 26, text: "Sameday deliveries cannot be guaranteed for deliveries to the US.", correctAnswer: "TRUE" },
        { questionNumber: 27, text: "International deliveries can only be sent by plane or ship.", correctAnswer: "FALSE" }
    ]
};

async function run() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB.");

        const testName = "Reading Mock Test 01 - General";
        let doc: any = await ReadingTest.findOne({ title: testName });

        if (!doc) {
            console.log(`Test '${testName}' not found. Please run Part 1 import first.`);
        } else {
            if (doc.sections && doc.sections.length > 1) {
                // Ensure we don't duplicate
                const existingGroupIndex = doc.sections[1].questionGroups.findIndex((g: any) => g.startQuestion === 21);
                if (existingGroupIndex !== -1) {
                    doc.sections[1].questionGroups[existingGroupIndex] = newGroup;
                } else {
                    doc.sections[1].questionGroups.push(newGroup);
                }
                
                await doc.save();
                console.log(`✅ Updated General Reading Mock 01 - Part 2 (Appended Questions 21-27) successfully.`);
            } else {
                console.log("Section 2 not found!");
            }
        }
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

run();
