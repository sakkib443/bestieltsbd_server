const mongoose = require("mongoose");

const SOURCE_URI = "mongodb+srv://bac-ielts:bac-ielts@cluster0.b5kfivm.mongodb.net/bac-ielts?retryWrites=true&w=majority&appName=Cluster0";
const DEST_URI = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

async function migrateData() {
  try {
    // Connect to source
    console.log("🔗 Connecting to SOURCE database...");
    const sourceConn = await mongoose.createConnection(SOURCE_URI).asPromise();
    console.log("✅ Connected to SOURCE database");

    // Connect to destination
    console.log("🔗 Connecting to DESTINATION database...");
    const destConn = await mongoose.createConnection(DEST_URI).asPromise();
    console.log("✅ Connected to DESTINATION database");

    // Get all collections from source
    const collections = await sourceConn.db.listCollections().toArray();
    console.log(`\n📦 Found ${collections.length} collections in source database:`);
    collections.forEach(c => console.log(`   - ${c.name}`));

    let totalDocsCopied = 0;

    for (const collInfo of collections) {
      const collName = collInfo.name;

      if (collName.startsWith("system.")) {
        console.log(`⏭️  Skipping system collection: ${collName}`);
        continue;
      }

      const sourceCollection = sourceConn.db.collection(collName);
      const destCollection = destConn.db.collection(collName);

      const documents = await sourceCollection.find({}).toArray();
      const count = documents.length;

      if (count === 0) {
        console.log(`📭 ${collName}: Empty collection, skipping`);
        continue;
      }

      // Drop destination collection if exists
      try {
        await destCollection.drop();
      } catch (e) {
        // Collection might not exist
      }

      // Insert all documents
      const result = await destCollection.insertMany(documents);
      console.log(`✅ ${collName}: Copied ${result.insertedCount} documents`);
      totalDocsCopied += result.insertedCount;

      // Copy indexes
      const indexes = await sourceCollection.indexes();
      for (const index of indexes) {
        if (index.name === "_id_") continue;
        try {
          const { key, ...options } = index;
          delete options.v;
          delete options.ns;
          await destCollection.createIndex(key, options);
          console.log(`   📋 Index copied: ${index.name}`);
        } catch (e) {
          console.log(`   ⚠️  Index ${index.name} skipped: ${e.message}`);
        }
      }
    }

    console.log(`\n🎉 Migration complete! Total documents copied: ${totalDocsCopied}`);

    await sourceConn.close();
    await destConn.close();
    console.log("🔌 Database connections closed");

  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    process.exit(1);
  }
}

migrateData();
