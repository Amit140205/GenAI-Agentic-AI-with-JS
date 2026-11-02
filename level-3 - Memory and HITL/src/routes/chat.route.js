import express from "express";
import { agentWithMemory } from "../controllers/chat.controller.js";
import { hitlInterruptController, hitlResumeController } from "../controllers/hitl.controller.js";

const router = express.Router();

router.route("/ai-agent-memory").post(agentWithMemory);

// human in the loop
router.route("/hitl-interrupt").post(hitlInterruptController);
router.route("/hitl-resume").post(hitlResumeController);

export default router;