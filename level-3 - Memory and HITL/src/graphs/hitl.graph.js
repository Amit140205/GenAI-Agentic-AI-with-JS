import { END, START, StateGraph } from "@langchain/langgraph";
import { hitlState } from "../states/hitl.state.js";
import { actionNode, approvalNode, chatNode, shouldContinue } from "../nodes/hitl.node.js";
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import { client } from "../utils/mongoClient.js";

const checkpointer = new MongoDBSaver({ client });

export const hitlGraph = new StateGraph(hitlState)
    .addNode("chatNode", chatNode)
    .addNode("approvalNode", approvalNode)
    .addNode("actionNode", actionNode)
    .addEdge(START, "chatNode")
    .addConditionalEdges("chatNode", shouldContinue)
    .addEdge("approvalNode", "actionNode")
    .addEdge("actionNode", END)
    .compile({ checkpointer });