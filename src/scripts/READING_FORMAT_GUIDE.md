# IELTS Academic Reading Test — Complete Upload Guide

> **এই ফাইলটাই SINGLE SOURCE OF TRUTH।**
> নতুন Reading test upload করার আগে এই ফাইল পুরোটা পড়ো।
> কোনো নতুন feature যোগ করতে চাইলে সেই feature এর rendering, schema, এবং backward compatibility সব এখানে document করো।

---

## 📁 FILE LOCATIONS (Important)

| Purpose | File Path |
|---------|-----------|
| **Seed Scripts** | `bestieltsbd_server/src/scripts/seedReadingTestXX.ts` |
| **MongoDB Schema** | `bestieltsbd_server/src/app/modules/reading/reading.model.ts` |
| **Exam Page (Student)** | `bestieltsbd_client/src/app/exam/[examId]/reading/page.jsx` |
| **Admin Create** | `bestieltsbd_client/src/app/dashboard/admin/reading/create/page.jsx` |
| **Admin Edit** | `bestieltsbd_client/src/app/dashboard/admin/reading/edit/[testId]/page.jsx` |
| **This Guide** | `bestieltsbd_server/src/scripts/READING_FORMAT_GUIDE.md` |

---

## ⚠️ DANGER ZONE — কি করা যাবে না

### 1. Exam Page (`page.jsx`) পরিবর্তন করার নিয়ম

```
✅ যা করা যাবে:
- নতুন question type এর জন্য নতুন rendering block যোগ করা (অন্যগুলোর নিচে)
- নতুন field detect করে conditional rendering (if/else)
- Bug fix

❌ যা করা যাবে না:
- আগের কোনো rendering block পরিবর্তন করা (এতে পুরাতন test ভেঙে যাবে)
- Existing field name পরিবর্তন করা
- CSS/style পরিবর্তন যা সব test এ apply হবে (unless intentional)
```

### 2. নতুন Feature যোগ করার 4-Step Process

```
Step 1: Schema Update (reading.model.ts)
   → নতুন field যোগ করো QuestionGroupSchema তে
   → কখনো existing field মুছবে না বা rename করবে না

Step 2: Seed Script
   → নতুন field ব্যবহার করে data তৈরি করো
   → seed script রান করে DB তে data ঢোকাও

Step 3: Exam Page Rendering (page.jsx)
   → নতুন field detect করে conditional rendering যোগ করো
   → MUST: fallback রাখো — নতুন field না থাকলে আগের format এ render হবে
   → কখনো existing rendering code পরিবর্তন করবে না

Step 4: Test & Verify
   → নতুন test + পুরাতন test দুইটাই ব্রাউজারে চেক করো
```

### 3. Backward Compatibility Pattern (MUST FOLLOW)

```javascript
// ✅ CORRECT — নতুন field আছে কিনা চেক করো, না থাকলে আগের format
{group.notesTable && (/* নতুন table rendering */)}
{!group.notesTable && group.passage && (/* আগের passage rendering */)}
{!group.notesTable && !group.passage && (/* আগের notesSections rendering */)}

// ❌ WRONG — আগের code মুছে নতুন code বসানো
{group.notesTable ? (/* table */) : (/* passage */)}  // এটা ভুল কারণ notesSections handle হচ্ছে না
```

---

## 🔑 CRITICAL RULES

1. **Passage Format**: `\n\n` দিয়ে paragraph আলাদা করো। Label `A `, `B ` format এ (space সহ)
2. **Dual Storage**: প্রতিটা test এ `questionGroups` (rendering) + flat `questions` (grading) দুইটাই দরকার
3. **Unique IDs**: `testId`, `testNumber`, `title` অবশ্যই unique হতে হবে
4. **40 Questions**: 3 sections মোট 40 questions (সাধারণত 13 + 13 + 14)
5. **No HTML**: Passage এ কোনো HTML tag (`<b>`, `<br>`, `<strong>`) ব্যবহার করা যাবে না

---

## 📄 PASSAGE FORMAT

