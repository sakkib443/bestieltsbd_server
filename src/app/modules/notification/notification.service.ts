import { Notification } from "./notification.model";

// ── Create Helpers ───────────────────────────────────────────────
const createStudentNotification = async (studentName: string, examId: string, email: string) => {
    await Notification.create({
        type: "new_student",
        title: "New Student Registered",
        message: `${studentName} has been registered for the exam.`,
        meta: { examId, email, studentName },
    });
};

const createMockPurchaseNotification = async (userName: string, packageName: string, amount: number, email: string) => {
    await Notification.create({
        type: "mock_purchase",
        title: "New Mock Test Purchase",
        message: `${userName} purchased "${packageName}" for ৳${amount}.`,
        meta: { userName, packageName, amount, email },
    });
};

const createExamDoneNotification = async (studentName: string, examId: string) => {
    await Notification.create({
        type: "exam_done",
        title: "Exam Completed",
        message: `${studentName} has completed all 3 modules of their exam.`,
        meta: { examId, studentName },
    });
};

// ── Read APIs ────────────────────────────────────────────────────
const getAll = async (limit = 50) => {
    return Notification.find().sort({ createdAt: -1 }).limit(limit).lean();
};

const getUnreadCount = async () => {
    return Notification.countDocuments({ isRead: false });
};

const markAllRead = async () => {
    await Notification.updateMany({ isRead: false }, { $set: { isRead: true } });
};

const markOneRead = async (id: string) => {
    await Notification.findByIdAndUpdate(id, { $set: { isRead: true } });
};

export const NotificationService = {
    createStudentNotification,
    createMockPurchaseNotification,
    createExamDoneNotification,
    getAll,
    getUnreadCount,
    markAllRead,
    markOneRead,
};
