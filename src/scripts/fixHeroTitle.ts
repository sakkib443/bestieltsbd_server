/**
 * Fix Script: Update hero_title_line1 from "Mizan's Care" to "Best IELTS BD"
 * Run: npx ts-node src/scripts/fixHeroTitle.ts
 */
import mongoose from "mongoose";
import config from "../app/config";
import { SiteContent } from "../app/modules/siteContent/siteContent.model";

async function fix() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("Connected to MongoDB");

        const result = await SiteContent.updateOne(
            { contentKey: "text.hero_title_line1" },
            { $set: { textValue: "Best IELTS BD" } }
        );

        if (result.modifiedCount > 0) {
            console.log("✅ Fixed: text.hero_title_line1 → Best IELTS BD");
        } else if (result.matchedCount > 0) {
            console.log("ℹ️  Already correct or no change needed.");
        } else {
            console.log("⚠️  No document found with key: text.hero_title_line1");
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error("Fix failed:", err);
        process.exit(1);
    }
}

fix();
