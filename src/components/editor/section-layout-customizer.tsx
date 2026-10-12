"use client";

import React, { useState } from "react";
import { ResumeData } from "@/lib/validations/resume";
import { ChevronUp, ChevronDown, Eye, EyeOff } from "lucide-react";

interface SectionLayoutCustomizerProps {
  resumeData: ResumeData;
  onUpdate: (updater: (prev: ResumeData) => ResumeData) => void;
  hiddenEntries: Record<string, boolean>;
  onToggleVisibility: (id: string) => void;
  onEditPersonalDetails?: () => void;
}

// 1. Exact 6-dot grip handle (2 columns of 3 dots)
function SixDotGrip({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-[3px] text-[#a4a8b5] shrink-0 ${className}`}>
      <div className="flex flex-col gap-[3px]">
        <span className="w-[3px] h-[3px] rounded-full bg-[#a4a8b5]" />
        <span className="w-[3px] h-[3px] rounded-full bg-[#a4a8b5]" />
        <span className="w-[3px] h-[3px] rounded-full bg-[#a4a8b5]" />
      </div>
      <div className="flex flex-col gap-[3px]">
        <span className="w-[3px] h-[3px] rounded-full bg-[#a4a8b5]" />
        <span className="w-[3px] h-[3px] rounded-full bg-[#a4a8b5]" />
        <span className="w-[3px] h-[3px] rounded-full bg-[#a4a8b5]" />
      </div>
    </div>
  );
}

// 2. Personal Details Icon (Person outline with 3 lines to the right)
function PersonalDetailsIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 19.5v-1a3.5 3.5 0 0 0-3.5-3.5h-5a3.5 3.5 0 0 0-3.5 3.5v1" />
      <circle cx="8.5" cy="8.5" r="3.5" />
      <line x1="16" y1="9" x2="21.5" y2="9" />
      <line x1="16" y1="13.5" x2="21.5" y2="13.5" />
      <line x1="16" y1="18" x2="20.5" y2="18" />
    </svg>
  );
}

// 3. Professional Summary Icon (ID badge with silhouette and lines)
function SummaryBadgeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <circle cx="8" cy="10" r="2.5" fill="#f4f5f8" />
      <path
        d="M4.5 16.5c0-1.8 1.8-2.5 3.5-2.5s3.5.7 3.5 2.5"
        stroke="#f4f5f8"
        strokeWidth="1.5"
        fill="none"
      />
      <rect x="13.5" y="8.5" width="5.5" height="2" rx="1" fill="#f4f5f8" />
      <rect x="13.5" y="12.5" width="5.5" height="2" rx="1" fill="#f4f5f8" />
    </svg>
  );
}

// 4. Professional Experience Icon (Filled Briefcase)
function BriefcaseFilledIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 6h-4V4.5C16 3.67 15.33 3 14.5 3h-5C8.67 3 8 3.67 8 4.5V6H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10-1.5c0-.28.22-.5.5-.5h5c.28 0 .5.22.5.5V6h-6V4.5z" />
    </svg>
  );
}

// 5. Technical Skills Icon (Head profile with brain / gear)
function TechnicalSkillsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 3.84 2.16 7.18 5.36 8.86.37.19.64.53.64.95v.19H16v-.19c0-.42.27-.76.64-.95C19.84 19.18 22 15.84 22 12c0-5.52-4.48-10-10-10zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-4h2v4zm0-6h-2V7h2v4z" />
    </svg>
  );
}

// 6. Education & Training Icon (Graduation Cap)
function EducationCapIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 8.5L5.5 8 12 4.5 18.5 8 12 11.5zM6 13.5v4c0 2.5 3 4.5 6 4.5s6-2 6-4.5v-4L12 17l-6-3.5z" />
    </svg>
  );
}

// 7. Professional Projects Icon (Filled Folder)
function FolderProjectsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
    </svg>
  );
}

