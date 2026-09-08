import { IResume } from "@/types/resume.type";
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema<IResume>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
    },
    summary: {
        type: String,
    },
    personalInfo: {
        type: {
            fullname: {
                type: String,
            },
            email: {
                type: String,
            },
            phone: {
                type: String,
            },
            location: {
                type: String,
            },
            github: {
                type: String,
            },
            linkedin: {
                type: String,
            },
            portfolio: {
                type: String,
            },
            summary: {
                type: String,
            }
        },
        default: {
            fullname: "",
            email: "",
            phone: "",
            location: "",
            github: "",
            linkedin: "",
            portfolio: "",
            summary: ""
        }
    },
    education: {
        type: [
            {
                institute: {
                    type:String,
                },
                degree:{
                    type:String,
                },
                startdate:{
                    type:String,
                },
                enddate:{
                    type:String,
                },
            }
        ],
        default: []
    },
    workExperience: {
        type: [
            {
                company: {
                    type: String,
                },
                position: {
                    type: String,
                },
                startdate: {
                    type: String,
                },
                enddate: {
                    type: String,
                },
                description: {
                    type: String,
                }
            }
        ],
        default: []
    },
    projects: {
        types: [
            {
                title: {
                    type: String,
                },
                description: {
                    type: String,
                },
                githubUrl: {
                    type: String,
                },
                liveUrl: {
                    type: String,
                },
                techStack: {
                    type: [String],
                }
            }
        ],
        default: []
    },
    skills: {
        type: [String],
        default: []
    },
    certifications: {
        types: [
            {
                title: {
                    type: String,
                },
                description: {
                    type: String,
                },
            }
        ],
        default: []
    }
}, { timestamps: true })


export const resumeModel = mongoose.model("resume", resumeSchema)
