import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { ExternalLink } from "lucide-react";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "./dynamic-contact-bar";
import { FormattedResumeText } from "./formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const ZurichSidebarTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, projects, skills, certs, languages, themeColor } = mergedData;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-zinc-800 grid grid-cols-12 text-[12.5px] font-sans leading-relaxed">
      {/* Deep Navy/Dark Sidebar (Left 4 cols) */}
      <aside className="col-span-4 bg-[#111827] text-zinc-100 p-8 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Avatar / Initials */}
          <div className="flex flex-col items-center text-center">
            {personalInfo.avatarUrl ? (
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="w-24 h-24 rounded-full object-cover border-2 border-white/20 mb-3"
              />
            ) : (
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl mb-3 text-white shadow-inner"
                style={{ backgroundColor: themeColor }}
              >
                {personalInfo.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}
            <h1 className="text-xl font-bold tracking-tight text-white mb-1">
              {personalInfo.fullName}
            </h1>
            {personalInfo.headline && (
              <p className="text-xs text-zinc-400 font-medium">{personalInfo.headline}</p>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-3 pt-4 border-t border-zinc-800 text-xs">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Contact</h2>
            <DynamicContactBar
              personalInfo={personalInfo}
              themeColor="#a1a1aa"
              className="space-y-2 text-zinc-300 text-xs"
              itemClassName="flex items-center gap-2"
            />
          </div>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-zinc-800 text-xs">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Skills</h2>
              <div className="space-y-3">
                {skills.map((grp, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-[11px] font-semibold text-zinc-300">{grp.category}</p>
                    <div className="flex flex-wrap gap-1">
                      {grp.skills.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 rounded bg-zinc-800/90 text-zinc-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-zinc-800 text-xs">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Languages</h2>
              {languages.map((l, idx) => (
                <div key={idx} className="flex justify-between text-zinc-300">
                  <span>{l.name}</span>
                  <span className="text-zinc-500 text-[11px]">{l.proficiency}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Main Body (Right 8 cols) */}
      <main className="col-span-8 p-8 flex flex-col space-y-6">
        {/* Profile Summary */}
        {personalInfo.summary && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: themeColor, borderColor: themeColor }}
            >
              Profile Summary
            </h2>
            <FormattedResumeText
              content={personalInfo.summary}
              className="text-zinc-600 text-justify leading-relaxed text-xs"
            />
          </section>
        )}

        {/* Work Experience */}
        {experiences && experiences.length > 0 && (
          <section className="space-y-3">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b-2"
              style={{ color: themeColor, borderColor: themeColor }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-zinc-900 text-[13px]">{exp.position}</h3>
                    <span className="text-xs text-zinc-500 font-medium">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-medium text-zinc-600">
                    <span>{exp.company}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  {exp.description && (
                    <FormattedResumeText
                      content={exp.description}
                      className="text-zinc-600 text-xs leading-relaxed mt-1"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {educations && educations.length > 0 && (
          <section className="space-y-3">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b-2"
              style={{ color: themeColor, borderColor: themeColor }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {educations.map((edu, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-zinc-900 text-xs">{edu.degree}</h3>
                    <span className="text-xs text-zinc-500">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 font-medium">{edu.institution}</p>
                  {edu.fieldOfStudy && (
                    <p className="text-[11px] text-zinc-500">Major: {edu.fieldOfStudy}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-3">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b-2"
              style={{ color: themeColor, borderColor: themeColor }}
            >
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((p, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-zinc-900 text-xs">{p.title}</h3>
                      {p.url && (
                        <a href={p.url} target="_blank" rel="noreferrer" className="text-zinc-400">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    {p.startDate && (
                      <span className="text-xs text-zinc-500">
                        {p.startDate} {p.endDate && `– ${p.endDate}`}
                      </span>
                    )}
                  </div>
                  {p.description && <p className="text-xs text-zinc-600">{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
