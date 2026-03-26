import mongoose from "mongoose";
import { ReadingTest } from "../app/modules/reading/reading.model";
import { User } from "../app/modules/user/user.model";
import config from "../app/config";

const readingTest = {
    testId: "READING_TEST_03",
    testNumber: 3,
    title: "Reading Test 03",
    description: "IELTS Academic Reading Test featuring passages on the London underground railway, stadiums through history, and the hunt for King Charles II",
    source: "IELTS Practice Test",
    difficulty: "medium" as const,
    isActive: true,
    duration: 60,
    totalQuestions: 40,
    totalMarks: 40,
    sections: [
        // ═══════════════════════════════════════════
        // SECTION 1: The development of the London underground railway
        // Questions 1-13
        // ═══════════════════════════════════════════
        {
            sectionNumber: 1,
            title: "The development of the London underground railway",
            passage: `In the first half of the 1800s, London's population grew at an astonishing rate, and the central area became increasingly congested. In addition, the expansion of the overground railway network resulted in more and more passengers arriving in the capital. However, in 1846, a Royal Commission decided that the railways should not be allowed to enter the City, the capital's historic and business centre. The result was that the overground railway stations formed a ring around the City. The area within consisted of poorly built, overcrowded slums and the streets were full of horse-drawn traffic. Crossing the City became a nightmare. It could take an hour and a half to travel 8 km by horse-drawn carriage or bus. Numerous schemes were proposed to resolve these problems, but few succeeded.

Amongst the most vocal advocates for a solution to London's traffic problems was Charles Pearson, who worked as a solicitor for the City of London. He saw both social and economic advantages in building an underground railway that would link the overground railway stations together and clear London slums at the same time. His idea was to relocate the poor workers who lived in the inner-city slums to newly constructed suburbs, and to provide cheap rail travel for them to get to work. Pearson's ideas gained support amongst some businessmen and in 1851 he submitted a plan to Parliament. It was rejected, but coincided with a proposal from another group for an underground connecting line, which Parliament passed.

The two groups merged and established the Metropolitan Railway Company in August 1854. The company's plan was to construct an underground railway line from the Great Western Railway's (GWR) station at Paddington to the edge of the City at Farringdon Street \u2013 a distance of almost 5 km. The organisation had difficulty in raising the funding for such a radical and expensive scheme, not least because of the critical articles printed by the press. Objectors argued that the tunnels would collapse under the weight of traffic overhead, buildings would be shaken and passengers would be poisoned by the emissions from the train engines. However, Pearson and his partners persisted.

The GWR, aware that the new line would finally enable them to run trains into the heart of the City, invested almost \u00a3250,000 in the scheme. Eventually, over a five-year period, \u00a31m was raised. The chosen route ran beneath existing main roads to minimise the expense of demolishing buildings. Originally scheduled to be completed in 21 months, the construction of the underground line took three years. It was built just below street level using a technique known as \u2018cut and cover\u2019. A trench about ten metres wide and six metres deep was dug, and the sides temporarily held up with timber beams. Brick walls were then constructed, and finally a brick arch was added to create a tunnel. A two-metre-deep layer of soil was laid on top of the tunnel and the road above rebuilt.

The Metropolitan line, which opened on 10 January 1863, was the world's first underground railway. On its first day, almost 40,000 passengers were carried between Paddington and Farringdon, the journey taking about 18 minutes. By the end of the Metropolitan's first year of operation, 9.5 million journeys had been made.

Even as the Metropolitan began operation, the first extensions to the line were being authorised; these were built over the next five years, reaching Moorgate in the east of London and Hammersmith in the west. The original plan was to pull the trains with steam locomotives, using firebricks in the boilers to provide steam, but these engines were never introduced. Instead, the line used specially designed locomotives that were fitted with water tanks in which steam could be condensed. However, smoke and fumes remained a problem, even though ventilation shafts were added to the tunnels.

Despite the extension of the underground railway, by the 1880s, congestion on London's streets had become worse. The problem was partly that the existing underground lines formed a circuit around the centre of London and extended to the suburbs, but did not cross the capital's centre. The \u2018cut and cover\u2019 method of construction was not an option in this part of the capital. The only alternative was to tunnel deep underground.

Although the technology to create these tunnels existed, steam locomotives could not be used in such a confined space. It wasn't until the development of a reliable electric motor, and a means of transferring power from the generator to a moving train, that the world's first deep-level electric railway, the City & South London, became possible. The line opened in 1890, and ran from the City to Stockwell, south of the River Thames. The trains were made up of three carriages and driven by electric engines. The carriages were narrow and had tiny windows just below the roof because it was thought that passengers would not want to look out at the tunnel walls. The line was not without its problems, mainly caused by an unreliable power supply. Although the City & South London Railway was a great technical achievement, it did not make a profit. Then, in 1900, the Central London Railway, known as the \u2018Tuppenny Tube\u2019, began operation using new electric locomotives. It was very popular and soon afterwards new railways and extensions were added to the growing tube network. By 1907, the heart of today's Underground system was in place.`,
            passageSource: "IELTS Practice Test",
            instructions: "Questions 1-13",
            questionGroups: [
                // Questions 1-6: Note Completion
                {
                    groupType: "note-completion",
                    startQuestion: 1,
                    endQuestion: 6,
                    mainInstruction: "Complete the notes below.",
                    subInstruction: "Choose ONE WORD ONLY from the passage for each answer.",
                    mainHeading: "The London underground railway",
                    passage: `The problem

The 1 __________ of London increased rapidly between 1800 and 1850
The streets were full of horse-drawn vehicles

The proposed solution

Charles Pearson, a solicitor, suggested building an underground railway
Building the railway would make it possible to move people to better housing in the 2 __________
A number of 3 __________ agreed with Pearson's idea
The company initially had problems getting the 4 __________ needed for the project
Negative articles about the project appeared in the 5 __________

The construction

The chosen route did not require many buildings to be pulled down
The 'cut and cover' method was used to construct the tunnels
With the completion of the brick arch, the tunnel was covered with 6 __________`,
                    notesSections: [
                        {
                            subHeading: "The problem",
                            bullets: [
                                { type: "question" as const, questionNumber: 1, textBefore: "The", textAfter: "of London increased rapidly between 1800 and 1850", correctAnswer: "population" },
                            ],
                        },
                        {
                            subHeading: "The proposed solution",
                            bullets: [
                                { type: "question" as const, questionNumber: 2, textBefore: "Building the railway would make it possible to move people to better housing in the", textAfter: "", correctAnswer: "suburbs" },
                                { type: "question" as const, questionNumber: 3, textBefore: "A number of", textAfter: "agreed with Pearson's idea", correctAnswer: "businessmen" },
                                { type: "question" as const, questionNumber: 4, textBefore: "The company initially had problems getting the", textAfter: "needed for the project", correctAnswer: "funding" },
                                { type: "question" as const, questionNumber: 5, textBefore: "Negative articles about the project appeared in the", textAfter: "", correctAnswer: "press" },
                            ],
                        },
                        {
                            subHeading: "The construction",
                            bullets: [
                                { type: "question" as const, questionNumber: 6, textBefore: "With the completion of the brick arch, the tunnel was covered with", textAfter: "", correctAnswer: "soil" },
                            ],
                        },
                    ],
                },
                // Questions 7-13: True/False/Not Given
                {
                    groupType: "true-false-not-given",
                    startQuestion: 7,
                    endQuestion: 13,
                    mainInstruction: "Do the following statements agree with the information given in the passage?",
                    subInstruction: "In boxes on your answer sheet, write",
                    optionsExplanation: [
                        { option: "TRUE", explanation: "if the statement agrees with the information" },
                        { option: "FALSE", explanation: "if the statement contradicts the information" },
                        { option: "NOT GIVEN", explanation: "if there is no information on this" },
                    ],
                    statements: [
                        { questionNumber: 7, text: "Other countries had built underground railways before the Metropolitan line opened.", correctAnswer: "FALSE" },
                        { questionNumber: 8, text: "More people than predicted travelled on the Metropolitan line on the first day.", correctAnswer: "NOT GIVEN" },
                        { questionNumber: 9, text: "The use of ventilation shafts failed to prevent pollution in the tunnels.", correctAnswer: "TRUE" },
                        { questionNumber: 10, text: "A different approach from the 'cut and cover' technique was required in London's central area.", correctAnswer: "TRUE" },
                        { questionNumber: 11, text: "The windows on City & South London trains were at eye level.", correctAnswer: "FALSE" },
                        { questionNumber: 12, text: "The City & South London Railway was a financial success.", correctAnswer: "FALSE" },
                        { questionNumber: 13, text: "Trains on the 'Tuppenny Tube' nearly always ran on time.", correctAnswer: "NOT GIVEN" },
                    ],
                },
            ],
            questions: [
                // Q1-6: Note Completion
                { questionNumber: 1, questionType: "note-completion", questionText: "The __________ of London increased rapidly between 1800 and 1850", correctAnswer: "population", acceptableAnswers: ["population"], marks: 1, wordLimit: 1 },
                { questionNumber: 2, questionType: "note-completion", questionText: "move people to better housing in the __________", correctAnswer: "suburbs", acceptableAnswers: ["suburbs"], marks: 1, wordLimit: 1 },
                { questionNumber: 3, questionType: "note-completion", questionText: "A number of __________ agreed with Pearson's idea", correctAnswer: "businessmen", acceptableAnswers: ["businessmen"], marks: 1, wordLimit: 1 },
                { questionNumber: 4, questionType: "note-completion", questionText: "problems getting the __________ needed for the project", correctAnswer: "funding", acceptableAnswers: ["funding"], marks: 1, wordLimit: 1 },
                { questionNumber: 5, questionType: "note-completion", questionText: "Negative articles appeared in the __________", correctAnswer: "press", acceptableAnswers: ["press"], marks: 1, wordLimit: 1 },
                { questionNumber: 6, questionType: "note-completion", questionText: "the tunnel was covered with __________", correctAnswer: "soil", acceptableAnswers: ["soil"], marks: 1, wordLimit: 1 },
                // Q7-13: True/False/Not Given
                { questionNumber: 7, questionType: "true-false-not-given", questionText: "Other countries had built underground railways before the Metropolitan line opened.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "FALSE", marks: 1 },
                { questionNumber: 8, questionType: "true-false-not-given", questionText: "More people than predicted travelled on the Metropolitan line on the first day.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "NOT GIVEN", marks: 1 },
                { questionNumber: 9, questionType: "true-false-not-given", questionText: "The use of ventilation shafts failed to prevent pollution in the tunnels.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "TRUE", marks: 1 },
                { questionNumber: 10, questionType: "true-false-not-given", questionText: "A different approach from the 'cut and cover' technique was required in London's central area.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "TRUE", marks: 1 },
                { questionNumber: 11, questionType: "true-false-not-given", questionText: "The windows on City & South London trains were at eye level.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "FALSE", marks: 1 },
                { questionNumber: 12, questionType: "true-false-not-given", questionText: "The City & South London Railway was a financial success.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "FALSE", marks: 1 },
                { questionNumber: 13, questionType: "true-false-not-given", questionText: "Trains on the 'Tuppenny Tube' nearly always ran on time.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "NOT GIVEN", marks: 1 },
            ],
        },
        // ═══════════════════════════════════════════
        // SECTION 2: Stadiums: past, present and future
        // Questions 14-26
        // ═══════════════════════════════════════════
        {
            sectionNumber: 2,
            title: "Stadiums: past, present and future",
            passage: `A.\nStadiums are among the oldest forms of urban architecture: vast stadiums where the public could watch sporting events were at the centre of western city life as far back as the ancient Greek and Roman Empires, well before the construction of the great medieval cathedrals and the grand 19th- and 20th-century railway stations which dominated urban skylines in later eras.\n\nToday, however, stadiums are regarded with growing scepticism. Construction costs can soar above \u00a31 billion, and stadiums finished for major events such as the Olympic Games or the FIFA World Cup have notably fallen into disuse and disrepair.\n\nBut this need not be the case. History shows that stadiums can drive urban development and adapt to the culture of every age. Even today, architects and planners are finding new ways to adapt the mono-functional sports arenas which became emblematic of modernisation during the 20th century.\n\nB.\nThe amphitheatre of Arles in southwest France, with a capacity of 25,000 spectators, is perhaps the best example of just how versatile stadiums can be. Built by the Romans in 90 AD, it became a fortress with four towers after the fifth century, and was then transformed into a village containing more than 200 houses. With the growing interest in conservation during the 19th century, it was converted back into an arena for the staging of bullfights, thereby returning the structure to its original use as a venue for public spectacles.\n\nAnother example is the imposing arena of Verona in northern Italy, with space for 30,000 spectators, which was built 60 years before the Arles amphitheatre and 40 years before Rome's famous Colosseum. It has endured the centuries and is currently considered one of the world's prime sites for opera, thanks to its outstanding acoustics.\n\nC.\nThe area in the centre of the Italian town of Lucca, known as the Piazza dell'Anfiteatro, is yet another impressive example of an amphitheatre becoming absorbed into the fabric of the city. The site evolved in a similar way to Arles and was progressively filled with buildings from the Middle Ages until the 19th century, variously used as houses, a salt depot and a prison. But rather than reverting to an arena, it became a market square, designed by Romanticist architect Lorenzo Nottolini. Today, the ruins of the amphitheatre remain embedded in the various shops and residences surrounding the public square.\n\nD.\nThere are many similarities between modern stadiums and the ancient amphitheatres intended for games. But some of the flexibility was lost at the beginning of the 20th century, as stadiums were developed using new products such as steel and reinforced concrete, and made use of bright lights for night-time matches.\n\nMany such stadiums are situated in suburban areas, designed for sporting use only and surrounded by parking lots. These factors mean that they may not be as accessible to the general public, require more energy to run and contribute to urban heat.\n\nE.\nBut many of today's most innovative architects see scope for the stadium to help improve the city. Among the current strategies, two seem to be having particular success: the stadium as an urban hub, and as a power plant.\n\nThere's a growing trend for stadiums to be equipped with public spaces and services that serve a function beyond sport, such as hotels, retail outlets, conference centres, restaurants and bars, children's playgrounds and green space. Creating mixed-use developments such as this reinforces compactness and multi-functionality, making more efficient use of land and helping to regenerate urban spaces.\n\nThis opens the space up to families and a wider cross-section of society, instead of catering only to sportspeople and supporters. There have been many examples of this in the UK: the mixed-use facilities at Wembley and Old Trafford have become a blueprint for many other stadiums in the world.\n\nF.\nThe phenomenon of stadiums as power stations has arisen from the idea that energy problems can be overcome by integrating interconnected buildings by means of a smart grid, which is an electricity supply network that uses digital communications technology to detect and react to local changes in usage, without significant energy losses. Stadiums are ideal for these purposes, because their canopies have a large surface area for fitting photovoltaic panels and rise high enough (more than 40 metres) to make use of micro wind turbines.\n\nFreiburg Mage Solar Stadium in Germany is the first of a new wave of stadiums as power plants, which also includes the Amsterdam Arena and the Kaohsiung Stadium. The latter, inaugurated in 2009, has 8,844 photovoltaic panels producing up to 1.14 GWh of electricity annually. This reduces the annual output of carbon dioxide by 660 tons and supplies up to 80 percent of the surrounding area when the stadium is not in use. This is proof that a stadium can serve its city, and have a decidedly positive impact in terms of reduction of CO2 emissions.\n\nG.\nSporting arenas have always been central to the life and culture of cities. In every era, the stadium has acquired new value and uses: from military fortress to residential village, public space to theatre and most recently a field for experimentation in advanced engineering. The stadium of today now brings together multiple functions, thus helping cities to create a sustainable future.`,
            passageSource: "IELTS Practice Test",
            instructions: "Questions 14-26",
            questionGroups: [
                // Questions 14-17: Matching Information
                {
                    groupType: "matching-information",
                    startQuestion: 14,
                    endQuestion: 17,
                    mainInstruction: "The passage has seven paragraphs, A-G. Which section contains the following information?",
                    subInstruction: "NB You may use any letter more than once.",
                    featureListTitle: "Paragraphs",
                    featureOptions: [
                        { letter: "A", text: "Paragraph A" },
                        { letter: "B", text: "Paragraph B" },
                        { letter: "C", text: "Paragraph C" },
                        { letter: "D", text: "Paragraph D" },
                        { letter: "E", text: "Paragraph E" },
                        { letter: "F", text: "Paragraph F" },
                        { letter: "G", text: "Paragraph G" },
                    ],
                    paragraphOptions: ["A", "B", "C", "D", "E", "F", "G"],
                    matchingItems: [
                        { questionNumber: 14, text: "a mention of negative attitudes towards stadium building projects", correctAnswer: "A" },
                        { questionNumber: 15, text: "figures demonstrating the environmental benefits of a certain stadium", correctAnswer: "F" },
                        { questionNumber: 16, text: "examples of the wide range of facilities available at some new stadiums", correctAnswer: "E" },
                        { questionNumber: 17, text: "reference to the disadvantages of the stadiums built during a certain era", correctAnswer: "D" },
                    ],
                },
                // Questions 18-22: Note Completion (Summary Completion)
                {
                    groupType: "note-completion",
                    startQuestion: 18,
                    endQuestion: 22,
                    mainInstruction: "Complete the summary below.",
                    subInstruction: "Choose ONE WORD ONLY from the passage for each answer.",
                    mainHeading: "Roman amphitheatres",
                    passage: `The Roman stadium of Europe have proved very versatile. The amphitheatre of Arles, for example, was converted first into a 18 __________, then into a residential area and finally into an arena where spectators could watch 19 __________. Meanwhile, the arena in Verona, one of the oldest Roman amphitheatres, is famous today as a venue where 20 __________ is performed. The site of Lucca's amphitheatre has also been used for many purposes over the centuries, including the storage of 21 __________. It is now a market square with 22 __________ and homes incorporated into the remains of the Roman amphitheatre.`,
                    notesSections: [
                        {
                            subHeading: "",
                            bullets: [
                                { type: "question" as const, questionNumber: 18, textBefore: "The amphitheatre of Arles was converted first into a", textAfter: ", then into a residential area", correctAnswer: "fortress" },
                                { type: "question" as const, questionNumber: 19, textBefore: "finally into an arena where spectators could watch", textAfter: "", correctAnswer: "bullfights" },
                                { type: "question" as const, questionNumber: 20, textBefore: "the arena in Verona is famous today as a venue where", textAfter: "is performed", correctAnswer: "opera" },
                                { type: "question" as const, questionNumber: 21, textBefore: "Lucca's amphitheatre has also been used including the storage of", textAfter: "", correctAnswer: "salt" },
                                { type: "question" as const, questionNumber: 22, textBefore: "It is now a market square with", textAfter: "and homes incorporated into the remains", correctAnswer: "shops" },
                            ],
                        },
                    ],
                },
                // Questions 23-26: Choose Two Letters (2 sets)
                {
                    groupType: "choose-two-letters",
                    startQuestion: 23,
                    endQuestion: 26,
                    mainInstruction: "Choose TWO letters, A-E.",
                    questionSets: [
                        {
                            questionNumbers: [23, 24],
                            questionText: "When comparing twentieth-century stadiums to ancient amphitheatres in Section D, which TWO negative features does the writer mention?",
                            options: [
                                { letter: "A", text: "They are less imaginatively designed." },
                                { letter: "B", text: "They are less spacious." },
                                { letter: "C", text: "They are in less convenient locations." },
                                { letter: "D", text: "They are less versatile." },
                                { letter: "E", text: "They are made of less durable materials." },
                            ],
                            correctAnswers: ["C", "D"],
                        },
                        {
                            questionNumbers: [25, 26],
                            questionText: "Which TWO advantages of modern stadium design does the writer mention?",
                            options: [
                                { letter: "A", text: "offering improved amenities for the enjoyment of sports events" },
                                { letter: "B", text: "bringing community life back into the city environment" },
                                { letter: "C", text: "facilitating research into solar and wind energy solutions" },
                                { letter: "D", text: "enabling local residents to reduce their consumption of electricity" },
                                { letter: "E", text: "providing a suitable site for the installation of renewable power generators" },
                            ],
                            correctAnswers: ["B", "E"],
                        },
                    ],
                },
            ],
            questions: [
                // Q14-17: Matching Information
                { questionNumber: 14, questionType: "matching-information", questionText: "a mention of negative attitudes towards stadium building projects", options: ["A", "B", "C", "D", "E", "F", "G"], correctAnswer: "A", marks: 1 },
                { questionNumber: 15, questionType: "matching-information", questionText: "figures demonstrating the environmental benefits of a certain stadium", options: ["A", "B", "C", "D", "E", "F", "G"], correctAnswer: "F", marks: 1 },
                { questionNumber: 16, questionType: "matching-information", questionText: "examples of the wide range of facilities available at some new stadiums", options: ["A", "B", "C", "D", "E", "F", "G"], correctAnswer: "E", marks: 1 },
                { questionNumber: 17, questionType: "matching-information", questionText: "reference to the disadvantages of the stadiums built during a certain era", options: ["A", "B", "C", "D", "E", "F", "G"], correctAnswer: "D", marks: 1 },
                // Q18-22: Note Completion
                { questionNumber: 18, questionType: "note-completion", questionText: "The amphitheatre of Arles was converted first into a __________", correctAnswer: "fortress", acceptableAnswers: ["fortress"], marks: 1, wordLimit: 1 },
                { questionNumber: 19, questionType: "note-completion", questionText: "an arena where spectators could watch __________", correctAnswer: "bullfights", acceptableAnswers: ["bullfights"], marks: 1, wordLimit: 1 },
                { questionNumber: 20, questionType: "note-completion", questionText: "a venue where __________ is performed", correctAnswer: "opera", acceptableAnswers: ["opera"], marks: 1, wordLimit: 1 },
                { questionNumber: 21, questionType: "note-completion", questionText: "including the storage of __________", correctAnswer: "salt", acceptableAnswers: ["salt"], marks: 1, wordLimit: 1 },
                { questionNumber: 22, questionType: "note-completion", questionText: "a market square with __________ and homes", correctAnswer: "shops", acceptableAnswers: ["shops"], marks: 1, wordLimit: 1 },
                // Q23-26: Choose Two Letters
                { questionNumber: 23, questionType: "choose-two-letters", questionText: "Which TWO negative features does the writer mention about twentieth-century stadiums?", correctAnswer: "C", marks: 1 },
                { questionNumber: 24, questionType: "choose-two-letters", questionText: "Which TWO negative features does the writer mention about twentieth-century stadiums?", correctAnswer: "D", marks: 1 },
                { questionNumber: 25, questionType: "choose-two-letters", questionText: "Which TWO advantages of modern stadium design does the writer mention?", correctAnswer: "B", marks: 1 },
                { questionNumber: 26, questionType: "choose-two-letters", questionText: "Which TWO advantages of modern stadium design does the writer mention?", correctAnswer: "E", marks: 1 },
            ],
        },
        // ═══════════════════════════════════════════
        // SECTION 3: To catch a king
        // Questions 27-40
        // ═══════════════════════════════════════════
        {
            sectionNumber: 3,
            title: "To catch a king",
            passage: `Anna Keay reviews Charles Spencer\u2019s book about the hunt for King Charles II during the English Civil War of the seventeenth century

Charles Spencer\u2019s latest book, To Catch a King, tells us the story of the hunt for King Charles II in the six weeks after his resounding defeat at the Battle of Worcester in September 1651. And what a story it is. After his father was executed by the Parliamentarians in 1649, the young Charles II sacrificed one of the very principles his father had died for and did a deal with the Scots, thereby accepting Presbyterianism as the national religion in return for being crowned King of Scots. His arrival in Edinburgh prompted the English Parliamentary army to invade Scotland in a pre-emptive strike. This was followed by a Scottish invasion of England. The two sides finally faced one another at Worcester in the west of England in 1651. After being comprehensively defeated on the meadows outside the city by the Parliamentarian army, the 21-year-old king found himself the subject of a national manhunt, with a huge sum offered for his capture. Over the following six weeks he managed, through a series of heart-poundingly close escapes, to evade the Parliamentarians before seeking refuge in France. For the next nine years, the penniless and defeated Charles wandered around Europe with only a small group of loyal supporters.

Years later, after his restoration as king, the 50-year-old Charles II requested a meeting with the writer and diarist Samuel Pepys. His intention when asking Pepys to commit his story to paper was to ensure that this most extraordinary episode was never forgotten. Over two three-hour sittings, the king related to him in great detail his personal recollections of the six weeks he had spent as a fugitive. As the king and secretary settled down (a scene that is surely a gift for a future scriptwriter), Charles commenced his story: \u2018After the battle was so absolutely lost as to be beyond hope of recovery, I began to think of the best way of saving myself.\u2019

One of the joys of Spencer\u2019s book, a result not least of its use of Charles II\u2019s own narrative as well as those of his supporters, is just how close the reader gets to the action. The day-by-day retelling of the fugitives\u2019 doings provides delicious details: the cutting of the king\u2019s long hair with agricultural shears, the use of walnut leaves to dye his pale skin, and the day Charles spent lying on a branch of the great oak tree in Boscobel Wood as the Parliamentary soldiers scoured the forest floor below. Spencer draws out both the humour \u2013 such as the preposterous refusal of Charles\u2019s friend Henry Wilmot to adopt disguise on the grounds that it was beneath his dignity \u2013 and the emotional tension when the secret of the king\u2019s presence was cautiously revealed to his supporters.

Charles\u2019s adventures after losing the Battle of Worcester hide the uncomfortable truth that whilst almost everyone in England had been appalled by the execution of his father, they had not welcomed the arrival of his son with the Scots army, but had instead firmly bolted their doors. This was partly because he rode at the head of what looked like a foreign invasion force and partly because, after almost a decade of civil war, people were desperate to avoid it beginning again. This makes it all the more interesting that Charles II himself loved the story so much ever after. As well as retelling it to anyone who would listen, causing eye-rolling among courtiers, he set in train a series of initiatives to memorialise it. There was to be a new order of chivalry, the Knights of the Royal Oak. A series of enormous oil paintings depicting the episode were produced, including a two-metre-wide canvas of Boscobel Wood and a set of six similarly enormous paintings of the king on the run. In 1660, Charles II commissioned the artist John Michael Wright to paint a flying squadron of cherubs carrying an oak tree to the heavens on the ceiling of his bedchamber. It is hard to imagine many other kings marking the lowest point in their life so enthusiastically, or indeed pulling off such an escape in the first place.

Charles Spencer is the perfect person to pass the story on to a new generation. His pacey, readable prose steers deftly clear of modern idioms and elegantly brings to life the details of the great tale. He has even-handed sympathy for both the fugitive king and the fierce republican regime that hunted him, and he succeeds in his desire to explore far more of the background of the story than previous books on the subject have done. Indeed, the opening third of the book is about how Charles II found himself at Worcester in the first place, which for some will be reason alone to read To Catch a King.

The tantalising question left, in the end, is that of what it all meant. Would Charles II have been a different king had these six weeks never happened? The days and nights spent in hiding must have affected him in some way. Did the need to assume disguises, to survive on wit and charm alone, to use trickery and subterfuge to escape from tight corners help form him? This is the one area where the book doesn\u2019t quite hit the mark. Instead its depiction of Charles II in his final years as an ineffective, pleasure-loving monarch doesn\u2019t do justice to the man (neither is it accurate), or to the complexity of his character. But this one niggle aside, To Catch a King is an excellent read, and those who come to it knowing little of the famous tale will find they have a treat in store.`,
            passageSource: "IELTS Practice Test",
            instructions: "Questions 27-40",
            questionGroups: [
                // Questions 27-31: Summary with Options
                {
                    groupType: "summary-with-options",
                    startQuestion: 27,
                    endQuestion: 31,
                    mainInstruction: "Complete the summary using the list of phrases, A-J, below.",
                    subInstruction: "Write the correct letter, A-J, in boxes on your answer sheet.",
                    mainHeading: "The story behind the hunt for Charles II",
                    phraseList: [
                        { letter: "A", text: "military innovation" },
                        { letter: "B", text: "large reward" },
                        { letter: "C", text: "widespread conspiracy" },
                        { letter: "D", text: "relative safety" },
                        { letter: "E", text: "new government" },
                        { letter: "F", text: "decisive victory" },
                        { letter: "G", text: "political debate" },
                        { letter: "H", text: "strategic alliance" },
                        { letter: "I", text: "popular solution" },
                        { letter: "J", text: "religious conviction" },
                    ],
                    summarySegments: [
                        { type: "text" as const, content: "Charles II\u2019s father was executed by the Parliamentarian forces in 1649. Charles II then formed a" },
                        { type: "blank" as const, questionNumber: 27, correctAnswer: "H" },
                        { type: "text" as const, content: "with the Scots, and in order to become King of Scots, he abandoned an important" },
                        { type: "blank" as const, questionNumber: 28, correctAnswer: "J" },
                        { type: "text" as const, content: "that was held by his father and had contributed to his father\u2019s death. The opposing sides then met outside Worcester in 1651. The battle led to a" },
                        { type: "blank" as const, questionNumber: 29, correctAnswer: "F" },
                        { type: "text" as const, content: "for the Parliamentarians and Charles had to flee for his life. A" },
                        { type: "blank" as const, questionNumber: 30, correctAnswer: "B" },
                        { type: "text" as const, content: "was offered for Charles\u2019s capture, but after six weeks spent in hiding, he eventually managed to reach the" },
                        { type: "blank" as const, questionNumber: 31, correctAnswer: "D" },
                        { type: "text" as const, content: "of continental Europe." },
                    ],
                },
                // Questions 32-35: Yes/No/Not Given
                {
                    groupType: "yes-no-not-given",
                    startQuestion: 32,
                    endQuestion: 35,
                    mainInstruction: "Do the following statements agree with the claims of the writer in the passage?",
                    subInstruction: "In boxes on your answer sheet, write",
                    optionsExplanation: [
                        { option: "YES", explanation: "if the statement agrees with the claims of the writer" },
                        { option: "NO", explanation: "if the statement contradicts the claims of the writer" },
                        { option: "NOT GIVEN", explanation: "if it is impossible to say what the writer thinks about this" },
                    ],
                    statements: [
                        { questionNumber: 32, text: "Charles chose Pepys for the task because he considered him to be trustworthy.", correctAnswer: "NOT GIVEN" },
                        { questionNumber: 33, text: "Charles\u2019s personal recollection of the escape lacked sufficient detail.", correctAnswer: "NO" },
                        { questionNumber: 34, text: "Charles indicated to Pepys that he had planned his escape before the battle.", correctAnswer: "NO" },
                        { questionNumber: 35, text: "The inclusion of Charles\u2019s account is a positive aspect of the book.", correctAnswer: "YES" },
                    ],
                },
                // Questions 36-40: Multiple Choice Full
                {
                    groupType: "multiple-choice-full",
                    startQuestion: 36,
                    endQuestion: 40,
                    mainInstruction: "Choose the correct letter, A, B, C or D.",
                    subInstruction: "Write the correct letter in boxes on your answer sheet.",
                    mcQuestions: [
                        {
                            questionNumber: 36,
                            questionText: "What is the reviewer\u2019s main purpose in the first paragraph?",
                            options: [
                                { letter: "A", text: "to describe what happened during the Battle of Worcester" },
                                { letter: "B", text: "to give an account of the circumstances leading to Charles II\u2019s escape" },
                                { letter: "C", text: "to provide details of the Parliamentarians\u2019 political views" },
                                { letter: "D", text: "to compare Charles II\u2019s beliefs with those of his father" },
                            ],
                            correctAnswer: "B",
                        },
                        {
                            questionNumber: 37,
                            questionText: "Why does the reviewer include examples of the fugitives\u2019 behaviour in the third paragraph?",
                            options: [
                                { letter: "A", text: "to explain how close Charles II came to losing his life" },
                                { letter: "B", text: "to suggest that Charles II\u2019s supporters were badly prepared" },
                                { letter: "C", text: "to illustrate how the events of the six weeks are brought to life" },
                                { letter: "D", text: "to argue that certain aspects are not as well known as they should be" },
                            ],
                            correctAnswer: "C",
                        },
                        {
                            questionNumber: 38,
                            questionText: "What point does the reviewer make about Charles II in the fourth paragraph?",
                            options: [
                                { letter: "A", text: "He chose to celebrate what was essentially a defeat." },
                                { letter: "B", text: "He misunderstood the motives of his opponents." },
                                { letter: "C", text: "He aimed to restore people\u2019s faith in the monarchy." },
                                { letter: "D", text: "He was driven by a desire to be popular." },
                            ],
                            correctAnswer: "A",
                        },
                        {
                            questionNumber: 39,
                            questionText: "What does the reviewer say about Charles Spencer in the fifth paragraph?",
                            options: [
                                { letter: "A", text: "His decision to write the book comes as a surprise." },
                                { letter: "B", text: "He takes an unbiased approach to the subject matter." },
                                { letter: "C", text: "His descriptions of events would be better if they included more detail." },
                                { letter: "D", text: "He chooses language that is suitable for a twenty-first-century audience." },
                            ],
                            correctAnswer: "B",
                        },
                        {
                            questionNumber: 40,
                            questionText: "When the reviewer says the book \u2018doesn\u2019t quite hit the mark\u2019, she is making the point that",
                            options: [
                                { letter: "A", text: "it overlooks the impact of events on ordinary people." },
                                { letter: "B", text: "it lacks an analysis of prevalent views on monarchy." },
                                { letter: "C", text: "it omits any references to the deceit practised by Charles II during his time in hiding." },
                                { letter: "D", text: "it fails to address whether Charles II\u2019s experiences had a lasting influence on him." },
                            ],
                            correctAnswer: "D",
                        },
                    ],
                },
            ],
            questions: [
                // Q27-31: Summary with Options
                { questionNumber: 27, questionType: "summary-with-options", questionText: "Charles II then formed a ___ with the Scots", correctAnswer: "H", marks: 1 },
                { questionNumber: 28, questionType: "summary-with-options", questionText: "he abandoned an important ___ that was held by his father", correctAnswer: "J", marks: 1 },
                { questionNumber: 29, questionType: "summary-with-options", questionText: "The battle led to a ___ for the Parliamentarians", correctAnswer: "F", marks: 1 },
                { questionNumber: 30, questionType: "summary-with-options", questionText: "A ___ was offered for Charles's capture", correctAnswer: "B", marks: 1 },
                { questionNumber: 31, questionType: "summary-with-options", questionText: "he eventually managed to reach the ___ of continental Europe", correctAnswer: "D", marks: 1 },
                // Q32-35: Yes/No/Not Given
                { questionNumber: 32, questionType: "yes-no-not-given", questionText: "Charles chose Pepys for the task because he considered him to be trustworthy.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: "NOT GIVEN", marks: 1 },
                { questionNumber: 33, questionType: "yes-no-not-given", questionText: "Charles\u2019s personal recollection of the escape lacked sufficient detail.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: "NO", marks: 1 },
                { questionNumber: 34, questionType: "yes-no-not-given", questionText: "Charles indicated to Pepys that he had planned his escape before the battle.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: "NO", marks: 1 },
                { questionNumber: 35, questionType: "yes-no-not-given", questionText: "The inclusion of Charles\u2019s account is a positive aspect of the book.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: "YES", marks: 1 },
                // Q36-40: Multiple Choice Full
                { questionNumber: 36, questionType: "multiple-choice-full", questionText: "What is the reviewer\u2019s main purpose in the first paragraph?", correctAnswer: "B", marks: 1 },
                { questionNumber: 37, questionType: "multiple-choice-full", questionText: "Why does the reviewer include examples of the fugitives\u2019 behaviour in the third paragraph?", correctAnswer: "C", marks: 1 },
                { questionNumber: 38, questionType: "multiple-choice-full", questionText: "What point does the reviewer make about Charles II in the fourth paragraph?", correctAnswer: "A", marks: 1 },
                { questionNumber: 39, questionType: "multiple-choice-full", questionText: "What does the reviewer say about Charles Spencer in the fifth paragraph?", correctAnswer: "B", marks: 1 },
                { questionNumber: 40, questionType: "multiple-choice-full", questionText: "When the reviewer says the book 'doesn't quite hit the mark', she is making the point that", correctAnswer: "D", marks: 1 },
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
            console.log("✅ Reading Test 03 updated successfully!");
        } else {
            const admin = await User.findOne({ role: "admin" });
            if (!admin) {
                console.log("❌ Admin user not found. Please create an admin user first.");
                process.exit(1);
            }
            await ReadingTest.create({ ...readingTest, createdBy: admin._id });
            console.log("✅ Reading Test 03 created successfully!");
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
