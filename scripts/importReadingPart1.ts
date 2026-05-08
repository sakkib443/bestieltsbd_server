import mongoose from 'mongoose';
import { ReadingTest } from '../src/app/modules/reading/reading.model';
import { IReadingSection, IReadingQuestion } from '../src/app/modules/reading/reading.interface';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

const passageText = `Hello Happiness!
Ask 100 people what would make them happy, and a sizable majority would say “winning the lottery.” Yet, if they won a vast fortune, within a year they would be back to their previous level of happiness. The fact is that money has many uses, but more money does not mean more happiness. Surveys carried out in recent years by leading psychologists and sociologists all confirm that while individuals may increase their material wealth during the course of their lifetime, this has no bearing on their well-being. And what is true for individuals can be applied on a larger scale to the world population. Statistically, wealthier nations do not achieve higher scores on the happiness-ometer than developing or underdeveloped nations. Once the basic criteria of adequate shelter and nutrition are satisfied, increased wealth plays no significant role. So why the obsession with getting rich? The answer, say researchers, is simple. Call it jealousy, competitiveness, or just keeping up with the Joneses, however well we are doing, there is always someone else who is doing better. Just as we acquire a new $25,000 car, our neighbour parks his brand spanking new $40,000 set of wheels in his drive, causing us much consternation, but fueling us with new aspirations in the process. And so, the cycle continues. Money, or material wealth, may be a prime mover, but it is not the foundation of our well-being.
If money isn’t the key to happiness, then what is? In all 44 countries surveyed by a prominent research centre, family life provided the greatest source of satisfaction. Married people live on average three years longer and enjoy greater physical and psychological health than the unmarried and, surprisingly, couples in a cohabitational relationship. Having a family enhances well-being, and spending more time with one’s family helps even more. Social interaction among families, neighbourhoods, workplaces, communities and religious groups correlates strongly with subjective well-being. In fact, the degree of individuals’ social connections is the best benchmark of their happiness.
Friendship is another major factor. Indeed, to return to the dollar-equals-happiness equation, in one survey, having a friend converted into $50,000 worth of happiness, confirms the well-known phenomenon that loneliness can lead to depression. Work is another area central to well-being, and certain features correlate highly with happiness. These include autonomy over how, where, and at what pace work is done, trust between employer and employee, fair treatment, and active participation in the making of decisions. Occupationally, happiness tends to be more common among professionals and managers, that is, people who are in control of the work they do, rather than subservient to their bosses, inequality implies less control for those who are in the weaker position, although there are more risks of losing their privileges for those in the stronger position.
Control of one’s life in general is also key. Happiness is clearly correlated with the presence of favourable events such as promotion or marriage, and the absence of troubles or bad luck such as accidents, being laid off or conflicts. These events on their own signal the success or failure to reach one’s goals, and therefore the control one has. On a national level, the more that governments recognise individual preferences, the happier their citizens will be. Choice, and citizens’ belief that they can affect the political process, increase subjective well-being. Furthermore, evidence exists for an association between unhappiness and poor health: people from underdeveloped countries are among the unhappiest in the world, and their life expectancy has been falling steadily. People are more satisfied in societies which minimally restrict their freedom of action, in other words, where they are in control rather than being controlled. Happy people are characterised by the belief that they are able to control their situation, whereas unhappy people tend to believe that they are a victim of fate. Happy people are also more psychologically resilient, assertive and open to experience.
But how good is the evidence for this alternative viewpoint then – that happiness, and not financial status, contributes to good health, and long life? A study of nuns, spanning seven decades, supports this theory. Autobiographies written by the nuns in their early 1920s were scored for positive and negative emotions. Nuns expressing the most positive emotions lived on average ten years longer than those expressing the least positive emotions. Happy people, it seems, are much less likely to fall ill and die than unhappy people.
But what must we do to be happy? Experts cite the old maxim “be happy with what you’ve got.” Look around you, they say, and identify the positive factors in your life. Concentrating on the negative aspects of one’s life is a no-no, and so is worrying. Worrying is a negative thinking habit that is nearly always about something that lies in the future. It stems, apparently, from our cave dwelling days, when we had to think on a day-to-day basis about how and where to find food and warmth, for example. But in the modern world, worrying simply undermines our ability to enjoy life in the present. More often than not, the things we worry about never come to pass anyway. Just as important is not to dwell on the past – past mistakes, bad experiences, missed opportunities and so on.
What else can we do? Well, engage in a loving relationship with another adult, and work hard to sustain it. Try to plan frequent interactions with your family, friends and neighbours (in that order). Make sure you’re not working so hard that you’ve no time left for personal relationships and leisure. If you are, leave your job voluntarily to become self-employed, but don’t get sacked — that’s more damaging to well-being than the loss of a spouse, and its effects last longer. In your spare time, join a club, volunteer for community service, or take up religion.

If none of the above works, then vote for a political party with the same agenda as the King of Bhutan, who announced that his nation’s objective is national happiness.`;

