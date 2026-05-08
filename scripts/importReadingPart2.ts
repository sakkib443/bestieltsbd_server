import mongoose from 'mongoose';
import { ReadingTest } from '../src/app/modules/reading/reading.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

const passageText = `A. Language lovers, just like music lovers, enjoy variety. For the latter there's Mozart, The Rolling Stones and Beyonce. For the former there's English, French, Swahili, Urdu... the list is endless. But what about those poor overworked students who find learning difficult, confusing languages a drudge? Wouldn't it put a smile on their faces if there were just one simple, easy-to-learn tongue that would cut their study time by years? Well, of course, it exists. It's called Esperanto, and it's been around for more than 120 years. Esperanto is the most widely spoken artificially constructed international language. The name derives from Doktoro Esperanto, the pseudonym under which L. L. Zamenhof first published his Unua Libro in 1887. The phrase itself means 'one who hopes'. Zamenhof's goal was to create an easy and flexible language as a universal second language to promote peace and international understanding.

B. Zamenhof, after ten years of developing his brainchild from the late 1870s to the early 1880s, had the first Esperanto grammar published in Warsaw in July 1887. The number of speakers grew rapidly over the next few decades, at first primarily in the Russian empire and Eastern Europe, then in Western Europe and the Americas, China, and Japan. In the early years, speakers of Esperanto kept in contact primarily through correspondence and periodicals, but since 1905 world congresses have been held on five continents every year except during the two World Wars. Latest estimates for the numbers of Esperanto speakers are around 2 million. Put in percentage terms, that's about 0.03% of the world's population - no staggering figure, comparatively speaking. One reason is that Esperanto has no official status in any country, but it is an optional subject on the curriculum of several state education systems. It is widely estimated that it can be learned in anywhere between a quarter to a twentieth of the time required for other languages.

C. As a constructed language, Esperanto is not genealogically related to any ethnic language. Whilst it is described as 'a language lexically predominantly Romanic', the phonology, grammar, vocabulary, and semantics are based on the western Indo-European languages. For those of us who are not naturally predisposed to tucking languages under our belts, it is an easy language to learn. It has 5 vowels and 23 consonants. It has one simple way of conjugating all of its verbs. Words are often made from many other roots, making the number of words which one must memorise much smaller. The language is phonetic, and the rules of pronunciation are very simple, so that everyone knows how to pronounce a written word and vice-versa, and word order follows a standard, logical pattern. Through prefixing and suffixing, Esperanto makes it easy to identify words as nouns, verbs, adjectives, adverbs, direct objects and so on, by means of easy-to-spot endings. All this makes for easy language learning. What's more, several research studies demonstrate that studying Esperanto before another foreign language speeds up and improves the learning of the other language. This is presumably because learning subsequent foreign languages is easier than learning one's first, while the use of a grammatically simple and culturally flexible language like Esperanto softens the blow of learning one's first foreign language. In one study, a group of European high school students studied Esperanto for one year, then French for three years, and ended up with a significantly better command of French than a control group who had studied French for all four years.

D. Needless to say, the language has Its critics. Some point to the Eastern European features of the language as being harsh and difficult to pronounce, and argue that Esperanto has an artificial feel to it, without the flow of a natural tongue, and that by nature of its artificiality, it is impossible to become emotionally involved with the language. Others cite its lack of cultural history, indigenous literature - "no one has ever written a novel straight into Esperanto" - together with its minimal vocabulary and its inability to express all the necessary philosophical, emotional and psychological concepts.

E. The champions of Esperanto - Esperantists - disagree. They claim that it is a language in which a great body of world literature has appeared in translation: in poetry, novels, literary journals, and, to rebut the accusation that it is not a 'real' language, point out that it is frequently used at international meetings which draw hundreds and thousands of participants. Moreover, on an international scale, it is most useful - and fair - for neutral communication. That means that communication through Esperanto does not give advantages to the members of any particular people or culture, but provides an ethos of equality of rights, tolerance and true internationalism.

F. Esperantists further claim that Esperanto has the potential - were it universally taught for a year or two throughout the world - to empower ordinary people to communicate effectively worldwide on a scale that far exceeds that which is attainable today by only the most linguistically brilliant among us. It offers the opportunity to improve communication in business, diplomacy, scholarship and other fields so that those who speak many different native languages will be able to participate fluently in international conferences and chat comfortably with each other after the formal presentations are made. Nowadays that privilege is often restricted to native speakers of English and those who have special talents and opportunities for learning English as a foreign language.

G. What Esperanto does offer in concrete terms is the potential of saving billions of dollars which are now being spent on translators and interpreters, billions which would be freed up to serve the purposes of governments and organisations that spend so much of their resources to change words from one language into the words of others. Take, for example, the enormously costly conferences, meetings and documentation involved in the European Union parliamentary and administrative procedures - all funded, essentially, by tax payers. And instead of the World Health Organisation, and all NGOs for that matter, devoting enormous sums to provide interpreters and translations, they would be able to devote those huge amounts of money to improving the health of stricken populations throughout the world.`;

const sectionTitle = "One Who Hopes";

async function run() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB.");

        const acName = "Reading Mock Test 01 - Academic";
        // The type signature expects specific keys, we override with any to bypass mongoose strict checks for schema
        const doc: any = await ReadingTest.findOne({ title: acName });

        if (doc) {
            // Ensure sections array has at least 2 items
            if (!doc.sections) doc.sections = [];
            while (doc.sections.length < 2) {
                doc.sections.push({
                    sectionNumber: doc.sections.length + 1,
                    title: "",
                    passage: "",
                    questionGroups: [],
                    questions: []
                });
            }

            // Update section 2
            doc.sections[1].title = sectionTitle;
            doc.sections[1].passage = passageText;
            doc.sections[1].questionGroups = [];
            doc.sections[1].questions = [];
            
            await doc.save();
            console.log("✅ Academic Reading Mock 01 - Part 2 Passage updated successfully.");
        } else {
            console.log("❌ Academic Reading Mock 01 not found.");
        }

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

run();
