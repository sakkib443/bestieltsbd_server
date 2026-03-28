import mongoose, { Schema, Document } from "mongoose";
import { ISpeakingSession } from "./speakingSession.interface";

const RecordingSchema = new Schema({
    part: { type: Number, enum: [1, 2, 3], required: true },
    questionIndex: { type: Number, required: true },
    questionText: { type: String, required: true },
    transcript: { type: String, default: "" },
    duration: { type: Number, default: 0 },
    wordCount: { type: Number, default: 0 },
    submittedAt: { type: Date, default: Date.now },
});

const AIScoresSchema = new Schema({
    fluencyCoherence: { type: Number, min: 0, max: 9 },
    lexicalResource: { type: Number, min: 0, max: 9 },
    grammaticalRange: { type: Number, min: 0, max: 9 },
    pronunciation: { type: Number, min: 0, max: 9 },
    overallBand: { type: Number, min: 0, max: 9 },
}, { _id: false });

const AIFeedbackSchema = new Schema({
    overall: { type: String, default: "" },
    strengths: [{ type: String }],
    improvements: [{ type: String }],
    perQuestion: [{
        part: Number,
        questionIndex: Number,
        feedback: String,
    }],
    vocabularyHighlights: [{ type: String }],
    grammarNotes: { type: String },
}, { _id: false });

const SpeakingSessionSchema = new Schema<ISpeakingSession & Document>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        examId: { type: String, required: true },
        speakingTestId: { type: Schema.Types.ObjectId, ref: "SpeakingTest", required: true },
        speakingTestNumber: { type: Number, required: true },

        recordings: [RecordingSchema],

        aiScores: AIScoresSchema,
        aiFeedback: AIFeedbackSchema,

        totalDuration: { type: Number, default: 0 },
        totalWords: { type: Number, default: 0 },
        speechRate: { type: Number },

        status: {
            type: String,
            enum: ["in-progress", "submitted", "graded"],
            default: "in-progress",
        },
        gradedAt: { type: Date },
    },
    { timestamps: true }
);

SpeakingSessionSchema.index({ userId: 1, examId: 1 });
SpeakingSessionSchema.index({ status: 1 });

export const SpeakingSession = mongoose.model<ISpeakingSession & Document>(
    "SpeakingSession",
    SpeakingSessionSchema
);
