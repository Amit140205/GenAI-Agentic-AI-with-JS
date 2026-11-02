import fs from "fs";
import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { vectorDbInit } from "./vectorStore.js";

export const upload = async () => {
    // loading
    const path = "./Amit-Resume.pdf";
    const buffer = fs.readFileSync(path);
    const pdfResult = new PDFParse({ data: buffer });

    const result = await pdfResult.getText();
    const text = result.text;
    console.log(text)



    // chunking
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 300,
        chunkOverlap: 100
    });
    const docs = await splitter.createDocuments([text]);
    console.log(docs)



    // embeddings + vector store
    const vectorStore = await vectorDbInit();
    await vectorStore.addDocuments(docs);

    console.log("Data successfully loaded!!!")
};