### Labeled Paragraphs (A, B, C...)

```
// ✅ CORRECT — "A " format (letter + space), \n\n between paragraphs
passage: `A In Old Slavonic, a language that precedes Russian...\n\nB Because red is a long-wave colour...\n\nC Russians love red...`
```

**কিভাবে render হয়:** Exam page **sequential detection** ব্যবহার করে — paragraph গুলো A, B, C, D... অনুক্রমে শুরু হলে label গুলো **bold + বড় font (20px)** এ render হয়। কোনো extra কিছু করতে হয় না।

**⚠️ নিয়ম (গুরুত্বপূর্ণ):**
- Label গুলো অবশ্যই **sequential** হতে হবে — A দিয়ে শুরু, তারপর B, C, D... ধারাবাহিক ভাবে
- কমপক্ষে **৩টা sequential label (A, B, C)** থাকলে তবেই bold render হবে
- এই sequential check এর কারণে যেসব passage article "A" (যেমন "A company was founded...") দিয়ে শুরু হয় সেগুলো ভুল করে bold হয় না
- ❌ DON'T: `B.\n`, `C.\n` (period + newline format) — এটা ভেঙে যায়
- ✅ DO: `A text...`, `B text...`, `C text...` (letter + space, inline)

### Without Labels (Continuous text)

```
passage: `First paragraph of the passage...\n\nSecond paragraph continues...\n\nThird paragraph concludes...`
```

### Bold Sub-Headings Within Passage (NEW)

কিছু passage এ paragraph label (A, B, C) নেই, কিন্তু ভিতরে sub-heading আছে (যেমন "Butterflies versus Moths")।
এগুলো **bold** দেখাতে `**heading text**` format ব্যবহার করো।

```
// ✅ CORRECT — ** দিয়ে heading wrap করো
passage: `First paragraph text...\n\n**Butterflies versus Moths**\n\nSecond paragraph text...\n\n**The Monarch Butterfly**\n\nThird paragraph text...`
```

**কিভাবে render হয়:** Exam page paragraph split করার পর `**...**` pattern detect করে — heading টাকে **bold + বড় font (17px)** করে দেখায়। সাধারণ paragraph এ কোনো effect পড়ে না।

**⚠️ নিয়ম:**
- পুরো paragraph ই `**` দিয়ে wrapped হতে হবে (শুধু কিছু word না)
- `\n\n` দিয়ে আলাদা paragraph হিসেবে থাকতে হবে
- Labeled paragraphs (A, B, C...) এর সাথে mix করা যায়

### Special Characters

```
Single quote: \u2018 and \u2019
Dash/em-dash: \u2013 or \u2014
Pound sign: \u00a3
```

---

## 📋 QUESTION TYPES — Complete Reference

> প্রতিটা type এর 2 অংশ দরকার:
> 1. **questionGroups entry** — exam page এ render হওয়ার জন্য
> 2. **flat questions entry** — grading/marking এর জন্য

---

### 1. `matching-information` (Match statement → paragraph letter)

```typescript
// questionGroups entry:
{
    groupType: "matching-information",
    startQuestion: 1,
    endQuestion: 8,
    mainInstruction: "Which paragraph contains the following information?",
    subInstruction: "",
    note: "NB You may use any letter more than once.",
    paragraphOptions: ["A", "B", "C", "D", "E", "F", "G", "H"],
    matchingItems: [
        { questionNumber: 1, text: "a reference to...", correctAnswer: "B" },
        { questionNumber: 2, text: "another reference...", correctAnswer: "A" },
    ],
}

// flat questions entry:
{ questionNumber: 1, questionType: "matching-information", questionText: "a reference to...",
  options: ["A","B","C","D","E","F","G","H"], correctAnswer: "B", marks: 1 },
```

---

### 2. `matching-features` (Match statement → person/feature)

