import express from "express";
import dotenv from "dotenv";
import { upload } from "./src/utils/ragInit.js";
import chatRouter from "./src/routes/chat.route.js";

dotenv.config({
    path: "./.env"
});

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api", chatRouter);

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    if(process.env.DATA_LOADED !== "true") await upload();
});