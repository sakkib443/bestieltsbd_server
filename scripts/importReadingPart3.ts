import mongoose from 'mongoose';
import { ReadingTest } from '../src/app/modules/reading/reading.model';

const uri = "mongodb+srv://besiieltsbd:besiieltsbd@cluster0.b5kfivm.mongodb.net/besiieltsbd?appName=Cluster0";

const passageText = `A. Melting land ice in the Arctic is set to cause a global rise in sea levels, leading to disastrous effects for both man and wildlife. Many species worldwide are threatened with extinction, and low-lying islands and land masses will disappear entirely. But the havoc wreaked by the effect of greenhouse gases won’t be confined to just too much water, but the absence of it, as well. In other words, desertification. A decrease in the total amount of rainfall in arid and semi-arid areas could increase the total area of drylands worldwide, and thus the total amount of land potentially at risk from desertification.

B. Desertification is officially recognised as land degradation in arid, semi-arid and dry sub-humid areas resulting from various factors including climatic variations and human activities. This degradation of formerly productive land is a complex process. It involves multiple causes, and it proceeds at varying rates in different climates. Desertification may intensify a general climatic trend, or initiate a change in local climate, both leading towards greater aridity. The more arid conditions associated with desertification accelerate the depletion of vegetation and soils. Land degradation occurs all over the world, but it is only referred to as desertification when it takes place in drylands. This is because these areas are especially prone to more permanent damage as different areas of degraded land spread and merge together to form desert-like conditions.

C. Global warming brought about by increasing greenhouse gas levels in the atmosphere is expected to increase the variability of weather conditions and extreme events. Many dryland areas face increasingly low and erratic rainfalls, coupled with soil erosion by wind and the drying-up of water resources through increased regional temperatures. Deforestation can also reduce rainfall in certain areas, increasing the threat of desertification. It is not yet possible, despite sophisticated technology, to identify with an acceptable degree of reliability those parts of the Earth where desertification will occur. Existing drylands, which cover over 40% of the total land area of the world, most significantly in Africa and Asia, will probably be most at risk from climate change. These areas already experience low rainfall, and any that falls is usually in the form of short, erratic, high-intensity storms. In addition, such areas also suffer from land degradation due to over-cultivation, overgrazing, deforestation and poor irrigation practices.

D. It is a misconception that droughts cause desertification. Droughts are common in arid and semi-arid lands. Well-managed lands can recover from drought when the rains return. Continued land abuse during droughts, however, increases land degradation. Nor does desertification occur in linear, easily definable patterns. Deserts advance erratically, forming patches on their borders. Areas far from natural deserts can degrade quickly to barren soil, rock, or sand through poor land management. The presence of a nearby desert has no direct relationship to desertification. Unfortunately, an area undergoing desertification is brought to public attention only after the process is well underway. Often little or no data are available to indicate the previous state of the ecosystem or the rate of degradation. Scientists still question whether desertification, as a process of global change, is permanent or how and when it can be halted or reversed.

E. But desertification will not be limited to the drylands of Africa and Asia. According to the environmental organisation Greenpeace, the Mediterranean will suffer substantially, too. If current trends in emissions of greenhouse gases continue, global temperatures are expected to rise faster over the next century than over any time during the last 10,000 years. Significant uncertainties surround predictions of regional climate changes, but it is likely that the Mediterranean region will also warm significantly, increasing the frequency and severity of droughts across the region. As the world warms, global sea levels will rise as oceans expand and glaciers melt. Around much of the Mediterranean basin, sea levels could rise by close to 1m by 2100. As a result, some low-lying coastal areas would be lost through flooding or erosion, while rivers and coastal aquifers would become more salty. The worst affected areas will be the Nile Delta, Venice in Italy and Thessaloniki in Greece, two major cities where local subsidence means that sea levels could rise by at least one-and-a-half times as much as elsewhere.

F. The consequences of all this, says Greenpeace, are far-reaching, and the picture is a gloomy one. Livestock production would suffer due to a deterioration in the quality of rangeland. Yields of grains and other crops could decrease substantially across the Mediterranean region due to increased frequency of drought. Crop production would be further threatened by increases in competition for water and the prevalence of pests and diseases and land loss through desertification and sea-level rise. The combination of heat and pollution would lead to an upsurge in respiratory illness among urban populations, while extreme weather events could increase death and injury rates. Water shortages and damaged infrastructure would increase the risk of cholera and dysentery, while higher temperatures would increase the incidence of infectious diseases, such as malaria and dengue fever. Serious social disruption could occur as millions are forced from their homelands as a result of desertification, poor harvests and sea-level rise, while international disputes over shared water resources could turn into conflict.

G. Future climate change could critically undermine efforts for sustainable development in the Mediterranean region through its impacts on the environment and social and economic well-being. While in many respects climate change exacerbates existing problems instead of creating new ones, the sheer magnitude of the potential problem means it cannot be ignored. There is some scope for adaptation, but the fact that many measures would be beneficial irrespective of climate change suggests that radical changes in our policies and practices will be needed. It is also vital that developed countries meet their obligations to assist adaptation in developing countries through access to know-how and financial assistance. Ultimately, however, the long-term sustainability of the Mediterranean region requires keeping climate change within tolerable bounds. Current understanding of safe limits points to the need for prompt international agreement - and action - to make the drastic cuts in emissions of greenhouse gases required to stabilise atmospheric concentrations of these gases.`;

const sectionTitle = "LONG-TERM FORECAST: HOT AND DRY";

async function run() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB.");

        const acName = "Reading Mock Test 01 - Academic";
        const doc: any = await ReadingTest.findOne({ title: acName });

        if (doc) {
            if (!doc.sections) doc.sections = [];
            while (doc.sections.length < 3) {
                doc.sections.push({
                    sectionNumber: doc.sections.length + 1,
                    title: "",
                    passage: "",
                    questionGroups: [],
                    questions: []
                });
            }

            doc.sections[2].title = sectionTitle;
            doc.sections[2].passage = passageText;
            doc.sections[2].questionGroups = [];
            doc.sections[2].questions = [];
            
            await doc.save();
            console.log("✅ Academic Reading Mock 01 - Part 3 Passage updated successfully.");
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
