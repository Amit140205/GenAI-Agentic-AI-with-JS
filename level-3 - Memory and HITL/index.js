import express from "express";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

import chatRouter from "./src/routes/chat.route.js";

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

app.use("/api", chatRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});