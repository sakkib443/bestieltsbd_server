import mongoose from "mongoose";
import config from "../app/config";
import { ListeningTest } from "../app/modules/listening/listening.model";

async function seed() {
  try {
    await mongoose.connect(config.database_url as string); console.log("Connected to MongoDB");
    const existing = await ListeningTest.findOne({ testNumber: 1 });
    if (existing) { await ListeningTest.findByIdAndUpdate(existing._id, data, { runValidators: false }); console.log("\u2705 Test 01 updated!"); }
    else { const db = mongoose.connection.db!; const admin = await db.collection("users").findOne({ role: "admin" }); await ListeningTest.create({ ...data, createdBy: admin?._id || new mongoose.Types.ObjectId() }); console.log("\u2705 Test 01 created!"); }
    const t = await ListeningTest.findOne({ testNumber: 1 });
    if (t) { console.log(`\n\uD83D\uDCDD ${t.title}`); (t.sections as any[]).forEach((s,i) => { const qs = s.questions.filter((q:any) => q.blockType==="question"); console.log(`  Part ${i+1}: ${qs.length} questions`); }); }
    await mongoose.disconnect(); process.exit(0);
  } catch (e) { console.error("\u274C",e); process.exit(1); }
}

const data = {
  testId: "LISTENING_001", testNumber: 1,
  title: "Listening Mock Test 01 \u2013 Academic",
  description: "IELTS Academic Listening Test 01 \u2014 4 parts, 40 questions.",
  source: "Best IELTS BD Mock 10001", mainAudioUrl: "", audioDuration: 1800,
  difficulty: "medium" as const, totalQuestions: 40, totalMarks: 40, duration: 40, isActive: true, usageCount: 0,
  sections: [
    // PART 1 — Tardigrades: Water Bears in Space (Q1-10)
    { sectionNumber: 1, title: "Part 1", context: "A lecture about tardigrades (water bears) and their ability to survive extreme conditions.", instructions: "Questions 1\u201310", audioUrl: "", questions: [
      { blockType: "instruction" as const, content: "<strong>Questions 1\u201310</strong><br/>Complete the notes below.<br/>Write <strong>NO MORE THAN THREE WORDS AND/OR A NUMBER</strong> for each answer." },
      { blockType: "instruction" as const, content: "<div style='text-align:center;font-weight:bold;margin:10px 0'>Tardigrades: Water Bears in Space</div>" },
      { blockType: "instruction" as const, content: "<ul><li>Name of scientist: Dr Thomas Boothby</li></ul>" },
      { blockType: "question" as const, questionNumber: 1, questionType: "note-completion" as const, questionText: "~Experiment site: International ________ Station", correctAnswer: "Space", marks: 1, wordLimit: 3 },
      { blockType: "question" as const, questionNumber: 2, questionType: "note-completion" as const, questionText: "~Work began in ________", correctAnswer: "2015", marks: 1, wordLimit: 3 },
      { blockType: "question" as const, questionNumber: 3, questionType: "note-completion" as const, questionText: "~Tardigrades have been featured in a television program called ________ on Animal Planet", correctAnswer: "The Most Extreme", marks: 1, wordLimit: 3 },
      { blockType: "instruction" as const, content: "<ul><li>Also called water bears</li><li>Ability to adapt to extreme conditions</li></ul>" },
      { blockType: "question" as const, questionNumber: 4, questionType: "note-completion" as const, questionText: "~Tiny ________ organisms", correctAnswer: "microscopic", marks: 1, wordLimit: 3 },
      { blockType: "question" as const, questionNumber: 5, questionType: "note-completion" as const, questionText: "~Can survive in extreme heat, extreme cold, excessive radiation, and without ________", correctAnswer: "oxygen", marks: 1, wordLimit: 3 },
      { blockType: "instruction" as const, content: "<ul><li>Only known organism that can survive in outer space</li><li>Look like gummy bear candies</li></ul>" },
      { blockType: "question" as const, questionNumber: 6, questionType: "note-completion" as const, questionText: "~Number of legs: ________", correctAnswer: "eight", marks: 1, wordLimit: 3 },
      { blockType: "question" as const, questionNumber: 7, questionType: "note-completion" as const, questionText: "~Many tardigrades have ________ bodies, so light passes through them", correctAnswer: "transparent", marks: 1, wordLimit: 3 },
      { blockType: "instruction" as const, content: "<ul><li>Some look like tanks</li></ul>" },
      { blockType: "question" as const, questionNumber: 8, questionType: "note-completion" as const, questionText: "~Huge morphological ________ within tardigrades", correctAnswer: "diversity", marks: 1, wordLimit: 3 },
      { blockType: "instruction" as const, content: "<strong>Places tardigrades have been found in:</strong>" },
      { blockType: "question" as const, questionNumber: 9, questionType: "note-completion" as const, questionText: "~tops of ________ like the Himalayas", correctAnswer: "mountains", marks: 1, wordLimit: 3 },
      { blockType: "instruction" as const, content: "<ul><li>oceans</li><li>volcanoes</li></ul>" },
      { blockType: "question" as const, questionNumber: 10, questionType: "note-completion" as const, questionText: "~________ rainforests", correctAnswer: "tropical", marks: 1, wordLimit: 3 },
      { blockType: "instruction" as const, content: "<ul><li>Antarctica</li></ul>" },
    ]},
    // PART 2 — Benzodiazepine addiction (Q11-20)
    { sectionNumber: 2, title: "Part 2", context: "A talk about benzodiazepine addiction and life struggles.", instructions: "Questions 11\u201320", audioUrl: "", questions: [
      { blockType: "instruction" as const, content: "<strong>Questions 11\u201320</strong><br/>Choose the correct letter, <strong>A</strong>, <strong>B</strong> or <strong>C</strong>." },
      { blockType: "instruction" as const, content: "<div style='text-align:center;font-weight:bold;margin:10px 0'>Benzodiazepine addiction and life struggles</div>" },
      { blockType: "question" as const, questionNumber: 11, questionType: "multiple-choice" as const, questionText: "What did the speaker use benzodiazepines for?", options: ["A. insomnia","B. seizure","C. anxiety"], correctAnswer: "C", marks: 1 },
      { blockType: "question" as const, questionNumber: 12, questionType: "multiple-choice" as const, questionText: "The speaker went to hospitals in", options: ["A. USA and Russia.","B. Canada, Russia, and Serbia.","C. USA, Canada, Russia, and Serbia."], correctAnswer: "C", marks: 1 },
      { blockType: "question" as const, questionNumber: 13, questionType: "multiple-choice" as const, questionText: "How did the speaker start using benzodiazepines?", options: ["A. They were prescribed to him.","B. He saw an internet article about them.","C. His family members recommended the drug."], correctAnswer: "A", marks: 1 },
      { blockType: "question" as const, questionNumber: 14, questionType: "multiple-choice" as const, questionText: "Who accompanied the speaker to Russia and Serbia?", options: ["A. Tammy","B. Julian","C. Mikhaila and Andre"], correctAnswer: "C", marks: 1 },
      { blockType: "question" as const, questionNumber: 15, questionType: "multiple-choice" as const, questionText: "Who does the speaker thank for helping him during his illness?", options: ["A. The government","B. Extended family and friends","C. Colleagues"], correctAnswer: "B", marks: 1 },
      { blockType: "question" as const, questionNumber: 16, questionType: "multiple-choice" as const, questionText: "What helped the speaker sustain himself throughout his illness?", options: ["A. movies","B. work","C. sports"], correctAnswer: "B", marks: 1 },
      { blockType: "question" as const, questionNumber: 17, questionType: "multiple-choice" as const, questionText: "The speaker hopes to", options: ["A. return to normal life.","B. start career in teaching.","C. travel abroad for further treatment."], correctAnswer: "A", marks: 1 },
      { blockType: "question" as const, questionNumber: 18, questionType: "multiple-choice" as const, questionText: "In which year did the speaker complete the biblical series devoted to Genesis?", options: ["A. 2017","B. 2018","C. 2019"], correctAnswer: "A", marks: 1 },
      { blockType: "question" as const, questionNumber: 19, questionType: "multiple-choice" as const, questionText: "In the short term, the speaker plans to make videos dedicated to", options: ["A. Exodus.","B. New Testament.","C. Book of Proverbs."], correctAnswer: "C", marks: 1 },
      { blockType: "question" as const, questionNumber: 20, questionType: "multiple-choice" as const, questionText: "Since his illness, the speaker has", options: ["A. lost many subscribers on YouTube.","B. gained more followers on social media.","C. bought many books in multiple languages."], correctAnswer: "B", marks: 1 },
    ]},
    // PART 3 — Increment Training Integrator (Q21-30)
    { sectionNumber: 3, title: "Part 3", context: "Gary discusses the role of an increment training integrator with Alicia and Crystal.", instructions: "Questions 21\u201330", audioUrl: "", questions: [
      { blockType: "instruction" as const, content: "<strong>Questions 21\u201325</strong><br/>Choose the correct letter, <strong>A</strong>, <strong>B</strong> or <strong>C</strong>." },
      { blockType: "question" as const, questionNumber: 21, questionType: "multiple-choice" as const, questionText: "Why were Gary\u2019s colleagues interested in hearing from Alicia and Crystal?", options: ["A. They wanted to find out the details of Alicia\u2019s and Crystal\u2019s jobs.","B. They wanted to work with Alicia and Crystal.","C. They wanted to hire Alicia and Crystal for project management."], correctAnswer: "A", marks: 1 },
      { blockType: "question" as const, questionNumber: 22, questionType: "multiple-choice" as const, questionText: "Gary and Alicia agree that the job of an increment training integrator is similar to", options: ["A. becoming a project manager for someone\u2019s life.","B. training crew members.","C. teaching toddlers."], correctAnswer: "A", marks: 1 },
      { blockType: "question" as const, questionNumber: 23, questionType: "multiple-choice" as const, questionText: "What did Alicia learn from her degree in criminology that helps her in her current job?", options: ["A. taking her job seriously","B. long-term planning","C. negotiation skills"], correctAnswer: "C", marks: 1 },
      { blockType: "question" as const, questionNumber: 24, questionType: "multiple-choice" as const, questionText: "What did Crystal do immediately after graduating in aerospace engineering?", options: ["A. became a mom","B. worked at Johnson Space Center","C. transferred to the crew office"], correctAnswer: "B", marks: 1 },
      { blockType: "question" as const, questionNumber: 25, questionType: "multiple-choice" as const, questionText: "Which experience of motherhood does Crystal bring to her job?", options: ["A. changing plans","B. cooking","C. multitasking"], correctAnswer: "C", marks: 1 },
      { blockType: "instruction" as const, content: "<strong>Questions 26\u201330</strong><br/>Choose <strong>FIVE</strong> letters, <strong>A\u2013H</strong>.<br/>According to Crystal, which <strong>FIVE</strong> of the following are the roles of an increment training integrator?" },
      { blockType: "question" as const, questionNumber: 26, questionType: "multiple-choice-multi" as const, questionText: "Role of an increment training integrator", options: ["A. conduct equipment test","B. develop a weekly calendar","C. collect inputs from various locations","D. ensure astronauts finish training before launch","E. create diet plans","F. schedule international trips","G. design uniforms","H. arrange language training"], correctAnswer: "B", marks: 1 },
      { blockType: "question" as const, questionNumber: 27, questionType: "multiple-choice-multi" as const, questionText: "Role of an increment training integrator", options: ["A. conduct equipment test","B. develop a weekly calendar","C. collect inputs from various locations","D. ensure astronauts finish training before launch","E. create diet plans","F. schedule international trips","G. design uniforms","H. arrange language training"], correctAnswer: "C", marks: 1 },
      { blockType: "question" as const, questionNumber: 28, questionType: "multiple-choice-multi" as const, questionText: "Role of an increment training integrator", options: ["A. conduct equipment test","B. develop a weekly calendar","C. collect inputs from various locations","D. ensure astronauts finish training before launch","E. create diet plans","F. schedule international trips","G. design uniforms","H. arrange language training"], correctAnswer: "D", marks: 1 },
      { blockType: "question" as const, questionNumber: 29, questionType: "multiple-choice-multi" as const, questionText: "Role of an increment training integrator", options: ["A. conduct equipment test","B. develop a weekly calendar","C. collect inputs from various locations","D. ensure astronauts finish training before launch","E. create diet plans","F. schedule international trips","G. design uniforms","H. arrange language training"], correctAnswer: "F", marks: 1 },
      { blockType: "question" as const, questionNumber: 30, questionType: "multiple-choice-multi" as const, questionText: "Role of an increment training integrator", options: ["A. conduct equipment test","B. develop a weekly calendar","C. collect inputs from various locations","D. ensure astronauts finish training before launch","E. create diet plans","F. schedule international trips","G. design uniforms","H. arrange language training"], correctAnswer: "H", marks: 1 },
    ]},
    // PART 4 — From fixed to adjustable reactions (Q31-40)
    { sectionNumber: 4, title: "Part 4", context: "A lecture about fixed vs adjustable physiological reactions.", instructions: "Questions 31\u201340", audioUrl: "", questions: [
      { blockType: "instruction" as const, content: "<strong>Questions 31\u201340</strong><br/>Complete the notes below.<br/>Write <strong>ONE WORD ONLY</strong> for each answer." },
      { blockType: "instruction" as const, content: "<div style='text-align:center;font-weight:bold;margin:10px 0'>From fixed to adjustable reactions</div>" },
      { blockType: "question" as const, questionNumber: 31, questionType: "note-completion" as const, questionText: "~some physiological processes have high sensitivity to environmental change, e.g., glucose metabolism, ________ pressure", correctAnswer: "blood", marks: 1, wordLimit: 1 },
      { blockType: "question" as const, questionNumber: 32, questionType: "note-completion" as const, questionText: "~other processes are insensitive, e.g., DNA ________, purine metabolism", correctAnswer: "replication", marks: 1, wordLimit: 1 },
      { blockType: "instruction" as const, content: "<ul><li>sensitive reactions evolve to be adjustable</li><li>insensitive reactions evolve to be fixed</li></ul>" },
      { blockType: "question" as const, questionNumber: 33, questionType: "note-completion" as const, questionText: "~adjustable reactions can be vulnerable to diseases, e.g., insulin ________", correctAnswer: "resistance", marks: 1, wordLimit: 1 },
      { blockType: "question" as const, questionNumber: 34, questionType: "note-completion" as const, questionText: "~insensitive reactions are vulnerable to genetic ________", correctAnswer: "defect", marks: 1, wordLimit: 1 },
      { blockType: "instruction" as const, content: "<div style='font-weight:bold;margin:10px 0'>Fixed vs adjustable reactions</div>" },
      { blockType: "instruction" as const, content: `<table border='1' style='border-collapse:collapse;width:100%'>
<thead><tr>
<th style='padding:8px;background:#f3f4f6'>Fixed reactions</th>
<th style='padding:8px;background:#f3f4f6'>Adjustable reactions</th>
</tr></thead>
<tbody>
<tr><td style='padding:8px'>operate the same way in any environment</td><td style='padding:8px'>function depends on specific environment</td></tr>
<tr><td style='padding:8px'>control core <strong>[35]</strong> processes</td><td style='padding:8px'>control physiological adaptation</td></tr>
<tr><td style='padding:8px'>affected by <strong>[36]</strong> gene mutations and can cause cystic fibrosis, progeria, SCID, etc.</td><td style='padding:8px'>disrupted by many genes and can increase the risk of obesity, type-2 <strong>[37]</strong>, asthma, etc.</td></tr>
</tbody></table>` },
      { blockType: "question" as const, questionNumber: 35, questionType: "table-completion" as const, questionText: "~Fixed reactions: control core ________ processes", correctAnswer: "biological", marks: 1, wordLimit: 1 },
      { blockType: "question" as const, questionNumber: 36, questionType: "table-completion" as const, questionText: "~Fixed reactions: affected by ________ gene mutations", correctAnswer: "single", marks: 1, wordLimit: 1 },
      { blockType: "question" as const, questionNumber: 37, questionType: "table-completion" as const, questionText: "~Adjustable reactions: risk of obesity, type-2 ________, asthma", correctAnswer: "diabetes", marks: 1, wordLimit: 1 },
      { blockType: "instruction" as const, content: "<div style='font-weight:bold;margin:10px 0'>Characteristics of fixed processes</div><ul><li>core biological processes are fixed</li></ul>" },
      { blockType: "question" as const, questionNumber: 38, questionType: "note-completion" as const, questionText: "~major physiological features are fixed, such as number of heads, ________, arms, digits", correctAnswer: "legs", marks: 1, wordLimit: 1 },
      { blockType: "question" as const, questionNumber: 39, questionType: "note-completion" as const, questionText: "~such as number of heads, legs, arms, digits, and ________", correctAnswer: "eyes", marks: 1, wordLimit: 1 },
      { blockType: "question" as const, questionNumber: 40, questionType: "note-completion" as const, questionText: "~mutations can alter physiological features and cause ________ defects", correctAnswer: "birth", marks: 1, wordLimit: 1 },
    ]},
  ]
};
seed();
