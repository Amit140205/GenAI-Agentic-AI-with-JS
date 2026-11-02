import { model } from "../utils/model.js";
import { vectorDbInit } from "../utils/vectorStore.js";

export const chatRagController = async (req, res) => {
    const { prompt } = req.body;

    const vectorStore = await vectorDbInit();

    const relevantDocs = await vectorStore.similaritySearch(prompt, 3);

    const context = relevantDocs.map(docs => docs.pageContent).join("\n");

    const response = await model.invoke([
        { role: "system", content: `You are a RAG assistant and use this context - \n${context}` },
        { role: "human", content: prompt }
    ]);

    return res.status(200).json({
        resul: response.content
    });
};