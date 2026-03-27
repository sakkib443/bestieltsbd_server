// Script to update packages in MongoDB directly
const mongoose = require('mongoose');
require('dotenv').config();

async function run() {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const pkgCol = db.collection('mockpackages');
    
    // 1. List current packages
    const all = await pkgCol.find({}).toArray();
    console.log('\n=== CURRENT PACKAGES ===');
    for (const p of all) {
        console.log(`  ${p._id} | ${p.title} | price:${p.price} | orig:${p.originalPrice} | free:${p.isFree} | bundle:${p.bundleSize||1} | active:${p.isActive}`);
    }
    
    // 2. Update ALL individual paid packages: price=169, originalPrice=999
    const updateResult = await pkgCol.updateMany(
        { isFree: false, $or: [{ bundleSize: { $exists: false } }, { bundleSize: 1 }, { bundleSize: null }] },
        { $set: { price: 169, originalPrice: 999, bundleSize: 1 } }
    );
    console.log(`\nUpdated ${updateResult.modifiedCount} paid packages to price:169, orig:999`);
    
    // 3. Update free package originalPrice to 999
    const freeResult = await pkgCol.updateMany(
        { isFree: true },
        { $set: { originalPrice: 999 } }
    );
    console.log(`Updated ${freeResult.modifiedCount} free packages originalPrice to 999`);
    
    // 4. Check if 3-set bundle exists
    const bundle3 = await pkgCol.findOne({ bundleSize: 3 });
    if (!bundle3) {
        console.log('\nCreating 3 Sets Bundle package...');
        await pkgCol.insertOne({
            title: '3 Sets Bundle',
            description: 'Get 3 complete IELTS mock tests at a discounted price. Ideal for consistent practice and improvement tracking.',
            price: 319,
            originalPrice: 2997,
            isFree: false,
            isActive: true,
            bundleSize: 3,
            badge: 'MOST POPULAR',
            features: ['3 complete IELTS mock tests', '3 unique question sets', 'Auto-graded Listening & Reading', 'Performance comparison', 'Track your improvement'],
            examSets: { listeningSetNumber: 1, readingSetNumber: 1, writingSetNumber: 1 },
            bundleExamSets: [
                { listeningSetNumber: 1, readingSetNumber: 1, writingSetNumber: 1 },
                { listeningSetNumber: 2, readingSetNumber: 2, writingSetNumber: 2 },
                { listeningSetNumber: 3, readingSetNumber: 3, writingSetNumber: 3 },
            ],
            totalPurchases: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log('  Created: 3 Sets Bundle | price:319 | orig:2997');
    } else {
        await pkgCol.updateOne({ bundleSize: 3 }, { $set: { price: 319, originalPrice: 2997, badge: 'MOST POPULAR', features: ['3 complete IELTS mock tests', '3 unique question sets', 'Auto-graded Listening & Reading', 'Performance comparison', 'Track your improvement'] } });
        console.log('\nUpdated existing 3 Sets Bundle to price:319');
    }
    
    // 5. Check if 5-set bundle exists
    const bundle5 = await pkgCol.findOne({ bundleSize: 5 });
    if (!bundle5) {
        console.log('Creating 5 Sets Bundle package...');
        await pkgCol.insertOne({
            title: '5 Sets Bundle',
            description: 'Maximum practice with 5 complete mock tests. Best value for serious IELTS preparation with full analytics.',
            price: 499,
            originalPrice: 4995,
            isFree: false,
            isActive: true,
            bundleSize: 5,
            badge: 'BEST VALUE',
            features: ['5 complete IELTS mock tests', '5 unique question sets', 'Priority examiner marking', 'Performance analytics', 'Score improvement tracking', 'Certificate of completion'],
            examSets: { listeningSetNumber: 1, readingSetNumber: 1, writingSetNumber: 1 },
            bundleExamSets: [
                { listeningSetNumber: 1, readingSetNumber: 1, writingSetNumber: 1 },
                { listeningSetNumber: 2, readingSetNumber: 2, writingSetNumber: 2 },
                { listeningSetNumber: 3, readingSetNumber: 3, writingSetNumber: 3 },
                { listeningSetNumber: 4, readingSetNumber: 4, writingSetNumber: 4 },
                { listeningSetNumber: 5, readingSetNumber: 5, writingSetNumber: 5 },
            ],
            totalPurchases: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log('  Created: 5 Sets Bundle | price:499 | orig:4995');
    } else {
        await pkgCol.updateOne({ bundleSize: 5 }, { $set: { price: 499, originalPrice: 4995, badge: 'BEST VALUE', features: ['5 complete IELTS mock tests', '5 unique question sets', 'Priority examiner marking', 'Performance analytics', 'Score improvement tracking', 'Certificate of completion'] } });
        console.log('Updated existing 5 Sets Bundle to price:499');
    }
    
    // 6. Final state
    const final = await pkgCol.find({ isActive: true }).sort({ price: 1 }).toArray();
    console.log('\n=== FINAL PACKAGES ===');
    for (const p of final) {
        console.log(`  ${p._id} | ${p.title} | price:${p.price} | orig:${p.originalPrice} | free:${p.isFree} | bundle:${p.bundleSize||1}`);
    }
    
    await mongoose.disconnect();
    console.log('\nDone!');
}

run().catch(e => { console.error('Error:', e.message); process.exit(1); });
