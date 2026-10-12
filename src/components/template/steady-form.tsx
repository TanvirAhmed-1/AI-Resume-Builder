import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "./dynamic-contact-bar";
import { FormattedResumeText } from "./formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const SteadyFormTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, skills, certs, languages, themeColor } = mergedData;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-zinc-800 p-9 flex flex-col justify-between font-sans text-[12px] leading-relaxed">
      {/* Centered Profile Header with Circular Photo on Right/Center */}
      <header className="flex items-center justify-between pb-6 mb-5 border-b border-zinc-200">
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
              {personalInfo.fullName}
            </h1>
            {personalInfo.headline && (
              <span className="text-xs text-zinc-500 font-medium">
                • {personalInfo.headline}
              </span>
            )}
          </div>

          <DynamicContactBar
            personalInfo={personalInfo}
            themeColor="#71717a"
            className="grid grid-cols-2 gap-x-6 gap-y-1 pt-1 text-[11px] text-zinc-600"
            itemClassName="flex items-center gap-1.5"
          />
        </div>

        {/* Circular Avatar */}
        <div className="shrink-0 ml-4">
          {personalInfo.avatarUrl ? (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-full object-cover shadow-xs border border-zinc-200"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-xs"
              style={{ backgroundColor: themeColor || "#059669" }}
            >
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

      {/* Main Content Sections with Centered Headers */}
      <div className="space-y-4 flex-1">
        {/* SUMMARY */}
        {personalInfo.summary && (
          <section className="text-center px-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-1.5">
              Summary
            </h2>
            <FormattedResumeText
              content={personalInfo.summary}
              className="text-zinc-600 leading-relaxed text-justify max-w-2xl mx-auto text-xs"
            />
          </section>
        )}

        {/* PROFESSIONAL EXPERIENCE */}
        {experiences && experiences.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2 text-center">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-4">
                  {/* Left Column (Dates & Location) */}
                  <div className="col-span-3 text-right text-[11px] text-zinc-500 pt-0.5">
                    <p className="font-medium text-zinc-700">{exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}</p>
                    {exp.location && <p className="text-[10px] italic">{exp.location}</p>}
                  </div>

                  {/* Right Column (Company & Details) */}
                  <div className="col-span-9 space-y-0.5">
                    <h3 className="font-bold text-zinc-950 text-xs">
                      {exp.company}, <span className="font-medium text-zinc-700">{exp.position}</span>
                    </h3>
                    {exp.description && (
                      <FormattedResumeText
                        content={exp.description}
                        className="text-zinc-600 text-xs leading-relaxed mt-1"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {educations && educations.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2 text-center">
              Education
            </h2>
            <div className="space-y-2">
              {educations.map((edu, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-right text-[11px] text-zinc-500">
                    <span>{edu.startDate} – {edu.endDate}</span>
                    {edu.location && <p className="text-[10px] italic">{edu.location}</p>}
                  </div>
                  <div className="col-span-9 text-xs">
                    <h3 className="font-bold text-zinc-950">{edu.degree}</h3>
                    <p className="text-zinc-600">{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS */}
        {skills && skills.length > 0 && (
          <section className="text-center pt-1">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-1.5 text-center">
              Skills
            </h2>
            <div className="grid grid-cols-3 gap-2 max-w-xl mx-auto text-xs text-zinc-700 text-left">
              {skills.flatMap((s) => s.skills).map((skill, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LANGUAGES */}
        {languages && languages.length > 0 && (
          <section className="text-center pt-1">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-1.5 text-center">
              Languages
            </h2>
            <div className="flex justify-center gap-8 text-xs text-zinc-700">
              {languages.map((l, idx) => (
                <div key={idx}>
                  <strong className="text-zinc-900">{l.name}</strong> {l.proficiency && `(${l.proficiency})`}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATES */}
        {certs && certs.length > 0 && (
          <section className="text-center pt-1">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-1.5 text-center">
              Certificates
            </h2>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-zinc-700">
              {certs.map((c, idx) => (
                <span key={idx}>
                  • {c.name} ({c.issuer})
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
