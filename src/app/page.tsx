import { prisma } from "@/lib/prisma";
import { FlowCVEditor } from "@/components/editor/flowcv-editor";
import { ResumeData } from "@/lib/validations/resume";
import { mergeWithDefaultData, DEFAULT_RESUME_DATA } from "@/lib/default-resume-data";

export default async function HomePage() {
  // Fetch sample or demo resume from DB
  let resume = null;
  try {
    resume = await prisma.resume.findFirst({
      include: {
        personalInfo: true,
        experiences: { orderBy: { order: "asc" } },
        educations: { orderBy: { order: "asc" } },
        projects: { orderBy: { order: "asc" } },
        skills: { orderBy: { order: "asc" } },
        certs: { orderBy: { order: "asc" } },
        languages: { orderBy: { order: "asc" } },
        customs: { orderBy: { order: "asc" } },
      },
    });
  } catch (error) {
    console.error("Error fetching resume from database:", error);
  }

  const dbData: Partial<ResumeData> = resume
    ? {
        id: resume.id,
        title: resume.title || DEFAULT_RESUME_DATA.title,
        templateId: resume.templateId || DEFAULT_RESUME_DATA.templateId,
        themeColor: resume.themeColor || DEFAULT_RESUME_DATA.themeColor,
        fontFamily: resume.fontFamily || DEFAULT_RESUME_DATA.fontFamily,
        fontSize: (resume.fontSize as "sm" | "base" | "lg") || DEFAULT_RESUME_DATA.fontSize,
        pageMargin: (resume.pageMargin as "compact" | "normal" | "spacious") || DEFAULT_RESUME_DATA.pageMargin,
        sectionOrder: (resume.sectionOrder as string[]) || DEFAULT_RESUME_DATA.sectionOrder,
        personalInfo: {
          fullName: resume.personalInfo?.fullName || DEFAULT_RESUME_DATA.personalInfo.fullName,
          headline: resume.personalInfo?.headline || DEFAULT_RESUME_DATA.personalInfo.headline,
          avatarUrl: DEFAULT_RESUME_DATA.personalInfo.avatarUrl,
          email: resume.personalInfo?.email || DEFAULT_RESUME_DATA.personalInfo.email,
          phone: resume.personalInfo?.phone || DEFAULT_RESUME_DATA.personalInfo.phone,
          location: resume.personalInfo?.location || DEFAULT_RESUME_DATA.personalInfo.location,
          website: resume.personalInfo?.website || DEFAULT_RESUME_DATA.personalInfo.website,
          linkedin: resume.personalInfo?.linkedin || DEFAULT_RESUME_DATA.personalInfo.linkedin,
          github: resume.personalInfo?.github || DEFAULT_RESUME_DATA.personalInfo.github,
          summary: resume.personalInfo?.summary || DEFAULT_RESUME_DATA.personalInfo.summary,
        },
        experiences:
          resume.experiences && resume.experiences.length > 0
            ? resume.experiences.map((e) => ({
                id: e.id,
                company: e.company,
                position: e.position,
                location: e.location || "",
                startDate: e.startDate || "",
                endDate: e.endDate || "",
                isCurrent: e.isCurrent,
                description: e.description || "",
                order: e.order,
              }))
            : undefined,
        educations:
          resume.educations && resume.educations.length > 0
            ? resume.educations.map((ed) => ({
                id: ed.id,
                institution: ed.institution,
                degree: ed.degree,
                fieldOfStudy: ed.fieldOfStudy || "",
                startDate: ed.startDate || "",
                endDate: ed.endDate || "",
                score: ed.score || "",
                location: ed.location || "",
                order: ed.order,
              }))
            : undefined,
        projects:
          resume.projects && resume.projects.length > 0
            ? resume.projects.map((p) => ({
                id: p.id,
                title: p.title,
                subtitle: p.subtitle || "",
                url: p.url || "",
                githubUrl: p.githubUrl || "",
                startDate: p.startDate || "",
                endDate: p.endDate || "",
                description: p.description || "",
                technologies: p.technologies,
                order: p.order,
              }))
            : undefined,
        skills:
          resume.skills && resume.skills.length > 0
            ? resume.skills.map((s) => ({
                id: s.id,
                category: s.category,
                skills: s.skills,
                order: s.order,
              }))
            : undefined,
        certs:
          resume.certs && resume.certs.length > 0
            ? resume.certs.map((c) => ({
                id: c.id,
                name: c.name,
                issuer: c.issuer,
                issueDate: c.issueDate || "",
                expiryDate: c.expiryDate || "",
                url: c.url || "",
                order: c.order,
              }))
            : undefined,
        languages:
          resume.languages && resume.languages.length > 0
            ? resume.languages.map((l) => ({
                id: l.id,
                name: l.name,
                proficiency: l.proficiency || "",
                order: l.order,
              }))
            : undefined,
      }
    : DEFAULT_RESUME_DATA;

  const resumeData = mergeWithDefaultData(dbData);

  return <FlowCVEditor initialData={resumeData} />;
}
