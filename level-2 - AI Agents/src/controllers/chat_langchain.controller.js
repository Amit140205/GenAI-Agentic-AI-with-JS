import { agent, model } from "../utils/Agent.js";

export const chatWithLLM = async (req, res) => {
    const { prompt } = req.body;
    const response = await model.invoke(prompt);

    return res.status(200).json({
        message: response.content
    });
};

export const chatWithAgent = async (req, res) => {
    const { prompt } = req.body;
    
        const response = await agent.invoke({
            messages: [
                { "role": "system", content: "You are an AI Agent, when you are asked to answer any question, always use your tools first to answer the question. Do not use your own brain to answer the question" },
                { "role": "human", content: prompt }
            ]
        });
    
        return res.status(200).json({
            "result": response.messages[response.messages.length - 1].content,
            "messages": response.messages
        });
}