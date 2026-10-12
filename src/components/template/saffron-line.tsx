import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "./dynamic-contact-bar";
import { FormattedResumeText } from "./formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const SaffronLineTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, skills, certs, languages } = mergedData;
  const saffronColor = "#d97706"; // warm golden/saffron accent

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-zinc-800 p-8 flex flex-col justify-between font-sans text-[12px] leading-relaxed">
      {/* Top Header with Avatar, Name, and Saffron Details */}
      <header className="flex items-center gap-5 pb-5 border-b border-zinc-200">
        {/* Avatar */}
        <div className="shrink-0">
          {personalInfo.avatarUrl ? (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-full object-cover border-2 border-amber-500 shadow-xs"
            />
          ) : (
            <div className="w-18 h-18 rounded-full bg-amber-600 flex items-center justify-center font-bold text-xl text-white shadow-xs">
              {personalInfo.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
        </div>

        {/* Name and Meta */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 uppercase">
              {personalInfo.fullName}
            </h1>
            {personalInfo.headline && (
              <span className="text-xs font-semibold text-amber-700">
                {personalInfo.headline}
              </span>
            )}
          </div>

          <DynamicContactBar
            personalInfo={personalInfo}
            themeColor="#d97706"
            className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-600"
            itemClassName="flex items-center gap-1"
          />
        </div>
      </header>

      {/* 2-Column Split: Left Sidebar (4 cols) & Right Main (8 cols) */}
      <div className="grid grid-cols-12 gap-7 pt-4 flex-1">
        {/* Left Column: Summary, Skills, Languages, Certs */}
        <div className="col-span-4 space-y-4 border-r border-zinc-100 pr-5">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-amber-700 border-b border-amber-200 pb-1 mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                Summary
              </h2>
              <FormattedResumeText
                content={personalInfo.summary}
                className="text-zinc-600 text-justify text-[11px] leading-relaxed"
              />
            </section>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-amber-700 border-b border-amber-200 pb-1 mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                Skills
              </h2>
              <div className="space-y-1">
                {skills.flatMap((s) => s.skills).map((skill, idx) => (
                  <p key={idx} className="text-[11px] text-zinc-700 font-medium">
                    • {skill}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <section className="space-y-1">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-amber-700 border-b border-amber-200 pb-1 mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                Languages
              </h2>
              {languages.map((l, idx) => (
                <div key={idx} className="flex justify-between text-[11px] text-zinc-700">
                  <span className="font-medium">{l.name}</span>
                  <span className="text-zinc-500">{l.proficiency}</span>
                </div>
              ))}
            </section>
          )}

          {/* Certificates */}
          {certs && certs.length > 0 && (
            <section className="space-y-1">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-amber-700 border-b border-amber-200 pb-1 mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                Certificates
              </h2>
              {certs.map((c, idx) => (
                <div key={idx} className="text-[11px] text-zinc-700">
                  <p className="font-semibold text-zinc-900">{c.name}</p>
                  <p className="text-zinc-500 text-[10px]">{c.issuer}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column: Professional Experience & Education */}
        <div className="col-span-8 space-y-5">
          {/* Work Experience with Saffron Accents */}
          {experiences && experiences.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b-2 border-amber-500 pb-1 flex items-center justify-between">
                <span>Professional Experience</span>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              </h2>
              <div className="space-y-3.5">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between items-baseline font-bold text-zinc-950 text-xs">
                      <span>{exp.position}, <span className="font-semibold text-amber-700">{exp.company}</span></span>
                      <span className="text-[10px] text-zinc-500 font-normal">
                        {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                      </span>
                    </div>
                    {exp.location && (
                      <p className="text-[10px] text-zinc-500 italic">{exp.location}</p>
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

          {/* Education */}
          {educations && educations.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b-2 border-amber-500 pb-1 flex items-center justify-between">
                <span>Education</span>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              </h2>
              <div className="space-y-2">
                {educations.map((edu, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between items-baseline font-bold text-zinc-900 text-xs">
                      <span>{edu.degree}</span>
                      <span className="text-[10px] text-zinc-500 font-normal">{edu.startDate} – {edu.endDate}</span>
                    </div>
                    <p className="text-xs text-zinc-600 font-medium">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                    {edu.score && <p className="text-[11px] text-zinc-500">{edu.score}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
