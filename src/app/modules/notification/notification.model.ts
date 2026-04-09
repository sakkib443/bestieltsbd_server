import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
    type: "new_student" | "mock_purchase" | "exam_done" | "payment";
    title: string;
    message: string;
    meta?: Record<string, any>;
    isRead: boolean;
    createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
    {
        type: {
            type: String,
            enum: ["new_student", "mock_purchase", "exam_done", "payment"],
            required: true,
        },
        title: { type: String, required: true },
        message: { type: String, required: true },
        meta: { type: Schema.Types.Mixed, default: {} },
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Notification = mongoose.model<INotification>("Notification", NotificationSchema);