```typescript
// questionGroups entry:
{
    groupType: "matching-features",
    startQuestion: 33,
    endQuestion: 36,
    mainInstruction: "Complete each sentence with the correct ending, A-G.",
    featureListTitle: "Sentence Endings",
    featureOptions: [
        { letter: "A", text: "are controlled by Broca\u2019s area." },
        { letter: "B", text: "may be..." },
    ],
    matchingItems: [
        { questionNumber: 33, text: "In Wernicke\u2019s area, our thoughts", correctAnswer: "F" },
    ],
}

// flat questions entry:
{ questionNumber: 33, questionType: "matching-features", questionText: "In Wernicke\u2019s area...",
  options: ["A","B","C","D","E","F","G"], correctAnswer: "F", marks: 1 },
```

---

### 3. `matching-headings` (Match heading → paragraph)

```typescript
// questionGroups entry:
{
    groupType: "matching-headings",
    startQuestion: 1,
    endQuestion: 6,
    mainInstruction: "Reading Passage 1 has seven sections, A-G.",
    subInstruction: "Choose the correct heading for sections B-G.",
    featureListTitle: "List of Headings",
    headingsList: [
        { numeral: "i", text: "The uses of red" },
        { numeral: "ii", text: "Russian and English views of red" },
        { numeral: "iii", text: "Red and beauty" },
        // ... more headings (usually 8-10 options)
    ],
    paragraphOptions: ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"],
    // OPTIONAL: pre-answered example displayed at top (NEW — added 2026-04-21)
    exampleItems: [
        { text: "Paragraph B", answer: "iii" },
    ],
    matchingItems: [
        { questionNumber: 1, text: "Section B", correctAnswer: "iv" },
        { questionNumber: 2, text: "Section C", correctAnswer: "i" },
    ],
}

// flat questions entry:
{ questionNumber: 1, questionType: "matching-headings", questionText: "Section B",
  options: ["i","ii","iii","iv","v","vi","vii","viii","ix","x"], correctAnswer: "iv", marks: 1 },
```

**`exampleItems` (NEW feature):**
- যখন original test এ "Example: Paragraph B — iii" এরকম pre-answered একটা paragraph দেখায়
- এটা question count এ add হবে না (শুধু display purpose)
- `matchingItems` এ ওই paragraph বাদ দিতে হবে (বাকি paragraph গুলোর জন্য question)
- Exam page এ dashed border + "Example" label সহ আলাদা box এ render হয়
- Backward-compatible: `exampleItems` না থাকলে আগের মতই render হবে

---

### 4. `note-completion` — ⭐ 3 FORMATS SUPPORTED

> **গুরুত্বপূর্ণ:** note-completion এ 3টা different rendering format আছে।
> শুধু একটা ব্যবহার করো — mixed করো না।

#### Format A: `notesTable` (TABLE format — 2-column) ← নতুন

যখন original question এ TABLE দেখায় (বাম দিকে category, ডান দিকে content/bullets)।

**Schema requirement:** `notesTable` field অবশ্যই `reading.model.ts` এর `QuestionGroupSchema` তে registered থাকতে হবে।

```typescript
// questionGroups entry:
{
    groupType: "note-completion",
    startQuestion: 7,
    endQuestion: 12,
    mainInstruction: "Choose ONE WORD OR A NUMBER from the passage for each answer.",
    subInstruction: "Write your answers in boxes 7-12 on your answer sheet.",
    mainHeading: "Red in Russian Art",
    notesTable: [
        {
            title: "Russian Applied Arts",    // Table header (dark background)
            rows: [
                // OPTION 1: content (single line text with blanks)
                { label: "Household goods:", content: "Red wooden objects, figurines, & embroidered 7 __________" },
                { label: "Garments:", content: "Red coats, dresses, headdresses, shawls & scarves" },
            ]
        },
        {
            title: "Russian Fine Arts",
            rows: [
                // OPTION 2: bullets (multiple bullet points)
                { label: "Painting: Icon", bullets: [
                    "Red, white & gold = main colours",
                    "8 __________-century Novgorod icon of St George in red",
                    "Christ, saints, angels & mother of Christ in red",
                    "Fires of Hell = red"
                ]},
                { label: "Portrait", bullets: [
                    "1840s Gogol painted with red 9 __________, like figures in icons",
                    "1696 Turgenev & mid-1760s Talyzin in red coats",
                ]},
                // Label with blank inside it:
                { label: "Social 11 __________:", bullets: [
                    "Lots of red in Rutkovsky's 1934 painting",
                    "Zhilinsky's 12 __________ Gymnasts of the USSR"
                ]}
            ]
        }
    ],
}
```

