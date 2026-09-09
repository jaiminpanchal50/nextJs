import { generateAiResponse } from "@/lib/gemini";
import { GenerateSkillsBody } from "@/types/ai.type";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {

        const body: GenerateSkillsBody = await req.json()

        const { experienceLevel, jobTitle } = body

        if (!experienceLevel) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Experince Level is required",
            }, { status: 400 })
        }

        if (!jobTitle) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Job Title is required",
            }, { status: 400 })
        }


       const prompt = `You are a technical recruiter assistant. Generate a list of relevant technical skills for the following role.
            Job Title: ${jobTitle}
            Experience Level: ${experienceLevel}

            Requirements:
            - Return ONLY technical skills (programming languages, frameworks, libraries, tools, platforms, databases, protocols)
            - Do NOT include soft skills (e.g., communication, teamwork, leadership)
            - Do NOT include generic terms (e.g., "problem-solving", "collaboration")
            - Tailor the skills to match the seniority of "${experienceLevel}" — include foundational skills for entry-level, and advanced/architectural skills for senior+ levels
            - Return between 8 and 15 skills
            - Respond ONLY with a valid JSON array of strings, no explanation, no markdown, no preamble

            Example format:
            ["JavaScript", "React", "Node.js", "PostgreSQL", "Docker", "AWS", "REST APIs", "Git"]`;

        const result = await generateAiResponse(prompt)

        console.log("result is ", result)

        const skills = result

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "Skills generated successfully",
            data: { skills }
        }, { status: 201 })


    } catch (error) {
        console.log("error in generate skill", error)

        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Something went wrong",

        }, { status: 500 })
    }

}