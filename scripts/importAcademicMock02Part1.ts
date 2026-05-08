import mongoose from 'mongoose';
import { ReadingTest } from '../src/app/modules/reading/reading.model';
import { User } from '../src/app/modules/user/user.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

const section1 = {
    sectionNumber: 1,
    title: "The Vikings’ Wayfaring Ways",
    passage: `<h2>The Vikings’ Wayfaring Ways</h2>
<p><strong>A.</strong> Perhaps best known as fierce warriors, the Vikings were also the most far-ranging of peoples. In fact, the term Viking, in Old Norse, means "to go on an expedition." From the late 700s until the eleventh century, Viking explorers journeyed from their native Norway, Denmark, and Sweden to many distant lands. They travelled as far west as Newfoundland in present-day Canada, and as far east as Baghdad.</p>

<p><strong>B.</strong> Those from Norway sailed west to the British Isles, and eventually across the Atlantic Ocean. During their first expedition, in 793, a force of Viking warriors sacked the famed abbey at Lindisfarne, on England's northeast coast. In the 800s, groups of raiders went on to occupy the Shetland Islands, north of the British Isles and west of Norway, and the Orkney Islands off northern Scotland.</p>

<p><strong>C.</strong> By 870, the Vikings were settling Iceland. In 980, an Icelandic assembly found a man named Eric "the Red" Ericson guilty of murder and sent him into exile. Eric the Red responded by sailing to a large island to the west, which he called "Greenland." An Icelandic saga mentions that people would be attracted to go to Greenland if it had a favourable name. Around 998, Eric the Red's son, Leif "the Lucky" Ericson, and a small Viking fleet sailed west to North America. There they established the first European settlement in the New World, called "Vinland."</p>

<p><strong>D.</strong> Vikings from Denmark, meanwhile, ravaged large swaths of England and France. In 866, a Viking "Great Army" landed in England, occupying much of the country's north and east. They forced the English king to acknowledge their control of much of England under the so-called Danelaw. To the west, they conquered coastal portions of Ireland, and in 841 founded Dublin, today a major Irish city, but originally a Viking fort. The Vikings remained a major power in Ireland until the early eleventh century.</p>

<p><strong>E.</strong> To the south, the Vikings conquered France, moving swiftly up rivers in longboats, powered by oar and sail. From 845 to 886, they surged up the Seine to attack Paris three times. To stop the raids, French King Charles III the Simple in 911 offered the Viking chief Rollo territories in northwest France, called Normandy, after the Normans or "Northmen." There they set up a powerful kingdom and, in 1066, under William, Duke of Normandy defeated King Harold at the battle of Hastings in England.</p>

<p><strong>F.</strong> Farther south, in 844, the Vikings had raided Portugal and Spain, then largely controlled by Arab Moors. A fleet of 100 Viking ships seized Lisbon and boldly sailed up the Guadalquivir River to occupy Seville. However, the Moors dealt them a rare defeat. The Moors catapulted flaming projectiles onto the Viking vessels, forcing a retreat.</p>

<p><strong>G.</strong> Still other Vikings sailed much farther, to raid Morocco, then to the eastern Mediterranean and beyond. Many of these Vikings enlisted with the military forces of the Byzantine Empire, the Greek speaking successors to the Roman Empire. Vikings made up the Byzantine Emperor's elite Varangian Guard. In 902, hundreds of Varangians served as marines during a Byzantine naval assault on the island of Crete. Varangians battled Arab forces in Syria in 955, and even fought in Jerusalem. So many men left Scandinavia for the Byzantine Empire that, to stem the outflow, Sweden passed a law denying inherited property to anyone serving under the Byzantines.</p>

<p><strong>H.</strong> The Vikings of Sweden, meanwhile, were moving out of Scandinavia to the east and south. They journeyed through the Baltic Sea, then built inland trading posts in Germany and Poland. In time, they struck out across Central and Eastern Europe, down the Vistula River in Poland, and the Dnieper, Volga, and Don Rivers in Russia. Their vessel of choice was the "knar," a cargo ship with a deep draft and wide hull. Viking merchants on horseback penetrated far into the Asian heartland, trading with towns on the Caspian and Black seas.</p>

<p><strong>I.</strong> The most significant settlements were in Russia and Ukraine. In 862, Vikings settled in the town of Novgorod, in northwestern Russia. It became the capital of a country called Rus, after the Finnish name for the Swedes. Rus came from the word Rutosi, meaning "rowers." Rus formed the foundation of Russia, as the Russian and Viking leaders of Rus intermarried, converted to Christianity, and steadily expanded their territory. And after lucrative trade relations were established with the Byzantines and with Muslim lands, the Rus moved their capital southward to Kiev, later the capital of Ukraine.</p>

<p><strong>J.</strong> Another important Viking market town was Bulgar, on the Volga River. There, merchants peddled honey, wax, amber, and steel swords. The Viking's most common commodity may have been skins: they dealt in horse, beaver, rabbit, mink, ermine, and sable skins. They also traded hazelnuts, fish, cattle, and falcons. Another commodity was slaves, many of them Slavs from Eastern Europe. The merchants eagerly exchanged their goods for Arab silver coins. In Sweden, archeologists have excavated about 100,000 such coins, minted in such distant cities as Cairo and Tashkent.</p>

<p><strong>K.</strong> Like their Danish and Norwegian relatives, the Swedish Vikings travelled to the most exotic realms. They took part in the Silk Road trade with India and China. Archeological evidence shows that Viking traders even travelled by camel caravan to Baghdad.</p>

<p><strong>L.</strong> Given the wide-ranging travel of the Vikings, it is fitting that the Anglo Saxons gave them the nickname "Faergenga"- "Far Going."</p>`,
    instructions: "You should spend about 20 minutes on Questions 1-13 which are based on the Reading Passage.",
    paragraphs: [],
    questionGroups: [
        {
            groupType: "short-answer",
            startQuestion: 1,
            endQuestion: 5,
            mainInstruction: "Questions 1-5",
            subInstruction: "Answer the questions below. Choose ONE NUMBER ONLY from the text for each answer.",
            questions: [
                { questionNumber: 1, questionText: "When did Viking warriors raid an abbey on the coast of England?", correctAnswer: "793" },
                { questionNumber: 2, questionText: "When was Eric the Red convicted of a crime?", correctAnswer: "980" },
                { questionNumber: 3, questionText: "When did Vikings establish a fort in Ireland?", correctAnswer: "841" },
                { questionNumber: 4, questionText: "When was a Viking chief granted lands by a king of France?", correctAnswer: "911" },
                { questionNumber: 5, questionText: "When did Viking warriors defeat an English king?", correctAnswer: "1066" }
            ]
        },
        {
            groupType: "summary-with-options",
            startQuestion: 6,
            endQuestion: 13,
            mainInstruction: "Questions 6-13",
            subInstruction: "Complete the summary using the list of words, A-O, below. Write the correct letter, A-O, in boxes 6-13.",
            phraseList: [
                { letter: "A.", text: "warriors" },
                { letter: "B.", text: "an attack" },
                { letter: "C.", text: "capital" },
                { letter: "D.", text: "explorers" },
                { letter: "E.", text: "trade with" },
                { letter: "F.", text: "conquered" },
                { letter: "G.", text: "burning objects" },
                { letter: "H.", text: "settled in" },
                { letter: "I.", text: "ship" },
                { letter: "J.", text: "oars" },
                { letter: "K.", text: "market" },
                { letter: "L.", text: "a parade" },
                { letter: "M.", text: "archeologists" },
                { letter: "N.", text: "silver coins" },
                { letter: "O.", text: "horse" }
            ],
            summarySegments: [
                { type: "text", content: "The people known as Vikings were given this name because " },
                { type: "blank", questionNumber: 6, correctAnswer: "D" },
                { type: "text", content: "Groups of Vikings from Norway travelled west to Britain, Iceland, and beyond. They were the first Europeans who " },
                { type: "blank", questionNumber: 7, correctAnswer: "H" },
                { type: "text", content: " North America. Groups from Denmark cover large areas of England and France. Other " },
                { type: "blank", questionNumber: 8, correctAnswer: "F" },
                { type: "text", content: " groups of Vikings raided areas of Portugal and Spain. The people of Seville, Spain, drove the Vikings away by throwing " },
                { type: "blank", questionNumber: 9, correctAnswer: "G" },
                { type: "text", content: " at them. Large numbers of Vikings left Scandinavia for the Byzantine Empire, and many of these joined the Byzantine military. At one point, they took part in " },
                { type: "blank", questionNumber: 10, correctAnswer: "B" },
                { type: "text", content: " on the Greek island of Crete. Groups of Swedish Vikings crossed the Baltic Sea to explore the lands beyond. They travelled down Russian rivers, then journeyed deep into Asia by " },
                { type: "blank", questionNumber: 11, correctAnswer: "O" },
                { type: "text", content: " . After settling in northwest Russia, they expanded their territories toward the south. Kiev, Ukraine, eventually became the Vikings' territorial " },
                { type: "blank", questionNumber: 12, correctAnswer: "C" },
                { type: "text", content: " important " },
                { type: "blank", questionNumber: 13, correctAnswer: "K" },
                { type: "text", content: " The Vikings also had an in the town of Bulgar on the Volga River." }
            ]
        }
    ]
};

async function run() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB.");

        const testName = "Reading Mock Test 02 - Academic";
        let doc: any = await ReadingTest.findOne({ title: testName });

        if (!doc) {
            console.log(`Test '${testName}' not found, creating new one...`);
            
            const firstUser = await User.findOne();
            if (!firstUser) throw new Error("No users found to set as createdBy");

            doc = new ReadingTest({
                testId: "READING_AC_002",
                testNumber: 102, // arbitrary number
                title: testName,
                testType: "academic",
                totalQuestions: 40,
                totalMarks: 40,
                duration: 60,
                createdBy: firstUser._id,
                sections: [section1]
            });
            await doc.save();
            console.log(`✅ Created Academic Reading Mock 02 and inserted Part 1 successfully.`);
        } else {
            // Update section 0 (Part 1)
            if (!doc.sections) doc.sections = [];
            if (doc.sections.length > 0) {
                doc.sections[0] = section1;
            } else {
                doc.sections.push(section1);
            }
            await doc.save();
            console.log(`✅ Updated Academic Reading Mock 02 - Part 1 successfully.`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

run();
