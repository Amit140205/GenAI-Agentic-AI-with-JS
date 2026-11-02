import { graph } from "../graphs/ai_agent.graph.js";

export const chatWithAgentLanggraph = async (req, res) => {
    const { prompt } = req.body;

    const response = await graph.invoke({
        messages: [{ "role": "user", "content": prompt }]
    });

    // console.log(response.messages);

    return res.status(200).json({
        "result": response.messages[response.messages.length - 1].content
    });
};