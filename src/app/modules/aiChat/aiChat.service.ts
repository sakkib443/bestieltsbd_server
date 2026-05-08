// ════════════════════════════════════════════════════════════════
// AI Chat service — wraps Gemini multimodal model
// ════════════════════════════════════════════════════════════════
import { GoogleGenerativeAI, type Content } from "@google/generative-ai";
import { LISTENING_SYSTEM_PROMPT } from "./prompts/listening.prompt";
import { READING_SYSTEM_PROMPT } from "./prompts/reading.prompt";
import {
    AIChatMessage,
    AIChatRequest,
    AIChatResponse,
    AIChatTopic,
} from "./aiChat.interface";

const MODEL_NAME = "gemini-1.5-flash"; // multimodal, fast, supports image + PDF
const apiKey = process.env.GEMINI_API_KEY || "";

if (!apiKey) {
    // Don't throw at boot — just warn. Endpoint will return a clear error if called.
    // eslint-disable-next-line no-console
    console.warn("⚠️  GEMINI_API_KEY missing — AI chat endpoint will fail.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const SYSTEM_PROMPTS: Record<AIChatTopic, string> = {
    listening: LISTENING_SYSTEM_PROMPT,
    reading: READING_SYSTEM_PROMPT,
};

// Convert one of our AIChatMessage objects to a Gemini Content entry.
function toGeminiContent(msg: AIChatMessage): Content {
    const parts: Content["parts"] = [];
    if (msg.text && msg.text.trim()) {
        parts.push({ text: msg.text });
    }
    for (const att of msg.attachments || []) {
        if (!att.data || !att.mimeType) continue;
        parts.push({
            inlineData: {
                mimeType: att.mimeType,
                data: att.data,
            },
        });
    }
    if (parts.length === 0) {
        parts.push({ text: "(empty message)" });
    }
    return {
        role: msg.role === "user" ? "user" : "model",
        parts,
    };
}

// Extract a JSON code block from Gemini's reply.
// Returns { rawJson, parsed, parseError } where any may be null.
function extractJson(replyText: string): {
    rawJson: string | null;
    parsed: any | null;
    parseError?: string;
} {
    if (!replyText) return { rawJson: null, parsed: null };

    // Match ```json ... ``` (case-insensitive)
    const fenced = replyText.match(/```\s*json\s*\n?([\s\S]*?)```/i);
    let candidate: string | null = null;
    if (fenced && fenced[1]) {
        candidate = fenced[1].trim();
    } else {
        // Fallback: try generic ``` ... ``` block
        const generic = replyText.match(/```\s*\n?([\s\S]*?)```/);
        if (generic && generic[1] && generic[1].includes("{")) {
            candidate = generic[1].trim();
        }
    }
    if (!candidate) return { rawJson: null, parsed: null };

    try {
        const parsed = JSON.parse(candidate);
        return { rawJson: candidate, parsed };
    } catch (err: any) {
        return {
            rawJson: candidate,
            parsed: null,
            parseError: err?.message || "JSON parse failed",
        };
    }
}

export const AIChatService = {
    async chat(topic: AIChatTopic, body: AIChatRequest): Promise<AIChatResponse> {
        if (!apiKey) {
            throw new Error("Gemini API key is not configured on the server (.env GEMINI_API_KEY)");
        }
        const systemInstruction = SYSTEM_PROMPTS[topic] || SYSTEM_PROMPTS.listening;

        const model = genAI.getGenerativeModel({
            model: MODEL_NAME,
            systemInstruction,
            generationConfig: {
                temperature: 0.2,        // low — we want deterministic structured output
                maxOutputTokens: 8192,   // plenty for full IELTS test extraction
                responseMimeType: "text/plain",
            },
        });

        const history = (body.history || []).map(toGeminiContent);
        const newMsg = toGeminiContent(body.message);

        // Remove any leading "model" entries from history (Gemini requires history start with user)
        while (history.length > 0 && history[0].role !== "user") {
            history.shift();
        }

        const chat = model.startChat({ history });

        // Pass the new message parts (text + inlineData) directly
        const result = await chat.sendMessage(newMsg.parts);
        const replyText = result?.response?.text?.() || "";

        const { rawJson, parsed, parseError } = extractJson(replyText);

        // Strip the JSON block from the visible reply for cleaner display
        const visibleReply = replyText.replace(/```\s*json\s*\n?[\s\S]*?```/i, "").trim();

        return {
            reply: visibleReply || replyText,
            extractedJson: parsed,
            rawJson,
            parseError,
        };
    },
};
