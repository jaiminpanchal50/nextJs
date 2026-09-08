import { Types } from "mongoose";

export interface IPersonalInfo {
    fullname: string,
    email: string,
    phone: string,
    location: string,
    github: string,
    linkedin: string,
    portfolio: string,
    summary: string,
}

export interface IEducation {
    institute: string,
    degree: string,
    startdate: string,
    enddate: string,
}

export interface IWorkExperience {
    company: string,
    position: string,
    startdate: string,
    enddate: string,
    description: string,
}

export interface IProject {
    title: string,
    description: string,
    githubUrl: string,
    liveUrl?: string,
    techStack: string[],
}

export interface IResume {
    _id?: string,
    user_id: Types.ObjectId,
    title: string,
    summary: string,
    personalInfo: IPersonalInfo,
    skills:string[],
    workExperience?: IWorkExperience[],
    projects: IProject[],
    education: IEducation[],
    certifications?: string[],
    updatedAt?: Date,
    createdAt?:Date,
}
