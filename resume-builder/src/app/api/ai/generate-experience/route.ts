import { generateAiResponse } from "@/lib/gemini";
import { GenerateExperienceBody } from "@/types/ai.type";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {

        const body: GenerateExperienceBody = await req.json()

        const { jobTitle, responsibilities, companyName, duration, techStack } = body

        if (!jobTitle) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Job Title is required",
            }, { status: 400 })
        }

        if (!responsibilities) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Responsibilities is required",
            }, { status: 400 })
        }

        if (!companyName) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Company Name is required",
            }, { status: 400 })
        }

        if (!duration) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Duration is required",
            }, { status: 400 })
        }

        if (!techStack) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Tech Stack is required",
            }, { status: 400 })
        }



        const prompt = `You are a technical resume writer. Generate professional work experience bullet points based on the following details.
        Company Name: ${companyName}
        Job Title: ${jobTitle}
        Duration: ${duration}
        Tech Stack: ${techStack}
        Responsibilities: ${responsibilities}

        Requirements:
        - Write 3-5 concise, resume-style bullet points
        - Start each bullet with a strong action verb (Developed, Led, Optimized, Architected, Collaborated, Automated, etc.)
        - Focus on impact and outcomes, not just task lists — connect what was done to why it mattered
        - Include measurable results where provided (e.g., "reduced API latency by 40%", "scaled to support 50K+ users") — only if such metrics are given; do NOT fabricate numbers
        - Reflect the seniority implied by "${jobTitle}" in tone and scope (entry-level = execution-focused, senior+ = ownership/architecture/mentorship-focused)
        - Keep each bullet under 25 words
        - Avoid generic filler phrases like "responsible for" or "worked on"
        - Respond ONLY with a valid JSON array of strings, no explanation, no markdown, no preamble

        Example format:
        ["Led migration of a monolithic Express API to microservices on AWS ECS, cutting deployment time by 60%", "Implemented Redis caching layer, reducing average response latency from 800ms to 150ms"]`;

        const result = await generateAiResponse(prompt)

        console.log("result is ", result)

        const desc = result

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "Work Experience generated successfully",
            data: { desc }
        }, { status: 200 })


    } catch (error) {
        console.log("error in generate work experience", error)

        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Something went wrong",

        }, { status: 500 })
    }

}