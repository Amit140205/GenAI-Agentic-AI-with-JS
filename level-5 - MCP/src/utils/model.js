import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});
import { ChatGroq } from "@langchain/groq"

export const model = new ChatGroq("openai/gpt-oss-120b");