import mongoose from "mongoose";
import { ReadingTest } from "../app/modules/reading/reading.model";
import { User } from "../app/modules/user/user.model";
import config from "../app/config";

const readingTest = {
    testId: "READING_TEST_01",
    testNumber: 1,
    title: "Reading Test 01",
    description: "IELTS Academic Reading Test featuring passages on Nutmeg – a valuable spice",
    source: "IELTS Practice Test",
    difficulty: "medium" as const,
    isActive: true,
    duration: 60,
    totalQuestions: 40,
    totalMarks: 40,
    sections: [
        // ═══════════════════════════════════════════
        // SECTION 1: Nutmeg – a valuable spice
        // ═══════════════════════════════════════════
        {
            sectionNumber: 1,
            title: "Nutmeg – a valuable spice",
            passage: `The nutmeg tree, Myristica fragrans, is a large evergreen tree native to Southeast Asia. Until the late 18th century, it only grew in one place in the world: a small group of islands in the Banda Sea, part of the Moluccas – or Spice Islands – in northeastern Indonesia. The tree is thickly branched with dense foliage of tough, dark green oval leaves, and produces small, yellow, bell-shaped flowers and pale yellow pear-shaped fruits. The fruit is encased in a flesh husk. When the fruit is ripe, this husk splits into two halves along a ridge running the length of the fruit. Inside is a purple-brown shiny seed, 2-3 cm long by about 2 cm across, surrounded by a lacy red or crimson covering called an 'aril'. These are the sources of the two spices nutmeg and mace, the former being produced from the dried seed and the latter from the aril.

Nutmeg was a highly prized and costly ingredient in European cuisine in the Middle Ages, and was used as a flavouring, medicinal, and preservative agent. Throughout this period, the Arabs were the exclusive importers of the spice to Europe. They sold nutmeg for high prices to merchants based in Venice, but they never revealed the exact location of the source of this extremely valuable commodity. The Arab-Venetian dominance of the trade finally ended in 1512, when the Portuguese reached the Banda Islands and began exploiting its precious resources.

Always in danger of competition from neighbouring Spain, the Portuguese began subcontracting their spice distribution to Dutch traders. Profits began to flow into the Netherlands, and the Dutch commercial fleet swiftly grew into one of the largest in the world. The Dutch quietly gained control of most of the shipping and trading of spices in Northern Europe. Then, in 1580, Portugal fell under Spanish rule, and by the end of the 16th century the Dutch found themselves locked out of the market. As prices for pepper, nutmeg, and other spices soared across Europe, they decided to fight back.

In 1602, Dutch merchants founded the VOC, a trading corporation better known as the Dutch East India Company. By 1617, the VOC was the richest commercial operation in the world. The company had 50,000 employees worldwide, with a private army of 30,000 men and a fleet of 200 ships. At the same time, thousands of people across Europe were dying of the plague, a highly contagious and deadly disease. Doctors were desperate for a way to stop the spread of this disease, and they decided nutmeg held the cure. Everybody wanted nutmeg, and many were willing to spare no expense to have it. Nutmeg bought for a few pennies in Indonesia could be sold for 68,000 times its original cost on the streets of London. The only problem was the short supply. And that's where the Dutch found their opportunity.

The Banda Islands were ruled by local sultans who insisted on maintaining a neutral trading policy towards foreign powers. This allowed them to avoid the presence of Portuguese or Spanish troops on their soil, but it also left them unprotected from other invaders. In 1621, the Dutch arrived and took over. Once securely in control of the Bandas, the Dutch went to work protecting their new investment. They concentrated all nutmeg production into a few easily guarded areas, uprooting and destroying any trees outside the plantation zones. Anyone caught growing a nutmeg seedling or carrying seeds without the proper authority was severely punished. In addition, all exported nutmeg was covered with lime to make sure there was no chance a fertile seed which could be grown elsewhere would leave the islands. There was only one obstacle to Dutch domination. One of the Banda Islands, a sliver of land called Run, only 3 km long by less than 1 km wide, was under the control of the British. After decades of fighting for control of this tiny island, the Dutch and British arrived at a compromise settlement, the Treaty of Breda, in 1667. Intent on securing their hold over every nutmeg-producing island, the Dutch offered a trade: if the British would give them the island of Run, they would in turn give Britain a distant and much less valuable island in North America. The British agreed. That other island was Manhattan, which is how New Amsterdam became New York. The Dutch now had a monopoly over the nutmeg trade which would last for another century.

Then, in 1770, a Frenchman named Pierre Poivre successfully smuggled nutmeg plants to safety in Mauritius, an island off the coast of Africa. Some of these were later exported to the Caribbean where they thrived, especially on the island of Grenada. Next, in 1778, a volcanic eruption in the Banda region caused a tsunami that wiped out half the nutmeg groves. Finally, in 1809, the British returned to Indonesia and seized the Banda Islands by force. They returned the islands to the Dutch in 1817, but not before transplanting hundreds of nutmeg seedlings to plantations in several locations across southern Asia. The Dutch nutmeg monopoly was over.

Today, nutmeg is grown in Indonesia, the Caribbean, India, Malaysia, Papua New Guinea and Sri Lanka, and world nutmeg production is estimated to average between 10,000 and 12,000 tonnes per year.`,
            passageSource: "IELTS Practice Test",
            instructions: "Questions 1-13",
            questionGroups: [
                // Questions 1-4: Note Completion
                {
                    groupType: "note-completion",
                    startQuestion: 1,
                    endQuestion: 4,
                    mainInstruction: "Complete the notes below.",
                    subInstruction: "Choose ONE WORD ONLY from the passage for each answer.",
                    mainHeading: "The nutmeg tree and fruit",
                    passage: `• the leaves of the tree are 1 __________ in shape
• the 2 __________ surrounds the fruit and breaks open when the fruit is ripe
• the 3 __________ is used to produce the spice nutmeg
• the covering known as the aril is used to produce 4 __________
• the tree has yellow flowers and fruit`,
                    notesSections: [
                        {
                            subHeading: "",
                            bullets: [
                                { type: "question" as const, questionNumber: 1, textBefore: "the leaves of the tree are", textAfter: "in shape", correctAnswer: "oval" },
                                { type: "question" as const, questionNumber: 2, textBefore: "the", textAfter: "surrounds the fruit and breaks open when the fruit is ripe", correctAnswer: "husk" },
                                { type: "question" as const, questionNumber: 3, textBefore: "the", textAfter: "is used to produce the spice nutmeg", correctAnswer: "seed" },
                                { type: "question" as const, questionNumber: 4, textBefore: "the covering known as the aril is used to produce", textAfter: "", correctAnswer: "mace" },
                                { type: "context" as const, text: "the tree has yellow flowers and fruit" },
                            ],
                        },
                    ],
                },
                // Questions 5-7: True/False/Not Given
                {
                    groupType: "true-false-not-given",
                    startQuestion: 5,
                    endQuestion: 7,
                    mainInstruction: "Do the following statements agree with the information given in the Reading Passage?",
                    subInstruction: "Write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.",
                    optionsExplanation: [
                        { label: "TRUE", description: "if the statement agrees with the information" },
                        { label: "FALSE", description: "if the statement contradicts the information" },
                        { label: "NOT GIVEN", description: "if there is no information on this" },
                    ],
                    statements: [
                        { questionNumber: 5, text: "In the Middle Ages, most Europeans knew where nutmeg was grown.", correctAnswer: "FALSE" },
                        { questionNumber: 6, text: "The VOC was the world's first major trading company.", correctAnswer: "NOT GIVEN" },
                        { questionNumber: 7, text: "Following the Treaty of Breda, the Dutch had control of all the islands where nutmeg grew.", correctAnswer: "TRUE" },
                    ],
                },
                // Questions 8-13: Note Completion (Table format)
                {
                    groupType: "note-completion",
                    startQuestion: 8,
                    endQuestion: 13,
                    mainInstruction: "Complete the table below.",
                    subInstruction: "Choose ONE WORD ONLY from the passage for each answer.",
                    mainHeading: "Timeline of nutmeg trade",
                    passage: `Middle Ages
• Nutmeg was brought to Europe by the 8 __________

16th century
• European nations took control of the nutmeg trade

17th century
• Demand for nutmeg grew, as it was believed to be effective against the disease known as the 9 __________
• The Dutch
– took control of the Banda Islands
– restricted nutmeg production to a few areas
– put 10 __________ on nutmeg to avoid it being cultivated outside the islands
– finally obtained the island of 11 __________ from the British

Late 18th century
• 1770 – nutmeg plants were secretly taken to 12 __________
• 1778 – half the Banda Islands' nutmeg plantations were destroyed by a 13 __________`,
                    notesSections: [
                        {
                            subHeading: "Middle Ages",
                            bullets: [
                                { type: "question" as const, questionNumber: 8, textBefore: "Nutmeg was brought to Europe by the", textAfter: "", correctAnswer: "Arabs" },
                            ],
                        },
                        {
                            subHeading: "16th century",
                            bullets: [
                                { type: "context" as const, text: "European nations took control of the nutmeg trade" },
                            ],
                        },
                        {
                            subHeading: "17th century",
                            bullets: [
                                { type: "question" as const, questionNumber: 9, textBefore: "Demand for nutmeg grew, as it was believed to be effective against the disease known as the", textAfter: "", correctAnswer: "plague" },
                                { type: "context" as const, text: "The Dutch" },
                                { type: "context" as const, text: "– took control of the Banda Islands" },
                                { type: "context" as const, text: "– restricted nutmeg production to a few areas" },
                                { type: "question" as const, questionNumber: 10, textBefore: "– put", textAfter: "on nutmeg to avoid it being cultivated outside the islands", correctAnswer: "lime" },
                                { type: "question" as const, questionNumber: 11, textBefore: "– finally obtained the island of", textAfter: "from the British", correctAnswer: "Run" },
                            ],
                        },
                        {
                            subHeading: "Late 18th century",
                            bullets: [
                                { type: "question" as const, questionNumber: 12, textBefore: "1770 – nutmeg plants were secretly taken to", textAfter: "", correctAnswer: "Mauritius" },
                                { type: "question" as const, questionNumber: 13, textBefore: "1778 – half the Banda Islands' nutmeg plantations were destroyed by a", textAfter: "", correctAnswer: "tsunami" },
                            ],
                        },
                    ],
                },
            ],
            questions: [
                // Q1-4: Note completion
                { questionNumber: 1, questionType: "note-completion", questionText: "the leaves of the tree are __________ in shape", correctAnswer: "oval", acceptableAnswers: ["oval"], marks: 1, wordLimit: 1 },
                { questionNumber: 2, questionType: "note-completion", questionText: "the __________ surrounds the fruit and breaks open when the fruit is ripe", correctAnswer: "husk", acceptableAnswers: ["husk"], marks: 1, wordLimit: 1 },
                { questionNumber: 3, questionType: "note-completion", questionText: "the __________ is used to produce the spice nutmeg", correctAnswer: "seed", acceptableAnswers: ["seed"], marks: 1, wordLimit: 1 },
                { questionNumber: 4, questionType: "note-completion", questionText: "the covering known as the aril is used to produce __________", correctAnswer: "mace", acceptableAnswers: ["mace"], marks: 1, wordLimit: 1 },
                // Q5-7: True/False/Not Given
                { questionNumber: 5, questionType: "true-false-not-given", questionText: "In the Middle Ages, most Europeans knew where nutmeg was grown.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "FALSE", marks: 1 },
                { questionNumber: 6, questionType: "true-false-not-given", questionText: "The VOC was the world's first major trading company.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "NOT GIVEN", marks: 1 },
                { questionNumber: 7, questionType: "true-false-not-given", questionText: "Following the Treaty of Breda, the Dutch had control of all the islands where nutmeg grew.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: "TRUE", marks: 1 },
                // Q8-13: Note completion (table)
                { questionNumber: 8, questionType: "note-completion", questionText: "Nutmeg was brought to Europe by the __________", correctAnswer: "Arabs", acceptableAnswers: ["Arabs", "arabs"], marks: 1, wordLimit: 1 },
                { questionNumber: 9, questionType: "note-completion", questionText: "Demand for nutmeg grew, as it was believed to be effective against the disease known as the __________", correctAnswer: "plague", acceptableAnswers: ["plague"], marks: 1, wordLimit: 1 },
                { questionNumber: 10, questionType: "note-completion", questionText: "put __________ on nutmeg to avoid it being cultivated outside the islands", correctAnswer: "lime", acceptableAnswers: ["lime"], marks: 1, wordLimit: 1 },
                { questionNumber: 11, questionType: "note-completion", questionText: "finally obtained the island of __________ from the British", correctAnswer: "Run", acceptableAnswers: ["Run", "run"], marks: 1, wordLimit: 1 },
                { questionNumber: 12, questionType: "note-completion", questionText: "nutmeg plants were secretly taken to __________", correctAnswer: "Mauritius", acceptableAnswers: ["Mauritius", "mauritius"], marks: 1, wordLimit: 1 },
                { questionNumber: 13, questionType: "note-completion", questionText: "half the Banda Islands' nutmeg plantations were destroyed by a __________", correctAnswer: "tsunami", acceptableAnswers: ["tsunami"], marks: 1, wordLimit: 1 },
            ],
        },
        // ═══════════════════════════════════════════
        // SECTION 2: Driverless cars
        // ═══════════════════════════════════════════
        {
            sectionNumber: 2,
            title: "Driverless cars",
            passage: `A

The automotive sector is well used to adapting to automation in manufacturing. The implementation of robotic car manufacture from the 1970s onwards led to significant cost savings and improvements in the reliability and flexibility of vehicle mass production. A new challenge to vehicle production is now on the horizon and, again, it comes from automation. However, this time it is not to do with the manufacturing process, but with the vehicles themselves.

Research projects on vehicle automation are not new. Vehicles with limited self-driving capabilities have been around for more than 50 years, resulting in significant contributions towards driver assistance systems. But since Google announced in 2010 that it had been trialling self-driving cars on the streets of California, progress in this field has quickly gathered pace.

B

There are many reasons why technology is advancing so fast. One frequently cited motive is safety; indeed, research at the UK's Transport Research Laboratory has demonstrated that more than 90 percent of road collisions involve human error as a contributory factor, and it is the primary cause in the vast majority. Automation may help to reduce the incidence of this.

Another aim is to free the time people spend driving for other purposes. If the vehicle can do some or all of the driving, it may be possible to be productive, to socialise or simply to relax while automation systems have responsibility for safe control of the vehicle. If the vehicle can do the driving, those who are challenged by existing mobility models – such as older or disabled travellers – may be able to enjoy significantly greater travel autonomy.

C

Beyond these direct benefits, we can consider the wider implications for transport and society, and how manufacturing processes might need to respond as a result. At present, the average car spends more than 90 percent of its life parked. Automation means that initiatives for car-sharing become much more viable, particularly in urban areas with significant travel demand. If a significant proportion of the population choose to use shared automated vehicles, mobility demand can be met by far fewer vehicles.

D

The Massachusetts Institute of Technology investigated automated mobility in Singapore, finding that fewer than 30 percent of the vehicles currently used would be required if fully automated car sharing could be implemented. If this is the case, it might mean that we need to manufacture far fewer vehicles to meet demand. However, the number of trips being taken would probably increase, partly because empty vehicles would have to be moved from one customer to the next.

Modelling work by the University of Michigan Transportation Research Institute suggests automated vehicles might reduce vehicle ownership by 43 percent, but that vehicles' average annual mileage double as a result. As a consequence, each vehicle would be used more intensively, and might need replacing sooner. This faster rate of turnover may mean that vehicle production will not necessarily decrease.

E

Automation may prompt other changes in vehicle manufacture. If we move to a model where consumers are tending not to own a single vehicle but to purchase access to a range of vehicle through a mobility provider, drivers will have the freedom to select one that best suits their needs for a particular journey, rather than making a compromise across all their requirements.

Since, for most of the time, most of the seats in most cars are unoccupied, this may boost production of a smaller, more efficient range of vehicles that suit the needs of individuals. Specialised vehicles may then be available for exceptional journeys, such as going on a family camping trip or helping a son or daughter move to university.

F

There are a number of hurdles to overcome in delivering automated vehicles to our roads. These include the technical difficulties in ensuring that the vehicle works reliably in the infinite range of traffic, weather and road situations it might encounter; the regulatory challenges in understanding how liability and enforcement might change when drivers are no longer essential for vehicle operation; and the societal changes that may be required for communities to trust and accept automated vehicles as being a valuable part of the mobility landscape.

G

It's clear that there are many challenges that need to be addressed but, through robust and targeted research, these can most probably be conquered within the next 10 years. Mobility will change in such potentially significant ways and in association with so many other technological developments, such as telepresence and virtual reality, that it is hard to make concrete predictions about the future. However, one thing is certain: change is coming, and the need to be flexible in response to this will be vital for those involved in manufacturing the vehicles that will deliver future mobility.`,
            passageSource: "IELTS Practice Test",
            paragraphs: [
                { label: "A", text: "The automotive sector is well used to adapting to automation in manufacturing. The implementation of robotic car manufacture from the 1970s onwards led to significant cost savings and improvements in the reliability and flexibility of vehicle mass production. A new challenge to vehicle production is now on the horizon and, again, it comes from automation. However, this time it is not to do with the manufacturing process, but with the vehicles themselves. Research projects on vehicle automation are not new. Vehicles with limited self-driving capabilities have been around for more than 50 years, resulting in significant contributions towards driver assistance systems. But since Google announced in 2010 that it had been trialling self-driving cars on the streets of California, progress in this field has quickly gathered pace." },
                { label: "B", text: "There are many reasons why technology is advancing so fast. One frequently cited motive is safety; indeed, research at the UK's Transport Research Laboratory has demonstrated that more than 90 percent of road collisions involve human error as a contributory factor, and it is the primary cause in the vast majority. Automation may help to reduce the incidence of this. Another aim is to free the time people spend driving for other purposes. If the vehicle can do some or all of the driving, it may be possible to be productive, to socialise or simply to relax while automation systems have responsibility for safe control of the vehicle. If the vehicle can do the driving, those who are challenged by existing mobility models – such as older or disabled travellers – may be able to enjoy significantly greater travel autonomy." },
                { label: "C", text: "Beyond these direct benefits, we can consider the wider implications for transport and society, and how manufacturing processes might need to respond as a result. At present, the average car spends more than 90 percent of its life parked. Automation means that initiatives for car-sharing become much more viable, particularly in urban areas with significant travel demand. If a significant proportion of the population choose to use shared automated vehicles, mobility demand can be met by far fewer vehicles." },
                { label: "D", text: "The Massachusetts Institute of Technology investigated automated mobility in Singapore, finding that fewer than 30 percent of the vehicles currently used would be required if fully automated car sharing could be implemented. If this is the case, it might mean that we need to manufacture far fewer vehicles to meet demand. However, the number of trips being taken would probably increase, partly because empty vehicles would have to be moved from one customer to the next. Modelling work by the University of Michigan Transportation Research Institute suggests automated vehicles might reduce vehicle ownership by 43 percent, but that vehicles' average annual mileage double as a result. As a consequence, each vehicle would be used more intensively, and might need replacing sooner. This faster rate of turnover may mean that vehicle production will not necessarily decrease." },
                { label: "E", text: "Automation may prompt other changes in vehicle manufacture. If we move to a model where consumers are tending not to own a single vehicle but to purchase access to a range of vehicle through a mobility provider, drivers will have the freedom to select one that best suits their needs for a particular journey, rather than making a compromise across all their requirements. Since, for most of the time, most of the seats in most cars are unoccupied, this may boost production of a smaller, more efficient range of vehicles that suit the needs of individuals. Specialised vehicles may then be available for exceptional journeys, such as going on a family camping trip or helping a son or daughter move to university." },
                { label: "F", text: "There are a number of hurdles to overcome in delivering automated vehicles to our roads. These include the technical difficulties in ensuring that the vehicle works reliably in the infinite range of traffic, weather and road situations it might encounter; the regulatory challenges in understanding how liability and enforcement might change when drivers are no longer essential for vehicle operation; and the societal changes that may be required for communities to trust and accept automated vehicles as being a valuable part of the mobility landscape." },
                { label: "G", text: "It's clear that there are many challenges that need to be addressed but, through robust and targeted research, these can most probably be conquered within the next 10 years. Mobility will change in such potentially significant ways and in association with so many other technological developments, such as telepresence and virtual reality, that it is hard to make concrete predictions about the future. However, one thing is certain: change is coming, and the need to be flexible in response to this will be vital for those involved in manufacturing the vehicles that will deliver future mobility." },
            ],
            instructions: "Questions 14-26",
            questionGroups: [
                // Questions 14-18: Matching Information
                {
                    groupType: "matching-information",
                    startQuestion: 14,
                    endQuestion: 18,
                    mainInstruction: "The Reading Passage has seven paragraphs, A-G. Which section contains the following information?",
                    subInstruction: "Write the correct letter, A-G, in boxes on your answer sheet.",
                    paragraphOptions: ["A", "B", "C", "D", "E", "F", "G"],
                    matchingItems: [
                        { questionNumber: 14, text: "a reference to the amount of time when a car is not in use", correctAnswer: "C" },
                        { questionNumber: 15, text: "mention of several advantages of driverless vehicles for individual road-users", correctAnswer: "B" },
                        { questionNumber: 16, text: "reference to the opportunity of choosing the most appropriate vehicle for each trip", correctAnswer: "E" },
                        { questionNumber: 17, text: "an estimate of how long it will take to overcome a number of problems", correctAnswer: "G" },
                        { questionNumber: 18, text: "a suggestion that the use of driverless cars may have no effect on the number of vehicles manufactured", correctAnswer: "D" },
                    ],
                },
                // Questions 19-22: Note Completion (Summary)
                {
                    groupType: "note-completion",
                    startQuestion: 19,
                    endQuestion: 22,
                    mainInstruction: "Complete the summary below.",
                    subInstruction: "Choose NO MORE THAN TWO WORDS from the passage for each answer.",
                    mainHeading: "The impact of driverless cars",
                    passage: `Figures from the Transport Research Laboratory indicate that most motor accidents are partly due to 19 __________, so the introduction of driverless vehicles will result in greater safety. In addition to the direct benefits of automation, it may bring other advantages. For example, schemes for 20 __________ will be more workable, especially in towns and cities, resulting in fewer cars on the road.

According to the University of Michigan Transportation Research Institute, there could be a 43 percent drop in 21 __________ of cars. However, this would mean that the yearly 22 __________ of each car would, on average, be twice as high as it currently is. This would lead to a higher turnover of vehicles, and therefore no reduction in automotive manufacturing.`,
                    notesSections: [
                        {
                            subHeading: "",
                            bullets: [
                                { type: "question" as const, questionNumber: 19, textBefore: "Figures from the Transport Research Laboratory indicate that most motor accidents are partly due to", textAfter: ", so the introduction of driverless vehicles will result in greater safety.", correctAnswer: "human error" },
                                { type: "question" as const, questionNumber: 20, textBefore: "For example, schemes for", textAfter: "will be more workable, especially in towns and cities, resulting in fewer cars on the road.", correctAnswer: "car-sharing" },
                                { type: "question" as const, questionNumber: 21, textBefore: "According to the University of Michigan Transportation Research Institute, there could be a 43 percent drop in", textAfter: "of cars.", correctAnswer: "ownership" },
                                { type: "question" as const, questionNumber: 22, textBefore: "However, this would mean that the yearly", textAfter: "of each car would, on average, be twice as high as it currently is.", correctAnswer: "mileage" },
                            ],
                        },
                    ],
                },
                // Questions 23-24: Choose TWO letters (benefits)
                {
                    groupType: "choose-two-letters",
                    startQuestion: 23,
                    endQuestion: 24,
                    mainInstruction: "Choose TWO letters, A-E.",
                    subInstruction: "Write the correct letters in boxes on your answer sheet.",
                    questionSets: [
                        {
                            questionNumbers: [23, 24],
                            questionText: "Which TWO benefits of automated vehicles does the writer mention?",
                            options: [
                                { letter: "A", text: "Car travellers could enjoy considerable cost savings." },
                                { letter: "B", text: "It would be easier to find parking spaces in urban areas." },
                                { letter: "C", text: "Travellers could spend journeys doing something other than driving." },
                                { letter: "D", text: "People who find driving physically difficult could travel independently." },
                                { letter: "E", text: "A reduction in the number of cars would mean a reduction in pollution." },
                            ],
                            correctAnswers: ["C", "D"],
                        },
                    ],
                },
                // Questions 25-26: Choose TWO letters (challenges)
                {
                    groupType: "choose-two-letters",
                    startQuestion: 25,
                    endQuestion: 26,
                    mainInstruction: "Choose TWO letters, A-E.",
                    subInstruction: "Write the correct letters in boxes on your answer sheet.",
                    questionSets: [
                        {
                            questionNumbers: [25, 26],
                            questionText: "Which TWO challenges to automated vehicle development does the writer mention?",
                            options: [
                                { letter: "A", text: "making sure the general public has confidence in automated vehicles" },
                                { letter: "B", text: "managing the pace of transition from conventional to automated vehicles" },
                                { letter: "C", text: "deciding how to compensate professional drivers who become redundant" },
                                { letter: "D", text: "setting up the infrastructure to make roads suitable for automated vehicles" },
                                { letter: "E", text: "getting automated vehicles to adapt to various different driving conditions" },
                            ],
                            correctAnswers: ["A", "E"],
                        },
                    ],
                },
            ],
            questions: [
                // Q14-18: Matching Information
                { questionNumber: 14, questionType: "matching-information", questionText: "a reference to the amount of time when a car is not in use", options: ["A", "B", "C", "D", "E", "F", "G"], correctAnswer: "C", marks: 1 },
                { questionNumber: 15, questionType: "matching-information", questionText: "mention of several advantages of driverless vehicles for individual road-users", options: ["A", "B", "C", "D", "E", "F", "G"], correctAnswer: "B", marks: 1 },
                { questionNumber: 16, questionType: "matching-information", questionText: "reference to the opportunity of choosing the most appropriate vehicle for each trip", options: ["A", "B", "C", "D", "E", "F", "G"], correctAnswer: "E", marks: 1 },
                { questionNumber: 17, questionType: "matching-information", questionText: "an estimate of how long it will take to overcome a number of problems", options: ["A", "B", "C", "D", "E", "F", "G"], correctAnswer: "G", marks: 1 },
                { questionNumber: 18, questionType: "matching-information", questionText: "a suggestion that the use of driverless cars may have no effect on the number of vehicles manufactured", options: ["A", "B", "C", "D", "E", "F", "G"], correctAnswer: "D", marks: 1 },
                // Q19-22: Note completion (summary)
                { questionNumber: 19, questionType: "note-completion", questionText: "most motor accidents are partly due to __________", correctAnswer: "human error", acceptableAnswers: ["human error"], marks: 1, wordLimit: 2 },
                { questionNumber: 20, questionType: "note-completion", questionText: "schemes for __________ will be more workable", correctAnswer: "car-sharing", acceptableAnswers: ["car-sharing", "car sharing"], marks: 1, wordLimit: 2 },
                { questionNumber: 21, questionType: "note-completion", questionText: "a 43 percent drop in __________ of cars", correctAnswer: "ownership", acceptableAnswers: ["ownership", "vehicle ownership"], marks: 1, wordLimit: 2 },
                { questionNumber: 22, questionType: "note-completion", questionText: "the yearly __________ of each car would be twice as high", correctAnswer: "mileage", acceptableAnswers: ["mileage", "annual mileage"], marks: 1, wordLimit: 2 },
                // Q23-24: Choose two letters (benefits)
                { questionNumber: 23, questionType: "choose-two-letters", questionText: "Which TWO benefits of automated vehicles does the writer mention?", options: ["A", "B", "C", "D", "E"], correctAnswer: "C", marks: 1 },
                { questionNumber: 24, questionType: "choose-two-letters", questionText: "Which TWO benefits of automated vehicles does the writer mention?", options: ["A", "B", "C", "D", "E"], correctAnswer: "D", marks: 1 },
                // Q25-26: Choose two letters (challenges)
                { questionNumber: 25, questionType: "choose-two-letters", questionText: "Which TWO challenges to automated vehicle development does the writer mention?", options: ["A", "B", "C", "D", "E"], correctAnswer: "A", marks: 1 },
                { questionNumber: 26, questionType: "choose-two-letters", questionText: "Which TWO challenges to automated vehicle development does the writer mention?", options: ["A", "B", "C", "D", "E"], correctAnswer: "E", marks: 1 },
            ],
        },
        // ═══════════════════════════════════════════
        // SECTION 3: What is exploration?
        // ═══════════════════════════════════════════
        {
            sectionNumber: 3,
            title: "What is exploration?",
            passage: `We are all explorers. Our desire to discover, and then share that new-found knowledge, is part of what makes us human – indeed, this has played an important part in our success as a species. Long before the first caveman slumped down beside the fire and grunted news that there were plenty of wildebeest over yonder, our ancestors had learnt the value of sending out scouts to investigate the unknown. This questing nature of ours undoubtedly helped our species spread around the globe, just as it nowadays no doubt helps the last nomadic Penan maintain their existence in the depleted forests of Borneo, and a visitor negotiate the subways of New York.

Over the years, we've come to think of explorers as a peculiar breed – different from the rest of us, different from those of us who are merely 'well travelled', even; and perhaps there is a type of person more suited to seeking out the new, a type of caveman more inclined to risk venturing out. That, however, doesn't take away from the fact that we all have this enquiring instinct, even today; and that in all sorts of professions – whether artist, marine biologist or astronomer – borders of the unknown are being tested each day.

Thomas Hardy set some of his novels in Egdon Heath, a fictional area of uncultivated land, and used the landscape to suggest the desires and fears of his characters. He is delving into matters we all recognise because they are common to humanity. This is surely an act of exploration, and into a world as remote as the author chooses. Explorer and travel writer Peter Fleming talks of the moment when the explorer returns to the existence he has left behind with his loved ones. The traveller 'who has for weeks or months seen himself only as a puny and irrelevant alien crawling laboriously over a country in which he has no roots and no background, suddenly encounters his other self, a relatively solid figure, with a place in the minds of certain people'.

In this book about the exploration of the earth's surface, I have confined myself to those whose travels were real and who also aimed at more than personal discovery. But that still left me with another problem: the word 'explorer' has become associated with a past era. We think back to a golden age, as if exploration peaked somehow in the 19th century – as if the process of discovery is now on the decline, though the truth is that we have named only one and a half million of this planet's species, and there may be more than 10 million – and that's not including bacteria. We have studied only 5 per cent of the species we know. We have scarcely mapped the ocean floors, and know even less about ourselves; we fully understand the workings of only 10 per cent of our brains.

Here is how some of today's 'explorers' define the word. Ran Fiennes, dubbed the 'greatest living explorer', said, 'An explorer is someone who has done something that no human has done before – and also done something scientifically useful.' Chris Bonington, a leading mountaineer, felt exploration was to be found in the act of physically touching the unknown: 'You have to have gone somewhere new.' Then Robin Hanbury-Tenison, a campaigner on behalf of remote so-called 'tribal' peoples, said, 'A traveller simply records information about some far-off world, and reports back; but an explorer changes the world.' Wilfred Thesiger, who crossed Arabia's Empty Quarter in 1946, and belongs to an era of unmechanised travel now lost to the rest of us, told me, 'If I'd gone across by camel when I could have gone by car, it would have been a stunt.' To him, exploration meant bringing back information from a remote place regardless of any great self-discovery.

Each definition is slightly different – and tends to reflect the field of endeavour of each pioneer. It was the same whoever I asked: the prominent historian would say exploration was a thing of the past, the cutting-edge scientist would say it was of the present. And so on. They each set their own particular criteria; the common factor in their approach being that they all had, unlike many of us who simply enjoy travel or discovering new things, both a very definite objective from the outset and also a desire to record their findings.

I'd best declare my own bias. As a writer, I'm interested in the exploration of ideas. I've done a great many expeditions and each one was unique. I've lived for months alone with isolated groups of people all around the world, even two 'uncontacted tribes'. But none of these things is of the slightest interest to anyone unless, through my books, I've found a new slant, explored a new idea. Why? Because the world has moved on. The time has long passed for the great continental voyages – another walk to the poles, another crossing of the Empty Quarter. We know how the land surface of our planet lies; exploration of it is now down to the details – the habits of microbes, say, or the grazing behaviour of buffalo. Aside from the deep sea and deep underground, it's the era of specialists. However, this is to disregard the role the human mind has in conveying remote places; and this is what interests me: how a fresh interpretation, even of a well-travelled route, can give its readers new insights.`,
            passageSource: "IELTS Practice Test",
            instructions: "Questions 27-40",
            questionGroups: [
                // Questions 27-32: Multiple Choice Full
                {
                    groupType: "multiple-choice-full",
                    startQuestion: 27,
                    endQuestion: 32,
                    mainInstruction: "Choose the correct letter, A, B, C or D.",
                    subInstruction: "Write the correct letter in boxes on your answer sheet.",
                    mcQuestions: [
                        {
                            questionNumber: 27,
                            questionText: "The writer refers to visitors to New York to illustrate the point that",
                            options: [
                                { letter: "A", text: "exploration is an intrinsic element of being human." },
                                { letter: "B", text: "most people are enthusiastic about exploring." },
                                { letter: "C", text: "exploration can lead to surprising results." },
                                { letter: "D", text: "most people find exploration daunting." },
                            ],
                            correctAnswer: "A",
                        },
                        {
                            questionNumber: 28,
                            questionText: "According to the second paragraph, what is the writer's view of explorers?",
                            options: [
                                { letter: "A", text: "Their discoveries have brought both benefits and disadvantages." },
                                { letter: "B", text: "Their main value is in teaching others." },
                                { letter: "C", text: "They act on an urge that is common to everyone." },
                                { letter: "D", text: "They tend to be more attracted to certain professions than to others." },
                            ],
                            correctAnswer: "C",
                        },
                        {
                            questionNumber: 29,
                            questionText: "The writer refers to a description of Egdon Heath to suggest that",
                            options: [
                                { letter: "A", text: "Hardy was writing about his own experience of exploration." },
                                { letter: "B", text: "Hardy was mistaken about the nature of exploration." },
                                { letter: "C", text: "Hardy's aim was to investigate people's emotional states." },
                                { letter: "D", text: "Hardy's aim was to show the attraction of isolation." },
                            ],
                            correctAnswer: "C",
                        },
                        {
                            questionNumber: 30,
                            questionText: "In the fourth paragraph, the writer refers to 'a golden age' to suggest that",
                            options: [
                                { letter: "A", text: "the amount of useful information produced by exploration has decreased." },
                                { letter: "B", text: "fewer people are interested in exploring than in the 19th century." },
                                { letter: "C", text: "recent developments have made exploration less exciting." },
                                { letter: "D", text: "we are wrong to think that exploration is no longer necessary." },
                            ],
                            correctAnswer: "D",
                        },
                        {
                            questionNumber: 31,
                            questionText: "In the sixth paragraph, when discussing the definition of exploration, the writer argues that",
                            options: [
                                { letter: "A", text: "people tend to relate exploration to their own professional interests." },
                                { letter: "B", text: "certain people are likely to misunderstand the nature of exploration." },
                                { letter: "C", text: "the generally accepted definition has changed over time." },
                                { letter: "D", text: "historians and scientists have more valid definitions than the general public." },
                            ],
                            correctAnswer: "A",
                        },
                        {
                            questionNumber: 32,
                            questionText: "In the last paragraph, the writer explains that he is interested in",
                            options: [
                                { letter: "A", text: "how someone's personality is reflected in their choice of places to visit." },
                                { letter: "B", text: "the human ability to cast new light on places that may be familiar." },
                                { letter: "C", text: "how travel writing has evolved to meet changing demands." },
                                { letter: "D", text: "the feelings that writers develop about the places that they explore." },
                            ],
                            correctAnswer: "B",
                        },
                    ],
                },
                // Questions 33-37: Matching Features
                {
                    groupType: "matching-features",
                    startQuestion: 33,
                    endQuestion: 37,
                    mainInstruction: "Look at the following statements and the list of explorers below. Match each statement with the correct explorer, A-E.",
                    subInstruction: "Write the correct letter, A-E, in boxes on your answer sheet.",
                    note: "NB You may use any letter more than once.",
                    featureListTitle: "List of Explorers",
                    featureOptions: [
                        { letter: "A", text: "Peter Fleming" },
                        { letter: "B", text: "Ran Fiennes" },
                        { letter: "C", text: "Chris Bonington" },
                        { letter: "D", text: "Robin Hanbury-Tenison" },
                        { letter: "E", text: "Wilfred Thesiger" },
                    ],
                    paragraphOptions: ["A", "B", "C", "D", "E"],
                    matchingItems: [
                        { questionNumber: 33, text: "He referred to the relevance of the form of transport used.", correctAnswer: "E" },
                        { questionNumber: 34, text: "He described feelings on coming back home after a long journey.", correctAnswer: "A" },
                        { questionNumber: 35, text: "He worked for the benefit of specific groups of people.", correctAnswer: "D" },
                        { questionNumber: 36, text: "He did not consider learning about oneself an essential part of exploration.", correctAnswer: "E" },
                        { questionNumber: 37, text: "He defined exploration as being both unique and of value to others.", correctAnswer: "B" },
                    ],
                },
                // Questions 38-40: Note Completion (Summary)
                {
                    groupType: "note-completion",
                    startQuestion: 38,
                    endQuestion: 40,
                    mainInstruction: "Complete the summary below.",
                    subInstruction: "Choose NO MORE THAN TWO WORDS from the passage for each answer.",
                    mainHeading: "The writer's own bias",
                    passage: `The writer has experience of a large number of 38 __________, and was the first stranger that certain previously 39 __________ people had encountered. He believes there is no need for further exploration of Earth's 40 __________, except to answer specific questions such as how buffalo eat.`,
                    notesSections: [
                        {
                            subHeading: "",
                            bullets: [
                                { type: "question" as const, questionNumber: 38, textBefore: "The writer has experience of a large number of", textAfter: ", and was the first stranger that certain previously", correctAnswer: "expeditions" },
                                { type: "question" as const, questionNumber: 39, textBefore: "certain previously", textAfter: "people had encountered.", correctAnswer: "uncontacted" },
                                { type: "question" as const, questionNumber: 40, textBefore: "He believes there is no need for further exploration of Earth's", textAfter: ", except to answer specific questions such as how buffalo eat.", correctAnswer: "land surface" },
                            ],
                        },
                    ],
                },
            ],
            questions: [
                // Q27-32: Multiple choice full
                { questionNumber: 27, questionType: "multiple-choice-full", questionText: "The writer refers to visitors to New York to illustrate the point that", options: ["A", "B", "C", "D"], correctAnswer: "A", marks: 1 },
                { questionNumber: 28, questionType: "multiple-choice-full", questionText: "According to the second paragraph, what is the writer's view of explorers?", options: ["A", "B", "C", "D"], correctAnswer: "C", marks: 1 },
                { questionNumber: 29, questionType: "multiple-choice-full", questionText: "The writer refers to a description of Egdon Heath to suggest that", options: ["A", "B", "C", "D"], correctAnswer: "C", marks: 1 },
                { questionNumber: 30, questionType: "multiple-choice-full", questionText: "In the fourth paragraph, the writer refers to 'a golden age' to suggest that", options: ["A", "B", "C", "D"], correctAnswer: "D", marks: 1 },
                { questionNumber: 31, questionType: "multiple-choice-full", questionText: "In the sixth paragraph, when discussing the definition of exploration, the writer argues that", options: ["A", "B", "C", "D"], correctAnswer: "A", marks: 1 },
                { questionNumber: 32, questionType: "multiple-choice-full", questionText: "In the last paragraph, the writer explains that he is interested in", options: ["A", "B", "C", "D"], correctAnswer: "B", marks: 1 },
                // Q33-37: Matching features
                { questionNumber: 33, questionType: "matching-features", questionText: "He referred to the relevance of the form of transport used.", options: ["A", "B", "C", "D", "E"], correctAnswer: "E", marks: 1 },
                { questionNumber: 34, questionType: "matching-features", questionText: "He described feelings on coming back home after a long journey.", options: ["A", "B", "C", "D", "E"], correctAnswer: "A", marks: 1 },
                { questionNumber: 35, questionType: "matching-features", questionText: "He worked for the benefit of specific groups of people.", options: ["A", "B", "C", "D", "E"], correctAnswer: "D", marks: 1 },
                { questionNumber: 36, questionType: "matching-features", questionText: "He did not consider learning about oneself an essential part of exploration.", options: ["A", "B", "C", "D", "E"], correctAnswer: "E", marks: 1 },
                { questionNumber: 37, questionType: "matching-features", questionText: "He defined exploration as being both unique and of value to others.", options: ["A", "B", "C", "D", "E"], correctAnswer: "B", marks: 1 },
                // Q38-40: Note completion (summary)
                { questionNumber: 38, questionType: "note-completion", questionText: "The writer has experience of a large number of __________", correctAnswer: "expeditions", acceptableAnswers: ["expeditions"], marks: 1, wordLimit: 2 },
                { questionNumber: 39, questionType: "note-completion", questionText: "was the first stranger that certain previously __________ people had encountered", correctAnswer: "uncontacted", acceptableAnswers: ["uncontacted"], marks: 1, wordLimit: 2 },
                { questionNumber: 40, questionType: "note-completion", questionText: "no need for further exploration of Earth's __________", correctAnswer: "land surface", acceptableAnswers: ["land surface"], marks: 1, wordLimit: 2 },
            ],
        },
    ],
};

async function seedTest() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("Connected to database");

        const existing = await ReadingTest.findOne({ testId: readingTest.testId });
        if (existing) {
            await ReadingTest.findByIdAndUpdate(existing._id, readingTest);
            console.log("✅ Reading Test updated successfully!");
        } else {
            const admin = await User.findOne({ role: "admin" });
            if (!admin) {
                console.log("❌ Admin user not found. Please create an admin user first.");
                process.exit(1);
            }
            await ReadingTest.create({ ...readingTest, createdBy: admin._id });
            console.log("✅ Reading Test created successfully!");
        }

        console.log(`
📝 Test Details:
   Title: ${readingTest.title}
   Test ID: ${readingTest.testId}
   Test Number: ${readingTest.testNumber}
   Total Questions: ${readingTest.totalQuestions}
   Sections:
     1. ${readingTest.sections[0].title} (Q1-13)
     2. ${readingTest.sections[1].title} (Q14-26)
     3. ${readingTest.sections[2].title} (Q27-40)
        `);

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

seedTest();
