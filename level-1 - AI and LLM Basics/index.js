import express, { response } from "express"
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

// import { GoogleGenAI } from "@google/genai"
import { ChatGoogle } from "@langchain/google"

const app = express()
const port = process.env.PORT

app.use(express.json())


// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_API_KEY
// })

// streaming
// const main = async ()=>{
//     const responseStream = await ai.models.generateContentStream({
//         model: "gemini-3.1-flash-lite",
//         contents: "what is js"
//     })

//     for await (const chunk of responseStream) {
//         console.log(chunk.text)
//     }
// }

// main()

// default
// const main = async ()=>{
//     const response = await ai.models.generateContent({
//         model: "gemini-3.1-flash-lite",
//         contents: "what is js"
//     })

//     console.log(response.text)
// }

// main()


// project: chatbot

// app.post("/chat", async (req, res)=>{
//     const { prompt } = req.body

//     const result = await ai.models.generateContent({
//         model: "gemini-3.1-flash-lite",
//         contents: prompt
//     })

//     return res.json(result.text)
// })


// langchain
const model = new ChatGoogle({
    model: "gemini-3.1-flash-lite",
    // options
    temperature: 0.7,
    maxOutputTokens: 100
})

app.post("/chat-langchain", async (req, res) => {
    const { prompt } = req.body
    // const response = await model.invoke(prompt)

    const response = await model.invoke([
        { role: "system", content: "You are jarvis and my assistant" },
        { role: "human", content: prompt }
    ])

    return res.json(response.content)
})

app.listen(port, ()=>{
    console.log(`Server started at ${port}`)
})