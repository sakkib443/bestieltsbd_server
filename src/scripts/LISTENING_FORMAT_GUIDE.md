# IELTS Listening Test — Complete Upload Guide

> **এই ফাইলটাই SINGLE SOURCE OF TRUTH।**
> নতুন Listening test upload করার আগে পুরো ফাইল পড়ো।
> নতুন question type বা feature যোগ করলে MUST এখানে update করো — rendering, schema, backward compatibility সব।
> AI দিয়ে question upload করতে চাইলে এই ফাইল পুরোটা AI-কে context হিসেবে দিলে A-Z বুঝতে পারবে।

---

## 📁 FILE LOCATIONS (Important)

| Purpose | File Path |
|---------|-----------|
| **Seed Scripts** | `bestieltsbd_server/src/scripts/seedListeningTestXX.ts` |
| **MongoDB Schema** | `bestieltsbd_server/src/app/modules/listening/listening.model.ts` |
| **TypeScript Interface** | `bestieltsbd_server/src/app/modules/listening/listening.interface.ts` |
| **Grading Service** | `bestieltsbd_server/src/app/modules/listening/listening.service.ts` |
| **Routes** | `bestieltsbd_server/src/app/modules/listening/listening.route.ts` |
| **Exam Page (Student)** | `bestieltsbd_client/src/app/exam/[examId]/listening/page.jsx` |
| **Admin Create** | `bestieltsbd_client/src/app/dashboard/admin/listening/create/page.jsx` |
| **Admin Edit** | `bestieltsbd_client/src/app/dashboard/admin/listening/edit/[testId]/page.jsx` |
| **Source Materials** | `bestieltsbd_client/public/mock/mock-XX/listening.docx` (or `.rtf`) |
| **Answer Keys** | `bestieltsbd_client/public/mock/mock-XX/*.ANS.docx` (যখন আলাদা থাকে) |
| **This Guide** | `bestieltsbd_server/src/scripts/LISTENING_FORMAT_GUIDE.md` |

---

## ⚠️ DANGER ZONE — কি করা যাবে, কি যাবে না

### 1. Exam Page (`page.jsx`) পরিবর্তন করার নিয়ম

```
✅ যা করা যাবে:
- নতুন question type এর জন্য নতুন rendering block যোগ করা (existing block-গুলোর নিচে)
- InstructionWithPortals component-এ নতুন pattern detect করে conditional rendering
- Bug fix যা শুধু নির্দিষ্ট edge case-এ affect করে
- নতুন HTML tag support যোগ করা global style-এ

❌ যা করা যাবে না:
- আগের কোনো rendering block-এর logic পরিবর্তন (পুরাতন test ভেঙে যাবে)
- Existing field name rename (blockType, questionType, questionText ইত্যাদি)
- [N] placeholder regex পরিবর্তন (সব table/form rendering ভাঙবে)
- buildRenderGroups-এর grouping rules বদলানো
- Global CSS যা সব question type-এ apply হবে (intentional না হলে)
```

### 2. নতুন Question Type / Feature যোগ করার 4-Step Process

```
Step 1: Interface & Schema Update
   → listening.interface.ts এ ListeningQuestionType union-এ নতুন type যোগ করো
   → listening.model.ts এর ListeningQuestionSchema enum-এ নতুন type যোগ করো
   → কখনো existing type মুছবে না বা rename করবে না

Step 2: Seed Script
   → নতুন type ব্যবহার করে data তৈরি করো (INTERLEAVED pattern)
   → Local DB-তে seed script রান করে verify করো

Step 3: Exam Page Rendering (page.jsx)
   → buildRenderGroups-এ grouping rule যোগ করো (যদি group রাখতে হয়)
   → নতুন renderGroups.map() এর block-এ নতুন grp.type check যোগ করো
   → MUST: existing rendering code পরিবর্তন করবে না
   → MUST: fallback thinking — পুরাতন test এ এই type না থাকলে কি হবে

Step 4: Test & Verify
   → নতুন test + পুরাতন test দুইটাই browser-এ চেক করো
   → Admin preview দিয়ে mock grading যাচাই করো
```

### 3. Backward Compatibility Pattern (MUST FOLLOW)

```javascript
// ✅ CORRECT — নতুন pattern আছে কিনা চেক করো, না থাকলে আগের behavior
if (grp.type === 'new-question-type' && firstB.newSpecialField) {
    return (/* নতুন rendering */);
}
// ... আগের rendering blocks অপরিবর্তিত থাকবে

// ❌ WRONG — আগের code-এর মধ্যে bolt-in হ্যাক
if (grp.type === 'matching') {
    if (firstB.newFlag) { /* hack */ } else { /* old */ }  // এতে পুরাতন কোড complex হয়ে যায়
}
```

---

## 🔑 CRITICAL RULES

1. **Structure**: ঠিক **4 sections** (Part 1–4), প্রতি section-এ 10 questions, total **40 questions**
2. **Flat Questions Array**: Reading-এর মতো `questionGroups` নেই — প্রতি section-এ শুধুই `questions[]` array; এতে `instruction` এবং `question` blocks interleave করে থাকবে
3. **INTERLEAVED Pattern**: Context lines → instruction block, blanks → question block, alternating order-এ
4. **NO `[N]` Placeholders in Instructions — UNLESS inside `<table>`**: সাধারণ text-এ `[N]` লিখলে problem হয়; শুধু table/form cell-এর মধ্যে allowed (তখন InstructionWithPortals automatic input বসায়)
5. **Unique IDs**: `testId` (LISTENING_0XX), `testNumber` (int), `title` — তিনটাই unique হতে হবে
6. **Upsert Logic**: Seed script-এ `testNumber` দিয়ে existing check — duplicate create হবে না
7. **Answer Format**: প্রতিটা question block-এ `questionNumber`, `questionType`, `correctAnswer` অবশ্যই থাকতে হবে (placeholder `"TBD"` রেখে upload করা যাবে না — grading fail হবে)
8. **Case-Insensitive Grading**: Backend automatic lowercase + trim + punctuation strip করে — কিন্তু seed-এ clean format-এ লেখাই ভাল

---

## 🏗️ DATA STRUCTURE OVERVIEW

```
ListeningTest
├── testId: "LISTENING_0XX"        (unique)
├── testNumber: XX                  (unique int)
├── title, description, source
├── mainAudioUrl, audioDuration
├── testType: "academic" | "general-training"
├── difficulty, duration, totalQuestions (40), totalMarks (40)
├── isActive, usageCount
└── sections[]                      (ঠিক 4টা)
    ├── sectionNumber (1-4)
    ├── title ("Part 1")
    ├── context (description)
    ├── instructions ("Questions 1-10")
    ├── audioUrl (optional — per-section)
    ├── imageUrl (optional — map/diagram)
    └── questions[]                 (mixed blocks)
        ├── { blockType: "instruction", content: "<html...>" }
        └── { blockType: "question", questionNumber: N,
               questionType, questionText, options?,
               correctAnswer, acceptableAnswers?, marks, wordLimit? }
```

---

## ⚠️ WRONG vs CORRECT Pattern

### ❌ WRONG — সাধারণ text-এ `[N]` placeholder

```typescript
// BAD! এতে rendering ভাঙে
{
    blockType: "instruction",
    content: "<ul><li>Name: <strong>[1]</strong></li><li>Phone: <strong>[2]</strong></li></ul>"
}
```

> **কেন ভুল:** `<ul><li>` এর মধ্যে `[N]` থাকলে InstructionWithPortals বুঝতে পারে না কোথায় input বসাবে; রঙ/spacing ভাঙে। `<table>` cell ব্যতিক্রম (নিচে দেখো)।

### ✅ CORRECT — Interleaved instruction + question blocks

```typescript
// 1. Context lines as instruction
{ blockType: "instruction", content: "<ul><li>Name of scientist: Dr Thomas Boothby</li></ul>" },

// 2. Blank as question
{ blockType: "question", questionNumber: 1, questionType: "note-completion",
  questionText: "Experiment site: International ________ Station",
  correctAnswer: "Space", marks: 1, wordLimit: 3 },

// 3. Next blank
{ blockType: "question", questionNumber: 2, questionType: "note-completion",
  questionText: "Work began in ________",
  correctAnswer: "2015", marks: 1, wordLimit: 3 },

// 4. More context lines as instruction
{ blockType: "instruction", content: "<ul><li>Also called water bears</li></ul>" },

// 5. Next blank
{ blockType: "question", questionNumber: 3, /* ... */ },
```

### ✅ EXCEPTION — `<table>` এর মধ্যে `[N]` allowed

Table/form rendering এর জন্য `[N]` placeholder intentional এবং সমর্থিত। InstructionWithPortals automatic inline input বসায়।

```typescript
{ blockType: "instruction",
  content: `<table border='1' style='border-collapse:collapse;width:100%'>
    <tbody>
      <tr><td>Name:</td><td><strong>[1]</strong></td></tr>
      <tr><td>DOB:</td><td><strong>[2]</strong> 1989</td></tr>
    </tbody></table>` },

// Grading-এর জন্য তারপরেই question blocks:
{ blockType: "question", questionNumber: 1, questionType: "form-completion",
  questionText: "Name: ________", correctAnswer: "Simon Lee", marks: 1, wordLimit: 3 },
{ blockType: "question", questionNumber: 2, questionType: "form-completion",
  questionText: "DOB: ________", correctAnswer: "15 March", marks: 1, wordLimit: 3 },
```

