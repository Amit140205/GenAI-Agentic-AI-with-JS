import express from "express";
import dotenv from "dotenv";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { model } from "./src/utils/model.js";
dotenv.config({
    path: "./.env"
});

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const mcpClient = new Client({
    name: "mcp-client",
    version: "1.0.0"
});

async function start() {

    const transport = new StdioClientTransport({
        command: process.execPath,
        args: ["server.js"]
    });

    await mcpClient.connect(transport);

    const { tools } = await mcpClient.listTools();
    // console.log(tools);

    const modelWithTools = model.bindTools(
        tools.map(tool => ({
            type: "function",
            function: {
                name: tool.name,
                description: tool.description,
                parameters: tool.inputSchema
            }
        }))
    );

    app.post("/api/mcp/chat", async (req, res) => {
        const { prompt } = req.body;

        const result = await modelWithTools.invoke([
            {
                "role": "human",
                "content": prompt
            }
        ]);

        if (result.tool_calls.length) {
            const tool = result.tool_calls[0];
            const response = await mcpClient.callTool({
                name: tool.name,
                arguments: tool.args
            });

            return res.status(200).json(response.content[0].text);
        }

        return res.status(200).json(result.content);
    });

    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
}

start();
