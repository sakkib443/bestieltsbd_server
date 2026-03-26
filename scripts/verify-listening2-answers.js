/**
 * Verify Listening Test 2 answers were set correctly
 */
const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb+srv://bac-ielts:bac-ielts@cluster0.b5kfivm.mongodb.net/bac-ielts?retryWrites=true&w=majority&appName=Cluster0';

async function main() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('bac-ielts');
        const test = await db.collection('listeningtests').findOne({ testNumber: 2 });

        if (!test) {
            console.log('Test 2 not found');
            return;
        }

        console.log('Title: ' + test.title);

        let answeredCount = 0;
        let missingCount = 0;

        for (const section of test.sections) {
            console.log('\n--- Section ' + section.sectionNumber + ': ' + section.title + ' ---');
            for (const q of section.questions) {
                if (q.blockType === 'instruction' || !q.questionNumber) continue;
                if (q.correctAnswer) {
                    console.log('Q' + q.questionNumber + ': ' + JSON.stringify(q.correctAnswer) + (q.acceptableAnswers ? ' (alt: ' + q.acceptableAnswers.join(', ') + ')' : ''));
                    answeredCount++;
                } else {
                    console.log('Q' + q.questionNumber + ': MISSING ANSWER');
                    missingCount++;
                }
            }
        }

        console.log('\n\nTotal with answers: ' + answeredCount);
        console.log('Total missing: ' + missingCount);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await client.close();
    }
}

main();
