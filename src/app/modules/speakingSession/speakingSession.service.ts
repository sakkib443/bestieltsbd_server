import { SpeakingSession } from "./speakingSession.model";
import { SpeakingTest } from "../speaking/speaking.model";
import { ISubmitSpeakingSession } from "./speakingSession.interface";
import { gradeSpeakingWithAI } from "../../utils/speaking.grader";

// ── Submit speaking session and trigger AI grading ────────────────
const submitSpeakingSession = async (data: ISubmitSpeakingSession) => {
    const { userId, examId, speakingTestNumber, recordings } = data;

    // Find the speaking test
    const speakingTest = await SpeakingTest.findOne({ testNumber: speakingTestNumber });
    if (!speakingTest) throw new Error(`Speaking test #${speakingTestNumber} not found`);

    // Calculate stats
    const totalDuration = recordings.reduce((s, r) => s + r.duration, 0);
    const allText = recordings.map(r => r.transcript || "").join(" ");
    const totalWords = allText.trim().split(/\s+/).filter(w => w.length > 0).length;
    const speechRate = totalDuration > 0 ? Math.round((totalWords / totalDuration) * 60) : 0;

    // Enrich recordings with word count
    const enrichedRecordings = recordings.map(r => ({
        ...r,
        wordCount: (r.transcript || "").trim().split(/\s+/).filter(w => w.length > 0).length,
        submittedAt: new Date(),
    }));

    // Create or update session
    let session = await SpeakingSession.findOne({ userId, examId });

    if (!session) {
        session = new SpeakingSession({
            userId,
            examId,
            speakingTestId: speakingTest._id,
            speakingTestNumber,
            recordings: enrichedRecordings,
            totalDuration,
            totalWords,
            speechRate,
            status: "submitted",
        });
    } else {
        session.recordings = enrichedRecordings as any;
        session.totalDuration = totalDuration;
        session.totalWords = totalWords;
        session.speechRate = speechRate;
        session.status = "submitted";
    }

    await session.save();

    // Grade with AI (async — don't block response)
    gradeInBackground(session._id as any, speakingTest.toObject() as any);

    return {
        sessionId: session._id,
        status: "submitted",
        totalWords,
        speechRate,
        message: "Speaking test submitted. AI grading in progress...",
    };
};

// ── Background AI grading ────────────────────────────────────────
const gradeInBackground = async (sessionId: string, speakingTest: any) => {
    try {
        const session = await SpeakingSession.findById(sessionId);
        if (!session) return;

        const { scores, feedback } = await gradeSpeakingWithAI({
            recordings: session.recordings as any,
            speakingTest,
        });

        session.aiScores = scores;
        session.aiFeedback = feedback;
        session.status = "graded";
        session.gradedAt = new Date();
        await session.save();

        console.log(`✅ Speaking session ${sessionId} graded — Band: ${scores.overallBand}`);
    } catch (err) {
        console.error("Background grading failed:", err);
    }
};

// ── Get session by examId + userId ───────────────────────────────
const getSessionByExam = async (userId: string, examId: string) => {
    return SpeakingSession.findOne({ userId, examId }).lean();
};

// ── Get all sessions (admin) ──────────────────────────────────────
const getAllSessions = async (query: any) => {
    const { page = 1, limit = 20, status } = query;
    const filter: any = {};
    if (status) filter.status = status;

    const sessions = await SpeakingSession.find(filter)
        .populate("userId", "name email")
        .populate("speakingTestId", "title testNumber")
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit))
        .lean();

    const total = await SpeakingSession.countDocuments(filter);
    return { sessions, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) };
};

// ── Poll session status (student polls after submission) ─────────
const pollSessionStatus = async (userId: string, examId: string) => {
    const session = await SpeakingSession.findOne({ userId, examId })
        .select("status aiScores aiFeedback totalWords speechRate gradedAt")
        .lean();

    if (!session) return null;
    return session;
};

export const SpeakingSessionService = {
    submitSpeakingSession,
    getSessionByExam,
    getAllSessions,
    pollSessionStatus,
};
