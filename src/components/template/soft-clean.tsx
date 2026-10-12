import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "./dynamic-contact-bar";
import { FormattedResumeText } from "./formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const SoftCleanTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, projects, skills, certs, languages, themeColor } = mergedData;

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

  const columnLayout = data.columnLayout || "right-sidebar";
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
          <section key="summary" className="space-y-1.5">
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b border-zinc-950 pb-0.5">
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
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b border-zinc-950 pb-0.5">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline font-sans">
                    <h3 className="font-bold text-zinc-950 text-xs">
                      {exp.position} <span className="font-normal italic text-zinc-600">| {exp.company}</span>
                    </h3>
                    <span className="text-[11px] text-zinc-600">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <p className="text-[11px] font-sans text-zinc-500 italic">{exp.location}</p>
                  )}
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
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b border-zinc-950 pb-0.5">
              Education
            </h2>
            <div className="space-y-2">
              {educations.map((edu, idx) => (
                <div key={edu.id || idx} className="flex justify-between items-baseline font-sans">
                  <div>
                    <h3 className="font-bold text-xs text-zinc-950">{edu.degree}</h3>
                    <p className="text-xs text-zinc-600 italic">
                      {edu.institution} {edu.location && `• ${edu.location}`}
                    </p>
                  </div>
                  <span className="text-[11px] text-zinc-600">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "projects":
        return projects && projects.length > 0 ? (
          <section key="projects" className="space-y-2.5">
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b border-zinc-950 pb-0.5">
              Key Projects
            </h2>
            <div className="space-y-2 font-sans">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} className="space-y-0.5">
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
                      Stack: {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "skills":
        return skills && skills.length > 0 ? (
          <section key="skills" className="space-y-2">
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b border-zinc-950 pb-0.5">
              Skills
            </h2>
            <div className="space-y-2 font-sans text-xs">
              {skills.map((grp, gIdx) => (
                <div key={grp.id || gIdx} className="space-y-1">
                  <p className="font-bold text-zinc-900 text-[11px] uppercase tracking-wider">{grp.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {grp.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 bg-zinc-100 rounded text-zinc-800 text-[11px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "certifications":
        return certs && certs.length > 0 ? (
          <section key="certifications" className="space-y-2">
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b border-zinc-950 pb-0.5">
              Certificates
            </h2>
            <div className="space-y-1.5 font-sans text-xs">
              {certs.map((c, idx) => (
                <div key={c.id || idx} className="flex justify-between items-baseline">
                  <span className="font-bold text-zinc-900">{c.name}</span>
                  <span className="text-zinc-500 text-[11px] italic">{c.issuer}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "languages":
        return languages && languages.length > 0 ? (
          <section key="languages" className="space-y-2">
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b border-zinc-950 pb-0.5">
              Languages
            </h2>
            <div className="space-y-1 font-sans text-xs">
              {languages.map((l, idx) => (
                <div key={l.id || idx} className="flex justify-between items-center text-zinc-800">
                  <span className="font-medium">{l.name}</span>
                  <span className="text-[11px] text-zinc-500 italic">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-zinc-900 p-10 font-serif leading-normal text-[12px] flex flex-col justify-between">
      {/* Top Centered Header with Circular Profile Photo */}
      <header className="flex flex-col items-center text-center pb-5 mb-5 border-b border-zinc-200">
        <div className="mb-3">
          {personalInfo.avatarUrl ? (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-full object-cover shadow-xs border border-zinc-200"
            />
          ) : (
            <div
              className="w-18 h-18 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-xs"
              style={{ backgroundColor: themeColor || "#2563eb" }}
            >
              {personalInfo.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 uppercase mb-0.5">
          {personalInfo.fullName}
        </h1>
        {personalInfo.headline && (
          <p className="text-xs italic font-serif text-zinc-600 tracking-wide mb-2">
            {personalInfo.headline}
          </p>
        )}

        <DynamicContactBar
          personalInfo={personalInfo}
          themeColor={themeColor || "#2563eb"}
          className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-[11px] font-sans text-zinc-600"
          separator={<span className="text-zinc-400">•</span>}
        />
      </header>

      {/* Dynamic Section Layout Body */}
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
