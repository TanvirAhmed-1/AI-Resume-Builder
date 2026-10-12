import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "./dynamic-contact-bar";
import { FormattedResumeText } from "./formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const MilanExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, projects, skills, certs, languages, themeColor } = mergedData;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-zinc-900 flex flex-col justify-between font-serif text-[12.5px] leading-relaxed">
      {/* Bold Top Color Header Banner */}
      <header
        className="p-8 text-white flex justify-between items-center"
        style={{ backgroundColor: themeColor }}
      >
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-wide uppercase">{personalInfo.fullName}</h1>
          {personalInfo.headline && (
            <p className="text-xs uppercase tracking-widest font-sans font-medium text-white/90">
              {personalInfo.headline}
            </p>
          )}
        </div>

        <DynamicContactBar
          personalInfo={personalInfo}
          themeColor="#f4f4f5"
          className="flex flex-col items-end text-right text-xs font-sans text-white/90 space-y-1"
          itemClassName="flex items-center gap-1.5"
        />
      </header>

      {/* Main Body */}
      <div className="p-8 space-y-6 flex-1">
        {personalInfo.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest font-sans mb-2 text-zinc-950 border-b pb-1">
              Executive Profile
            </h2>
            <FormattedResumeText
              content={personalInfo.summary}
              className="text-zinc-700 leading-relaxed text-justify text-xs"
            />
          </section>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest font-sans text-zinc-950 border-b pb-1">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-baseline font-sans">
                    <h3 className="font-bold text-zinc-950 text-sm">{exp.position}</h3>
                    <span className="text-xs text-zinc-500 italic">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-600 font-sans italic">
                    <span>{exp.company}</span>
                    {exp.location && <span> • {exp.location}</span>}
                  </div>
                  {exp.description && (
                    <FormattedResumeText
                      content={exp.description}
                      className="text-zinc-700 text-xs font-sans leading-relaxed mt-1"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2-Column for Education & Skills */}
        <div className="grid grid-cols-2 gap-8 font-sans pt-2">
          {educations && educations.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-950 border-b pb-1 font-serif">
                Education
              </h2>
              {educations.map((edu, idx) => (
                <div key={idx} className="space-y-0.5">
                  <h3 className="font-bold text-xs text-zinc-900">{edu.degree}</h3>
                  <p className="text-xs text-zinc-600">{edu.institution}</p>
                  <span className="text-[11px] text-zinc-500">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </section>
          )}

          {skills && skills.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-950 border-b pb-1 font-serif">
                Key Competencies
              </h2>
              {skills.map((grp, idx) => (
                <div key={idx} className="text-xs">
                  <span className="font-bold text-zinc-800">{grp.category}: </span>
                  <span className="text-zinc-600">{grp.skills.join(", ")}</span>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
