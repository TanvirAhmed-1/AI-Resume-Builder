import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "./dynamic-contact-bar";
import { FormattedResumeText } from "./formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const MercuryFlowTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, projects, skills, certs, languages, themeColor } = mergedData;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-zinc-800 p-9 flex flex-col justify-between font-serif text-[12px] leading-relaxed">
      {/* Top Banner with Circle Profile Photo & Name */}
      <header className="flex items-center gap-6 pb-6 border-b border-zinc-200">
        {/* Circle Photo */}
        <div className="shrink-0">
          {personalInfo.avatarUrl ? (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-full object-cover shadow-sm border border-zinc-200"
            />
          ) : (
            <div
              className="w-18 h-18 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-sm"
              style={{ backgroundColor: themeColor }}
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

        {/* Name & Contact Info */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 uppercase">
            {personalInfo.fullName}
          </h1>
          {personalInfo.headline && (
            <p className="text-xs font-sans uppercase tracking-widest text-zinc-600 font-semibold">
              {personalInfo.headline}
            </p>
          )}

          <DynamicContactBar
            personalInfo={personalInfo}
            themeColor="#71717a"
            className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[11px] font-sans text-zinc-600"
            itemClassName="flex items-center gap-1"
          />
        </div>
      </header>

      {/* Main Body */}
      <div className="space-y-4 pt-4 flex-1">
        {/* Summary (Centered Box) */}
        {personalInfo.summary && (
          <section className="text-center px-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2 font-sans">
              Summary
            </h2>
            <FormattedResumeText
              content={personalInfo.summary}
              className="text-zinc-700 leading-relaxed max-w-2xl mx-auto italic text-center text-xs"
            />
          </section>
        )}

        {/* Professional Experience (Left Date, Right Details) */}
        {experiences && experiences.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2 font-sans text-center">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-4">
                  {/* Left Column: Dates & Location */}
                  <div className="col-span-3 text-right text-[11px] font-sans text-zinc-500 pt-0.5">
                    <p className="font-medium text-zinc-700">{exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}</p>
                    {exp.location && <p className="text-[10px] italic">{exp.location}</p>}
                  </div>

                  {/* Right Column: Title, Company, Description */}
                  <div className="col-span-9 space-y-0.5">
                    <h3 className="font-bold text-zinc-950 text-xs font-sans">
                      {exp.position} <span className="font-medium text-zinc-700">• {exp.company}</span>
                    </h3>
                    {exp.description && (
                      <FormattedResumeText
                        content={exp.description}
                        className="text-zinc-700 text-xs font-sans leading-relaxed mt-1"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education (Left Date, Right Degree) */}
        {educations && educations.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2 font-sans text-center">
              Education
            </h2>
            <div className="space-y-2">
              {educations.map((edu, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-right text-[11px] font-sans text-zinc-500">
                    <span>{edu.startDate} – {edu.endDate}</span>
                    {edu.location && <p className="text-[10px] italic">{edu.location}</p>}
                  </div>
                  <div className="col-span-9 font-sans text-xs">
                    <h3 className="font-bold text-zinc-950">{edu.degree}</h3>
                    <p className="text-zinc-600 italic">{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills with Minimalist Bullets */}
        {skills && skills.length > 0 && (
          <section className="text-center pt-1">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2 font-sans text-center">
              Skills
            </h2>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 font-sans text-xs text-zinc-700">
              {skills.flatMap((s) => s.skills).map((skill, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-zinc-500" />
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages with 5-dot ratings */}
        {languages && languages.length > 0 && (
          <section className="text-center pt-1">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2 font-sans text-center">
              Languages
            </h2>
            <div className="flex justify-center gap-8 font-sans text-xs text-zinc-700">
              {languages.map((l, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span>{l.name}</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${
                          i < 4 ? "bg-zinc-700" : "bg-zinc-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
