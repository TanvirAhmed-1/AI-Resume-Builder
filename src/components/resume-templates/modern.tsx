import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { Mail, Phone, MapPin, Globe, Link2, Code, ExternalLink } from "lucide-react";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "@/components/template/dynamic-contact-bar";
import { FormattedResumeText } from "@/components/template/formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, projects, skills, certs, languages, themeColor } = mergedData;

  return (
    <div className="w-full h-full bg-white text-zinc-800 p-8 flex flex-col justify-between font-sans leading-relaxed text-[13px]">
      {/* Header */}
      <header className="border-b-2 pb-6 mb-6" style={{ borderColor: themeColor }}>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 mb-1">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        {personalInfo.headline && (
          <p className="text-base font-semibold" style={{ color: themeColor }}>
            {personalInfo.headline}
          </p>
        )}

        {/* Contact Links (Rendered dynamically based on active fields) */}
        <DynamicContactBar
          personalInfo={personalInfo}
          themeColor={themeColor}
          className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-zinc-600"
        />
      </header>

      {/* Dynamic Section Layout Body */}
      {(() => {
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
                <section key="summary">
                  <h2
                    className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"
                    style={{ color: themeColor }}
                  >
                    Professional Summary
                  </h2>
                  <FormattedResumeText
                    content={personalInfo.summary}
                    className="text-zinc-600 text-justify leading-relaxed text-xs"
                  />
                </section>
              ) : null;

            case "experience":
              return experiences && experiences.length > 0 ? (
                <section key="experience" className="space-y-4">
                  <h2
                    className="text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    style={{ color: themeColor }}
                  >
                    Work Experience
                  </h2>
                  <div className="space-y-4">
                    {experiences.map((exp, idx) => (
                      <div key={exp.id || idx} className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-bold text-zinc-900 text-sm">{exp.position}</h3>
                          <span className="text-xs text-zinc-500 font-medium">
                            {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-zinc-600 font-medium">
                          <span>{exp.company}</span>
                          {exp.location && <span>{exp.location}</span>}
                        </div>
                        {exp.description && (
                          <FormattedResumeText
                            content={exp.description}
                            className="text-zinc-600 text-xs mt-1.5 leading-relaxed"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case "projects":
              return projects && projects.length > 0 ? (
                <section key="projects" className="space-y-4">
                  <h2
                    className="text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    style={{ color: themeColor }}
                  >
                    Key Projects
                  </h2>
                  <div className="space-y-3">
                    {projects.map((proj, idx) => (
                      <div key={proj.id || idx} className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-zinc-900 text-sm">{proj.title}</h3>
                            {proj.url && (
                              <a
                                href={proj.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-zinc-400 hover:text-zinc-600"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          {(proj.startDate || proj.endDate) && (
                            <span className="text-xs text-zinc-500">
                              {proj.startDate} {proj.endDate && `– ${proj.endDate}`}
                            </span>
                          )}
                        </div>
                        {proj.description && (
                          <FormattedResumeText
                            content={proj.description}
                            className="text-zinc-600 text-xs leading-relaxed"
                          />
                        )}
                        {proj.technologies && proj.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {proj.technologies.map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 font-medium"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case "education":
              return educations && educations.length > 0 ? (
                <section key="education" className="space-y-3">
                  <h2
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: themeColor }}
                  >
                    Education
                  </h2>
                  <div className="space-y-3">
                    {educations.map((edu, idx) => (
                      <div key={edu.id || idx} className="space-y-0.5">
                        <h3 className="font-bold text-zinc-900 text-xs">{edu.degree}</h3>
                        <p className="text-xs text-zinc-700 font-medium">{edu.institution}</p>
                        <div className="flex justify-between text-[11px] text-zinc-500">
                          <span>
                            {edu.startDate} – {edu.endDate}
                          </span>
                          {edu.score && <span>{edu.score}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case "skills":
              return skills && skills.length > 0 ? (
                <section key="skills" className="space-y-3">
                  <h2
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: themeColor }}
                  >
                    Skills & Expertise
                  </h2>
                  <div className="space-y-2.5">
                    {skills.map((grp, idx) => (
                      <div key={grp.id || idx}>
                        <p className="text-xs font-semibold text-zinc-800 mb-1">
                          {grp.category}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {grp.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                              style={{
                                backgroundColor: `${themeColor}15`,
                                color: themeColor,
                              }}
                            >
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
                  <h2
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: themeColor }}
                  >
                    Certifications
                  </h2>
                  <div className="space-y-2">
                    {certs.map((c, idx) => (
                      <div key={c.id || idx} className="text-xs">
                        <p className="font-semibold text-zinc-900">{c.name}</p>
                        <p className="text-zinc-600 text-[11px]">
                          {c.issuer} {c.issueDate && `• ${c.issueDate}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case "languages":
              return languages && languages.length > 0 ? (
                <section key="languages" className="space-y-2">
                  <h2
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: themeColor }}
                  >
                    Languages
                  </h2>
                  <div className="space-y-1">
                    {languages.map((l, idx) => (
                      <div key={l.id || idx} className="flex justify-between text-xs">
                        <span className="font-medium text-zinc-900">{l.name}</span>
                        <span className="text-zinc-500">{l.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            default:
              return null;
          }
        };

        // Layout 1: Single Column Linear Layout
        if (columnLayout === "single") {
          return (
            <div className="flex flex-col space-y-6 flex-1">
              {sectionOrder.map((key) => renderSectionItem(key))}
            </div>
          );
        }

        // Separate sections by column assignment
        const fullSections = sectionOrder.filter(
          (k) => sectionColumns[k] === "full"
        );
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
            <div className="flex flex-col space-y-6 flex-1">
              {fullSections.map((k) => renderSectionItem(k))}
              <div className="grid grid-cols-12 gap-8 flex-1">
                <div className="col-span-4 flex flex-col space-y-6 border-r pr-6 border-zinc-100">
                  {rightSections.map((k) => renderSectionItem(k))}
                </div>
                <div className="col-span-8 flex flex-col space-y-6">
                  {leftSections.map((k) => renderSectionItem(k))}
                </div>
              </div>
            </div>
          );
        }

        // Layout 3: 2 Equal Columns (50% / 50%)
        if (columnLayout === "two-column") {
          return (
            <div className="flex flex-col space-y-6 flex-1">
              {fullSections.map((k) => renderSectionItem(k))}
              <div className="grid grid-cols-2 gap-8 flex-1">
                <div className="flex flex-col space-y-6">
                  {leftSections.map((k) => renderSectionItem(k))}
                </div>
                <div className="flex flex-col space-y-6 border-l pl-6 border-zinc-100">
                  {rightSections.map((k) => renderSectionItem(k))}
                </div>
              </div>
            </div>
          );
        }

        // Layout 4: Right Sidebar Default (65% Main / 35% Side)
        return (
          <div className="flex flex-col space-y-6 flex-1">
            {fullSections.map((k) => renderSectionItem(k))}
            <div className="grid grid-cols-12 gap-8 flex-1">
              <div className="col-span-8 flex flex-col space-y-6">
                {leftSections.map((k) => renderSectionItem(k))}
              </div>
              <div className="col-span-4 flex flex-col space-y-6 border-l pl-6 border-zinc-100">
                {rightSections.map((k) => renderSectionItem(k))}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
