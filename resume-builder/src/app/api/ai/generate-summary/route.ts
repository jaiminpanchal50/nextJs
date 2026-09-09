import { generateAiResponse } from "@/lib/gemini";
import { GenerateSummaryBody } from "@/types/ai.type";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {

        const body: GenerateSummaryBody = await req.json()

        const { experienceLevel, skills, jobTitle } = body

        if (!experienceLevel) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Experince Level is required",
            }, { status: 400 })
        }

        if (!skills) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Skills is required",
            }, { status: 400 })
        }

        if (!jobTitle) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Job Title is required",
            }, { status: 400 })
        }


        const summaryPrompt = `Generate a professional ATS friendly summary for a ${experienceLevel} professional with skills: ${skills.join(",")} targeting a ${jobTitle} role. Keep it concise and impactful, maximum 50 words`;

        const result = await generateAiResponse(summaryPrompt)

        console.log("result is ", result)

        const summary = result

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "Summary generated successfully",
            data: { summary }
        }, { status: 201 })


    } catch (error) {
        console.log("error in generate summary", error)

        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Something went wrong",

        }, { status: 500 })
    }

}