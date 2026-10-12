import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { mergeWithDefaultData } from "@/lib/default-resume-data";

import { DynamicContactBar } from "@/components/template/dynamic-contact-bar";
import { FormattedResumeText } from "@/components/template/formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, projects, skills, certs, languages, themeColor } = mergedData;

  return (
    <div className="w-full h-full bg-white text-zinc-900 p-10 font-serif leading-normal text-[13px] flex flex-col justify-between">
      {/* Centered Traditional Header */}
      <header className="text-center pb-5 border-b border-zinc-400 mb-6">
        <h1 className="text-2xl font-bold tracking-wide uppercase text-zinc-950 mb-1">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        {personalInfo.headline && (
          <p className="text-xs uppercase tracking-widest text-zinc-600 font-sans font-semibold mb-2">
            {personalInfo.headline}
          </p>
        )}

        <DynamicContactBar
          personalInfo={personalInfo}
          themeColor={themeColor}
          className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-zinc-700 font-sans"
          separator={<span className="text-zinc-400">•</span>}
        />
      </header>

      {/* Body */}
      <div className="space-y-5 flex-1">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-2 font-sans"
              style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
              Professional Summary
            </h2>
            <FormattedResumeText
              content={personalInfo.summary}
              className="text-zinc-800 text-justify leading-relaxed text-xs"
            />
          </section>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-2 font-sans"
              style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
              Work Experience
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-zinc-950 text-sm">{exp.position}</h3>
                    <span className="text-xs text-zinc-600 font-sans italic">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-700 italic mb-1">
                    <span>{exp.company}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  {exp.description && (
                    <FormattedResumeText
                      content={exp.description}
                      className="text-zinc-800 text-xs leading-relaxed font-sans"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {educations && educations.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-2 font-sans"
              style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
              Education
            </h2>
            <div className="space-y-2">
              {educations.map((edu, idx) => (
                <div key={edu.id || idx} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-zinc-950 text-xs">
                      {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                    </h3>
                    <p className="text-xs text-zinc-700 italic">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                  </div>
                  <span className="text-xs text-zinc-600 font-sans italic">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-2 font-sans"
              style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
              Selected Projects
            </h2>
            <div className="space-y-2">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-zinc-950 text-xs">{proj.title}</h3>
                    {(proj.startDate || proj.endDate) && (
                      <span className="text-[11px] text-zinc-600 font-sans italic">
                        {proj.startDate} {proj.endDate && `– ${proj.endDate}`}
                      </span>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-zinc-800 text-xs font-sans mt-0.5 leading-relaxed">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-2 font-sans"
              style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
              Skills & Expertise
            </h2>
            <div className="space-y-1 font-sans text-xs">
              {skills.map((grp, idx) => (
                <p key={grp.id || idx} className="text-zinc-800">
                  <strong className="text-zinc-950 font-semibold">{grp.category}:</strong>{" "}
                  {grp.skills.join(", ")}
                </p>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
