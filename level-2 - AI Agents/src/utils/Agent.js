import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

import { ChatGoogle } from "@langchain/google";
import { createAgent } from "langchain";
import { additionTool, getWeatherInfoTool, sendEmailTool, tavilysearch } from "../tools/tools.js";

// langchain
export const model = new ChatGoogle("gemini-3.1-flash-lite");

export const agent = createAgent({
    model: model,
    tools: [tavilysearch, additionTool, getWeatherInfoTool, sendEmailTool]
});


// Langgraph 
const tools = [tavilysearch, additionTool, getWeatherInfoTool, sendEmailTool];
export const model_with_tools = new ChatGoogle("gemini-3.1-flash-lite").bindTools(tools);
