import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});
import { ChatGoogle } from "@langchain/google";
import { ChatGroq } from "@langchain/groq"
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const model = new ChatGroq("openai/gpt-oss-120b");

export const embeddingModel = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: process.env.GOOGLE_API_KEY,
});

