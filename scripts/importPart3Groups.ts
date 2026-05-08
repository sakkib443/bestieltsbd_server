import mongoose from 'mongoose';
import { ReadingTest } from '../src/app/modules/reading/reading.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

const questionGroups = [
    {
        groupType: "custom-flowchart-1",
        startQuestion: 27,
        endQuestion: 32,
        mainInstruction: "Questions 27-32",
        subInstruction: "Complete the flow-chart below. Write NO MORE THAN THREE WORDS for each answer.",
        questions: [
            { questionNumber: 27, correctAnswer: "a rapid rate" },
            { questionNumber: 28, correctAnswer: "result from" },
            { questionNumber: 29, correctAnswer: "cause" },
            { questionNumber: 30, correctAnswer: "water loss" },
            { questionNumber: 31, correctAnswer: "topsoil" },
            { questionNumber: 32, correctAnswer: "soil nutrients" }
        ]
    },
    {
        groupType: "matching-information",
        startQuestion: 33,
        endQuestion: 36,
        mainInstruction: "Questions 33-36",
        subInstruction: "Reading Passage 3 has seven paragraphs, A - G. Which paragraph contains the following information? Write the correct letter A - G in spaces 33 - 36 below.",
        paragraphOptions: ["A", "B", "C", "D", "E", "F", "G"],
        matchingItems: [
            { questionNumber: 33, text: "Human intervention is a potential solution to potential disaster.", correctAnswer: "G" },
            { questionNumber: 34, text: "The rate of climate change is set to accelerate dramatically.", correctAnswer: "E" },
            { questionNumber: 35, text: "There is seldom enough information available in some areas to track how fast the effects of climate change have happened in the past.", correctAnswer: "D" },
            { questionNumber: 36, text: "Desertification is attributable to a number of factors.", correctAnswer: "B" }
        ]
    },
    {
        groupType: "summary-with-options",
        startQuestion: 37,
        endQuestion: 40,
        mainInstruction: "Questions 37-40",
        subInstruction: "Complete the summary with the list of words A - I below. Write the correct letter A - I in spaces 37-40 below.",
        phrases: [
            { letter: "A", text: "Irrigation" },
            { letter: "B", text: "Cooling" },
            { letter: "C", text: "Drylands" },
            { letter: "D", text: "Cause" },
            { letter: "E", text: "Loss" },
            { letter: "F", text: "Abuse" },
            { letter: "G", text: "Desertification" },
            { letter: "H", text: "Deserts" },
            { letter: "I", text: "Emission" }
        ],
        summarySegments: [
            { type: "text", content: "Climate change may have catastrophic effects on the human and animal world. As glaciers melt, sea levels will rise, causing extensive flooding and land" },
            { type: "blank", questionNumber: 37, correctAnswer: "E" },
            { type: "text", content: ". Another consequence of global warming is" },
            { type: "blank", questionNumber: 38, correctAnswer: "G" },
            { type: "text", content: ", which affects areas known as" },
            { type: "blank", questionNumber: 39, correctAnswer: "C" },
            { type: "text", content: ". These areas are subject to irregular weather patterns, but also suffer from human intervention or neglect, such as inadequate or inefficient" },
            { type: "blank", questionNumber: 40, correctAnswer: "A" },
            { type: "text", content: "systems." }
        ]
    }
];

async function run() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB.");

        const acName = "Reading Mock Test 01 - Academic";
        const doc: any = await ReadingTest.findOne({ title: acName });

        if (doc && doc.sections && doc.sections.length > 2) {
            doc.sections[2].questionGroups = questionGroups;
            // Clear outer section.questions to avoid duplicates if any
            doc.sections[2].questions = [];
            
            await doc.save();
            console.log("✅ Academic Reading Mock 01 - Part 3 GROUPS updated successfully.");
        } else {
            console.log("❌ Academic Reading Mock 01 not found or Part 3 not initialized.");
        }

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

run();
