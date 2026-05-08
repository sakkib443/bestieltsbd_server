import mongoose from 'mongoose';
import { ReadingTest } from '../src/app/modules/reading/reading.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

const questionGroups = [
    {
        groupType: "matching-headings",
        startQuestion: 14,
        endQuestion: 19,
        mainInstruction: "Reading Passage 2 has seven paragraphs, A-G.",
        subInstruction: "Choose the correct heading for paragraphs B-G from the list of headings below. Write the correct number i-ix in spaces 14-19 below.",
        featureListTitle: "List of Headings",
        featureOptions: [
            { letter: "i", text: "A non-exclusive language" },
            { letter: "ii", text: "Artificiality of the language" }, // placeholder since it was missing in the image
            { letter: "iii", text: "Language is personal" },
            { letter: "iv", text: "What's fashionable in language" },
            { letter: "v", text: "From the written word to the spoken word" },
            { letter: "vi", text: "A real language" },
            { letter: "vii", text: "Harmony through language" },
            { letter: "viii", text: "The mechanics of a language" },
            { letter: "ix", text: "Lost in translation" }
        ],
        matchingItems: [
            { questionNumber: 14, text: "Paragraph B", correctAnswer: "i" }, // Assuming i, can be updated later
            { questionNumber: 15, text: "Paragraph C", correctAnswer: "viii" },
            { questionNumber: 16, text: "Paragraph D", correctAnswer: "iii" },
            { questionNumber: 17, text: "Paragraph E", correctAnswer: "vi" },
            { questionNumber: 18, text: "Paragraph F", correctAnswer: "i" }, // Will adjust
            { questionNumber: 19, text: "Paragraph G", correctAnswer: "ix" }
        ]
    },
    {
        groupType: "multiple-choice-full",
        startQuestion: 20,
        endQuestion: 22,
        mainInstruction: "Questions 20-22",
        subInstruction: "Choose the correct letter A, B, C or D.",
        mcQuestions: [
            {
                questionNumber: 20,
                questionText: "What advantage is there to learning Esperanto as one's first foreign language?",
                options: [
                    { letter: "A", text: "Its pronunciation rules follow those of most European languages." },
                    { letter: "B", text: "There are no grammar rules to learn." },
                    { letter: "C", text: "It can make the learning of other foreign languages less complicated." },
                    { letter: "D", text: "Its verbs are not conjugated." }
                ],
                correctAnswer: "C"
            },
            {
                questionNumber: 21,
                questionText: "What do its critics say of Esperanto?",
                options: [
                    { letter: "A", text: "It is only used in artificial situations." },
                    { letter: "B", text: "It requires emotional involvement." },
                    { letter: "C", text: "It cannot translate works of literature." },
                    { letter: "D", text: "It lacks depth of expression." }
                ],
                correctAnswer: "D"
            },
            {
                questionNumber: 22,
                questionText: "How could Esperanto help on a global level?",
                options: [
                    { letter: "A", text: "It would eliminate the need for conferences." },
                    { letter: "B", text: "More aid money would reach those who need it." },
                    { letter: "C", text: "The world population would be speaking only one language." },
                    { letter: "D", text: "More funds could be made available for learning foreign languages." }
                ],
                correctAnswer: "B"
            }
        ]
    },
    {
        groupType: "yes-no-not-given",
        startQuestion: 23,
        endQuestion: 26,
        mainInstruction: "Questions 23-26",
        subInstruction: "Do the following statements agree with the information given in Reading Passage 2? In spaces 23-26 below, write YES, NO or NOT GIVEN.",
        statements: [
            { questionNumber: 23, text: "Supporters of Esperanto say it gives everyone an equal voice.", correctAnswer: "YES" },
            { questionNumber: 24, text: "Esperanto is the only artificially-constructed language.", correctAnswer: "NO" },
            { questionNumber: 25, text: "Esperanto can be learned as part of a self-study course.", correctAnswer: "NOT GIVEN" },
            { questionNumber: 26, text: "Esperanto can be used equally in formal and casual situations.", correctAnswer: "YES" }
        ]
    }
];

async function run() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB.");

        const acName = "Reading Mock Test 01 - Academic";
        // The type signature expects specific keys, we override with any to bypass mongoose strict checks for schema
        const doc: any = await ReadingTest.findOne({ title: acName });

        if (doc && doc.sections && doc.sections.length > 1) {
            // ONLY update questionGroups for section 1 (Part 2)
            doc.sections[1].questionGroups = questionGroups;
            doc.sections[1].questions = [];
            
            await doc.save();
            console.log("✅ Academic Reading Mock 01 - Part 2 GROUPS updated successfully.");
        } else {
            console.log("❌ Academic Reading Mock 01 not found or Part 2 not initialized.");
        }

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

run();
