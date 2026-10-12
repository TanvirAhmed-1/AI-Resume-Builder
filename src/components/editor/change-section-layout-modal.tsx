"use client";

import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { Button } from "@/components/ui/button";
import {
  X,
  LayoutGrid,
  Columns2,
  Rows3,
  AlignLeft,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  GripVertical,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Languages,
  FileText,
  RotateCcw,
  Sparkles,
  Check,
} from "lucide-react";

interface ChangeSectionLayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  onUpdate: (updater: (prev: ResumeData) => ResumeData) => void;
  hiddenEntries: Record<string, boolean>;
  onToggleVisibility: (id: string) => void;
}

const SECTION_METADATA: Record<
  string,
  { label: string; icon: React.FC<{ className?: string }>; description: string }
> = {
  summary: {
    label: "Professional Summary",
    icon: FileText,
    description: "Introduction and executive summary statement",
  },
  experience: {
    label: "Work Experience",
    icon: Briefcase,
    description: "Employment history, roles, and accomplishments",
  },
  education: {
    label: "Education",
    icon: GraduationCap,
    description: "Degrees, institutions, and academic credentials",
  },
  projects: {
    label: "Key Projects",
    icon: FolderGit2,
    description: "Selected software and client portfolio projects",
  },
  skills: {
    label: "Skills & Expertise",
    icon: Wrench,
    description: "Technical, managerial, and operational skill groups",
  },
  certifications: {
    label: "Certifications",
    icon: Award,
    description: "Licenses, credentials, and certified courses",
  },
  languages: {
    label: "Languages",
    icon: Languages,
    description: "Spoken languages and fluency proficiencies",
  },
};

