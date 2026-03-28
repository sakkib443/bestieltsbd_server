import { Types } from "mongoose";

// Individual recording for each question/part
export interface ISpeakingRecording {
    part: 1 | 2 | 3;
    questionIndex: number;         // 0-indexed
    questionText: string;
    transcript?: string;           // Speech-to-text result
    duration: number;              // seconds recorded
    wordCount?: number;
    submittedAt: Date;
}

// AI Evaluation scores
export interface ISpeakingAIScores {
    fluencyCoherence: number;      // 1-9 IELTS band
    lexicalResource: number;       // 1-9
    grammaticalRange: number;      // 1-9
    pronunciation: number;         // 1-9 estimated
    overallBand: number;           // Average rounded to 0.5
}

// Detailed AI Feedback
export interface ISpeakingAIFeedback {
    overall: string;
    strengths: string[];
    improvements: string[];
    perQuestion: { part: number; questionIndex: number; feedback: string }[];
    vocabularyHighlights?: string[];
    grammarNotes?: string;
}

// Main Speaking Session
export interface ISpeakingSession {
    userId: Types.ObjectId;
    examId: string;
    speakingTestId: Types.ObjectId;
    speakingTestNumber: number;

    recordings: ISpeakingRecording[];

    aiScores?: ISpeakingAIScores;
    aiFeedback?: ISpeakingAIFeedback;

    totalDuration: number;         // total seconds spoken
    totalWords: number;            // total words across all answers
    speechRate?: number;           // words per minute

    status: "in-progress" | "submitted" | "graded";
    gradedAt?: Date;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISubmitSpeakingSession {
    userId: string;
    examId: string;
    speakingTestNumber: number;
    recordings: {
        part: 1 | 2 | 3;
        questionIndex: number;
        questionText: string;
        transcript: string;
        duration: number;
    }[];
}