---

## 🔧 `[N]` PLACEHOLDER MECHANISM — কীভাবে কাজ করে

`page.jsx` এর `InstructionWithPortals` component HTML content scan করে এই regex দিয়ে:

```javascript
/(?:<strong>\s*)?\[(\d+)\](?:\s*<\/strong>)?/g
```

প্রতিটা `[N]` বা `<strong>[N]</strong>` কে automatically convert করে একটা inline `<input>` element-এ, যার সাথে:
- Border + number label (input খালি থাকলে number দেখা যায়)
- User টাইপ করলে number hide হয়ে value দেখা যায়
- Value bind হয় `answers[N]` state-এ

**যা allowed:**
- `<td>[1]</td>` ✅
- `<td><strong>[1]</strong></td>` ✅
- `<td><strong>[1]</strong> 1989</td>` ✅ (prefix/suffix text allowed)
- `<span>[1]</span>` ✅ (inline-flex inside any text container)

**যা avoid করতে হবে:**
- Same `[N]` একাধিক জায়গায় (একই instruction block-এ) — দুটোই একই state-এ bind হবে ⚠️
- `<ul><li>` এর direct ভেতরে `[N]` (instead — item-কে question block বানাও)
- `N` বাদে কোনো non-numeric bracket content (e.g., `[a]`, `[first]`) — regex মিলবে না

**Pre-scan:** `page.jsx` একটা `embeddedQNums` Set তৈরি করে যেখানে instruction-এ `[N]` হিসেবে থাকা সব question number রাখা হয়। এই numbers এর আলাদা question block থাকলেও সেগুলো skip করে — কারণ input already instruction-এ render হচ্ছে। এই কারণেই table-completion/form-completion এ instruction `[N]` + question block দুটোই লাগে (একটা UI-র জন্য, আরেকটা grading-র জন্য)।

---

## 🎨 SMART SPACING — Heading Auto-Detection

`InstructionWithPortals` content pattern দেখে automatically margin adjust করে:

| Pattern | Classified as | Top Margin | Bottom Margin |
|---------|---------------|------------|----------------|
| `<strong>TITLE</strong>` (nothing else) | Main Heading | 32px | 5px |
| `<strong>Sub-heading</strong>...` (শুরুতে strong + আরো content) | Sub-Heading | 18px | 4px |
| `<ul>...` (শুরু পুরা list) | Pure List | 0px | 2px |
| Other HTML | Body text | 6px | 4px |

**Implication:** heading আলাদা instruction block-এ রাখলে proper spacing-সহ রেন্ডার হবে। মূল heading-কে body text-এর সাথে মেশাবে না।

```typescript
// ✅ ঠিকঠাক — heading আলাদা block
{ blockType: "instruction", content: "<strong>PATIENT RECORD</strong>" },
{ blockType: "instruction", content: "<ul><li>Name: Dr Boothby</li></ul>" },

// ❌ ভুল — মিশিয়ে দিলে spacing গড়বড় হবে
{ blockType: "instruction", content: "<strong>PATIENT RECORD</strong><ul><li>Name: Dr Boothby</li></ul>" },
```

---

## 🌐 SUPPORTED HTML TAGS

Instruction block-এর `content` field-এ এই tags সমর্থিত ও styled:

```
<strong>text</strong>           — Bold
<b>text</b>                     — Bold (same as strong)
<em>text</em>                   — Italic
<br/> বা <br>                  — Line break
<ul><li>...</li></ul>          — Bulleted list (disc style, padding-left: 22px)
<ol><li>...</li></ol>          — Numbered list
<table>, <thead>, <tbody>,
<tr>, <th>, <td>               — Full table support (auto-styled border + padding)
<span style="...">             — Inline styling
<img src="...">                — Image (but prefer imageUrl field on question block)
[N]                            — Auto-replaced inline input (inside any inline position)
```

**⚠️ Avoid:**
- `<script>`, `<style>` — filtered বা CSP block করবে
- Arbitrary custom `class="..."` — শুধু built-in utility classes কাজ করবে (নিচে list দেখো)
- Deep nested divs — InstructionWithPortals CSS override করতে পারে

**✅ Available utility classes (built-in, use করতে পারো):**
- `.ielts-form-box` — bordered form container (PATIENT RECORD, BOOKING FORM, ইত্যাদি)
- `.ielts-form-title` — centered bold title (box-এর উপরে)
- `.ielts-form-row` — single row inside form box (label: value pattern)

নিচের "IELTS FORM BOX PATTERN" section দেখো details এর জন্য।

---

## 📐 IELTS FORM BOX PATTERN (PATIENT RECORD / BOOKING FORM / etc.)

IELTS listening Part 1-এ খুব common — একটা bordered box যেখানে "PATIENT RECORD" বা "BOOKING FORM" এই ধরনের title + label:value rows থাকে।

### ❌ পুরনো পদ্ধতি (DO NOT USE — grid/table look আসে):

```html
<table border='1' style='border-collapse:collapse;width:100%'>
<tbody>
<tr><td>Given names:</td><td>Simon <strong>[1]</strong></td></tr>
<tr><td>Family name:</td><td>Lee</td></tr>
</tbody></table>
```
সমস্যা: প্রতিটা cell-এ border থাকে → spreadsheet-এর মতো দেখায়, IELTS look না।

### ✅ নতুন পদ্ধতি — `.ielts-form-box` class:

```html
<div class='ielts-form-box'>
  <div class='ielts-form-title'>PATIENT RECORD</div>
  <div class='ielts-form-row'>Time of appointment: <strong>10:00 am</strong></div>
  <div class='ielts-form-row'>Given names: Simon <strong>[1]</strong></div>
  <div class='ielts-form-row'>Family name: Lee</div>
  <div class='ielts-form-row'>Date of birth: <strong>[2]</strong> 1989</div>
</div>
```

Render হবে:
- একটাই outer border (clean IELTS look)
- Title centered + bold উপরে
- প্রতিটা row simple single-line: `Label: value` pattern
- `[N]` placeholder → bold number + dotted-underline input field

### 🎨 Example Row (IELTS-এ "(Example)" এর জন্য)

```html
<div class='ielts-form-row' style='opacity:0.75;font-style:italic'>
  Name of tour: Magic One Day <em>(Example)</em>
</div>
```

Effect: slightly faded + italic → example রো clearly আলাদা দেখাবে।

### 📏 Sub-heading inside form box (যেমন "Personal details")

```html
<div class='ielts-form-box'>
  <div class='ielts-form-title'>Ascot Child Care Centre Enrolment Form</div>
  <div style='font-weight:700;margin:8px 0 6px'>Personal details</div>
  <div class='ielts-form-row'>Family name: Cullen</div>
  <div class='ielts-form-row'>Child's first name: <strong>[1]</strong></div>
</div>
```

### 🚨 কখন `.ielts-form-box` ব্যবহার করবে না:

- **Data tables** (comparison, schedule, multi-column data) → regular `<table>` রাখো
- **Tables with `<thead>` header** (column titles row) → regular `<table>`
- **3+ column layouts** → regular `<table>`

শুধু IELTS-style **2-column form** (label | value/blank) এর জন্য `.ielts-form-box` use করবে।

### 🔽 Flow-chart Pattern (single box with arrows)

IELTS flow-chart (e.g., "How running water is provided") — ❌ আলাদা আলাদা bordered boxes করবে না। ✅ `.ielts-form-box` reuse করে single outer box + centered steps + downward arrow (`\u2193`) ব্যবহার করো।

```html
<div class='ielts-form-box' style='max-width:480px'>
  <div class='ielts-form-title'>How running water is provided</div>
  <div style='text-align:center;margin:8px 0'>Water taken from the <strong>[18]</strong> by bullocks.</div>
  <div style='text-align:center;font-size:22px;line-height:1;margin:2px 0'>↓</div>
  <div style='text-align:center;margin:8px 0'>Water <u>channelled</u> into the <strong>[19]</strong></div>
  <div style='text-align:center;font-size:22px;line-height:1;margin:2px 0'>↓</div>
  <div style='text-align:center;margin:8px 0'>Water piped to the <strong>[20]</strong></div>
</div>
```

**Key points:**
- `\u2193` (↓) Unicode character use করো downward arrow-এর জন্য
- Steps centered, `font-size:22px` + `line-height:1` arrow-এর জন্য compact দেখাবে
- `max-width:480px` flow-chart narrow দেখাবে (full form-box চেয়ে ছোট)
- Internal borders নেই — শুধু outer `.ielts-form-box` border

### 🔧 CSS Reference (page.jsx-এ defined)

```css
.ielts-form-box {
    border: 1.5px solid currentColor;
    padding: 20px 28px;
    max-width: 620px;
    margin: 12px 0;
}
.ielts-form-title {
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.4px;
    margin-bottom: 16px;
}
.ielts-form-row {
    margin-bottom: 10px;
    line-height: 1.9;
}
```

### 💡 Input Rendering (`[N]` placeholder)

Form box-এর ভেতরে (এবং যেকোনো instruction-এ) `[N]` এই placeholder-টা auto-convert হয়:

```html
Given names: Simon <strong>[1]</strong>
```

