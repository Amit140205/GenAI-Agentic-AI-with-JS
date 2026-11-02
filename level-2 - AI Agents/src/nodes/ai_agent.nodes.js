import { ToolNode } from "@langchain/langgraph/prebuilt";
import { additionTool, getWeatherInfoTool, sendEmailTool, tavilysearch } from "../tools/tools.js";
import { model_with_tools } from "../utils/Agent.js";

export const toolNode = new ToolNode([tavilysearch, additionTool, getWeatherInfoTool, sendEmailTool]);

export const chatNode = async (state) => {
    const result = await model_with_tools.invoke([
        ...state.messages
    ]);

    return {
        messages: [result]
    };
};