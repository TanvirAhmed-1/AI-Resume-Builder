import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { Award, Briefcase, GraduationCap, Wrench } from "lucide-react";
import { mergeWithDefaultData } from "@/lib/default-resume-data";
import { DynamicContactBar } from "./dynamic-contact-bar";
import { FormattedResumeText } from "./formatted-text";

interface TemplateProps {
  data: ResumeData;
}

export const AtlanticBlueTemplate: React.FC<TemplateProps> = ({ data }) => {
  const mergedData = mergeWithDefaultData(data);
  const { personalInfo, experiences, educations, projects, skills, certs, languages } = mergedData;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-zinc-800 grid grid-cols-12 text-[12px] font-sans leading-relaxed">
      {/* Atlantic Deep Blue Left Sidebar (4 cols) */}
      <aside className="col-span-4 bg-[#1e2f42] text-white p-7 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Header & Title */}
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white uppercase leading-tight">
              {personalInfo.fullName}
            </h1>
            {personalInfo.headline && (
              <p className="text-xs text-blue-200/90 font-medium mt-1">
                {personalInfo.headline}
              </p>
            )}
          </div>

          {/* Candidate Avatar / Photo */}
          <div className="flex justify-center my-3">
            {personalInfo.avatarUrl ? (
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="w-24 h-24 rounded-full object-cover border-2 border-white/20 shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-800 border-2 border-white/20 flex items-center justify-center font-bold text-2xl text-white shadow-sm">
                {personalInfo.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}
          </div>

          {/* Contact Details */}
          <DynamicContactBar
            personalInfo={personalInfo}
            themeColor="#93c5fd"
            className="space-y-2 text-[11px] text-zinc-300"
            itemClassName="flex items-center gap-2"
          />

          {/* Profile Overview */}
          {personalInfo.summary && (
            <div className="space-y-1.5 pt-3 border-t border-blue-900/60">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Profile
              </h2>
              <FormattedResumeText
                content={personalInfo.summary}
                className="text-[11px] text-zinc-300 leading-relaxed text-justify"
              />
            </div>
          )}

          {/* Languages with 5-dot ratings */}
          {languages && languages.length > 0 && (
            <div className="space-y-1.5 pt-3 border-t border-blue-900/60">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((l, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] text-zinc-300">
                    <span>{l.name}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            i < 4 ? "bg-blue-400" : "bg-blue-900"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards & Certs */}
          {certs && certs.length > 0 && (
            <div className="space-y-1.5 pt-3 border-t border-blue-900/60">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                <Award className="w-3 h-3 text-blue-300" /> Awards & Honors
              </h2>
              <div className="space-y-1">
                {certs.map((c, idx) => (
                  <div key={idx} className="text-[11px] text-zinc-300">
                    <p className="font-semibold text-white">{c.name}</p>
                    <p className="text-zinc-400 text-[10px]">{c.issuer} {c.issueDate && `• ${c.issueDate}`}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Right Section (8 cols) */}
      <main className="col-span-8 p-8 flex flex-col space-y-6">
        {/* Work Experience with Icons */}
        {experiences && experiences.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2 border-b pb-1.5 border-zinc-200">
              <Briefcase className="w-3.5 h-3.5 text-[#1e2f42]" />
              Work Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline font-bold text-zinc-950 text-xs">
                    <span>{exp.position}</span>
                    <span className="text-[10px] text-zinc-500 font-normal">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-zinc-700">{exp.company} {exp.location && `• ${exp.location}`}</p>
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

        {/* Education with Icons */}
        {educations && educations.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2 border-b pb-1.5 border-zinc-200">
              <GraduationCap className="w-3.5 h-3.5 text-[#1e2f42]" />
              Education
            </h2>
            <div className="space-y-3">
              {educations.map((edu, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-zinc-900 text-xs">{edu.degree}</h3>
                    <span className="text-[10px] text-zinc-500">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <p className="text-xs text-zinc-600">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                  {edu.score && <p className="text-[11px] text-zinc-500">{edu.score}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills with Bullet Points */}
        {skills && skills.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2 border-b pb-1.5 border-zinc-200">
              <Wrench className="w-3.5 h-3.5 text-[#1e2f42]" />
              Key Competencies
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              {skills.flatMap((s) => s.skills).map((skill, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-zinc-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e2f42] shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
