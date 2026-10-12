"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ResumeData } from "@/lib/validations/resume";
import { ResumeRenderer } from "@/components/resume-templates/resume-renderer";
import { TEMPLATE_LIST, cleanHtmlOrMarkdown } from "@/components/template";
import { DEFAULT_RESUME_DATA, getTemplatePreviewData } from "@/lib/default-resume-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Palette,
  CheckCircle2,
  Download,
  Plus,
  Trash2,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Languages as LanguagesIcon,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Undo2,
  Redo2,
  Mail,
  Phone,
  MapPin,
  Camera,
  Pencil,
  IdCard,
  GripVertical,
  Globe,
  Link2,
  Check,
  X,
  LayoutGrid,
  Bold,
  Italic,
  Underline,
  List,
  Lightbulb,
} from "lucide-react";
import { ChangeSectionLayoutModal } from "./change-section-layout-modal";
import { SectionLayoutCustomizer } from "./section-layout-customizer";
import { TemplateGalleryModal } from "./template-gallery-modal";
import { PersonalDetailsEditor } from "./personal-details-editor";

function SixDotGrip({ className = "w-2.5 h-4 text-gray-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 16" fill="currentColor" className={className}>
      <circle cx="2.5" cy="2.5" r="1.3" />
      <circle cx="7.5" cy="2.5" r="1.3" />
      <circle cx="2.5" cy="8" r="1.3" />
      <circle cx="7.5" cy="8" r="1.3" />
      <circle cx="2.5" cy="13.5" r="1.3" />
      <circle cx="7.5" cy="13.5" r="1.3" />
    </svg>
  );
}

function FlowCVIdBadgeIcon({ className = "w-5 h-5 text-[#181236]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M3 5a3 3 0 013-3h12a3 3 0 013 3v14a3 3 0 01-3 3H6a3 3 0 01-3-3V5zm5 3a2 2 0 100 4 2 2 0 000-4zm-2.5 7a2.5 2.5 0 015 0v.5h-5V15zm8.5-6a1 1 0 000 2h3a1 1 0 100-2h-3zm0 4a1 1 0 100 2h3a1 1 0 100-2h-3z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FlowCVRobotIcon({ className = "w-5 h-5 text-[#5b50e6]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v3" />
      <circle cx="12" cy="2" r="0.75" fill="currentColor" />
      <path d="M2.5 10v4" />
      <path d="M21.5 10v4" />
      <rect x="4.5" y="5.5" width="15" height="15" rx="4" />
      <circle cx="9" cy="11.5" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="15" cy="11.5" r="1.25" fill="currentColor" stroke="none" />
      <path d="M9.5 15.5c1 1 4 1 5 0" />
    </svg>
  );
}

function AlignLeftBars({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M2 3h12M2 7h8M2 11h12M2 15h6" />
    </svg>
  );
}

function AlignCenterBars({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M2 3h12M4 7h8M2 11h12M5 15h6" />
    </svg>
  );
}

function AlignRightBars({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M2 3h12M6 7h8M2 11h12M8 15h6" />
    </svg>
  );
}

function AlignJustifyBars({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M2 3h12M2 7h12M2 11h12M2 15h12" />
    </svg>
  );
}

interface RichTextEditorBoxProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  minHeight?: string;
}

