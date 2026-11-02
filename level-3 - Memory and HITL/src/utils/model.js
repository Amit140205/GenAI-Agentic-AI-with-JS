import { ChatGoogle } from "@langchain/google";
import { additionTool, getWeatherInfoTool, sendEmailTool, tavilysearch } from "../tools/tool.js";

export const tools = [tavilysearch, additionTool, getWeatherInfoTool, sendEmailTool];

export const model = new ChatGoogle("gemini-3.1-flash-lite");
export const model_with_tools = model.bindTools(tools); 