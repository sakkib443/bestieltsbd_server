import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { IReadingTest, IReadingSection, IReadingQuestion } from '../src/app/modules/reading/reading.interface';
import { ReadingTest } from '../src/app/modules/reading/reading.model';
import { User } from '../src/app/modules/user/user.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

function parseAnswers(ansText: string): Record<number, string> {
    const answers: Record<number, string> = {};
    const textToSearch = ansText.replace(/\n/g, ' ').replace(/\t/g, ' ');
    const tokens = textToSearch.split(/\s+/);
    for (let i = 0; i < tokens.length; i++) {
        if (/^\d+\.$/.test(tokens[i])) {
            const num = parseInt(tokens[i].replace('.', ''), 10);
            let ans = [];
            let j = i + 1;
            while (j < tokens.length && !/^\d+\.$/.test(tokens[j])) {
                ans.push(tokens[j]);
                j++;
            }
            if (num >= 1 && num <= 40) {
                answers[num] = ans.join(' ').trim();
            }
        }
    }
    return answers;
}

function processTest(testType: "academic" | "general-training", contentFile: string, ansFile: string) {
    const rawContent = fs.readFileSync(path.resolve(__dirname, contentFile), 'utf-8');
    const rawAns = fs.readFileSync(path.resolve(__dirname, ansFile), 'utf-8');

    let pattern = testType === 'academic' ? /__Reading Passage \d+__/i : /__SECTION[:\s]+\d+.*__/i;
    const parts = rawContent.split(pattern);
    
    let s1 = parts.length > 1 ? parts[1] : rawContent;
    let s2 = parts.length > 2 ? parts[2] : "Please update this section passage from the test document.";
    let s3 = parts.length > 3 ? parts[3] : "Please update this section passage from the test document.";
    
    if (!s1.trim()) s1 = "Passage content 1...";
    if (!s2.trim()) s2 = "Passage content 2...";
    if (!s3.trim()) s3 = "Passage content 3...";
    
    const parsedAns = parseAnswers(rawAns);

    const qs = (start: number, end: number): IReadingQuestion[] => {
        const questions: IReadingQuestion[] = [];
        for (let i = start; i <= end; i++) {
            questions.push({
                questionNumber: i,
                questionType: 'short-answer', 
                questionText: `Question ${i} text...`,
                correctAnswer: parsedAns[i] || 'N/A',
                marks: 1
            });
        }
        return questions;
    };

    const sections: IReadingSection[] = [
        {
            sectionNumber: 1,
            title: testType === 'academic' ? "Reading Passage 1" : "Section 1",
            passage: s1.trim(),
            instructions: "Read the passage and answer the questions.",
            questions: qs(1, testType === 'academic' ? 13 : 13)
        },
        {
            sectionNumber: 2,
            title: testType === 'academic' ? "Reading Passage 2" : "Section 2",
            passage: s2.trim(),
            instructions: "Read the passage and answer the questions.",
            questions: qs(14, testType === 'academic' ? 26 : 27)
        },
        {
            sectionNumber: 3,
            title: testType === 'academic' ? "Reading Passage 3" : "Section 3",
            passage: s3.trim(),
            instructions: "Read the passage and answer the questions.",
            questions: qs(testType === 'academic' ? 27 : 28, 40)
        }
    ];

    return { sections };
}

async function run() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB.");

        const admin = await User.findOne({  }); 
        const adminId = admin ? admin._id : new mongoose.Types.ObjectId("000000000000000000000000");

        const academicData = processTest('academic', '../AC.md', '../AC_ans.md');
        const gtData = processTest('general-training', '../GT.md', '../GT_ans.md');

        const gtName = "Reading Mock Test 01 - General Training";
        await ReadingTest.deleteMany({ title: gtName });

        const lastTest = await ReadingTest.findOne().sort({ testNumber: -1 });
        const lastNum = lastTest ? lastTest.testNumber : 0;

        await ReadingTest.create({
            testId: `READING_GT_01_${Math.floor(Math.random() * 1000)}`,
            testNumber: lastNum + 1,
            title: gtName,
            testType: "general-training",
            totalQuestions: 40,
            totalMarks: 40,
            duration: 60,
            difficulty: "medium",
            sections: gtData.sections,
            createdBy: adminId,
            isActive: true
        });
        console.log("✅ GT Reading Mock 01 created.");

    } catch(e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

run();
