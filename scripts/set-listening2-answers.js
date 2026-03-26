/**
 * Script: Set Cambridge IELTS 16 Listening Test 1 Answer Keys
 * Target: Listening Test Number 2
 * 
 * Usage: node scripts/set-listening2-answers.js
 */

const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb+srv://bac-ielts:bac-ielts@cluster0.b5kfivm.mongodb.net/bac-ielts?retryWrites=true&w=majority&appName=Cluster0';

// Cambridge IELTS 16 Listening Test 1 — Official Answer Key
const ANSWER_KEY = {
    // Part 1: Children's Engineering Workshops
    1: 'egg',
    2: 'tower',
    3: 'car',
    4: 'animals',
    5: 'bridge',
    6: 'movie',          // also accept: film
    7: 'decorate',
    8: 'Wednesdays',
    9: 'Fradstone',
    10: 'parking',

    // Part 2: Stevenson's
    11: 'C',
    12: 'A',
    13: 'B',
    14: 'C',
    15: 'H',
    16: 'C',
    17: 'G',
    18: 'B',
    19: 'I',
    20: 'A',

    // Part 3
    21: 'C',    // 21 & 22: C, E (multi-select)
    22: 'E',
    23: 'B',    // 23 & 24: B, E (multi-select)
    24: 'E',
    25: 'D',
    26: 'C',
    27: 'A',
    28: 'H',
    29: 'F',
    30: 'G',

    // Part 4: Stoicism
    31: 'practical',
    32: 'publication',
    33: 'choices',
    34: 'negative',
    35: 'play',
    36: 'capitalism',
    37: 'depression',
    38: 'logic',
    39: 'opportunity',
    40: 'practice',     // also accept: practise
};

// Acceptable alternate answers
const ACCEPTABLE_ANSWERS = {
    6: ['film', 'movie'],
    40: ['practise', 'practice'],
};

async function main() {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db('bac-ielts');
        const collection = db.collection('listeningtests');

        // Find Listening Test 2
        const test = await collection.findOne({ testNumber: 2 });

        if (!test) {
            console.log('❌ Listening Test 2 not found!');
            return;
        }

        console.log(`📝 Found: "${test.title}" (ID: ${test.testId})`);
        console.log(`   Sections: ${test.sections.length}`);

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
                    console.log(`   Q${qNum}: ✅ ${correctAns}${ACCEPTABLE_ANSWERS[qNum] ? ` (also: ${ACCEPTABLE_ANSWERS[qNum].join(', ')})` : ''}`);
                } else {
                    console.log(`   Q${qNum}: ⚠️ No answer key found`);
                }
            }
        }

        // Save back to database
        const result = await collection.updateOne(
            { testNumber: 2 },
            { $set: { sections: sections, updatedAt: new Date() } }
        );

        console.log(`\n✅ Updated ${updatedCount}/40 questions`);
        console.log(`   Modified count: ${result.modifiedCount}`);
        console.log('\n🎉 Cambridge IELTS 16 Test 1 answers set for Listening Test 2!');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await client.close();
        console.log('🔌 Disconnected from MongoDB');
    }
}

main();
