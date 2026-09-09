import { generateAiResponse } from "@/lib/gemini";
import { GenerateProjectDescriptionBody } from "@/types/ai.type";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {

        const body: GenerateProjectDescriptionBody = await req.json()

        const { projectName, techStack,keyFeatures } = body

        if (!projectName) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Project Name is required",
            }, { status: 400 })
        }

        if (!techStack) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Tech Stack is required",
            }, { status: 400 })
        }

        if (!keyFeatures) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Key Features is required",
            }, { status: 400 })
        }


      const prompt = `You are a technical resume writer. Generate a professional project description based on the following details.
        Project Name: ${projectName}
        Tech Stack: ${techStack}
        Key Features: ${keyFeatures}

        Requirements:
        - Write 3-5 concise bullet points describing the project
        - Start each bullet with a strong action verb (Built, Architected, Implemented, Designed, Optimized, etc.)
        - Highlight technical decisions, architecture, and challenges solved — not just feature lists
        - Include measurable impact or scale where possible (e.g., "handling 10K+ requests/day", "reduced load time by 40%") — only if such metrics are provided; do NOT fabricate numbers
        - Keep each bullet under 25 words
        - Avoid generic filler phrases like "worked on" or "helped with"
        - Respond ONLY with a valid JSON array of strings, no explanation, no markdown, no preamble

        Example format:
        ["Architected a microservices-based backend using Node.js and Docker, deployed on AWS ECS with auto-scaling", "Implemented JWT-based authentication and Redis caching, reducing API response time by 35%"]`;

        const result = await generateAiResponse(prompt)

        console.log("result is ", result)

        const desc = result

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "Project Description generated successfully",
            data: { desc }
        }, { status: 201 })


    } catch (error) {
        console.log("error in generate project description", error)

        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Something went wrong",

        }, { status: 500 })
    }

}