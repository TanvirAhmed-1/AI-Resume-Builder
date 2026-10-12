import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "./dynamic-contact-bar";
import { FormattedResumeText } from "./formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const ModernHeritageTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, projects, skills, certs, languages } = mergedData;

  const sectionOrder =
    data.sectionOrder && data.sectionOrder.length > 0
      ? data.sectionOrder
      : [
          "summary",
          "experience",
          "education",
          "projects",
          "skills",
          "certifications",
          "languages",
        ];

  const columnLayout = data.columnLayout || "single";
  const defaultColumns: Record<string, "left" | "right" | "full"> = {
    summary: "full",
    experience: "left",
    education: "left",
    projects: "left",
    skills: "right",
    certifications: "right",
    languages: "right",
  };
  const sectionColumns = { ...defaultColumns, ...(data.sectionColumns || {}) };

  const renderSectionItem = (secKey: string) => {
    switch (secKey) {
      case "summary":
        return personalInfo.summary ? (
          <section key="summary">
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b-2 border-zinc-950 pb-0.5 mb-1.5 text-center">
              Summary
            </h2>
            <FormattedResumeText
              content={personalInfo.summary}
              className="text-zinc-800 text-justify leading-relaxed text-xs"
            />
          </section>
        ) : null;

      case "experience":
        return experiences && experiences.length > 0 ? (
          <section key="experience" className="space-y-3">
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b-2 border-zinc-950 pb-0.5 mb-1.5 text-center">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline font-sans">
                    <div>
                      <h3 className="font-bold text-zinc-950 text-xs">{exp.company}</h3>
                      <p className="text-xs italic text-zinc-700">{exp.position}</p>
                    </div>
                    <div className="text-right text-[11px] text-zinc-600">
                      <p>{exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}</p>
                      {exp.location && <p className="italic">{exp.location}</p>}
                    </div>
                  </div>
                  {exp.description && (
                    <FormattedResumeText
                      content={exp.description}
                      className="text-zinc-800 text-xs font-sans leading-relaxed mt-1"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "education":
        return educations && educations.length > 0 ? (
          <section key="education" className="space-y-2">
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b-2 border-zinc-950 pb-0.5 mb-1.5 text-center">
              Education
            </h2>
            <div className="space-y-1.5">
              {educations.map((edu, idx) => (
                <div key={edu.id || idx} className="flex justify-between items-baseline font-sans">
                  <div>
                    <h3 className="font-bold text-xs text-zinc-950">{edu.institution}</h3>
                    <p className="text-xs italic text-zinc-600">
                      {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                    </p>
                  </div>
                  <div className="text-right text-[11px] text-zinc-600">
                    <p>{edu.startDate} – {edu.endDate}</p>
                    {edu.location && <p className="italic">{edu.location}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "projects":
        return projects && projects.length > 0 ? (
          <section key="projects" className="space-y-2.5">
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b-2 border-zinc-950 pb-0.5 mb-1.5 text-center">
              Key Projects
            </h2>
            <div className="space-y-2">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} className="space-y-0.5 font-sans">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-xs text-zinc-950">{proj.title}</h3>
                    {proj.subtitle && (
                      <span className="text-[11px] text-zinc-500 italic">{proj.subtitle}</span>
                    )}
                  </div>
                  {proj.description && (
                    <FormattedResumeText
                      content={proj.description}
                      className="text-zinc-800 text-xs leading-relaxed"
                    />
                  )}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[10px] text-zinc-500 italic">
                      Tech: {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "skills":
        return skills && skills.length > 0 ? (
          <section key="skills">
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b-2 border-zinc-950 pb-0.5 mb-1.5 text-center">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 font-sans text-xs text-zinc-800">
              {skills.flatMap((s) => s.skills).map((skill, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "languages":
        return languages && languages.length > 0 ? (
          <section key="languages">
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b-2 border-zinc-950 pb-0.5 mb-1.5 text-center">
              Languages
            </h2>
            <div className="flex flex-wrap justify-center gap-6 font-sans text-xs text-zinc-800">
              {languages.map((l, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="font-medium">{l.name}</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${i < 4 ? "bg-zinc-800" : "bg-zinc-300"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "certifications":
        return certs && certs.length > 0 ? (
          <section key="certifications">
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b-2 border-zinc-950 pb-0.5 mb-1.5 text-center">
              Certificates
            </h2>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 font-sans text-xs text-zinc-800">
              {certs.map((c, idx) => (
                <span key={idx}>
                  • {c.name} ({c.issuer})
                </span>
              ))}
            </div>
          </section>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-zinc-900 p-10 font-serif leading-relaxed text-[12px] flex flex-col justify-between">
      {/* Centered Traditional Header */}
      <header className="text-center pb-5 mb-5 border-b border-zinc-300">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 uppercase mb-1">
          {personalInfo.fullName}
        </h1>
        {personalInfo.headline && (
          <p className="text-xs italic font-serif text-zinc-600 tracking-wide mb-2.5">
            {personalInfo.headline}
          </p>
        )}

        <DynamicContactBar
          personalInfo={personalInfo}
          themeColor="#27272a"
          className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[11px] font-sans text-zinc-600"
          separator={<span className="text-zinc-400">•</span>}
        />
      </header>

      {/* Main Content with Dynamic Section Order & Columns */}
      {(() => {
        // Layout 1: Single Column Linear Layout
        if (columnLayout === "single") {
          return (
            <div className="flex flex-col space-y-4 flex-1">
              {sectionOrder.map((key) => renderSectionItem(key))}
            </div>
          );
        }

        // Separate sections by column assignment
        const fullSections = sectionOrder.filter((k) => sectionColumns[k] === "full");
        const leftSections = sectionOrder.filter(
          (k) =>
            sectionColumns[k] === "left" ||
            (!["right", "full"].includes(sectionColumns[k]) &&
              ["experience", "projects", "education"].includes(k))
        );
        const rightSections = sectionOrder.filter(
          (k) =>
            sectionColumns[k] === "right" ||
            (!["left", "full"].includes(sectionColumns[k]) &&
              ["skills", "certifications", "languages"].includes(k))
        );

        // Layout 2: Left Sidebar (35% Side / 65% Main)
        if (columnLayout === "left-sidebar") {
          return (
            <div className="flex flex-col space-y-4 flex-1">
              {fullSections.map((k) => renderSectionItem(k))}
              <div className="grid grid-cols-12 gap-6 flex-1">
                <div className="col-span-4 flex flex-col space-y-4 border-r pr-5 border-zinc-200">
                  {leftSections.map((k) => renderSectionItem(k))}
                </div>
                <div className="col-span-8 flex flex-col space-y-4">
                  {rightSections.map((k) => renderSectionItem(k))}
                </div>
              </div>
            </div>
          );
        }

        // Layout 3: 2 Equal Columns (50% / 50%)
        if (columnLayout === "two-column") {
          return (
            <div className="flex flex-col space-y-4 flex-1">
              {fullSections.map((k) => renderSectionItem(k))}
              <div className="grid grid-cols-2 gap-6 flex-1">
                <div className="flex flex-col space-y-4">
                  {leftSections.map((k) => renderSectionItem(k))}
                </div>
                <div className="flex flex-col space-y-4 border-l pl-5 border-zinc-200">
                  {rightSections.map((k) => renderSectionItem(k))}
                </div>
              </div>
            </div>
          );
        }

        // Layout 4: Right Sidebar Default (65% Main / 35% Side)
        return (
          <div className="flex flex-col space-y-4 flex-1">
            {fullSections.map((k) => renderSectionItem(k))}
            <div className="grid grid-cols-12 gap-6 flex-1">
              <div className="col-span-8 flex flex-col space-y-4">
                {leftSections.map((k) => renderSectionItem(k))}
              </div>
              <div className="col-span-4 flex flex-col space-y-4 border-l pl-5 border-zinc-200">
                {rightSections.map((k) => renderSectionItem(k))}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
