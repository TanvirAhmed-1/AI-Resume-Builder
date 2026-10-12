import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "@/components/template/dynamic-contact-bar";
import { FormattedResumeText } from "@/components/template/formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, projects, skills, themeColor } = mergedData;

  return (
    <div className="w-full h-full bg-white text-zinc-800 p-10 font-sans leading-relaxed text-[13px] flex flex-col justify-between">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-light tracking-tight text-zinc-900 mb-1">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        {personalInfo.headline && (
          <p className="text-sm text-zinc-500 font-normal mb-3">
            {personalInfo.headline}
          </p>
        )}

        <DynamicContactBar
          personalInfo={personalInfo}
          themeColor="#71717a"
          className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500"
        />
      </header>

      {/* Main Content */}
      <div className="space-y-6 flex-1">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">About</span>
            </div>
            <div className="col-span-9">
              <FormattedResumeText
                content={personalInfo.summary}
                className="text-zinc-600 leading-relaxed text-xs"
              />
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <section className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Experience</span>
            </div>
            <div className="col-span-9 space-y-4">
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-medium text-zinc-900 text-sm">{exp.position}</h3>
                    <span className="text-xs text-zinc-400">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-1">{exp.company} {exp.location && `• ${exp.location}`}</p>
                  {exp.description && (
                    <FormattedResumeText
                      content={exp.description}
                      className="text-zinc-600 text-xs leading-relaxed"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {educations && educations.length > 0 && (
          <section className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Education</span>
            </div>
            <div className="col-span-9 space-y-2">
              {educations.map((edu, idx) => (
                <div key={edu.id || idx} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-medium text-zinc-900 text-xs">{edu.degree}</h3>
                    <p className="text-xs text-zinc-500">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-zinc-400">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Skills</span>
            </div>
            <div className="col-span-9 space-y-1">
              {skills.map((grp, idx) => (
                <div key={grp.id || idx} className="text-xs">
                  <span className="font-medium text-zinc-700">{grp.category}: </span>
                  <span className="text-zinc-500">{grp.skills.join("  •  ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
