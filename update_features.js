const mongoose = require('mongoose');
require('dotenv').config();

async function run() {
    await mongoose.connect(process.env.DATABASE_URL);
    const db = mongoose.connection.db;
    const col = db.collection('mockpackages');
    
    const commonFeatures = ["Listening + Reading + Writing", "Real IELTS exam format", "Auto-graded results", "Instant score report"];
    
    // Update 3-bundle features
    await col.updateOne({ bundleSize: 3 }, { $set: { features: ["3 complete mock tests", ...commonFeatures] } });
    // Update 5-bundle features
    await col.updateOne({ bundleSize: 5 }, { $set: { features: ["5 complete mock tests", ...commonFeatures] } });
    
    console.log('Updated bundle features (removed certificate)');
    
    const all = await col.find({ isActive: true }).sort({ price: 1 }).toArray();
    for (const p of all) {
        console.log(`${p.title} | features: ${JSON.stringify(p.features || [])}`);
    }
    
    await mongoose.disconnect();
}
run();