Render output:
```
Given names: Simon  1 ____________
                    ↑  ↑
                  bold  dotted-underline input
                  qnum  (user types here)
```

Number সবসময় visible থাকে (type করলেও hide হয় না) — exact IELTS-booklet look।

---

## 📋 QUESTION TYPES — Complete Reference

### 1. `note-completion` (Fill blanks in notes)

Note/list-style blanks। Plain text এর মধ্যে `________` (underscore) দিয়ে blank indicate করবে।

#### 🚨 Bullet Prefix Rule — NEVER add `•` / `\u2022` / `-` manually in questionText

`NoteCompletionRow` automatically renders a bullet (`•`) before every note-completion question. If তুমি questionText-এর শুরুতে `•` বসাও, তাহলে **double bullet (••)** দেখা যাবে।

| Pattern | Behavior | Use |
|---------|----------|-----|
| `"Express train leaves at ________"` | ✅ Auto-bullet added | Standard notes (Q1-5 style) |
| `"~Bus cash fare: ________"` | ✅ No bullet (leading `~` suppresses) | Table-completion recap, dense row captions |
| `"\u2022 Express train..."` or `"• Express train..."` | ❌ DOUBLE bullet (•• Express...) | **NEVER** |
| `"- Express train..."` | ❌ Dash shows + bullet | **NEVER** |

**Rule:** Plain text only. Renderer handles the bullet. For labeled "bullet-less" text (inside tables/compact cells), prefix with `~`. Actual bullet list items in an instruction block use `<div>` or `<ul>/<li>`, never inside a question's `questionText`.

**Real bug (Test 12 Q1-5, 2026-04-21):** `questionText: "\u2022 Express train leaves at ________"` → rendered as `•• Express train...`. Fixed by removing the leading `\u2022 `.

```typescript
// Heading
{ blockType: "instruction" as const,
  content: "<strong>Questions 1\u20136</strong><br/>Complete the notes below.<br/>Write <strong>NO MORE THAN THREE WORDS AND/OR A NUMBER</strong> for each answer." },

// Section heading
{ blockType: "instruction" as const, content: "<strong>Notes on Customer Information</strong>" },

// Context line before first blank
{ blockType: "instruction" as const,
  content: "<ul><li><em>Example:</em> Found in brochure</li></ul>" },

// Q1 blank — NO manual bullet prefix
{ blockType: "question" as const, questionNumber: 1,
  questionType: "note-completion" as const,
  questionText: "Included services: ________ and accommodation",
  correctAnswer: "flights", marks: 1, wordLimit: 1 },

// Context between blanks
{ blockType: "instruction" as const, content: "<ul><li>Good admin skills required</li></ul>" },

// Q2 blank
{ blockType: "question" as const, questionNumber: 2,
  questionType: "note-completion" as const,
  questionText: "Must have good ________ skills",
  correctAnswer: "communication", marks: 1, wordLimit: 1 },
```

#### 📍 Section Heading Alignment — Default left, NEVER center

Notes-এর উপরে section heading (যেমন `"Destination: Harbour City"`, `"Personal details"`, `"Notes on ..."`) — **default left-aligned রাখতে হবে**। `text-align:center` দিলে heading wide container-এ ডানে দেখা যায় এবং inconsistent দেখায়।

**WRONG:**
```typescript
content: "<div style='text-align:center;font-weight:bold;margin:10px 0'>Destination: Harbour City</div>"
```
→ Heading ডানে চলে যায় যখন viewport wide।

**CORRECT:**
```typescript
content: "<div style='font-weight:bold;margin:10px 0'>Destination: Harbour City</div>"
// বা simply
content: "<strong>Destination: Harbour City</strong>"
```

`text-align:center` শুধু তখনই use করো যখন সেটা সত্যিই centered title (যেমন matching options box-এর "List of Features" title)।

---

### 2. `form-completion` (Fill form fields)

Form/table-এ blanks। সাধারণত `<table>` + `[N]` placeholder instruction-এ, plus question blocks grading-এর জন্য।

```typescript
{ blockType: "instruction" as const,
  content: "<strong>Questions 1\u20136</strong><br/>Complete the form below.<br/>Write <strong>NO MORE THAN THREE WORDS AND/OR A NUMBER</strong>." },

{ blockType: "instruction" as const, content: "<strong>PATIENT RECORD</strong>" },

{ blockType: "instruction" as const,
  content: `<table border='1' style='border-collapse:collapse;width:100%'>
<tbody>
<tr><td style='padding:8px;width:45%'>Time of appointment:</td><td style='padding:8px'>10:00 am</td></tr>
<tr><td style='padding:8px'>Given names:</td><td style='padding:8px'>Simon <strong>[1]</strong></td></tr>
<tr><td style='padding:8px'>Family name:</td><td style='padding:8px'>Lee</td></tr>
<tr><td style='padding:8px'>Date of birth:</td><td style='padding:8px'><strong>[2]</strong> 1989</td></tr>
<tr><td style='padding:8px'>Address:</td><td style='padding:8px'><strong>[3]</strong> Adams Terrace, Wellington</td></tr>
</tbody></table>` },

// Grading blocks (UI already rendered in table above)
{ blockType: "question" as const, questionNumber: 1, questionType: "form-completion" as const,
  questionText: "Given names: Simon ________",
  correctAnswer: "Lee", marks: 1, wordLimit: 2 },
{ blockType: "question" as const, questionNumber: 2, questionType: "form-completion" as const,
  questionText: "Date of birth: ________ 1989",
  correctAnswer: "15 March", marks: 1, wordLimit: 2 },
{ blockType: "question" as const, questionNumber: 3, questionType: "form-completion" as const,
  questionText: "Address: ________ Adams Terrace",
  correctAnswer: "47", marks: 1, wordLimit: 2 },
```

---

### 3. `sentence-completion` (Complete sentences)

Plain sentences with blanks — note-completion এর মতো কিন্তু context line-গুলো আলাদা heading-এর নিচে না।

```typescript
{ blockType: "instruction" as const,
  content: "<strong>Questions 7\u201310</strong><br/>Complete the sentences below.<br/>Write <strong>NO MORE THAN TWO WORDS</strong> for each answer." },

{ blockType: "question" as const, questionNumber: 7, questionType: "sentence-completion" as const,
  questionText: "The tour lasts approximately ________ hours.",
  correctAnswer: "three", marks: 1, wordLimit: 2 },

{ blockType: "question" as const, questionNumber: 8, questionType: "sentence-completion" as const,
  questionText: "Bookings must be made ________ in advance.",
  correctAnswer: "two weeks", marks: 1, wordLimit: 2 },
```

---

### 4. `table-completion` (Fill table blanks)

`<table>` + embedded `[N]` placeholders.

```typescript
{ blockType: "instruction" as const,
  content: "<strong>Questions 15\u201320</strong><br/>Complete the table below. Write <strong>ONE WORD ONLY</strong> for each answer." },

{ blockType: "instruction" as const,
  content: `<table border='1' style='border-collapse:collapse;width:100%'>
<thead><tr>
  <th style='padding:8px;background:#f3f4f6'>Day</th>
  <th style='padding:8px;background:#f3f4f6'>Activity</th>
  <th style='padding:8px;background:#f3f4f6'>Cost</th>
</tr></thead>
<tbody>
<tr><td style='padding:8px'>Day 1</td><td style='padding:8px'>View of the <strong>[15]</strong></td><td style='padding:8px'>£20</td></tr>
<tr><td style='padding:8px'>Day 2</td><td style='padding:8px'>Founded in <strong>[16]</strong></td><td style='padding:8px'>Free</td></tr>
<tr><td style='padding:8px'>Day 3</td><td style='padding:8px'><strong>[17]</strong> Museum</td><td style='padding:8px'>£<strong>[18]</strong></td></tr>
</tbody></table>` },

// Grading blocks
{ blockType: "question" as const, questionNumber: 15, questionType: "table-completion" as const,
  questionText: "View of the ________", correctAnswer: "river", marks: 1, wordLimit: 1 },
{ blockType: "question" as const, questionNumber: 16, questionType: "table-completion" as const,
  questionText: "Founded in ________", correctAnswer: "979", marks: 1, wordLimit: 1 },
```

#### 🚨 Wide Table Rule — 4+ columns-এ overflow হয়, MUST use fixed layout

যে table-এ **4 বা তার বেশি column** আছে, সেটা default `width:100%` দিলেও ভেতরের text দীর্ঘ হলে column-গুলা overflow হয়ে ডান পাশে কেটে যায় ও horizontal scroll আসে। Listening exam-এ এটা unacceptable।

**Rule:** 4+ column table-এর জন্য এই 4টা জিনিস লাগবেই:

1. `table-layout:fixed` — প্রতিটা column-কে নির্দিষ্ট width-এ আটকে রাখে
2. `<colgroup>` with percentage widths — ১০০% মিলিয়ে দিতে হবে
3. `font-size:13px` (default 16px এর বদলে) — narrow column-এ content fit হয়
4. `word-wrap:break-word` (ও padding `6px` default `8px` এর বদলে) — দীর্ঘ text একাধিক line-এ ভাঙে

