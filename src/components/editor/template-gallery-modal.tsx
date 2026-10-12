"use client";

import React, { useState } from "react";
import { TEMPLATE_LIST } from "@/components/template";
import { getTemplatePreviewData } from "@/lib/default-resume-data";
import { X, Check, Sparkles, Search, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TemplateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
}

const CATEGORIES = [
  "All",
  "Modern",
  "Classic",
  "Creative",
  "Executive",
] as const;

export function TemplateGalleryModal({
  isOpen,
  onClose,
  selectedTemplateId,
  onSelectTemplate,
}: TemplateGalleryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  if (!isOpen) return null;

  const filteredTemplates = TEMPLATE_LIST.filter((tpl) => {
    const matchesCategory =
      selectedCategory === "All" || tpl.category === selectedCategory;
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 md:p-6 animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-[32px] shadow-2xl border border-gray-200/90 w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-[#181236] tracking-tight">
                Design Templates
              </h2>
              <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full">
                {TEMPLATE_LIST.length} Templates
              </span>
              <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full">
                ATS Ready
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Select a professional design. Your resume content and section layout update instantly.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Bar & Search */}
        <div className="px-8 py-3.5 bg-[#fafafc] border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 shrink-0">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {CATEGORIES.map((cat) => {
              const count =
                cat === "All"
                  ? TEMPLATE_LIST.length
                  : TEMPLATE_LIST.filter((t) => t.category === cat).length;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#181236] text-white shadow-xs"
                      : "bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Modal Body: Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#f5f6f9]">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTemplates.map((tpl) => {
              const isSelected = selectedTemplateId === tpl.id;
              const TplComponent = tpl.component;
              const previewData = getTemplatePreviewData(tpl.id);

              return (
                <div
                  key={tpl.id}
                  onClick={() => {
                    onSelectTemplate(tpl.id);
                  }}
                  className={`group rounded-2xl p-3 flex flex-col justify-between transition-all cursor-pointer relative ${
                    isSelected
                      ? "bg-white ring-2 ring-blue-600 shadow-lg border-2 border-blue-600"
                      : "bg-white hover:bg-white border border-gray-200/90 hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  {/* A4 Portrait Preview Container */}
                  <div className="w-full aspect-[210/297] rounded-xl bg-white border border-gray-200/80 overflow-hidden relative shadow-2xs group-hover:shadow-md transition-all">
                    <div
                      className="origin-top-left pointer-events-none select-none bg-white absolute top-0 left-0"
                      style={{
                        width: "210mm",
                        minHeight: "297mm",
                        transform: "scale(0.28)",
                        transformOrigin: "top left",
                      }}
                    >
                      <TplComponent data={previewData} />
                    </div>

                    {/* Active Selected Badge */}
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 z-10">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Active</span>
                      </div>
                    )}

                    {/* Hover Selection Overlay */}
                    <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-full bg-white font-bold text-xs text-[#181236] shadow-md hover:scale-105 transition-transform"
                      >
                        {isSelected ? "Currently Selected" : "Use Template"}
                      </button>
                    </div>
                  </div>

                  {/* Title & Category below Preview */}
                  <div className="pt-3 pb-1 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xs uppercase tracking-wider text-[#181236] group-hover:text-blue-600 transition-colors">
                        {tpl.name}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full uppercase">
                      {tpl.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-4 border-t border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Current Template:</span>
            <span className="text-xs font-bold text-[#181236] uppercase bg-gray-100 px-2.5 py-0.5 rounded-full">
              {TEMPLATE_LIST.find((t) => t.id === selectedTemplateId)?.name ||
                selectedTemplateId}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs h-9 px-5 rounded-full cursor-pointer"
            >
              Close
            </Button>
            <Button
              size="sm"
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold h-9 px-6 rounded-full shadow-xs cursor-pointer flex items-center gap-1.5"
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
