import mongoose from 'mongoose';
import { ReadingTest } from '../src/app/modules/reading/reading.model';
import { User } from '../src/app/modules/user/user.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

const section1 = {
    sectionNumber: 1,
    title: "Section 1",
    passage: `<h2>This Week’s Attractions in Westley</h2>
<p><strong>A. The Westley Theatre</strong><br>
This week only, come and see The Wild Witches of Wirral, a comedy for all the family. Performances every afternoon (14.00) this week and both afternoons (14.00) and evenings (18.30) this weekend.</p>

<p><strong>B. Cinema</strong><br>
Due to the refurbishment of all the theatres except one, the only film to be screened this week is The Avenger, the classic thriller from the 1950’s filmed in black and white; showing three times daily (14.30; 17.30: 20.30).</p>

<p><strong>C. Music Festival</strong><br>
This weekend, on Beachamp Farm, the annual music festival will be held. With bands from all over the world, the farm will be rocking and rolling all day from 09.00 on Saturday and Sunday. As usual, the festival has been highly popular and tickets have all been sold in advance, so don’t run up on spec as you will be disappointed.</p>

<p><strong>D. Art Museum</strong><br>
In addition to the regular exhibits, this week there is a special exhibition on ancient Greek pottery. The exhibited collection is all on kind loan from the National Arts Museum and is on tour around the country. The museum is open daily besides Sundays (10.00 - 17.30) and is free for normal exhibits; ancient Greek pottery exhibition, $5.</p>

<p><strong>E. Library</strong><br>
Because of the annual vacation period, the library will be shut this week and the next. Any books due to be returned will have a 2-week extension or borrowers can drop them off through the special book hole in the front door.</p>

<p><strong>F. Football</strong><br>
On Tuesday, Wednesday and Thursday afternoons and evening, the sports centre summer youth 6-a-side football knockout takes place. Teams from around the area will compete in this popular event. Age groups from: under 10’s, under 12’s and under 14’s. There is a small charge for entry to cover pitch rental and admin.</p>

<p><strong>G. Swimming Pool</strong><br>
The swimming pool is back open for business this week now the damage from their small fire has all been repaired. The usual schedule will start up again with public swims, kids sessions and swimming club training sessions. On Saturday, there is a swimming gala from 09.30 with many top swimmers from the region coming to compete. It’s all without charge, so come and cheer on the swimmers.</p>

<hr/>

<h2>Your New Electron Washing Machine</h2>
<p>These introductory notes will outline some basic information regarding your new Electron Washing Machine. Read the notes carefully, as you will avoid some possible problems.</p>

<p>1. Remember, always get your washing machine installed by a qualified installer. This will include all qualified electricians and plumbers. Your retailer will probably be able to recommend someone or provide the service. Don’t use friends or try it yourself and beware of cowboys! Non-qualified installation will lead to the nullification of the guarantee.</p>

<p>2. Your new Electron Washing Machine will work with any good quality washing detergent, but it has been designed to work with some better brands. See the main user’s guide for a list of recommended detergents.</p>

<p>3. It is very possible that the water where you live is hard. Prolonged use with hard water will lead to scale calcification in all washing machines, and no technology can stop this. To avoid this, it is recommended that you install a water softener to the washing machine water supply. Local plumbers will be able to advise you of your area’s water type and what water softener would be suitable if applicable.</p>

<p>4. All new Electron Washing Machines come with a standard 2 year manufacturer’s guarantee. While we are confident that your new Electron Washing Machine has been manufactured to the highest possible quality standards, if you would like to invest in a 5 year guarantee, this can be purchased online on our website, www.electronmachines.com. We believe it’s the best thing to do for peace of mind.</p>

<p>5. Before washing clothes for the first time in your new Electron Washing Machine, it is important that you run the machine one time with no clothes. You can use detergent if you wish, but this is not necessary. Use setting 8 at 40 degrees for best results.</p>

<p>6. Remember, before washing clothes, check all pockets etc. for any coins, tissues or other belongings. Coins and tissues can sometimes get into the machinery and cause your new Electron Washing Machine to break down.</p>

<p>7. Some minor faults with your new Electron Washing Machine can be fixed without having to call in expensive help. To help you with this, we have created a troubleshooting guide on our website, www.electronmachines.com. There are straightforward questions that cover most possible problems and, once diagnosed, the problems can usually be dealt with by yourself without having to call the plumber or electrician.</p>

<p>8. Why not take a little time to register your new Electron Washing Machine with us? It doesn’t take much time, and if we know who you are, we will be able to service you better. Just go to the appropriate icon on our website (www.electronmachines.com) to register. You will be taken to a page where you will be asked for a few details.</p>

<p>9. Finally, we are extremely interested to know what your experience is like with your new Electron Washing Machine.</p>`,
    instructions: "Read the passages and answer the questions.",
    paragraphs: [],
    questionGroups: [
        {
            groupType: "matching-information",
            startQuestion: 1,
            endQuestion: 7,
            mainInstruction: "Questions 1-7",
            subInstruction: "The information has 7 sections (A-G). Which section mentions the following information? Write the correct letter A-G in boxes 1-7 on your answer sheet.",
            paragraphOptions: ["A", "B", "C", "D", "E", "F", "G"],
            matchingItems: [
                { questionNumber: 1, text: "This attraction is closed this week.", correctAnswer: "E" },
                { questionNumber: 2, text: "People don’t have to pay for an event at this attraction.", correctAnswer: "G" },
                { questionNumber: 3, text: "People can no longer buy tickets for this attraction.", correctAnswer: "C" },
                { questionNumber: 4, text: "This attraction should make people laugh.", correctAnswer: "A" },
                { questionNumber: 5, text: "This attraction is being renovated.", correctAnswer: "B" },
                { questionNumber: 6, text: "Only young people will be taking part in this attraction.", correctAnswer: "F" },
                { questionNumber: 7, text: "This attraction is open every day except Sunday.", correctAnswer: "D" }
            ]
        },
        {
            groupType: "yes-no-not-given",
            startQuestion: 8,
            endQuestion: 13,
            mainInstruction: "Questions 8-13",
            subInstruction: "Do the following statements agree with the views of the writer of the introductory notes on Your New Electron Washing Machine? In boxes 8 - 13 on your answer sheet write: YES if the statement agrees with the writer, NO if the statement doesn’t agree with the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.",
            statements: [
                { questionNumber: 8, text: "Buying an extended warranty is a good idea.", correctAnswer: "YES" },
                { questionNumber: 9, text: "When using the washing machine for the first time, run a cycle with some old clothes or towels.", correctAnswer: "NO" },
                { questionNumber: 10, text: "Installers must provide the customer with a certificate of installation.", correctAnswer: "NOT GIVEN" },
                { questionNumber: 11, text: "Reading the troubleshooting guide can save you money.", correctAnswer: "YES" },
                { questionNumber: 12, text: "Registering the washing machine requires giving an email address.", correctAnswer: "NOT GIVEN" },
                { questionNumber: 13, text: "The Electron washing machine includes technology that stops calcification.", correctAnswer: "NO" }
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
            console.log(`Test '${testName}' not found, creating new one...`);
            
            const firstUser = await User.findOne();
            if (!firstUser) throw new Error("No users found to set as createdBy");

            doc = new ReadingTest({
                testId: "READING_GEN_001",
                testNumber: 101, // arbitrary large number for specific mock
                title: testName,
                testType: "general-training",
                totalQuestions: 40,
                totalMarks: 40,
                duration: 60,
                createdBy: firstUser._id,
                sections: [section1]
            });
            await doc.save();
            console.log(`✅ Created General Reading Mock 01 and inserted Part 1 successfully.`);
        } else {
            // Update section 0 (Part 1)
            if (!doc.sections) doc.sections = [];
            if (doc.sections.length > 0) {
                doc.sections[0] = section1;
            } else {
                doc.sections.push(section1);
            }
            await doc.save();
            console.log(`✅ Updated General Reading Mock 01 - Part 1 successfully.`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

run();