```typescript
// ❌ WRONG — wide table overflows
content: `<table border='1' style='border-collapse:collapse;width:100%'>
<thead><tr>
<th style='padding:8px;background:#f3f4f6'>Address</th>
<th style='padding:8px;background:#f3f4f6'>Open Hours</th>
<th style='padding:8px;background:#f3f4f6'>Days</th>
<th style='padding:8px;background:#f3f4f6'>Tube Station</th>
</tr></thead>...`

// ✅ CORRECT — fixed layout + colgroup + break-word
content: `<table border='1' style='border-collapse:collapse;width:100%;table-layout:fixed;font-size:13px'>
<colgroup><col style='width:26%'/><col style='width:22%'/><col style='width:28%'/><col style='width:24%'/></colgroup>
<thead><tr>
<th style='padding:6px;background:#f3f4f6;word-wrap:break-word'>Address</th>
<th style='padding:6px;background:#f3f4f6;word-wrap:break-word'>Open Hours</th>
<th style='padding:6px;background:#f3f4f6;word-wrap:break-word'>Days</th>
<th style='padding:6px;background:#f3f4f6;word-wrap:break-word'>Tube Station</th>
</tr></thead>
<tbody>
<tr><td style='padding:6px;word-wrap:break-word'>...</td>...</tr>
</tbody></table>`
```

**Column width picking strategy:**
- প্রথমে column header-এর length estimate করো, sum = 100%
- Longer content যে column-এ, সেটাকে বেশি % দাও (25-30%)
- Short fixed values (number/percent) যে column-এ, কম % দাও (15-20%)
- 5-column wide table-এ default `20% × 5` নিরাপদ fallback
- 4-column wide-এ `22% / 26% / 28% / 24%` bias content-heavy columns

**কখন simple default যথেষ্ট:** 2-3 column table-এ `width:100%` একাই ঠিক কাজ করে — fixed layout লাগবে না।

**Real bug (Test 13 Q11-16, 2026-04-21):** 5-column radio survey table-এ last column [15]/[16] viewport-এর বাইরে চলে গেছিল, horizontal scroll এসেছিল। Fixed layout + colgroup দিয়ে সমাধান।

---

### 5. `summary-completion` / `flow-chart-completion`

note-completion-এর মতোই pattern — শুধু `questionType` আলাদা। যদি flow-chart হিসেবে render করতে হয় আলাদা visual style-এ তাহলে এখন listening page এ support সীমিত — plain blanks হিসেবে আসবে।

```typescript
{ blockType: "instruction" as const,
  content: "<strong>Questions 25\u201330</strong><br/>Complete the flow-chart. Write <strong>ONE WORD ONLY</strong>." },

{ blockType: "instruction" as const,
  content: "<strong>Research Procedure</strong><br/>Collect samples \u2192 <strong>[25]</strong> analysis \u2192 Review" },

{ blockType: "question" as const, questionNumber: 25, questionType: "flow-chart-completion" as const,
  questionText: "Perform ________ analysis",
  correctAnswer: "statistical", marks: 1, wordLimit: 1 },
```

---

### 6. `multiple-choice` (Single answer MCQ: A/B/C)

```typescript
{ blockType: "instruction" as const,
  content: "<strong>Questions 11\u201314</strong><br/>Choose the correct letter, <strong>A</strong>, <strong>B</strong> or <strong>C</strong>." },

{ blockType: "question" as const, questionNumber: 11, questionType: "multiple-choice" as const,
  questionText: "According to the speaker, the company",
  options: [
    "A. has been in business for longer than most of its competitors.",
    "B. arranges holidays to more destinations than its competitors.",
    "C. has more customers than its competitors."
  ],
  correctAnswer: "A", marks: 1 },

{ blockType: "question" as const, questionNumber: 12, questionType: "multiple-choice" as const,
  questionText: "What does the speaker say about the hotel?",
  options: [
    "A. It is near the beach.",
    "B. It has a swimming pool.",
    "C. It is in the city centre."
  ],
  correctAnswer: "C", marks: 1 },
```

**⚠️ নিয়ম:**
- প্রতিটা option `"<letter>. <text>"` format-এ (letter + dot + space + text)
- `correctAnswer` শুধু letter ("A"/"B"/"C"/"D")
- `options` array-এ maximum 5 items (A-E); save শুধু 3 (A-C) বা 4 (A-D) common

---

### 7. `multiple-choice-multi` (Choose TWO letters)

যখন user-কে 2 (বা 3) letters বাছাই করতে হয়। প্রতিটা correct letter-কে আলাদা question number বরাদ্দ।

```typescript
{ blockType: "instruction" as const,
  content: "<strong>Questions 29\u201330</strong><br/>Choose <strong>TWO</strong> letters, A-E.<br/><br/>Which TWO experiences were valuable?" },

// Q29: first correct letter
{ blockType: "question" as const, questionNumber: 29, questionType: "multiple-choice-multi" as const,
  questionText: "Which TWO experiences were valuable?",
  options: [
    "A. learning to share",
    "B. standing up for oneself",
    "C. putting up with each other",
    "D. finding out what is important",
    "E. learning to be a good loser"
  ],
  correctAnswer: "B", marks: 1 },

// Q30: second correct letter (same options!)
{ blockType: "question" as const, questionNumber: 30, questionType: "multiple-choice-multi" as const,
  questionText: "Which TWO experiences were valuable?",
  options: [
    "A. learning to share", "B. standing up for oneself", "C. putting up with each other",
    "D. finding out what is important", "E. learning to be a good loser"
  ],
  correctAnswer: "D", marks: 1 },
```

**⚠️ নিয়ম:**
- সব questionNumbers-এ identical `options` এবং `questionText` দিতে হবে — page.jsx buildRenderGroups একটাই block-এ merge করে
- correctAnswers sorted order-এ নাও লিখলে সমস্যা নেই (page.jsx independently check করে প্রত্যেকটা)
- Student যখন একটা letter click করে, প্রথম খালি slot-এ বসে — order-insensitive grading

---

### 8. `matching` (Match items from a list)

```typescript
{ blockType: "instruction" as const,
  content: `<strong>Questions 21\u201326</strong><br/>Choose SIX answers from the box.<br/><br/>
<strong>Personality Traits</strong><br/>
A &nbsp; outgoing<br/>
B &nbsp; selfish<br/>
C &nbsp; independent<br/>
D &nbsp; attention-seeking<br/>
E &nbsp; introverted<br/>
F &nbsp; co-operative<br/>
G &nbsp; caring<br/>
H &nbsp; competitive` },

{ blockType: "question" as const, questionNumber: 21, questionType: "matching" as const,
  questionText: "the eldest child",
  options: ["A", "B", "C", "D", "E", "F", "G", "H"],
  correctAnswer: "G", marks: 1 },

{ blockType: "question" as const, questionNumber: 22, questionType: "matching" as const,
  questionText: "the middle child",
  options: ["A", "B", "C", "D", "E", "F", "G", "H"],
  correctAnswer: "E", marks: 1 },
```

**⚠️ নিয়ম:**
- Options array শুধু letters — actual text instruction-এ থাকে
- প্রতিটা matching question-এ সব available letters পাঠাতে হবে options-এ (page dropdown render করে)
- Letter একাধিকবার ব্যবহৃত হতে পারে কিনা — sometimes "You may use any letter more than once" — instruction-এ উল্লেখ করবে

### 🎯 Options Rendering — Two Patterns (IMPORTANT — duplicate avoid করতে)

page.jsx `hasLongOpts` check করে: যদি কোনো option-এর length > 4 characters হয়, তখন **auto** একটা options box render করে। এর কারণে দুইটা pattern follow করতে হবে:

#### Pattern A: Full-text options (A. Japan, B. China, ...)

```typescript
// ❌ DO NOT add a manual options box in instruction — page.jsx auto-renders → DUPLICATE হবে
{ blockType: "instruction", content: "<strong>Questions 25\u201330</strong>..." },
// ❌ এই box সরাও:
// { blockType: "instruction", content: "<div style='border:1px solid #d1d5db;...'>
//     <div><strong>A</strong> Japan</div>... </div>" }

{ blockType: "question", questionNumber: 25, questionType: "matching",
  questionText: "They grow the most rice in the world.",
  options: ["A. Japan", "B. China", "C. Thailand"],  // full text
  correctAnswer: "B", marks: 1 },
```

Page.jsx auto-renders:
- Outer bordered box (480px max-width)
- প্রতিটা option: `A | Japan` format, border-bottom divider সহ
- কোনো title দেখায় না

#### Pattern B: Letter-only options (A, B, C, ...)

```typescript
// ✅ Manual options box LAGE — page.jsx auto-render করে না
{ blockType: "instruction", content: "<strong>Questions 16\u201320</strong>..." },
{ blockType: "instruction",
  content: `<div style='margin:8px 0;padding:10px;border:1px solid #d1d5db'>
<div><strong>A</strong> &nbsp; jogging machines</div>
<div><strong>B</strong> &nbsp; Yoga studio</div>
...
</div>` },

{ blockType: "question", questionNumber: 16, questionType: "matching",
  questionText: "developing confidence?",
  options: ["A", "B", "C", "D", "E", "F", "G"],  // letter only
  correctAnswer: "C", marks: 1 },
```

**Decision rule:**
- Options এ full text থাকলে (Pattern A) → manual box সরাও, page.jsx handle করবে
- Options শুধু letters থাকলে (Pattern B) → manual box রাখো (text কোথাও না কোথাও দেখাতে হবে)

