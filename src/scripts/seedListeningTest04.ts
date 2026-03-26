import mongoose from "mongoose";
import config from "../app/config";
import { ListeningTest } from "../app/modules/listening/listening.model";

async function seedListeningTest04() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("Connected to MongoDB");

        // Check if already exists
        const existing = await ListeningTest.findOne({ testNumber: 4 });
        if (existing) {
            console.log("Listening Test #4 already exists. Deleting and recreating...");
            await ListeningTest.deleteOne({ _id: existing._id });
        }

        const db = mongoose.connection.db!;
        const adminUser = await db.collection("users").findOne({ role: "admin" });
        const createdBy = adminUser?._id || new mongoose.Types.ObjectId();

        const listeningTest04 = {
            testId: "LISTENING_004",
            testNumber: 4,
            title: "Listening Test 04",
            description: "IELTS Academic Listening Test 04 — 4 parts, 40 questions",
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
                // PART 1 — Transport survey (Q 1–10)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 1,
                    title: "Part 1",
                    context: "A conversation about a transport survey.",
                    instructions: "Questions 1–10",
                    audioUrl: "",
                    questions: [
                        // ── Instruction block ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 1–10</strong><br/>Complete the notes below.<br/>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer."
                        },

                        // ─── Transport survey heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Transport survey</strong><br/><strong>Name:</strong> Sadie Jones<br/><strong>Year of birth:</strong> 1991"
                        },

                        // Q1
                        {
                            blockType: "question" as const,
                            questionNumber: 1,
                            questionType: "note-completion" as const,
                            questionText: "Postcode: ________",
                            correctAnswer: "DW30 7YZ",
                            marks: 1,
                            wordLimit: 2
                        },

                        // ─── Travelling by bus heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Travelling by bus</strong>"
                        },

                        // Q2
                        {
                            blockType: "question" as const,
                            questionNumber: 2,
                            questionType: "note-completion" as const,
                            questionText: "Date of bus journey: ________",
                            correctAnswer: "24(th) April",
                            marks: 1,
                            wordLimit: 2
                        },

                        // Q3
                        {
                            blockType: "question" as const,
                            questionNumber: 3,
                            questionType: "note-completion" as const,
                            questionText: "Reason for trip: shopping and visit to the ________",
                            correctAnswer: "dentist",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q4
                        {
                            blockType: "question" as const,
                            questionNumber: 4,
                            questionType: "note-completion" as const,
                            questionText: "Travelled by bus because cost of ________ too high",
                            correctAnswer: "parking",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q5
                        {
                            blockType: "question" as const,
                            questionNumber: 5,
                            questionType: "note-completion" as const,
                            questionText: "Got on bus at ________ Street",
                            correctAnswer: "Claxby",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ─── Complaints heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Complaints about bus service:</strong>"
                        },

                        // Q6
                        {
                            blockType: "question" as const,
                            questionNumber: 6,
                            questionType: "note-completion" as const,
                            questionText: "bus today was ________",
                            correctAnswer: "late",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q7
                        {
                            blockType: "question" as const,
                            questionNumber: 7,
                            questionType: "note-completion" as const,
                            questionText: "frequency of buses in the ________",
                            correctAnswer: "evening",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ─── Travelling by car heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Travelling by car</strong>"
                        },

                        // Q8
                        {
                            blockType: "question" as const,
                            questionNumber: 8,
                            questionType: "note-completion" as const,
                            questionText: "Goes to the ________ by car",
                            correctAnswer: "supermarket",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ─── Travelling by bicycle heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Travelling by bicycle</strong>"
                        },

                        // Q9
                        {
                            blockType: "question" as const,
                            questionNumber: 9,
                            questionType: "note-completion" as const,
                            questionText: "Dislikes travelling by bike in the city centre because of the ________",
                            correctAnswer: "pollution",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q10
                        {
                            blockType: "question" as const,
                            questionNumber: 10,
                            questionType: "note-completion" as const,
                            questionText: "Doesn't own a bike because of a lack of ________",
                            correctAnswer: "storage",
                            marks: 1,
                            wordLimit: 1
                        },
                    ]
                },

                // ═══════════════════════════════════════════════
                // PART 2 — Becoming a volunteer for ACE (Q 11–20)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 2,
                    title: "Part 2",
                    context: "A talk about becoming a volunteer for ACE.",
                    instructions: "Questions 11–20",
                    audioUrl: "",
                    questions: [

                        // ── Questions 11–13 instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 11–13</strong><br/>Choose the correct letter, <strong>A</strong>, <strong>B</strong> or <strong>C</strong>."
                        },

                        // ─── Heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Becoming a volunteer for ACE</strong>"
                        },

                        // Q11
                        {
                            blockType: "question" as const,
                            questionNumber: 11,
                            questionType: "multiple-choice" as const,
                            questionText: "Why does the speaker apologise about the seats?",
                            options: [
                                "A. They are too small.",
                                "B. There are not enough of them.",
                                "C. Some of them are very close together."
                            ],
                            correctAnswer: "C",
                            marks: 1
                        },

                        // Q12
                        {
                            blockType: "question" as const,
                            questionNumber: 12,
                            questionType: "multiple-choice" as const,
                            questionText: "What does the speaker say about the age of volunteers?",
                            options: [
                                "A. The age of volunteers is less important than other factors.",
                                "B. Young volunteers are less reliable than older ones.",
                                "C. Most volunteers are about 60 years old."
                            ],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // Q13
                        {
                            blockType: "question" as const,
                            questionNumber: 13,
                            questionType: "multiple-choice" as const,
                            questionText: "What does the speaker say about training?",
                            options: [
                                "A. It is continuous.",
                                "B. It is conducted by a manager.",
                                "C. It takes place online."
                            ],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // ── Questions 14–15 instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 14 and 15</strong><br/>Choose <strong>TWO</strong> letters, <strong>A–E</strong>.<br/><br/>Which TWO issues does the speaker ask the audience to consider before they apply to be volunteers?"
                        },

                        // Q14
                        {
                            blockType: "question" as const,
                            questionNumber: 14,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO issues does the speaker ask the audience to consider before they apply to be volunteers?",
                            options: [
                                "A. their financial situation",
                                "B. their level of commitment",
                                "C. their work experience",
                                "D. their ambition",
                                "E. their availability"
                            ],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // Q15
                        {
                            blockType: "question" as const,
                            questionNumber: 15,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO issues does the speaker ask the audience to consider before they apply to be volunteers?",
                            options: [
                                "A. their financial situation",
                                "B. their level of commitment",
                                "C. their work experience",
                                "D. their ambition",
                                "E. their availability"
                            ],
                            correctAnswer: "E",
                            marks: 1
                        },

                        // ── Questions 16–20 instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 16–20</strong><br/>What does the speaker suggest would be helpful for each of the following areas of voluntary work?<br/>Choose <strong>FIVE</strong> answers from the box and write the correct letter, <strong>A–G</strong>, next to Questions 16–20.<br/><br/><strong>Helpful things volunteers might offer</strong><br/>A &nbsp; experience on stage<br/>B &nbsp; original, new ideas<br/>C &nbsp; parenting skills<br/>D &nbsp; an understanding of food and diet<br/>E &nbsp; retail experience<br/>F &nbsp; a good memory<br/>G &nbsp; a good level of fitness"
                        },

                        // ─── Area of voluntary work heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Area of voluntary work</strong>"
                        },

                        // Q16
                        {
                            blockType: "question" as const,
                            questionNumber: 16,
                            questionType: "matching" as const,
                            questionText: "Fundraising",
                            options: ["A", "B", "C", "D", "E", "F", "G"],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // Q17
                        {
                            blockType: "question" as const,
                            questionNumber: 17,
                            questionType: "matching" as const,
                            questionText: "Litter collection",
                            options: ["A", "B", "C", "D", "E", "F", "G"],
                            correctAnswer: "G",
                            marks: 1
                        },

                        // Q18
                        {
                            blockType: "question" as const,
                            questionNumber: 18,
                            questionType: "matching" as const,
                            questionText: "'Playmates'",
                            options: ["A", "B", "C", "D", "E", "F", "G"],
                            correctAnswer: "D",
                            marks: 1
                        },

                        // Q19
                        {
                            blockType: "question" as const,
                            questionNumber: 19,
                            questionType: "matching" as const,
                            questionText: "Story club",
                            options: ["A", "B", "C", "D", "E", "F", "G"],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // Q20
                        {
                            blockType: "question" as const,
                            questionNumber: 20,
                            questionType: "matching" as const,
                            questionText: "First aid",
                            options: ["A", "B", "C", "D", "E", "F", "G"],
                            correctAnswer: "F",
                            marks: 1
                        },
                    ]
                },

                // ═══════════════════════════════════════════════
                // PART 3 — Talk on Jobs in Fashion Design (Q 21–30)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 3,
                    title: "Part 3",
                    context: "A discussion between two students, Hugo and Chantal, about a talk on jobs in fashion design.",
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
                            content: "<strong>Talk on Jobs in Fashion Design</strong>"
                        },

                        // Q21
                        {
                            blockType: "question" as const,
                            questionNumber: 21,
                            questionType: "multiple-choice" as const,
                            questionText: "What problem did Chantal have at the start of the talk?",
                            options: [
                                "A. Her view of the speaker was blocked.",
                                "B. She was unable to find an empty seat.",
                                "C. The students next to her were talking."
                            ],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // Q22
                        {
                            blockType: "question" as const,
                            questionNumber: 22,
                            questionType: "multiple-choice" as const,
                            questionText: "What were Hugo and Chantal surprised to hear about the job market?",
                            options: [
                                "A. It has become more competitive than it used to be.",
                                "B. There is more variety in it than they had realised.",
                                "C. Some areas of it are more exciting than others."
                            ],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // Q23
                        {
                            blockType: "question" as const,
                            questionNumber: 23,
                            questionType: "multiple-choice" as const,
                            questionText: "Hugo and Chantal agree that the speaker's message was",
                            options: [
                                "A. unfair to them at times.",
                                "B. hard for them to follow.",
                                "C. critical of the industry."
                            ],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // Q24
                        {
                            blockType: "question" as const,
                            questionNumber: 24,
                            questionType: "multiple-choice" as const,
                            questionText: "What do Hugo and Chantal criticise about their school careers advice?",
                            options: [
                                "A. It was not__(relevant to)__(their future plans).",
                                "B. It__(focused too much on)__(certain subjects).",
                                "C. The__quality of advice__(depended on)__who gave it."
                            ],
                            correctAnswer: "C",
                            marks: 1
                        },

                        // Q25
                        {
                            blockType: "question" as const,
                            questionNumber: 25,
                            questionType: "multiple-choice" as const,
                            questionText: "When discussing their future, Hugo and Chantal disagree on",
                            options: [
                                "A. which is the best career in fashion.",
                                "B. when to choose a career in fashion.",
                                "C. why they would like a career in fashion."
                            ],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // Q26
                        {
                            blockType: "question" as const,
                            questionNumber: 26,
                            questionType: "multiple-choice" as const,
                            questionText: "How does Hugo feel about being an unpaid assistant?",
                            options: [
                                "A. He is realistic about the practice.",
                                "B. He feels the practice is dishonest.",
                                "C. He thinks others want to change the practice."
                            ],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // ── Q27–28 instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 27 and 28</strong><br/>Choose <strong>TWO</strong> letters, <strong>A–E</strong>.<br/><br/>Which TWO mistakes did the speaker admit she made in her first job?"
                        },

                        // Q27
                        {
                            blockType: "question" as const,
                            questionNumber: 27,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO mistakes did the speaker admit she made in her first job?",
                            options: [
                                "A. being dishonest to her employer",
                                "B. paying too much attention to how she looked",
                                "C. expecting to become well known",
                                "D. trying to earn a lot of money",
                                "E. openly disliking her client"
                            ],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // Q28
                        {
                            blockType: "question" as const,
                            questionNumber: 28,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO mistakes did the speaker admit she made in her first job?",
                            options: [
                                "A. being dishonest to her employer",
                                "B. paying too much attention to how she looked",
                                "C. expecting to become well known",
                                "D. trying to earn a lot of money",
                                "E. openly disliking her client"
                            ],
                            correctAnswer: "E",
                            marks: 1
                        },

                        // ── Q29–30 instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 29 and 30</strong><br/>Choose <strong>TWO</strong> letters, <strong>A–E</strong>.<br/><br/>Which TWO pieces of retail information do Hugo and Chantal agree would be useful?"
                        },

                        // Q29
                        {
                            blockType: "question" as const,
                            questionNumber: 29,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO pieces of retail information do Hugo and Chantal agree would be useful?",
                            options: [
                                "A. the reasons people return fashion items",
                                "B. how much time people have to shop for clothes",
                                "C. fashion designs people want but can't find",
                                "D. the best time of year for fashion buying",
                                "E. the most popular fashion sizes"
                            ],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // Q30
                        {
                            blockType: "question" as const,
                            questionNumber: 30,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO pieces of retail information do Hugo and Chantal agree would be useful?",
                            options: [
                                "A. the reasons people return fashion items",
                                "B. how much time people have to shop for clothes",
                                "C. fashion designs people want but can't find",
                                "D. the best time of year for fashion buying",
                                "E. the most popular fashion sizes"
                            ],
                            correctAnswer: "C",
                            marks: 1
                        },
                    ]
                },

                // ═══════════════════════════════════════════════
                // PART 4 — Elephant translocation (Q 31–40)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 4,
                    title: "Part 4",
                    context: "A lecture about elephant translocation.",
                    instructions: "Questions 31–40",
                    audioUrl: "",
                    questions: [

                        // ── Instruction block ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 31–40</strong><br/>Complete the notes below.<br/>Write <strong>ONE WORD ONLY</strong> for each answer."
                        },

                        // ── Heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong style='font-size:16px;'>Elephant translocation</strong>"
                        },

                        // ── Reasons heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Reasons for overpopulation at Majete National Park</strong><ul style='margin:4px 0;'><li>strict enforcement of anti-poaching laws</li><li>successful breeding</li></ul>"
                        },

                        // ── Problems heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Problems caused by elephant overpopulation</strong><ul style='margin:4px 0;'><li>greater competition, causing hunger for elephants</li></ul>"
                        },

                        // Q31
                        {
                            blockType: "question" as const,
                            questionNumber: 31,
                            questionType: "note-completion" as const,
                            questionText: "damage to ________ in the park",
                            correctAnswer: "fences",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── The translocation process heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>The translocation process</strong>"
                        },

                        // Q32
                        {
                            blockType: "question" as const,
                            questionNumber: 32,
                            questionType: "note-completion" as const,
                            questionText: "a suitable group of elephants from the same ________ was selected",
                            correctAnswer: "family",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q33
                        {
                            blockType: "question" as const,
                            questionNumber: 33,
                            questionType: "note-completion" as const,
                            questionText: "vets and park staff made use of ________ to help guide the elephants into an open plain",
                            correctAnswer: "helicopters",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── Static bullet ──
                        {
                            blockType: "instruction" as const,
                            content: "<ul style='margin:4px 0;'><li>elephants were immobilised with tranquilisers</li></ul>"
                        },

                        // Q34
                        {
                            blockType: "question" as const,
                            questionNumber: 34,
                            questionType: "note-completion" as const,
                            questionText: "this process had to be completed quickly to reduce ________",
                            correctAnswer: "stress",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q35
                        {
                            blockType: "question" as const,
                            questionNumber: 35,
                            questionType: "note-completion" as const,
                            questionText: "elephants had to be turned on their ________ to avoid damage to their lungs",
                            correctAnswer: "sides",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q36
                        {
                            blockType: "question" as const,
                            questionNumber: 36,
                            questionType: "note-completion" as const,
                            questionText: "elephants' ________ had to be monitored constantly",
                            correctAnswer: "breathing",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── Static bullets ──
                        {
                            blockType: "instruction" as const,
                            content: "<ul style='margin:4px 0;'><li>tracking devices were fitted to the matriarchs</li></ul>"
                        },

                        // Q37
                        {
                            blockType: "question" as const,
                            questionNumber: 37,
                            questionType: "note-completion" as const,
                            questionText: "data including the size of their tusks and ________ was taken",
                            correctAnswer: "feet",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── Static bullet ──
                        {
                            blockType: "instruction" as const,
                            content: "<ul style='margin:4px 0;'><li>elephants were taken by truck to their new reserve</li></ul>"
                        },

                        // ── Advantages heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Advantages of translocation at Nkhotakota Wildlife Park</strong>"
                        },

                        // Q38
                        {
                            blockType: "question" as const,
                            questionNumber: 38,
                            questionType: "note-completion" as const,
                            questionText: "________ opportunities",
                            correctAnswer: "employment",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q39
                        {
                            blockType: "question" as const,
                            questionNumber: 39,
                            questionType: "note-completion" as const,
                            questionText: "a reduction in the number of poachers and ________",
                            correctAnswer: "weapons",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── Static bullet ──
                        {
                            blockType: "instruction" as const,
                            content: "<ul style='margin:4px 0;'><li>an example of conservation that other parks can follow</li></ul>"
                        },

                        // Q40
                        {
                            blockType: "question" as const,
                            questionNumber: 40,
                            questionType: "note-completion" as const,
                            questionText: "an increase in ________ as a contributor to GDP",
                            correctAnswer: "tourism",
                            marks: 1,
                            wordLimit: 1
                        },
                    ]
                },
            ]
        };

        const newTest = await ListeningTest.create(listeningTest04);
        console.log("\n✅ Listening Test 04 created successfully!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("Test ID   :", newTest.testId);
        console.log("Test No.  :", newTest.testNumber);
        console.log("Title     :", newTest.title);
        console.log("Sections  :", newTest.sections?.length);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("\n✅ All 4 Parts complete! All 40 answers inserted.");
        console.log("📚 Source: Cambridge IELTS 18 Academic Listening Test 1");

        await mongoose.disconnect();
        console.log("\nDisconnected from MongoDB. Done!");

    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

seedListeningTest04();