**Blank format:** `7 __________` (question number + space + 10 underscores)

**Row structure:**
| Field | কখন ব্যবহার করবে |
|-------|-------------------|
| `label` | বাম column — category name (bold দেখায়) |
| `content` | ডান column — single line text |
| `bullets` | ডান column — bullet point list |

> ⚠️ একই row তে `content` আর `bullets` দুইটা ব্যবহার করো না।

---

#### Format B: `passage` (PASSAGE format — headings + bullets)

যখন original question এ table নেই, শুধু heading ও bullets দেখায়।

```typescript
{
    groupType: "note-completion",
    startQuestion: 9,
    endQuestion: 13,
    mainInstruction: "Complete the notes below.",
    subInstruction: "Choose ONE WORD ONLY from the passage for each answer.",
    mainHeading: "Genetically Modified Crops",
    passage: `Concerns about GM crops\n\n• Wind can carry 9 __________ from GM plants\n• Risk of 10 __________ from chemicals\n\nArguments in favour\n\n• Crops have increased resistance to 12 __________`,
}
```

**Rendering rules:**
- Short line without bullet/blank → **HEADING** (bold, uppercase)
- Line starting with `•` or `-` → **BULLET** with indent
- `N __________` pattern → **INPUT BOX** with question number

---

#### Format C: `notesSections` (STRUCTURED format — programmatic)

এটা legacy format — নতুন test এ ব্যবহার না করাই ভালো।

```typescript
{
    groupType: "note-completion",
    notesSections: [
        {
            subHeading: "Section Title",
            bullets: [
                { type: "context", text: "Plain text line" },
                { type: "question", questionNumber: 9, textBefore: "Wind can carry", textAfter: "from plants" },
            ]
        }
    ]
}
```

---

#### Flat questions for note-completion (ALL formats):

```typescript
{ questionNumber: 7, questionType: "note-completion", questionText: "embroidered __________",
  correctAnswer: "cloths", acceptableAnswers: ["cloths"], marks: 1 },
{ questionNumber: 8, questionType: "note-completion", questionText: "________-century Novgorod",
  correctAnswer: "15th", acceptableAnswers: ["15th"], marks: 1 },
```

---

### 5. `true-false-not-given`

```typescript
// questionGroups entry:
{
    groupType: "true-false-not-given",
    startQuestion: 27,
    endQuestion: 32,
    mainInstruction: "Do the following statements agree with the information given in the passage?",
    subInstruction: "Write TRUE, FALSE or NOT GIVEN.",
    statements: [
        { questionNumber: 27, text: "The statement text here.", correctAnswer: "TRUE" },
        { questionNumber: 28, text: "Another statement.", correctAnswer: "FALSE" },
        { questionNumber: 29, text: "Yet another.", correctAnswer: "NOT GIVEN" },
    ],
}

// flat questions entry:
{ questionNumber: 27, questionType: "true-false-not-given", questionText: "The statement text.",
  options: ["TRUE","FALSE","NOT GIVEN"], correctAnswer: "TRUE", marks: 1 },
```

---

### 6. `yes-no-not-given`

```typescript
// questionGroups entry:
{
    groupType: "yes-no-not-given",
    startQuestion: 27,
    endQuestion: 32,
    mainInstruction: "Do the following statements agree with the views of the writer?",
    subInstruction: "Write YES, NO or NOT GIVEN.",
    statements: [
        { questionNumber: 27, text: "Our inner voice can sometimes distract us.", correctAnswer: "NOT GIVEN" },
        { questionNumber: 28, text: "Mind reading has positive implications.", correctAnswer: "YES" },
    ],
}

// flat questions entry:
{ questionNumber: 27, questionType: "yes-no-not-given", questionText: "Our inner voice...",
  options: ["YES","NO","NOT GIVEN"], correctAnswer: "NOT GIVEN", marks: 1 },
```

