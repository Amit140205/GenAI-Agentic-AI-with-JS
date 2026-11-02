import { Command } from "@langchain/langgraph";
import { hitlGraph } from "../graphs/hitl.graph.js";
import { randomUUID } from "node:crypto";
const threadId = randomUUID();
export const hitlInterruptController = async (req, res) => {
    const { prompt } = req.body;
    // const threadId = randomUUID();

    const response = await hitlGraph.invoke({
        prompt,
    }, { configurable: { thread_id: threadId } });

    return res.status(200).json({
        threadId,
        response
    });
};

export const hitlResumeController = async (req, res) => {
    const { threadId, answer } = req.body;

    const response = await hitlGraph.invoke(
        new Command({
            resume: String(answer)
        }),
        { configurable: { thread_id: threadId } }
    );

    return res.status(200).json({
        threadId,
        response
    })
};