**Pattern A তে title লাগলে** (e.g., "List of Features") → title আলাদা instruction block-এ রাখো:

```typescript
{ blockType: "instruction",
  content: `<div style='text-align:center;font-weight:bold;margin:10px 0;text-transform:uppercase;font-style:italic'>List of Features</div>` },
// তারপর question blocks — page.jsx options box নিচে render করবে
```

---

### 9. `matching-features` / `matching-headings`

`matching`-এর variant — rendering same (dropdown), শুধু semantics আলাদা। Audio transcript-এ features/headings match করতে হয়।

```typescript
{ blockType: "question" as const, questionNumber: 33, questionType: "matching-features" as const,
  questionText: "Peter's suggestion",
  options: ["A", "B", "C", "D", "E"],
  correctAnswer: "C", marks: 1 },
```

---

### 10. `map-labeling` / `plan-labeling` / `diagram-labeling`

Image-ভিত্তিক labeling। Section-level OR question-level image দুটোই allowed।

**Section-level image (সব labels এক ছবিতে):**

```typescript
// Section image — section object-এর top-level field
{
  sectionNumber: 2,
  title: "Part 2",
  context: "Campus tour description",
  instructions: "Questions 11-20",
  audioUrl: "",
  imageUrl: "https://your-cdn.com/campus-map.jpg",  // ← Section-level
  questions: [
    { blockType: "instruction" as const,
      content: "<strong>Questions 15\u201320</strong><br/>Label the map below. Choose the correct letter, A-I." },
    { blockType: "question" as const, questionNumber: 15, questionType: "map-labeling" as const,
      questionText: "Library",
      options: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
      correctAnswer: "C", marks: 1 },
    // ... more labels
  ]
}
```

**Question-level image (প্রতিটা label-এর আলাদা image, rare):**

```typescript
{ blockType: "question" as const, questionNumber: 15, questionType: "diagram-labeling" as const,
  questionText: "The valve",
  options: ["A", "B", "C", "D"],
  correctAnswer: "B", marks: 1,
  imageUrl: "https://your-cdn.com/diagram-zoom-1.jpg" },
```

**⚠️ নিয়ম:**
- `options` array এ letters ঢুকাতে হবে যা map/diagram-এ দেখানো হয়েছে (e.g., ["A","B","C","D","E","F","G","H","I"])
- `map-labeling`: outdoor map (campus, town, park)
- `plan-labeling`: indoor plan (building, floor, museum)
- `diagram-labeling`: technical diagram (machine, plant, cycle)
- তিনটারই rendering identical dropdown — শুধু source/semantics আলাদা

### 🎯 Smart Rendering Rules (page.jsx automatic)

`map-labeling` / `plan-labeling` / `diagram-labeling` group-এ page.jsx এই smart rules apply করে:

1. **Image discovery:** `imageUrl` group-এর **সব blocks**-এ search হয় (শুধু first block নয়) — যে block-এই থাকুক পাবে।
   - Prefer: section-level `imageUrl` (সব labels এক ছবিতে)
   - Fallback: group-এর first question block-এ `imageUrl` (Q13-এ set করলেই পুরো Q13-16 group পাবে)

2. **Question text cleaning:** `questionText` থেকে automatically strip হয়:
   - Leading `"N:"` prefix (e.g., `"13: Building"` → `"Building"`)
   - Trailing `_____` blanks (e.g., `"Building _____"` → `"Building"`)
   - Duplicate number display এড়ানোর জন্য

3. **Conditional input:**
   - যদি `options` array থাকে (letters A-I) → dropdown render হয়
   - যদি `options` **খালি/undefined** হয় → dotted-underline text input render হয় (user নিজে word লিখবে)

```typescript
// Example: Plan labeling WITHOUT options (user types word)
{ blockType: "question", questionNumber: 13, questionType: "plan-labeling",
  questionText: "Building",
  correctAnswer: "Reception", marks: 1, wordLimit: 2,
  imageUrl: "/images/listening/test11-part2-plan.png" },

// Example: Plan labeling WITH options (dropdown)
{ blockType: "question", questionNumber: 13, questionType: "plan-labeling",
  questionText: "Reception",
  options: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  correctAnswer: "C", marks: 1 },
```

---

### 11. `short-answer` (Write short answers)

```typescript
{ blockType: "instruction" as const,
  content: "<strong>Questions 35\u201337</strong><br/>Answer the questions below.<br/>Write <strong>NO MORE THAN THREE WORDS</strong>." },

{ blockType: "question" as const, questionNumber: 35, questionType: "short-answer" as const,
  questionText: "What is the main cause of the disease?",
  correctAnswer: "pollution", marks: 1, wordLimit: 3 },

{ blockType: "question" as const, questionNumber: 36, questionType: "short-answer" as const,
  questionText: "Where was the research conducted?",
  correctAnswer: "in Iceland",
  acceptableAnswers: ["Iceland", "in Iceland"],
  marks: 1, wordLimit: 3 },
```

**🎨 Rendering layout (auto-detected by page.jsx):**

Short-answer question যার `questionText`-এ inline `___` blank নেই, সেটা **2-line layout**-এ render হয়:

```
 35  What is the main cause of the disease?
     _______________________________
     ↑ dotted underline input (no border box)
```

- Bold question number (no bullet, no list)
- Question text পাশে same line-এ
- Answer input **নিচে new line**-এ, dotted underline style
- যদি `questionText`-এ `___` থাকে (যেমন `"Work began in ___"`), তাহলে note-completion-এর মতো inline blank behavior

**⚠️ নিয়ম:**
- Short-answer-এ `questionText` পুরো question হিসেবে লেখো (blank ছাড়া) → 2-line layout আসবে
- যদি partial text + blank pattern চাও (rare), তখন `___` include করো → inline layout আসবে
- Bullets/list items কখনো wrap করবে না; plain question text রাখো

---

## 🎯 GRADING & ANSWER NORMALIZATION

Backend [`listening.service.ts`](bestieltsbd_server/src/app/modules/listening/listening.service.ts) এর `gradeListeningAnswers` function প্রতিটা student answer compare করার আগে normalize করে:

```typescript
const normalizeAnswer = (ans) =>
    ans?.toLowerCase().trim().replace(/[.,!?]/g, "");
```

**অর্থাৎ backend automatically:**
1. Lowercase করে (`"Space"` → `"space"`)
2. Leading/trailing space trim করে
3. পূর্ণবিরাম `. , ! ?` সরিয়ে দেয়

**Match priority:**

```
1. correctAnswer এর সাথে exact match (after normalize)?
   → YES: ✓ correct
   → NO:  go to step 2
2. correctAnswer array হলে, array-এর কোনোটার সাথে match?
   → YES: ✓ correct
3. acceptableAnswers[] array-এ কোনোটার সাথে match?
   → YES: ✓ correct
   → NO:  ✗ incorrect
```

### `correctAnswer` field types

```typescript
// String (single accepted answer)
correctAnswer: "flights"

// String array (multiple accepted — OR logic)
correctAnswer: ["colleague", "co-worker", "coworker"]
```

### `acceptableAnswers` field (variations)

Singular/plural, hyphenation, optional article handling-এর জন্য:

```typescript
{
  questionNumber: 5,
  correctAnswer: "car park",
  acceptableAnswers: ["carpark", "car-park", "car parks", "carparks"],
  // Student যেকোনোটা লিখলে ✓
}
```

**⚠️ নিয়ম:**
- প্রতিটা acceptable variation আলাদা string হিসেবে list-এ দাও — backend comma-split করে না
- Case মাথায় রাখতে হবে না (auto-lowercase)
- Punctuation মাথায় রাখতে হবে না (auto-strip)
- Numbers: `"1989"` vs `"nineteen eighty-nine"` — দুটোই accept করতে চাইলে দুটোই acceptableAnswers-এ রাখো

### Band Score Conversion

`listening.interface.ts`-এ `LISTENING_BAND_CONVERSION` map থেকে:

| Correct | Band |
|---------|------|
| 39-40 | 9.0 |
| 37-38 | 8.5 |
| 35-36 | 8.0 |
| 33-34 | 7.5 |
| 30-32 | 7.0 |
| 27-29 | 6.5 |
| 23-26 | 6.0 |
| 18-22 | 5.5 |
| 16-17 | 5.0 |
| 13-15 | 4.5 |

Full mapping interface file-এ; grading automatic এটা apply করে।

---

## 🗄️ MONGODB SCHEMA — ListeningQuestionSchema Fields

> `listening.model.ts` → schema-তে registered শুধু এই fields-ই DB-তে save হয়।
> নতুন field যোগ করতে হলে MUST schema-তে add করতে হবে — না হলে silently drop হবে।

```
// Block-level
blockType          → enum ["question", "instruction"] (default: "question")
content            → string (instruction blocks এর HTML content)

// Question-level
questionNumber     → number (instruction-এ optional, question-এ required)
questionType       → enum (12 types — দেখো নিচের list)
questionText       → string
options            → [string]
correctAnswer      → Schema.Types.Mixed (string বা string[])
acceptableAnswers  → [string]
audioTimestamp     → string (optional — "mm:ss" format)
imageUrl           → string (per-question image)
wordLimit          → number
marks              → number (default: 1)
explanation        → string (optional — review purpose)
```

### Supported `questionType` enum