export function ChangeSectionLayoutModal({
  isOpen,
  onClose,
  resumeData,
  onUpdate,
  hiddenEntries,
  onToggleVisibility,
}: ChangeSectionLayoutModalProps) {
  if (!isOpen) return null;

  const currentOrder =
    resumeData.sectionOrder && resumeData.sectionOrder.length > 0
      ? resumeData.sectionOrder
      : [
          "summary",
          "experience",
          "education",
          "projects",
          "skills",
          "certifications",
          "languages",
        ];

  const currentLayout = resumeData.columnLayout || "right-sidebar";
  const sectionColumns = resumeData.sectionColumns || {};

  const moveSection = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= currentOrder.length) return;

    const updated = [...currentOrder];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);

    onUpdate((prev) => ({
      ...prev,
      sectionOrder: updated,
    }));
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

  const setLayoutPreset = (layout: "single" | "right-sidebar" | "left-sidebar" | "two-column") => {
    onUpdate((prev) => {
      let defaultCols: Record<string, "left" | "right" | "full"> = {};

      if (layout === "single") {
        defaultCols = {
          summary: "full",
          experience: "full",
          education: "full",
          projects: "full",
          skills: "full",
          certifications: "full",
          languages: "full",
        };
      } else if (layout === "left-sidebar") {
        defaultCols = {
          summary: "full",
          skills: "left",
          education: "left",
          certifications: "left",
          languages: "left",
          experience: "right",
          projects: "right",
        };
      } else if (layout === "two-column") {
        defaultCols = {
          summary: "full",
          experience: "left",
          education: "left",
          projects: "left",
          skills: "right",
          certifications: "right",
          languages: "right",
        };
      } else {
        // right-sidebar
        defaultCols = {
          summary: "full",
          experience: "left",
          education: "left",
          projects: "left",
          skills: "right",
          certifications: "right",
          languages: "right",
        };
      }

      return {
        ...prev,
        columnLayout: layout,
        sectionColumns: defaultCols,
      };
    });
  };

  const applyOrderPreset = (order: string[]) => {
    onUpdate((prev) => ({
      ...prev,
      sectionOrder: order,
    }));
  };

  const resetToDefaultLayout = () => {
    onUpdate((prev) => ({
      ...prev,
      columnLayout: "right-sidebar",
      sectionOrder: [
        "summary",
        "experience",
        "education",
        "projects",
        "skills",
        "certifications",
        "languages",
      ],
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
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/80 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                Change Section Layout
                <span className="text-[10px] font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  FlowCV Layout System
                </span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Reorder resume sections and customize single vs. multi-column placement.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-gray-50/50">
          {/* Section 1: Page Column Structure Presets */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-800 block">
              1. Page Column Structure
            </label>
            <div className="grid grid-cols-4 gap-3">
              {/* Single Column */}
              <button
                type="button"
                onClick={() => setLayoutPreset("single")}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                  currentLayout === "single"
                    ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-xs"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-2xs"
                }`}
              >
                <div className="w-full h-14 bg-gray-100 rounded-lg p-1.5 flex flex-col justify-between mb-2">
                  <div className="w-full h-2 bg-blue-500/30 rounded" />
                  <div className="w-full h-2 bg-gray-300 rounded" />
                  <div className="w-full h-2 bg-gray-300 rounded" />
                  <div className="w-full h-2 bg-gray-300 rounded" />
                </div>
                <span className="text-xs font-bold text-gray-900">Single Column</span>
                <span className="text-[10px] text-gray-500 mt-0.5">Linear Full Width</span>
              </button>

              {/* Right Sidebar (65% / 35%) */}
              <button
                type="button"
                onClick={() => setLayoutPreset("right-sidebar")}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                  currentLayout === "right-sidebar"
                    ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-xs"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-2xs"
                }`}
              >
                <div className="w-full h-14 bg-gray-100 rounded-lg p-1.5 flex gap-1.5 mb-2">
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="w-full h-2 bg-blue-500/30 rounded" />
                    <div className="w-full h-2 bg-gray-300 rounded" />
                    <div className="w-full h-2 bg-gray-300 rounded" />
                  </div>
                  <div className="w-1/3 bg-gray-200 rounded p-1 flex flex-col justify-between">
                    <div className="w-full h-1.5 bg-gray-400 rounded" />
                    <div className="w-full h-1.5 bg-gray-400 rounded" />
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-900">Right Sidebar</span>
                <span className="text-[10px] text-gray-500 mt-0.5">65% Main / 35% Side</span>
              </button>

              {/* Left Sidebar (35% / 65%) */}
              <button
                type="button"
                onClick={() => setLayoutPreset("left-sidebar")}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                  currentLayout === "left-sidebar"
                    ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-xs"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-2xs"
                }`}
              >
                <div className="w-full h-14 bg-gray-100 rounded-lg p-1.5 flex gap-1.5 mb-2">
                  <div className="w-1/3 bg-gray-200 rounded p-1 flex flex-col justify-between">
                    <div className="w-full h-1.5 bg-gray-400 rounded" />
                    <div className="w-full h-1.5 bg-gray-400 rounded" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="w-full h-2 bg-blue-500/30 rounded" />
                    <div className="w-full h-2 bg-gray-300 rounded" />
                    <div className="w-full h-2 bg-gray-300 rounded" />
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-900">Left Sidebar</span>
                <span className="text-[10px] text-gray-500 mt-0.5">35% Side / 65% Main</span>
              </button>

              {/* 2 Equal Columns */}
              <button
                type="button"
                onClick={() => setLayoutPreset("two-column")}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                  currentLayout === "two-column"
                    ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-xs"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-2xs"
                }`}
              >
                <div className="w-full h-14 bg-gray-100 rounded-lg p-1.5 flex gap-1.5 mb-2">
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="w-full h-2 bg-blue-500/30 rounded" />
                    <div className="w-full h-2 bg-gray-300 rounded" />
                    <div className="w-full h-2 bg-gray-300 rounded" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="w-full h-2 bg-gray-300 rounded" />
                    <div className="w-full h-2 bg-gray-300 rounded" />
                    <div className="w-full h-2 bg-gray-300 rounded" />
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-900">2 Columns</span>
                <span className="text-[10px] text-gray-500 mt-0.5">50% / 50% Balanced</span>
              </button>
            </div>
          </div>

          {/* Section 2: Reorder Presets */}
          <div className="space-y-2 p-3 bg-white rounded-2xl border border-gray-200/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Quick Reorder Presets
              </span>
              <button
                onClick={resetToDefaultLayout}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Layout
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() =>
                  applyOrderPreset([
                    "summary",
                    "experience",
                    "education",
                    "projects",
                    "skills",
                    "certifications",
                    "languages",
                  ])
                }
                className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
              >
                Standard Flow
              </button>
              <button
                onClick={() =>
                  applyOrderPreset([
                    "experience",
                    "projects",
                    "skills",
                    "education",
                    "summary",
                    "certifications",
                    "languages",
                  ])
                }
                className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
              >
                Experience First
              </button>
              <button
                onClick={() =>
                  applyOrderPreset([
                    "skills",
                    "projects",
                    "experience",
                    "education",
                    "summary",
                    "certifications",
                    "languages",
                  ])
                }
                className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
              >
                Tech & Skills First
              </button>
              <button
                onClick={() =>
                  applyOrderPreset([
                    "education",
                    "projects",
                    "experience",
                    "skills",
                    "certifications",
                    "languages",
                    "summary",
                  ])
                }
                className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
              >
                New Graduate / Academic
              </button>
            </div>
          </div>

          {/* Section 3: Interactive Section Order & Column Assignment */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-800 block">
                2. Section Order & Column Assignment
              </label>
              <span className="text-[11px] text-gray-500">
                Use arrows to reorder, choose column placement
              </span>
            </div>

            <div className="space-y-2">
              {currentOrder.map((sectionKey, index) => {
                const meta = SECTION_METADATA[sectionKey] || {
                  label: sectionKey,
                  icon: FileText,
                  description: "",
                };
                const IconComponent = meta.icon;
                const isHidden = hiddenEntries[sectionKey];
                const currentCol =
                  sectionColumns[sectionKey] ||
                  (sectionKey === "summary"
                    ? "full"
                    : ["experience", "projects", "education"].includes(sectionKey)
                    ? "left"
                    : "right");

                return (
                  <div
                    key={sectionKey}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                      isHidden
                        ? "bg-gray-50/60 border-gray-200 opacity-60"
                        : "bg-white border-gray-200 hover:border-gray-300 shadow-2xs"
                    }`}
                  >
                    {/* Left: Reorder Arrows + Section Info */}
                    <div className="flex items-center gap-3">
                      {/* Up/Down Reorder Buttons */}
                      <div className="flex flex-col gap-0.5">
                        <button
                          type="button"
                          onClick={() => moveSection(index, "up")}
                          disabled={index === 0}
                          className="w-5 h-5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent flex items-center justify-center text-gray-600 cursor-pointer"
                          title="Move section up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection(index, "down")}
                          disabled={index === currentOrder.length - 1}
                          className="w-5 h-5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent flex items-center justify-center text-gray-600 cursor-pointer"
                          title="Move section down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center">
                        <IconComponent className="w-4 h-4" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-xs text-gray-900">{meta.label}</p>
                          <span className="text-[10px] text-gray-400 font-mono">
                            #{index + 1}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500 line-clamp-1">
                          {meta.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Column Selector + Visibility Toggle */}
                    <div className="flex items-center gap-2">
                      {currentLayout !== "single" && (
                        <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-[10px] font-semibold">
                          <button
                            type="button"
                            onClick={() => setColumnPlacement(sectionKey, "left")}
                            className={`px-2 py-1 rounded cursor-pointer transition-all ${
                              currentCol === "left"
                                ? "bg-white text-gray-900 shadow-2xs font-bold"
                                : "text-gray-500 hover:text-gray-900"
                            }`}
                          >
                            Left
                          </button>
                          <button
                            type="button"
                            onClick={() => setColumnPlacement(sectionKey, "right")}
                            className={`px-2 py-1 rounded cursor-pointer transition-all ${
                              currentCol === "right"
                                ? "bg-white text-gray-900 shadow-2xs font-bold"
                                : "text-gray-500 hover:text-gray-900"
                            }`}
                          >
                            Right
                          </button>
                          <button
                            type="button"
                            onClick={() => setColumnPlacement(sectionKey, "full")}
                            className={`px-2 py-1 rounded cursor-pointer transition-all ${
                              currentCol === "full"
                                ? "bg-white text-gray-900 shadow-2xs font-bold"
                                : "text-gray-500 hover:text-gray-900"
                            }`}
                          >
                            Full
                          </button>
                        </div>
                      )}

                      {/* Visibility Toggle Button */}
                      <button
                        type="button"
                        onClick={() => onToggleVisibility(sectionKey)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                          isHidden
                            ? "bg-gray-100 text-gray-400 hover:text-gray-600"
                            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
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
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white shrink-0">
          <p className="text-xs text-gray-500">
            Changes apply to your live CV preview in real-time.
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs h-9 px-4 rounded-xl cursor-pointer"
            >
              Close
            </Button>
            <Button
              size="sm"
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-9 px-5 rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
