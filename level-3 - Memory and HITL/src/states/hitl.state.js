import { StateSchema } from "@langchain/langgraph";
import { z } from "zod";

export const hitlState = new StateSchema({
    prompt: z.string(),
    approvalRequired: z.boolean(),
    aiResponse: z.string(),
    approved: z.boolean(),
    result: z.string()
});