import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_KEY,
});

export const generateAiResponse = async (prompt: string) => {
    // console.log("prompt", prompt)
    const response = await ai.models.generateContent({
        // model: "gemini-3.8-flash",
        model: "gemini-3.5-flash-lite",
        // model: "gemini-3.5-flash",
        contents: prompt,
    })
    console.log("Ai response", response)
    return response.text
}
