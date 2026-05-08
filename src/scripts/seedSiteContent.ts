/**
 * Seed Script: Initial Site Content
 * 5 videos (welcome + 4 exam intros) + 3 hero texts
 * Run: npx ts-node src/scripts/seedSiteContent.ts
 */
import mongoose from "mongoose";
import config from "../app/config";
import { SiteContent } from "../app/modules/siteContent/siteContent.model";

const initialContent = [
    // ===== VIDEOS =====
    {
        contentKey: "video.home_welcome",
        contentType: "video" as const,
        category: "video" as const,
        label: "Home Page — Welcome / Quick Guide Video",
        description: "Plays on the landing page when 'Watch Demo' is clicked.",
        videoSource: "local" as const,
        videoUrl: "/video/IELTS on computer - Quick Guide.mp4",
        videoPublicId: "",
    },
    {
        contentKey: "video.exam_intro",
        contentType: "video" as const,
        category: "video" as const,
        label: "Exam Entry — General Instruction Video",
        description: "Shown on the exam entry page before any module starts.",
        videoSource: "local" as const,
        videoUrl: "/video/IELTS on computer - Quick Guide.mp4",
        videoPublicId: "",
    },
    {
        contentKey: "video.listening_intro",
        contentType: "video" as const,
        category: "video" as const,
        label: "Listening — Instruction Video",
        description: "Shown before the Listening test starts.",
        videoSource: "local" as const,
        videoUrl: "/video/listeining test instruction.mp4",
        videoPublicId: "",
    },
    {
        contentKey: "video.reading_intro",
        contentType: "video" as const,
        category: "video" as const,
        label: "Reading — Instruction Video",
        description: "Shown before the Reading test starts.",
        videoSource: "local" as const,
        videoUrl: "/video/reading instruction.mp4",
        videoPublicId: "",
    },
    {
        contentKey: "video.writing_intro",
        contentType: "video" as const,
        category: "video" as const,
        label: "Writing — Instruction Video",
        description: "Shown before the Writing test starts.",
        videoSource: "local" as const,
        videoUrl: "/video/writing instruction.mp4",
        videoPublicId: "",
    },

    // ===== HOMEPAGE HERO TEXTS =====
    {
        contentKey: "text.hero_badge",
        contentType: "text" as const,
        category: "homepage_text" as const,
        label: "Hero — Top Badge",
        description: "Small red pill badge above the title.",
        textValue: "100% AUTHENTIC EXAM EXPERIENCE",
    },
    {
        contentKey: "text.hero_title_line1",
        contentType: "text" as const,
        category: "homepage_text" as const,
        label: "Hero — Title Line 1 (red)",
        description: "First line of the hero title (red color).",
        textValue: "Best IELTS BD",
    },
    {
        contentKey: "text.hero_title_line2",
        contentType: "text" as const,
        category: "homepage_text" as const,
        label: "Hero — Title Line 2 (black)",
        description: "Second line of the hero title (black color).",
        textValue: "Online IELTS Mock Tests",
    },
    {
        contentKey: "text.hero_title_line3",
        contentType: "text" as const,
        category: "homepage_text" as const,
        label: "Hero — Title Line 3 (red gradient)",
        description: "Third line of the hero title (red gradient).",
        textValue: "Examination System",
    },
    {
        contentKey: "text.hero_subtitle",
        contentType: "text" as const,
        category: "homepage_text" as const,
        label: "Hero — Subtitle Paragraph",
        description: "Paragraph below the title. Use **double-asterisks** to bold a phrase (e.g. **Official-Style Computer-Based Mock Tests**).",
        textValue:
            "Prepare for your IELTS exam with our **Official-Style Computer-Based Mock Tests** — real exam format, instant results, anytime, anywhere!",
    },
];

async function seed() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("Connected to MongoDB");

        let created = 0;
        let skipped = 0;
        for (const item of initialContent) {
            const existing = await SiteContent.findOne({ contentKey: item.contentKey });
            if (existing) {
                skipped++;
                console.log(`⏭  Skipped (exists): ${item.contentKey}`);
            } else {
                await SiteContent.create(item);
                created++;
                console.log(`✅ Created: ${item.contentKey}`);
            }
        }

        console.log(`\nDone. Created: ${created}, Skipped: ${skipped}, Total: ${initialContent.length}`);
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error("Seed failed:", err);
        process.exit(1);
    }
}

seed();
