import mongoose from "mongoose";
import config from "../app/config";
import { ListeningTest } from "../app/modules/listening/listening.model";

async function seedListeningTest01() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("Connected to MongoDB");

        // Check if already exists
        const existing = await ListeningTest.findOne({ testNumber: 1 });
        if (existing) {
            console.log("Listening Test #1 already exists. Deleting and recreating...");
            await ListeningTest.deleteOne({ _id: existing._id });
        }

        const db = mongoose.connection.db!;
        const adminUser = await db.collection("users").findOne({ role: "admin" });
        const createdBy = adminUser?._id || new mongoose.Types.ObjectId();

        const listeningTest01 = {
            testId: "LISTENING_001",
            testNumber: 1,
            title: "Listening Test 01",
            description: "IELTS Academic Listening Test 01 — 4 parts, 40 questions",
            source: "Cambridge IELTS 15",
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
                // PART 1 — Bankside Recruitment Agency (Q 1–10)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 1,
                    title: "Part 1",
                    context: "A conversation between two people about a recruitment agency.",
                    instructions: "Questions 1–10",
                    audioUrl: "",
                    questions: [
                        // ── Instruction block ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 1–10</strong><br/>Complete the notes below.<br/>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer."
                        },

                        // ─── Bankside Recruitment Agency ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Bankside Recruitment Agency</strong><br/><ul><li>Address of agency: 497 Eastside, Docklands</li><li>Name of agent: Becky</li><li>Phone number: 07866 510333</li></ul>"
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 1,
                            questionType: "note-completion" as const,
                            questionText: "Name of agent: Becky ________",
                            correctAnswer: "Jamieson",
                            marks: 1, wordLimit: 1
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 2,
                            questionType: "note-completion" as const,
                            questionText: "Best to call her in the ________",
                            correctAnswer: "afternoon",
                            marks: 1, wordLimit: 1
                        },

                        // ─── Typical jobs ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Typical jobs</strong><br/><ul><li>Clerical and admin roles, mainly in the finance industry</li></ul>"
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 3,
                            questionType: "note-completion" as const,
                            questionText: "Must have good ________ skills",
                            correctAnswer: "communication",
                            marks: 1, wordLimit: 1
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 4,
                            questionType: "note-completion" as const,
                            questionText: "Jobs are usually for at least one ________",
                            correctAnswer: "week",
                            marks: 1, wordLimit: 1
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 5,
                            questionType: "note-completion" as const,
                            questionText: "Pay is usually £ ________ per hour",
                            correctAnswer: "10",
                            marks: 1, wordLimit: 2
                        },

                        // ─── Registration process ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Registration process</strong>"
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 6,
                            questionType: "note-completion" as const,
                            questionText: "Wear a ________ to the interview",
                            correctAnswer: "suit",
                            marks: 1, wordLimit: 1
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 7,
                            questionType: "note-completion" as const,
                            questionText: "Must bring your ________ to the interview",
                            correctAnswer: "passport",
                            marks: 1, wordLimit: 1
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 8,
                            questionType: "note-completion" as const,
                            questionText: "They will ask questions about each applicant's ________",
                            correctAnswer: "personality",
                            marks: 1, wordLimit: 1
                        },

                        // ─── Advantages ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Advantages of using an agency</strong>"
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 9,
                            questionType: "note-completion" as const,
                            questionText: "The ________ you receive at interview will benefit you",
                            correctAnswer: "feedback",
                            marks: 1, wordLimit: 1
                        },
                        {
                            blockType: "instruction" as const,
                            content: "<ul><li>Will get access to vacancies which are not advertised</li></ul>"
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 10,
                            questionType: "note-completion" as const,
                            questionText: "Less ________ is involved in applying for jobs",
                            correctAnswer: "time",
                            marks: 1, wordLimit: 1
                        },
                    ]
                },

                // ═══════════════════════════════════════════════
                // PART 2 — Matthews Island Holidays (Q 11–20)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 2,
                    title: "Part 2",
                    context: "A talk about Matthews Island Holidays and a timetable for Isle of Man holiday.",
                    instructions: "Questions 11–20",
                    audioUrl: "",
                    questions: [
                        // ── MCQ instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 11–14</strong><br/>Choose the correct letter, <strong>A</strong>, <strong>B</strong> or <strong>C</strong>.<br/><br/><strong>Matthews Island Holidays</strong>"
                        },

                        // Q11
                        {
                            blockType: "question" as const,
                            questionNumber: 11,
                            questionType: "multiple-choice" as const,
                            questionText: "According to the speaker, the company",
                            options: [
                                "A. has been in business for longer than most of its competitors.",
                                "B. arranges holidays to more destinations than its competitors.",
                                "C. has more customers than its competitors."
                            ],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // Q12
                        {
                            blockType: "question" as const,
                            questionNumber: 12,
                            questionType: "multiple-choice" as const,
                            questionText: "Where can customers meet the tour manager before travelling to the Isle of Man?",
                            options: [
                                "A. Liverpool",
                                "B. Heysham",
                                "C. Luton"
                            ],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // Q13
                        {
                            blockType: "question" as const,
                            questionNumber: 13,
                            questionType: "multiple-choice" as const,
                            questionText: "How many lunches are included in the price of the holiday?",
                            options: [
                                "A. three",
                                "B. four",
                                "C. five"
                            ],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // Q14
                        {
                            blockType: "question" as const,
                            questionNumber: 14,
                            questionType: "multiple-choice" as const,
                            questionText: "Customers have to pay extra for",
                            options: [
                                "A. guaranteeing themselves a larger room.",
                                "B. booking at short notice.",
                                "C. transferring to another date."
                            ],
                            correctAnswer: "C",
                            marks: 1
                        },

                        // ── Table instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 15–20</strong><br/>Complete the table below.<br/>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.<br/><br/><strong>Timetable for Isle of Man holiday</strong><br/><table border='1' style='border-collapse:collapse;width:100%;font-size:13px'><thead><tr><th style='padding:6px'>Day</th><th style='padding:6px'>Activity</th><th style='padding:6px'>Notes</th></tr></thead><tbody><tr><td style='padding:6px'>Day 1</td><td style='padding:6px'>Arrive</td><td style='padding:6px'>Introduction by manager. Hotel dining room has view of the <strong>[15]</strong></td></tr><tr><td style='padding:6px'>Day 2</td><td style='padding:6px'>Tynwald Exhibition and Peel</td><td style='padding:6px'>Tynwald may have been founded in <strong>[16]</strong>, not 979</td></tr><tr><td style='padding:6px'>Day 3</td><td style='padding:6px'>Trip to Snaefell</td><td style='padding:6px'>Travel along promenade in a tram; train to Laxey; train to the <strong>[17]</strong> of Snaefell</td></tr><tr><td style='padding:6px'>Day 4</td><td style='padding:6px'>Free day</td><td style='padding:6px'>Company provides a <strong>[18]</strong> for local transport and heritage sites</td></tr><tr><td style='padding:6px'>Day 5</td><td style='padding:6px'>Take the <strong>[19]</strong> railway train from Douglas to Port Erin</td><td style='padding:6px'>Free time, then coach to Castletown — former <strong>[20]</strong> has old castle</td></tr><tr><td style='padding:6px'>Day 6</td><td style='padding:6px'>Leave</td><td style='padding:6px'>Leave the island by ferry or plane</td></tr></tbody></table>"
                        },

                        // Q15–Q20
                        {
                            blockType: "question" as const,
                            questionNumber: 15,
                            questionType: "table-completion" as const,
                            questionText: "Hotel dining room has view of the ________",
                            correctAnswer: "river",
                            marks: 1, wordLimit: 1
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 16,
                            questionType: "table-completion" as const,
                            questionText: "Tynwald may have been founded in ________",
                            correctAnswer: "1422",
                            marks: 1, wordLimit: 1
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 17,
                            questionType: "table-completion" as const,
                            questionText: "Train to the ________ of Snaefell",
                            correctAnswer: "top",
                            marks: 1, wordLimit: 1
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 18,
                            questionType: "table-completion" as const,
                            questionText: "Company provides a ________ for local transport and heritage sites",
                            correctAnswer: "pass",
                            marks: 1, wordLimit: 1
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 19,
                            questionType: "table-completion" as const,
                            questionText: "Take the ________ railway train from Douglas to Port Erin",
                            correctAnswer: "steam",
                            marks: 1, wordLimit: 1
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 20,
                            questionType: "table-completion" as const,
                            questionText: "Coach to Castletown — former ________ has old castle",
                            correctAnswer: "capital",
                            marks: 1, wordLimit: 1
                        },
                    ]
                },

                // ═══════════════════════════════════════════════
                // PART 3 — Personality Traits (Q 21–30)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 3,
                    title: "Part 3",
                    context: "A conversation between two students about birth order and personality traits.",
                    instructions: "Questions 21–30",
                    audioUrl: "",
                    questions: [

                        // ── Q21-26: Matching instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 21–26</strong><br/>What did findings of previous research claim about the personality traits a child is likely to have because of their position in the family?<br/><br/>Choose <strong>SIX</strong> answers from the box and write the correct letter, <strong>A–H</strong>, next to Questions 21–26.<br/><br/><strong>Personality Traits</strong><br/>A &nbsp; outgoing<br/>B &nbsp; selfish<br/>C &nbsp; independent<br/>D &nbsp; attention-seeking<br/>E &nbsp; introverted<br/>F &nbsp; co-operative<br/>G &nbsp; caring<br/>H &nbsp; competitive"
                        },

                        // Q21
                        {
                            blockType: "question" as const,
                            questionNumber: 21,
                            questionType: "matching" as const,
                            questionText: "the eldest child",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "G",
                            marks: 1
                        },
                        // Q22
                        {
                            blockType: "question" as const,
                            questionNumber: 22,
                            questionType: "matching" as const,
                            questionText: "a middle child",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "F",
                            marks: 1
                        },
                        // Q23
                        {
                            blockType: "question" as const,
                            questionNumber: 23,
                            questionType: "matching" as const,
                            questionText: "the youngest child",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "A",
                            marks: 1
                        },
                        // Q24
                        {
                            blockType: "question" as const,
                            questionNumber: 24,
                            questionType: "matching" as const,
                            questionText: "a twin",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "E",
                            marks: 1
                        },
                        // Q25
                        {
                            blockType: "question" as const,
                            questionNumber: 25,
                            questionType: "matching" as const,
                            questionText: "an only child",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "B",
                            marks: 1
                        },
                        // Q26
                        {
                            blockType: "question" as const,
                            questionNumber: 26,
                            questionType: "matching" as const,
                            questionText: "a child with much older siblings",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "C",
                            marks: 1
                        },

                        // ── Q27-28: Multiple Choice instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 27–28</strong><br/>Choose the correct letter, <strong>A</strong>, <strong>B</strong> or <strong>C</strong>."
                        },

                        // Q27
                        {
                            blockType: "question" as const,
                            questionNumber: 27,
                            questionType: "multiple-choice" as const,
                            questionText: "What do the speakers say about the evidence relating to birth order and academic success?",
                            options: [
                                "A. There is conflicting evidence about whether oldest children perform best in intelligence tests.",
                                "B. There is little doubt that birth order has less influence on academic achievement than socio-economic status.",
                                "C. Some studies have neglected to include important factors such as family size."
                            ],
                            correctAnswer: "C",
                            marks: 1
                        },

                        // Q28
                        {
                            blockType: "question" as const,
                            questionNumber: 28,
                            questionType: "multiple-choice" as const,
                            questionText: "What does Ruth think is surprising about the difference in oldest children's academic performance?",
                            options: [
                                "A. It is mainly thanks to their roles as teachers for their younger siblings.",
                                "B. The advantages they have only lead to a slightly higher level of achievement.",
                                "C. The extra parental attention they receive at a young age makes little difference."
                            ],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // ── Q29-30: Choose TWO instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 29–30</strong><br/>Choose <strong>TWO</strong> letters, A–E.<br/><br/>Which <strong>TWO</strong> experiences of sibling rivalry do the speakers agree has been valuable for them?"
                        },

                        // Q29 (first of the pair)
                        {
                            blockType: "question" as const,
                            questionNumber: 29,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO experiences of sibling rivalry do the speakers agree has been valuable for them?",
                            options: [
                                "A. learning to share",
                                "B. learning to stand up for oneself",
                                "C. having to put up with each other",
                                "D. finding out what is important in life",
                                "E. learning to be a good loser"
                            ],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // Q30 (second of the pair)
                        {
                            blockType: "question" as const,
                            questionNumber: 30,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO experiences of sibling rivalry do the speakers agree has been valuable for them?",
                            options: [
                                "A. learning to share",
                                "B. learning to stand up for oneself",
                                "C. having to put up with each other",
                                "D. finding out what is important in life",
                                "E. learning to be a good loser"
                            ],
                            correctAnswer: "D",
                            marks: 1
                        },
                    ]
                },

                // ═══════════════════════════════════════════════
                // PART 4 — The Eucalyptus Tree in Australia (Q 31–40)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 4,
                    title: "Part 4",
                    context: "A lecture about the eucalyptus tree in Australia — its importance, diseases, and the effect of bushfires.",
                    instructions: "Questions 31–40",
                    audioUrl: "",
                    questions: [
                        // ── Main instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 31–40</strong><br/>Complete the notes below.<br/>Write <strong>ONE WORD ONLY</strong> for each answer.<br/><br/><strong>The Eucalyptus Tree in Australia</strong>"
                        },

                        // ─── Importance ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Importance</strong>"
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 31,
                            questionType: "note-completion" as const,
                            questionText: "It provides ________ and food for a wide range of species",
                            correctAnswer: "shelter",
                            marks: 1, wordLimit: 1
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 32,
                            questionType: "note-completion" as const,
                            questionText: "Its leaves provide ________ which is used to make a disinfectant",
                            correctAnswer: "oil",
                            marks: 1, wordLimit: 1
                        },

                        // ─── Reasons for present decline ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Reasons for present decline in number</strong><br/><strong>(i) 'Mundulla Yellows'</strong><ul><li>Cause – lime used for making <strong>[33]</strong> was absorbed</li><li>Trees were unable to take in necessary iron through their roots</li></ul>"
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 33,
                            questionType: "note-completion" as const,
                            questionText: "Cause – lime used for making ________ was absorbed",
                            correctAnswer: "roads",
                            marks: 1, wordLimit: 1
                        },

                        // ─── Bell-miner ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>(ii) 'Bell-miner Associated Die-back'</strong><ul><li>Cause – <strong>[34]</strong> feed on eucalyptus leaves</li><li>They secrete a substance containing sugar</li><li>Bell-miner birds are attracted by this and keep away other species</li></ul>"
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 34,
                            questionType: "note-completion" as const,
                            questionText: "Cause – ________ feed on eucalyptus leaves",
                            correctAnswer: "insects",
                            marks: 1, wordLimit: 1
                        },

                        // ─── Bushfires ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>William Jackson's theory:</strong><br/><ul><li>High-frequency bushfires have impact on vegetation, resulting in the growth of <strong>[35]</strong></li><li>Mid-frequency bushfires result in the growth of eucalyptus forests, because they:</li></ul>"
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 35,
                            questionType: "note-completion" as const,
                            questionText: "High-frequency bushfires result in the growth of ________",
                            correctAnswer: "grass",
                            marks: 1, wordLimit: 1
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 36,
                            questionType: "note-completion" as const,
                            questionText: "Make more ________ available to the trees",
                            correctAnswer: "water",
                            marks: 1, wordLimit: 1
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 37,
                            questionType: "note-completion" as const,
                            questionText: "Maintain the quality of the ________",
                            correctAnswer: "soil",
                            marks: 1, wordLimit: 1
                        },

                        // ─── Low-frequency bushfires ───
                        {
                            blockType: "instruction" as const,
                            content: "<ul><li>Low-frequency bushfires result in the growth of <strong>[38]</strong> rainforest, which is:</li></ul>"
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 38,
                            questionType: "note-completion" as const,
                            questionText: "Low-frequency bushfires result in the growth of ________ rainforest",
                            correctAnswer: "dry",
                            marks: 1, wordLimit: 1
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 39,
                            questionType: "note-completion" as const,
                            questionText: "A ________ ecosystem",
                            correctAnswer: "simple",
                            marks: 1, wordLimit: 1
                        },
                        {
                            blockType: "question" as const,
                            questionNumber: 40,
                            questionType: "note-completion" as const,
                            questionText: "An ideal environment for the ________ of the bell-miner",
                            correctAnswer: "nest",
                            marks: 1, wordLimit: 1
                        },
                    ]
                },
            ]
        };

        const newTest = await ListeningTest.create(listeningTest01);
        console.log("\n✅ Listening Test 01 created successfully!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("Test ID   :", newTest.testId);
        console.log("Test No.  :", newTest.testNumber);
        console.log("Title     :", newTest.title);
        console.log("Sections  :", newTest.sections?.length);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("\n✅ All 40 correct answers are pre-filled (Cambridge IELTS 15 Test 1).");

        await mongoose.disconnect();
        console.log("\nDisconnected from MongoDB. Done!");

    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

seedListeningTest01();
