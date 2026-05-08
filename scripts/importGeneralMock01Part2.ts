import mongoose from 'mongoose';
import { ReadingTest } from '../src/app/modules/reading/reading.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

const section2 = {
    sectionNumber: 2,
    title: "Want to Buy a Business? - Read On",
    passage: `<h2>Want to Buy a Business? - Read On</h2>
<p>Buying an established business is a good option for some aspiring entrepreneurs, as much of the groundwork for success may have already been done by the existing owners. Before making an offer, there are some important things to investigate. Initially, it is likely that you may only have access to a company’s business sale memorandum. Sellers will usually ask you to sign a confidentiality undertaking or non-disclosure agreement before you can access sensitive or detailed information. They will usually also ask for details about you (via a CV) and evidence of your ability to fund a purchase. After an offer is made and agreed on, due diligence is carried out. This is where the buyer looks at the business in detail, including its finances, its employees, outstanding litigation, major contracts, IT and other technology. It may sound complex, but professionals such as accountants, solicitors, chartered surveyors, Business transfer agents, business brokers and corporate financiers can help. You can also do some of the research yourself.</p>

<p>Much of the information you’ll want to know about a business you are hoping to buy will be confidential, while some will be publicly available. If a vendor is keen to sell, then they should co-operate fully and give you all of the information you need to arrive at an offer. This may include looking at bank loan details, property rental contracts and intellectual property licences, for example. It is likely you will be asked to sign a confidentiality agreement (also known as a non-disclosure agreement). This protects the existing business owner and stops you from using any information you have learned about the way the business is run should negotiations breakdown. Get a solicitor or lawyer to read anything you are asked to sign or check carefully for any clauses that could have a negative impact on any other businesses you own or are considering starting. You may already be looking at developing a product similar to one offered by the business, for example, and the confidentiality agreement may prevent you doing this if the deal falls through. Once a business has been purchased, it is important to respect the Data Protection Act for any information transferred to you under the sale, such as employee records. It is wise to seek expert legal advice or speak to the Information Commissioner’s Office.</p>

<p>There are several stages to the official process of buying or selling a business. They start with valuing the business, followed by getting tax advice, market research and marketing, preliminary offers, negotiating terms, heads of agreement, legal sale and purchase agreement, completing due diligence, and finally, completing the sale. Ensure each stage of the negotiation is documented and include all agreements and conditions in the final contract. Do this even if the business is small and the sale straightforward. Take expert advice from an accountant and a solicitor throughout the process, as this will stop you making costly mistakes. You can also seek advice from a tax specialist to ensure that the deal you agree is tax efficient. Sellers should decide whether to use a business broker or not to handle the initial part of the process.</p>

<p>When you’re setting up your business, it’s essential to think about how you’ll ultimately end your involvement with it. An exit strategy can help you to maximise the value you get from your business, successfully market your business to potential buyers or investors and ensure you end your involvement with as little disruption to the business as possible.</p>

<p>Regardless of whether your exit occurs to a planned schedule or whether you are forced to make a move for unexpected reasons, the decisions you make when setting up can affect how easy it is for you to eventually exit your business.</p>`,
    instructions: "Read the text below and answer Questions 14-27",
    paragraphs: [],
    questionGroups: [
        {
            groupType: "short-answer",
            startQuestion: 14,
            endQuestion: 18,
            mainInstruction: "Questions 14-18",
            subInstruction: "Answer the questions below. Write NO MORE THAN THREE WORDS from the above text, \"Want to Buy a Business? - Read On\", for each answer.",
            questions: [
                { questionNumber: 14, questionText: "What is the first document that a business buyer will most probably be able to see before signing a non-disclosure agreement?", correctAnswer: "business sale memorandum" },
                { questionNumber: 15, questionText: "What process is carried out after an offer to buy a business has been submitted and accepted?", correctAnswer: "due diligence" },
                { questionNumber: 16, questionText: "What kind of information is given in the text as an example of information protected by the Data Protection Act?", correctAnswer: "employee records" },
                { questionNumber: 17, questionText: "According to the text, what is the first phase of the formal procedure of buying or selling a business?", correctAnswer: "valuing the business" },
                { questionNumber: 18, questionText: "What does the text say you can avoid by consulting an accountant and solicitor?", correctAnswer: "costly mistakes" }
            ]
        },
        {
            groupType: "note-completion",
            startQuestion: 19,
            endQuestion: 20,
            mainInstruction: "Questions 19-20",
            subInstruction: "Read the Information Sheet \"Want to Buy a Business? - Read On\" above and then complete each of the following statements with words taken from the text. Write NO MORE THAN THREE WORDS for each answer.",
            notesSections: [
                {
                    bullets: [
                        { type: "question", questionNumber: 19, textBefore: "It is important to consult with someone specialising in taxation to ensure that your decision is", textAfter: ".", correctAnswer: "tax efficient" },
                        { type: "question", questionNumber: 20, textBefore: "Because by eventually leaving the business you buy might adversely affect it, it’s important to plan an", textAfter: ".", correctAnswer: "exit strategy" }
                    ]
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
            
            // Section 2 is at index 1
            if (doc.sections.length > 1) {
                // If section 2 exists, we might want to append to it later if he sends 21-27 separately
                // but for now, just overwrite
                doc.sections[1] = section2;
            } else {
                // Pad if necessary, though it should be length 1 right now
                doc.sections[1] = section2;
            }
            await doc.save();
            console.log(`✅ Updated General Reading Mock 01 - Part 2 (Questions 14-20) successfully.`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

run();
