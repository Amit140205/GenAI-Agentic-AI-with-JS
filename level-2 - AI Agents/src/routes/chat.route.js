import express from "express";
import { chatWithAgent, chatWithLLM } from "../controllers/chat_langchain.controller.js";
import { chatWithAgentLanggraph } from "../controllers/chat_langgraph.controller.js";

const router = express.Router();

router.route("/chat").post(chatWithLLM);

// AI Agents = LLM + Tools using Langchain
router.route("/chat-ai-agent").post(chatWithAgent);

// AI Agents using Langgraph
router.route("/langgraph/chat-ai-agent").post(chatWithAgentLanggraph);

export default router;