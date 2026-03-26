/**
 * Script: Set Cambridge IELTS 15 Listening Test 1 Answer Keys
 * Target: Listening Test Number 1
 * 
 * Usage: node scripts/set-listening1-answers.js
 */

const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb+srv://bac-ielts:bac-ielts@cluster0.b5kfivm.mongodb.net/bac-ielts?retryWrites=true&w=majority&appName=Cluster0';

// Cambridge IELTS 15 Listening Test 1 — Official Answer Key
const ANSWER_KEY = {
    // Part 1: Bankside Recruitment Agency
    1: 'Jamieson',
    2: 'afternoon',
    3: 'communication',
    4: 'week',
    5: '10',
    6: 'suit',
    7: 'passport',
    8: 'personality',
    9: 'feedback',
    10: 'time',

    // Part 2: Isle of Man Holiday
    11: 'A',
    12: 'B',
    13: 'A',
    14: 'C',
    15: 'river',
    16: '1422',
    17: 'top',
    18: 'pass',
    19: 'steam',
    20: 'capital',

    // Part 3: Birth Order and Personality
    21: 'G',
    22: 'F',
    23: 'A',
    24: 'E',
    25: 'B',
    26: 'C',
    27: 'C',
    28: 'A',
    29: 'B',    // 29 & 30: B, D (multi-select — sibling rivalry)
    30: 'D',

    // Part 4: The Eucalyptus Tree in Australia
    31: 'shelter',
    32: 'oil',
    33: 'roads',
    34: 'insects',
    35: 'grass',       // also accept: grasses
    36: 'water',
    37: 'soil',
    38: 'dry',
    39: 'simple',
    40: 'nest',        // also accept: nests
};

// Acceptable alternate answers
const ACCEPTABLE_ANSWERS = {
    5: ['ten', '10'],
    35: ['grasses', 'grass'],
    40: ['nests', 'nest'],
};

async function main() {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('bac-ielts');
        const collection = db.collection('listeningtests');

        // Find Listening Test 1
        const test = await collection.findOne({ testNumber: 1 });

        if (!test) {
            console.log('Listening Test 1 not found!');
            return;
        }

        console.log('Found: "' + test.title + '" (ID: ' + test.testId + ')');
        console.log('Sections: ' + test.sections.length);

        // Update each question with correct answers
        let updatedCount = 0;
        const sections = test.sections;

        for (const section of sections) {
            for (const question of section.questions) {
                // Skip instruction blocks
                if (question.blockType === 'instruction' || !question.questionNumber) continue;

                const qNum = question.questionNumber;
                const correctAns = ANSWER_KEY[qNum];

                if (correctAns) {
                    question.correctAnswer = correctAns;

                    // Add acceptable answers if any
                    if (ACCEPTABLE_ANSWERS[qNum]) {
                        question.acceptableAnswers = ACCEPTABLE_ANSWERS[qNum];
                    }

                    updatedCount++;
                    console.log('  Q' + qNum + ': ' + correctAns + (ACCEPTABLE_ANSWERS[qNum] ? ' (also: ' + ACCEPTABLE_ANSWERS[qNum].join(', ') + ')' : ''));
                } else {
                    console.log('  Q' + qNum + ': NO ANSWER KEY FOUND');
                }
            }
        }

        // Save back to database
        const result = await collection.updateOne(
            { testNumber: 1 },
            { $set: { sections: sections, updatedAt: new Date() } }
        );

        console.log('\nUpdated ' + updatedCount + '/40 questions');
        console.log('Modified count: ' + result.modifiedCount);
        console.log('Cambridge IELTS 15 Test 1 answers set for Listening Test 1!');

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

main();
