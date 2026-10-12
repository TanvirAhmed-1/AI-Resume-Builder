import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "./dynamic-contact-bar";
import { FormattedResumeText } from "./formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const StockholmModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, projects, skills, certs, languages, themeColor } = mergedData;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-zinc-800 p-8 flex flex-col justify-between font-sans text-[12.5px] leading-relaxed">
      {/* Top Banner Header with Rounded Image & Name */}
      <header className="flex items-center justify-between border-b pb-6 mb-6 border-zinc-200">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
            {personalInfo.fullName}
          </h1>
          {personalInfo.headline && (
            <p className="text-sm font-semibold" style={{ color: themeColor }}>
              {personalInfo.headline}
            </p>
          )}

          <DynamicContactBar
            personalInfo={personalInfo}
            themeColor="#059669"
            className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-xs text-zinc-600"
            itemClassName="flex items-center gap-1.5"
          />
        </div>

        {/* Circular Avatar */}
        <div className="shrink-0 ml-4">
          {personalInfo.avatarUrl ? (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-full object-cover shadow-sm border border-zinc-200"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-sm"
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
      </header>

      {/* Body Content 2-Column Split */}
      <div className="grid grid-cols-12 gap-8 flex-1">
        {/* Left Column (Experience & Projects) */}
        <div className="col-span-7 space-y-5">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 text-zinc-900">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
                About Me
              </h2>
              <FormattedResumeText
                content={personalInfo.summary}
                className="text-zinc-600 leading-relaxed text-justify text-xs"
              />
            </section>
          )}

          {/* Work Experience */}
          {experiences && experiences.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-900">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
                Experience
              </h2>
              <div className="space-y-4 border-l-2 border-zinc-100 pl-3 ml-1">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="relative space-y-1">
                    <div
                      className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full border border-white"
                      style={{ backgroundColor: themeColor }}
                    />
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-zinc-900 text-[13px]">{exp.position}</h3>
                      <span className="text-xs text-zinc-400">
                        {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-zinc-600">{exp.company} {exp.location && `• ${exp.location}`}</p>
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
        </div>

        {/* Right Column (Skills, Education, Languages) */}
        <div className="col-span-5 space-y-5 border-l border-zinc-100 pl-6">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-900">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
                Core Skills
              </h2>
              <div className="space-y-3">
                {skills.map((grp, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <p className="text-xs font-semibold text-zinc-700">{grp.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {grp.skills.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] px-2 py-0.5 rounded font-medium border"
                          style={{
                            borderColor: `${themeColor}30`,
                            backgroundColor: `${themeColor}0a`,
                            color: themeColor,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {educations && educations.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-900">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
                Education
              </h2>
              <div className="space-y-3">
                {educations.map((edu, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <h3 className="font-bold text-zinc-900 text-xs">{edu.degree}</h3>
                    <p className="text-xs text-zinc-600">{edu.institution}</p>
                    <span className="text-[11px] text-zinc-400">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-900">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((l, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="font-medium text-zinc-800">{l.name}</span>
                    <span className="text-zinc-500">{l.proficiency}</span>
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