```
"multiple-choice", "multiple-choice-multi",
"matching", "map-labeling", "diagram-labeling", "plan-labeling",
"form-completion", "note-completion", "table-completion",
"flow-chart-completion", "summary-completion",
"sentence-completion", "short-answer"
```

### নতুন Field যোগ করার পদ্ধতি

```typescript
// listening.interface.ts:
export interface IListeningQuestion {
    // existing fields...
    newFeatureField?: string;
}

// listening.model.ts → ListeningQuestionSchema এ:
newFeatureField: { type: String, required: false },

// তারপর server restart লাগবে (ts-node-dev auto-reload করে)
// এবং seed script পুনরায় রান করতে হবে
```

---

## 🏗️ SEED SCRIPT TEMPLATE

```typescript
import mongoose from "mongoose";
import config from "../app/config";
import { ListeningTest } from "../app/modules/listening/listening.model";

async function seedListeningTestXX() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("Connected to MongoDB");

        const existing = await ListeningTest.findOne({ testNumber: XX });
        if (existing) {
            console.log("Listening Test already exists. Updating...");
            await ListeningTest.findByIdAndUpdate(existing._id, listeningTestData, { runValidators: false });
            console.log("\u2705 Listening Test XX updated!");
        } else {
            const db = mongoose.connection.db!;
            const adminUser = await db.collection("users").findOne({ role: "admin" });
            const createdBy = adminUser?._id || new mongoose.Types.ObjectId();
            await ListeningTest.create({ ...listeningTestData, createdBy });
            console.log("\u2705 Listening Test XX created!");
        }

        // Verify
        const test = await ListeningTest.findOne({ testNumber: XX });
        if (test) {
            console.log(`\n\uD83D\uDCDD Test: ${test.title}`);
            (test.sections as any[]).forEach((s, i) => {
                const qs = s.questions.filter((q: any) => q.blockType === "question");
                console.log(`  Part ${i + 1}: ${qs.length} questions`);
            });
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("\u274C Error:", error);
        process.exit(1);
    }
}

const listeningTestData = {
    testId: "LISTENING_0XX",           // CHANGE: XX = zero-padded test number (e.g., 011, 012)
    testNumber: XX,                    // CHANGE: unique int
    title: "Listening Mock Test XX \u2013 Academic",
    description: "IELTS Academic Listening Test XX \u2014 4 parts, 40 questions.",
    source: "IELTS Practice Test",
    mainAudioUrl: "",                  // ভবিষ্যতে audio host করে URL বসাও
    audioDuration: 1800,               // seconds (30 minutes standard)
    testType: "academic" as const,     // or "general-training"
    difficulty: "medium" as const,
    totalQuestions: 40,
    totalMarks: 40,
    duration: 40,                      // 30 min audio + 10 min transfer
    isActive: true,
    usageCount: 0,
    sections: [
        // \u2550\u2550\u2550 PART 1 (Q1\u201310) \u2550\u2550\u2550
        {
            sectionNumber: 1,
            title: "Part 1",
            context: "Brief description of the audio scenario",
            instructions: "Questions 1\u201310",
            audioUrl: "",
            questions: [
                // Main instruction
                { blockType: "instruction" as const,
                  content: "<strong>Questions 1\u201310</strong><br/>Complete the notes below.<br/>Write <strong>NO MORE THAN THREE WORDS AND/OR A NUMBER</strong> for each answer." },

                // Heading
                { blockType: "instruction" as const, content: "<strong>Title Goes Here</strong>" },

                // Context line(s) before first blank
                { blockType: "instruction" as const, content: "<ul><li>Context info</li></ul>" },

                // Q1 blank
                { blockType: "question" as const, questionNumber: 1,
                  questionType: "note-completion" as const,
                  questionText: "First blank: ________",
                  correctAnswer: "answer1", marks: 1, wordLimit: 3 },

                // ... continue alternating instruction + question blocks
            ]
        },

        // \u2550\u2550\u2550 PART 2 (Q11\u201320) \u2550\u2550\u2550
        { sectionNumber: 2, title: "Part 2", context: "...", instructions: "Questions 11\u201320",
          audioUrl: "", questions: [] },

        // \u2550\u2550\u2550 PART 3 (Q21\u201330) \u2550\u2550\u2550
        { sectionNumber: 3, title: "Part 3", context: "...", instructions: "Questions 21\u201330",
          audioUrl: "", questions: [] },

        // \u2550\u2550\u2550 PART 4 (Q31\u201340) \u2550\u2550\u2550
        { sectionNumber: 4, title: "Part 4", context: "...", instructions: "Questions 31\u201340",
          audioUrl: "", questions: [] },
    ]
};

seedListeningTestXX();
```

### Run Command

```bash
cd bestieltsbd_server
npx ts-node src/scripts/seedListeningTestXX.ts
```

### Verification Query (after seed)

```bash
# MongoDB shell
use ielts-mockexam
db.listeningtests.findOne({ testNumber: 11 }, {
  title: 1,
  "sections.sectionNumber": 1,
  "sections.questions.questionNumber": 1,
  "sections.questions.correctAnswer": 1
})
```

---

## 📸 HOW TO CONVERT FROM PHOTO / DOCX / RTF

Mock folder-এ সাধারণত থাকে:
- `listening.docx` / `listening.rtf` — questions + passage/transcript
- `*.ANS.docx` / `*.L.ANS.docx` — answer key (যদি আলাদা থাকে)
- Photo/screenshot — পেপার-ভিত্তিক test থেকে

### Step 1: Identify question type

| Visual clue | Question type |
|-------------|---------------|
| Bullet list with blanks | `note-completion` |
| Labeled form fields (Name:, DOB:, ...) | `form-completion` |
| Table with blanks | `table-completion` |
| A/B/C options | `multiple-choice` |
| "Choose TWO letters" | `multiple-choice-multi` |
| "Match A-H from box" | `matching` |
| Map image + labels | `map-labeling` |
| Plan/floorplan + labels | `plan-labeling` |
| Diagram + labels | `diagram-labeling` |
| "Answer the questions" + short blanks | `short-answer` |
| Continuous prose with blanks | `sentence-completion` / `summary-completion` |
| Flow-chart boxes with arrows | `flow-chart-completion` |

### Step 2: Separate context from blanks

ছবি/text দেখে identify করো:
- **Lines WITH blanks** (numbers + dotted lines / `___`) → `question` blocks
- **Lines WITHOUT blanks** (plain context text) → `instruction` blocks
- **Headings** (bold/uppercase titles) → `instruction` block with `<strong>...</strong>`

### Step 3: Build interleaved blocks

```
Photo:
  • Name: Dr Thomas Boothby          ← context (instruction)
  • Experiment site: International 1) ___ Station   ← blank (Q1)
  • Work began in 2) ___             ← blank (Q2)
  • Also called water bears          ← context (instruction)
  • Tiny 3) ___ organisms            ← blank (Q3)

Convert to:
  { blockType: "instruction", content: "<ul><li>Name: Dr Thomas Boothby</li></ul>" }
  { blockType: "question", questionNumber: 1, questionType: "note-completion",
    questionText: "Experiment site: International ________ Station",
    correctAnswer: "Space", marks: 1, wordLimit: 3 }
  { blockType: "question", questionNumber: 2, questionType: "note-completion",
    questionText: "Work began in ________", correctAnswer: "2015", ... }
  { blockType: "instruction", content: "<ul><li>Also called water bears</li></ul>" }
  { blockType: "question", questionNumber: 3, ... }
```

### Step 4: Group consecutive context lines

একাধিক context lines between blanks → ONE instruction block-এ combine:

```typescript
{ blockType: "instruction",
  content: "<ul><li>Also called water bears</li><li>Ability to adapt to extreme conditions</li><li>Survive extreme temperatures</li></ul>" }
```

### Step 5: Answer key extraction

আলাদা answer file থাকলে (`*.ANS.docx`):
- 1–40 সবগুলো numbered answer পরপর থাকবে
- প্রতিটা `correctAnswer` field-এ বসাতে হবে
- Multiple acceptable variations থাকলে (`flight OR flights`) → `correctAnswer: "flight"`, `acceptableAnswers: ["flights"]`

Answer file না থাকলে original docx-এর শেষে key section খুঁজো, বা audio transcript থেকে extract করতে হবে।

---

## 🖥️ EXAM PAGE RENDERING — কীভাবে কাজ করে

### Page Flow Overview

```
1. API fetch → test data load
2. Flatten all blocks across sections → assign global displayNumber
3. Pagination: 10 questions per page (QUESTIONS_PER_PAGE = 10)
4. For current page:
   - Collect question blocks with displayNumber in [pageStart, pageEnd]
   - Include preceding instruction blocks whose next question is in range
5. buildRenderGroups: merge consecutive same-type blocks
6. Render each group according to its type
```

### Instruction Block Rendering (`InstructionWithPortals`)

```
content field (HTML)
   ↓
[N] placeholder regex scan
   ↓
Replace [N] → inline <input> with number label
   ↓
Smart spacing detection (isMainHeading / isSubHeading / isPureList)
   ↓
Render with instruction-html-container CSS
```

### Question Block Grouping Rules

