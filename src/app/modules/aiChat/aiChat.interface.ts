// ════════════════════════════════════════════════════════════════
// AI Chat module — types
// ════════════════════════════════════════════════════════════════

export type AIChatRole = "user" | "model";

// One message in the conversation history sent from client.
export interface AIChatMessage {
    role: AIChatRole;
    text?: string;
    // Inline binary attachments — already base64-encoded by the client
    attachments?: Array<{
        mimeType: string;          // e.g. "image/png", "application/pdf"
        data: string;              // base64 (no data: prefix)
        name?: string;             // original filename (for display only)
    }>;
}

export interface AIChatRequest {
    history?: AIChatMessage[];     // previous turns (for multi-turn context)
    message: AIChatMessage;        // the new user message
}

export interface AIChatResponse {
    reply: string;                 // natural language reply (Bengali summary)
    extractedJson: any | null;     // parsed JSON object from the response, if any
    rawJson: string | null;        // raw JSON code block as text (for debugging)
    parseError?: string;           // populated if JSON code block was found but couldn't be parsed
}

export type AIChatTopic = "listening" | "reading";
