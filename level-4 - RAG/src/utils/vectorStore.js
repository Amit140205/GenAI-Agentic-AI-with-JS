import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});
import { QdrantVectorStore } from "@langchain/qdrant";
import { embeddingModel } from "./model.js";

export const vectorDbInit = async () => {
    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddingModel, {
        url: process.env.QDRANT_URL,
        collectionName: "rag-testing",
        apiKey: process.env.QDRANT_API_KEY
    });

    return vectorStore;
};