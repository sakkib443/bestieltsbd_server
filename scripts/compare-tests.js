/**
 * Compare Listening Test 1 and Test 2 structures
 */
const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb+srv://bac-ielts:bac-ielts@cluster0.b5kfivm.mongodb.net/bac-ielts?retryWrites=true&w=majority&appName=Cluster0';

async function main() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('bac-ielts');

        const test1 = await db.collection('listeningtests').findOne({ testNumber: 1 });
        const test2 = await db.collection('listeningtests').findOne({ testNumber: 2 });

        if (!test1) { console.log('Test 1 not found'); return; }
        if (!test2) { console.log('Test 2 not found'); return; }

        console.log('========== TEST 1 ==========');
        console.log('Title: ' + test1.title);
        console.log('mainAudioUrl: ' + (test1.mainAudioUrl || 'NONE'));
        console.log('Sections: ' + test1.sections.length);

        for (const sec of test1.sections) {
            console.log('\n--- Section ' + sec.sectionNumber + ': ' + sec.title + ' ---');
            console.log('  audioUrl: ' + (sec.audioUrl || 'NONE'));
            console.log('  instructions: ' + (sec.instructions || 'NONE').substring(0, 80));
            console.log('  imageUrl: ' + (sec.imageUrl || 'NONE'));
            console.log('  Questions: ' + sec.questions.length);

            for (const q of sec.questions) {
                if (q.blockType === 'instruction') {
                    console.log('    [INSTRUCTION] ' + (q.content || '').substring(0, 100));
                } else {
                    const opts = q.options ? q.options.length + ' opts' : 'no opts';
                    console.log('    Q' + (q.questionNumber || '?') + ': type=' + (q.questionType || 'NONE') + ', ' + opts + ', ans=' + JSON.stringify(q.correctAnswer || 'NONE') + ', text="' + (q.questionText || '').substring(0, 60) + '"');
                }
            }
        }

        console.log('\n\n========== TEST 2 ==========');
        console.log('Title: ' + test2.title);
        console.log('mainAudioUrl: ' + (test2.mainAudioUrl || 'NONE'));
        console.log('Sections: ' + test2.sections.length);

        for (const sec of test2.sections) {
            console.log('\n--- Section ' + sec.sectionNumber + ': ' + sec.title + ' ---');
            console.log('  audioUrl: ' + (sec.audioUrl || 'NONE'));
            console.log('  instructions: ' + (sec.instructions || 'NONE').substring(0, 80));
            console.log('  imageUrl: ' + (sec.imageUrl || 'NONE'));
            console.log('  Questions: ' + sec.questions.length);

            for (const q of sec.questions) {
                if (q.blockType === 'instruction') {
                    console.log('    [INSTRUCTION] ' + (q.content || '').substring(0, 100));
                } else {
                    const opts = q.options ? q.options.length + ' opts' : 'no opts';
                    console.log('    Q' + (q.questionNumber || '?') + ': type=' + (q.questionType || 'NONE') + ', ' + opts + ', ans=' + JSON.stringify(q.correctAnswer || 'NONE') + ', text="' + (q.questionText || '').substring(0, 60) + '"');
                }
            }
        }

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await client.close();
    }
}

main();