---

### 7. `multiple-choice-full` (MCQ with A/B/C/D)

```typescript
// questionGroups entry:
{
    groupType: "multiple-choice-full",
    startQuestion: 37,
    endQuestion: 40,
    mainInstruction: "Choose the correct letter, A, B, C or D.",
    mcQuestions: [
        {
            questionNumber: 37,
            questionText: "What does 'broke new ground' mean?",
            options: [
                { letter: "A", text: "built on the work of others" },
                { letter: "B", text: "produced unusual results" },
                { letter: "C", text: "proved earlier theories false" },
                { letter: "D", text: "achieved something new" },
            ],
            correctAnswer: "D",
        },
    ],
}

// flat questions entry:
{ questionNumber: 37, questionType: "multiple-choice-full", questionText: "What does 'broke new ground' mean?",
  correctAnswer: "D", marks: 1 },
```

---

### 8. `choose-two-letters` (Choose 2 or 3 from A-F)

> **System:** এই type এ প্রতিটা correct answer আলাদা question number পায়।
> যেমন "Choose TWO letters" = 2 question numbers

```typescript
// questionGroups entry:
{
    groupType: "choose-two-letters",
    startQuestion: 13,
    endQuestion: 14,
    mainInstruction: "Choose TWO letters, A-E.",
    questionSets: [
        {
            questionNumbers: [13, 14],
            questionText: "Which TWO associations are mentioned by the writer?",
            options: [
                { letter: "A", text: "danger" },
                { letter: "B", text: "wealth" },
                { letter: "C", text: "intelligence" },
                { letter: "D", text: "faith" },
                { letter: "E", text: "energy" },
            ],
            correctAnswers: ["D", "E"],    // sorted alphabetically
        },
    ],
}

// flat questions entry (ONE per question number):
{ questionNumber: 13, questionType: "choose-two-letters", questionText: "Which TWO?",
  options: ["A","B","C","D","E"], correctAnswer: "D", marks: 1 },
{ questionNumber: 14, questionType: "choose-two-letters", questionText: "Which TWO?",
  options: ["A","B","C","D","E"], correctAnswer: "E", marks: 1 },
```

---

### 9. `sentence-completion`

```typescript
// questionGroups entry:
{
    groupType: "sentence-completion",
    startQuestion: 20,
    endQuestion: 26,
    mainInstruction: "Complete the sentences.",
    subInstruction: "Choose NO MORE THAN THREE WORDS from the passage for each answer.",
    statements: [
        { questionNumber: 20, text: "The official _________ says that anti-social behaviour...", correctAnswer: "definition" },
    ],
}

// flat questions entry:
{ questionNumber: 20, questionType: "sentence-completion", questionText: "The official ___ says...",
  correctAnswer: "definition", marks: 1 },
```

---

### 10. `short-answer`

```typescript
// questionGroups entry:
{
    groupType: "short-answer",
    startQuestion: 35,
    endQuestion: 40,
    mainInstruction: "Answer the questions below.",
    subInstruction: "Choose NO MORE THAN THREE WORDS from the passage for each answer.",
    questions: [
        { questionNumber: 35, questionText: "What did Charles disguise himself as?", correctAnswer: "a servant" },
    ],
}

// flat questions entry:
{ questionNumber: 35, questionType: "short-answer", questionText: "What did Charles disguise himself as?",
  correctAnswer: "a servant", marks: 1 },
```

---

### 11. `summary-completion` (Complete summary with blanks)

```typescript
{
    groupType: "summary-completion",
    startQuestion: 7,
    endQuestion: 13,
    mainInstruction: "Complete the summary below.",
    subInstruction: "Choose ONE WORD ONLY from the passage for each answer.",
    mainHeading: "Summary Title",
    summarySegments: [
        { type: "text", content: "The first part of the narrative text" },
        { type: "blank", questionNumber: 7, correctAnswer: "word" },
        { type: "text", content: "continuation of narrative" },
        { type: "blank", questionNumber: 8, correctAnswer: "another" },
    ],
}
```

