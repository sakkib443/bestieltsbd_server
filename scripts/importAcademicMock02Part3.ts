import mongoose from 'mongoose';
import { ReadingTest } from '../src/app/modules/reading/reading.model';
import { User } from '../src/app/modules/user/user.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

const section3 = {
    sectionNumber: 3,
    title: "Catastrophe theory",
    passage: `<h2>Catastrophe theory</h2>
<p><strong>A.</strong> In the late eighteenth and early nineteenth centuries, the popular theory among Earth scientists was that a number of major catastrophes had taken place over a relatively short period of time to give Earth its shape. French geologist Baron Georges Cuvier introduced this idea, which was later coined the "Catastrophe Theory." Proponents of the catastrophe theory used fossilized creatures and the faunal changes in rock strata to support their beliefs that major events such as volcanoes had occurred on a worldwide scale. The catastrophe theory was used to support the notion that Earth's history was not a relatively long one.</p>
<p><strong>B.</strong> In response to the catastrophe theory, a handful of Earth scientists searched for explanations that would provide a better scientific basis for Earth's geology. James Hutton, the father of geology, is best known for his gradualist theory, a paradigm that became known as "Uniformitarianism." Hutton published the theory of the Earth in 1795, after which many other geologists including Charles Lyell, adopted the idea that small changes on Earth occurred over a large expanse of time. Uniformitarianism rejected the idea that cataclysmic events could shape the Earth so quickly, and instead proposed the theory that the key to the present is the past. The term deep time was used to describe the span in which gradual geological processes occurred, especially the formation of sedimentary rock. Charles Darwin later based his work on the idea, by developing his theory of evolution.</p>
<p><strong>C.</strong> The majority of paleontologists and geologists adopted the gradualist theory of Earth's history for more than 100 years. In 1980, a discovery in Italy gave scientists a reason to reconsider the discarded theories of catastrophism. Geologist Walter Alvarez discovered a clay layer in the K-T boundary that intrigued him. The K-T boundary refers to the layer of Earth between the Cretaceous and Tertiary periods. The geologist with the help of his father Luis Alvarez, a prominent physicist, analysed the clay for heavy metals. After careful examination, the clay was found to contain high levels of iridium. Samples taken from the K-T boundary in other parts of the world were examined, with the same findings.</p>
<p><strong>D.</strong> The Alvarez group wrote a historic paper that applied the catastrophe theory to their discovery. According to their hypothesis, the iridium in the K-T boundary was caused by an asteroid or a comet that hit Earth near the end of the Cretaceous period, over 65 million years ago. They also proposed that the impact would have raised enough dust to block the sun and cool Earth, which in turn would have prevented photosynthesis. This chain reaction would have led to the extinction of plants and animals. The main reason that the Alvarez theory took hold so quickly in both the world of science and the public realm, was that it could account for the extinction of the dinosaurs at the end of the Cretaceous period. The acceptance of this theory was widespread, even before the discovery in 1990 of a 180-kilometer crater in Mexico's Yucatan Peninsula, a potential piece of evidence of the asteroid impact.</p>
<p><strong>E.</strong> Events that have occurred on Earth in the last 100 years or more have proved to geologists that not all processes are gradual. Major rivers have flooded areas in a matter of days, and volcanoes have erupted, causing mass devastation. The eruption of Mount St. Helens was proof of how a catastrophe could easily change the Earth's landscape. Modern research on fossils even supports the theory of a marine catastrophe, not unlike the legends and stories among many peoples of great floods. Some scientists believe that animal remains found within the layers of sedimentary rock may have been casualties of such a flood. Sedimentary rock is made up of layers such as sandstone and limestone and is created by water movement. In addition, some scientists propose that the glacial ice sheet that once spread out across North America melted catastrophically rather than having a slow glacial retreat. Deep erosion up to 100 meters wide was discovered along the bottom of some of the Great Lakes. Within the gullies, layers of periodic sediment point to catastrophic melting.</p>
<p><strong>F.</strong> Though there is little debate that catastrophic events caused the mass extinction of several of Earth's species, namely the dinosaurs, geologists still question whether asteroids, volcanoes, or other natural disasters were the cause. The idea that the moon was formed as a result of catastrophic events is a related field of study and one that has been debated for decades.</p>`,
    instructions: "You should spend about 20 minutes on questions 27-40, which are based on reading passage 3 below.",
    paragraphs: [
        { label: "A", text: "In the late eighteenth..." },
        { label: "B", text: "In response to the..." },
        { label: "C", text: "The majority of..." },
        { label: "D", text: "The Alvarez group..." },
        { label: "E", text: "Events that have..." },
        { label: "F", text: "Though there is..." }
    ],
    questionGroups: [
        {
            groupType: "summary-with-options",
            startQuestion: 27,
            endQuestion: 32,
            mainInstruction: "Questions 27-32",
            subInstruction: "Complete the notes using the list of words, A—K, below. Write the correct letter, A—K, on lines 27—32 on your answer sheet.",
            phraseList: [
                { letter: "A.", text: "Short" },
                { letter: "B.", text: "Small" },
                { letter: "C.", text: "Charles Darwin" },
                { letter: "D.", text: "Long" },
                { letter: "E.", text: "definite" },
                { letter: "F.", text: "Disasters" },
                { letter: "G.", text: "James Hutton" },
                { letter: "H.", text: "Mysterious" },
                { letter: "I.", text: "Walter Alvarez" },
                { letter: "J.", text: "Evolution" },
                { letter: "K.", text: "George Cuvier" }
            ],
            summarySegments: [
                { type: "text", content: "Catastrophe Theory\nFirst introduced by " },
                { type: "blank", questionNumber: 27, correctAnswer: "K" },
                { type: "text", content: "\nProposes that major " },
                { type: "blank", questionNumber: 28, correctAnswer: "F" },
                { type: "text", content: " have given Earth its shape.\nSupports the idea that the Earth has a " },
                { type: "blank", questionNumber: 29, correctAnswer: "A" },
                { type: "text", content: " history.\n\nGradualist Theory\nFirst introduced by " },
                { type: "blank", questionNumber: 30, correctAnswer: "G" },
                { type: "text", content: "\nProposes that many " },
                { type: "blank", questionNumber: 31, correctAnswer: "B" },
                { type: "text", content: " changes in the shape of the Earth happened over a " },
                { type: "blank", questionNumber: 32, correctAnswer: "D" },
                { type: "text", content: " period of time." }
            ]
        },
        {
            groupType: "matching-information", // Using matching-information (Which paragraph mentions the following information)
            startQuestion: 33,
            endQuestion: 39,
            mainInstruction: "Questions 33-39",
            subInstruction: "The passage has six paragraphs, A-F. Which paragraph mentions the following information? Write the correct letter, A—F, on lines 33—39 on your answer sheet. You may use any letter more than once.",
            paragraphOptions: ["A", "B", "C", "D", "E", "F"],
            matchingItems: [
                { questionNumber: 33, text: "proof that not all changes on Earth have occurred gradually", correctAnswer: "E" },
                { questionNumber: 34, text: "a theory explaining the presence of iridium beneath Earth’s surface", correctAnswer: "D" },
                { questionNumber: 35, text: "publication of a book about the gradualist theory", correctAnswer: "B" },
                { questionNumber: 36, text: "discovery of a large crater that could have been caused by an asteroid", correctAnswer: "D" },
                { questionNumber: 37, text: "evidence of the occurrence of a large flood in Earth’s past", correctAnswer: "E" },
                { questionNumber: 38, text: "recurrence of interest in the catastrophe theory", correctAnswer: "C" },
                { questionNumber: 39, text: "ideas about how quickly ice age glaciers disappeared", correctAnswer: "E" }
            ]
        },
        {
            groupType: "multiple-choice-full",
            startQuestion: 40,
            endQuestion: 40,
            mainInstruction: "Question 40",
            subInstruction: "Choose the correct letter, A-C, and write it on line 40 on your answer sheet.",
            mcQuestions: [
                {
                    questionNumber: 40,
                    questionText: "Most scientists now agree that",
                    options: [
                        { letter: "A", text: "The gradualist theory is correct." },
                        { letter: "B", text: "Catastrophic events occur regularly on the moon." },
                        { letter: "C", text: "A major catastrophe caused the dinosaurs to disappear." }
                    ],
                    correctAnswer: "C"
                }
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
            console.log("Test not found! Please run import for part 1 first.");
            return;
        }

        // Update or add section 2 (Part 3)
        if (!doc.sections) doc.sections = [];
        if (doc.sections.length > 2) {
            doc.sections[2] = section3;
        } else {
            doc.sections.push(section3);
        }
        await doc.save();
        console.log(`✅ Updated ${testName} - Part 3 successfully.`);
        
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

run();
