import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config({
    path: "./.env"
});

export const client = new MongoClient(process.env.MONGODB_URI);