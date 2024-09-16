import { action } from "./_generated/server";
import { v } from "convex/values";
import {internal } from "./_generated/api"
import OpenAI from "openai";
import { requireUser } from "./helper";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY
})



export const generateTodos = action ({
    args: {
        prompt: v.string(),
    },
    handler: async (ctx, args) => {
        
        const user = await requireUser(ctx);
        const response = await openai.chat.completions.create({
            model: "openai/chatgpt-4o-mini",
            messages: [
                {
                role: "system",
                content:  "Generate 3 to-dos based on the given prompyt. Please include a title and description. Please return a JSON Object in the following format: {todos: [{title:string, description: string}] }" 
                },
                {
                    role: "user",
                    content: `Prompt: ${args.prompt}`
                }
            ],
            response_format: {type: "json_object"}
        });
        const content = JSON.parse(response.choices[0].message.content!) as {
            todos: {title: string; description: string}[]
        };
        await ctx.runMutation(internal.functions.createManyTodos, {
            todos: content.todos,
            userId: user.tokenIdentifier,
        })
        return content.todos;
    }

})