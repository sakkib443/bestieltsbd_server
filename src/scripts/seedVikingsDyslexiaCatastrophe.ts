import mongoose from "mongoose";
import { ReadingTest } from "../app/modules/reading/reading.model";
import { User } from "../app/modules/user/user.model";
import config from "../app/config";

const readingTest = {
    testId: "READING_VIKINGS_DYSLEXIA_CATASTROPHE",
    testNumber: 1801,
    title: "IELTS Academic Reading Test - Vikings, Dyslexia & Catastrophe Theory",
    description: "IELTS Academic Reading Test featuring passages on The Vikings' Wayfaring Ways, Dyslexia, and Catastrophe Theory",
    source: "IELTS Practice Test",
    difficulty: "medium" as const,
    isActive: true,
    duration: 60,
    totalQuestions: 40,
    totalMarks: 40,
    sections: [
        // ═══════════════════════════════════════════
        // SECTION 1: The Vikings' Wayfaring Ways
        // ═══════════════════════════════════════════
        {
            sectionNumber: 1,
            title: "The Vikings' Wayfaring Ways",
            passage: `A. Perhaps best known as fierce warriors, the Vikings were also the most far-ranging of peoples. In fact, the term Viking, in Old Norse, means "to go on an expedition." From the late 700s until the eleventh century, Viking explorers journeyed from their native Norway, Denmark, and Sweden to many distant lands. They travelled as far west as Newfoundland in present-day Canada, and as far east as Baghdad.

B. Those from Norway sailed west to the British Isles, and eventually across the Atlantic Ocean. During their first expedition, in 793, a force of Viking warriors sacked the famed abbey at Lindisfarne, on England's northeast coast. In the 800s, groups of raiders went on to occupy the Shetland Islands, north of the British Isles and west of Norway, and the Orkney Islands off northern Scotland.

C. By 870, the Vikings were settling Iceland. In 980, an Icelandic assembly found a man named Eric "the Red" Ericson guilty of murder and sent him into exile. Eric the Red responded by sailing to a large island to the west, which he called "Greenland." An Icelandic saga mentions that people would be attracted to go to Greenland if it had a favourable name. Around 998, Eric the Red's son, Leif "the Lucky" Ericson, and a small Viking fleet sailed west to North America. There they established the first European settlement in the New World, called "Vinland."

D. Vikings from Denmark, meanwhile, ravaged large swaths of England and France. In 866, a Viking "Great Army" landed in England, occupying much of the country's north and east. They forced the English king to acknowledge their control of much of England under the so-called Danelaw. To the west, they conquered coastal portions of Ireland, and in 841 founded Dublin, today a major Irish city, but originally a Viking fort. The Vikings remained a major power in Ireland until the early eleventh century.

E. To the south, the Vikings conquered France, moving swiftly up rivers in longboats, powered by oar and sail. From 845 to 886, they surged up the Seine to attack Paris three times. To stop the raids, French King Charles III the Simple in 911 offered the Viking chief Rollo territories in northwest France, called Normandy, after the Normans or "Northmen." There they set up a powerful kingdom and, in 1066, under William, Duke of Normandy defeated King Harold at the battle of Hastings in England.

F. Farther south, in 844, the Vikings had raided Portugal and Spain, then largely controlled by Arab Moors. A fleet of 100 Viking ships seized Lisbon and boldly sailed up the Guadalquivir River to occupy Seville. However, the Moors dealt them a rare defeat. The Moors catapulted flaming projectiles onto the Viking vessels, forcing a retreat.

G. Still other Vikings sailed much farther, to raid Morocco, then to the eastern Mediterranean and beyond. Many of these Vikings enlisted with the military forces of the Byzantine Empire, the Greek speaking successors to the Roman Empire. Vikings made up the Byzantine Emperor's elite Varangian Guard. In 902, hundreds of Varangians served as marines during a Byzantine naval assault on the island of Crete. Varangians battled Arab forces in Syria in 955, and even fought in Jerusalem. So many men left Scandinavia for the Byzantine Empire that, to stem the outflow, Sweden passed a law denying inherited property to anyone serving under the Byzantines.

H. The Vikings of Sweden, meanwhile, were moving out of Scandinavia to the east and south. They journeyed through the Baltic Sea, then built inland trading posts in Germany and Poland. In time, they struck out across Central and Eastern Europe, down the Vistula River in Poland, and the Dnieper, Volga, and Don Rivers in Russia. Their vessel of choice was the "knar," a cargo ship with a deep draft and wide hull. Viking merchants on horseback penetrated far into the Asian heartland, trading with towns on the Caspian and Black seas.

I. The most significant settlements were in Russia and Ukraine. In 862, Vikings settled in the town of Novgorod, in northwestern Russia. It became the capital of a country called Rus, after the Finnish name for the Swedes. Rus came from the word Rutosi, meaning "rowers." Rus formed the foundation of Russia, as the Russian and Viking leaders of Rus intermarried, converted to Christianity, and steadily expanded their territory. And after lucrative trade relations were established with the Byzantines and with Muslim lands, the Rus moved their capital southward to Kiev, later the capital of Ukraine.

J. Another important Viking market town was Bulgar, on the Volga River. There, merchants peddled honey, wax, amber, and steel swords. The Viking's most common commodity may have been skins: they dealt in horse, beaver, rabbit, mink, ermine, and sable skins. They also traded hazelnuts, fish, cattle, and falcons. Another commodity was slaves, many of them Slavs from Eastern Europe. The merchants eagerly exchanged their goods for Arab silver coins. In Sweden, archeologists have excavated about 100,000 such coins, minted in such distant cities as Cairo and Tashkent.

K. Like their Danish and Norwegian relatives, the Swedish Vikings travelled to the most exotic realms. They took part in the Silk Road trade with India and China. Archeological evidence shows that Viking traders even travelled by camel caravan to Baghdad.

L. Given the wide-ranging travel of the Vikings, it is fitting that the Anglo Saxons gave them the nickname "Faergenga"- "Far Going."`,
            passageSource: "IELTS Practice Test",
            paragraphs: [
                { label: "A", text: `Perhaps best known as fierce warriors, the Vikings were also the most far-ranging of peoples. In fact, the term Viking, in Old Norse, means "to go on an expedition." From the late 700s until the eleventh century, Viking explorers journeyed from their native Norway, Denmark, and Sweden to many distant lands. They travelled as far west as Newfoundland in present-day Canada, and as far east as Baghdad.` },
                { label: "B", text: `Those from Norway sailed west to the British Isles, and eventually across the Atlantic Ocean. During their first expedition, in 793, a force of Viking warriors sacked the famed abbey at Lindisfarne, on England's northeast coast. In the 800s, groups of raiders went on to occupy the Shetland Islands, north of the British Isles and west of Norway, and the Orkney Islands off northern Scotland.` },
                { label: "C", text: `By 870, the Vikings were settling Iceland. In 980, an Icelandic assembly found a man named Eric "the Red" Ericson guilty of murder and sent him into exile. Eric the Red responded by sailing to a large island to the west, which he called "Greenland." An Icelandic saga mentions that people would be attracted to go to Greenland if it had a favourable name. Around 998, Eric the Red's son, Leif "the Lucky" Ericson, and a small Viking fleet sailed west to North America. There they established the first European settlement in the New World, called "Vinland."` },
                { label: "D", text: `Vikings from Denmark, meanwhile, ravaged large swaths of England and France. In 866, a Viking "Great Army" landed in England, occupying much of the country's north and east. They forced the English king to acknowledge their control of much of England under the so-called Danelaw. To the west, they conquered coastal portions of Ireland, and in 841 founded Dublin, today a major Irish city, but originally a Viking fort. The Vikings remained a major power in Ireland until the early eleventh century.` },
                { label: "E", text: `To the south, the Vikings conquered France, moving swiftly up rivers in longboats, powered by oar and sail. From 845 to 886, they surged up the Seine to attack Paris three times. To stop the raids, French King Charles III the Simple in 911 offered the Viking chief Rollo territories in northwest France, called Normandy, after the Normans or "Northmen." There they set up a powerful kingdom and, in 1066, under William, Duke of Normandy defeated King Harold at the battle of Hastings in England.` },
                { label: "F", text: `Farther south, in 844, the Vikings had raided Portugal and Spain, then largely controlled by Arab Moors. A fleet of 100 Viking ships seized Lisbon and boldly sailed up the Guadalquivir River to occupy Seville. However, the Moors dealt them a rare defeat. The Moors catapulted flaming projectiles onto the Viking vessels, forcing a retreat.` },
                { label: "G", text: `Still other Vikings sailed much farther, to raid Morocco, then to the eastern Mediterranean and beyond. Many of these Vikings enlisted with the military forces of the Byzantine Empire, the Greek speaking successors to the Roman Empire. Vikings made up the Byzantine Emperor's elite Varangian Guard. In 902, hundreds of Varangians served as marines during a Byzantine naval assault on the island of Crete. Varangians battled Arab forces in Syria in 955, and even fought in Jerusalem. So many men left Scandinavia for the Byzantine Empire that, to stem the outflow, Sweden passed a law denying inherited property to anyone serving under the Byzantines.` },
                { label: "H", text: `The Vikings of Sweden, meanwhile, were moving out of Scandinavia to the east and south. They journeyed through the Baltic Sea, then built inland trading posts in Germany and Poland. In time, they struck out across Central and Eastern Europe, down the Vistula River in Poland, and the Dnieper, Volga, and Don Rivers in Russia. Their vessel of choice was the "knar," a cargo ship with a deep draft and wide hull. Viking merchants on horseback penetrated far into the Asian heartland, trading with towns on the Caspian and Black seas.` },
                { label: "I", text: `The most significant settlements were in Russia and Ukraine. In 862, Vikings settled in the town of Novgorod, in northwestern Russia. It became the capital of a country called Rus, after the Finnish name for the Swedes. Rus came from the word Rutosi, meaning "rowers." Rus formed the foundation of Russia, as the Russian and Viking leaders of Rus intermarried, converted to Christianity, and steadily expanded their territory. And after lucrative trade relations were established with the Byzantines and with Muslim lands, the Rus moved their capital southward to Kiev, later the capital of Ukraine.` },
                { label: "J", text: `Another important Viking market town was Bulgar, on the Volga River. There, merchants peddled honey, wax, amber, and steel swords. The Viking's most common commodity may have been skins: they dealt in horse, beaver, rabbit, mink, ermine, and sable skins. They also traded hazelnuts, fish, cattle, and falcons. Another commodity was slaves, many of them Slavs from Eastern Europe. The merchants eagerly exchanged their goods for Arab silver coins. In Sweden, archeologists have excavated about 100,000 such coins, minted in such distant cities as Cairo and Tashkent.` },
                { label: "K", text: `Like their Danish and Norwegian relatives, the Swedish Vikings travelled to the most exotic realms. They took part in the Silk Road trade with India and China. Archeological evidence shows that Viking traders even travelled by camel caravan to Baghdad.` },
                { label: "L", text: `Given the wide-ranging travel of the Vikings, it is fitting that the Anglo Saxons gave them the nickname "Faergenga"- "Far Going."` },
            ],
            instructions: "Questions 1-13",
            questionGroups: [
                // Questions 1-5: Short Answer (ONE NUMBER ONLY)
                {
                    groupType: "short-answer",
                    startQuestion: 1,
                    endQuestion: 5,
                    mainInstruction: "Answer the questions below.",
                    subInstruction: "Choose ONE NUMBER ONLY from the text for each answer.",
                    statements: [
                        { questionNumber: 1, text: "When did Viking warriors raid an abbey on the coast of England?", correctAnswer: "793" },
                        { questionNumber: 2, text: "When was Eric the Red convicted of a crime?", correctAnswer: "980" },
                        { questionNumber: 3, text: "When did Vikings establish a fort in Ireland?", correctAnswer: "841" },
                        { questionNumber: 4, text: "When was a Viking chief granted lands by a king of France?", correctAnswer: "911" },
                        { questionNumber: 5, text: "When did Viking warriors defeat an English king?", correctAnswer: "1066" },
                    ],
                },
                // Questions 6-13: Summary with Options (A-O)
                {
                    groupType: "summary-with-options",
                    startQuestion: 6,
                    endQuestion: 13,
                    mainInstruction: "Complete the summary using the list of words, A-O, below.",
                    subInstruction: "Write the correct letter, A-O, on lines 6-13 on your answer sheet.",
                    phraseList: [
                        { letter: "A", text: "warriors" },
                        { letter: "B", text: "an attack" },
                        { letter: "C", text: "capital" },
                        { letter: "D", text: "explorers" },
                        { letter: "E", text: "trade with" },
                        { letter: "F", text: "conquered" },
                        { letter: "G", text: "burning objects" },
                        { letter: "H", text: "settled in" },
                        { letter: "I", text: "ship oars" },
                        { letter: "K", text: "market" },
                        { letter: "L", text: "a parade" },
                        { letter: "M", text: "archeologists" },
                        { letter: "N", text: "silver coins" },
                        { letter: "O", text: "horse" },
                    ],
                    summarySegments: [
                        { type: "text", content: "The people known as Vikings were given this name because" },
                        { type: "blank", questionNumber: 6, correctAnswer: "D" },
                        { type: "text", content: "Groups of Vikings from Norway travelled west to Britain, Iceland, and beyond. They were the first Europeans who" },
                        { type: "blank", questionNumber: 7, correctAnswer: "H" },
                        { type: "text", content: "North America. Groups from Denmark cover large areas of England and France. Other" },
                        { type: "blank", questionNumber: 8, correctAnswer: "A" },
                        { type: "text", content: "groups of Vikings raided areas of Portugal and Spain. The people of Seville, Spain, drove the Vikings away by throwing" },
                        { type: "blank", questionNumber: 9, correctAnswer: "G" },
                        { type: "text", content: "at them. Large numbers of Vikings left Scandinavia for the Byzantine Empire, and many of these joined the Byzantine military. At one point, they took part in" },
                        { type: "blank", questionNumber: 10, correctAnswer: "B" },
                        { type: "text", content: "on the Greek island of Crete. Groups of Swedish Vikings crossed the Baltic Sea to explore the lands beyond. They travelled down Russian rivers, then journeyed deep into Asia by" },
                        { type: "blank", questionNumber: 11, correctAnswer: "O" },
                        { type: "text", content: ". After settling in northwest Russia, they expanded their territories toward the south. Kiev, Ukraine, eventually became the Vikings' territorial" },
                        { type: "blank", questionNumber: 12, correctAnswer: "C" },
                        { type: "text", content: ". The Vikings also had an important" },
                        { type: "blank", questionNumber: 13, correctAnswer: "K" },
                        { type: "text", content: "in the town of Bulgar on the Volga River." },
                    ],
                },
            ],
            questions: [
                // Q1-5: Short answer
                { questionNumber: 1, questionType: "short-answer", questionText: "When did Viking warriors raid an abbey on the coast of England?", correctAnswer: "793", marks: 1, wordLimit: 1 },
                { questionNumber: 2, questionType: "short-answer", questionText: "When was Eric the Red convicted of a crime?", correctAnswer: "980", marks: 1, wordLimit: 1 },
                { questionNumber: 3, questionType: "short-answer", questionText: "When did Vikings establish a fort in Ireland?", correctAnswer: "841", marks: 1, wordLimit: 1 },
                { questionNumber: 4, questionType: "short-answer", questionText: "When was a Viking chief granted lands by a king of France?", correctAnswer: "911", marks: 1, wordLimit: 1 },
                { questionNumber: 5, questionType: "short-answer", questionText: "When did Viking warriors defeat an English king?", correctAnswer: "1066", marks: 1, wordLimit: 1 },
                // Q6-13: Summary with options
                { questionNumber: 6, questionType: "summary-with-options", questionText: "The people known as Vikings were given this name because _______", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O"], correctAnswer: "D", marks: 1 },
                { questionNumber: 7, questionType: "summary-with-options", questionText: "They were the first Europeans who _______ North America.", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O"], correctAnswer: "H", marks: 1 },
                { questionNumber: 8, questionType: "summary-with-options", questionText: "Other _______ groups of Vikings raided areas of Portugal and Spain.", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O"], correctAnswer: "A", marks: 1 },
                { questionNumber: 9, questionType: "summary-with-options", questionText: "The people of Seville, Spain, drove the Vikings away by throwing _______ at them.", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O"], correctAnswer: "G", marks: 1 },
                { questionNumber: 10, questionType: "summary-with-options", questionText: "At one point, they took part in _______ on the Greek island of Crete.", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O"], correctAnswer: "B", marks: 1 },
                { questionNumber: 11, questionType: "summary-with-options", questionText: "They travelled down Russian rivers, then journeyed deep into Asia by _______.", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O"], correctAnswer: "O", marks: 1 },
                { questionNumber: 12, questionType: "summary-with-options", questionText: "Kiev, Ukraine, eventually became the Vikings' territorial _______.", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O"], correctAnswer: "C", marks: 1 },
                { questionNumber: 13, questionType: "summary-with-options", questionText: "The Vikings also had an important _______ in the town of Bulgar on the Volga River.", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O"], correctAnswer: "K", marks: 1 },
            ],
        },

        // ═══════════════════════════════════════════
        // SECTION 2: Dyslexia
        // ═══════════════════════════════════════════
        {
            sectionNumber: 2,
            title: "Dyslexia",
            passage: `Paragraph 1 People who left school unable to read were often dismissed as being lazy. Some probably were but many were simply unable to learn because they were dyslexic. Four key findings now suggest that dyslexia is an organic problem and not a motivational one. Firstly the brain anatomy of dyslexics differs slightly from those of non-dyslexics. Secondly, their brain functions as measured by electrical activity are dissimilar. Thirdly they have behavioural differences apart from an inability to read. Finally, there is more and more evidence to suggest that their condition is linked to particular genes.

Paragraph 2 The anatomical differences between the brains of dyslexics and non-dyslexics were first noticed in 1979 by Albert Galaburda of Harvard Medical School. He found two sorts of microscopic flaws in the language centres of dyslexic's brains. These are called ectoplasts and microgyria.

Paragraph 3 The language centres form part of the cerebral cortex and are situated on the left side of the brain. The cortex consists of six layers of cells. Ectopia is a collection of nerve cells that push up from the lower layers of the cortex into the outer ones, where they are not normally found. A microgyrus is a small fold in the cortex which results in a reduction in the normal number of layers from six to four.

Paragraph 4 The formation of microgyria causes confusion in the neutral connections between the language centres and other parts of the brain. Microgyria have been induced in rat embryos and as adults these rats are found to have a reduced ability in distinguishing between two sounds played in quick succession. This inability to distinguish between two sounds in quick succession is also a symptom of dyslexia in people.

Paragraph 5 Dyslexia not only affects language centres but also causes brain abnormalities in visual pathways as well. One such abnormality is the reduction in the cell size in the layers of the lateral geniculate nucleus. This is where the nerve tracts which transmit information from the eyes to the visual cortex at the back of the brain are found. This is significant as dyslexia is essentially an inability to deal with linguistic information in visual form.

Paragraph 6 This parallel failure of visual and auditory systems is seen elsewhere in the brain. Guinevere Eden and Thomas Zeffiro, who work at Georgetown University in Washington D.C. have found an example of it using a brain-scanning technique called functional magnetic resonance imaging. (MRI)

Paragraph 7 A fundamental characteristic of dyslexia is difficulty in processing written phonemes. Phonemes are the units of sound which make up a language. By giving dyslexic people tasks such as removing phonemes from the beginning of words, while at the same time monitoring brain activity with their scanner, Dr Eden and Dr Zeffiro were able to stimulate both the visual and auditory pathways simultaneously. Their findings demonstrated that dyslexics showed low activity in a part of the brain called Brodmann's area 37, another part of the brain where visual and auditory information are handled in close proximity.

Paragraph 8 Dr Eden and Dr Zeffiro have also compared the brain activity of dyslexic and non-dyslexic readers who were given a task not related to reading. Another symptom of dyslexia is difficulty in detecting visual motion. On this basis, Dr Eden and Dr Zeffiro devised a task whereby people were asked to look at dots on a screen and identify which of them was moving and in which direction. While monitoring brain activity with the scanner, it was found that dyslexics performing this task showed significantly less brain activity in Brodmann's area 37 than non-dyslexics. As this task did not require reading skills it could be used to test children for incipient dyslexia before they reach the reading age; then they could be given special tuition.

Paragraph 9 To broaden their investigation, Dr Eden and Dr Zeffiro teamed up with Frank Wood and his colleagues at the Wake Forest University School of Medicine in North Carolina, an institution specializing in dyslexia. Dr Eden and Dr Zeffiro borrowed some of its patients and monitored them in the fMRI machine at Georgetown University. This was done both before and after the individuals had participated in an intensive programme designed to improve their reading. Non-dyslexics were also scanned and used as controls in the investigation.

Paragraph 10 The results were significant. After the programme, the participants showed enhanced brain activity while reading. However, this activity was not on the left side of the brain but in areas on the right side, corresponding exactly to language centres in the opposite hemisphere. The reading programme had stimulated the brains of the participants to recruit batches of nerve cells in a place not normally associated with language processing.

Paragraph 11 The primary cause for these problems is another of Dr Wood's interests. The abnormal brain tissue in dyslexia is developed by the fifth month of gestation, which indicates that the cause of the disorder must act before that time. This suggests that it may be genetic. Many people argue about the relative contributions of genes and the environment to human behaviour and human disease. Dyslexia is both behavioural and, to a certain degree, it is a disease. It appears to have a biological origin and genetic roots. Yet looking at it from a different angle its cause is almost purely environmental. People living in illiterate societies are hardly troubled by their other symptoms. It was the invention of writing that brought the difficulty to light, not the mutation of genes. Nature or the environment? You will have to decide between the two.`,
            passageSource: "IELTS Practice Test",
            instructions: "Questions 14-26",
            questionGroups: [
                // Questions 14-18: True/False/Not Given
                {
                    groupType: "true-false-not-given",
                    startQuestion: 14,
                    endQuestion: 18,
                    mainInstruction: "Do the following statements agree with the views of the writer in the reading passage?",
                    subInstruction: "Write TRUE if the statement agrees with the writer, FALSE if the statement contradicts the writer, NOT GIVEN if there is no information about this.",
                    optionsExplanation: [
                        { label: "TRUE", description: "if the statement agrees with the writer" },
                        { label: "FALSE", description: "if the statement contradicts the writer" },
                        { label: "NOT GIVEN", description: "if there is no information about this" },
                    ],
                    statements: [
                        { questionNumber: 14, text: "Dyslexia is probably caused by motivational problems.", correctAnswer: "FALSE" },
                        { questionNumber: 15, text: "Dyslexia affects language as well as visual and audio processes.", correctAnswer: "TRUE" },
                        { questionNumber: 16, text: "In modern society dyslexia is essentially the inability to distinguish between visual forms.", correctAnswer: "TRUE" },
                        { questionNumber: 17, text: "It has been demonstrated that special reading programmes can teach dyslexic people to read as well as non-dyslexic ones.", correctAnswer: "NOT GIVEN" },
                        { questionNumber: 18, text: "The cause of dyslexia is partly genetic and partly environmental.", correctAnswer: "TRUE" },
                    ],
                },
                // Questions 19-23: Matching (Multiple Choice Full)
                {
                    groupType: "multiple-choice-full",
                    startQuestion: 19,
                    endQuestion: 23,
                    mainInstruction: "Match the items from the reading passage to the definitions.",
                    subInstruction: "Choose the correct letters A, B, C or D.",
                    mcQuestions: [
                        {
                            questionNumber: 19,
                            questionText: "Ectopia",
                            options: [
                                { letter: "A", text: "a reduction in the number of layers in part of the cortex of the brain." },
                                { letter: "B", text: "a collection of nerve cells in a part of the cortex of the brain where they are not normally found." },
                                { letter: "C", text: "a formation of six layers in the cortex of the brain, where normally there are four." },
                                { letter: "D", text: "an inability to deal with linguistic information in visual form." },
                            ],
                            correctAnswer: "B",
                        },
                        {
                            questionNumber: 20,
                            questionText: "Microgyria",
                            options: [
                                { letter: "A", text: "a symptom of dyslexia." },
                                { letter: "B", text: "abnormal pathways of visual information in the brain." },
                                { letter: "C", text: "an abnormal formation of layers in the cortex of the brain." },
                                { letter: "D", text: "confusion resulting in inability to distinguish sounds in quick succession." },
                            ],
                            correctAnswer: "C",
                        },
                        {
                            questionNumber: 21,
                            questionText: "Phonemes",
                            options: [
                                { letter: "A", text: "sounds made in quick succession." },
                                { letter: "B", text: "part of language that dyslexics are unable to identify." },
                                { letter: "C", text: "brain activity that can be monitored with special scanning techniques." },
                                { letter: "D", text: "the units of sound which make up a language." },
                            ],
                            correctAnswer: "D",
                        },
                        {
                            questionNumber: 22,
                            questionText: "MRI",
                            options: [
                                { letter: "A", text: "a scientific equipment for assessing reading skills." },
                                { letter: "B", text: "a technique for scanning activity of the brain." },
                                { letter: "C", text: "a technique for stimulating visual and auditory pathways in the brain." },
                                { letter: "D", text: "a machine to stimulate visual motion." },
                            ],
                            correctAnswer: "B",
                        },
                        {
                            questionNumber: 23,
                            questionText: "Brodmann's area 37",
                            options: [
                                { letter: "A", text: "a less active part of the brain." },
                                { letter: "B", text: "an abnormal formation in the brain of dyslexics." },
                                { letter: "C", text: "where all visual information is handled in the brain." },
                                { letter: "D", text: "part of the brain where visual and auditory information are handled." },
                            ],
                            correctAnswer: "D",
                        },
                    ],
                },
                // Questions 24-26: Sentence completion
                {
                    groupType: "sentence-completion",
                    startQuestion: 24,
                    endQuestion: 26,
                    mainInstruction: "Complete the sentences below with words taken from the reading passage.",
                    subInstruction: "Use no more than three words for each answer.",
                    statements: [
                        { questionNumber: 24, text: "In the language centres of dyslexics' brains, Dr Albert Galaburda discovered two sorts of _________", correctAnswer: "microscopic flaws" },
                        { questionNumber: 25, text: "One abnormality in the dyslexics' brains is the reduction in the cell size in the layers of the _________", correctAnswer: "lateral geniculate nucleus" },
                        { questionNumber: 26, text: "Dyslexia is a behavioural problem and also a _________", correctAnswer: "disease" },
                    ],
                },
            ],
            questions: [
                // Q14-18: True/False/Not Given
                { questionNumber: 14, questionType: "true-false-not-given", questionText: "Dyslexia is probably caused by motivational problems.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "FALSE", marks: 1 },
                { questionNumber: 15, questionType: "true-false-not-given", questionText: "Dyslexia affects language as well as visual and audio processes.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "TRUE", marks: 1 },
                { questionNumber: 16, questionType: "true-false-not-given", questionText: "In modern society dyslexia is essentially the inability to distinguish between visual forms.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "TRUE", marks: 1 },
                { questionNumber: 17, questionType: "true-false-not-given", questionText: "It has been demonstrated that special reading programmes can teach dyslexic people to read as well as non-dyslexic ones.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "NOT GIVEN", marks: 1 },
                { questionNumber: 18, questionType: "true-false-not-given", questionText: "The cause of dyslexia is partly genetic and partly environmental.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "TRUE", marks: 1 },
                // Q19-23: Multiple choice (matching definitions)
                { questionNumber: 19, questionType: "multiple-choice", questionText: "Ectopia", options: ["A", "B", "C", "D"], correctAnswer: "B", marks: 1 },
                { questionNumber: 20, questionType: "multiple-choice", questionText: "Microgyria", options: ["A", "B", "C", "D"], correctAnswer: "C", marks: 1 },
                { questionNumber: 21, questionType: "multiple-choice", questionText: "Phonemes", options: ["A", "B", "C", "D"], correctAnswer: "D", marks: 1 },
                { questionNumber: 22, questionType: "multiple-choice", questionText: "MRI", options: ["A", "B", "C", "D"], correctAnswer: "B", marks: 1 },
                { questionNumber: 23, questionType: "multiple-choice", questionText: "Brodmann's area 37", options: ["A", "B", "C", "D"], correctAnswer: "D", marks: 1 },
                // Q24-26: Sentence completion
                { questionNumber: 24, questionType: "sentence-completion", questionText: "In the language centres of dyslexics' brains, Dr Albert Galaburda discovered two sorts of _________", correctAnswer: "microscopic flaws", acceptableAnswers: ["microscopic flaws"], marks: 1, wordLimit: 3 },
                { questionNumber: 25, questionType: "sentence-completion", questionText: "One abnormality in the dyslexics' brains is the reduction in the cell size in the layers of the _________", correctAnswer: "lateral geniculate nucleus", acceptableAnswers: ["lateral geniculate nucleus"], marks: 1, wordLimit: 3 },
                { questionNumber: 26, questionType: "sentence-completion", questionText: "Dyslexia is a behavioural problem and also a _________", correctAnswer: "disease", acceptableAnswers: ["disease"], marks: 1, wordLimit: 3 },
            ],
        },

        // ═══════════════════════════════════════════
        // SECTION 3: Catastrophe Theory
        // ═══════════════════════════════════════════
        {
            sectionNumber: 3,
            title: "Catastrophe Theory",
            passage: `A. In the early nineteenth century, the French scientist George Cuvier put forward a theory that would later become known as the Catastrophe Theory. Drawing on his studies of fossils and rock formations, Cuvier proposed that the Earth had been shaped by sudden, violent events — catastrophic disasters such as massive floods, volcanic eruptions, and asteroid impacts. He argued that these catastrophes were responsible for the extinction of entire species and the dramatic reshaping of the Earth's surface. In Cuvier's view, the Earth had a relatively mysterious and unpredictable history, punctuated by events too powerful and sudden to be explained by the slow, steady processes that could be observed in everyday life.

B. Cuvier's ideas were soon challenged by a different school of thought. In 1795, the Scottish geologist James Hutton published his groundbreaking work "Theory of the Earth," in which he proposed what became known as the gradualist, or uniformitarian, theory. Hutton argued that the Earth's features could be explained by the same small, slow processes that were observable in the present — erosion, sedimentation, and gentle uplift — operating over an immensely long period of time. His famous principle, "the present is the key to the past," suggested that no extraordinary or catastrophic events were needed to explain the geological record. Charles Darwin later adopted this gradualist framework as the basis for his theory of evolution by natural selection, arguing that biological change, like geological change, occurred slowly and incrementally.

C. For most of the twentieth century, the gradualist theory dominated scientific thinking. However, in 1923, the geologist J Harlen Bretz published evidence of a colossal ancient flood — the Missoula Floods — that had carved the Channeled Scablands of the Pacific Northwest in the United States. This was proof that not all changes on Earth had occurred gradually. Bretz's work was initially dismissed, but by the 1960s, mounting evidence forced scientists to accept that at least some catastrophic events had played a role in shaping the planet. Interest in catastrophe theory was rekindled.

D. The most dramatic revival of catastrophe theory came in 1980, when the American scientist Walter Alvarez and his father, Luis Alvarez, proposed that a massive asteroid had struck the Earth approximately 65 million years ago, causing the extinction of the dinosaurs. Their evidence was a thin layer of the element iridium found in rock formations around the world, dating to the boundary between the Cretaceous and Tertiary periods. Iridium is rare on the Earth's surface but common in asteroids. The Alvarez team theorized that an asteroid impact had thrown enormous quantities of dust and iridium into the atmosphere, blocking sunlight and triggering a catastrophic chain of events — plummeting temperatures, acid rain, and widespread fires — that wiped out the dinosaurs and many other species.

E. The theory gained further support in 1990 when scientists discovered the Chicxulub crater, a massive impact crater buried beneath the Yucatan Peninsula in Mexico. The crater, approximately 180 kilometres in diameter, was dated to almost exactly 65 million years ago, providing compelling physical evidence of the asteroid strike proposed by the Alvarez team. This discovery convinced most scientists that a major catastrophe had indeed caused the mass extinction of the dinosaurs.

F. Today, scientists generally accept that both gradual processes and sudden catastrophic events have shaped the Earth. Studies of the moon, whose surface is covered with impact craters, suggest that catastrophic events have occurred with some regularity throughout the history of the solar system. Recent research has also shed new light on the speed at which ice age glaciers disappeared, suggesting that the melting of vast ice sheets at the end of the last ice age may have occurred far more rapidly than previously thought — perhaps over just a few thousand years rather than tens of thousands. This evidence further supports the idea that dramatic, sudden changes are an important part of Earth's history, alongside the slower, more gradual processes championed by Hutton and Darwin.`,
            passageSource: "IELTS Practice Test",
            paragraphs: [
                { label: "A", text: `In the early nineteenth century, the French scientist George Cuvier put forward a theory that would later become known as the Catastrophe Theory. Drawing on his studies of fossils and rock formations, Cuvier proposed that the Earth had been shaped by sudden, violent events — catastrophic disasters such as massive floods, volcanic eruptions, and asteroid impacts. He argued that these catastrophes were responsible for the extinction of entire species and the dramatic reshaping of the Earth's surface. In Cuvier's view, the Earth had a relatively mysterious and unpredictable history, punctuated by events too powerful and sudden to be explained by the slow, steady processes that could be observed in everyday life.` },
                { label: "B", text: `Cuvier's ideas were soon challenged by a different school of thought. In 1795, the Scottish geologist James Hutton published his groundbreaking work "Theory of the Earth," in which he proposed what became known as the gradualist, or uniformitarian, theory. Hutton argued that the Earth's features could be explained by the same small, slow processes that were observable in the present — erosion, sedimentation, and gentle uplift — operating over an immensely long period of time. His famous principle, "the present is the key to the past," suggested that no extraordinary or catastrophic events were needed to explain the geological record. Charles Darwin later adopted this gradualist framework as the basis for his theory of evolution by natural selection, arguing that biological change, like geological change, occurred slowly and incrementally.` },
                { label: "C", text: `For most of the twentieth century, the gradualist theory dominated scientific thinking. However, in 1923, the geologist J Harlen Bretz published evidence of a colossal ancient flood — the Missoula Floods — that had carved the Channeled Scablands of the Pacific Northwest in the United States. This was proof that not all changes on Earth had occurred gradually. Bretz's work was initially dismissed, but by the 1960s, mounting evidence forced scientists to accept that at least some catastrophic events had played a role in shaping the planet. Interest in catastrophe theory was rekindled.` },
                { label: "D", text: `The most dramatic revival of catastrophe theory came in 1980, when the American scientist Walter Alvarez and his father, Luis Alvarez, proposed that a massive asteroid had struck the Earth approximately 65 million years ago, causing the extinction of the dinosaurs. Their evidence was a thin layer of the element iridium found in rock formations around the world, dating to the boundary between the Cretaceous and Tertiary periods. Iridium is rare on the Earth's surface but common in asteroids. The Alvarez team theorized that an asteroid impact had thrown enormous quantities of dust and iridium into the atmosphere, blocking sunlight and triggering a catastrophic chain of events — plummeting temperatures, acid rain, and widespread fires — that wiped out the dinosaurs and many other species.` },
                { label: "E", text: `The theory gained further support in 1990 when scientists discovered the Chicxulub crater, a massive impact crater buried beneath the Yucatan Peninsula in Mexico. The crater, approximately 180 kilometres in diameter, was dated to almost exactly 65 million years ago, providing compelling physical evidence of the asteroid strike proposed by the Alvarez team. This discovery convinced most scientists that a major catastrophe had indeed caused the mass extinction of the dinosaurs.` },
                { label: "F", text: `Today, scientists generally accept that both gradual processes and sudden catastrophic events have shaped the Earth. Studies of the moon, whose surface is covered with impact craters, suggest that catastrophic events have occurred with some regularity throughout the history of the solar system. Recent research has also shed new light on the speed at which ice age glaciers disappeared, suggesting that the melting of vast ice sheets at the end of the last ice age may have occurred far more rapidly than previously thought — perhaps over just a few thousand years rather than tens of thousands. This evidence further supports the idea that dramatic, sudden changes are an important part of Earth's history, alongside the slower, more gradual processes championed by Hutton and Darwin.` },
            ],
            instructions: "Questions 27-40",
            questionGroups: [
                // Questions 27-32: Note completion with word list
                {
                    groupType: "summary-with-options",
                    startQuestion: 27,
                    endQuestion: 32,
                    mainInstruction: "Complete the notes using the list of words, A-K, below.",
                    subInstruction: "Write the correct letter, A-K, on lines 27-32 on your answer sheet.",
                    mainHeading: "Catastrophe Theory vs Gradualist Theory",
                    phraseList: [
                        { letter: "A", text: "short" },
                        { letter: "B", text: "small" },
                        { letter: "C", text: "Charles Darwin" },
                        { letter: "D", text: "long" },
                        { letter: "E", text: "definite" },
                        { letter: "F", text: "disasters" },
                        { letter: "G", text: "James Hutton" },
                        { letter: "H", text: "mysterious" },
                        { letter: "I", text: "Walter Alvarez" },
                        { letter: "J", text: "evolution" },
                        { letter: "K", text: "George Cuvier" },
                    ],
                    summarySegments: [
                        { type: "text", content: "Catastrophe Theory\nFirst introduced by" },
                        { type: "blank", questionNumber: 27, correctAnswer: "K" },
                        { type: "text", content: "\nProposes that major" },
                        { type: "blank", questionNumber: 28, correctAnswer: "F" },
                        { type: "text", content: "have given Earth its shape.\nSupports the idea that the Earth has a" },
                        { type: "blank", questionNumber: 29, correctAnswer: "H" },
                        { type: "text", content: "history.\n\nGradualist Theory\nFirst introduced by" },
                        { type: "blank", questionNumber: 30, correctAnswer: "G" },
                        { type: "text", content: "\nProposes that many" },
                        { type: "blank", questionNumber: 31, correctAnswer: "B" },
                        { type: "text", content: "changes in the shape of the Earth happened over a" },
                        { type: "blank", questionNumber: 32, correctAnswer: "D" },
                        { type: "text", content: "period of time." },
                    ],
                },
                // Questions 33-39: Matching Information
                {
                    groupType: "matching-information",
                    startQuestion: 33,
                    endQuestion: 39,
                    mainInstruction: "The passage has six paragraphs, A-F.",
                    subInstruction: "Which paragraph mentions the following information? Write the correct letter, A-F, on lines 33-39 on your answer sheet.",
                    note: "You may use any paragraph more than once.",
                    paragraphOptions: ["A", "B", "C", "D", "E", "F"],
                    matchingItems: [
                        { questionNumber: 33, text: "proof that not all changes on Earth have occurred gradually", correctAnswer: "C" },
                        { questionNumber: 34, text: "a theory explaining the presence of iridium beneath Earth's surface", correctAnswer: "D" },
                        { questionNumber: 35, text: "publication of a book about the gradualist theory", correctAnswer: "B" },
                        { questionNumber: 36, text: "discovery of a large crater that could have been caused by an asteroid", correctAnswer: "E" },
                        { questionNumber: 37, text: "evidence of the occurrence of a large flood in Earth's past", correctAnswer: "C" },
                        { questionNumber: 38, text: "recurrence of interest in the catastrophe theory", correctAnswer: "C" },
                        { questionNumber: 39, text: "ideas about how quickly ice age glaciers disappeared", correctAnswer: "F" },
                    ],
                },
                // Question 40: Multiple choice
                {
                    groupType: "multiple-choice-full",
                    startQuestion: 40,
                    endQuestion: 40,
                    mainInstruction: "Choose the correct letter, A, B or C, and write it on line 40 on your answer sheet.",
                    mcQuestions: [
                        {
                            questionNumber: 40,
                            questionText: "Most scientists now agree that",
                            options: [
                                { letter: "A", text: "The gradualist theory is correct." },
                                { letter: "B", text: "Catastrophic events occur regularly on the moon." },
                                { letter: "C", text: "A major catastrophe caused the dinosaurs to disappear." },
                            ],
                            correctAnswer: "C",
                        },
                    ],
                },
            ],
            questions: [
                // Q27-32: Summary with options (note completion)
                { questionNumber: 27, questionType: "summary-with-options", questionText: "Catastrophe Theory: First introduced by _________", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"], correctAnswer: "K", marks: 1 },
                { questionNumber: 28, questionType: "summary-with-options", questionText: "Proposes that major _________ have given Earth its shape.", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"], correctAnswer: "F", marks: 1 },
                { questionNumber: 29, questionType: "summary-with-options", questionText: "Supports the idea that the Earth has a _________ history.", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"], correctAnswer: "H", marks: 1 },
                { questionNumber: 30, questionType: "summary-with-options", questionText: "Gradualist Theory: First introduced by _________", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"], correctAnswer: "G", marks: 1 },
                { questionNumber: 31, questionType: "summary-with-options", questionText: "Proposes that many _________ changes in the shape of the Earth happened over a long period.", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"], correctAnswer: "B", marks: 1 },
                { questionNumber: 32, questionType: "summary-with-options", questionText: "Changes happened over a _________ period of time.", options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"], correctAnswer: "D", marks: 1 },
                // Q33-39: Matching information
                { questionNumber: 33, questionType: "matching-information", questionText: "proof that not all changes on Earth have occurred gradually", correctAnswer: "C", marks: 1 },
                { questionNumber: 34, questionType: "matching-information", questionText: "a theory explaining the presence of iridium beneath Earth's surface", correctAnswer: "D", marks: 1 },
                { questionNumber: 35, questionType: "matching-information", questionText: "publication of a book about the gradualist theory", correctAnswer: "B", marks: 1 },
                { questionNumber: 36, questionType: "matching-information", questionText: "discovery of a large crater that could have been caused by an asteroid", correctAnswer: "E", marks: 1 },
                { questionNumber: 37, questionType: "matching-information", questionText: "evidence of the occurrence of a large flood in Earth's past", correctAnswer: "C", marks: 1 },
                { questionNumber: 38, questionType: "matching-information", questionText: "recurrence of interest in the catastrophe theory", correctAnswer: "C", marks: 1 },
                { questionNumber: 39, questionType: "matching-information", questionText: "ideas about how quickly ice age glaciers disappeared", correctAnswer: "F", marks: 1 },
                // Q40: Multiple choice
                { questionNumber: 40, questionType: "multiple-choice", questionText: "Most scientists now agree that", options: ["A", "B", "C"], correctAnswer: "C", marks: 1 },
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
            console.log("✅ Reading Test updated successfully!");
        } else {
            const admin = await User.findOne({ role: "admin" });
            if (!admin) {
                console.log("❌ Admin user not found. Please create an admin user first.");
                process.exit(1);
            }
            await ReadingTest.create({ ...readingTest, createdBy: admin._id });
            console.log("✅ Reading Test created successfully!");
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