---

### 12. `summary-with-options` (Summary + word list)

```typescript
{
    groupType: "summary-with-options",
    startQuestion: 7,
    endQuestion: 10,
    mainInstruction: "Complete the summary using the list of words below.",
    phraseList: [
        { letter: "A", text: "word1" },
        { letter: "B", text: "word2" },
    ],
    mainHeading: "Summary Heading",
    summarySegments: [
        { type: "text", content: "Narrative text" },
        { type: "blank", questionNumber: 7, correctAnswer: "A" },
    ],
}
```

---

### 13. `flow-chart-completion` (Generic, data-driven flow-chart — NEW)

যখন passage থেকে তথ্য দিয়ে একটা stage-wise flow-chart পূরণ করতে হয় (e.g. Novice → Journeyman → Expert)। Stage গুলোর মাঝে ↓ arrow থাকে।

**Schema requirement:** `flowchartStages` field `reading.model.ts` এর `QuestionGroupSchema` তে registered (added 2026-04-21)।

```typescript
{
    groupType: "flow-chart-completion",
    startQuestion: 14,
    endQuestion: 18,
    mainInstruction: "Complete the flow-chart below.",
    subInstruction: "Choose NO MORE THAN THREE WORDS from the passage for each answer.",
    flowchartStages: [
        {
            label: "Novice",   // stage heading shown bold at start of first line
            lines: [
                {
                    segments: [
                        { type: "text", content: "Novice: needs " },
                        { type: "blank", questionNumber: 14, width: 110 },
                        { type: "text", content: " and " },
                        { type: "blank", questionNumber: 14, width: 110 }, // same qNum = same answer synced
                        { type: "text", content: " to perform a given task;" },
                    ],
                },
                { segments: [{ type: "text", content: "exposed to specific cases;" }] },
                {
                    segments: [
                        { type: "text", content: "guided by a " },
                        { type: "blank", questionNumber: 15, width: 110 },
                        { type: "text", content: " through learning" },
                    ],
                },
            ],
        },
        { label: "Journeyman", lines: [ /* ... */ ] },
        { label: "Expert", lines: [ /* ... */ ] },
    ],
}
```

**Rendering rules:**
- Each stage → boxed container with text + input blanks
- Between stages → vertical ↓ arrow automatically drawn
- Segment `type: "text"` → plain text span (bold if matches stage label at start)
- Segment `type: "blank"` → input bound to `answers[questionNumber]`
- `width` (optional, default 110) → input box width in px
- `subIndex` (optional, default 0) → multi-part blanks for same question (e.g. "needs 14 ___ and ___")
  - Each blank gets its own input box (user types separately)
  - Values combined into `answers[qNum]` using group-level `joinSeparator` (default `" and "`)
  - Marking is ONE answer per `questionNumber` (combined string)
  - Example: first blank (subIndex 0) = "guiding principles", second blank (subIndex 1) = "rules" → `answers[14] = "guiding principles and rules"`
- `joinSeparator` at group level → custom separator for multi-part blanks (default `" and "`)

**flat questions entry:**
```typescript
{ questionNumber: 14, questionType: "flow-chart-completion", questionText: "needs ___ and ___", correctAnswer: "...", marks: 1 },
```

**⚠️ নিয়ম:**
- `custom-flowchart-1` (Mock 01 এর hardcoded version) পরিবর্তন করবে না — এটা শুধু Mock 01 এর জন্য
- নতুন test এ সবসময় `flow-chart-completion` (generic) ব্যবহার করবে
- Backend server restart লাগবে schema change pick up করার জন্য (ts-node-dev auto-restart করে)

---

### 14. `table-completion` (Fill blanks in a table — legacy)

