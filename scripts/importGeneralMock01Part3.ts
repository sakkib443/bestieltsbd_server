import mongoose from 'mongoose';
import { ReadingTest } from '../src/app/modules/reading/reading.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

const section3 = {
    sectionNumber: 3,
    title: "The Early Days of Australian Gold",
    passage: `<h2>The Early Days of Australian Gold</h2>
<p>Although gold had been rumoured to have been found in Australia as early as 1814, the first gold fields did not appear until forty years later. Gold discoveries were not considered blessings in the pre-1850’s Australian convict society, as the authorities believed gold fever could potentially cause anarchy in the small fledgling British colonies. Most finds were kept very quiet, as most finders soon found themselves accused of theft and punished violently for their trouble. Because the society was predominantly criminals and convicts, this story was easier to believe than the idea that these people were just picking it up in the bush. However, many of these people were hushed up and punished for another reason. Farmers, wealthy landowners and the authorities were afraid that if word got around that gold had been found, then many of their lowly paid workers and labourers would leave their jobs. This all ended when the California gold rush began to really heat up. Workers from all over the world migrated to the United States to strike it rich. Australia was no exception and when this labour drain began to impact the local economy, Australia’s governors began to look at gold differently.</p>

<p>Gold in Australia was first ‘officially’ discovered in1851 by one Edward Hargraves. Hargraves had just returned empty-handed from the already under-way Californian Gold Rush and had a theory that the Australian and Californian terrains had various similarities. Hargraves travelled West of Sydney towards the Bathurst Plains and it was here that the first publicized gold was found. This area would become Australia’s earliest goldfield. The government officially declared the gold discovery on the 22nd of May 1851 and thousands flocked to the Bathurst plains.</p>

<p>The first gold rush was well and truly on in New South Wales, but far more was yet to come. The Victorian Authorities in Melbourne grew anxious, as many of their population made their way north towards Bathurst to try their luck. As labour started to become scarcer, Governor La Trobe offered a £200 reward for any gold found within a 200 mile radius of Melbourne in an attempt to attract people to Melbourne. Soon after, gold was found at Warrandyte, now a suburb of Melbourne. This started an early mini gold rush. But these finds were not large enough to spark a state-wide gold frenzy. Rich gold fields were on the horizon, however. Ones that would change the new colony of Victoria forever.</p>

<p>These gigantic finds were at what is now recognised as part of the State of Victoria’s Golden Triangle. A blacksmith discovered gold a few kilometres north of Ballarat, a small farming village west of Melbourne. This was to be one of the richest gold fields the world has ever seen. 10,000 miners arrived in less than a year and turned this once sleepy region into Victoria’s largest settlement. Miners and prospectors who were originally heading to Bathurst now turned towards Ballarat instead.</p>

<p>The massive influx of immigrants was more than the fledgling colonies of New South Wales and Victoria could handle. Room soon became scarce, as lodging houses and hotels were quickly filled. Faced with the ongoing wave of immigrants arriving in ships almost daily, new measures had to be taken to provide some kind of accommodation for the new arrivals. ‘Canvas towns’ began to spring up in the south of Melbourne. New arrivals to Victoria were given a rough canvas tent and these were set up in rows, forming ‘streets’. The occupants of the canvas towns named the streets that were formed, mostly after prestigious English streets such as Bond Street, Regent Street and so on. The existence of these small canvas settlements was legalized by Governor LaTrobe in 1852, when he imposed a weekly rent of five shillings per tent.</p>

<p>From a fledgling penal settlement, the gold rush and ensuing waves of immigration changed the face of the nation. Before 1851, Australia’s combined immigrant population was approximately 77,000. Most of those had been convicts sent by ship over the previous seventy years. The gold rush completely changed that. It suddenly seemed like a foolish idea, and indeed no longer a punishment, to give a free boat ride to Australia’s rich gold fields to anyone who had committed a crime. The arrival of skilled workers and tradesmen provided a boost to the economy as new facilities were made available. The colonies witnessed widespread progress in many areas of industry, particularly in manufacturing, as factories were gradually established and opened.</p>

<p>The presence of so many migrants from different countries created tensions between different groups. Policies were established to limit the number of non-English-speaking migrants from entering Australia. These policies had their roots in the convict era, when the divisions between free men and newly emancipated convicts were sharply drawn. This social division developed into a cultural divide when migrants from non-English speaking backgrounds arrived in Australia. These cultural conflicts persisted for many years, and were the cause of longstanding tensions between different groups. The government’s immigration policies formed during the time of the gold rushes were rigorously enforced and persisted until not long ago.</p>`,
    instructions: "Read the text below and answer Questions 28-40",
    paragraphs: [],
    questionGroups: [
        {
            groupType: "note-completion",
            startQuestion: 28,
            endQuestion: 37,
            mainInstruction: "Questions 28-37",
            subInstruction: "Complete the notes below taking the best words from the Reading Passage, \"The Early Days of Australian Gold\". Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.",
            mainHeading: "Early Australian Gold Notes",
            notesSections: [
                {
                    bullets: [
                        { type: "question", questionNumber: 28, textBefore: "Gold may be discovered in the year", textAfter: "; major diggings started in 1844.", correctAnswer: "1814" },
                        { type: "question", questionNumber: 29, textBefore: "Gold discoveries not liked, because of establishment worries of", textAfter: "developing in colonies worries over labour leaving work to search for gold.", correctAnswer: "anarchy" },
                        { type: "question", questionNumber: 30, textBefore: "Workers left anyway because of the", textAfter: ".", correctAnswer: "California gold rush" },
                        { type: "question", questionNumber: 31, textBefore: "Gold officially found in 1851 by Edward Hargraves on the", textAfter: "- became Australia’s first goldfield. The discovery attracted thousands of people.", correctAnswer: "Bathurst Plains" },
                        { type: "question", questionNumber: 32, textBefore: "Melbourne government offered a cash", textAfter: "for finding gold near Melbourne to attract people there.", correctAnswer: "reward" },
                        { type: "context", text: "Gold soon found, and some of the world’s biggest deposits found north of Melbourne." },
                        { type: "question", questionNumber: 33, textBefore: "Many miners came to the town of", textAfter: "to seek riches.", correctAnswer: "Ballarat" },
                        { type: "question", questionNumber: 34, textBefore: "Australian residential capacity was overloaded, so immigrant miners were housed under", textAfter: "for a small cost.", correctAnswer: "canvas tent" },
                        { type: "context", text: "The Australian gold rush changed the country’s demographics from largely convict. Transportation as a punishment stopped." },
                        { type: "question", questionNumber: 35, textBefore: "The new and more", textAfter: "population that arrived in Australia stimulated the", correctAnswer: "skilled" },
                        { type: "question", questionNumber: 36, textBefore: "", textAfter: "and industry developed.", correctAnswer: "economy" },
                        { type: "context", text: "Old social division tensions from the convict era continued between English speakers and nonspeakers." },
                        { type: "question", questionNumber: 37, textBefore: "The official", textAfter: "continued until relatively recently.", correctAnswer: "immigration policies" }
                    ]
                }
            ]
        },
        {
            groupType: "multiple-choice-full",
            startQuestion: 38,
            endQuestion: 40,
            mainInstruction: "Questions 38 - 40",
            subInstruction: "Choose the appropriate letters A–D that best answer the question.",
            mcQuestions: [
                {
                    questionNumber: 38,
                    questionText: "Why did Australian convicts who first found gold often not tell anyone?",
                    options: [
                        { letter: "A", text: "They were scared it would be taken from them." },
                        { letter: "B", text: "They had other jobs they wanted to keep." },
                        { letter: "C", text: "They were scared they would be accused of stealing it." },
                        { letter: "D", text: "They did not want other people to come and take their potential riches." }
                    ],
                    correctAnswer: "C"
                },
                {
                    questionNumber: 39,
                    questionText: "Why did Hargraves feel that he could find gold on the Bathurst Plains?",
                    options: [
                        { letter: "A", text: "A miner in California told Hargraves that he had seen gold on the Bathurst Plains." },
                        { letter: "B", text: "Hargraves believed that California and the Bathurst Plains ground conditions were alike." },
                        { letter: "C", text: "Hargraves was convinced by the bonus offered for finding gold on the Bathurst Plains." },
                        { letter: "D", text: "News had been announced that gold could be found in the Bathurst Plains area." }
                    ],
                    correctAnswer: "B"
                },
                {
                    questionNumber: 40,
                    questionText: "When did the temporary shelters for Ballarat miners become officially acknowledged?",
                    options: [
                        { letter: "A", text: "When the miners began to pay taxes." },
                        { letter: "B", text: "When too many miners got arrested." },
                        { letter: "C", text: "After public demonstrations forced the political administration." },
                        { letter: "D", text: "When the miners officially paid for their accommodation." }
                    ],
                    correctAnswer: "D"
                }
            ]
        }
    ]
};

async function run() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB.");

        const testName = "Reading Mock Test 01 - General";
        let doc: any = await ReadingTest.findOne({ title: testName });

        if (!doc) {
            console.log(`Test '${testName}' not found. Please run Part 1 import first.`);
        } else {
            if (!doc.sections) doc.sections = [];
            
            // Section 3 is at index 2
            if (doc.sections.length > 2) {
                doc.sections[2] = section3;
            } else {
                doc.sections.push(section3);
            }
            await doc.save();
            console.log(`✅ Updated General Reading Mock 01 - Part 3 (Questions 28-40) successfully.`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

run();
