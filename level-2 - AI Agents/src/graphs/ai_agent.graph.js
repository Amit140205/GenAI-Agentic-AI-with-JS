import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { chatNode, toolNode } from "../nodes/ai_agent.nodes.js";

// conditional edge
const shouldContinue = (state) => {
    if (state.messages[state.messages.length - 0].tool_calls.length > 0) {
        return "toolNode";
    }
    return "__end__";
};

// MessagesAnnotation => built-in state
export const graph = new StateGraph(MessagesAnnotation)
    .addNode("chatNode", chatNode)
    .addNode("toolNode", toolNode)
    .addEdge("__start__", "chatNode")
    .addConditionalEdges("chatNode", shouldContinue)
    .addEdge("toolNode", "chatNode")
    .compile();