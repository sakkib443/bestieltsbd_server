import mongoose from "mongoose";
import { ReadingTest } from "../app/modules/reading/reading.model";
import { User } from "../app/modules/user/user.model";
import config from "../app/config";

const readingTest = {
    testId: "READING_TEST_02",
    testNumber: 2,
    title: "Reading Test 02",
    description: "IELTS Academic Reading Test featuring passages on polar bears, and more",
    source: "IELTS Practice Test",
    difficulty: "medium" as const,
    isActive: true,
    duration: 60,
    totalQuestions: 40,
    totalMarks: 40,
    sections: [
        // ═══════════════════════════════════════════
        // SECTION 1: Why we need to protect polar bears
        // ═══════════════════════════════════════════
        {
            sectionNumber: 1,
            title: "Why we need to protect polar bears",
            passage: `Polar bears are being increasingly threatened by the effects of climate change, but their disappearance could have far-reaching consequences. They are uniquely adapted to the extreme conditions of the Arctic Circle, where temperatures can reach —40°C. One reason for this is that they have up to 11 centimetres of fat underneath their skin. Humans with comparative levels of adipose tissue would be considered obese and would be likely to suffer from diabetes and heart disease. Yet the polar bear experiences no such consequences.

A 2014 study by Shi Ping Liu and colleagues sheds light on this mystery. They compared the genetic structure of polar bears with that of their closest relatives from a warmer climate, the brown bears. This allowed them to determine the genes that have allowed polar bears to survive in one of the toughest environments on Earth. Liu and his colleagues found the polar bears had a gene known as APoB, which reduces levels of low-density lipoproteins (LDLs) – a form of 'bad' cholesterol. In humans, mutations of this gene are associated with increased risk of heart disease. Polar bears may therefore be an important study model to understand heart disease in humans.

The genome of the polar bear may also provide the solution for another condition, one that particularly affects our older generation: osteoporosis. This is a disease where bones show reduced density, usually caused by insufficient exercise, reduced calcium intake or food starvation. Bone tissue is constantly being remodelled, meaning that bone is added or removed, depending on nutrient availability and the stress that the bone is under. Female polar bears, however, undergo extreme conditions during every pregnancy. Once autumn comes around, these females will dig maternity dens in the snow and will remain there throughout the winter, both before and after the birth of their cubs. This process results in about six months of fasting, where the female bears have to keep themselves and their cubs alive, depleting their own calcium and calorie reserves. Despite this, their bones remain strong and dense.

Physiologists Alanda Lennox and Allen Goodship found an explanation for this paradox in 2008. They discovered that pregnant bears were able to increase the density of their bones before they started to build their dens. In addition, six months later, when they finally emerged from the den with their cubs, there was no evidence of significant loss of bone density. Hibernating brown bears do not have this capacity and must therefore resort to major bone reformation in the following spring. If the mechanism of bone remodelling in polar bears can be understood, many bedridden humans, and even astronauts, could potentially benefit.

The medical benefits of the polar bear for humanity certainly have their importance in our conservation efforts, but these should not be the only factors taken into consideration. We tend to want to protect animals we think are intelligent and possess emotions, such as elephants and primates. Bears, on the other hand, seem to be perceived as stupid and in many cases violent. And yet anecdotal evidence from the field challenges those assumptions, suggesting for example that polar bears have good problem-solving abilities. A male bear called GoGo in Tennoji Zoo, Osaka, has even been observed making use of a tool to manipulate his environment. The bear used a tree branch on multiple occasions to dislodge a piece of meat hung out of his reach. Problem-solving ability has also been witnessed in wild polar bears, although not as obviously as with GoGo. A calculated move by a male bear involved running and jumping onto barrels in an attempt to get to a photographer standing on a platform four metres high.

In other studies, such as one by Alison Annes in 2008, polar bears showed deliberate and focussed manipulation. For example, Annes observed bears putting objects in piles and then knocking them over in what appeared to be a game. The study demonstrates that bears are capable of agile and thought-out behaviours. These examples suggest bears have greater creativity and problem-solving abilities than previously thought.

As for emotions while the evidence is once again anecdotal, many bears have been seen to hit out at ice and snow — seemingly out of frustration — when they have just missed out on a kill. Moreover, polar bears can form unusual relationships with other species, including playing with the dogs used to pull sleds in the Arctic. Remarkably, one hand-raised polar bear called Agee has formed a close relationship with her owner Mark Dumas to the point where they even swim together. This is even more astonishing since polar bears are known to actively hunt humans in the wild.

If climate change were to lead to their extinction, this would mean not only the loss of potential breakthroughs in human medicine, but more importantly, the disappearance of an intelligent, majestic animal.`,
            passageSource: "IELTS Practice Test",
            instructions: "Questions 1-13",
            questionGroups: [
                // Questions 1-7: True/False/Not Given
                {
                    groupType: "true-false-not-given",
                    startQuestion: 1,
                    endQuestion: 7,
                    mainInstruction: "Do the following statements agree with the information given in the Reading Passage?",
                    subInstruction: "In boxes on your answer sheet, write",
                    optionsExplanation: [
                        { option: "TRUE", explanation: "if the statement agrees with the information" },
                        { option: "FALSE", explanation: "if the statement contradicts the information" },
                        { option: "NOT GIVEN", explanation: "if there is no information on this" },
                    ],
                    statements: [
                        { questionNumber: 1, text: "Polar bears suffer from various health problems due to the build-up of fat under their skin.", correctAnswer: "FALSE" },
                        { questionNumber: 2, text: "The study done by Liu and his colleagues compared different groups of polar bears.", correctAnswer: "FALSE" },
                        { questionNumber: 3, text: "Liu and colleagues were the first researchers to compare polar bears and brown bears genetically.", correctAnswer: "NOT GIVEN" },
                        { questionNumber: 4, text: "Polar bears are able to control their levels of bad cholesterol by genetic means.", correctAnswer: "TRUE" },
                        { questionNumber: 5, text: "Female polar bears are able to survive for about six months without food.", correctAnswer: "TRUE" },
                        { questionNumber: 6, text: "It was found that the bones of female polar bears were very weak when they came out of their dens in spring.", correctAnswer: "FALSE" },
                        { questionNumber: 7, text: "The polar bear's mechanism for increasing bone density could also be used by people one day.", correctAnswer: "TRUE" },
                    ],
                },
                // Questions 8-13: Note Completion
                {
                    groupType: "note-completion",
                    startQuestion: 8,
                    endQuestion: 13,
                    mainInstruction: "Complete the table below.",
                    subInstruction: "Choose ONE WORD ONLY from the passage for each answer.",
                    mainHeading: "Reasons why polar bears should be protected",
                    passage: `People think of bears as unintelligent and 8 __________.

However, this may not be correct. For example:

• In Tennoji Zoo, a bear has been seen using a branch as a 9 __________. This allowed him to knock down some 10 __________.
• A wild polar bear worked out a method of reaching a platform where a 11 __________ was located.
• Polar bears have displayed behaviour such as conscious manipulation of objects and activity similar to a 12 __________.

Bears may also display emotions. For example:

• They may make movements suggesting 13 __________ if disappointed when hunting.
• They may form relationships with other species.`,
                    notesSections: [
                        {
                            subHeading: "",
                            bullets: [
                                { type: "question" as const, questionNumber: 8, textBefore: "People think of bears as unintelligent and", textAfter: ".", correctAnswer: "violent" },
                                { type: "question" as const, questionNumber: 9, textBefore: "In Tennoji Zoo, a bear has been seen using a branch as a", textAfter: ". This allowed him to knock down some", correctAnswer: "tool" },
                                { type: "question" as const, questionNumber: 10, textBefore: "This allowed him to knock down some", textAfter: ".", correctAnswer: "meat" },
                                { type: "question" as const, questionNumber: 11, textBefore: "A wild polar bear worked out a method of reaching a platform where a", textAfter: "was located.", correctAnswer: "photographer" },
                                { type: "question" as const, questionNumber: 12, textBefore: "Polar bears have displayed behaviour such as conscious manipulation of objects and activity similar to a", textAfter: ".", correctAnswer: "game" },
                                { type: "question" as const, questionNumber: 13, textBefore: "They may make movements suggesting", textAfter: "if disappointed when hunting.", correctAnswer: "frustration" },
                            ],
                        },
                    ],
                },
            ],
            questions: [
                // Q1-7: True/False/Not Given
                { questionNumber: 1, questionType: "true-false-not-given", questionText: "Polar bears suffer from various health problems due to the build-up of fat under their skin.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "FALSE", marks: 1 },
                { questionNumber: 2, questionType: "true-false-not-given", questionText: "The study done by Liu and his colleagues compared different groups of polar bears.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "FALSE", marks: 1 },
                { questionNumber: 3, questionType: "true-false-not-given", questionText: "Liu and colleagues were the first researchers to compare polar bears and brown bears genetically.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "NOT GIVEN", marks: 1 },
                { questionNumber: 4, questionType: "true-false-not-given", questionText: "Polar bears are able to control their levels of bad cholesterol by genetic means.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "TRUE", marks: 1 },
                { questionNumber: 5, questionType: "true-false-not-given", questionText: "Female polar bears are able to survive for about six months without food.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "TRUE", marks: 1 },
                { questionNumber: 6, questionType: "true-false-not-given", questionText: "It was found that the bones of female polar bears were very weak when they came out of their dens in spring.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "FALSE", marks: 1 },
                { questionNumber: 7, questionType: "true-false-not-given", questionText: "The polar bear's mechanism for increasing bone density could also be used by people one day.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "TRUE", marks: 1 },
                // Q8-13: Note Completion
                { questionNumber: 8, questionType: "note-completion", questionText: "People think of bears as unintelligent and __________", correctAnswer: "violent", acceptableAnswers: ["violent"], marks: 1, wordLimit: 1 },
                { questionNumber: 9, questionType: "note-completion", questionText: "a bear has been seen using a branch as a __________", correctAnswer: "tool", acceptableAnswers: ["tool"], marks: 1, wordLimit: 1 },
                { questionNumber: 10, questionType: "note-completion", questionText: "This allowed him to knock down some __________", correctAnswer: "meat", acceptableAnswers: ["meat"], marks: 1, wordLimit: 1 },
                { questionNumber: 11, questionType: "note-completion", questionText: "a method of reaching a platform where a __________ was located", correctAnswer: "photographer", acceptableAnswers: ["photographer"], marks: 1, wordLimit: 1 },
                { questionNumber: 12, questionType: "note-completion", questionText: "manipulation of objects and activity similar to a __________", correctAnswer: "game", acceptableAnswers: ["game"], marks: 1, wordLimit: 1 },
                { questionNumber: 13, questionType: "note-completion", questionText: "They may make movements suggesting __________ if disappointed", correctAnswer: "frustration", acceptableAnswers: ["frustration"], marks: 1, wordLimit: 1 },
            ],
        },
        // ═══════════════════════════════════════════
        // SECTION 2: The Step Pyramid of Djoser
        // ═══════════════════════════════════════════
        {
            sectionNumber: 2,
            title: "The Step Pyramid of Djoser",
            passage: `A.\nThe pyramids are the most famous monuments of ancient Egypt and still hold enormous interest for people in the present day. These grand, impressive tributes to the memory of the Egyptian kings have become linked with the country even though other cultures, such as the Chinese and Mayan, also built pyramids. The evolution of the pyramid form has been written and argued about for centuries. However, there is no question that, as far as Egypt is concerned, it began with one monument to one king designed by one brilliant architect: the Step Pyramid of Djoser at Saqqara.\n\nB.\nDjoser was the first king of the Third Dynasty of Egypt and the first to build in stone. Prior to Djoser's reign, tombs were rectangular monuments made of dried clay brick, which covered underground passages where the deceased person was buried. For reasons which remain unclear, Djoser's main official, whose name was Imhotep, conceived of building a taller, more impressive tomb for his king by stacking stone slabs on top of one another, progressively making them smaller, to form the shape now known as the Step Pyramid. Djoser is thought to have reigned for 19 years, but some historians and scholars attribute a much longer time for his rule, owing to the number and size of the monuments he built.\n\nC.\nThe Step Pyramid has been thoroughly examined and investigated over the last century, and it is now known that the building process went through many different stages. Historian Marc Van de Mieroop comments on this, writing 'Much experimentation was involved, which is especially clear in the construction of the pyramid in the center of the complex. It had several plans \u2026 before it became the first Step Pyramid in history, piling six levels on top of one another \u2026 The weight of the enormous mass was a challenge for the builders, who placed the stones at an inward incline in order to prevent the monument breaking up.'\n\nD.\nWhen finally completed, the Step Pyramid rose 62 meters high and was the tallest structure of its time. The complex in which it was built was the size of a city in ancient Egypt and included a temple, courtyards, shrines, and living quarters for the priests. It covered a region of 16 hectares and was surrounded by a wall 10.5 meters high. The wall had 13 false doors cut into it with only one true entrance cut into the south-east corner; the entire wall was then ringed by a trench 750 meters long and 40 meters wide. The false doors and the trench were incorporated into the complex to discourage unwanted visitors. If someone wished to enter, he or she would have needed to know in advance how to find the location of the true opening in the wall. Djoser was so proud of his accomplishment that he broke the tradition of having only his own name on the monument and had Imhotep's name carved on it as well.\n\nE.\nThe burial chamber of the tomb, where the king's body was laid to rest, was dug beneath the base of the pyramid, surrounded by a vast maze of long tunnels that had rooms off them to discourage robbers. One of the most mysterious discoveries found inside the pyramid was a large number of stone vessels. Over 40,000 of these vessels, of various forms and shapes, were discovered in storerooms of the pyramid's underground passages. They are inscribed with the names of rulers from the First and Second Dynasties of Egypt and made from different kinds of stone. There is no agreement among scholars and archaeologists on why the vessels were placed in the tomb of Djoser or what they were supposed to represent. The archaeologist Jean-Philippe Lauer, who excavated most of the pyramid and complex, believes they were originally stored and then given a 'proper burial' by Djoser in his pyramid to honor his predecessors. There are other historians, however, who claim the vessels were dumped into the shafts as yet another attempt to prevent grave robbers from getting to the king's burial chamber.\n\nF.\nUnfortunately, all of the precautions and intricate design of the underground network did not prevent ancient robbers from finding a way in. Djoser's grave goods, and even his body, were stolen at some point in the past and all archaeologists found were a small number of his valuables overlooked by the thieves. There was enough left throughout the pyramid and its complex, however, to astonish and amaze the archaeologists who excavated it.\n\nG.\nEgyptologist Miroslav Verner writes, 'Few monuments hold a place in human history as significant as that of the Step Pyramid in Saqqara \u2026 It can be said without exaggeration that this pyramid complex constitutes a milestone in the evolution of monumental stone architecture in Egypt and in the world as a whole.' The Step Pyramid was a revolutionary advance in architecture and became the archetype which all the other great pyramid builders of Egypt would follow.`,
            passageSource: "IELTS Practice Test",
            instructions: "Questions 14-26",
            questionGroups: [
                // Questions 14-20: Matching Headings
                {
                    groupType: "matching-headings",
                    startQuestion: 14,
                    endQuestion: 20,
                    mainInstruction: "The Reading Passage has seven paragraphs, A-G.",
                    subInstruction: "Choose the correct heading for paragraphs from the list of headings below.",
                    note: "Write the correct number, i-ix, in boxes on your answer sheet.",
                    featureListTitle: "List of Headings",
                    featureOptions: [
                        { letter: "i", text: "The areas and artefacts within the pyramid itself" },
                        { letter: "ii", text: "A difficult task for those involved" },
                        { letter: "iii", text: "A king who saved his people" },
                        { letter: "iv", text: "A single certainty among other less definite facts" },
                        { letter: "v", text: "An overview of the external buildings and areas" },
                        { letter: "vi", text: "A pyramid design that others copied" },
                        { letter: "vii", text: "An idea for changing the design of burial structures" },
                        { letter: "viii", text: "An incredible experience despite the few remains" },
                        { letter: "ix", text: "The answers to some unexpected questions" },
                    ],
                    paragraphOptions: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"],
                    matchingItems: [
                        { questionNumber: 14, text: "Paragraph A", correctAnswer: "iv" },
                        { questionNumber: 15, text: "Paragraph B", correctAnswer: "vii" },
                        { questionNumber: 16, text: "Paragraph C", correctAnswer: "ii" },
                        { questionNumber: 17, text: "Paragraph D", correctAnswer: "v" },
                        { questionNumber: 18, text: "Paragraph E", correctAnswer: "i" },
                        { questionNumber: 19, text: "Paragraph F", correctAnswer: "viii" },
                        { questionNumber: 20, text: "Paragraph G", correctAnswer: "vi" },
                    ],
                },
                // Questions 21-24: Note Completion
                {
                    groupType: "note-completion",
                    startQuestion: 21,
                    endQuestion: 24,
                    mainInstruction: "Complete the notes below.",
                    subInstruction: "Choose ONE WORD ONLY from the passage for each answer.",
                    mainHeading: "The Step Pyramid of Djoser",
                    passage: `The complex that includes the Step Pyramid and its surroundings is considered to be as big as an Egyptian 21 __________ of the past. The area outside the pyramid included accommodation that was occupied by 22 __________, along with many other buildings and features.\n\nA wall ran around the outside of the complex and a number of false entrances were built into this. In addition, a long 23 __________ encircled the wall. As a result, any visitors who had not been invited were cleverly prevented from entering the pyramid grounds unless they knew the 24 __________ of the real entrance.`,
                    notesSections: [
                        {
                            subHeading: "",
                            bullets: [
                                { type: "question" as const, questionNumber: 21, textBefore: "The complex is considered to be as big as an Egyptian", textAfter: "of the past.", correctAnswer: "city" },
                                { type: "question" as const, questionNumber: 22, textBefore: "The area outside the pyramid included accommodation that was occupied by", textAfter: ", along with many other buildings and features.", correctAnswer: "priests" },
                                { type: "question" as const, questionNumber: 23, textBefore: "In addition, a long", textAfter: "encircled the wall.", correctAnswer: "trench" },
                                { type: "question" as const, questionNumber: 24, textBefore: "any visitors who had not been invited were cleverly prevented from entering the pyramid grounds unless they knew the", textAfter: "of the real entrance.", correctAnswer: "location" },
                            ],
                        },
                    ],
                },
                // Questions 25-26: Choose Two Letters
                {
                    groupType: "choose-two-letters",
                    startQuestion: 25,
                    endQuestion: 26,
                    mainInstruction: "Choose TWO letters, A-E.",
                    questionSets: [
                        {
                            questionNumbers: [25, 26],
                            questionText: "Which TWO of the following points does the writer make about King Djoser?",
                            options: [
                                { letter: "A", text: "Initially he had to be persuaded to build in stone rather than clay." },
                                { letter: "B", text: "There is disagreement concerning the length of his reign." },
                                { letter: "C", text: "He failed to appreciate Imhotep's part in the design of the Step Pyramid." },
                                { letter: "D", text: "A few of his possessions were still in his tomb when archaeologists found it." },
                                { letter: "E", text: "He criticised the design and construction of other pyramids in Egypt." },
                            ],
                            correctAnswers: ["B", "D"],
                        },
                    ],
                },
            ],
            questions: [
                // Q14-20: Matching Headings
                { questionNumber: 14, questionType: "matching-headings", questionText: "Paragraph A", options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"], correctAnswer: "iv", marks: 1 },
                { questionNumber: 15, questionType: "matching-headings", questionText: "Paragraph B", options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"], correctAnswer: "vii", marks: 1 },
                { questionNumber: 16, questionType: "matching-headings", questionText: "Paragraph C", options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"], correctAnswer: "ii", marks: 1 },
                { questionNumber: 17, questionType: "matching-headings", questionText: "Paragraph D", options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"], correctAnswer: "v", marks: 1 },
                { questionNumber: 18, questionType: "matching-headings", questionText: "Paragraph E", options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"], correctAnswer: "i", marks: 1 },
                { questionNumber: 19, questionType: "matching-headings", questionText: "Paragraph F", options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"], correctAnswer: "viii", marks: 1 },
                { questionNumber: 20, questionType: "matching-headings", questionText: "Paragraph G", options: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"], correctAnswer: "vi", marks: 1 },
                // Q21-24: Note Completion
                { questionNumber: 21, questionType: "note-completion", questionText: "The complex is considered to be as big as an Egyptian __________ of the past.", correctAnswer: "city", acceptableAnswers: ["city"], marks: 1, wordLimit: 1 },
                { questionNumber: 22, questionType: "note-completion", questionText: "accommodation that was occupied by __________", correctAnswer: "priests", acceptableAnswers: ["priests"], marks: 1, wordLimit: 1 },
                { questionNumber: 23, questionType: "note-completion", questionText: "a long __________ encircled the wall", correctAnswer: "trench", acceptableAnswers: ["trench"], marks: 1, wordLimit: 1 },
                { questionNumber: 24, questionType: "note-completion", questionText: "unless they knew the __________ of the real entrance", correctAnswer: "location", acceptableAnswers: ["location"], marks: 1, wordLimit: 1 },
                // Q25-26: Choose Two Letters
                { questionNumber: 25, questionType: "choose-two-letters", questionText: "Which TWO points does the writer make about King Djoser?", correctAnswer: "B", marks: 1 },
                { questionNumber: 26, questionType: "choose-two-letters", questionText: "Which TWO points does the writer make about King Djoser?", correctAnswer: "D", marks: 1 },
            ],
        },
        // ═══════════════════════════════════════════
        // SECTION 3: The future of work
        // ═══════════════════════════════════════════
        {
            sectionNumber: 3,
            title: "The future of work",
            passage: `According to a leading business consultancy, 3\u201414% of the global workforce will need to switch to a different occupation within the next 10\u201415 years, and all workers will need to adapt as their occupations evolve alongside increasingly capable machines. Automation \u2014 or \u2018embodied artificial intelligence (AI)\u2019 \u2014 is one aspect of the disruptive effects of technology on the labour market. \u2018Disembodied AI\u2019, like the algorithms running in our smartphones, is another.\n\nDr Stella Pachidi from Cambridge Judge Business School believes that some of the most fundamental changes are happening as a result of the \u2018algorithmication\u2019 of jobs that are dependent on data rather than on production \u2014 the so-called knowledge economy. Algorithms are capable of learning from data to undertake tasks that previously needed human judgement, such as reading legal contracts, analysing medical scans and gathering market intelligence.\n\n\u2018In many cases, they can outperform humans,\u2019 says Pachidi. \u2018Organisations are attracted to using algorithms because they want to make choices based on what they consider is \u201cperfect information\u201d, as well as to reduce costs and enhance productivity.\u2019\n\n\u2018But these enhancements are not without consequences,\u2019 says Pachidi. \u2018If routine cognitive tasks are taken over by AI, how do professions develop their future experts?\u2019 she asks. \u2018One way of learning about a job is \u201clegitimate peripheral participation\u201d \u2014 a novice stands next to experts and learns by observation. If this isn\u2019t happening, then you need to find new ways to learn.\u2019\n\nAnother issue is the extent to which the technology influences or even controls the workforce. For over two years, Pachidi monitored a telecommunications company. \u2018The way telecoms salespeople work is through personal and frequent contact with clients, using the benefit of experience to assess a situation and reach a decision. However, the company had started using a[n] \u2026 algorithm that defined when account managers should contact certain customers about which kinds of campaigns and what to offer them.\u2019\n\nThe algorithm \u2014 usually built by external designers \u2014 often becomes the keeper of knowledge, she explains. In cases like this, Pachidi believes, a short-sighted view begins to creep into working practices whereby workers learn through the \u2018algorithm\u2019s eyes\u2019 and become dependent on its instructions. Alternative explorations \u2014 where experimentation and human instinct lead to progress and new ideas \u2014 are effectively discouraged.\n\nPachidi and colleagues even observed people developing strategies to make the algorithm work to their own advantage. \u2018We are seeing cases where workers feed the algorithm with false data to reach their targets,\u2019 she reports.\n\nIt\u2019s scenarios like these that many researchers are working to avoid. Their objective is to make AI technologies more trustworthy and transparent, so that organisations and individuals understand how AI decisions are made. In the meantime, says Pachidi, \u2018We need to make sure we fully understand the dilemmas that this new world raises regarding expertise, occupational boundaries and control.\u2019\n\nEconomist Professor Hamish Low believes that the future of work will involve major transitions across the whole life course for everyone: \u2018The traditional trajectory of full-time education followed by full-time work followed by a pensioned retirement is a thing of the past,\u2019 says Low. Instead, he envisages a multistage employment life: one where retraining happens across the life course, and where multiple jobs and no job happen by choice at different stages.\n\nOn the subject of job losses, Low believes the predictions are founded on a fallacy: \u2018It assumes that the number of jobs is fixed. If in 30 years, half of 100 jobs are being carried out by robots, that doesn\u2019t mean we are left with just 50 jobs for humans. The number of jobs will increase: we would expect there to be 150 jobs.\u2019\n\nDr Ewan McGaughey, at Cambridge\u2019s Centre for Business Research and King\u2019s College London, agrees that \u2018apocalyptic\u2019 views about the future of work are misguided. \u2018It\u2019s the laws that restrict the supply of capital to the job market, not the advent of new technologies that causes unemployment.\u2019\n\nHis recently published research answers the question of whether automation, AI and robotics will mean a \u2018jobless future\u2019 by looking at the causes of unemployment. \u2018History is clear that change can mean redundancies. But social policies can tackle this through retraining and redeployment.\u2019\n\nHe adds: \u2018If there is going to be change to jobs as a result of AI and robotics then I\u2019d like to see governments seizing the opportunity to improve policy to enforce good job security. We can \u201creprogramme\u201d the law to prepare for a fairer future of work and leisure.\u2019 McGaughey\u2019s findings are a call to arms to leaders of organisations, governments and banks to pre-empt the coming changes with bold new policies that guarantee full employment, fair incomes and a thriving economic democracy.\n\n\u2018The promises of these new technologies are astounding. They deliver humankind the capacity to live in a way that nobody could have once imagined,\u2019 he adds. \u2018Just as the industrial revolution brought people past subsistence agriculture, and the corporate revolution enabled mass production, a third revolution has been pronounced. But it will not only be one of technology. The next revolution will be social.\u2019`,
            passageSource: "IELTS Practice Test",
            instructions: "Questions 27-40",
            questionGroups: [
                // Questions 27-30: Multiple Choice Full
                {
                    groupType: "multiple-choice-full",
                    startQuestion: 27,
                    endQuestion: 30,
                    mainInstruction: "Choose the correct letter, A, B, C or D.",
                    subInstruction: "Write the correct letter in boxes on your answer sheet.",
                    mcQuestions: [
                        {
                            questionNumber: 27,
                            questionText: "The first paragraph tells us about",
                            options: [
                                { letter: "A", text: "the kinds of jobs that will be most affected by the growth of AI." },
                                { letter: "B", text: "the extent to which AI will alter the nature of the work that people do." },
                                { letter: "C", text: "the proportion of the world's labour force who will have jobs in AI in the future." },
                                { letter: "D", text: "the difference between ways that embodied and disembodied AI will impact on workers." },
                            ],
                            correctAnswer: "B",
                        },
                        {
                            questionNumber: 28,
                            questionText: "According to the second paragraph, what is Stella Pachidi's view of the 'knowledge economy'?",
                            options: [
                                { letter: "A", text: "It is having an influence on the number of jobs available." },
                                { letter: "B", text: "It is changing people's attitudes towards their occupations." },
                                { letter: "C", text: "It is the main reason why the production sector is declining." },
                                { letter: "D", text: "It is a key factor driving current developments in the workplace." },
                            ],
                            correctAnswer: "D",
                        },
                        {
                            questionNumber: 29,
                            questionText: "What did Pachidi observe at the telecommunications company?",
                            options: [
                                { letter: "A", text: "staff disagreeing with the recommendations of AI" },
                                { letter: "B", text: "staff feeling resentful about the intrusion of AI in their work" },
                                { letter: "C", text: "staff making sure that AI produces the results that they want" },
                                { letter: "D", text: "staff allowing AI to carry out tasks they ought to do themselves" },
                            ],
                            correctAnswer: "C",
                        },
                        {
                            questionNumber: 30,
                            questionText: "In his recently published research, Ewan McGaughey",
                            options: [
                                { letter: "A", text: "challenges the idea that redundancy is a negative thing." },
                                { letter: "B", text: "shows the profound effect of mass unemployment on society." },
                                { letter: "C", text: "highlights some differences between past and future job losses." },
                                { letter: "D", text: "illustrates how changes in the job market can be successfully handled." },
                            ],
                            correctAnswer: "D",
                        },
                    ],
                },
                // Questions 31-34: Summary with Options
                {
                    groupType: "summary-with-options",
                    startQuestion: 31,
                    endQuestion: 34,
                    mainInstruction: "Complete the summary using the list of words, A-G, below.",
                    subInstruction: "Write the correct letter, A-G, in boxes on your answer sheet.",
                    mainHeading: "The \u2018algorithmication\u2019 of jobs",
                    phraseList: [
                        { letter: "A", text: "pressure" },
                        { letter: "B", text: "satisfaction" },
                        { letter: "C", text: "intuition" },
                        { letter: "D", text: "promotion" },
                        { letter: "E", text: "reliance" },
                        { letter: "F", text: "confidence" },
                        { letter: "G", text: "information" },
                    ],
                    summarySegments: [
                        { type: "text" as const, content: "Stella Pachidi of Cambridge Judge Business School has been focusing on the \u2018algorithmication\u2019 of jobs which rely not on production but on" },
                        { type: "blank" as const, questionNumber: 31, correctAnswer: "G" },
                        { type: "text" as const, content: ". While monitoring a telecommunications company, Pachidi observed a growing" },
                        { type: "blank" as const, questionNumber: 32, correctAnswer: "E" },
                        { type: "text" as const, content: "on the recommendations made by AI, as workers begin to learn through the \u2018algorithm\u2019s eyes\u2019. Meanwhile, staff are deterred from experimenting and using their own" },
                        { type: "blank" as const, questionNumber: 33, correctAnswer: "C" },
                        { type: "text" as const, content: ", and are therefore prevented from achieving innovation. To avoid the kind of situations which Pachidi observed, researchers are trying to make AI\u2019s decision-making process easier to comprehend, and to increase users\u2019" },
                        { type: "blank" as const, questionNumber: 34, correctAnswer: "F" },
                        { type: "text" as const, content: "with regard to the technology." },
                    ],
                },
                // Questions 35-40: Matching Features
                {
                    groupType: "matching-features",
                    startQuestion: 35,
                    endQuestion: 40,
                    mainInstruction: "Look at the following statements and the list of people below.",
                    subInstruction: "Match each statement with the correct person, A, B or C.",
                    note: "NB You may use any letter more than once.",
                    featureListTitle: "List of people",
                    featureOptions: [
                        { letter: "A", text: "Stella Pachidi" },
                        { letter: "B", text: "Hamish Low" },
                        { letter: "C", text: "Ewan McGaughey" },
                    ],
                    paragraphOptions: ["A", "B", "C"],
                    matchingItems: [
                        { questionNumber: 35, text: "Greater levels of automation will not result in lower employment.", correctAnswer: "B" },
                        { questionNumber: 36, text: "There are several reasons why AI is appealing to businesses.", correctAnswer: "A" },
                        { questionNumber: 37, text: "AI's potential to transform people's lives has parallels with major cultural shifts which occurred in previous eras.", correctAnswer: "C" },
                        { questionNumber: 38, text: "It is important to be aware of the range of problems that AI causes.", correctAnswer: "A" },
                        { questionNumber: 39, text: "People are going to follow a less conventional career path than in the past.", correctAnswer: "B" },
                        { questionNumber: 40, text: "Authorities should take measures to ensure that there will be adequately paid work for everyone.", correctAnswer: "C" },
                    ],
                },
            ],
            questions: [
                // Q27-30: Multiple Choice Full
                { questionNumber: 27, questionType: "multiple-choice-full", questionText: "The first paragraph tells us about", correctAnswer: "B", marks: 1 },
                { questionNumber: 28, questionType: "multiple-choice-full", questionText: "What is Stella Pachidi's view of the 'knowledge economy'?", correctAnswer: "D", marks: 1 },
                { questionNumber: 29, questionType: "multiple-choice-full", questionText: "What did Pachidi observe at the telecommunications company?", correctAnswer: "C", marks: 1 },
                { questionNumber: 30, questionType: "multiple-choice-full", questionText: "In his recently published research, Ewan McGaughey", correctAnswer: "D", marks: 1 },
                // Q31-34: Summary with Options
                { questionNumber: 31, questionType: "summary-with-options", questionText: "jobs which rely not on production but on ___", correctAnswer: "G", marks: 1 },
                { questionNumber: 32, questionType: "summary-with-options", questionText: "Pachidi observed a growing ___ on the recommendations", correctAnswer: "E", marks: 1 },
                { questionNumber: 33, questionType: "summary-with-options", questionText: "staff are deterred from experimenting and using their own ___", correctAnswer: "C", marks: 1 },
                { questionNumber: 34, questionType: "summary-with-options", questionText: "to increase users' ___ with regard to the technology", correctAnswer: "F", marks: 1 },
                // Q35-40: Matching Features
                { questionNumber: 35, questionType: "matching-features", questionText: "Greater levels of automation will not result in lower employment.", correctAnswer: "B", marks: 1 },
                { questionNumber: 36, questionType: "matching-features", questionText: "There are several reasons why AI is appealing to businesses.", correctAnswer: "A", marks: 1 },
                { questionNumber: 37, questionType: "matching-features", questionText: "AI's potential to transform people's lives has parallels with major cultural shifts which occurred in previous eras.", correctAnswer: "C", marks: 1 },
                { questionNumber: 38, questionType: "matching-features", questionText: "It is important to be aware of the range of problems that AI causes.", correctAnswer: "A", marks: 1 },
                { questionNumber: 39, questionType: "matching-features", questionText: "People are going to follow a less conventional career path than in the past.", correctAnswer: "B", marks: 1 },
                { questionNumber: 40, questionType: "matching-features", questionText: "Authorities should take measures to ensure that there will be adequately paid work for everyone.", correctAnswer: "C", marks: 1 },
            ],
        },
    ],
};

async function seedTest() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("Connected to database");

        const existing = await ReadingTest.findOne({ testId: readingTest.testId });
        if (existing) {
            await ReadingTest.findByIdAndUpdate(existing._id, readingTest);
            console.log("✅ Reading Test 02 updated successfully!");
        } else {
            const admin = await User.findOne({ role: "admin" });
            if (!admin) {
                console.log("❌ Admin user not found. Please create an admin user first.");
                process.exit(1);
            }
            await ReadingTest.create({ ...readingTest, createdBy: admin._id });
            console.log("✅ Reading Test 02 created successfully!");
        }

        console.log(`
📝 Test Details:
   Title: ${readingTest.title}
   Test ID: ${readingTest.testId}
   Test Number: ${readingTest.testNumber}
   Total Questions: ${readingTest.totalQuestions}
   Sections:
     1. ${readingTest.sections[0].title} (Q1-13)
     2. ${readingTest.sections[1].title} (Q14-26)
     3. ${readingTest.sections[2].title} (Q27-40)
        `);

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

seedTest();
