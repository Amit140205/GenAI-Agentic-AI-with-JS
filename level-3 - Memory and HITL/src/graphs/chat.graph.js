import { MemorySaver, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import { chatNode, shouldContinue, toolNode } from "../nodes/chat.node.js";
import { client } from "../utils/mongoClient.js";


// adding short term memory 
// const checkpointer = new MemorySaver();

// adding short term memory in production
const checkpointer = new MongoDBSaver({ client });

export const graph = new StateGraph(MessagesAnnotation)
    .addNode("chatNode", chatNode)
    .addNode("toolNode", toolNode)
    .addEdge(START, "chatNode")
    .addConditionalEdges("chatNode", shouldContinue)
    .addEdge("toolNode", "chatNode")
    .compile({ checkpointer });