import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { resumeModel } from "@/models/resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        await connectDB()
        const userId = await getCurrentUser()


        const newResume = await resumeModel.create({
            user_id: userId,
            title: "",
            summary: "",
            personalInfo: {},
            workExperience: [],
            education: [],
            projects: [],
            skills: [],
            certifications: [],
        })

        return NextResponse.json<ApiResponse>({
            success: true,
            data: newResume,
            message: "resume created successfully",
        }, { status: 201 })


    } catch (error) {
        console.log("Error in resume creation", error)
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Failed to create resume",
        }, { status: 500 })
    }
}