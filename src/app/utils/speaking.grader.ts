import { GoogleGenerativeAI } from "@google/generative-ai";
import { ISpeakingAIScores, ISpeakingAIFeedback, ISpeakingRecording } from "../modules/speakingSession/speakingSession.interface";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface GradeInput {
    recordings: ISpeakingRecording[];
    speakingTest: {
        part1: { topics: { topicName: string; questions: string[] }[] };
        part2: { topic: string; bulletPoints: string[]; cueCard: string };
        part3: { questions: string[] };
    };
}

// ── IELTS Band rounding ────────────────────────────────────────────
export const roundToIELTSBand = (score: number): number => {
    const band = Math.round(score * 2) / 2;
    return Math.min(9, Math.max(1, band));
};

// ── Text analysis helpers ─────────────────────────────────────────
const countWords = (text: string): number => text.trim().split(/\s+/).filter(w => w.length > 0).length;

const calcTypeTokenRatio = (text: string): number => {
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    if (words.length === 0) return 0;
    const unique = new Set(words);
    return unique.size / words.length;
};

const estimateSpeechRate = (text: string, durationSecs: number): number => {
    if (durationSecs === 0) return 0;
    const words = countWords(text);
    return Math.round((words / durationSecs) * 60); // WPM
};

// ── Filler word detection ─────────────────────────────────────────
const countFillerWords = (text: string): number => {
    const fillers = /\b(um+|uh+|er+|ah+|like|you know|i mean|basically|literally|actually|anyway|so like)\b/gi;
    return (text.match(fillers) || []).length;
};

// ── Main grading function ─────────────────────────────────────────
export const gradeSpeakingWithAI = async (
    input: GradeInput
): Promise<{ scores: ISpeakingAIScores; feedback: ISpeakingAIFeedback }> => {
    const { recordings } = input;

    const allTranscripts = recordings
        .filter(r => r.transcript && r.transcript.trim().length > 0)
        .map(r => r.transcript!)
        .join(" ");

    // Fallback if no transcripts
    if (!allTranscripts || allTranscripts.trim().length < 10) {
        return generateFallbackResult(recordings);
    }

    const totalWords = countWords(allTranscripts);
    const ttr = calcTypeTokenRatio(allTranscripts);
    const totalDuration = recordings.reduce((s, r) => s + r.duration, 0);
    const wpm = estimateSpeechRate(allTranscripts, totalDuration);
    const fillerCount = countFillerWords(allTranscripts);

    // ── Gemini prompt for IELTS evaluation ──
    const prompt = `
You are an expert IELTS Speaking examiner. Evaluate the following IELTS Speaking test recordings.

STUDENT RESPONSES:
${recordings.map((r, i) => `
[Part ${r.part}, Q${r.questionIndex + 1}]: "${r.questionText}"
Answer: "${r.transcript}"
Duration: ${r.duration}s
`).join("")}

STATISTICS:
- Total words: ${totalWords}
- Speech rate: ${wpm} WPM (ideal: 120-160)
- Vocabulary diversity (TTR): ${(ttr * 100).toFixed(1)}%
- Filler words used: ${fillerCount}

Your task: Evaluate on ALL FOUR IELTS Speaking criteria (1-9 scale):
1. Fluency and Coherence
2. Lexical Resource
3. Grammatical Range and Accuracy
4. Pronunciation (estimate from text quality)

Respond ONLY with valid JSON in this exact format:
{
  "fluencyCoherence": <number 1-9>,
  "lexicalResource": <number 1-9>,
  "grammaticalRange": <number 1-9>,
  "pronunciation": <number 1-9>,
  "overall": "<2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"],
  "vocabularyHighlights": ["<good word/phrase used>", "<another>"],
  "grammarNotes": "<specific grammar observation>",
  "perQuestion": [
    {"part": <1|2|3>, "questionIndex": <0-n>, "feedback": "<brief feedback>"}
  ]
}

Be encouraging but honest. Use IELTS band descriptor language.
`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();

        // Parse JSON from Gemini response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON in response");

        const parsed = JSON.parse(jsonMatch[0]);

        const scores: ISpeakingAIScores = {
            fluencyCoherence: roundToIELTSBand(parsed.fluencyCoherence || 5),
            lexicalResource: roundToIELTSBand(parsed.lexicalResource || 5),
            grammaticalRange: roundToIELTSBand(parsed.grammaticalRange || 5),
            pronunciation: roundToIELTSBand(parsed.pronunciation || 5),
            overallBand: roundToIELTSBand(
                ((parsed.fluencyCoherence || 5) +
                 (parsed.lexicalResource || 5) +
                 (parsed.grammaticalRange || 5) +
                 (parsed.pronunciation || 5)) / 4
            ),
        };

        const feedback: ISpeakingAIFeedback = {
            overall: parsed.overall || "Good attempt at the IELTS Speaking test.",
            strengths: parsed.strengths || [],
            improvements: parsed.improvements || [],
            perQuestion: parsed.perQuestion || [],
            vocabularyHighlights: parsed.vocabularyHighlights || [],
            grammarNotes: parsed.grammarNotes || "",
        };

        return { scores, feedback };
    } catch (err) {
        console.error("Gemini grading error:", err);
        return generateFallbackResult(recordings);
    }
};

// ── Fallback result when AI fails ─────────────────────────────────
const generateFallbackResult = (
    recordings: ISpeakingRecording[]
): { scores: ISpeakingAIScores; feedback: ISpeakingAIFeedback } => {
    const allText = recordings.map(r => r.transcript || "").join(" ");
    const words = countWords(allText);
    const ttr = calcTypeTokenRatio(allText);

    // Heuristic scoring
    const fluency = words > 200 ? 6.0 : words > 100 ? 5.0 : 4.0;
    const lexical = ttr > 0.6 ? 6.5 : ttr > 0.4 ? 5.5 : 4.5;

    const scores: ISpeakingAIScores = {
        fluencyCoherence: roundToIELTSBand(fluency),
        lexicalResource: roundToIELTSBand(lexical),
        grammaticalRange: roundToIELTSBand(5.5),
        pronunciation: roundToIELTSBand(5.5),
        overallBand: roundToIELTSBand((fluency + lexical + 5.5 + 5.5) / 4),
    };

    const feedback: ISpeakingAIFeedback = {
        overall: "Your speaking test has been evaluated. Keep practicing to improve your fluency and vocabulary range.",
        strengths: ["Attempted all parts of the test", "Showed willingness to communicate"],
        improvements: [
            "Try to speak more fluently with fewer pauses",
            "Use a wider range of vocabulary",
            "Develop your answers with more details and examples",
        ],
        perQuestion: [],
        vocabularyHighlights: [],
        grammarNotes: "Focus on using a variety of grammatical structures.",
    };

    return { scores, feedback };
};
