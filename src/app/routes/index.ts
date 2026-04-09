import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ExamRoutes } from "../modules/exam/exam.route";
import { ExamSessionRoutes } from "../modules/examSession/examSession.route";
import { StudentRoutes } from "../modules/student/student.route";
import { UploadRoutes } from "../modules/upload/upload.route";
import { UserRoutes } from "../modules/user/user.route";
import { MockPackageRoutes } from "../modules/mockPackage/mockPackage.route";
import { BkashRoutes } from "../modules/bkash/bkash.route";
import { AffiliateRoutes } from "../modules/affiliate/affiliate.route";

// Separate modules for each exam type
import { ListeningRoutes } from "../modules/listening/listening.route";
import { ReadingRoutes } from "../modules/reading/reading.route";
import { WritingRoutes } from "../modules/writing/writing.route";
import { SpeakingRoutes } from "../modules/speaking/speaking.route";
import { SpeakingSessionRoutes } from "../modules/speakingSession/speakingSession.route";
import { NotificationRoutes } from "../modules/notification/notification.route";

const router = Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/exams",
        route: ExamRoutes,
    },
    {
        path: "/exam-sessions",
        route: ExamSessionRoutes,
    },
    {
        path: "/students",
        route: StudentRoutes,
    },
    {
        path: "/upload",
        route: UploadRoutes,
    },
    // New separate modules for each exam type
    {
        path: "/listening",
        route: ListeningRoutes,
    },
    {
        path: "/reading",
        route: ReadingRoutes,
    },
    {
        path: "/writing",
        route: WritingRoutes,
    },
    {
        path: "/speaking",
        route: SpeakingRoutes,
    },
    {
        path: "/speaking-sessions",
        route: SpeakingSessionRoutes,
    },
    {
        path: "/users",
        route: UserRoutes,
    },
    {
        path: "/mock-store",
        route: MockPackageRoutes,
    },
    {
        path: "/bkash",
        route: BkashRoutes,
    },
    {
        path: "/affiliates",
        route: AffiliateRoutes,
    },
    {
        path: "/notifications",
        route: NotificationRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