// 8. Certificates Icon (Award badge)
function AwardIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.5 13L17 22l-5-3-5 3 1.5-9" />
    </svg>
  );
}

// 9. Languages Icon (Globe / speech)
function LanguagesIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

// 10. Page Break Icon (Document with dashed divider line in center)
function PageBreakIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v4h2V5h14v4h2V5c0-1.1-.9-2-2-2zm0 14v2H5v-2H3v2c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h-2zm-16-5h4v2H3v-2zm7 0h4v2h-4v-2zm7 0h4v2h-4v-2z" />
    </svg>
  );
}

const SECTION_METADATA: Record<
  string,
  { label: string; icon: React.FC<{ className?: string }> }
> = {
  summary: {
    label: "Professional Summary",
    icon: SummaryBadgeIcon,
  },
  experience: {
    label: "Professional Experience",
    icon: BriefcaseFilledIcon,
  },
  skills: {
    label: "Technical Skills",
    icon: TechnicalSkillsIcon,
  },
  education: {
    label: "Education & Training",
    icon: EducationCapIcon,
  },
  projects: {
    label: "Professional Projects",
    icon: FolderProjectsIcon,
  },
  certifications: {
    label: "Certificates",
    icon: AwardIcon,
  },
  languages: {
    label: "Languages",
    icon: LanguagesIcon,
  },
};