function RichTextEditorBox({
  value,
  onChange,
  placeholder = "Write details...",
  className = "",
  minHeight = "min-h-[100px]",
}: RichTextEditorBoxProps) {
  const [alignment, setAlignment] = useState<"left" | "center" | "right" | "justify">("left");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isList, setIsList] = useState(false);
  const [isEmpty, setIsEmpty] = useState(!value || !value.trim());

  const editorRef = useRef<HTMLDivElement>(null);
  const lastHtmlRef = useRef<string>("");

  const updateToolbarStates = useCallback(() => {
    try {
      setIsBold(document.queryCommandState("bold"));
      setIsItalic(document.queryCommandState("italic"));
      setIsUnderline(document.queryCommandState("underline"));
      setIsList(document.queryCommandState("insertUnorderedList"));
      if (document.queryCommandState("justifyCenter")) setAlignment("center");
      else if (document.queryCommandState("justifyRight")) setAlignment("right");
      else if (document.queryCommandState("justifyFull")) setAlignment("justify");
      else setAlignment("left");
    } catch {
      // ignore in environments without queryCommandState
    }
  }, []);

  // Initialize and synchronize with external value changes
  useEffect(() => {
    if (!editorRef.current) return;
    if (value !== lastHtmlRef.current) {
      const cleaned = cleanHtmlOrMarkdown(value || "");
      if (editorRef.current.innerHTML !== cleaned && editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = cleaned;
      }
      lastHtmlRef.current = value || "";
      const text = editorRef.current.innerText || "";
      setIsEmpty(!text.trim() && !editorRef.current.innerHTML.includes("<img"));
    }
  }, [value]);

  const handleInput = () => {
    if (!editorRef.current) return;
    let html = editorRef.current.innerHTML;
    const text = editorRef.current.innerText || "";
    const empty = !text.trim() && !html.includes("<img") && !html.includes("<hr");
    setIsEmpty(empty);
    const finalVal = empty ? "" : html;
    lastHtmlRef.current = finalVal;
    onChange(finalVal);
    updateToolbarStates();
  };

  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const linkModalRef = useRef<HTMLDivElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);
  const savedRangeRef = useRef<Range | null>(null);

  useEffect(() => {
    if (!isLinkModalOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (linkModalRef.current && !linkModalRef.current.contains(e.target as Node)) {
        setIsLinkModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLinkModalOpen]);

  const exec = (command: string, val: string | undefined = undefined) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, val);
    handleInput();
  };

  const handleBold = () => exec("bold");
  const handleItalic = () => exec("italic");
  const handleUnderline = () => exec("underline");
  const handleBullet = () => exec("insertUnorderedList");

  const handleLinkClick = () => {
    if (isLinkModalOpen) {
      setIsLinkModalOpen(false);
      return;
    }
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
      // Pre-fill existing link URL if inside an anchor tag
      let node: Node | null = sel.anchorNode;
      let existingUrl = "";
      while (node && node !== editorRef.current) {
        if (node.nodeName === "A") {
          existingUrl = (node as HTMLAnchorElement).getAttribute("href") || "";
          break;
        }
        node = node.parentNode;
      }
      setLinkUrl(existingUrl);
    } else if (editorRef.current) {
      editorRef.current.focus();
      const newSel = window.getSelection();
      if (newSel && newSel.rangeCount > 0) {
        savedRangeRef.current = newSel.getRangeAt(0).cloneRange();
      }
      setLinkUrl("");
    } else {
      savedRangeRef.current = null;
      setLinkUrl("");
    }
    setIsLinkModalOpen(true);
    setTimeout(() => {
      linkInputRef.current?.focus();
      linkInputRef.current?.select();
    }, 50);
  };

  const applyLink = () => {
    let url = linkUrl.trim();
    if (!url) {
      if (savedRangeRef.current && window.getSelection) {
        const sel = window.getSelection();
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(savedRangeRef.current);
          document.execCommand("unlink", false);
          handleInput();
        }
      }
      setIsLinkModalOpen(false);
      return;
    }

    if (
      !/^https?:\/\//i.test(url) &&
      !url.startsWith("mailto:") &&
      !url.startsWith("tel:") &&
      !url.startsWith("#")
    ) {
      url = "https://" + url;
    }

    if (savedRangeRef.current && window.getSelection) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedRangeRef.current);
      }
    }

    const sel = window.getSelection();
    const isCollapsed = !sel || sel.isCollapsed;

    if (isCollapsed) {
      document.execCommand(
        "insertHTML",
        false,
        `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">${linkUrl.trim()}</a>`
      );
    } else {
      document.execCommand("createLink", false, url);
    }

    handleInput();
    setIsLinkModalOpen(false);
    setLinkUrl("");
    savedRangeRef.current = null;
  };

  const handleAlign = (dir: "left" | "center" | "right" | "justify") => {
    setAlignment(dir);
    if (dir === "left") exec("justifyLeft");
    else if (dir === "center") exec("justifyCenter");
    else if (dir === "right") exec("justifyRight");
    else if (dir === "justify") exec("justifyFull");
  };

  return (
    <div
      className={`bg-[#f8f9fb] border border-gray-200/80 rounded-2xl overflow-hidden focus-within:border-purple-300 focus-within:ring-2 focus-within:ring-purple-100/50 transition-all relative ${className}`}
    >
      {/* Formatting Toolbar matching 2nd image */}
      <div className="px-3.5 py-2.5 border-b border-gray-200/60 flex items-center gap-1.5 flex-wrap bg-white/50 select-none">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            handleBold();
          }}
          className={`w-7 h-7 rounded-md flex items-center justify-center font-bold text-[14px] transition-colors cursor-pointer ${
            isBold ? "bg-[#5b50e6] text-white shadow-xs" : "text-gray-800 hover:bg-gray-200/70"
          }`}
          title="Bold (Ctrl+B)"
        >
          B
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            handleItalic();
          }}
          className={`w-7 h-7 rounded-md flex items-center justify-center font-serif italic text-[14px] transition-colors cursor-pointer ${
            isItalic ? "bg-[#5b50e6] text-white shadow-xs" : "text-gray-800 hover:bg-gray-200/70"
          }`}
          title="Italic (Ctrl+I)"
        >
          I
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            handleUnderline();
          }}
          className={`w-7 h-7 rounded-md flex items-center justify-center underline text-[14px] font-medium transition-colors cursor-pointer ${
            isUnderline ? "bg-[#5b50e6] text-white shadow-xs" : "text-gray-800 hover:bg-gray-200/70"
          }`}
          title="Underline (Ctrl+U)"
        >
          U
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            handleBullet();
          }}
          className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
            isList ? "bg-[#5b50e6] text-white shadow-xs" : "text-gray-800 hover:bg-gray-200/70"
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            handleLinkClick();
          }}
          className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
            isLinkModalOpen
              ? "bg-[#5b50e6] text-white shadow-xs"
              : "text-gray-800 hover:bg-gray-200/70"
          }`}
          title="Add Link"
        >
          <Link2 className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        {/* Alignment Buttons */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            handleAlign("left");
          }}
          className={`w-7 h-7 rounded-md flex items-center justify-center transition-all cursor-pointer ${
            alignment === "left"
              ? "bg-[#5b50e6] text-white shadow-xs"
              : "text-gray-800 hover:bg-gray-200/70"
          }`}
          title="Align Left"
        >
          <AlignLeftBars className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            handleAlign("center");
          }}
          className={`w-7 h-7 rounded-md flex items-center justify-center transition-all cursor-pointer ${
            alignment === "center"
              ? "bg-[#5b50e6] text-white shadow-xs"
              : "text-gray-800 hover:bg-gray-200/70"
          }`}
          title="Align Center"
        >
          <AlignCenterBars className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            handleAlign("right");
          }}
          className={`w-7 h-7 rounded-md flex items-center justify-center transition-all cursor-pointer ${
            alignment === "right"
              ? "bg-[#5b50e6] text-white shadow-xs"
              : "text-gray-800 hover:bg-gray-200/70"
          }`}
          title="Align Right"
        >
          <AlignRightBars className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            handleAlign("justify");
          }}
          className={`w-7 h-7 rounded-md flex items-center justify-center transition-all cursor-pointer ${
            alignment === "justify"
              ? "bg-[#5b50e6] text-white shadow-xs"
              : "text-gray-800 hover:bg-gray-200/70"
          }`}
          title="Align Justify"
        >
          <AlignJustifyBars className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* WYSIWYG Editable Box */}
      <div
        className="p-3.5 relative cursor-text min-h-[100px]"
        onClick={() => {
          if (editorRef.current && document.activeElement !== editorRef.current && !isLinkModalOpen) {
            editorRef.current.focus();
          }
        }}
      >
        {/* Floating Link Modal matching red box in user screenshot */}
        {isLinkModalOpen && (
          <div className="absolute inset-0 z-30 flex items-center justify-center p-3 pointer-events-none">
            <div
              ref={linkModalRef}
              className="pointer-events-auto bg-white border border-[#5b50e6] rounded-2xl shadow-xl p-1.5 flex items-center gap-2 max-w-[340px] w-full animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5b50e6] flex items-center justify-center shrink-0">
                <Link2 className="w-4 h-4 text-[#5b50e6]" />
              </div>
              <input
                ref={linkInputRef}
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    applyLink();
                  } else if (e.key === "Escape") {
                    setIsLinkModalOpen(false);
                  }
                }}
                placeholder="Enter Link"
                className="flex-1 bg-[#f4f5f8] rounded-xl px-3 py-1.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
                autoFocus
              />
              <button
                type="button"
                onClick={applyLink}
                className="w-8 h-8 rounded-xl bg-[#5b50e6] hover:bg-[#4b40dc] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-xs"
                title="Apply Link"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {isEmpty && !isLinkModalOpen && (
          <div className="absolute top-3.5 left-3.5 text-gray-400 pointer-events-none select-none text-[13.5px] leading-relaxed">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onBlur={handleInput}
          onKeyUp={updateToolbarStates}
          onMouseUp={updateToolbarStates}
          onSelect={updateToolbarStates}
          className={`flowcv-wysiwyg-content w-full bg-transparent border-0 focus:outline-none text-[13.5px] leading-relaxed text-[#181236] ${minHeight} max-h-[300px] overflow-y-auto ${
            alignment === "center"
              ? "text-center"
              : alignment === "right"
              ? "text-right"
              : alignment === "justify"
              ? "text-justify"
              : "text-left"
          }`}
        />
      </div>
    </div>
  );
}

interface FlowCVEditorProps {
  initialData: ResumeData;
}

export function FlowCVEditor({ initialData }: FlowCVEditorProps) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [activeTab, setActiveTab] = useState<"content" | "customization">("content");
  const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  
  // Accordion open/collapse states - summary open, others collapsed as in screenshot
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    summary: true,
    experience: false,
    education: false,
    skills: false,
    projects: false,
    certs: false,
    languages: false,
  });

  // Track which entry is currently being edited inline
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);

  // Edit drawer state for Personal Info (pink floating button)
  const [editPersonal, setEditPersonal] = useState(false);

  // Editable section headings (defaults match FlowCV screenshot)
  const [sectionHeadings, setSectionHeadings] = useState<Record<string, string>>({
    summary: "Professional Summary",
    experience: "Professional Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    certs: "Certificates",
    languages: "Languages",
  });
  const [editingHeadingSection, setEditingHeadingSection] = useState<string | null>(null);

  // Visibility toggle map for hiding entries from resume preview
  const [hiddenEntries, setHiddenEntries] = useState<Record<string, boolean>>({});

  // FlowCV summary editor states
  const [summaryAlignment, setSummaryAlignment] = useState<"left" | "center" | "right" | "justify">("left");
  const [showSummaryTips, setShowSummaryTips] = useState<boolean>(false);
  const summaryTextareaRef = useRef<HTMLTextAreaElement>(null);

  const applySummaryFormatting = (format: "bold" | "italic" | "underline" | "bullet" | "link") => {
    const textarea = summaryTextareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selection = text.substring(start, end);

    let replacement = "";
    if (format === "bold") {
      replacement = selection ? `**${selection}**` : `**bold text**`;
    } else if (format === "italic") {
      replacement = selection ? `*${selection}*` : `*italic text*`;
    } else if (format === "underline") {
      replacement = selection ? `<u>${selection}</u>` : `<u>underlined text</u>`;
    } else if (format === "bullet") {
      replacement = selection ? `• ${selection}` : `• Bullet point`;
    } else if (format === "link") {
      replacement = selection ? `[${selection}](https://)` : `[link text](https://)`;
    }

    const newText = text.substring(0, start) + replacement + text.substring(end);
    handleUpdate((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, summary: newText },
    }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 0);
  };

  const [zoom, setZoom] = useState<number>(0.85);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving">("saved");

  // FlowCV palette options
  const colorOptions = [
    { name: "Ocean Blue", hex: "#2563eb" },
    { name: "Emerald", hex: "#059669" },
    { name: "Slate Navy", hex: "#1e293b" },
    { name: "Burgundy", hex: "#991b1b" },
    { name: "Violet", hex: "#7c3aed" },
    { name: "Graphite", hex: "#374151" },
    { name: "Amber Saffron", hex: "#d97706" },
    { name: "Rose Ruby", hex: "#e11d48" },
  ];

  const fontOptions = [
    { name: "Inter", category: "Modern Sans", sample: "Aa Bb Cc" },
    { name: "Roboto", category: "Clean Sans", sample: "Aa Bb Cc" },
    { name: "Outfit", category: "Geometric Sans", sample: "Aa Bb Cc" },
    { name: "Plus Jakarta Sans", category: "Contemporary Sans", sample: "Aa Bb Cc" },
    { name: "Merriweather", category: "Classic Serif", sample: "Aa Bb Cc" },
    { name: "Lora", category: "Editorial Serif", sample: "Aa Bb Cc" },
    { name: "Playfair Display", category: "Executive Serif", sample: "Aa Bb Cc" },
  ];

  const toggleSection = (sec: string) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const toggleEntryVisibility = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHiddenEntries((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleUpdate = (updater: (prev: ResumeData) => ResumeData) => {
    setSaveStatus("saving");
    setResumeData((prev) => {
      const next = updater(prev);
      return next;
    });
    setTimeout(() => {
      setSaveStatus("saved");
    }, 350);
  };

  const handlePrint = () => {
    window.print();
  };

  // Filtered resumeData passed to renderer with hidden entries stripped
  const displayedResumeData: ResumeData = {
    ...resumeData,
    personalInfo: {
      ...resumeData.personalInfo,
      summary: hiddenEntries["summary"] ? "" : resumeData.personalInfo.summary,
    },
    experiences: hiddenEntries["experience"] ? [] : resumeData.experiences.filter((exp, idx) => !hiddenEntries[exp.id || `exp_${idx}`]),
    educations: hiddenEntries["education"] ? [] : resumeData.educations.filter((edu, idx) => !hiddenEntries[edu.id || `edu_${idx}`]),
    projects: hiddenEntries["projects"] ? [] : resumeData.projects.filter((p, idx) => !hiddenEntries[p.id || `proj_${idx}`]),
    skills: hiddenEntries["skills"] ? [] : resumeData.skills.filter((s, idx) => !hiddenEntries[s.id || `skill_${idx}`]),
    certs: hiddenEntries["certifications"] ? [] : resumeData.certs.filter((c, idx) => !hiddenEntries[c.id || `cert_${idx}`]),
    languages: hiddenEntries["languages"] ? [] : resumeData.languages.filter((l, idx) => !hiddenEntries[l.id || `lang_${idx}`]),
    sectionOrder: (resumeData.sectionOrder && resumeData.sectionOrder.length > 0
      ? resumeData.sectionOrder
      : [
          "summary",
          "experience",
          "education",
          "projects",
          "skills",
          "certifications",
          "languages",
        ]
    ).filter((key) => !hiddenEntries[key]),
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#edebe7] font-sans select-none">
      {/* Top FlowCV-style Navigation Header */}
      <header className="h-14 bg-white border-b border-[#e2dfd9] px-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-xs">
              CV
            </div>
            <span className="font-bold text-gray-900 tracking-tight text-lg">FlowCV</span>
            <Badge variant="secondary" className="text-[10px] bg-gray-100 text-gray-600 ml-1">
              PRO
            </Badge>
          </div>

          {/* Center Tabs: Content vs Customization */}
          <div className="flex items-center bg-[#f3f2ee] p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("content")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "content"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Content
            </button>
            <button
              onClick={() => setActiveTab("customization")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "customization"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Customization
            </button>
          </div>
        </div>

        {/* Right Action Tools: Undo, Redo, Save Status, Export */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mr-2">
            {saveStatus === "saving" ? (
              <span className="flex items-center gap-1 text-blue-600 font-medium animate-pulse">
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Saved
              </span>
            )}
          </div>

          <div className="flex items-center border-r border-gray-200 pr-3 mr-1 gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Redo2 className="w-4 h-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={() => {
              handleUpdate((prev) => ({
                ...DEFAULT_RESUME_DATA,
                templateId: prev.templateId,
                themeColor: prev.themeColor,
                fontFamily: prev.fontFamily,
              }));
            }}
            className="h-8 px-3 text-xs font-semibold rounded-xl border-blue-200 bg-blue-50/70 text-blue-700 hover:bg-blue-100 hover:text-blue-850 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Populate CV with complete default sample data"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Load Default Data</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => setIsLayoutModalOpen(true)}
            className="h-8 px-3 text-xs font-semibold rounded-xl border-purple-200 bg-purple-50/70 text-purple-700 hover:bg-purple-100 hover:text-purple-850 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Change section layout, reorder sections, and adjust columns"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-purple-600" />
            <span>Change Section Layout</span>
          </Button>

          <Button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs h-9 px-4 rounded-xl flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </Button>
        </div>
      </header>

      {/* Main Workspace (Left Form Panel + Right Live Interactive Preview) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Form / Settings Panel (matching screenshot design) */}
        <div className="w-[520px] bg-[#edebe7] border-r border-[#dedad3] flex flex-col shrink-0 z-10 overflow-hidden">
          {activeTab === "content" ? (
            /* FlowCV Card Accordion Workflow (Matching Screenshot exactly) */
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* 1. Profile Card / Personal Details (Expands downwards inline when editing) */}
              <div className="relative rounded-[22px] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.03] transition-all">
                {!editPersonal ? (
                  <>
                    {/* Floating Edit Icon Top-Right (bright pink circle button) */}
                    <button
                      onClick={() => setEditPersonal(true)}
                      className="absolute right-6 top-6 w-8 h-8 rounded-full bg-[#f03d6d] hover:bg-[#e02b5d] text-white flex items-center justify-center shadow-xs cursor-pointer transition-transform hover:scale-105 active:scale-95"
                      title="Edit Profile"
                    >
                      <Pencil className="w-4 h-4 text-white" />
                    </button>

                    <div className="flex justify-between items-start pr-10">
                      <div className="space-y-1">
                        <h2 className="text-[22px] font-bold tracking-tight text-gray-900 leading-tight">
                          {resumeData.personalInfo.fullName || "Your Name"}
                        </h2>
                        <p className="text-[14px] font-normal text-gray-500">
                          {resumeData.personalInfo.headline || "Job Title / Headline"}
                        </p>

                        <div className="space-y-2.5 pt-4 text-[13px] text-gray-700">
                          {resumeData.personalInfo.email && (
                            <div className="flex items-center gap-3">
                              <Mail className="w-4 h-4 text-gray-800 shrink-0 stroke-[1.75]" />
                              <span className="font-normal">{resumeData.personalInfo.email}</span>
                            </div>
                          )}
                          {resumeData.personalInfo.phone && (
                            <div className="flex items-center gap-3">
                              <Phone className="w-4 h-4 text-gray-800 shrink-0 stroke-[1.75]" />
                              <span className="font-normal">{resumeData.personalInfo.phone}</span>
                            </div>
                          )}
                          {resumeData.personalInfo.location && (
                            <div className="flex items-center gap-3">
                              <MapPin className="w-4 h-4 text-gray-800 shrink-0 stroke-[1.75]" />
                              <span className="font-normal">{resumeData.personalInfo.location}</span>
                            </div>
                          )}
                          {resumeData.personalInfo.linkedin && (
                            <div className="flex items-center gap-3">
                              <Link2 className="w-4 h-4 text-gray-800 shrink-0 stroke-[1.75]" />
                              <span className="font-normal">{resumeData.personalInfo.linkedin}</span>
                            </div>
                          )}
                          {resumeData.personalInfo.website && (
                            <div className="flex items-center gap-3">
                              <Globe className="w-4 h-4 text-gray-800 shrink-0 stroke-[1.75]" />
                              <span className="font-normal">{resumeData.personalInfo.website}</span>
                            </div>
                          )}

                          {/* Extra added fields badges */}
                          {(() => {
                            const info = resumeData.personalInfo as Record<string, any>;
                            const extraFields = Object.keys(info).filter(
                              (k) =>
                                ![
                                  "fullName",
                                  "headline",
                                  "avatarUrl",
                                  "summary",
                                  "fieldsOrder",
                                  "customFields",
                                  "email",
                                  "phone",
                                  "location",
                                  "linkedin",
                                  "website",
                                ].includes(k) &&
                                !k.endsWith("Url") &&
                                typeof info[k] === "string" &&
                                info[k].trim() !== ""
                            );

                            if (extraFields.length === 0) return null;

                            return (
                              <div className="flex flex-wrap gap-1.5 pt-1.5">
                                {extraFields.map((k) => (
                                  <span
                                    key={k}
                                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[11px] font-medium"
                                  >
                                    <span className="capitalize">{k}:</span> {info[k]}
                                  </span>
                                ))}
                              </div>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Circular Photo placeholder */}
                      <div
                        onClick={() => setEditPersonal(true)}
                        className="shrink-0 flex items-center justify-center w-24 h-24 rounded-full bg-[#f0f0f4] border border-gray-100 text-gray-400 cursor-pointer hover:opacity-90 transition-opacity ml-4 overflow-hidden relative group"
                        title="Click to edit profile"
                      >
                        {resumeData.personalInfo.avatarUrl ? (
                          <img
                            src={resumeData.personalInfo.avatarUrl}
                            alt="Avatar"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <Camera className="w-9 h-9 text-gray-300 group-hover:text-gray-400 transition-colors" />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div>
                        <h2 className="text-[18px] font-bold text-[#181236]">
                          Personal Details
                        </h2>
                        <p className="text-xs text-gray-500">
                          Edit contact info, links, and personal details
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditPersonal(false)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                        title="Collapse"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <PersonalDetailsEditor
                      resumeData={resumeData}
                      onUpdate={handleUpdate}
                      onDone={() => setEditPersonal(false)}
                    />
                  </div>
                )}
              </div>

              {/* 2. Professional Summary Section (Matching FlowCV Screenshots exactly) */}
              {editingEntryId === "summary_entry" ? (
                <div className="space-y-4">
                  {/* Card 1: Edit Entry view (Screenshot 2) */}
                  <div className="rounded-[22px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.03] p-6 transition-all">
                    {/* Top Header: Edit Entry + Actions */}
                    <div className="flex items-center justify-between pb-3">
                      <h2 className="text-[22px] font-bold text-[#181236] tracking-tight">
                        Edit Entry
                      </h2>

                      <div className="flex items-center gap-2">
                        {/* Get Tips */}
                        <button
                          type="button"
                          onClick={() => setShowSummaryTips((prev) => !prev)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-gray-50 text-[13px] font-semibold text-[#181236] transition-colors cursor-pointer"
                        >
                          <Lightbulb className="w-4 h-4 text-[#181236]" />
                          <span>Get Tips</span>
                        </button>

                        {/* Eye Button */}
                        <button
                          type="button"
                          onClick={(e) => toggleEntryVisibility("summary", e)}
                          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                            hiddenEntries["summary"]
                              ? "bg-gray-100 border-gray-200 text-gray-400"
                              : "bg-[#f8f9fa] border-gray-100 text-[#181236] hover:bg-gray-100"
                          }`}
                          title={hiddenEntries["summary"] ? "Show entry on CV" : "Hide entry from CV"}
                        >
                          {hiddenEntries["summary"] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>

                        {/* Trash Button */}
                        <button
                          type="button"
                          onClick={() => {
                            handleUpdate((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, summary: "" },
                            }));
                          }}
                          className="w-9 h-9 rounded-xl bg-[#f8f9fa] border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-colors cursor-pointer"
                          title="Delete summary"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Tips Banner */}
                    {showSummaryTips && (
                      <div className="mb-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 space-y-1.5 animate-in fade-in">
                        <div className="flex items-center justify-between font-bold text-amber-900">
                          <span className="flex items-center gap-1.5">
                            <Lightbulb className="w-4 h-4 text-amber-600" /> Tips for Professional Summary
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowSummaryTips(false)}
                            className="text-amber-600 hover:text-amber-800 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-amber-800 leading-relaxed font-normal">
                          • Keep it between 2 to 4 concise sentences.
                        </p>
                        <p className="text-amber-800 leading-relaxed font-normal">
                          • Lead with your target job title, total experience, and primary stack.
                        </p>
                        <p className="text-amber-800 leading-relaxed font-normal">
                          • Highlight 1 or 2 measurable accomplishments (e.g., boosted speed by 40%).
                        </p>
                      </div>
                    )}

                    {/* Field Label: Professional Summary */}
                    <div className="mb-2">
                      <label className="text-[14px] font-bold text-[#181236]">
                        {sectionHeadings.summary || "Professional Summary"}
                      </label>
                    </div>

                    <RichTextEditorBox
                      value={resumeData.personalInfo.summary || ""}
                      onChange={(val) =>
                        handleUpdate((prev) => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, summary: val },
                        }))
                      }
                      placeholder="Full Stack Developer experienced in building SaaS, ERP, and e-commerce applications using React.js, Next.js, TypeScript, Node.js..."
                      rows={5}
                      minHeight="min-h-[130px]"
                    />
                  </div>

                  {/* Card 2: Centered Vibrant Pink Done Button */}
                  <div className="rounded-[22px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.03] p-4 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setEditingEntryId(null)}
                      className="inline-flex items-center justify-center gap-2 px-14 py-3 rounded-2xl bg-[#ff3b6c] hover:bg-[#f4285e] text-white text-[15px] font-bold shadow-lg shadow-pink-500/25 transition-all cursor-pointer active:scale-98"
                    >
                      <Check className="w-5 h-5 stroke-[2.5]" />
                      <span>Done</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Screenshot 1 view (Overview card) */
                <div className="rounded-[22px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.03] overflow-hidden transition-all">
                  {/* Header Row */}
                  <div
                    className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/40 transition-colors"
                    onClick={() => toggleSection("summary")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center text-[#181236] shrink-0">
                        <FlowCVIdBadgeIcon className="w-5 h-5 text-[#181236]" />
                      </div>

                      {editingHeadingSection === "summary" ? (
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <Input
                            value={sectionHeadings.summary}
                            onChange={(e) =>
                              setSectionHeadings((prev) => ({ ...prev, summary: e.target.value }))
                            }
                            className="h-7 text-xs font-bold w-44 rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setEditingHeadingSection(null)}
                            className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <h3 className="font-bold text-[17px] text-[#181236] tracking-tight">
                          {sectionHeadings.summary}
                        </h3>
                      )}

                      {/* Edit Heading pill button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingHeadingSection(
                            editingHeadingSection === "summary" ? null : "summary"
                          );
                        }}
                        className="ml-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200/60 bg-[#f4f4f7] hover:bg-[#ececf0] text-[12px] font-semibold text-[#181236] transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5 text-[#181236]" />
                        <span>Edit Heading</span>
                      </button>
                    </div>

                    <div className="p-1 text-[#181236]">
                      {openSections.summary ? (
                        <ChevronUp className="w-4 h-4 text-[#181236]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#181236]" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {openSections.summary && (
                    <>
                      {/* Entry List Row matching Screenshot 1 */}
                      <div className="border-t border-gray-100 px-6 py-4 bg-white flex items-center justify-between gap-4">
                        <div
                          className="flex items-center gap-3.5 flex-1 overflow-hidden cursor-pointer group"
                          onClick={() => setEditingEntryId("summary_entry")}
                        >
                          <SixDotGrip className="w-2.5 h-4 text-gray-400 shrink-0 cursor-grab" />
                          <p
                            className={`text-[13px] line-clamp-2 leading-relaxed flex-1 group-hover:text-black transition-colors ${
                              hiddenEntries["summary"]
                                ? "line-through text-gray-400 italic"
                                : "text-gray-700"
                            }`}
                          >
                            {resumeData.personalInfo.summary ||
                              "Full Stack Developer experienced in building SaaS, ERP, and e-commerce applications using React.js, Next.js, TypeScript, Node.js, Prisma ORM, and PostgreSQL. Skilled in REST APIs, multi-tenant architecture, RBAC, database transactions, caching, SSR, and technical SEO."}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => toggleEntryVisibility("summary", e)}
                          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                            hiddenEntries["summary"]
                              ? "bg-gray-100 border-gray-200 text-gray-400"
                              : "bg-[#f8f9fa] border-gray-100 text-gray-600 hover:text-black hover:bg-gray-100"
                          }`}
                          title={hiddenEntries["summary"] ? "Show entry on CV" : "Hide entry from CV"}
                        >
                          {hiddenEntries["summary"] ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Add Entry & Trash Footer matching Screenshot 1 */}
                      <div className="border-t border-gray-100 px-6 py-3.5 bg-white flex items-center justify-between">
                        <div className="flex-1 flex justify-center">
                          <button
                            type="button"
                            onClick={() => setEditingEntryId("summary_entry")}
                            className="inline-flex items-center gap-1.5 px-6 py-2 rounded-xl border border-gray-200/90 bg-white text-[13px] font-bold text-[#181236] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-2xs cursor-pointer"
                          >
                            <Plus className="w-4 h-4 text-[#181236] stroke-[2.5]" />
                            <span>Add Entry</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleUpdate((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, summary: "" },
                            }))
                          }
                          className="w-9 h-9 rounded-xl bg-[#f8f9fa] border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-colors shrink-0 cursor-pointer"
                          title="Delete entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* 3. Professional Experience Card (Collapsible, matching screenshot) */}
              <div className="rounded-[22px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.03] overflow-hidden transition-all">
                <div
                  className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/40 transition-colors"
                  onClick={() => toggleSection("experience")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center text-gray-900 shrink-0">
                      <Briefcase className="w-5 h-5 text-gray-900" strokeWidth={1.75} />
                    </div>

                    {editingHeadingSection === "experience" ? (
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <Input
                          value={sectionHeadings.experience}
                          onChange={(e) =>
                            setSectionHeadings((prev) => ({ ...prev, experience: e.target.value }))
                          }
                          className="h-7 text-xs font-bold w-44 rounded-lg"
                        />
                        <button
                          onClick={() => setEditingHeadingSection(null)}
                          className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <h3 className="font-bold text-[16px] text-gray-900 tracking-tight">
                        {sectionHeadings.experience}
                      </h3>
                    )}

                    {openSections.experience && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingHeadingSection(
                            editingHeadingSection === "experience" ? null : "experience"
                          );
                        }}
                        className="ml-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 bg-white text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Pencil className="w-3 h-3 text-gray-600" />
                        <span>Edit Heading</span>
                      </button>
                    )}
                  </div>

                  <div className="p-1 text-gray-500">
                    {openSections.experience ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* Expanded Experience Entries */}
                {openSections.experience && (
                  <>
                    <div className="border-t border-gray-100 divide-y divide-gray-100">
                      {resumeData.experiences.map((exp, idx) => {
                        const entryKey = exp.id || `exp_${idx}`;
                        const isHidden = hiddenEntries[entryKey];
                        const isEditing = editingEntryId === entryKey;

                        return (
                          <div key={entryKey} className="bg-white">
                            <div className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                              <div
                                className="flex items-center gap-3 flex-1 overflow-hidden cursor-pointer"
                                onClick={() => setEditingEntryId(isEditing ? null : entryKey)}
                              >
                                <GripVertical className="w-4 h-4 text-gray-400 shrink-0 cursor-grab" />
                                <div className="truncate flex-1">
                                  <p className={`text-[13px] font-semibold truncate ${isHidden ? "line-through text-gray-400" : "text-gray-900"}`}>
                                    {exp.position}{" "}
                                    <span className="font-normal text-gray-500">at {exp.company}</span>
                                  </p>
                                  <p className="text-[11px] text-gray-400">
                                    {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  onClick={(e) => toggleEntryVisibility(entryKey, e)}
                                  className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                                    isHidden
                                      ? "bg-gray-100 border-gray-200 text-gray-400"
                                      : "bg-[#f8f9fa] border-gray-200/80 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                  }`}
                                  title={isHidden ? "Show entry" : "Hide entry"}
                                >
                                  {isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                <button
                                  onClick={() =>
                                    handleUpdate((prev) => ({
                                      ...prev,
                                      experiences: prev.experiences.filter((_, i) => i !== idx),
                                    }))
                                  }
                                  className="w-8 h-8 rounded-lg bg-[#f8f9fa] border border-gray-200/80 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                                  title="Delete item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Inline Form if active */}
                            {isEditing && (
                              <div className="px-6 py-4 bg-[#faf9f7] border-t border-gray-100 space-y-3 animate-in fade-in">
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">Company</label>
                                    <Input
                                      value={exp.company}
                                      onChange={(e) =>
                                        handleUpdate((prev) => {
                                          const next = [...prev.experiences];
                                          next[idx].company = e.target.value;
                                          return { ...prev, experiences: next };
                                        })
                                      }
                                      className="rounded-xl text-xs h-9 bg-white"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">Position</label>
                                    <Input
                                      value={exp.position}
                                      onChange={(e) =>
                                        handleUpdate((prev) => {
                                          const next = [...prev.experiences];
                                          next[idx].position = e.target.value;
                                          return { ...prev, experiences: next };
                                        })
                                      }
                                      className="rounded-xl text-xs h-9 bg-white"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">Start Date</label>
                                    <Input
                                      value={exp.startDate || ""}
                                      placeholder="e.g. 2021"
                                      onChange={(e) =>
                                        handleUpdate((prev) => {
                                          const next = [...prev.experiences];
                                          next[idx].startDate = e.target.value;
                                          return { ...prev, experiences: next };
                                        })
                                      }
                                      className="rounded-xl text-xs h-9 bg-white"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">End Date</label>
                                    <Input
                                      value={exp.endDate || ""}
                                      placeholder="e.g. Present"
                                      disabled={exp.isCurrent}
                                      onChange={(e) =>
                                        handleUpdate((prev) => {
                                          const next = [...prev.experiences];
                                          next[idx].endDate = e.target.value;
                                          return { ...prev, experiences: next };
                                        })
                                      }
                                      className="rounded-xl text-xs h-9 bg-white"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">Description & Bullet Points</label>
                                  <RichTextEditorBox
                                    value={exp.description || ""}
                                    placeholder="• Key achievements and deliverables..."
                                    rows={4}
                                    minHeight="min-h-[100px]"
                                    onChange={(val) =>
                                      handleUpdate((prev) => {
                                        const next = [...prev.experiences];
                                        next[idx].description = val;
                                        return { ...prev, experiences: next };
                                      })
                                    }
                                  />
                                </div>
                                <div className="flex justify-end pt-1">
                                  <button
                                    type="button"
                                    onClick={() => setEditingEntryId(null)}
                                    className="inline-flex items-center gap-1.5 px-6 py-1.5 rounded-xl bg-[#ff3b6c] hover:bg-[#f4285e] text-white text-xs font-bold shadow-md shadow-pink-500/20 transition-all cursor-pointer"
                                  >
                                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                    <span>Done</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Add Entry Footer */}
                    <div className="border-t border-gray-100/80 px-6 py-3.5 bg-white flex items-center justify-center">
                      <button
                        onClick={() => {
                          const newId = `exp_${Date.now()}`;
                          handleUpdate((prev) => ({
                            ...prev,
                            experiences: [
                              ...prev.experiences,
                              {
                                id: newId,
                                company: "Company Name",
                                position: "Software Engineer",
                                location: "Remote",
                                startDate: "2023",
                                endDate: "Present",
                                isCurrent: true,
                                description: "• Built core product architecture and high-performance services.",
                                order: prev.experiences.length,
                              },
                            ],
                          }));
                          setEditingEntryId(newId);
                        }}
                        className="inline-flex items-center gap-1.5 px-6 py-1.5 rounded-full border border-gray-200 bg-white text-[13px] font-semibold text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-2xs cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-gray-700" />
                        <span>Add Entry</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* 4. Education Card */}
              <div className="rounded-[22px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.03] overflow-hidden transition-all">
                <div
                  className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/40 transition-colors"
                  onClick={() => toggleSection("education")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center text-gray-900 shrink-0">
                      <GraduationCap className="w-5 h-5 text-gray-900" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-bold text-[16px] text-gray-900 tracking-tight">
                      {sectionHeadings.education}
                    </h3>
                  </div>

                  <div className="p-1 text-gray-500">
                    {openSections.education ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </div>

                {openSections.education && (
                  <>
                    <div className="border-t border-gray-100 divide-y divide-gray-100">
                      {resumeData.educations.map((edu, idx) => {
                        const entryKey = edu.id || `edu_${idx}`;
                        const isHidden = hiddenEntries[entryKey];
                        const isEditing = editingEntryId === entryKey;

                        return (
                          <div key={entryKey} className="bg-white">
                            <div className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                              <div
                                className="flex items-center gap-3 flex-1 overflow-hidden cursor-pointer"
                                onClick={() => setEditingEntryId(isEditing ? null : entryKey)}
                              >
                                <GripVertical className="w-4 h-4 text-gray-400 shrink-0 cursor-grab" />
                                <div className="truncate flex-1">
                                  <p className={`text-[13px] font-semibold truncate ${isHidden ? "line-through text-gray-400" : "text-gray-900"}`}>
                                    {edu.degree}
                                  </p>
                                  <p className="text-[11px] text-gray-400">
                                    {edu.institution} ({edu.startDate} – {edu.endDate})
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  onClick={(e) => toggleEntryVisibility(entryKey, e)}
                                  className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                                    isHidden
                                      ? "bg-gray-100 border-gray-200 text-gray-400"
                                      : "bg-[#f8f9fa] border-gray-200/80 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                  }`}
                                >
                                  {isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                <button
                                  onClick={() =>
                                    handleUpdate((prev) => ({
                                      ...prev,
                                      educations: prev.educations.filter((_, i) => i !== idx),
                                    }))
                                  }
                                  className="w-8 h-8 rounded-lg bg-[#f8f9fa] border border-gray-200/80 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {isEditing && (
                              <div className="px-6 py-4 bg-[#faf9f7] border-t border-gray-100 space-y-3 animate-in fade-in">
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">Institution</label>
                                    <Input
                                      value={edu.institution}
                                      onChange={(e) =>
                                        handleUpdate((prev) => {
                                          const next = [...prev.educations];
                                          next[idx].institution = e.target.value;
                                          return { ...prev, educations: next };
                                        })
                                      }
                                      className="rounded-xl text-xs h-9 bg-white"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">Degree</label>
                                    <Input
                                      value={edu.degree}
                                      onChange={(e) =>
                                        handleUpdate((prev) => {
                                          const next = [...prev.educations];
                                          next[idx].degree = e.target.value;
                                          return { ...prev, educations: next };
                                        })
                                      }
                                      className="rounded-xl text-xs h-9 bg-white"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">Years</label>
                                    <Input
                                      value={`${edu.startDate} - ${edu.endDate}`}
                                      onChange={(e) => {
                                        const [start, end] = e.target.value.split("-").map((s) => s.trim());
                                        handleUpdate((prev) => {
                                          const next = [...prev.educations];
                                          next[idx].startDate = start || "";
                                          next[idx].endDate = end || "";
                                          return { ...prev, educations: next };
                                        });
                                      }}
                                      className="rounded-xl text-xs h-9 bg-white"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">Grade / GPA</label>
                                    <Input
                                      value={edu.score || ""}
                                      placeholder="e.g. 3.8 GPA"
                                      onChange={(e) =>
                                        handleUpdate((prev) => {
                                          const next = [...prev.educations];
                                          next[idx].score = e.target.value;
                                          return { ...prev, educations: next };
                                        })
                                      }
                                      className="rounded-xl text-xs h-9 bg-white"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">Activities, Honors & Highlights (Optional)</label>
                                  <RichTextEditorBox
                                    value={(edu as any).description || ""}
                                    placeholder="• Relevant coursework, Dean's List, academic honors..."
                                    rows={3}
                                    minHeight="min-h-[80px]"
                                    onChange={(val) =>
                                      handleUpdate((prev) => {
                                        const next = [...prev.educations];
                                        (next[idx] as any).description = val;
                                        return { ...prev, educations: next };
                                      })
                                    }
                                  />
                                </div>
                                <div className="flex justify-end pt-1">
                                  <button
                                    type="button"
                                    onClick={() => setEditingEntryId(null)}
                                    className="inline-flex items-center gap-1.5 px-6 py-1.5 rounded-xl bg-[#ff3b6c] hover:bg-[#f4285e] text-white text-xs font-bold shadow-md shadow-pink-500/20 transition-all cursor-pointer"
                                  >
                                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                    <span>Done</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t border-gray-100/80 px-6 py-3.5 bg-white flex items-center justify-center">
                      <button
                        onClick={() => {
                          const newId = `edu_${Date.now()}`;
                          handleUpdate((prev) => ({
                            ...prev,
                            educations: [
                              ...prev.educations,
                              {
                                id: newId,
                                institution: "University Name",
                                degree: "BSc in Computer Science",
                                fieldOfStudy: "Computer Science",
                                startDate: "2018",
                                endDate: "2022",
                                score: "3.8 GPA",
                                location: "",
                                order: prev.educations.length,
                              },
                            ],
                          }));
                          setEditingEntryId(newId);
                        }}
                        className="inline-flex items-center gap-1.5 px-6 py-1.5 rounded-full border border-gray-200 bg-white text-[13px] font-semibold text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-2xs cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-gray-700" />
                        <span>Add Entry</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* 5. Skills Card */}
              <div className="rounded-[22px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.03] overflow-hidden transition-all">
                <div
                  className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/40 transition-colors"
                  onClick={() => toggleSection("skills")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center text-gray-900 shrink-0">
                      <Wrench className="w-5 h-5 text-gray-900" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-bold text-[16px] text-gray-900 tracking-tight">
                      {sectionHeadings.skills}
                    </h3>
                  </div>

                  <div className="p-1 text-gray-500">
                    {openSections.skills ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </div>

                {openSections.skills && (
                  <div className="border-t border-gray-100 p-6 space-y-3 bg-white">
                    {resumeData.skills.map((grp, idx) => (
                      <div key={grp.id || idx} className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[12px] font-bold text-gray-800">{grp.category}</label>
                          <button
                            onClick={() =>
                              handleUpdate((prev) => ({
                                ...prev,
                                skills: prev.skills.filter((_, i) => i !== idx),
                              }))
                            }
                            className="text-gray-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <Input
                          value={grp.skills.join(", ")}
                          placeholder="Comma separated skills (e.g. React, Next.js, Node.js)"
                          onChange={(e) =>
                            handleUpdate((prev) => {
                              const next = [...prev.skills];
                              next[idx].skills = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                              return { ...prev, skills: next };
                            })
                          }
                          className="rounded-xl text-xs h-9 bg-white"
                        />
                      </div>
                    ))}

                    <div className="pt-2 flex justify-center">
                      <button
                        onClick={() =>
                          handleUpdate((prev) => ({
                            ...prev,
                            skills: [
                              ...prev.skills,
                              {
                                id: `skill_${Date.now()}`,
                                category: "Technical Skills",
                                skills: ["TypeScript", "Next.js", "PostgreSQL"],
                                order: prev.skills.length,
                              },
                            ],
                          }))
                        }
                        className="inline-flex items-center gap-1.5 px-6 py-1.5 rounded-full border border-gray-200 bg-white text-[13px] font-semibold text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-2xs cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-gray-700" />
                        <span>Add Skill Group</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Projects Card */}
              <div className="rounded-[22px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.03] overflow-hidden transition-all">
                <div
                  className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/40 transition-colors"
                  onClick={() => toggleSection("projects")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center text-gray-900 shrink-0">
                      <FolderGit2 className="w-5 h-5 text-gray-900" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-bold text-[16px] text-gray-900 tracking-tight">
                      {sectionHeadings.projects}
                    </h3>
                  </div>

                  <div className="p-1 text-gray-500">
                    {openSections.projects ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </div>

                {openSections.projects && (
                  <div className="border-t border-gray-100 p-6 space-y-4 bg-white">
                    {resumeData.projects.map((proj, idx) => (
                      <div key={proj.id || idx} className="p-3.5 rounded-xl border border-gray-200 space-y-2 bg-[#faf9f7]">
                        <div className="flex items-center justify-between">
                          <Input
                            value={proj.title}
                            placeholder="Project Title"
                            onChange={(e) =>
                              handleUpdate((prev) => {
                                const next = [...prev.projects];
                                next[idx].title = e.target.value;
                                return { ...prev, projects: next };
                              })
                            }
                            className="h-8 text-xs font-bold bg-white"
                          />
                          <button
                            onClick={() =>
                              handleUpdate((prev) => ({
                                ...prev,
                                projects: prev.projects.filter((_, i) => i !== idx),
                              }))
                            }
                            className="p-1.5 text-gray-400 hover:text-red-600 ml-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-gray-600 block mb-1">Description & Highlights</label>
                          <RichTextEditorBox
                            value={proj.description || ""}
                            placeholder="Project highlights, deliverables, and metrics..."
                            rows={3}
                            minHeight="min-h-[85px]"
                            onChange={(val) =>
                              handleUpdate((prev) => {
                                const next = [...prev.projects];
                                next[idx].description = val;
                                return { ...prev, projects: next };
                              })
                            }
                          />
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          handleUpdate((prev) => ({
                            ...prev,
                            projects: [
                              ...prev.projects,
                              {
                                id: `proj_${Date.now()}`,
                                title: "Full Stack SaaS Platform",
                                subtitle: "Next.js & TypeScript",
                                startDate: "2023",
                                endDate: "2024",
                                description: "Engineered scalable cloud platform with 99.9% uptime.",
                                technologies: ["React", "Node.js", "PostgreSQL"],
                                order: prev.projects.length,
                              },
                            ],
                          }))
                        }
                        className="inline-flex items-center gap-1.5 px-6 py-1.5 rounded-full border border-gray-200 bg-white text-[13px] font-semibold text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-2xs cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-gray-700" />
                        <span>Add Project</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 7. Certificates Card */}
              <div className="rounded-[22px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.03] overflow-hidden transition-all">
                <div
                  className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/40 transition-colors"
                  onClick={() => toggleSection("certs")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center text-gray-900 shrink-0">
                      <Award className="w-5 h-5 text-gray-900" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-bold text-[16px] text-gray-900 tracking-tight">
                      {sectionHeadings.certs}
                    </h3>
                  </div>

                  <div className="p-1 text-gray-500">
                    {openSections.certs ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </div>

                {openSections.certs && (
                  <div className="border-t border-gray-100 p-6 space-y-3 bg-white">
                    {resumeData.certs.map((c, idx) => (
                      <div key={c.id || idx} className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-gray-200 bg-[#faf9f7]">
                        <div className="flex-1">
                          <p className="text-xs font-bold text-gray-900">{c.name}</p>
                          <p className="text-[11px] text-gray-500">{c.issuer} ({c.issueDate})</p>
                        </div>
                        <button
                          onClick={() =>
                            handleUpdate((prev) => ({
                              ...prev,
                              certs: prev.certs.filter((_, i) => i !== idx),
                            }))
                          }
                          className="p-1.5 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    <div className="flex justify-center pt-1">
                      <button
                        onClick={() =>
                          handleUpdate((prev) => ({
                            ...prev,
                            certs: [
                              ...prev.certs,
                              {
                                id: `cert_${Date.now()}`,
                                name: "AWS Certified Solutions Architect",
                                issuer: "Amazon Web Services",
                                issueDate: "2024",
                                expiryDate: "2027",
                                order: prev.certs.length,
                              },
                            ],
                          }))
                        }
                        className="inline-flex items-center gap-1.5 px-6 py-1.5 rounded-full border border-gray-200 bg-white text-[13px] font-semibold text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-2xs cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-gray-700" />
                        <span>Add Certificate</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 8. Languages Card */}
              <div className="rounded-[22px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.03] overflow-hidden transition-all">
                <div
                  className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/40 transition-colors"
                  onClick={() => toggleSection("languages")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center text-gray-900 shrink-0">
                      <LanguagesIcon className="w-5 h-5 text-gray-900" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-bold text-[16px] text-gray-900 tracking-tight">
                      {sectionHeadings.languages}
                    </h3>
                  </div>

                  <div className="p-1 text-gray-500">
                    {openSections.languages ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </div>

                {openSections.languages && (
                  <div className="border-t border-gray-100 p-6 space-y-3 bg-white">
                    {resumeData.languages.map((l, idx) => (
                      <div key={l.id || idx} className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-gray-200 bg-[#faf9f7]">
                        <div className="flex-1">
                          <p className="text-xs font-bold text-gray-900">{l.name}</p>
                          <p className="text-[11px] text-gray-500">{l.proficiency}</p>
                        </div>
                        <button
                          onClick={() =>
                            handleUpdate((prev) => ({
                              ...prev,
                              languages: prev.languages.filter((_, i) => i !== idx),
                            }))
                          }
                          className="p-1.5 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    <div className="flex justify-center pt-1">
                      <button
                        onClick={() =>
                          handleUpdate((prev) => ({
                            ...prev,
                            languages: [
                              ...prev.languages,
                              {
                                id: `lang_${Date.now()}`,
                                name: "English",
                                proficiency: "Native / Bilingual",
                                order: prev.languages.length,
                              },
                            ],
                          }))
                        }
                        className="inline-flex items-center gap-1.5 px-6 py-1.5 rounded-full border border-gray-200 bg-white text-[13px] font-semibold text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-2xs cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-gray-700" />
                        <span>Add Language</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* Customization Tab: Exact FlowCV Layout, Typography, Accent Colors, Templates */
            <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#edebe7]">
              {/* 1. Design Templates Banner Card (Matching user reference Image 1) */}
              <div className="w-full bg-white rounded-[32px] p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-black/[0.04] font-sans">
                <h2 className="text-[22px] font-bold text-[#181236] tracking-tight mb-1">
                  Design Templates
                </h2>
                <p className="text-xs text-[#52576c] font-normal mb-5 flex items-center gap-1.5">
                  Update your entire resume design with one click
                  <span className="text-blue-500">🔄</span>
                </p>

                {/* Faded Carousel Strip with Center "Browse templates" Button */}
                <div className="relative w-full h-[125px] rounded-2xl overflow-hidden border border-gray-200/80 bg-gradient-to-r from-gray-50 via-white to-gray-50 flex items-center justify-center shadow-inner group">
                  {/* Faded background mini template previews strip */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-40 blur-[0.6px] pointer-events-none scale-95 group-hover:scale-100 transition-transform duration-500">
                    {TEMPLATE_LIST.slice(0, 5).map((tpl) => {
                      const TplComp = tpl.component;
                      const preview = getTemplatePreviewData(tpl.id);
                      return (
                        <div
                          key={tpl.id}
                          className="w-[105px] h-[150px] bg-white rounded-md shadow-xs border border-gray-300 overflow-hidden shrink-0 relative"
                        >
                          <div
                            className="origin-top-left absolute top-0 left-0 pointer-events-none select-none"
                            style={{
                              width: "210mm",
                              minHeight: "297mm",
                              transform: "scale(0.13)",
                              transformOrigin: "top left",
                            }}
                          >
                            <TplComp data={preview} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Center Floating Pill Button */}
                  <button
                    type="button"
                    onClick={() => setIsTemplateModalOpen(true)}
                    className="z-10 px-6 py-2.5 rounded-full bg-white hover:bg-gray-50 text-[#181236] font-bold text-[14px] shadow-[0_4px_18px_rgba(0,0,0,0.12)] border border-gray-200 cursor-pointer flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    Browse templates
                  </button>
                </div>
              </div>

              {/* 2. FlowCV Layout Panel matching user reference image exactly */}
              <SectionLayoutCustomizer
                resumeData={resumeData}
                onUpdate={handleUpdate}
                hiddenEntries={hiddenEntries}
                onToggleVisibility={(id) => setHiddenEntries((prev) => ({ ...prev, [id]: !prev[id] }))}
                onEditPersonalDetails={() => {
                  setActiveTab("content");
                  setEditPersonal(true);
                }}
              />

              {/* Design & Typography Card */}
              <div className="rounded-[28px] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.04] space-y-5">
                <div>
                  <h2 className="text-[16px] font-bold text-[#181236]">Typography & Spacing</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Customize font families, sizes, and layout margins.</p>
                </div>

                {/* Typography / Font Selector using shadcn Select */}
                <div className="space-y-3 p-4 rounded-2xl border border-gray-200 bg-gray-50/70">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                      Font Family
                    </label>
                    <span className="text-[11px] text-gray-500 font-medium">
                      Current: <strong className="text-gray-900">{resumeData.fontFamily || "Inter"}</strong>
                    </span>
                  </div>

                  <Select
                    value={resumeData.fontFamily || "Inter"}
                    onValueChange={(val) =>
                      handleUpdate((prev) => ({
                        ...prev,
                        fontFamily: val as "Inter" | "Merriweather" | "Roboto",
                      }))
                    }
                  >
                    <SelectTrigger className="w-full h-11 bg-white rounded-xl border-gray-200 hover:border-gray-300">
                      <SelectValue placeholder="Choose a font family">
                        {(() => {
                          const current = fontOptions.find(
                            (f) => f.name === (resumeData.fontFamily || "Inter")
                          );
                          return current ? (
                            <div className="flex items-center justify-between w-full pr-1">
                              <span className="font-semibold text-gray-900 text-xs">{current.name}</span>
                              <span className="text-[11px] text-gray-400 font-normal">({current.category})</span>
                            </div>
                          ) : (
                            resumeData.fontFamily || "Inter"
                          );
                        })()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((f) => (
                        <SelectItem
                          key={f.name}
                          value={f.name}
                          label={
                            <div className="flex items-center justify-between w-full">
                              <span className="font-semibold text-gray-900 text-xs">{f.name}</span>
                              <span className="text-[11px] text-gray-400 font-normal ml-2">({f.category})</span>
                            </div>
                          }
                        >
                          <div className="flex items-center justify-between w-full py-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-gray-900 text-xs">{f.name}</span>
                              <span className="text-[10px] text-gray-400 font-normal">({f.category})</span>
                            </div>
                            <span className="text-xs text-gray-400 font-serif">{f.sample}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Font Size & Spacing Controls using shadcn Select */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2 p-3.5 rounded-2xl border border-gray-200 bg-gray-50/70">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                      Font Size
                    </label>
                    <Select
                      value={resumeData.fontSize || "base"}
                      onValueChange={(val) =>
                        handleUpdate((prev) => ({
                          ...prev,
                          fontSize: val as "sm" | "base" | "lg",
                        }))
                      }
                    >
                      <SelectTrigger className="w-full h-9 bg-white rounded-xl border-gray-200 text-xs">
                        <SelectValue placeholder="Select size">
                          {resumeData.fontSize === "sm"
                            ? "Small (Compact)"
                            : resumeData.fontSize === "lg"
                            ? "Large (Spacious)"
                            : "Normal (Default)"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sm">Small (Compact)</SelectItem>
                        <SelectItem value="base">Normal (Default)</SelectItem>
                        <SelectItem value="lg">Large (Spacious)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 p-3.5 rounded-2xl border border-gray-200 bg-gray-50/70">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                      Page Margin
                    </label>
                    <Select
                      value={resumeData.pageMargin || "normal"}
                      onValueChange={(val) =>
                        handleUpdate((prev) => ({
                          ...prev,
                          pageMargin: val as "compact" | "normal" | "spacious",
                        }))
                      }
                    >
                      <SelectTrigger className="w-full h-9 bg-white rounded-xl border-gray-200 text-xs">
                        <SelectValue placeholder="Select margin">
                          {resumeData.pageMargin === "compact"
                            ? "Compact (Tight)"
                            : resumeData.pageMargin === "spacious"
                            ? "Spacious (Relaxed)"
                            : "Normal (Balanced)"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact (Tight)</SelectItem>
                        <SelectItem value="normal">Normal (Balanced)</SelectItem>
                        <SelectItem value="spacious">Spacious (Relaxed)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Palette Accent Colors */}
                <div className="space-y-3 p-4 rounded-2xl border border-gray-200 bg-gray-50/70">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                    Accent Color
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    {colorOptions.map((c) => {
                      const isSelected = resumeData.themeColor === c.hex;
                      return (
                        <button
                          key={c.hex}
                          onClick={() =>
                            handleUpdate((prev) => ({
                              ...prev,
                              themeColor: c.hex,
                            }))
                          }
                          className={`w-8 h-8 rounded-full transition-transform cursor-pointer relative flex items-center justify-center ${
                            isSelected ? "ring-2 ring-offset-2 ring-gray-900 scale-110" : "hover:scale-105"
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* FlowCV Visual Template Gallery with Real Default Data Preview */}
              <div className="rounded-[28px] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.04] space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                    Templates ({TEMPLATE_LIST.length})
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
                      ATS Ready
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                      Default Data Ready
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {TEMPLATE_LIST.map((tpl) => {
                    const isSelected = resumeData.templateId === tpl.id;
                    const TplComponent = tpl.component;
                    const previewData = getTemplatePreviewData(tpl.id);

                    return (
                      <button
                        key={tpl.id}
                        onClick={() =>
                          handleUpdate((prev) => ({
                            ...prev,
                            templateId: tpl.id,
                          }))
                        }
                        className={`group relative p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/30 shadow-md"
                            : "border-gray-200 hover:border-gray-300 bg-[#f8f9fa] hover:bg-white hover:shadow-xs"
                        }`}
                      >
                        {/* A4 Portrait Full-Height Document Preview */}
                        <div className="w-full aspect-[210/297] rounded-xl bg-white border border-gray-200/90 overflow-hidden relative shadow-2xs group-hover:shadow-md transition-shadow">
                          <div
                            className="origin-top-left pointer-events-none select-none bg-white absolute top-0 left-0"
                            style={{
                              width: "210mm",
                              minHeight: "297mm",
                              transform: "scale(0.263)",
                              transformOrigin: "top left",
                            }}
                          >
                            <TplComponent data={previewData} />
                          </div>

                          {/* Selected badge */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 z-10">
                              <Check className="w-2.5 h-2.5" />
                              Selected
                            </div>
                          )}
                        </div>

                        {/* Centered Template Title below like reference image */}
                        <div className="pt-2.5 pb-0.5 text-center">
                          <p className="font-bold text-[11px] tracking-wider uppercase text-gray-900 group-hover:text-blue-600 transition-colors">
                            {tpl.name}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Live Interactive FlowCV A4 Preview Canvas */}
        <div className="flex-1 bg-[#e5e2dc] overflow-auto flex flex-col items-center justify-start p-10 relative">
          {/* Zoom Controls Overlay */}
          <div className="fixed bottom-6 right-8 bg-white/95 backdrop-blur-xs border border-gray-200/80 rounded-full px-3 py-1.5 shadow-lg flex items-center gap-2 z-30">
            <button
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.05))}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-600 cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-gray-700 w-12 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(1.4, z + 0.05))}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-600 cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Centered Rendered A4 Document */}
          <div className="w-full flex justify-center pb-20">
            <ResumeRenderer data={displayedResumeData} scale={zoom} />
          </div>
        </div>
      </div>

      {/* FlowCV Change Section Layout Modal */}
      <ChangeSectionLayoutModal
        isOpen={isLayoutModalOpen}
        onClose={() => setIsLayoutModalOpen(false)}
        resumeData={resumeData}
        onUpdate={handleUpdate}
        hiddenEntries={hiddenEntries}
        onToggleVisibility={(id) => setHiddenEntries((prev) => ({ ...prev, [id]: !prev[id] }))}
      />

      {/* FlowCV Design Templates Gallery Modal */}
      <TemplateGalleryModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        selectedTemplateId={resumeData.templateId}
        onSelectTemplate={(templateId) => {
          handleUpdate((prev) => ({
            ...prev,
            templateId,
          }));
        }}
      />
    </div>
  );
}
