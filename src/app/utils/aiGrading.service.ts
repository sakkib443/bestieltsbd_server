import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface IAIWritingResult {
    task1Band: number;
    task2Band: number;
    overallBand: number;
    criteria: {
        taskAchievement: number;
        coherenceCohesion: number;
        lexicalResource: number;
        grammaticalAccuracy: number;
    };
    feedback: {
        overall: string;
        task1: string;
        task2: string;
        strengths: string[];
        improvements: string[];
    };
    wordCounts: {
        task1: number;
        task2: number;
    };
    aiGraded: boolean;
}

// Count words in text
const countWords = (text: string): number => {
    if (!text || !text.trim()) return 0;
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
};

// Round to nearest 0.5 (IELTS standard)
const roundToHalf = (n: number): number => Math.round(n * 2) / 2;

// Clamp band between 0 and 9
const clampBand = (n: number): number => Math.max(0, Math.min(9, roundToHalf(n)));

/**
 * Grade writing using Gemini AI with full IELTS criteria
 */
export const gradeWritingWithAI = async (
    task1Text: string,
    task2Text: string,
    task1Prompt?: string,  // The writing question/task
    task2Prompt?: string
): Promise<IAIWritingResult> => {
    const task1Words = countWords(task1Text);
    const task2Words = countWords(task2Text);

    // Build prompt with rich context
    const prompt = `You are an expert IELTS examiner with 20+ years of experience. Grade the following IELTS Writing responses strictly according to official IELTS band descriptors.

=== TASK 1 ===
${task1Prompt ? `Question/Prompt: ${task1Prompt}` : "Task 1 (Academic/GT Writing)"}
Word Count: ${task1Words} words (minimum required: 150)

Student Response:
"${task1Text || "(no response provided)"}"

=== TASK 2 ===  
${task2Prompt ? `Question/Prompt: ${task2Prompt}` : "Task 2 (Essay Writing)"}
Word Count: ${task2Words} words (minimum required: 250)

Student Response:
"${task2Text || "(no response provided)"}"

=== GRADING INSTRUCTIONS ===
Grade each task on 4 criteria (0-9 scale, 0.5 increments):
1. Task Achievement/Response: Does it answer what was asked?
2. Coherence & Cohesion: Logical flow, paragraphing, linking
3. Lexical Resource: Vocabulary range, accuracy, appropriacy
4. Grammatical Range & Accuracy: Sentence variety, error rate

Rules:
- If word count < 150 (Task 1) or < 250 (Task 2), reduce Task Achievement by 1-1.5 bands
- If response is blank/very short (< 50 words), give band 2.0 for that task
- Be strict but fair — match official IELTS standards
- Band 6.0 = competent user with occasional errors
- Band 5.0 = modest user with frequent errors

Return ONLY valid JSON (no markdown, no explanation outside JSON):
{
  "task1": {
    "taskAchievement": <number 0-9>,
    "coherenceCohesion": <number 0-9>,
    "lexicalResource": <number 0-9>,
    "grammaticalAccuracy": <number 0-9>,
    "overallBand": <number 0-9>,
    "feedback": "<2-3 sentence specific feedback>"
  },
  "task2": {
    "taskAchievement": <number 0-9>,
    "coherenceCohesion": <number 0-9>,
    "lexicalResource": <number 0-9>,
    "grammaticalAccuracy": <number 0-9>,
    "overallBand": <number 0-9>,
    "feedback": "<2-3 sentence specific feedback>"
  },
  "overall": {
    "band": <number 0-9>,
    "summary": "<2-3 sentences overall summary>",
    "strengths": ["<strength 1>", "<strength 2>"],
    "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"]
  }
}`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Extract JSON from response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("Invalid AI response format");
        }

        const parsed = JSON.parse(jsonMatch[0]);

        // Extract and validate scores
        const t1 = parsed.task1 || {};
        const t2 = parsed.task2 || {};
        const overall = parsed.overall || {};

        const task1Band = clampBand(
            t1.overallBand ||
            ((t1.taskAchievement + t1.coherenceCohesion + t1.lexicalResource + t1.grammaticalAccuracy) / 4) ||
            5.0
        );

        const task2Band = clampBand(
            t2.overallBand ||
            ((t2.taskAchievement + t2.coherenceCohesion + t2.lexicalResource + t2.grammaticalAccuracy) / 4) ||
            5.0
        );

        // IELTS: Task 2 is worth twice as much as Task 1
        const writingOverall = clampBand((task1Band + task2Band * 2) / 3);

        // Average criteria across both tasks
        const avgCriteria = {
            taskAchievement: clampBand(((t1.taskAchievement || 5) + (t2.taskAchievement || 5)) / 2),
            coherenceCohesion: clampBand(((t1.coherenceCohesion || 5) + (t2.coherenceCohesion || 5)) / 2),
            lexicalResource: clampBand(((t1.lexicalResource || 5) + (t2.lexicalResource || 5)) / 2),
            grammaticalAccuracy: clampBand(((t1.grammaticalAccuracy || 5) + (t2.grammaticalAccuracy || 5)) / 2),
        };

        return {
            task1Band,
            task2Band,
            overallBand: writingOverall,
            criteria: avgCriteria,
            feedback: {
                overall: overall.summary || "Writing assessed by AI.",
                task1: t1.feedback || "Task 1 assessed.",
                task2: t2.feedback || "Task 2 assessed.",
                strengths: overall.strengths || [],
                improvements: overall.improvements || [],
            },
            wordCounts: { task1: task1Words, task2: task2Words },
            aiGraded: true,
        };

    } catch (err: any) {
        console.error("[AI Grading] Gemini API error:", err.message);

        // Fallback: rule-based estimation if AI fails
        return fallbackGrading(task1Text, task2Text, task1Words, task2Words);
    }
};

/**
 * Fallback rule-based grading if Gemini fails
 */
const fallbackGrading = (
    task1Text: string,
    task2Text: string,
    task1Words: number,
    task2Words: number
): IAIWritingResult => {
    // Word count based estimation
    const estimateBand = (words: number, required: number): number => {
        if (words === 0) return 2.0;
        if (words < required * 0.4) return 3.0;
        if (words < required * 0.7) return 4.0;
        if (words < required) return 4.5;
        if (words < required * 1.2) return 5.5;
        if (words < required * 1.5) return 6.0;
        if (words < required * 2.0) return 6.5;
        return 7.0;
    };

    const task1Band = estimateBand(task1Words, 150);
    const task2Band = estimateBand(task2Words, 250);
    const overallBand = roundToHalf((task1Band + task2Band * 2) / 3);

    return {
        task1Band,
        task2Band,
        overallBand,
        criteria: {
            taskAchievement: task1Band,
            coherenceCohesion: task1Band,
            lexicalResource: task2Band,
            grammaticalAccuracy: task2Band,
        },
        feedback: {
            overall: "Score estimated based on word count (AI grading temporarily unavailable).",
            task1: `Task 1: ${task1Words} words written.`,
            task2: `Task 2: ${task2Words} words written.`,
            strengths: [],
            improvements: ["Complete both tasks with required word count for accurate AI grading."],
        },
        wordCounts: { task1: task1Words, task2: task2Words },
        aiGraded: false,
    };
};
