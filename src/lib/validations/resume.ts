import { z } from "zod";

// Personal Info Validation
export const PersonalInfoSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    headline: z.string().optional().default(""),
    avatarUrl: z.string().optional().default(""),
    email: z.string().optional().default(""),
    phone: z.string().optional().default(""),
    location: z.string().optional().default(""),
    website: z.string().optional(),
    websiteUrl: z.string().optional(),
    linkedin: z.string().optional(),
    linkedinUrl: z.string().optional(),
    github: z.string().optional(),
    githubUrl: z.string().optional(),
    summary: z.string().optional().default(""),
    passport: z.string().optional(),
    nationality: z.string().optional(),
    dateOfBirth: z.string().optional(),
    visa: z.string().optional(),
    availability: z.string().optional(),
    gender: z.string().optional(),
    disability: z.string().optional(),
    portfolio: z.string().optional(),
    portfolioUrl: z.string().optional(),
    gitbook: z.string().optional(),
    gitbookUrl: z.string().optional(),
    medium: z.string().optional(),
    mediumUrl: z.string().optional(),
    orcid: z.string().optional(),
    orcidUrl: z.string().optional(),
    skype: z.string().optional(),
    skypeUrl: z.string().optional(),
    bluesky: z.string().optional(),
    blueskyUrl: z.string().optional(),
    threads: z.string().optional(),
    threadsUrl: z.string().optional(),
    x: z.string().optional(),
    xUrl: z.string().optional(),
    customFields: z
      .array(
        z.object({
          id: z.string(),
          key: z.string(),
          label: z.string(),
          value: z.string(),
          isLink: z.boolean().optional(),
          linkUrl: z.string().optional(),
        })
      )
      .optional(),
    fieldsOrder: z.array(z.string()).optional(),
  })
  .passthrough();


// Experience Item Validation
export const ExperienceItemSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Job title is required"),
  location: z.string().optional().default(""),
  startDate: z.string().optional().default(""),
  endDate: z.string().optional().default(""),
  isCurrent: z.boolean().default(false),
  description: z.string().optional().default(""),
  order: z.number().default(0),
});

// Education Item Validation
export const EducationItemSchema = z.object({
  id: z.string().optional(),
  institution: z.string().min(1, "School or University is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().optional().default(""),
  startDate: z.string().optional().default(""),
  endDate: z.string().optional().default(""),
  score: z.string().optional().default(""),
  location: z.string().optional().default(""),
  order: z.number().default(0),
});

// Project Item Validation
export const ProjectItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Project title is required"),
  subtitle: z.string().optional().default(""),
  url: z.string().url("Invalid project URL").or(z.literal("")).optional(),
  githubUrl: z.string().url("Invalid GitHub URL").or(z.literal("")).optional(),
  startDate: z.string().optional().default(""),
  endDate: z.string().optional().default(""),
  description: z.string().optional().default(""),
  technologies: z.array(z.string()).default([]),
  order: z.number().default(0),
});

// Skill Group Validation
export const SkillGroupSchema = z.object({
  id: z.string().optional(),
  category: z.string().default("Technical Skills"),
  skills: z.array(z.string()).default([]),
  order: z.number().default(0),
});

// Certification Item Validation
export const CertificationItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issueDate: z.string().optional().default(""),
  expiryDate: z.string().optional().default(""),
  url: z.string().url("Invalid credential URL").or(z.literal("")).optional(),
  order: z.number().default(0),
});

// Language Item Validation
export const LanguageItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Language is required"),
  proficiency: z.string().optional().default("Fluent"),
  order: z.number().default(0),
});

// Custom Section Validation
export const CustomSectionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Section title is required"),
  content: z.string().default(""),
  order: z.number().default(0),
});

// Complete Unified Resume Data Schema
export const ResumeDataSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Resume title is required").default("Untitled Resume"),
  templateId: z.string().default("modern"),
  themeColor: z.string().default("#2563eb"),
  fontFamily: z.string().default("Inter"),
  fontSize: z.enum(["sm", "base", "lg"]).default("base"),
  pageMargin: z.enum(["compact", "normal", "spacious"]).default("normal"),
  columnLayout: z.enum(["single", "right-sidebar", "left-sidebar", "two-column"]).default("right-sidebar"),
  sectionOrder: z.array(z.string()).default([
    "summary",
    "experience",
    "education",
    "projects",
    "skills",
    "certifications",
    "languages"
  ]),
  sectionColumns: z.record(z.string(), z.enum(["left", "right", "full"])).optional().default({}),
  sectionStyles: z.record(z.string(), z.string()).optional().default({}),
  personalInfo: PersonalInfoSchema,
  experiences: z.array(ExperienceItemSchema).default([]),
  educations: z.array(EducationItemSchema).default([]),
  projects: z.array(ProjectItemSchema).default([]),
  skills: z.array(SkillGroupSchema).default([]),
  certs: z.array(CertificationItemSchema).default([]),
  languages: z.array(LanguageItemSchema).default([]),
  customs: z.array(CustomSectionSchema).default([]),
});

export type PersonalInfoData = z.infer<typeof PersonalInfoSchema>;
export type ExperienceItemData = z.infer<typeof ExperienceItemSchema>;
export type EducationItemData = z.infer<typeof EducationItemSchema>;
export type ProjectItemData = z.infer<typeof ProjectItemSchema>;
export type SkillGroupData = z.infer<typeof SkillGroupSchema>;
export type CertificationItemData = z.infer<typeof CertificationItemSchema>;
export type LanguageItemData = z.infer<typeof LanguageItemSchema>;
export type CustomSectionData = z.infer<typeof CustomSectionSchema>;
export type ResumeData = z.infer<typeof ResumeDataSchema>;