```typescript
{
    groupType: "table-completion",
    startQuestion: 1,
    endQuestion: 5,
    mainInstruction: "Complete the table below.",
    subInstruction: "Choose ONE WORD ONLY from the passage.",
    tableTitle: "Table Title",
    columns: ["Category", "Detail 1", "Detail 2"],
    rows: [
        { label: "Row 1", cells: [{ content: "text 1 __________" }, { content: "other text" }] },
    ],
    answers: [
        { questionNumber: 1, correctAnswer: "word1" },
    ],
}
```

---

## 🗄️ MONGODB SCHEMA — QuestionGroupSchema Fields

> `reading.model.ts` → `QuestionGroupSchema` তে যেসব field registered আছে শুধু সেগুলোই DB তে save হয়।
> নতুন field যোগ করতে হলে MUST schema তে add করতে হবে।

```
groupType           → string (question type identifier)
startQuestion       → number
endQuestion         → number
mainInstruction     → string
subInstruction      → string
mainHeading         → string
note                → string ("NB You may use any letter more than once.")

passage             → string (note-completion passage format)
notesSections       → array (note-completion structured format)
notesTable          → array (note-completion TABLE format — NEW)

optionsExplanation  → array (for TFNG/YNNG)
statements          → array (for TFNG/YNNG/sentence-completion)
paragraphOptions    → array of strings
matchingItems       → array (for matching-info/features/headings)
featureListTitle    → string
featureOptions      → array (for matching-features)
headingsList        → array (for matching-headings)
exampleItems        → array (for matching-headings example display — NEW 2026-04-21)
flowchartStages     → array (for flow-chart-completion — NEW 2026-04-21)
summarySegments     → array (for summary-completion)
questionSets        → array (for choose-two-letters)
phraseList          → array (for summary-with-options)
mcQuestions         → array (for multiple-choice-full)

// Legacy fields:
questionType        → string
instructions        → string
headings            → array
wordList            → array
questions           → array
markers             → array
```

### নতুন Field যোগ করার পদ্ধতি:

```typescript
// reading.model.ts → QuestionGroupSchema এ যোগ করো:

// উদাহরণ: notesTable field
notesTable: [{
    title: { type: String },
    rows: [{
        label: { type: String },
        content: { type: String },
        bullets: [{ type: String }]
    }]
}],
```

---

## 🏗️ SEED SCRIPT TEMPLATE

```typescript
import mongoose from "mongoose";
import { ReadingTest } from "../app/modules/reading/reading.model";
import { User } from "../app/modules/user/user.model";
import config from "../app/config";

const readingTest = {
    testId: "READING_ACADEMIC_0XX",       // CHANGE: XX = test number
    testNumber: XX,                        // CHANGE: unique number
    title: "Academic Reading Mock Test XX",
    description: "Academic Reading Test with 3 passages and 40 questions",
    source: "Academic Reading Practice",
    testType: "academic",
    difficulty: "medium",
    isActive: true,
    duration: 60,
    totalQuestions: 40,
    totalMarks: 40,
    sections: [
        // SECTION 1 (Q1-13)
        {
            sectionNumber: 1,
            title: "Passage 1 Title",
            instructions: "You should spend about 20 minutes on Questions 1-13.",
            passage: `A First paragraph...\n\nB Second paragraph...`,
            questionGroups: [
                // ADD QUESTION GROUPS HERE
            ],
            questions: [
                // ADD FLAT QUESTIONS HERE (for grading)
            ],
        },
        // SECTION 2 (Q14-26)
        {
            sectionNumber: 2,
            title: "Passage 2 Title",
            instructions: "You should spend about 20 minutes on Questions 14-26.",
            passage: `Passage text here...`,
            questionGroups: [],
            questions: [],
        },
        // SECTION 3 (Q27-40)
        {
            sectionNumber: 3,
            title: "Passage 3 Title",
            instructions: "You should spend about 20 minutes on Questions 27-40.",
            passage: `Passage text here...`,
            questionGroups: [],
            questions: [],
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
            console.log(`✅ Test ${readingTest.testNumber} UPDATED!`);
        } else {
            const admin = await User.findOne({ role: "admin" });
            if (!admin) { console.log("❌ No admin user"); process.exit(1); }
            await ReadingTest.create({ ...readingTest, createdBy: admin._id });
            console.log(`✅ Test ${readingTest.testNumber} CREATED!`);
        }

        // Verify
        const test = await ReadingTest.findOne({ testNumber: readingTest.testNumber });
        if (test) {
            const sections = (test as any).sections || [];
            console.log(`\n📊 Verification:`);
            sections.forEach((s: any, i: number) => {
                console.log(`  Section ${i+1}: ${s.title} | Groups: ${s.questionGroups?.length} | Qs: ${s.questions?.length}`);
            });
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}
seedTest();
```

