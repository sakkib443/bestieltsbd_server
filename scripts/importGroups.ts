import mongoose from 'mongoose';
import { ReadingTest } from '../src/app/modules/reading/reading.model';
import { IReadingSection } from '../src/app/modules/reading/reading.interface';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

const questionGroups = [
    {
        groupType: "choose-two-letters",
        startQuestion: 1,
        endQuestion: 3,
        mainInstruction: "Which THREE of the following statements are true, according to the text?",
        subInstruction: "Choose THREE letters A-H. Circle the correct letters, A-H, below. NB: Your answers may be given in any order.",
        questionSets: [
            {
                questionNumbers: [1, 2, 3],
                questionText: "Which THREE of the following statements are true, according to the text?",
                options: [
                    { letter: "A", text: "Money can bring misery." },
                    { letter: "B", text: "Wealthier nations place more emphasis on happiness than poorer ones." },
                    { letter: "C", text: "Securing a place to live is a basic human need." },
                    { letter: "D", text: "The desire for social status is a global phenomenon." },
                    { letter: "E", text: "An unmarried couple living together is less likely to be happy than a married couple." },
                    { letter: "F", text: "The less responsibility one has, the happier one is." },
                    { letter: "G", text: "Involvement in policy-making can increase well-being." },
                    { letter: "H", text: "Our prehistoric ancestors were happier than we are." }
                ],
                correctAnswers: ["C", "E", "G"]
            }
        ]
    },
    {
        groupType: "summary-with-options",
        startQuestion: 4,
        endQuestion: 7,
        mainInstruction: "Complete the summary using the list of words, A-I, below.",
        subInstruction: "Write the correct letter, A-I, for the questions 4-7 on your answer sheet.",
        mainHeading: "",
        phraseList: [
            { letter: "A", text: "episode" },
            { letter: "B", text: "interaction" },
            { letter: "C", text: "cooperation" },
            { letter: "D", text: "control" },
            { letter: "E", text: "number" },
            { letter: "F", text: "level" },
            { letter: "G", text: "course" },
            { letter: "H", text: "conflict" },
            { letter: "I", text: "limit" }
        ],
        summarySegments: [
            { type: "text", content: "Money can buy you just about anything, but not, it seems happiness. Whether on a personal or national " },
            { type: "blank", questionNumber: 4, correctAnswer: "F" },
            { type: "text", content: ", your bank balance won’t make you happier. Once the basic criteria of a roof over your head and food on the table have been met, money ceases to play a part. One of the most important factors in achieving happiness is the extent of our social " },
            { type: "blank", questionNumber: 5, correctAnswer: "B" },
            { type: "text", content: " – our relationships with family, friends, colleagues, and so on. Equally important is the amount of " },
            { type: "blank", questionNumber: 6, correctAnswer: "D" },
            { type: "text", content: " we have, either in our personal life, working life, or even in our ability to influence the political " },
            { type: "blank", questionNumber: 7, correctAnswer: "G" },
            { type: "text", content: " that our country embarks on." }
        ]
    },
    {
        groupType: "true-false-not-given",
        startQuestion: 8,
        endQuestion: 13,
        mainInstruction: "Do the following statements agree with the information given in the Reading Passage?",
        subInstruction: "For the questions (8-13) on your answer sheet, write TRUE, FALSE or NOT GIVEN",
        optionsExplanation: [
            { option: "TRUE", explanation: "if the statement agrees with the information" },
            { option: "FALSE", explanation: "if the statement contradicts the information" },
            { option: "NOT GIVEN", explanation: "if there is no information on this" },
        ],
        statements: [
            { questionNumber: 8, text: "People from underdeveloped nations try to attain the same standard of living as those from developed nations.", correctAnswer: "NOT GIVEN" },
            { questionNumber: 9, text: "Seeing what others have makes people want to have it too", correctAnswer: "TRUE" },
            { questionNumber: 10, text: "The larger the family is, the happier the parents will probably be", correctAnswer: "NOT GIVEN" },
            { questionNumber: 11, text: "One’s attitude to life has no influence on one’s health", correctAnswer: "FALSE" },
            { questionNumber: 12, text: "Instinct can be a barrier to happiness.", correctAnswer: "TRUE" },
            { questionNumber: 13, text: "Family and friends rank equally as sources of happiness.", correctAnswer: "FALSE" }
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

        if (doc) {
            // ONLY update questionGroups, empty out manual questions
            doc.sections[0].questionGroups = questionGroups;
            doc.sections[0].questions = [];
            
            await doc.save();
            console.log("✅ Academic Reading Mock 01 - Part 1 GROUPS updated successfully.");
        } else {
            console.log("❌ Academic Reading Mock 01 not found.");
        }

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

run();
