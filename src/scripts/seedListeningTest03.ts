import mongoose from "mongoose";
import config from "../app/config";
import { ListeningTest } from "../app/modules/listening/listening.model";

async function seedListeningTest03() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("Connected to MongoDB");

        // Check if already exists
        const existing = await ListeningTest.findOne({ testNumber: 3 });
        if (existing) {
            console.log("Listening Test #3 already exists. Deleting and recreating...");
            await ListeningTest.deleteOne({ _id: existing._id });
        }

        const db = mongoose.connection.db!;
        const adminUser = await db.collection("users").findOne({ role: "admin" });
        const createdBy = adminUser?._id || new mongoose.Types.ObjectId();

        const listeningTest03 = {
            testId: "LISTENING_003",
            testNumber: 3,
            title: "Listening Test 03",
            description: "IELTS Academic Listening Test 03 — 4 parts, 40 questions",
            source: "Cambridge IELTS",
            mainAudioUrl: "",
            audioDuration: 1800,
            difficulty: "medium" as const,
            totalQuestions: 40,
            totalMarks: 40,
            duration: 40,
            isActive: true,
            usageCount: 0,
            createdBy: createdBy,
            sections: [

                // ═══════════════════════════════════════════════
                // PART 1 — Buckworth Conservation Group (Q 1–10)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 1,
                    title: "Part 1",
                    context: "A conversation about the activities of the Buckworth Conservation Group.",
                    instructions: "Questions 1–10",
                    audioUrl: "",
                    questions: [
                        // ── Instruction block ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 1–10</strong><br/>Complete the notes below.<br/>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer."
                        },

                        // ─── Buckworth Conservation Group heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Buckworth Conservation Group</strong><br/><strong>Regular activities</strong>"
                        },

                        // ─── Beach heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Beach</strong>"
                        },

                        // Q1
                        {
                            blockType: "question" as const,
                            questionNumber: 1,
                            questionType: "note-completion" as const,
                            questionText: "Making sure the beach does not have ________ on it",
                            correctAnswer: "litter",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q2
                        {
                            blockType: "question" as const,
                            questionNumber: 2,
                            questionType: "note-completion" as const,
                            questionText: "No ________",
                            correctAnswer: "dogs",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ─── Nature reserve heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Nature reserve</strong><ul style='margin:4px 0;'><li>maintaining paths</li><li>nesting boxes for birds installed</li></ul>"
                        },

                        // Q3
                        {
                            blockType: "question" as const,
                            questionNumber: 3,
                            questionType: "note-completion" as const,
                            questionText: "Next task is taking action to attract ________ to the place",
                            correctAnswer: "insects",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q4
                        {
                            blockType: "question" as const,
                            questionNumber: 4,
                            questionType: "note-completion" as const,
                            questionText: "Identifying types of ________",
                            correctAnswer: "butterflies",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q5
                        {
                            blockType: "question" as const,
                            questionNumber: 5,
                            questionType: "note-completion" as const,
                            questionText: "Building a new ________",
                            correctAnswer: "wall",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ─── Forthcoming events heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Forthcoming events</strong>"
                        },

                        // ─── Saturday heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Saturday</strong><ul style='margin:4px 0;'><li>meet at Dunsmore Beach car park</li><li>take a picnic</li></ul>"
                        },

                        // Q6
                        {
                            blockType: "question" as const,
                            questionNumber: 6,
                            questionType: "note-completion" as const,
                            questionText: "Walk across the sands and reach the ________",
                            correctAnswer: "island",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q7
                        {
                            blockType: "question" as const,
                            questionNumber: 7,
                            questionType: "note-completion" as const,
                            questionText: "Wear appropriate ________",
                            correctAnswer: "boots",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ─── Woodwork session heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Woodwork session</strong><ul style='margin:4px 0;'><li>17th, from 10 a.m. to 3 p.m.</li></ul>"
                        },

                        // Q8
                        {
                            blockType: "question" as const,
                            questionNumber: 8,
                            questionType: "note-completion" as const,
                            questionText: "Suitable for ________ to participate in",
                            correctAnswer: "beginners",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q9
                        {
                            blockType: "question" as const,
                            questionNumber: 9,
                            questionType: "note-completion" as const,
                            questionText: "Making ________ out of wood",
                            correctAnswer: "spoons",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q10
                        {
                            blockType: "question" as const,
                            questionNumber: 10,
                            questionType: "note-completion" as const,
                            questionText: "Cost of session (no camping): £________",
                            correctAnswer: "35",
                            marks: 1,
                            wordLimit: 2
                        },
                    ]
                },

                // ═══════════════════════════════════════════════
                // PART 2 — Boat trip round Tasmania (Q 11–20)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 2,
                    title: "Part 2",
                    context: "A talk about a boat trip round Tasmania.",
                    instructions: "Questions 11–20",
                    audioUrl: "",
                    questions: [

                        // ── Questions 11–14 instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 11–14</strong><br/>Choose the correct letter, <strong>A</strong>, <strong>B</strong> or <strong>C</strong>."
                        },

                        // ─── Boat trip round Tasmania heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Boat trip round Tasmania</strong>"
                        },

                        // Q11
                        {
                            blockType: "question" as const,
                            questionNumber: 11,
                            questionType: "multiple-choice" as const,
                            questionText: "What is the maximum number of people who can stand on each side of the boat?",
                            options: ["A. 9", "B. 15", "C. 18"],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // Q12
                        {
                            blockType: "question" as const,
                            questionNumber: 12,
                            questionType: "multiple-choice" as const,
                            questionText: "What colour are the tour boats?",
                            options: ["A. dark red", "B. jet black", "C. light green"],
                            correctAnswer: "C",
                            marks: 1
                        },

                        // Q13
                        {
                            blockType: "question" as const,
                            questionNumber: 13,
                            questionType: "multiple-choice" as const,
                            questionText: "Which lunchbox is suitable for someone who doesn't eat meat or fish?",
                            options: ["A. Lunchbox 1", "B. Lunch box 2", "C. Lunch box 3"],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // Q14
                        {
                            blockType: "question" as const,
                            questionNumber: 14,
                            questionType: "multiple-choice" as const,
                            questionText: "What should people do with their litter?",
                            options: [
                                "A. take it home",
                                "B. hand it to a member of staff",
                                "C. put it in the bins provided on the boat"
                            ],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // ── Questions 15–16 instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 15–16</strong><br/>Choose <strong>TWO</strong> letters, <strong>A–E</strong>."
                        },

                        // Q15
                        {
                            blockType: "question" as const,
                            questionNumber: 15,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO features of the lighthouse does Lou mention?",
                            options: [
                                "A. why it was built",
                                "B. who built it",
                                "C. how long it took to build",
                                "D. who staffed it",
                                "E. what it was built with"
                            ],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // Q16
                        {
                            blockType: "question" as const,
                            questionNumber: 16,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO features of the lighthouse does Lou mention?",
                            options: [
                                "A. why it was built",
                                "B. who built it",
                                "C. how long it took to build",
                                "D. who staffed it",
                                "E. what it was built with"
                            ],
                            correctAnswer: "D",
                            marks: 1
                        },

                        // ── Questions 17–18 instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 17–18</strong><br/>Choose <strong>TWO</strong> letters, <strong>A–E</strong>."
                        },

                        // Q17
                        {
                            blockType: "question" as const,
                            questionNumber: 17,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO types of creature might come close to the boat?",
                            options: [
                                "A. sea eagles",
                                "B. fur seals",
                                "C. dolphins",
                                "D. whales",
                                "E. penguins"
                            ],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // Q18
                        {
                            blockType: "question" as const,
                            questionNumber: 18,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO types of creature might come close to the boat?",
                            options: [
                                "A. sea eagles",
                                "B. fur seals",
                                "C. dolphins",
                                "D. whales",
                                "E. penguins"
                            ],
                            correctAnswer: "C",
                            marks: 1
                        },

                        // ── Questions 19–20 instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 19–20</strong><br/>Choose <strong>TWO</strong> letters, <strong>A–E</strong>."
                        },

                        // Q19
                        {
                            blockType: "question" as const,
                            questionNumber: 19,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO points does Lou make about the caves?",
                            options: [
                                "A. Only large tourist boats can visit them.",
                                "B. The entrances to them are often blocked.",
                                "C. It is too dangerous for individuals to go near them.",
                                "D. Someone will explain what is inside them.",
                                "E. They cannot be reached on foot."
                            ],
                            correctAnswer: "D",
                            marks: 1
                        },

                        // Q20
                        {
                            blockType: "question" as const,
                            questionNumber: 20,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO points does Lou make about the caves?",
                            options: [
                                "A. Only large tourist boats can visit them.",
                                "B. The entrances to them are often blocked.",
                                "C. It is too dangerous for individuals to go near them.",
                                "D. Someone will explain what is inside them.",
                                "E. They cannot be reached on foot."
                            ],
                            correctAnswer: "E",
                            marks: 1
                        },
                    ]
                },

                // ═══════════════════════════════════════════════
                // PART 3 — Work experience for vet science (Q 21–30)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 3,
                    title: "Part 3",
                    context: "A discussion between two students, Diana and Tim, about work experience for veterinary science students.",
                    instructions: "Questions 21–30",
                    audioUrl: "",
                    questions: [

                        // ── Q21–26 instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 21–26</strong><br/>Choose the correct letter, <strong>A</strong>, <strong>B</strong> or <strong>C</strong>."
                        },

                        // ─── Heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Work experience for veterinary science students</strong>"
                        },

                        // Q21
                        {
                            blockType: "question" as const,
                            questionNumber: 21,
                            questionType: "multiple-choice" as const,
                            questionText: "What problem did both Diana and Tim have when arranging their work experience?",
                            options: [
                                "A. make initial contact with suitable farms",
                                "B. organising transport to and from the farm",
                                "C. finding a placement for the required length of time"
                            ],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // Q22
                        {
                            blockType: "question" as const,
                            questionNumber: 22,
                            questionType: "multiple-choice" as const,
                            questionText: "Tim was pleased to be able to help",
                            options: [
                                "A. a lamb that had a broken leg.",
                                "B. a sheep that was having difficult giving birth.",
                                "C. a newly born lamb that was having trouble feeding."
                            ],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // Q23
                        {
                            blockType: "question" as const,
                            questionNumber: 23,
                            questionType: "multiple-choice" as const,
                            questionText: "Diana says the sheep on her farm",
                            options: [
                                "A. were of various different varieties.",
                                "B. were mainly reared for their meat.",
                                "C. had better quality wool than sheep on the hills."
                            ],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // Q24
                        {
                            blockType: "question" as const,
                            questionNumber: 24,
                            questionType: "multiple-choice" as const,
                            questionText: "What did the students learn about adding supplements to chicken feed?",
                            options: [
                                "A. These should only be given if specially needed.",
                                "B. It is worth paying extra for the most effective ones.",
                                "C. The amount given at one time should be limited."
                            ],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // Q25
                        {
                            blockType: "question" as const,
                            questionNumber: 25,
                            questionType: "multiple-choice" as const,
                            questionText: "What happened when Diana was working with dairy cows?",
                            options: [
                                "A. She identified some cows incorrectly.",
                                "B. She accidentally threw some milk away.",
                                "C. She made a mistake when storing milk."
                            ],
                            correctAnswer: "C",
                            marks: 1
                        },

                        // Q26
                        {
                            blockType: "question" as const,
                            questionNumber: 26,
                            questionType: "multiple-choice" as const,
                            questionText: "What did both farmers mention about vets and farming?",
                            options: [
                                "A. Vets are failing to cope with some aspects of animal health.",
                                "B. There needs to be a fundamental change in the training of vets.",
                                "C. Some jobs could be done by the farmer rather than by a vet."
                            ],
                            correctAnswer: "C",
                            marks: 1
                        },

                        // ── Q27–30 instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 27–30</strong><br/>What opinion do the students give about each of the following modules on their veterinary science course?<br/>Choose <strong>FOUR</strong> answers from the box and write the correct letter, <strong>A–F</strong>, next to questions.<br/><br/><strong>Opinions</strong><br/>A &nbsp; Tim found this easier than expected.<br/>B &nbsp; Tim thought this was not very clearly organised.<br/>C &nbsp; Diana may do some further study on this.<br/>D &nbsp; They both found the reading required for this was difficult.<br/>E &nbsp; Tim was shocked at something he learned on this module.<br/>F &nbsp; They were both surprised how little is known about some aspects of this."
                        },

                        // ─── Modules heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Modules on Veterinary Science course</strong>"
                        },

                        // Q27
                        {
                            blockType: "question" as const,
                            questionNumber: 27,
                            questionType: "matching" as const,
                            questionText: "Medical terminology",
                            options: ["A", "B", "C", "D", "E", "F"],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // Q28
                        {
                            blockType: "question" as const,
                            questionNumber: 28,
                            questionType: "matching" as const,
                            questionText: "Diet and nutrition",
                            options: ["A", "B", "C", "D", "E", "F"],
                            correctAnswer: "E",
                            marks: 1
                        },

                        // Q29
                        {
                            blockType: "question" as const,
                            questionNumber: 29,
                            questionType: "matching" as const,
                            questionText: "Animal disease",
                            options: ["A", "B", "C", "D", "E", "F"],
                            correctAnswer: "F",
                            marks: 1
                        },

                        // Q30
                        {
                            blockType: "question" as const,
                            questionNumber: 30,
                            questionType: "matching" as const,
                            questionText: "Wildlife medication",
                            options: ["A", "B", "C", "D", "E", "F"],
                            correctAnswer: "C",
                            marks: 1
                        },
                    ]
                },

                // ═══════════════════════════════════════════════
                // PART 4 — Labyrinths (Q 31–40)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 4,
                    title: "Part 4",
                    context: "A lecture about labyrinths.",
                    instructions: "Questions 31–40",
                    audioUrl: "",
                    questions: [

                        // ── Instruction block ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 31–40</strong><br/>Complete the notes below.<br/>Write <strong>ONE WORD ONLY</strong> for each answer."
                        },

                        // ── Labyrinths heading + Definition ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong style='font-size:16px;'>Labyrinths</strong><br/><strong>Definition</strong><ul style='margin:4px 0;'><li>a winding spiral path leading to a central area</li></ul>"
                        },

                        // ── Labyrinths compared with mazes ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Labyrinths compared with mazes</strong>"
                        },

                        // Q31
                        {
                            blockType: "question" as const,
                            questionNumber: 31,
                            questionType: "note-completion" as const,
                            questionText: "Mazes are a type of ________",
                            correctAnswer: "puzzle",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q32
                        {
                            blockType: "question" as const,
                            questionNumber: 32,
                            questionType: "note-completion" as const,
                            questionText: "________ is needed to navigate through a maze",
                            correctAnswer: "logic",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q33
                        {
                            blockType: "question" as const,
                            questionNumber: 33,
                            questionType: "note-completion" as const,
                            questionText: "the word 'maze' is derived from a word meaning a feeling of ________",
                            correctAnswer: "confusion",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── Static bullet ──
                        {
                            blockType: "instruction" as const,
                            content: "<ul style='margin:4px 0;'><li>Labyrinths represent a journey through life</li></ul>"
                        },

                        // Q34
                        {
                            blockType: "question" as const,
                            questionNumber: 34,
                            questionType: "note-completion" as const,
                            questionText: "they have frequently been used in ________ and prayer",
                            correctAnswer: "meditation",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── Early examples heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Early examples of the labyrinth spiral</strong>"
                        },

                        // Q35
                        {
                            blockType: "question" as const,
                            questionNumber: 35,
                            questionType: "note-completion" as const,
                            questionText: "Ancient carvings on ________ have been found across many cultures",
                            correctAnswer: "stone",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── Static bullet ──
                        {
                            blockType: "instruction" as const,
                            content: "<ul style='margin:4px 0;'><li>The Pima, a Native American tribe, wove the symbol on baskets</li></ul>"
                        },

                        // Q36
                        {
                            blockType: "question" as const,
                            questionNumber: 36,
                            questionType: "note-completion" as const,
                            questionText: "Ancient Greeks used the symbol on ________",
                            correctAnswer: "coins",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── Walking labyrinths heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Walking labyrinths</strong>"
                        },

                        // Q37
                        {
                            blockType: "question" as const,
                            questionNumber: 37,
                            questionType: "note-completion" as const,
                            questionText: "The largest surviving example of a turf labyrinth once had a big ________ at its centre",
                            correctAnswer: "tree",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── Labyrinths nowadays heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Labyrinths nowadays</strong>"
                        },

                        // Q38
                        {
                            blockType: "question" as const,
                            questionNumber: 38,
                            questionType: "note-completion" as const,
                            questionText: "Believed to have a beneficial impact on mental and physical health, e.g., walking a maze can reduce a person's ________ rate",
                            correctAnswer: "breathing",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── Static bullets ──
                        {
                            blockType: "instruction" as const,
                            content: "<ul style='margin:4px 0;'><li>Used in medical and health and fitness settings and also prisons</li><li>Popular with patients, visitors and staff in hospitals</li></ul>"
                        },

                        // Q39
                        {
                            blockType: "question" as const,
                            questionNumber: 39,
                            questionType: "note-completion" as const,
                            questionText: "patients who can't walk can use 'finger labyrinths' made from ________",
                            correctAnswer: "paper",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q40
                        {
                            blockType: "question" as const,
                            questionNumber: 40,
                            questionType: "note-completion" as const,
                            questionText: "research has shown that Alzheimer's sufferers experience less ________",
                            correctAnswer: "anxiety",
                            marks: 1,
                            wordLimit: 1
                        },
                    ]
                },
            ]
        };

        const newTest = await ListeningTest.create(listeningTest03);
        console.log("\n✅ Listening Test 03 created successfully!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("Test ID   :", newTest.testId);
        console.log("Test No.  :", newTest.testNumber);
        console.log("Title     :", newTest.title);
        console.log("Sections  :", newTest.sections?.length);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("\n✅ All 4 Parts complete! All 40 answers inserted.");

        await mongoose.disconnect();
        console.log("\nDisconnected from MongoDB. Done!");

    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

seedListeningTest03();