### Run command:
```bash
npx ts-node src/scripts/seedReadingTestXX.ts
```

---

## 🖥️ EXAM PAGE RENDERING — কিভাবে কাজ করে

### Passage (LEFT side)

```
passage field → split by \n\n → each paragraph is a <p>
↓
paragraph starts with "A ", "B "...?
├── YES → <span style="bold, 20px">{label}</span> + rest of text
└── NO  → simple <p>{text}</p>
```

### Questions (RIGHT side)

```
questionGroups array → loop each group
↓
groupType / questionType check
├── "note-completion"
│   ├── notesTable exists?  → TABLE rendering (2-column)
│   ├── passage exists?     → PASSAGE rendering (headings + bullets)
│   └── notesSections?      → NOTES rendering (structured)
│
├── "matching-headings"     → Headings list + dropdown per question
├── "matching-information"  → Paragraph dropdown per question
├── "matching-features"     → Feature list + dropdown per question
├── "true-false-not-given"  → Radio buttons (TRUE/FALSE/NOT GIVEN)
├── "yes-no-not-given"      → Radio buttons (YES/NO/NOT GIVEN)
├── "multiple-choice-full"  → MCQ with A/B/C/D radio buttons
├── "choose-two-letters"    → Checkbox options
├── "sentence-completion"   → Text input per question
├── "short-answer"          → Text input per question
├── "summary-completion"    → Inline text segments + input boxes
├── "summary-with-options"  → Word list + inline blanks
└── "flow-chart-completion" → Stages in boxes with ↓ arrows, mixed text/blank segments
```

---

## ✅ PRE-UPLOAD CHECKLIST

Run করার আগে এই checklist verify করো:

- [ ] `testNumber` এবং `testId` unique এবং correct
- [ ] Passage: `\n\n` paragraph separator, `A ` format labels (no HTML!)
- [ ] প্রতি section এ `questionGroups` + `questions` দুইটাই আছে
- [ ] Total questions = 40 (সব 3 section মিলে)
- [ ] Question numbers 1-40 sequential, কোনো gap নেই
- [ ] `correctAnswer` value answer key এর সাথে exactly match করে
- [ ] `groupType` supported types এর মধ্যে আছে
- [ ] Special characters Unicode escape ব্যবহার করেছে
- [ ] নতুন field ব্যবহার করলে `reading.model.ts` schema তে registered আছে
- [ ] পুরাতন tests ভাঙেনি (অন্য test browser এ চেক করো)

---

## 🔄 COMMON MISTAKES & FIXES

### ❌ Data save হচ্ছে কিন্তু API দিয়ে আসছে না
**কারণ:** নতুন field `reading.model.ts` schema তে নেই
**Fix:** Schema তে field যোগ করো → server restart → re-seed

### ❌ Exam page এ question দেখাচ্ছে না
**কারণ:** `groupType` mismatch বা exam page এ rendering block নেই
**Fix:** `groupType` value verify করো, exam page এ ওই type এর rendering block আছে কিনা চেক করো

### ❌ পুরাতন test ভেঙে গেছে
**কারণ:** Exam page এ existing rendering code পরিবর্তন করা হয়েছে
**Fix:** Git restore করে আগের code ফিরিয়ে আনো, তারপর শুধু নতুন block যোগ করো
