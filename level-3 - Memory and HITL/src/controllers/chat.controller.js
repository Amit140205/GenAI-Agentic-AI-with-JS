import { graph } from "../graphs/chat.graph.js";

export const agentWithMemory = async (req, res) => {
    const { prompt } = req.body;

    const response = await graph.invoke(
        { messages: [{ "role": "user", "content": prompt }] },
        { configurable: { thread_id: "1" } }
    );

    return res.status(200).json({
        "result": response.messages[response.messages.length - 1].content
    });
};