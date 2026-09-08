import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_KEY,
});

export const generateAiResponse =async (prompt:string) =>{
    const response = await ai.models.generateContent({
        model:"gemini-3.8-flash",
        contents:prompt,
    })
    console.log("Ai response",response)
    return response.text
}
