import { ToolNode } from "@langchain/langgraph/prebuilt";
import { model_with_tools, tools } from "../utils/model.js";
import { END } from "@langchain/langgraph";

export const toolNode = new ToolNode(tools);

export const chatNode = async (state) => {
    const response = await model_with_tools.invoke([
        ...state.messages
    ]);

    return {
        messages: [response]
    };
};

export const shouldContinue = (state) => {
    if (state.messages[state.messages.length - 1].tool_calls.length > 0) {
        return "toolNode";
    }
    return END;
};