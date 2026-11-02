import { END, interrupt } from "@langchain/langgraph";
import { model } from "../utils/model.js";

export const chatNode = async (state) => {
    const response = await model.invoke([
        {
            "role": "system",
            "content": `You are a helpful assistant. 
            
            If the user is greeting or asking a normal question,
            response normally and set approvalRequired to false.

            If the request requires a sensitive external action,
            such as sending an email or deleting a file,
            set approvalRequired to true

            Return JSON with:
            {
                "response": your response,
                "approvalRequired": true or false
            }
            `
        },
        {
            "role": "user",
            "content": state.prompt
        }
    ]);

    const parsedData = JSON.parse(response.content);

    return {
        approvalRequired: parsedData.approvalRequired,
        aiResponse: parsedData.response,
    };
};

export const approvalNode = async (state) => {
    const answer = interrupt({
        message: "Do you approve this action?",
        prompt: state.prompt,
        aiResponse: state.aiResponse
    });

    return {
        approved: String(answer).trim().toLowerCase() === "yes"
    };
};

export const actionNode = async (state) => {
    if (state.approved) {
        return {
            result: `action approved, ${state.aiResponse}`
        };
    }
    return {
        result: `action rejected by user`
    };
};

export const shouldContinue = async (state) => {
    if (state.approvalRequired) {
        return "approvalNode";
    }
    return END;
};