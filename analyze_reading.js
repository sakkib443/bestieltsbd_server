const mongoose = require('mongoose');

const DB_URL = 'mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0';

async function analyzeReading() {
    try {
        await mongoose.connect(DB_URL);
        console.log('✅ MongoDB Connected\n');

        const db = mongoose.connection.db;

        // Get all collections
        const collections = await db.listCollections().toArray();
        console.log('📂 All Collections:', collections.map(c => c.name).join(', '));
        console.log('');

        // Find reading collection
        const readingCollectionNames = collections.filter(c => 
            c.name.toLowerCase().includes('reading')
        );
        console.log('📖 Reading Collections:', readingCollectionNames.map(c => c.name).join(', ') || 'None found');

        // Try common collection names
        const possibleNames = ['readingtests', 'readings', 'reading', 'readingTests'];
        let readingCollection = null;
        let collName = '';

        for (const name of [...possibleNames, ...readingCollectionNames.map(c => c.name)]) {
            try {
                const count = await db.collection(name).countDocuments();
                if (count > 0) {
                    readingCollection = db.collection(name);
                    collName = name;
                    console.log(`\n✅ Found reading data in "${name}" — ${count} documents\n`);
                    break;
                }
            } catch (e) { }
        }

        if (!readingCollection) {
            // Try all collections to find one with reading-like data
            for (const coll of collections) {
                try {
                    const sample = await db.collection(coll.name).findOne();
                    if (sample && (sample.testType || sample.sections || sample.testId?.includes('READING'))) {
                        readingCollection = db.collection(coll.name);
                        collName = coll.name;
                        const count = await readingCollection.countDocuments();
                        console.log(`\n✅ Found reading data in "${coll.name}" — ${count} documents\n`);
                        break;
                    }
                } catch (e) { }
            }
        }

        if (!readingCollection) {
            console.log('❌ No reading collection found');
            process.exit(1);
        }

        // Get all reading tests
        const allTests = await readingCollection.find({}).toArray();
        console.log(`📊 Total Reading Tests: ${allTests.length}`);
        console.log('='.repeat(80));

        // Analysis variables
        const questionTypeMap = {};
        const questionGroupTypeMap = {};
        let totalQuestions = 0;
        let totalSections = 0;
        const testSummaries = [];

        for (const test of allTests) {
            const testInfo = {
                testNumber: test.testNumber,
                testId: test.testId,
                title: test.title,
                testType: test.testType,
                difficulty: test.difficulty,
                isActive: test.isActive,
                totalQuestions: test.totalQuestions,
                sections: [],
                questionTypes: new Set()
            };

            if (test.sections && Array.isArray(test.sections)) {
                totalSections += test.sections.length;

                for (const section of test.sections) {
                    const sectionInfo = {
                        sectionNumber: section.sectionNumber,
                        title: section.title,
                        questionCount: 0,
                        types: [],
                        hasPassage: !!section.passage,
                        hasParagraphs: !!(section.paragraphs && section.paragraphs.length > 0),
                        hasImage: !!section.imageUrl,
                        questionGroups: []
                    };

                    // Analyze question groups
                    if (section.questionGroups && Array.isArray(section.questionGroups)) {
                        for (const group of section.questionGroups) {
                            const groupType = group.questionType || 'unknown';
                            questionGroupTypeMap[groupType] = (questionGroupTypeMap[groupType] || 0) + 1;
                            sectionInfo.questionGroups.push({
                                type: groupType,
                                range: `Q${group.startQuestion}-Q${group.endQuestion}`,
                                instructions: group.instructions?.substring(0, 80) + '...',
                                hasHeadings: !!(group.headings && group.headings.length > 0),
                                hasWordList: !!(group.wordList && group.wordList.length > 0)
                            });
                        }
                    }

                    // Analyze individual questions
                    if (section.questions && Array.isArray(section.questions)) {
                        sectionInfo.questionCount = section.questions.length;
                        totalQuestions += section.questions.length;

                        for (const q of section.questions) {
                            const qType = q.questionType || 'unknown';
                            questionTypeMap[qType] = (questionTypeMap[qType] || 0) + 1;
                            testInfo.questionTypes.add(qType);

                            if (!sectionInfo.types.includes(qType)) {
                                sectionInfo.types.push(qType);
                            }
                        }
                    }

                    testInfo.sections.push(sectionInfo);
                }
            }

            testInfo.questionTypes = [...testInfo.questionTypes];
            testSummaries.push(testInfo);
        }

        // ========== PRINT REPORT ==========
        console.log('\n' + '='.repeat(80));
        console.log('📊 READING QUESTION TYPES ANALYSIS REPORT');
        console.log('='.repeat(80));

        // Question Types Summary
        console.log('\n🎯 QUESTION TYPES FOUND IN DATABASE:');
        console.log('-'.repeat(50));
        const sortedTypes = Object.entries(questionTypeMap).sort((a, b) => b[1] - a[1]);
        sortedTypes.forEach(([type, count], i) => {
            console.log(`  ${(i + 1).toString().padStart(2)}. ${type.padEnd(35)} → ${count} questions`);
        });
        console.log(`\n  📌 Total Unique Question Types: ${sortedTypes.length}`);
        console.log(`  📌 Total Questions in DB: ${totalQuestions}`);
        console.log(`  📌 Total Sections: ${totalSections}`);
        console.log(`  📌 Total Tests: ${allTests.length}`);

        // Question Group Types
        if (Object.keys(questionGroupTypeMap).length > 0) {
            console.log('\n\n📋 QUESTION GROUP TYPES (from questionGroups array):');
            console.log('-'.repeat(50));
            Object.entries(questionGroupTypeMap).sort((a, b) => b[1] - a[1]).forEach(([type, count], i) => {
                console.log(`  ${(i + 1).toString().padStart(2)}. ${type.padEnd(35)} → ${count} groups`);
            });
        }

        // Per-Test Breakdown
        console.log('\n\n📝 PER-TEST BREAKDOWN:');
        console.log('='.repeat(80));
        for (const test of testSummaries) {
            console.log(`\n📖 Test #${test.testNumber} — "${test.title}"`);
            console.log(`   Type: ${test.testType} | Difficulty: ${test.difficulty} | Active: ${test.isActive} | Total Q: ${test.totalQuestions}`);
            console.log(`   Question Types Used: ${test.questionTypes.join(', ')}`);

            for (const sec of test.sections) {
                console.log(`\n   📄 Section ${sec.sectionNumber}: "${sec.title}"`);
                console.log(`      Questions: ${sec.questionCount} | Passage: ${sec.hasPassage ? '✅' : '❌'} | Paragraphs: ${sec.hasParagraphs ? '✅' : '❌'} | Image: ${sec.hasImage ? '✅' : '❌'}`);
                console.log(`      Types: ${sec.types.join(', ')}`);

                if (sec.questionGroups.length > 0) {
                    console.log(`      Groups:`);
                    for (const g of sec.questionGroups) {
                        console.log(`        - [${g.range}] ${g.type} ${g.hasHeadings ? '(+headings)' : ''} ${g.hasWordList ? '(+wordList)' : ''}`);
                    }
                }
            }
        }

        // Sample question for each type
        console.log('\n\n🔍 SAMPLE QUESTION FOR EACH TYPE:');
        console.log('='.repeat(80));

        for (const [qType] of sortedTypes) {
            let found = false;
            for (const test of allTests) {
                if (found) break;
                for (const section of (test.sections || [])) {
                    if (found) break;
                    for (const q of (section.questions || [])) {
                        if (q.questionType === qType) {
                            console.log(`\n  📌 Type: "${qType}"`);
                            console.log(`     Q#${q.questionNumber}: ${(q.questionText || '').substring(0, 100)}`);
                            console.log(`     Options: ${q.options ? q.options.length + ' options' : 'No options'}`);
                            console.log(`     Correct Answer: ${JSON.stringify(q.correctAnswer || '').substring(0, 80)}`);
                            console.log(`     Has Headings: ${!!(q.headingsList && q.headingsList.length)}`);
                            console.log(`     Has WordList: ${!!(q.wordList && q.wordList.length)}`);
                            console.log(`     Word Limit: ${q.wordLimit || 'N/A'}`);
                            console.log(`     Marks: ${q.marks || 'N/A'}`);
                            found = true;
                            break;
                        }
                    }
                }
            }
        }

        console.log('\n\n✅ Analysis Complete!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

analyzeReading();
