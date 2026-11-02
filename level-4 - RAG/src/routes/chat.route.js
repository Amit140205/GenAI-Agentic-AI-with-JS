import express from "express";
import { chatRagController } from "../controllers/chat.controller.js";

const router = express.Router();

router.route("/rag/chat").post(chatRagController);

export default router;