import mongoose from 'mongoose';
import { ReadingTest } from '../src/app/modules/reading/reading.model';
import { User } from '../src/app/modules/user/user.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

const section2 = {
    sectionNumber: 2,
    title: "Dyslexia",
    passage: `<h2>Dyslexia</h2>
<p><strong>Paragraph 1</strong> People who left school unable to read were often dismissed as being lazy. Some probably were but many were simply unable to learn because they were dyslexic. Four key findings now suggest that dyslexia is an organic problem and not a motivational one. Firstly the brain anatomy of dyslexics differs slightly from those of non-dyslexics. Secondly, their brain functions as measured by electrical activity are dissimilar. Thirdly they have behavioural differences apart from an inability to read. Finally, there is more and more evidence to suggest that their condition is linked to particular genes.</p>
<p><strong>Paragraph 2</strong> The anatomical differences between the brains of dyslexics and non- dyslexics were first noticed in 1979 by Albert Galaburda of Harvard Medical School. He found two sorts of microscopic flaws in the language centres of dyslexic’s brains. These are called ectoplasts and microgyria.</p>
<p><strong>Paragraph 3</strong> The language centres form part of the cerebral cortex and are situated on the left side of the brain. The cortex consists of six layers of cells. Ectopia is a collection of nerve cells that push up from the lower layers of the cortex into the outer ones, where they are not normally found. A microgyrus is a small fold in the cortex which results in a reduction in the normal number of layers from six to four.</p>
<p><strong>Paragraph 4</strong> The formation of microgyria causes confusion in the neutral connections between the language centres and other parts of the brain. Microgyria have been induced in rat embryos and as adults these rats are found to have a reduced ability in distinguishing between two sounds played in quick succession. This inability to distinguish between two sounds in quick succession is also a symptom of dyslexia in people.</p>
<p><strong>Paragraph 5</strong> Dyslexia not only affects language centres but also causes brain abnormalities in visual pathways as well. One such abnormality is the reduction in the cell size in the layers of the lateral geniculate nucleus. This is where the nerve tracts which transmit information from the eyes to the visual cortex at the back of the brain are found. This is significant as dyslexia is essentially an inability to deal with linguistic information in visual form.</p>
<p><strong>Paragraph 6</strong> This parallel failure of visual and auditory systems is seen elsewhere in the brain. Uinevere Eden and Thomas Zeffiro, who work at Georgetown University in Washington D. C. have found an example of it using a brain-scanning technique called functional magnetic resonance imaging. (MRI)</p>
<p><strong>Paragraph 7</strong> A fundamental characteristic of dyslexia is difficulty in processing written phenomes. Phenomes are the units of sound which make up a language. By giving dyslexic people tasks such as removing phenomes from the beginning of words, while at the same time monitoring brain activity with their scanner, Dr Eden and Dr Zeffiro were able to stimulate both the visual and auditory pathways simultaneously. Their findings demonstrated that dyslexics showed low activity in a part of the brain called Brodmann’s area 37, another part of the brain where visual and auditory information are handled in close proximity.</p>
<p><strong>Paragraph 8</strong> Dr Eden and Dr Zeffiro have also compared the brain activity of dyslexic and non- dyslexic readers who were given a task not related to reading. Another symptom of dyslexia is difficulty in detecting visual motion. On this basis, Dr Eden and Dr Zeffiro devised a task whereby people were asked to look at dots on a screen and identify which of them was moving and in which direction. While monitoring brain activity with the scanner, it was found that dyslexics performing this task showed significantly less brain activity in Brodmann’s area 37 than non-dyslexics. As this task did not require reading skills it could be used to test children for incipient dyslexia before they reach the reading age; then they could be given special tuition.</p>
<p><strong>Paragraph 9</strong> To broaden their investigation, Dr Eden and Dr Zeffiro teamed up with Frank Wood and his colleagues at the Wake Forest University School of Medicine in North Carolina, an institution specializing in dyslexia. Dr Eden and Dr Zeffiro borrowed some of its patients and monitored them in the fMRI machine at Georgetown University. This was done both before and after the individuals had participated in an intensive programme designed to improve their reading. Non- dyslexics were also scanned and used as controls in the investigation.</p>
<p><strong>Paragraph 10</strong> The results were significant. After the programme, the participants showed enhanced brain activity while reading. However, this activity was not on the left side of the brain but in areas on the right side, corresponding exactly to language centres in the opposite hemisphere. The reading programme had stimulated the brains of the participants to recruit batches of nerve cells in a place not normally associated with language processing.</p>
<p><strong>Paragraph 11</strong> The primary cause for these problems is another of Dr Wood’s interests. The abnormal brain tissue in dyslexia is developed by the fifth month of gestation, which indicates that the cause of the disorder must act before that time. This suggests that it may be genetic. Many people argue about the relative contributions of genes and the environment to human behaviour and human disease. Dyslexia is both behavioural and, to a certain degree, it is a disease. It appears to have a biological origin and genetic roots. Yet looking at it from a different angle its cause is almost purely environmental. People living in illiterate societies are hardly troubled by their other symptoms. It was the invention of writing that brought the difficulty to light, not the mutation of genes. Nature or the environment? You will have to decide between the two.</p>`,
    instructions: "You should spend about 20 minutes on questions 14-26, which are based on reading passage 2 below.",
    paragraphs: [],
    questionGroups: [
        {
            groupType: "true-false-not-given",
            startQuestion: 14,
            endQuestion: 18,
            mainInstruction: "Questions 14-18",
            subInstruction: "Do the following statements agree with the views of the writer in the reading passage?",
            note: "TRUE if the statement agrees with the writer\nFALSE if the statement contradicts the writer\nNOT GIVEN if there is no information about this",
            statements: [
                { questionNumber: 14, text: "Dyslexia is probably caused by motivational problems.", correctAnswer: "FALSE" },
                { questionNumber: 15, text: "Dyslexia affects language as well as visual and audio processes.", correctAnswer: "TRUE" },
                { questionNumber: 16, text: "In modern society dyslexia is essentially the inability to distinguish between visual forms.", correctAnswer: "FALSE" },
                { questionNumber: 17, text: "It has been demonstrated that special reading programmes can teach dyslexic people to read as well as non- dyslexic ones.", correctAnswer: "NOT GIVEN" },
                { questionNumber: 18, text: "The cause of dyslexia is partly genetic and partly environmental.", correctAnswer: "TRUE" }
            ]
        },
        {
            groupType: "multiple-choice-full",
            startQuestion: 19,
            endQuestion: 23,
            mainInstruction: "Questions 19-23",
            subInstruction: "Match the items from the reading passage to the definitions. Choose the correct letters A B C D",
            mcQuestions: [
                {
                    questionNumber: 19,
                    questionText: "Ectopia",
                    options: [
                        { letter: "A", text: "a reduction in the number of layers in part of the cortex of the brain." },
                        { letter: "B", text: "a collection of nerve cells in a part of the cortex of the brain where they are not normally found." },
                        { letter: "C", text: "a formation of six layers in the cortex of the brain, where normally there are four." },
                        { letter: "D", text: "an inability to deal with linguistic information in visual form." }
                    ],
                    correctAnswer: "B"
                },
                {
                    questionNumber: 20,
                    questionText: "Microgyria",
                    options: [
                        { letter: "A", text: "a symptom of dyslexia." },
                        { letter: "B", text: "abnormal pathways of visual information in the brain." },
                        { letter: "C", text: "an abnormal formation of layers in the cortex of the brain." },
                        { letter: "D", text: "confusion resulting in inability to distinguish sounds in quick succession." }
                    ],
                    correctAnswer: "C"
                },
                {
                    questionNumber: 21,
                    questionText: "Phenomes",
                    options: [
                        { letter: "A", text: "sounds made in quick succession." },
                        { letter: "B", text: "part of language that dyslexics are unable to identify." },
                        { letter: "C", text: "brain activity that can be monitored with special scanning techniques." },
                        { letter: "D", text: "the units of sound which make up a language." }
                    ],
                    correctAnswer: "D"
                },
                {
                    questionNumber: 22,
                    questionText: "MRI",
                    options: [
                        { letter: "A", text: "a scientific equipment for assessing reading skills." },
                        { letter: "B", text: "a technique for scanning activity of the brain." },
                        { letter: "C", text: "a technique for stimulating visual and auditory pathways in the brain." },
                        { letter: "D", text: "a machine to stimulate visual motion." }
                    ],
                    correctAnswer: "B"
                },
                {
                    questionNumber: 23,
                    questionText: "Brodmann’s area 37",
                    options: [
                        { letter: "A", text: "a less active part of the brain." },
                        { letter: "B", text: "an abnormal formation in the brain of dyslexics." },
                        { letter: "C", text: "where all visual information is handled in the brain." },
                        { letter: "D", text: "part of the brain where visual and auditory information are handled." }
                    ],
                    correctAnswer: "D"
                }
            ]
        },
        {
            groupType: "short-answer",
            startQuestion: 24,
            endQuestion: 26,
            mainInstruction: "Questions 24-26",
            subInstruction: "Complete the sentences below with words taken from the reading passage. Use no more than three words for each answer",
            questions: [
                { questionNumber: 24, questionText: "In the language centres of dyslexics brains, Dr Albert Galaburda discovered two sorts of", correctAnswer: "Microscopic Flaws" },
                { questionNumber: 25, questionText: "One abnormality in the dyslexics brains is the reduction in the cell size in the layers of the", correctAnswer: "Lateral Geniculate Nucleus" },
                { questionNumber: 26, questionText: "Dyslexia is a behavioural problem and also a", correctAnswer: "disease" }  // Extracted ans: "A disease", but the text has "a". I'll keep "A disease", or "disease" as per answer key. Key says "A disease" as 26.
            ]
        }
    ]
};

// adjust "A disease" to match the actual key which is "A disease" or "disease". The key has "A disease".
section2.questionGroups[2].questions[2].correctAnswer = "A disease"; 

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

        // Update or add section 1 (Part 2)
        if (!doc.sections) doc.sections = [];
        if (doc.sections.length > 1) {
            doc.sections[1] = section2;
        } else {
            doc.sections.push(section2);
        }
        await doc.save();
        console.log(`✅ Updated ${testName} - Part 2 successfully.`);
        
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

run();
