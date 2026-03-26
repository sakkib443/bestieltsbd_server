/**
 * Dump full JSON structure of Listening Test 1 vs Test 2
 * To find structural differences
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

        // Dump Test 1 full structure
        const t1Data = {
            title: test1.title,
            mainAudioUrl: test1.mainAudioUrl,
            sections: test1.sections.map(s => ({
                sectionNumber: s.sectionNumber,
                title: s.title,
                instructions: s.instructions,
                audioUrl: s.audioUrl,
                imageUrl: s.imageUrl,
                context: s.context,
                passage: s.passage,
                questions: s.questions.map(q => {
                    if (q.blockType === 'instruction') {
                        return { blockType: 'instruction', content: q.content };
                    }
                    return {
                        blockType: q.blockType || 'question',
                        questionNumber: q.questionNumber,
                        questionType: q.questionType,
                        questionText: q.questionText,
                        options: q.options,
                        correctAnswer: q.correctAnswer,
                        acceptableAnswers: q.acceptableAnswers,
                        imageUrl: q.imageUrl,
                        marks: q.marks,
                    };
                })
            }))
        };

        const t2Data = {
            title: test2.title,
            mainAudioUrl: test2.mainAudioUrl,
            sections: test2.sections.map(s => ({
                sectionNumber: s.sectionNumber,
                title: s.title,
                instructions: s.instructions,
                audioUrl: s.audioUrl,
                imageUrl: s.imageUrl,
                context: s.context,
                passage: s.passage,
                questions: s.questions.map(q => {
                    if (q.blockType === 'instruction') {
                        return { blockType: 'instruction', content: q.content };
                    }
                    return {
                        blockType: q.blockType || 'question',
                        questionNumber: q.questionNumber,
                        questionType: q.questionType,
                        questionText: q.questionText,
                        options: q.options,
                        correctAnswer: q.correctAnswer,
                        acceptableAnswers: q.acceptableAnswers,
                        imageUrl: q.imageUrl,
                        marks: q.marks,
                    };
                })
            }))
        };

        require('fs').writeFileSync('scripts/test1-full.json', JSON.stringify(t1Data, null, 2), 'utf8');
        require('fs').writeFileSync('scripts/test2-full.json', JSON.stringify(t2Data, null, 2), 'utf8');

        console.log('Saved test1-full.json and test2-full.json');

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await client.close();
    }
}

main();
