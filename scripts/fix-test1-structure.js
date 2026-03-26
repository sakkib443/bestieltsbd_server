/**
 * Fix Listening Test 01 structure to match Test 02 format
 * 
 * Issues found:
 * 1. Q29-30: questionType should be "multiple-choice-multi" not "multiple-choice"
 * 2. Matching options (Q21-26) should be just letters ["A","B",...] not ["A. outgoing","B. selfish",...]
 *    (The option labels are in the instruction block HTML, not in the options array)
 */

const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb+srv://bac-ielts:bac-ielts@cluster0.b5kfivm.mongodb.net/bac-ielts?retryWrites=true&w=majority&appName=Cluster0';

async function main() {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('bac-ielts');
        const collection = db.collection('listeningtests');

        const test = await collection.findOne({ testNumber: 1 });
        if (!test) { console.log('Test 1 not found!'); return; }

        console.log('Found: ' + test.title);
        let fixCount = 0;

        for (const section of test.sections) {
            for (const q of section.questions) {
                if (q.blockType === 'instruction' || !q.questionNumber) continue;

                // FIX 1: Q29-30 should be multiple-choice-multi
                if (q.questionNumber === 29 || q.questionNumber === 30) {
                    if (q.questionType !== 'multiple-choice-multi') {
                        console.log('  Q' + q.questionNumber + ': type ' + q.questionType + ' -> multiple-choice-multi');
                        q.questionType = 'multiple-choice-multi';
                        // Also fix the questionText to match Test 2 format (no "First answer"/"Second answer")
                        q.questionText = 'Which TWO experiences of sibling rivalry do the speakers agree has been valuable for them?';
                        fixCount++;
                    }
                }

                // FIX 2: Matching questions (Q21-26) - options should be just letters
                if (q.questionType === 'matching' && q.options && q.options.length > 0) {
                    const hasLongOptions = q.options.some(o => o.length > 2);
                    if (hasLongOptions) {
                        // Extract just the letters
                        const letters = q.options.map(o => o.charAt(0));
                        console.log('  Q' + q.questionNumber + ': options "' + q.options[0] + '",... -> "' + letters[0] + '",...');
                        q.options = letters;
                        fixCount++;
                    }
                }
            }
        }

        if (fixCount === 0) {
            console.log('\nNo fixes needed - structure already matches Test 02!');
        } else {
            const result = await collection.updateOne(
                { testNumber: 1 },
                { $set: { sections: test.sections, updatedAt: new Date() } }
            );
            console.log('\nApplied ' + fixCount + ' fixes');
            console.log('Modified: ' + result.modifiedCount);
        }

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await client.close();
        console.log('Done');
    }
}

main();
