import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "./dynamic-contact-bar";
import { FormattedResumeText } from "./formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const ClassicClearTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, projects, skills, certs, languages, themeColor } = mergedData;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-zinc-900 p-10 font-serif leading-normal text-[12.5px] flex flex-col justify-between">
      {/* Header - Centered Title & Subtitle */}
      <header className="text-center pb-5 mb-5 border-b border-zinc-300">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 uppercase mb-1">
          {personalInfo.fullName}
        </h1>
        {personalInfo.headline && (
          <p className="text-xs font-sans font-medium text-zinc-600 tracking-wide mb-2.5">
            {personalInfo.headline}
          </p>
        )}

        {/* Contact Strip with Clean Icons */}
        <DynamicContactBar
          personalInfo={personalInfo}
          themeColor="#71717a"
          className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs font-sans text-zinc-600"
          itemClassName="flex items-center gap-1"
        />
      </header>

      {/* Main Sections */}
      <div className="space-y-4 flex-1">
        {/* SUMMARY */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-xs font-bold font-sans tracking-wider uppercase text-zinc-950 border-b border-zinc-950 pb-0.5 mb-1.5">
              Summary
            </h2>
            <FormattedResumeText
              content={personalInfo.summary}
              className="text-zinc-800 text-justify leading-relaxed text-xs"
            />
          </section>
        )}

        {/* PROFESSIONAL EXPERIENCE */}
        {experiences && experiences.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold font-sans tracking-wider uppercase text-zinc-950 border-b border-zinc-950 pb-0.5 mb-1.5">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-0.5">
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
        )}

        {/* EDUCATION */}
        {educations && educations.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold font-sans tracking-wider uppercase text-zinc-950 border-b border-zinc-950 pb-0.5 mb-1.5">
              Education
            </h2>
            <div className="space-y-1.5">
              {educations.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline font-sans">
                  <div>
                    <h3 className="font-bold text-xs text-zinc-950">{edu.degree}</h3>
                    <p className="text-xs text-zinc-600 italic">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                  </div>
                  <span className="text-[11px] text-zinc-600">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS (2 COLUMNS) */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold font-sans tracking-wider uppercase text-zinc-950 border-b border-zinc-950 pb-0.5 mb-1.5">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 font-sans text-xs">
              {skills.flatMap((s) => s.skills).map((skill, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-zinc-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATES */}
        {certs && certs.length > 0 && (
          <section>
            <h2 className="text-xs font-bold font-sans tracking-wider uppercase text-zinc-950 border-b border-zinc-950 pb-0.5 mb-1.5">
              Certificates
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 font-sans text-xs">
              {certs.map((c, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-zinc-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0" />
                  <span>{c.name} ({c.issuer})</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LANGUAGES */}
        {languages && languages.length > 0 && (
          <section>
            <h2 className="text-xs font-bold font-sans tracking-wider uppercase text-zinc-950 border-b border-zinc-950 pb-0.5 mb-1.5">
              Languages
            </h2>
            <div className="flex gap-8 font-sans text-xs text-zinc-800">
              {languages.map((l, idx) => (
                <div key={idx}>
                  <strong>{l.name}</strong> {l.proficiency && `(${l.proficiency})`}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
