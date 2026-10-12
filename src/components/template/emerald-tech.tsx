import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "./dynamic-contact-bar";
import { FormattedResumeText } from "./formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const EmeraldTechTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, skills, certs, languages } = mergedData;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-zinc-800 p-9 flex flex-col justify-between font-sans text-[12px] leading-relaxed">
      {/* Top Header with Candidate Square Photo on Right and Emerald Accents */}
      <header className="flex justify-between items-start pb-6 mb-5 border-b-2 border-emerald-600">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight">
            {personalInfo.fullName}
          </h1>
          {personalInfo.headline && (
            <p className="text-xs font-bold text-emerald-700 tracking-wide">
              {personalInfo.headline}
            </p>
          )}

          {/* Dynamic contact list with emerald icons */}
          <DynamicContactBar
            personalInfo={personalInfo}
            themeColor="#059669"
            className="grid grid-cols-2 gap-x-6 gap-y-1 pt-1 text-[11px] text-zinc-600"
            itemClassName="flex items-center gap-1.5"
          />
        </div>

        {/* Candidate Photo (Rounded Square) */}
        <div className="shrink-0 ml-4">
          {personalInfo.avatarUrl ? (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-xl object-cover shadow-xs border border-zinc-200"
            />
          ) : (
            <div className="w-18 h-18 rounded-xl bg-emerald-700 flex items-center justify-center font-bold text-xl text-white shadow-xs">
              {personalInfo.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-4 flex-1">
        {/* SUMMARY */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 border-b border-emerald-100 pb-0.5 mb-1.5">
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 border-b border-emerald-100 pb-0.5 mb-1.5">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline font-bold text-zinc-950 text-xs">
                    <span>
                      {exp.position}, <span className="font-semibold text-emerald-700">{exp.company}</span>
                    </span>
                    <span className="text-[11px] text-zinc-500 font-normal">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate} {exp.location && `| ${exp.location}`}
                    </span>
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

        {/* EDUCATION */}
        {educations && educations.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 border-b border-emerald-100 pb-0.5 mb-1.5">
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

        {/* SKILLS */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 border-b border-emerald-100 pb-0.5 mb-1.5">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
              {skills.flatMap((s) => s.skills).map((skill, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-zinc-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LANGUAGES & CERTIFICATES (2 COLUMNS) */}
        <div className="grid grid-cols-2 gap-8 pt-1">
          {languages && languages.length > 0 && (
            <section className="space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 border-b border-emerald-100 pb-0.5 mb-1">
                Languages
              </h2>
              <div className="space-y-0.5 text-xs text-zinc-700">
                {languages.map((l, idx) => (
                  <p key={idx}>
                    <strong className="text-zinc-900">{l.name}:</strong> {l.proficiency || "Fluent"}
                  </p>
                ))}
              </div>
            </section>
          )}

          {certs && certs.length > 0 && (
            <section className="space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 border-b border-emerald-100 pb-0.5 mb-1">
                Certificates
              </h2>
              <div className="space-y-0.5 text-xs text-zinc-700">
                {certs.map((c, idx) => (
                  <p key={idx} className="truncate">
                    • {c.name} ({c.issuer})
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