// Questions 1-13 parsed manually from AC.md
const questionsPart1: IReadingQuestion[] = [
    {
        questionNumber: 1,
        questionType: 'multiple-choice-multi',
        questionText: 'Which THREE of the following statements are true, according to the text?\nSelect the first true statement.',
        options: [
            'A. Money can bring misery.',
            'B. Wealthier nations place more emphasis on happiness than poorer ones.',
            'C. Securing a place to live is a basic human need.',
            'D. The desire for social status is a global phenomenon.',
            'E. An unmarried couple living together is less likely to be happy than a married couple.',
            'F. The less responsibility one has, the happier one is.',
            'G. Involvement in policy-making can increase well-being.',
            'H. Our prehistoric ancestors were happier than we are.'
        ],
        correctAnswer: 'C',
        marks: 1
    },
    {
        questionNumber: 2,
        questionType: 'multiple-choice-multi',
        questionText: 'Select the second true statement.',
        options: [
            'A. Money can bring misery.',
            'B. Wealthier nations place more emphasis on happiness than poorer ones.',
            'C. Securing a place to live is a basic human need.',
            'D. The desire for social status is a global phenomenon.',
            'E. An unmarried couple living together is less likely to be happy than a married couple.',
            'F. The less responsibility one has, the happier one is.',
            'G. Involvement in policy-making can increase well-being.',
            'H. Our prehistoric ancestors were happier than we are.'
        ],
        correctAnswer: 'E',
        marks: 1
    },
    {
        questionNumber: 3,
        questionType: 'multiple-choice-multi',
        questionText: 'Select the third true statement.',
        options: [
            'A. Money can bring misery.',
            'B. Wealthier nations place more emphasis on happiness than poorer ones.',
            'C. Securing a place to live is a basic human need.',
            'D. The desire for social status is a global phenomenon.',
            'E. An unmarried couple living together is less likely to be happy than a married couple.',
            'F. The less responsibility one has, the happier one is.',
            'G. Involvement in policy-making can increase well-being.',
            'H. Our prehistoric ancestors were happier than we are.'
        ],
        correctAnswer: 'G',
        marks: 1
    },
    {
        questionNumber: 4,
        questionType: 'summary-completion-wordlist',
        questionText: 'Money can buy you just about anything, but not, it seems happiness. Whether on a personal or national [4] __________, your bank balance won’t make you happier.',
        wordList: ['A. episode', 'B. interaction', 'C. cooperation', 'D. control', 'E. number', 'F. level', 'G. course', 'H. conflict', 'I. limit'],
        correctAnswer: 'F',
        marks: 1
    },
    {
        questionNumber: 5,
        questionType: 'summary-completion-wordlist',
        questionText: 'Once the basic criteria of a roof over your head and food on the table have been met, money ceases to play a part. One of the most important factors in achieving happiness is the extent of our social [5] ___________ – our relationships with family, friends, colleagues, and so on.',
        wordList: ['A. episode', 'B. interaction', 'C. cooperation', 'D. control', 'E. number', 'F. level', 'G. course', 'H. conflict', 'I. limit'],
        correctAnswer: 'B',
        marks: 1
    },
    {
        questionNumber: 6,
        questionType: 'summary-completion-wordlist',
        questionText: 'Equally important is the amount of [6] __________ we have, either in our personal life, working life...',
        wordList: ['A. episode', 'B. interaction', 'C. cooperation', 'D. control', 'E. number', 'F. level', 'G. course', 'H. conflict', 'I. limit'],
        correctAnswer: 'D',
        marks: 1
    },
    {
        questionNumber: 7,
        questionType: 'summary-completion-wordlist',
        questionText: '...or even in our ability to influence the political [7]_____________ that our country embarks on.',
        wordList: ['A. episode', 'B. interaction', 'C. cooperation', 'D. control', 'E. number', 'F. level', 'G. course', 'H. conflict', 'I. limit'],
        correctAnswer: 'G',
        marks: 1
    },
    {
        questionNumber: 8,
        questionType: 'true-false-not-given',
        questionText: 'People from underdeveloped nations try to attain the same standard of living as those from developed nations.',
        options: ['True', 'False', 'Not Given'],
        correctAnswer: 'Not Given',
        marks: 1
    },
    {
        questionNumber: 9,
        questionType: 'true-false-not-given',
        questionText: 'Seeing what others have makes people want to have it too',
        options: ['True', 'False', 'Not Given'],
        correctAnswer: 'True',
        marks: 1
    },
    {
        questionNumber: 10,
        questionType: 'true-false-not-given',
        questionText: 'The larger the family is, the happier the parents will probably be',
        options: ['True', 'False', 'Not Given'],
        correctAnswer: 'Not Given',
        marks: 1
    },
    {
        questionNumber: 11,
        questionType: 'true-false-not-given',
        questionText: 'One’s attitude to life has no influence on one’s health',
        options: ['True', 'False', 'Not Given'],
        correctAnswer: 'False',
        marks: 1
    },
    {
        questionNumber: 12,
        questionType: 'true-false-not-given',
        questionText: 'Instinct can be a barrier to happiness.',
        options: ['True', 'False', 'Not Given'],
        correctAnswer: 'True',
        marks: 1
    },
    {
        questionNumber: 13,
        questionType: 'true-false-not-given',
        questionText: 'Family and friends rank equally as sources of happiness.',
        options: ['True', 'False', 'Not Given'],
        correctAnswer: 'False',
        marks: 1
    }
];

async function run() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB.");

        const acName = "Reading Mock Test 01 - Academic";
        const doc = await ReadingTest.findOne({ title: acName });

        if (doc) {
            // Update Section 1
            doc.sections[0].passage = passageText;
            doc.sections[0].title = "Reading Passage 1: Hello Happiness!";
            doc.sections[0].questions = questionsPart1;
            
            await doc.save();
            console.log("✅ Academic Reading Mock 01 - Part 1 passage & questions updated successfully.");
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
