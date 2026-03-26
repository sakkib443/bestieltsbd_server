import mongoose from "mongoose";
import config from "../app/config";
import { ListeningTest } from "../app/modules/listening/listening.model";

async function seedListeningTest02() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("Connected to MongoDB");

        // Check if already exists
        const existing = await ListeningTest.findOne({ testNumber: 2 });
        if (existing) {
            console.log("Listening Test #2 already exists. Deleting and recreating...");
            await ListeningTest.deleteOne({ _id: existing._id });
        }

        const db = mongoose.connection.db!;
        const adminUser = await db.collection("users").findOne({ role: "admin" });
        const createdBy = adminUser?._id || new mongoose.Types.ObjectId();

        const listeningTest02 = {
            testId: "LISTENING_002",
            testNumber: 2,
            title: "Listening Test 02",
            description: "IELTS Academic Listening Test 02 — 4 parts, 40 questions",
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
                // PART 1 — Children's Engineering Workshops (Q 1–10)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 1,
                    title: "Part 1",
                    context: "A conversation about children's engineering workshops.",
                    instructions: "Questions 1–10",
                    audioUrl: "",
                    questions: [
                        // ── Instruction block ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 1–10</strong><br/>Complete the notes below.<br/>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer."
                        },

                        // ─── Children's Engineering Workshops ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Children's Engineering Workshops</strong><br/><br/><strong>Tiny Engineers (ages 4-5)</strong><br/><br/><strong>Activities</strong>"
                        },

                        // Q1
                        {
                            blockType: "question" as const,
                            questionNumber: 1,
                            questionType: "note-completion" as const,
                            questionText: "Create a cover for an ________ so they can drop it from a height without breaking it.",
                            correctAnswer: "",
                            marks: 1, wordLimit: 1
                        },
                        // Q2
                        {
                            blockType: "question" as const,
                            questionNumber: 2,
                            questionType: "note-completion" as const,
                            questionText: "Take part in a competition to build the tallest ________.",
                            correctAnswer: "",
                            marks: 1, wordLimit: 1
                        },
                        // Q3
                        {
                            blockType: "question" as const,
                            questionNumber: 3,
                            questionType: "note-completion" as const,
                            questionText: "Make a ________ powered by a balloon.",
                            correctAnswer: "",
                            marks: 1, wordLimit: 1
                        },

                        // ─── Junior Engineers ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Junior Engineers (ages 6-8)</strong><br/><br/><strong>Activities:</strong>"
                        },

                        // Q4
                        {
                            blockType: "question" as const,
                            questionNumber: 4,
                            questionType: "note-completion" as const,
                            questionText: "Build model cars, trucks and ________ and learn how to program them so they can move.",
                            correctAnswer: "",
                            marks: 1, wordLimit: 1
                        },
                        // Q5
                        {
                            blockType: "question" as const,
                            questionNumber: 5,
                            questionType: "note-completion" as const,
                            questionText: "Take part in a competition to build the longest ________ using card and wood.",
                            correctAnswer: "",
                            marks: 1, wordLimit: 1
                        },
                        // Q6
                        {
                            blockType: "question" as const,
                            questionNumber: 6,
                            questionType: "note-completion" as const,
                            questionText: "Create a short ________ with special software.",
                            correctAnswer: "",
                            marks: 1, wordLimit: 1
                        },
                        // Q7
                        {
                            blockType: "question" as const,
                            questionNumber: 7,
                            questionType: "note-completion" as const,
                            questionText: "Build, ________ and program a humanoid robot.",
                            correctAnswer: "",
                            marks: 1, wordLimit: 1
                        },

                        // ─── Cost & Location ───
                        {
                            blockType: "instruction" as const,
                            content: "Cost for a five-week block: £50"
                        },

                        // Q8
                        {
                            blockType: "question" as const,
                            questionNumber: 8,
                            questionType: "note-completion" as const,
                            questionText: "Held on ________ from 10 am to 11 am",
                            correctAnswer: "",
                            marks: 1, wordLimit: 1
                        },

                        // ─── Location ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Location</strong>"
                        },

                        // Q9
                        {
                            blockType: "question" as const,
                            questionNumber: 9,
                            questionType: "note-completion" as const,
                            questionText: "Building 10A, ________ Industrial Estate, Grasford",
                            correctAnswer: "",
                            marks: 1, wordLimit: 1
                        },
                        // Q10
                        {
                            blockType: "question" as const,
                            questionNumber: 10,
                            questionType: "note-completion" as const,
                            questionText: "Plenty of ________ is available.",
                            correctAnswer: "",
                            marks: 1, wordLimit: 1
                        },
                    ]
                },

                // ═══════════════════════════════════════════════
                // PART 2 — Stevenson's (Q 11–20)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 2,
                    title: "Part 2",
                    context: "A talk about Stevenson's company and a tour of its site.",
                    instructions: "Questions 11–20",
                    audioUrl: "",
                    questions: [
                        // ── MCQ instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 11–14</strong><br/>Choose the correct letter, <strong>A</strong>, <strong>B</strong> or <strong>C</strong>."
                        },

                        // Q11
                        {
                            blockType: "question" as const,
                            questionNumber: 11,
                            questionType: "multiple-choice" as const,
                            questionText: "Stevenson's was founded in",
                            options: [
                                "A. 1923.",
                                "B. 1924.",
                                "C. 1926."
                            ],
                            correctAnswer: "",
                            marks: 1
                        },

                        // Q12
                        {
                            blockType: "question" as const,
                            questionNumber: 12,
                            questionType: "multiple-choice" as const,
                            questionText: "Originally, Stevenson's manufactured goods for",
                            options: [
                                "A. the healthcare industry.",
                                "B. the automotive industry.",
                                "C. the machine tools industry."
                            ],
                            correctAnswer: "",
                            marks: 1
                        },

                        // Q13
                        {
                            blockType: "question" as const,
                            questionNumber: 13,
                            questionType: "multiple-choice" as const,
                            questionText: "What does the speaker say about the company premises?",
                            options: [
                                "A. The company has recently moved.",
                                "B. The company has no plans to move.",
                                "C. The company is going to move shortly."
                            ],
                            correctAnswer: "",
                            marks: 1
                        },

                        // Q14
                        {
                            blockType: "question" as const,
                            questionNumber: 14,
                            questionType: "multiple-choice" as const,
                            questionText: "The programme for the work experience group includes",
                            options: [
                                "A. time to do research.",
                                "B. meetings with a teacher.",
                                "C. talks by staff."
                            ],
                            correctAnswer: "",
                            marks: 1
                        },

                        // ── Map Labeling instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 15–20</strong><br/>Label the map below.<br/>Write the correct letter, <strong>A–J</strong>, next to Questions 15–20.<br/><br/><strong>Plan of Stevenson's site</strong><br/><em>The map shows a factory site with rooms labeled A through J. The factory is at the top. Below it are rooms A, B (top row), C (right side), D, E (middle row), F (left of courtyard), an Open Courtyard in the center, G (right of courtyard), and H, I, J (bottom row) next to Reception. Main Road is at the bottom, Access Road is on the right side.</em>"
                        },

                        // Q15
                        {
                            blockType: "question" as const,
                            questionNumber: 15,
                            questionType: "map-labeling" as const,
                            questionText: "coffee room",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
                            correctAnswer: "",
                            marks: 1
                        },

                        // Q16
                        {
                            blockType: "question" as const,
                            questionNumber: 16,
                            questionType: "map-labeling" as const,
                            questionText: "warehouse",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
                            correctAnswer: "",
                            marks: 1
                        },

                        // Q17
                        {
                            blockType: "question" as const,
                            questionNumber: 17,
                            questionType: "map-labeling" as const,
                            questionText: "staff canteen",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
                            correctAnswer: "",
                            marks: 1
                        },

                        // Q18
                        {
                            blockType: "question" as const,
                            questionNumber: 18,
                            questionType: "map-labeling" as const,
                            questionText: "meeting room",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
                            correctAnswer: "",
                            marks: 1
                        },

                        // Q19
                        {
                            blockType: "question" as const,
                            questionNumber: 19,
                            questionType: "map-labeling" as const,
                            questionText: "human resources",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
                            correctAnswer: "",
                            marks: 1
                        },

                        // Q20
                        {
                            blockType: "question" as const,
                            questionNumber: 20,
                            questionType: "map-labeling" as const,
                            questionText: "boardroom",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
                            correctAnswer: "",
                            marks: 1
                        },
                    ]
                },

                // ═══════════════════════════════════════════════
                // PART 3 — Art Projects Discussion (Q 21–30)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 3,
                    title: "Part 3",
                    context: "A discussion between two students, Jess and Tom, about their art projects.",
                    instructions: "Questions 21–30",
                    audioUrl: "",
                    questions: [
                        // ── MCQ Multi instruction Q21-22 ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 21-22</strong><br/>Choose <strong>TWO</strong> letters, <strong>A-E</strong>."
                        },

                        // Q21
                        {
                            blockType: "question" as const,
                            questionNumber: 21,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO parts of the introductory stage to their art projects do Jess and Tom agree were useful?",
                            options: [
                                "A. the Bird Park visit",
                                "B. the workshop sessions",
                                "C. the Natural History Museum visit",
                                "D. the projects done in previous years",
                                "E. the handouts with research sources"
                            ],
                            correctAnswer: "",
                            marks: 1
                        },

                        // Q22
                        {
                            blockType: "question" as const,
                            questionNumber: 22,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO parts of the introductory stage to their art projects do Jess and Tom agree were useful?",
                            options: [
                                "A. the Bird Park visit",
                                "B. the workshop sessions",
                                "C. the Natural History Museum visit",
                                "D. the projects done in previous years",
                                "E. the handouts with research sources"
                            ],
                            correctAnswer: "",
                            marks: 1
                        },

                        // ── MCQ Multi instruction Q23-24 ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 23-24</strong><br/>Choose <strong>TWO</strong> letters, <strong>A-E</strong>."
                        },

                        // Q23
                        {
                            blockType: "question" as const,
                            questionNumber: 23,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "In which TWO ways do both Jess and Tom decide to change their proposals?",
                            options: [
                                "A. by giving a rationale for their action plans",
                                "B. by being less specific about the outcome",
                                "C. by adding a video diary presentation",
                                "D. by providing a timeline and a mind map",
                                "E. by making their notes more evaluative"
                            ],
                            correctAnswer: "",
                            marks: 1
                        },

                        // Q24
                        {
                            blockType: "question" as const,
                            questionNumber: 24,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "In which TWO ways do both Jess and Tom decide to change their proposals?",
                            options: [
                                "A. by giving a rationale for their action plans",
                                "B. by being less specific about the outcome",
                                "C. by adding a video diary presentation",
                                "D. by providing a timeline and a mind map",
                                "E. by making their notes more evaluative"
                            ],
                            correctAnswer: "",
                            marks: 1
                        },

                        // ── Matching instruction Q25-30 ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 25-30</strong><br/>Which personal meaning do the students decide to give to each of the following pictures?<br/>Choose <strong>SIX</strong> answers from the box and write the correct letter, <strong>A-H</strong>, next to Questions.<br/><br/><strong>Personal meanings</strong><br/>A &nbsp; a childhood memory<br/>B &nbsp; hope for the future<br/>C &nbsp; fast movement<br/>D &nbsp; a potential threat<br/>E &nbsp; the power of colour<br/>F &nbsp; the continuity of life<br/>G &nbsp; protection of nature<br/>H &nbsp; a confused attitude to nature"
                        },

                        // ─── Pictures ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Pictures</strong>"
                        },

                        // Q25
                        {
                            blockType: "question" as const,
                            questionNumber: 25,
                            questionType: "matching" as const,
                            questionText: "Falcon (Landseer)",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "",
                            marks: 1
                        },

                        // Q26
                        {
                            blockType: "question" as const,
                            questionNumber: 26,
                            questionType: "matching" as const,
                            questionText: "Fish hawk (Audubon)",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "",
                            marks: 1
                        },

                        // Q27
                        {
                            blockType: "question" as const,
                            questionNumber: 27,
                            questionType: "matching" as const,
                            questionText: "Kingfisher (van Gogh)",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "",
                            marks: 1
                        },

                        // Q28
                        {
                            blockType: "question" as const,
                            questionNumber: 28,
                            questionType: "matching" as const,
                            questionText: "Portrait of William Wells",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "",
                            marks: 1
                        },

                        // Q29
                        {
                            blockType: "question" as const,
                            questionNumber: 29,
                            questionType: "matching" as const,
                            questionText: "Vairumati (Gauguin)",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "",
                            marks: 1
                        },

                        // Q30
                        {
                            blockType: "question" as const,
                            questionNumber: 30,
                            questionType: "matching" as const,
                            questionText: "Portrait of Giovanni de Medici",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "",
                            marks: 1
                        },
                    ]
                },

                // ═══════════════════════════════════════════════
                // PART 4 — Stoicism (Q 31–40)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 4,
                    title: "Part 4",
                    context: "A lecture about Stoicism.",
                    instructions: "Questions 31–40",
                    audioUrl: "",
                    questions: [
                        // ── Instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 31-40</strong><br/>Complete the notes below.<br/>Write <strong>ONE WORD ONLY</strong> for each answer."
                        },

                        // ── Stoicism heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong style='font-size:16px;'>Stoicism</strong>"
                        },

                        // Q31
                        {
                            blockType: "question" as const,
                            questionNumber: 31,
                            questionType: "note-completion" as const,
                            questionText: "Stoicism is still relevant today because of its ________ appeal.",
                            correctAnswer: "",
                            wordLimit: 1,
                            marks: 1
                        },

                        // ── Ancient Stoics heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Ancient Stoics</strong><ul style='margin:4px 0;'><li>Stoicism was founded over 2,000 years ago in Greece.</li></ul>"
                        },

                        // Q32
                        {
                            blockType: "question" as const,
                            questionNumber: 32,
                            questionType: "note-completion" as const,
                            questionText: "The Stoics' ideas are surprisingly well known, despite not being intended for ________",
                            correctAnswer: "",
                            wordLimit: 1,
                            marks: 1
                        },

                        // ── Stoic principles heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Stoic principles</strong><ul style='margin:4px 0;'><li>Happiness could be achieved by leading a virtuous life.</li><li>Controlling emotions was essential.</li></ul>"
                        },

                        // Q33
                        {
                            blockType: "question" as const,
                            questionNumber: 33,
                            questionType: "note-completion" as const,
                            questionText: "Epictetus said that external events cannot be controlled but the ________ people make in response can be controlled.",
                            correctAnswer: "",
                            wordLimit: 1,
                            marks: 1
                        },

                        // Q34
                        {
                            blockType: "question" as const,
                            questionNumber: 34,
                            questionType: "note-completion" as const,
                            questionText: "A Stoic is someone who has a different view on experiences which others would consider as ________.",
                            correctAnswer: "",
                            wordLimit: 1,
                            marks: 1
                        },

                        // ── The influence of Stoicism heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>The influence of Stoicism</strong>"
                        },

                        // Q35
                        {
                            blockType: "question" as const,
                            questionNumber: 35,
                            questionType: "note-completion" as const,
                            questionText: "George Washington organised a ________ about Cato to motivate his men.",
                            correctAnswer: "",
                            wordLimit: 1,
                            marks: 1
                        },

                        {
                            blockType: "instruction" as const,
                            content: "<ul style='margin:4px 0;'><li>The French artist Delacroix was a Stoic.</li></ul>"
                        },

                        // Q36
                        {
                            blockType: "question" as const,
                            questionNumber: 36,
                            questionType: "note-completion" as const,
                            questionText: "Adam Smith's ideas on ________ were influenced by Stoicism.",
                            correctAnswer: "",
                            wordLimit: 1,
                            marks: 1
                        },

                        {
                            blockType: "instruction" as const,
                            content: "<ul style='margin:4px 0;'><li>Some of today's political leaders are inspired by the Stoics.</li><li>Cognitive Behaviour Therapy (CBT)</li></ul>"
                        },

                        // Q37
                        {
                            blockType: "question" as const,
                            questionNumber: 37,
                            questionType: "note-completion" as const,
                            questionText: "– the treatment for ________ is based on ideas from Stoicism",
                            correctAnswer: "",
                            wordLimit: 1,
                            marks: 1
                        },

                        // Q38
                        {
                            blockType: "question" as const,
                            questionNumber: 38,
                            questionType: "note-completion" as const,
                            questionText: "– people learn to base their thinking on ________.",
                            correctAnswer: "",
                            wordLimit: 1,
                            marks: 1
                        },

                        // Q39
                        {
                            blockType: "question" as const,
                            questionNumber: 39,
                            questionType: "note-completion" as const,
                            questionText: "In business, people benefit from Stoicism by identifying obstacles as ________.",
                            correctAnswer: "",
                            wordLimit: 1,
                            marks: 1
                        },

                        // ── Relevance of Stoicism ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Relevance of Stoicism</strong>"
                        },

                        // Q40
                        {
                            blockType: "question" as const,
                            questionNumber: 40,
                            questionType: "note-completion" as const,
                            questionText: "It requires a lot of ________ but Stoicism can help people to lead a good life.",
                            correctAnswer: "",
                            wordLimit: 1,
                            marks: 1
                        },

                        {
                            blockType: "instruction" as const,
                            content: "<ul style='margin:4px 0;'><li>It teaches people that having a strong character is more important than anything else.</li></ul>"
                        },
                    ]
                },
            ]
        };

        const newTest = await ListeningTest.create(listeningTest02);
        console.log("\n✅ Listening Test 02 created successfully!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("Test ID   :", newTest.testId);
        console.log("Test No.  :", newTest.testNumber);
        console.log("Sections  :", newTest.sections?.length);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("\n⚠️  Correct answers are EMPTY — update them after getting the answer key.");
        console.log("⚠️  Parts 2, 3, 4 are PLACEHOLDERS — add questions when ready.");

        await mongoose.disconnect();
        console.log("\nDisconnected from MongoDB. Done!");

    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

seedListeningTest02();
