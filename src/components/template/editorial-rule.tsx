import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "./dynamic-contact-bar";
import { FormattedResumeText } from "./formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const EditorialRuleTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, skills, certs, languages } = mergedData;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-zinc-900 p-10 font-serif leading-normal text-[12px] flex flex-col justify-between">
      {/* Centered Serif Header with Double-like Clean Borders */}
      <header className="text-center pb-4 mb-4 border-b-2 border-zinc-900">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 uppercase mb-1">
          {personalInfo.fullName}
        </h1>
        {personalInfo.headline && (
          <p className="text-xs italic text-zinc-600 font-serif tracking-wide mb-2.5">
            {personalInfo.headline}
          </p>
        )}

        {/* Contact Links with bullet separators */}
        <DynamicContactBar
          personalInfo={personalInfo}
          themeColor="#18181b"
          className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-[11px] font-sans text-zinc-600"
          separator={<span className="text-zinc-400">•</span>}
        />
      </header>

      {/* Main Content */}
      <div className="space-y-4 flex-1">
        {/* SUMMARY */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b border-zinc-900 pb-0.5 mb-1.5">
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
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b border-zinc-900 pb-0.5 mb-1.5">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline font-sans">
                    <h3 className="font-bold text-zinc-950 text-xs">
                      {exp.company}, <span className="font-normal italic text-zinc-700">{exp.position}</span>
                    </h3>
                    <span className="text-[11px] text-zinc-600">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate} {exp.location && `| ${exp.location}`}
                    </span>
                  </div>
                  {exp.description && (
                    <FormattedResumeText
                      content={exp.description}
                      className="text-zinc-800 text-xs font-sans leading-relaxed mt-0.5"
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
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b border-zinc-900 pb-0.5 mb-1.5">
              Education
            </h2>
            <div className="space-y-1.5">
              {educations.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline font-sans">
                  <div>
                    <h3 className="font-bold text-xs text-zinc-950">{edu.institution}</h3>
                    <p className="text-xs text-zinc-600 italic">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                  </div>
                  <span className="text-[11px] text-zinc-600">{edu.startDate} – {edu.endDate} {edu.location && `| ${edu.location}`}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b border-zinc-900 pb-0.5 mb-1.5">
              Skills
            </h2>
            <p className="font-sans text-xs text-zinc-800 leading-relaxed">
              {skills.flatMap((s) => s.skills).join("  |  ")}
            </p>
          </section>
        )}

        {/* LANGUAGES */}
        {languages && languages.length > 0 && (
          <section>
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b border-zinc-900 pb-0.5 mb-1.5">
              Languages
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-1 font-sans text-xs text-zinc-800">
              {languages.map((l, idx) => (
                <span key={idx}>
                  <strong>{l.name}</strong> {l.proficiency && `(${l.proficiency})`}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATES */}
        {certs && certs.length > 0 && (
          <section>
            <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-zinc-950 border-b border-zinc-900 pb-0.5 mb-1.5">
              Certificates
            </h2>
            <p className="font-sans text-xs text-zinc-800 leading-relaxed">
              {certs.map((c) => `${c.name} (${c.issuer})`).join("  |  ")}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};
