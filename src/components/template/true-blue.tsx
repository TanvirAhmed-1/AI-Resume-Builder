import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "./dynamic-contact-bar";
import { FormattedResumeText } from "./formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const TrueBlueTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, projects, skills, certs, languages } = mergedData;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-zinc-800 p-9 flex flex-col justify-between font-sans text-[12px] leading-relaxed">
      {/* Top Header - True Blue Branding */}
      <header className="border-b-2 border-blue-600 pb-5 mb-5">
        <div className="flex justify-between items-baseline mb-1">
          <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">
            {personalInfo.fullName}
          </h1>
          {personalInfo.headline && (
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              {personalInfo.headline}
            </span>
          )}
        </div>

        {/* Contact Strip */}
        <DynamicContactBar
          personalInfo={personalInfo}
          themeColor="#2563eb"
          className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-600 pt-1"
          itemClassName="flex items-center gap-1"
        />
      </header>

      {/* Main Content */}
      <div className="space-y-4 flex-1">
        {/* SUMMARY */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-blue-100 pb-0.5 mb-1.5">
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
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-blue-100 pb-0.5 mb-1.5">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline font-bold text-zinc-950 text-xs">
                    <span>
                      {exp.position}, <span className="font-semibold text-blue-600">{exp.company}</span>
                    </span>
                    <span className="text-[11px] text-zinc-500 font-normal">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <p className="text-[10px] text-zinc-500">{exp.location}</p>
                  )}
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

        {/* EDUCATION */}
        {educations && educations.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-blue-100 pb-0.5 mb-1.5">
              Education
            </h2>
            <div className="space-y-1.5">
              {educations.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-zinc-900 text-xs">{edu.degree}</h3>
                    <p className="text-xs text-zinc-600">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                  </div>
                  <span className="text-[11px] text-zinc-500">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS (2 EQUAL COLUMNS) */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-blue-100 pb-0.5 mb-1.5">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
              {skills.flatMap((s) => s.skills).map((skill, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-zinc-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LANGUAGES */}
        {languages && languages.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-blue-100 pb-0.5 mb-1.5">
              Languages
            </h2>
            <div className="flex gap-8 text-xs text-zinc-700">
              {languages.map((l, idx) => (
                <div key={idx}>
                  <strong className="text-zinc-900">{l.name}:</strong> {l.proficiency || "Proficient"}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATES */}
        {certs && certs.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-blue-100 pb-0.5 mb-1.5">
              Certificates
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
              {certs.map((c, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-zinc-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
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
