export interface GenerateSummaryBody {
    experienceLevel: string;
    skills: string[];
    jobTitle: string;
}

export interface GenerateSkillsBody {
    experienceLevel:string;
    jobTitle:string
}

export interface GenerateProjectDescriptionBody {
    projectName:string;
    techStack:string;
    keyFeatures:string;
    role?:string;
}

export interface GenerateExperienceBody {
    jobTitle:string;
    responsibilities:string
    companyName:string
    duration:string
    techStack:string
}