export function SectionLayoutCustomizer({
  resumeData,
  onUpdate,
  hiddenEntries,
  onToggleVisibility,
  onEditPersonalDetails,
}: SectionLayoutCustomizerProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hasPageBreak, setHasPageBreak] = useState<boolean>(false);

  const currentOrder =
    resumeData.sectionOrder && resumeData.sectionOrder.length > 0
      ? resumeData.sectionOrder
      : [
          "summary",
          "experience",
          "skills",
          "education",
          "projects",
          "certifications",
          "languages",
        ];

  const columnLayout = resumeData.columnLayout || "single";
  const sectionColumns = resumeData.sectionColumns || {};

  // Map columnLayout to presets: "One" | "Two" | "Mix"
  const currentPreset: "one" | "two" | "mix" =
    columnLayout === "two-column"
      ? "two"
      : columnLayout === "right-sidebar" || columnLayout === "left-sidebar"
      ? "mix"
      : "one";

  const handleSelectColumns = (preset: "one" | "two" | "mix") => {
    if (preset === "one") {
      onUpdate((prev) => ({
        ...prev,
        columnLayout: "single",
        sectionColumns: {
          summary: "full",
          experience: "full",
          education: "full",
          projects: "full",
          skills: "full",
          certifications: "full",
          languages: "full",
        },
      }));
    } else if (preset === "two") {
      onUpdate((prev) => ({
        ...prev,
        columnLayout: "two-column",
        sectionColumns: {
          summary: "full",
          experience: "left",
          education: "left",
          projects: "left",
          skills: "right",
          certifications: "right",
          languages: "right",
        },
      }));
    } else {
      // Mix: 65% Main / 35% Sidebar
      onUpdate((prev) => ({
        ...prev,
        columnLayout: "right-sidebar",
        sectionColumns: {
          summary: "full",
          experience: "left",
          education: "left",
          projects: "left",
          skills: "right",
          certifications: "right",
          languages: "right",
        },
      }));
    }
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentOrder.length) return;

    const updated = [...currentOrder];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    onUpdate((prev) => ({
      ...prev,
      sectionOrder: updated,
    }));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const updated = [...currentOrder];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, moved);

    setDraggedIndex(null);
    onUpdate((prev) => ({
      ...prev,
      sectionOrder: updated,
    }));
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const setColumnPlacement = (sectionKey: string, col: "left" | "right" | "full") => {
    onUpdate((prev) => ({
      ...prev,
      sectionColumns: {
        ...(prev.sectionColumns || {}),
        [sectionKey]: col,
      },
    }));
  };

  return (
    <div className="w-full bg-white rounded-[32px] p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-black/[0.04] font-sans select-none">
      {/* 1. Header: "Layout" matching screenshot */}
      <h1 className="text-[22px] font-bold text-[#181236] tracking-tight mb-5">
        Layout
      </h1>

      {/* 2. Subsection: Columns */}
      <div className="mb-6">
        <h2 className="text-[14px] font-bold text-[#181236] mb-3">
          Columns
        </h2>

        {/* 3 Column Presets: One, Two, Mix (Matching Screenshot) */}
        <div className="grid grid-cols-3 gap-3">
          {/* Preset 1: One */}
          <button
            type="button"
            onClick={() => handleSelectColumns("one")}
            className="group flex flex-col items-center cursor-pointer text-center"
          >
            <div
              className={`w-full h-[76px] rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all p-3 ${
                currentPreset === "one"
                  ? "bg-[#eeebfd] border-2 border-[#714efe] shadow-xs"
                  : "bg-white border border-[#e2e4ea] hover:border-gray-400"
              }`}
            >
              <div
                className={`w-11 h-[6px] rounded-full ${
                  currentPreset === "one" ? "bg-[#714efe]" : "bg-[#bcc0cb]"
                }`}
              />
              <div
                className={`w-11 h-[6px] rounded-full ${
                  currentPreset === "one" ? "bg-[#714efe]" : "bg-[#bcc0cb]"
                }`}
              />
              <div
                className={`w-11 h-[6px] rounded-full ${
                  currentPreset === "one" ? "bg-[#714efe]" : "bg-[#bcc0cb]"
                }`}
              />
            </div>
            <span
              className={`text-[12px] font-semibold mt-2 ${
                currentPreset === "one" ? "text-[#181236]" : "text-[#8e92a2]"
              }`}
            >
              One
            </span>
          </button>

          {/* Preset 2: Two */}
          <button
            type="button"
            onClick={() => handleSelectColumns("two")}
            className="group flex flex-col items-center cursor-pointer text-center"
          >
            <div
              className={`w-full h-[76px] rounded-2xl flex items-center justify-center gap-2 transition-all p-3 ${
                currentPreset === "two"
                  ? "bg-[#eeebfd] border-2 border-[#714efe] shadow-xs"
                  : "bg-white border border-[#e2e4ea] hover:border-gray-400"
              }`}
            >
              {/* Left Column Bars */}
              <div className="flex flex-col gap-1.5">
                <div
                  className={`w-5 h-[6px] rounded-full ${
                    currentPreset === "two" ? "bg-[#714efe]" : "bg-[#bcc0cb]"
                  }`}
                />
                <div
                  className={`w-5 h-[6px] rounded-full ${
                    currentPreset === "two" ? "bg-[#714efe]" : "bg-[#bcc0cb]"
                  }`}
                />
                <div
                  className={`w-5 h-[6px] rounded-full ${
                    currentPreset === "two" ? "bg-[#714efe]" : "bg-[#bcc0cb]"
                  }`}
                />
              </div>
              {/* Right Column Bars */}
              <div className="flex flex-col gap-1.5">
                <div
                  className={`w-5 h-[6px] rounded-full ${
                    currentPreset === "two" ? "bg-[#714efe]" : "bg-[#bcc0cb]"
                  }`}
                />
                <div
                  className={`w-5 h-[6px] rounded-full ${
                    currentPreset === "two" ? "bg-[#714efe]" : "bg-[#bcc0cb]"
                  }`}
                />
                <div
                  className={`w-5 h-[6px] rounded-full ${
                    currentPreset === "two" ? "bg-[#714efe]" : "bg-[#bcc0cb]"
                  }`}
                />
              </div>
            </div>
            <span
              className={`text-[12px] font-semibold mt-2 ${
                currentPreset === "two" ? "text-[#181236]" : "text-[#8e92a2]"
              }`}
            >
              Two
            </span>
          </button>

          {/* Preset 3: Mix */}
          <button
            type="button"
            onClick={() => handleSelectColumns("mix")}
            className="group flex flex-col items-center cursor-pointer text-center"
          >
            <div
              className={`w-full h-[76px] rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all p-3 ${
                currentPreset === "mix"
                  ? "bg-[#eeebfd] border-2 border-[#714efe] shadow-xs"
                  : "bg-white border border-[#e2e4ea] hover:border-gray-400"
              }`}
            >
              {/* Row 1: Left and right equal */}
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-5.5 h-[6px] rounded-full ${
                    currentPreset === "mix" ? "bg-[#714efe]" : "bg-[#bcc0cb]"
                  }`}
                />
                <div
                  className={`w-5.5 h-[6px] rounded-full ${
                    currentPreset === "mix" ? "bg-[#714efe]" : "bg-[#bcc0cb]"
                  }`}
                />
              </div>
              {/* Row 2: Left wide, Right small */}
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-7.5 h-[6px] rounded-full ${
                    currentPreset === "mix" ? "bg-[#714efe]" : "bg-[#bcc0cb]"
                  }`}
                />
                <div
                  className={`w-3.5 h-[6px] rounded-full ${
                    currentPreset === "mix" ? "bg-[#714efe]" : "bg-[#bcc0cb]"
                  }`}
                />
              </div>
              {/* Row 3: Left wide, Right small */}
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-7.5 h-[6px] rounded-full ${
                    currentPreset === "mix" ? "bg-[#714efe]" : "bg-[#bcc0cb]"
                  }`}
                />
                <div
                  className={`w-3.5 h-[6px] rounded-full ${
                    currentPreset === "mix" ? "bg-[#714efe]" : "bg-[#bcc0cb]"
                  }`}
                />
              </div>
            </div>
            <span
              className={`text-[12px] font-semibold mt-2 ${
                currentPreset === "mix" ? "text-[#181236]" : "text-[#8e92a2]"
              }`}
            >
              Mix
            </span>
          </button>
        </div>
      </div>

      {/* 3. Subsection: Change Section Layout */}
      <div className="space-y-3">
        <h2 className="text-[14px] font-bold text-[#181236]">
          Change Section Layout
        </h2>

        {/* Top Centered Card: Personal Details (Matching Screenshot) */}
        <div
          onClick={onEditPersonalDetails}
          className="w-full bg-[#f4f5f8] hover:bg-[#eaecf1] rounded-2xl py-7 px-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all border border-transparent hover:border-gray-300 group"
          title="Click to edit Personal Details"
        >
          <div className="text-[#181236] group-hover:scale-105 transition-transform">
            <PersonalDetailsIcon className="w-8 h-8" />
          </div>
          <span className="text-[14px] font-bold text-[#181236] tracking-tight">
            Personal Details
          </span>
        </div>

        {/* Reorderable Section Items List (Matching Screenshot) */}
        <div className="space-y-2">
          {currentOrder.map((sectionKey, index) => {
            const meta = SECTION_METADATA[sectionKey] || {
              label: sectionKey,
              icon: SummaryBadgeIcon,
            };
            const IconComponent = meta.icon;
            const isHidden = !!hiddenEntries[sectionKey];
            const currentCol =
              sectionColumns[sectionKey] ||
              (sectionKey === "summary"
                ? "full"
                : ["experience", "projects", "education"].includes(sectionKey)
                ? "left"
                : "right");

            const isDragging = draggedIndex === index;

            return (
              <div
                key={sectionKey}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`w-full rounded-xl px-4 py-3.5 flex items-center justify-between transition-all select-none group ${
                  isDragging
                    ? "opacity-40 bg-purple-100 border-2 border-dashed border-purple-400 scale-[0.99]"
                    : isHidden
                    ? "bg-[#f4f5f8]/60 opacity-60"
                    : "bg-[#f4f5f8] hover:bg-[#eaecf1]"
                }`}
              >
                {/* Left: 6-dot grip handle + Dark Icon + Title */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  {/* 6-dot grip handle */}
                  <div
                    className="cursor-grab active:cursor-grabbing hover:opacity-80 transition-opacity"
                    title="Drag to reorder"
                  >
                    <SixDotGrip />
                  </div>

                  {/* Section Dark Navy Icon */}
                  <div className="text-[#181236] shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Section Title */}
                  <span className="text-[14px] font-bold text-[#181236] tracking-tight truncate">
                    {meta.label}
                  </span>
                </div>

                {/* Right: Quick Controls (Move Up/Down, Column Pills, Eye) */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Subtle Up/Down buttons for easy clicking */}
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => moveSection(index, "up")}
                      disabled={index === 0}
                      className="w-6 h-6 rounded-md hover:bg-white disabled:opacity-20 flex items-center justify-center text-gray-700 cursor-pointer shadow-2xs"
                      title="Move up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSection(index, "down")}
                      disabled={index === currentOrder.length - 1}
                      className="w-6 h-6 rounded-md hover:bg-white disabled:opacity-20 flex items-center justify-center text-gray-700 cursor-pointer shadow-2xs"
                      title="Move down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Column switcher pill for Two or Mix */}
                  {currentPreset !== "one" && (
                    <div className="hidden group-hover:flex items-center bg-white/95 p-0.5 rounded-lg text-[9px] font-bold shadow-2xs border border-gray-200">
                      <button
                        type="button"
                        onClick={() => setColumnPlacement(sectionKey, "left")}
                        className={`px-1.5 py-0.5 rounded cursor-pointer ${
                          currentCol === "left"
                            ? "bg-[#181236] text-white"
                            : "text-gray-500 hover:text-gray-900"
                        }`}
                        title="Left Column"
                      >
                        L
                      </button>
                      <button
                        type="button"
                        onClick={() => setColumnPlacement(sectionKey, "right")}
                        className={`px-1.5 py-0.5 rounded cursor-pointer ${
                          currentCol === "right"
                            ? "bg-[#181236] text-white"
                            : "text-gray-500 hover:text-gray-900"
                        }`}
                        title="Right Column"
                      >
                        R
                      </button>
                      <button
                        type="button"
                        onClick={() => setColumnPlacement(sectionKey, "full")}
                        className={`px-1.5 py-0.5 rounded cursor-pointer ${
                          currentCol === "full"
                            ? "bg-[#181236] text-white"
                            : "text-gray-500 hover:text-gray-900"
                        }`}
                        title="Full Width"
                      >
                        F
                      </button>
                    </div>
                  )}

                  {/* Eye Visibility Toggle */}
                  <button
                    type="button"
                    onClick={() => onToggleVisibility(sectionKey)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                      isHidden
                        ? "text-gray-400 hover:text-gray-600 bg-gray-200/50"
                        : "text-[#181236] hover:bg-white shadow-2xs"
                    }`}
                    title={isHidden ? "Show section" : "Hide section"}
                  >
                    {isHidden ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Bottom Dashed Box: Page break (Matching Screenshot) */}
        <div
          onClick={() => setHasPageBreak(!hasPageBreak)}
          className={`w-full rounded-xl px-4 py-3.5 flex items-center justify-between border border-dashed transition-all cursor-pointer ${
            hasPageBreak
              ? "border-[#714efe] bg-[#eeebfd]/40"
              : "border-[#c4c7d0] hover:border-gray-400 bg-white"
          }`}
          title="Toggle page break separator"
        >
          <div className="flex items-center gap-3.5">
            <div className="cursor-grab">
              <SixDotGrip />
            </div>
            <div className="text-[#181236] shrink-0">
              <PageBreakIcon className="w-5 h-5" />
            </div>
            <span className="text-[14px] font-bold text-[#181236] tracking-tight">
              Page break
            </span>
          </div>

          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              hasPageBreak
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {hasPageBreak ? "Active" : "Optional"}
          </span>
        </div>
      </div>
    </div>
  );
}