```javascript
// buildRenderGroups logic:
- instruction → standalone group
- matching / matching-features / matching-headings / multiple-choice-multi /
  map-labeling / diagram-labeling → grouped into ONE block (shared options/question text)
- All other types (note-completion, form-completion, MCQ single, short-answer, etc.)
  → Individual groups (rendered one by one)
```

### Grouping Matrix

| questionType | Group Behavior | Rendering |
|--------------|---------------|-----------|
| `note-completion`, `form-completion`, `sentence-completion`, `summary-completion`, `flow-chart-completion`, `short-answer`, `table-completion` | Individual | Instruction + NoteCompletionRow per question |
| `multiple-choice` | Individual | Number box + question text + A/B/C radio |
| `multiple-choice-multi` | Grouped | ONE block, multiple number boxes + shared options (checkbox) |
| `matching`, `matching-features`, `matching-headings` | Grouped | ONE block, shared options + dropdown per item |
| `map-labeling`, `diagram-labeling`, `plan-labeling` | Grouped | ONE image + dropdown per label |

### Pagination Behavior

- **10 questions per page** (constant `QUESTIONS_PER_PAGE = 10`)
- Page 0: Q1–10 (Part 1)
- Page 1: Q11–20 (Part 2)
- Page 2: Q21–30 (Part 3)
- Page 3: Q31–40 (Part 4)
- Instruction blocks "travel with" their next question: Page change হলে relevant instruction carry হয়

### Bottom Navigation

- প্রতিটা Part-এ answered count badge
- Active part-এ individual question numbers (answered = blue underline, focused = blue border)
- Part label click → সেই part-এর first question-এ jump

### Audio Playback

- `mainAudioUrl` অথবা fallback `/audio/Listening-1.mpeg`
- Play overlay দেখায় sound test পাশ হওয়ার পর
- User audio pause/rewind **করতে পারে না** (official IELTS constraint)

### Admin Preview Mode

`?adminPreview=true&testNumber=X` query দিয়ে admin authenticated হয়ে বিনা-session-এ exam try করতে পারে। Submit করলে score popup আসে কিন্তু কোনো data save হয় না।

---

## ✅ PRE-UPLOAD CHECKLIST

Seed script রান করার আগে verify করো:

- [ ] `testNumber` এবং `testId` unique (DB-তে আগে থেকে নেই)
- [ ] ঠিক 4 sections, sectionNumber 1–4
- [ ] প্রতিটা section-এ ঠিক 10 question blocks (total 40)
- [ ] Question numbers 1–40 sequential, কোনো gap নেই, duplicate নেই
- [ ] প্রতিটা question block-এ `blockType: "question"`, `questionType`, `correctAnswer` exist
- [ ] **কোনো `"TBD"` placeholder answer নেই** (real answers ভরা)
- [ ] Context lines → instruction blocks (NOT `[N]` placeholders unless inside `<table>`)
- [ ] Instruction + question blocks INTERLEAVED correct order-এ
- [ ] MCQ options array format: `"A. option text"` (letter + dot + space + text)
- [ ] `multiple-choice-multi`: separate question blocks with identical options
- [ ] `matching` questions-এ `options: ["A","B",...]` array (শুধু letters)
- [ ] Map/diagram question-এ `imageUrl` set (section বা question level)
- [ ] `correctAnswer` single string বা string[] — Mixed type
- [ ] `wordLimit` set for completion types (note/form/sentence/table/short-answer)
- [ ] `testType`: "academic" or "general-training"
- [ ] `mainAudioUrl` খালি নয় production-এ (development-এ placeholder OK)
- [ ] Special characters Unicode escape (`\u2018`, `\u2019`, `\u2013`, `\u00a3`)
- [ ] সব context lines photo/source থেকে copy করেছে (skip করোনি!)
- [ ] Acceptable variations (`colour/color`, `car park/carpark`) `acceptableAnswers`-এ

---

## 🔄 COMMON MISTAKES & FIXES

### ❌ Seed রান হলো কিন্তু exam page-এ empty আসছে

**Possible causes:**
1. `isActive: false` set
2. `testType` mismatch (exam page filter করছে)
3. `sections` array খালি বা 0টা question block

**Fix:** MongoDB query দিয়ে test document verify করো; `isActive: true` করো, seed পুনরায় রান।

---

### ❌ Question number box দেখাচ্ছে না (শুধু input দেখা যাচ্ছে)

**কারণ:** `[N]` instruction-এ embedded + আলাদা question block — embeddedQNums pre-scan পরবর্তী রিপিট skip করে। ছুটে গেলে button element missing।

**Fix:** Verify করো `[N]` ঠিকঠাক `<td>` বা inline position-এ আছে; HTML syntax error নেই।

---

### ❌ Answer সবসময় "wrong" মার্ক হচ্ছে যদিও ঠিক লিখেছে

**কারণসমূহ:**
1. `correctAnswer: "TBD"` placeholder রয়ে গেছে
2. Leading/trailing space বা extra punctuation যা normalize হচ্ছে না
3. Student যে variation লিখছে সেটা `correctAnswer` বা `acceptableAnswers`-এ নেই

**Fix:**
- Seed script-এ সব `"TBD"` replace করো
- `acceptableAnswers` array-এ common variations যোগ করো

---

### ❌ Table/form blanks-এ duplicate input দেখাচ্ছে

**কারণ:** Instruction-এ `[N]` + পরের question block দুটোই render হচ্ছে কারণ embeddedQNums scan ফেল করেছে।

**Fix:** `[N]` exact format verify করো — `[1]` OK, `[ 1 ]` বা `[01]` নয়। একই N একাধিক instruction-এ রাখো না।

---

### ❌ Map/diagram ছবি দেখা যাচ্ছে না

**Possible causes:**
1. `imageUrl` HTTP (HTTPS site থেকে blocked — mixed content)
2. Image hosting CORS ব্লক করছে
3. URL typo

**Fix:** HTTPS URL use করো; public CDN (Cloudinary, etc.) prefer করো।

---

### ❌ Schema এ field আছে কিন্তু DB save হচ্ছে না

**কারণ:** `listening.model.ts`-এ schema-তে field registered নেই — Mongoose silently drops unknown fields।

**Fix:**
1. `listening.model.ts` → ListeningQuestionSchema-এ field যোগ করো
2. Server restart (ts-node-dev auto-reload)
3. Re-seed test

---

### ❌ নতুন test-এ ব্যবহৃত question type পুরাতন test ভেঙে দিচ্ছে

**কারণ:** Exam page-এ নতুন type-এর rendering block যোগ করতে গিয়ে existing `if` chain-এ accidentally modify হয়েছে।

**Fix:** Git diff দেখো, existing rendering blocks restore করো, নতুন block শেষে যোগ করো (`return null;` এর আগে)।

---

### ❌ Note-completion questions-এ double bullet (••) দেখাচ্ছে

**কারণ:** `questionText` শুরু করেছ `\u2022 ` (bullet) বা `• ` বা `- ` দিয়ে। `NoteCompletionRow` renderer নিজেই bullet যোগ করে, তাই দুইটা bullet পাশাপাশি দেখা যায়।

**Fix:** `questionText` থেকে manual bullet prefix remove করো:
```typescript
// WRONG
questionText: "\u2022 Express train leaves at ________"

// CORRECT
questionText: "Express train leaves at ________"
```

Bullet suppress করতে চাইলে (যেমন table-row style recap) `~` prefix use করো:
```typescript
questionText: "~Bus cash fare: ________"  // no bullet
```

**Rule:** Bullet rendering-এর দায়িত্ব renderer-এর, seed author-এর না।

---

### ❌ Table ডান পাশে কেটে যাচ্ছে / horizontal scroll আসছে

**কারণ:** 4+ column wide table-এ default `width:100%` যথেষ্ট না — ভেতরের text-length অনুযায়ী column প্রসারিত হয়ে container overflow করে।

**Fix:** Table tag-এ `table-layout:fixed;font-size:13px` যোগ করো, `<colgroup>` দিয়ে percentage widths সেট করো (sum=100%), প্রতি `<th>`/`<td>`-তে `word-wrap:break-word` ও padding `6px` use করো।

```typescript
<table border='1' style='border-collapse:collapse;width:100%;table-layout:fixed;font-size:13px'>
<colgroup><col style='width:20%'/><col style='width:20%'/><col style='width:20%'/><col style='width:20%'/><col style='width:20%'/></colgroup>
```

Details → "table-completion → Wide Table Rule" section দেখো।

---

### ❌ Section heading (Destination, Personal details, etc.) ডানে চলে যাচ্ছে

**কারণ:** Instruction block-এ `style='text-align:center'` দিয়েছ। Split-screen preview বা wide viewport-এ heading কনটেন্ট container-এর কেন্দ্রে পড়ে — left-aligned context lines থেকে detached লাগে।

**Fix:** Headings default left-aligned রাখো:
```typescript
// WRONG
content: "<div style='text-align:center;font-weight:bold'>Destination: Harbour City</div>"

// CORRECT
content: "<div style='font-weight:bold;margin:10px 0'>Destination: Harbour City</div>"
// বা
content: "<strong>Destination: Harbour City</strong>"
```

`text-align:center` শুধু তখনই — যখন সত্যিই centered title লাগবে (matching options box-এর "List of Features" heading ইত্যাদি)।

---

## 🔄 KEY DIFFERENCES FROM READING

