import mongoose from "mongoose";
import config from "../app/config";
import { ListeningTest } from "../app/modules/listening/listening.model";

async function seedListeningTest05() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("Connected to MongoDB");

        // Check if already exists
        const existing = await ListeningTest.findOne({ testNumber: 5 });
        if (existing) {
            console.log("Listening Test #5 already exists. Deleting and recreating...");
            await ListeningTest.deleteOne({ _id: existing._id });
        }

        const db = mongoose.connection.db!;
        const adminUser = await db.collection("users").findOne({ role: "admin" });
        const createdBy = adminUser?._id || new mongoose.Types.ObjectId();

        const listeningTest05 = {
            testId: "LISTENING_005",
            testNumber: 5,
            title: "Listening Test 05",
            description: "IELTS Academic Listening Test 05 — 4 parts, 40 questions",
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
                // PART 1 — Hinchingbrooke Country Park (Q 1–10)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 1,
                    title: "Part 1",
                    context: "A conversation about Hinchingbrooke Country Park and educational visits.",
                    instructions: "Questions 1–10",
                    audioUrl: "",
                    questions: [
                        // ── Instruction block ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 1–10</strong><br/>Complete the notes below.<br/>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer."
                        },

                        // ─── Heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Hinchingbrooke Country Park</strong>"
                        },

                        // ── The park subheading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>The park</strong>"
                        },

                        // Q1
                        {
                            blockType: "question" as const,
                            questionNumber: 1,
                            questionType: "note-completion" as const,
                            questionText: "Area: ________ hectares",
                            correctAnswer: "69",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── Static info ──
                        {
                            blockType: "instruction" as const,
                            content: "<ul style='margin:4px 0;'><li>Habitats: wetland, grassland and woodland</li></ul>"
                        },

                        // Q2
                        {
                            blockType: "question" as const,
                            questionNumber: 2,
                            questionType: "note-completion" as const,
                            questionText: "Wetland: lakes, ponds and a ________",
                            correctAnswer: "stream",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── Static info ──
                        {
                            blockType: "instruction" as const,
                            content: "<ul style='margin:4px 0;'><li>Wildlife includes birds, insects and animals</li></ul>"
                        },

                        // ── Subjects heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Subjects studied in educational visits include:</strong>"
                        },

                        // Q3
                        {
                            blockType: "question" as const,
                            questionNumber: 3,
                            questionType: "note-completion" as const,
                            questionText: "Science: Children look at ________ about plants, etc.",
                            correctAnswer: "data",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q4
                        {
                            blockType: "question" as const,
                            questionNumber: 4,
                            questionType: "note-completion" as const,
                            questionText: "Geography: Children practise reading a ________",
                            correctAnswer: "map",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q5
                        {
                            blockType: "question" as const,
                            questionNumber: 5,
                            questionType: "note-completion" as const,
                            questionText: "Leisure and tourism: mostly concentrates on the park's ________",
                            correctAnswer: "visitors",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q6
                        {
                            blockType: "question" as const,
                            questionNumber: 6,
                            questionType: "note-completion" as const,
                            questionText: "Music: Children make ________ with natural materials, and experiment with rhythm and speed",
                            correctAnswer: "sounds",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q7
                        {
                            blockType: "question" as const,
                            questionNumber: 7,
                            questionType: "note-completion" as const,
                            questionText: "They give children a feeling of ________ that they may not have elsewhere",
                            correctAnswer: "freedom",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q8
                        {
                            blockType: "question" as const,
                            questionNumber: 8,
                            questionType: "note-completion" as const,
                            questionText: "Children learn new ________ and gain self-confidence",
                            correctAnswer: "skills",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── Practical information heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Practical information for visits</strong>"
                        },

                        // Q9
                        {
                            blockType: "question" as const,
                            questionNumber: 9,
                            questionType: "note-completion" as const,
                            questionText: "Cost per child: £________ (for over 30 children)",
                            correctAnswer: "4.95",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q10
                        {
                            blockType: "question" as const,
                            questionNumber: 10,
                            questionType: "note-completion" as const,
                            questionText: "No charge for ________",
                            correctAnswer: "leaders",
                            marks: 1,
                            wordLimit: 1
                        },
                    ]
                },

                // ═══════════════════════════════════════════════
                // PART 2 — Stanthorpe Twinning Association (Q 11–20)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 2,
                    title: "Part 2",
                    context: "A talk about the Stanthorpe Twinning Association and a visit to Farley House.",
                    instructions: "Questions 11–20",
                    audioUrl: "",
                    questions: [

                        // ── Questions 11–15 instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 11–15</strong><br/>Choose the correct letter, <strong>A</strong>, <strong>B</strong> or <strong>C</strong>."
                        },

                        // ─── Heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Stanthorpe Twinning Association</strong>"
                        },

                        // Q11
                        {
                            blockType: "question" as const,
                            questionNumber: 11,
                            questionType: "multiple-choice" as const,
                            questionText: "During the visit to Malatte, in France, members especially enjoyed",
                            options: [
                                "A. going to a theme park.",
                                "B. experiencing a river trip.",
                                "C. visiting a cheese factory."
                            ],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // Q12
                        {
                            blockType: "question" as const,
                            questionNumber: 12,
                            questionType: "multiple-choice" as const,
                            questionText: "What will happen in Stanthorpe to mark the 25th anniversary of the Twinning Association?",
                            options: [
                                "A. A tree will be planted.",
                                "B. A garden seat will be bought.",
                                "C. A footbridge will be built."
                            ],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // Q13
                        {
                            blockType: "question" as const,
                            questionNumber: 13,
                            questionType: "multiple-choice" as const,
                            questionText: "Which event raised most funds this year?",
                            options: [
                                "A. the film show",
                                "B. the pancake evening",
                                "C. the cookery demonstration"
                            ],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // Q14
                        {
                            blockType: "question" as const,
                            questionNumber: 14,
                            questionType: "multiple-choice" as const,
                            questionText: "For the first evening with the French visitors host families are advised to",
                            options: [
                                "A. take them for a walk round the town.",
                                "B. go to a local restaurant.",
                                "C. have a meal at home."
                            ],
                            correctAnswer: "C",
                            marks: 1
                        },

                        // Q15
                        {
                            blockType: "question" as const,
                            questionNumber: 15,
                            questionType: "multiple-choice" as const,
                            questionText: "On Saturday evening there will be the chance to",
                            options: [
                                "A. listen to a concert.",
                                "B. watch a match.",
                                "C. take part in a competition."
                            ],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // ── Questions 16–20 instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 16–20</strong><br/>Label the map below.<br/>Write the correct letter, <strong>A–H</strong>, next to Questions 16–20.<br/><br/><strong>Farley House</strong>"
                        },

                        // Q16
                        {
                            blockType: "question" as const,
                            questionNumber: 16,
                            questionType: "matching" as const,
                            questionText: "Farm shop",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "G",
                            marks: 1
                        },

                        // Q17
                        {
                            blockType: "question" as const,
                            questionNumber: 17,
                            questionType: "matching" as const,
                            questionText: "Disabled entry",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "C",
                            marks: 1
                        },

                        // Q18
                        {
                            blockType: "question" as const,
                            questionNumber: 18,
                            questionType: "matching" as const,
                            questionText: "Adventure playground",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // Q19
                        {
                            blockType: "question" as const,
                            questionNumber: 19,
                            questionType: "matching" as const,
                            questionText: "Kitchen gardens",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "D",
                            marks: 1
                        },

                        // Q20
                        {
                            blockType: "question" as const,
                            questionNumber: 20,
                            questionType: "matching" as const,
                            questionText: "The Temple of the Four Winds",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "A",
                            marks: 1
                        },
                    ]
                },

                // ═══════════════════════════════════════════════
                // PART 3 — Food trends (Q 21–30)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 3,
                    title: "Part 3",
                    context: "A discussion between two students about food trends and related projects.",
                    instructions: "Questions 21–30",
                    audioUrl: "",
                    questions: [

                        // ── Q21–22 instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 21 and 22</strong><br/>Choose <strong>TWO</strong> letters, <strong>A–E</strong>.<br/><br/>Which TWO things did Colin find most satisfying about his bread reuse project?"
                        },

                        // Q21
                        {
                            blockType: "question" as const,
                            questionNumber: 21,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO things did Colin find most satisfying about his bread reuse project?",
                            options: [
                                "A. receiving support from local restaurants",
                                "B. finding a good way to prevent waste",
                                "C. overcoming problems in a basic process",
                                "D. experimenting with designs and colours",
                                "E. learning how to apply 3-D printing"
                            ],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // Q22
                        {
                            blockType: "question" as const,
                            questionNumber: 22,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO things did Colin find most satisfying about his bread reuse project?",
                            options: [
                                "A. receiving support from local restaurants",
                                "B. finding a good way to prevent waste",
                                "C. overcoming problems in a basic process",
                                "D. experimenting with designs and colours",
                                "E. learning how to apply 3-D printing"
                            ],
                            correctAnswer: "D",
                            marks: 1
                        },

                        // ── Q23–24 instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 23 and 24</strong><br/>Choose <strong>TWO</strong> letters, <strong>A–E</strong>.<br/><br/>Which TWO ways do the students agree that touch-sensitive sensors for food labels could be developed in future?"
                        },

                        // Q23
                        {
                            blockType: "question" as const,
                            questionNumber: 23,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO ways do the students agree that touch-sensitive sensors for food labels could be developed in future?",
                            options: [
                                "A. for use on medical products",
                                "B. to show that food is no longer fit to eat",
                                "C. for use with drinks as well as foods",
                                "D. to provide applications for blind people",
                                "E. to indicate the weight of certain foods"
                            ],
                            correctAnswer: "A",
                            marks: 1
                        },

                        // Q24
                        {
                            blockType: "question" as const,
                            questionNumber: 24,
                            questionType: "multiple-choice-multi" as const,
                            questionText: "Which TWO ways do the students agree that touch-sensitive sensors for food labels could be developed in future?",
                            options: [
                                "A. for use on medical products",
                                "B. to show that food is no longer fit to eat",
                                "C. for use with drinks as well as foods",
                                "D. to provide applications for blind people",
                                "E. to indicate the weight of certain foods"
                            ],
                            correctAnswer: "E",
                            marks: 1
                        },

                        // ── Q25–30 instruction ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Questions 25–30</strong><br/>What is the students' opinion about each of the following food trends?<br/>Choose <strong>SIX</strong> answers from the box and write the correct letter, <strong>A–H</strong>, next to Questions 25–30.<br/><br/><strong>Opinions</strong><br/>A &nbsp; This is only relevant to young people.<br/>B &nbsp; This may have disappointing results.<br/>C &nbsp; This already seems to be widespread.<br/>D &nbsp; Retailers should do more to encourage this.<br/>E &nbsp; More financial support is needed for this.<br/>F &nbsp; Most people know little about this.<br/>G &nbsp; There should be stricter regulations about this.<br/>H &nbsp; This could be dangerous."
                        },

                        // ─── Food trends heading ───
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Food trends</strong>"
                        },

                        // Q25
                        {
                            blockType: "question" as const,
                            questionNumber: 25,
                            questionType: "matching" as const,
                            questionText: "Use of local products",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "D",
                            marks: 1
                        },

                        // Q26
                        {
                            blockType: "question" as const,
                            questionNumber: 26,
                            questionType: "matching" as const,
                            questionText: "Reduction in unnecessary packaging",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "G",
                            marks: 1
                        },

                        // Q27
                        {
                            blockType: "question" as const,
                            questionNumber: 27,
                            questionType: "matching" as const,
                            questionText: "Gluten-free and lactose-free food",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "C",
                            marks: 1
                        },

                        // Q28
                        {
                            blockType: "question" as const,
                            questionNumber: 28,
                            questionType: "matching" as const,
                            questionText: "Use of branded products related to celebrity chefs",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "B",
                            marks: 1
                        },

                        // Q29
                        {
                            blockType: "question" as const,
                            questionNumber: 29,
                            questionType: "matching" as const,
                            questionText: "Development of 'ghost kitchens' for takeaway food",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "F",
                            marks: 1
                        },

                        // Q30
                        {
                            blockType: "question" as const,
                            questionNumber: 30,
                            questionType: "matching" as const,
                            questionText: "Use of mushrooms for common health concerns",
                            options: ["A", "B", "C", "D", "E", "F", "G", "H"],
                            correctAnswer: "H",
                            marks: 1
                        },
                    ]
                },

                // ═══════════════════════════════════════════════
                // PART 4 — Céide Fields (Q 31–40)
                // ═══════════════════════════════════════════════
                {
                    sectionNumber: 4,
                    title: "Part 4",
                    context: "A lecture about the Céide Fields, an important Neolithic archaeological site in the northwest of Ireland.",
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
                            content: "<strong style='font-size:16px;'>Céide Fields</strong><br/>an important Neolithic archaeological site in the northwest of Ireland"
                        },

                        // ── Discovery heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Discovery</strong>"
                        },

                        // Q31
                        {
                            blockType: "question" as const,
                            questionNumber: 31,
                            questionType: "note-completion" as const,
                            questionText: "In the 1930s, a local teacher realised that stones beneath the bog surface were once ________",
                            correctAnswer: "walls",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q32
                        {
                            blockType: "question" as const,
                            questionNumber: 32,
                            questionType: "note-completion" as const,
                            questionText: "His ________ began to explore further",
                            correctAnswer: "son",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── Static bullet ──
                        {
                            blockType: "instruction" as const,
                            content: "<ul style='margin:4px 0;'><li>Carbon dating later proved the site was Neolithic</li></ul>"
                        },

                        // ── Bog environment heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Bog environment</strong>"
                        },

                        // Q33
                        {
                            blockType: "question" as const,
                            questionNumber: 33,
                            questionType: "note-completion" as const,
                            questionText: "A traditional method of finding ________ was used",
                            correctAnswer: "fuel",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q34
                        {
                            blockType: "question" as const,
                            questionNumber: 34,
                            questionType: "note-completion" as const,
                            questionText: "Items are well preserved in the bog because of a lack of ________",
                            correctAnswer: "oxygen",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── Neolithic farmers heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Neolithic farmers</strong>"
                        },

                        // Q35
                        {
                            blockType: "question" as const,
                            questionNumber: 35,
                            questionType: "note-completion" as const,
                            questionText: "Houses were ________ in shape and had a hole in the roof",
                            correctAnswer: "rectangular",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q36
                        {
                            blockType: "question" as const,
                            questionNumber: 36,
                            questionType: "note-completion" as const,
                            questionText: "Pots were used for storage and to make ________",
                            correctAnswer: "lamps",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q37
                        {
                            blockType: "question" as const,
                            questionNumber: 37,
                            questionType: "note-completion" as const,
                            questionText: "Each field at Céide was large enough to support a big ________",
                            correctAnswer: "family",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q38
                        {
                            blockType: "question" as const,
                            questionNumber: 38,
                            questionType: "note-completion" as const,
                            questionText: "The fields were probably used to restrict the grazing of animals – no evidence of structures to house them during ________",
                            correctAnswer: "winter",
                            marks: 1,
                            wordLimit: 1
                        },

                        // ── Abandonment heading ──
                        {
                            blockType: "instruction" as const,
                            content: "<strong>Abandonment of the site</strong>"
                        },

                        // Q39
                        {
                            blockType: "question" as const,
                            questionNumber: 39,
                            questionType: "note-completion" as const,
                            questionText: "The ________ became less productive",
                            correctAnswer: "soil",
                            marks: 1,
                            wordLimit: 1
                        },

                        // Q40
                        {
                            blockType: "question" as const,
                            questionNumber: 40,
                            questionType: "note-completion" as const,
                            questionText: "There was a period of increased ________",
                            correctAnswer: "rain",
                            marks: 1,
                            wordLimit: 1
                        },
                    ]
                },
            ]
        };

        const newTest = await ListeningTest.create(listeningTest05);
        console.log("\n✅ Listening Test 05 created successfully!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("Test ID   :", newTest.testId);
        console.log("Test No.  :", newTest.testNumber);
        console.log("Title     :", newTest.title);
        console.log("Sections  :", newTest.sections?.length);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("\n✅ All 4 Parts complete! All 40 answers inserted.");
        console.log("📚 Source: Cambridge IELTS 19 Academic Listening Test 1");

        await mongoose.disconnect();
        console.log("\nDisconnected from MongoDB. Done!");

    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

seedListeningTest05();
