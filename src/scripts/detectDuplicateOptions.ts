/**
 * Detects the "duplicate options list" bug in listening seed files.
 *
 * Bug: Frontend at bestieltsbd_client/.../listening/page.jsx auto-renders
 * an options box for `matching` / `map-labeling` questions when ANY option
 * string length > 4 (i.e. has descriptive text like "A. Louise Bagshaw").
 *
 * If the seed ALSO includes an instruction block that lists those same
 * options, the user sees them TWICE.
 *
 * This scanner finds every matching/map-labeling question with long
 * options, then looks backward in the same section for an instruction
 * block containing an option-list pattern (A, B, C listings).
 *
 * Run: npx ts-node src/scripts/detectDuplicateOptions.ts
 */
import * as fs from "fs";
import * as path from "path";

const SCRIPTS_DIR = path.join(__dirname);
const FILES = fs
  .readdirSync(SCRIPTS_DIR)
  .filter((f) => /^seedListeningTest\d+\.ts$/.test(f))
  .sort();

interface Finding {
  file: string;
  sectionLabel: string;
  instructionLine: number;
  questionLines: number[];
  snippet: string;
}

// Heuristic: an instruction block that lists options as
// "Letter + descriptive text" patterns (3+ letters, each followed
// by substantive text). We skip false positives like
// "Choose the correct letter, A, B or C" by requiring each letter
// to have real word content after it.
//
// Real-bug patterns:
//   <li><strong>A</strong> John</li>
//   <div><strong>A</strong> too vague</div>
//   <div><strong>A.</strong>&nbsp;before 1837</div>
//   <strong>A</strong> if professor says REMAIN<br/>
//   <tr><td>A</td><td>cleaning included</td></tr>
const OPTION_LIST_PATTERNS = [
  // <strong>A</strong> + at least one word after (e.g. "John", "if")
  /<strong>([A-J])\.?<\/strong>(?:&nbsp;|\s)+\w{2,}/g,
  // List item / div with letter + text
  /<li[^>]*>\s*([A-J])[.\s)]\s*\w{2,}/g,
  // Table row with letter cell followed by a text cell
  /<td[^>]*>\s*([A-J])\s*<\/td>\s*<td[^>]*>\s*\w{2,}/g,
  // "A &nbsp; cleaning included" pattern
  /(?:^|>|<br\/?>)\s*([A-J])\s+&nbsp;\s*\w{2,}/g,
  // Plain-text list where letter sits at line start with content
  // (e.g. "A outgoing<br/>B selfish<br/>")
  /(?:^|<br\/?>|\n)\s*([A-J])\s{1,3}\w{2,}/g,
];

function hasOptionList(content: string): { hit: boolean; letters: Set<string> } {
  const letters = new Set<string>();
  for (const re of OPTION_LIST_PATTERNS) {
    const matches = content.matchAll(new RegExp(re.source, re.flags));
    for (const m of matches) {
      if (m[1]) letters.add(m[1]);
    }
  }
  return { hit: letters.size >= 3, letters };
}

function scanFile(filePath: string): Finding[] {
  const src = fs.readFileSync(filePath, "utf8");
  const lines = src.split("\n");
  const findings: Finding[] = [];

  // Split file by sectionNumber to get rough section boundaries
  const sectionStarts: number[] = [];
  lines.forEach((l, i) => {
    if (/sectionNumber:\s*\d/.test(l)) sectionStarts.push(i);
  });
  sectionStarts.push(lines.length);

  for (let s = 0; s < sectionStarts.length - 1; s++) {
    const start = sectionStarts[s];
    const end = sectionStarts[s + 1];
    const sectionText = lines.slice(start, end).join("\n");

    // Find matching/map-labeling questions with long options
    const longOptQuestionRe =
      /questionType:\s*"(matching|map-labeling|diagram-labeling)"[^}]*?options:\s*\[([^\]]+)\]/g;
    const sectionMatches = [...sectionText.matchAll(longOptQuestionRe)];
    if (sectionMatches.length === 0) continue;

    const questionsWithLongOpts = sectionMatches.filter((m) => {
      const optsRaw = m[2];
      const opts = [...optsRaw.matchAll(/"([^"]+)"/g)].map((x) => x[1]);
      return opts.some((o) => o.length > 4);
    });
    if (questionsWithLongOpts.length === 0) continue;

    // Compute absolute line numbers of the question blocks
    const qLineNums: number[] = [];
    for (const m of questionsWithLongOpts) {
      if (m.index == null) continue;
      const before = sectionText.slice(0, m.index);
      const lineInSection = before.split("\n").length;
      qLineNums.push(start + lineInSection);
    }

    // Find all instruction blocks in this section
    const instrRe = /blockType:\s*"instruction"[^}]*?content:\s*(`[\s\S]*?`|"[\s\S]*?")/g;
    for (const im of sectionText.matchAll(instrRe)) {
      if (im.index == null) continue;
      const content = im[1];
      const { hit, letters } = hasOptionList(content);
      if (!hit) continue;
      const before = sectionText.slice(0, im.index);
      const lineInSection = before.split("\n").length;
      const absLine = start + lineInSection;

      // Only flag if the instruction block is positioned to duplicate
      // with matching/map-labeling questions (before or interleaved)
      const nearestQLine = qLineNums.reduce<number | null>((acc, ql) => {
        if (acc == null || Math.abs(ql - absLine) < Math.abs(acc - absLine))
          return ql;
        return acc;
      }, null);
      if (nearestQLine == null) continue;

      const snippet = content
        .replace(/^`|`$|^"|"$/g, "")
        .replace(/\s+/g, " ")
        .slice(0, 140);

      findings.push({
        file: path.basename(filePath),
        sectionLabel: `Part ${s + 1}`,
        instructionLine: absLine,
        questionLines: qLineNums,
        snippet: `[letters ${[...letters].sort().join(",")}] ${snippet}...`,
      });
    }
  }

  return findings;
}

// ── Run ──
const allFindings: Finding[] = [];
for (const f of FILES) {
  const results = scanFile(path.join(SCRIPTS_DIR, f));
  allFindings.push(...results);
}

if (allFindings.length === 0) {
  console.log("✅ No duplicate-options issues detected.");
  process.exit(0);
}

console.log(`\n🔍 Found ${allFindings.length} potential duplicate-options blocks:\n`);
let currentFile = "";
for (const f of allFindings) {
  if (f.file !== currentFile) {
    currentFile = f.file;
    console.log(`\n── ${f.file} ──`);
  }
  console.log(
    `  ${f.sectionLabel}: instruction L${f.instructionLine} → questions L${f.questionLines.join(",")}`
  );
  console.log(`    ${f.snippet}`);
}
console.log(`\nTotal files with issues: ${new Set(allFindings.map((x) => x.file)).size}`);
