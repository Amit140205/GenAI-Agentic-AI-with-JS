import express from "express";
import dotenv from "dotenv";
import chatRouter from "./src/routes/chat.route.js"
dotenv.config({
    path: "./.env"
});

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

app.use("/api", chatRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});