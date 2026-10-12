import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "./dynamic-contact-bar";
import { FormattedResumeText } from "./formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const PrecisionLineTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, skills, certs, languages } = mergedData;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-zinc-800 p-9 flex flex-col justify-between font-sans text-[11.5px] leading-relaxed">
      {/* Top Precision Green Banner */}
      <header className="border-b-2 border-emerald-700 pb-5 mb-4">
        <div className="flex justify-between items-baseline mb-1">
          <h1 className="text-3xl font-extrabold text-emerald-800 tracking-tight">
            {personalInfo.fullName}
          </h1>
          {personalInfo.headline && (
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              {personalInfo.headline}
            </span>
          )}
        </div>

        {/* Contact Header Line */}
        <DynamicContactBar
          personalInfo={personalInfo}
          themeColor="#047857"
          className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-600 pt-1"
          itemClassName="flex items-center gap-1"
        />
      </header>

      {/* Main Content with Emerald Left Borders */}
      <div className="space-y-3.5 flex-1">
        {/* SUMMARY */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-100 pb-0.5 mb-1">
              Summary
            </h2>
            <FormattedResumeText
              content={personalInfo.summary}
              className="text-zinc-600 text-justify leading-relaxed text-xs"
            />
          </section>
        )}

        {/* PROFESSIONAL EXPERIENCE */}
        {experiences && experiences.length > 0 && (
          <section className="space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-100 pb-0.5 mb-1">
              Professional Experience
            </h2>
            <div className="space-y-2.5">
              {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline font-bold text-zinc-950 text-xs">
                    <span>
                      {exp.company}, <span className="font-semibold text-emerald-700">{exp.position}</span>
                    </span>
                    <span className="text-[10.5px] text-zinc-500 font-normal">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate} {exp.location && `| ${exp.location}`}
                    </span>
                  </div>
                  {exp.description && (
                    <FormattedResumeText
                      content={exp.description}
                      className="text-zinc-600 text-xs leading-relaxed mt-0.5"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {educations && educations.length > 0 && (
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-100 pb-0.5 mb-1">
              Education
            </h2>
            <div className="space-y-1">
              {educations.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-zinc-900 text-xs">{edu.degree}</h3>
                    <p className="text-xs text-zinc-600">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                  </div>
                  <span className="text-[10.5px] text-zinc-500">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS (MULTI-COLUMN) */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-100 pb-0.5 mb-1">
              Skills
            </h2>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-xs">
              {skills.flatMap((s) => s.skills).map((skill, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-zinc-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LANGUAGES */}
        {languages && languages.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-100 pb-0.5 mb-1">
              Languages
            </h2>
            <div className="flex gap-8 text-xs text-zinc-700">
              {languages.map((l, idx) => (
                <div key={idx}>
                  <strong className="text-zinc-900">{l.name}:</strong> {l.proficiency || "Fluent"}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATES */}
        {certs && certs.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-100 pb-0.5 mb-1">
              Certificates
            </h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
              {certs.map((c, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-zinc-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0" />
                  <span>{c.name} ({c.issuer})</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
