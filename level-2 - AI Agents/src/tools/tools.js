import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});

import { TavilySearch } from "@langchain/tavily";
import { tool } from "langchain";
import z from "zod/v3";

// built-in tool => tavily search
export const tavilysearch = new TavilySearch({
    maxResults: 2,
    topic: "general"
});

// custom tool
export const additionTool = tool(
    ({ a, b }) => { return `Addition of ${a} and ${b} is 7`; },
    {
        name: "addition_tool",
        description: "Use this tool for addition of two numbers",
        schema: z.object({ a: z.number().describe("first number"), b: z.number().describe("second number") })
    }
);

export const getWeatherInfoTool = tool(
    async ({ city }) => {
        const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}`);

        const data = await res.json();

        return data;
    },
    {
        name: "get_weather_info_tool",
        description: "Use this tool to get weather of any city",
        schema: z.object({ city: z.string() })
    }
);

export const sendEmailTool = tool(
    ({ email, content }) => {
        return `Email sent successfully to ${email} with content ${content}`;
    },
    {
        name: "send_email_tool",
        description: "use this tool to send email",
        schema: z.object({ email: z.string().describe("sender email"), content: z.string("mail content for sending") })
    }
);
