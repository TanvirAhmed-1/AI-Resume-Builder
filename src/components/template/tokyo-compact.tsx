import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "./dynamic-contact-bar";
import { FormattedResumeText } from "./formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const TokyoCompactTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, projects, skills, certs, languages, themeColor } = mergedData;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-zinc-800 p-8 flex flex-col justify-between font-sans text-[12px] leading-snug">
      {/* Accent Header Bar */}
      <header className="border-b-4 pb-4 mb-5" style={{ borderColor: themeColor }}>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-950 uppercase">
              {personalInfo.fullName}
            </h1>
            {personalInfo.headline && (
              <p className="text-xs font-bold tracking-wider uppercase mt-0.5" style={{ color: themeColor }}>
                {personalInfo.headline}
              </p>
            )}
          </div>

          <DynamicContactBar
            personalInfo={personalInfo}
            themeColor="#7c3aed"
            className="flex flex-col items-end text-right text-[11px] text-zinc-600 space-y-0.5"
            itemClassName="flex items-center gap-1.5"
          />
        </div>
      </header>

      {/* Main 2-Equal Columns Grid */}
      <div className="grid grid-cols-2 gap-6 flex-1">
        {/* Left Column */}
        <div className="space-y-4">
          {personalInfo.summary && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-1.5">
                Summary
              </h2>
              <FormattedResumeText
                content={personalInfo.summary}
                className="text-zinc-600 text-justify leading-relaxed text-[11px]"
              />
            </section>
          )}

          {experiences && experiences.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-1.5">
                Experience
              </h2>
              <div className="space-y-3">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between items-baseline font-bold text-zinc-900">
                      <span>{exp.position}</span>
                      <span className="text-[10px] text-zinc-500 font-normal">
                        {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-600 font-medium">{exp.company} {exp.location && `• ${exp.location}`}</p>
                    {exp.description && (
                      <FormattedResumeText
                        content={exp.description}
                        className="text-zinc-600 text-[11px] leading-relaxed"
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {skills && skills.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-1.5">
                Skills & Tech
              </h2>
              <div className="space-y-2">
                {skills.map((grp, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-[11px] font-bold text-zinc-800">{grp.category}</p>
                    <div className="flex flex-wrap gap-1">
                      {grp.skills.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {educations && educations.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-1.5">
                Education
              </h2>
              <div className="space-y-2">
                {educations.map((edu, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between items-baseline font-bold text-zinc-900">
                      <span>{edu.degree}</span>
                      <span className="text-[10px] text-zinc-500 font-normal">{edu.startDate} – {edu.endDate}</span>
                    </div>
                    <p className="text-[11px] text-zinc-600">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-1.5">
                Projects
              </h2>
              <div className="space-y-2">
                {projects.map((p, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <h3 className="font-bold text-zinc-900">{p.title}</h3>
                    {p.description && <p className="text-zinc-600 text-[11px]">{p.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages && languages.length > 0 && (
            <section className="space-y-1">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-1.5">
                Languages
              </h2>
              {languages.map((l, idx) => (
                <div key={idx} className="flex justify-between text-[11px]">
                  <span className="font-medium text-zinc-800">{l.name}</span>
                  <span className="text-zinc-500">{l.proficiency}</span>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