| Feature | Reading | Listening |
|---------|---------|-----------|
| Sections | 3 sections | 4 sections (Parts) |
| Questions | 40 total (13+13+14) | 40 total (10×4) |
| Data structure | `questionGroups[]` + flat `questions[]` | Single flat `questions[]` with mixed `blockType` |
| Rendering | Client renders by `groupType` | Interleaved instruction HTML + question inputs |
| Source | Text passage side-by-side | Audio plays; instructions show notes/tables |
| HTML usage | NO HTML in passages | YES — instruction blocks use HTML extensively |
| Pattern | Grouped by type | **INTERLEAVED** instruction ↔ question blocks |
| `blockType` | Not used | `"instruction"` or `"question"` |
| Pagination | 1 section per tab | 10 questions per page |
| Audio | N/A | Main audio or per-section audio |
| Images | Rare (passage illustrations) | Map/plan/diagram labeling frequent |

---

## 📂 MOCK FOLDER SOURCE FILES REFERENCE

প্রতিটা test number (01-20)-এর source materials `bestieltsbd_client/public/mock/mock-XX/`-এ:

| File | Purpose |
|------|---------|
| `listening.docx` / `listening.rtf` | Question paper + transcript |
| `*.L.ANS.docx` / `*.ANS.docx` | Answer key (আলাদা থাকলে) |
| `Academic Reading.docx` | Reading questions |
| `GT Reading.docx` | General Training reading |
| `*-writing.docx` | Writing tasks |

**Tip:** answer key আলাদা file-এ থাকলে seed করা সহজ। না থাকলে docx-এর শেষে "Answer Key" section খুঁজো অথবা audio transcript highlight করা থাকে।

---

## 🤖 AI-DRIVEN UPLOAD WORKFLOW

AI দিয়ে নতুন Listening test upload করতে চাইলে এই prompt structure follow করো:

```
I want to create a new IELTS Listening seed script.

Context files:
- Guide: src/scripts/LISTENING_FORMAT_GUIDE.md (this file — read completely)
- Reference seed: src/scripts/seedListeningTest02.ts (for format)
- Source material: public/mock/mock-XX/listening.docx
- Answer key: public/mock/mock-XX/*.ANS.docx (if separate)

Task:
1. Extract all 40 questions from the source material
2. Identify question type for each (refer to guide section "QUESTION TYPES")
3. Build interleaved instruction + question blocks per the pattern
4. Apply real correctAnswer from answer key (NEVER use "TBD")
5. Add acceptableAnswers for known variations
6. Use Unicode escapes for special characters (\u2013, \u2018, etc.)
7. Output: complete seedListeningTestXX.ts file
```

AI-কে সর্বদা বলতে হবে: **TBD answers allowed নয়** এবং **সব context lines photo থেকে copy করতে হবে**।

---

## 📝 VERSION & UPDATE LOG

| Date | Change |
|------|--------|
| 2026-04-07 | Initial guide (15KB, 405 lines) — basic patterns + 10 question types |
| 2026-04-21 | **Complete rewrite** — File locations, Danger Zone, `[N]` mechanism explained, Smart spacing, HTML support, 12 question types (plan-labeling added), Grading normalization, Acceptable answers, Band score table, Rendering flow, Mock folder reference, AI workflow, Common mistakes, বাংলা-English mix |
| 2026-04-21 | **IELTS form box update** — `.ielts-form-box` / `.ielts-form-title` / `.ielts-form-row` utility classes added; PATIENT RECORD / BOOKING FORM / etc. 2-column forms এর জন্য new pattern (Tests 04, 08, 09, 10, 11, 16, 17, 20 migrated); flow-chart single-box pattern (Test 11 Q18-20); short-answer 2-line layout (bold number + question + dotted underline input below); plan/map/diagram smart rendering (imageUrl group-wide search, auto-strip redundant prefix/blanks, conditional dropdown vs text input) |
| 2026-04-21 | **Matching duplicate options fix** — page.jsx `hasLongOpts` auto-renders options box when option length > 4; manual box in instruction causes DUPLICATE → removed from Tests 05, 09, 11, 12. Guide updated with Pattern A (full-text, no manual box) vs Pattern B (letter-only, manual box required). |
| 2026-04-21 | **Test 12 full audit + 2 new rules** — RTF source vs seed compared: fixed Q6-10 table (Bus card fare $1.5, Train off-peak [7] placement, commuter ferry Q9, Tourist ferry afternoon Q10), Q12 "use"→"see", Q16 "work"→"study", Part 3 missing "portrait of Mistress Craven" + Motifs section added, Q31 moved from Present to Past row, "Little's felt"→"Life's path can't", all 40 answers filled. **NEW RULES:** (1) Note-completion auto-bullet — NEVER prefix questionText with `\u2022`/`•`/`-` (renderer adds bullet; manual prefix → `••` double). Use `~` prefix to suppress. (2) Section headings (Destination/Personal details/etc.) default left-aligned — NEVER `text-align:center` (wide viewport-এ ডানে চলে যায়). |
| 2026-04-21 | **Test 13 audit + Wide Table Rule** — Source docx typos caught & fixed ("Tone or brick"→"Stone", "Except Web"→"Wed", "advice"→"advise"). Q24/Q28 restructured: "Main topics:" and "Strengths:" heading labels moved to separate instruction blocks instead of being embedded inside a question bullet. Q17-20 instruction "Choose" → "Circle" (matches source). All 4 wide tables (Q1-7 market list, Q11-16 radio survey 5-col, Q31-33 bridges, Q38-40 bridge proposals) migrated to fixed layout. **NEW RULE:** Wide Table Rule (4+ columns) — use `table-layout:fixed` + `<colgroup>` percentage widths + `font-size:13px` + `word-wrap:break-word` + `padding:6px` (not 8px). Without this, last column(s) overflow viewport with horizontal scroll. |
| 2026-04-22 | **Test 14 audit** — Source docx vs seed compared: Part 3 Q26-30 Candidates table (5 columns: Candidates + Steven/Abdul/Lek/Oscar) migrated to `ct-wide` with colgroup `24/19/19/19/19%`. Part 4 Q34-36 cave formation table (3 columns: Dissolution/Volcanic Lava Tubes/Action of Waves) migrated to `ct-wide` with colgroup `33/34/33%` — long cell text was risky at mid-width viewports. Source typos fixed: Q35 "hotter lava **continue**" → "**continues**" (singular verb agreement); Q36 "pound **in to** cliffs" → "**into** cliffs" (already caught in initial seed). All 40 answers still TBD pending user supply. |
| 2026-04-22 | **Test 15 created from source** — Full seed built from Listening.docx + Listening answer.docx (in `mock-15/`). Two embedded images extracted: `image1.png` (Part 2 campus map A-E) → `/images/listening/test15-part2-map.png`; `image2.jpeg` (Part 3 sales chart A/B/C lines) → `/images/listening/test15-part3-chart.jpeg`. Structure: P1 = two 2-column forms (Product Incident Report Q1-4 + Customer Information Q5-10); P2 = map-labeling Q11-15 + sentence-completion Q16-20; P3 = chart MCQ Q21-22 + multi-MCQ Q23-24 (Pattern B with manual A-E box) + research plan box Q25-30; P4 = 4-column bike history table Q31-37 (`ct-wide` colgroup `14/28/30/28%`) + multi-MCQ Q38-40. Source typo fixed: Q13 "Internet **Unit1**" → "Internet Unit" (trailing "1" was OCR/typo). All 40 answers populated from answer key. |
| 2026-04-22 | **Test 16 audit + paragraph-blank restructure** — Source typo fixed: Q26 "main assessment **of course**" → "of **the** course". Part 4 Q33-38 was a single flowing paragraph in source but seed had each blank as an isolated note-completion question — RESTRUCTURED: added the full paragraph as a single bordered instruction block with inline `[N]` markers (preserves original reading flow), then shortened each question's text to the local clause + added `~` prefix to suppress auto-bullets. Q37 was also missing `~` prefix → added. Form boxes (P1 Travel Agency Q1-7, P2 Campus Clinic Q11-15) correctly use `ielts-form-box` utility classes. All 40 answers TBD pending user supply. |

---

## 🧪 TESTING CHECKLIST — After Seed

নতুন test seed করার পর browser-এ এই যাচাইগুলো করো:

1. **Admin dashboard** → Listening tests list-এ নতুন test দেখাচ্ছে (`isActive: true`)
2. **Admin preview** → `/exam/new?testType=listening&testNumber=XX&adminPreview=true` দিয়ে চালিয়ে দেখো
3. **All 4 parts navigable** → bottom nav-এ 4টা Part click করলেই জুম্প হয়
4. **Each question renders correctly** → question type অনুযায়ী UI (input/radio/dropdown)
5. **Images load** (map/diagram tests-এ)
6. **`[N]` placeholders** → proper inline inputs হিসেবে দেখাচ্ছে table/form-এ
7. **Answer submission** → mock answers fill করে submit — score expected অনুযায়ী আসছে
8. **Band score** → correct-count থেকে proper band conversion
9. **Old tests still work** → অন্তত একটা পুরাতন test (Test 01-10) ব্যবহার করে verify পুরোনো রেন্ডারিং ভাঙেনি

---

**End of Guide.** সব documented; এই ফাইল পড়লে AI বা developer নতুন Listening test seed করতে পারবে বিনা guidance-এ।
