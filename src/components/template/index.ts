import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { ModernTemplate } from "@/components/resume-templates/modern";
import { ClassicTemplate } from "@/components/resume-templates/classic";
import { MinimalTemplate } from "@/components/resume-templates/minimal";
import { ZurichSidebarTemplate } from "./zurich-sidebar";
import { StockholmModernTemplate } from "./stockholm-modern";
import { TokyoCompactTemplate } from "./tokyo-compact";
import { MilanExecutiveTemplate } from "./milan-executive";
import { ClassicClearTemplate } from "./classic-clear";
import { AtlanticBlueTemplate } from "./atlantic-blue";
import { MercuryFlowTemplate } from "./mercury-flow";
import { TrueBlueTemplate } from "./true-blue";
import { EditorialRuleTemplate } from "./editorial-rule";
import { SaffronLineTemplate } from "./saffron-line";
import { SteadyFormTemplate } from "./steady-form";
import { PrecisionLineTemplate } from "./precision-line";
import { SoftCleanTemplate } from "./soft-clean";
import { ModernHeritageTemplate } from "./modern-heritage";
import { EmeraldTechTemplate } from "./emerald-tech";

export interface TemplateDefinition {
  id: string;
  name: string;
  category: "Modern" | "Classic" | "Minimal" | "Creative" | "Executive";
  description: string;
  component: React.FC<{ data: ResumeData }>;
  thumbnailColor: string;
  tags: string[];
}

export const TEMPLATE_REGISTRY: Record<string, TemplateDefinition> = {
  "soft-clean": {
    id: "soft-clean",
    name: "Soft Clean",
    category: "Modern",
    description: "Centered circular photo avatar, elegant serif titles, rating dots, and clear divider rules",
    component: SoftCleanTemplate,
    thumbnailColor: "#3b82f6",
    tags: ["Talent Acquisition", "HR", "Photo", "Serif"],
  },
  "modern-heritage": {
    id: "modern-heritage",
    name: "Modern Heritage",
    category: "Classic",
    description: "Traditional double-rule section banners, centered formal header, and right-aligned date/location tags",
    component: ModernHeritageTemplate,
    thumbnailColor: "#27272a",
    tags: ["Marketing Specialist", "Heritage", "Editorial", "Academic"],
  },
  "emerald-tech": {
    id: "emerald-tech",
    name: "Emerald Tech",
    category: "Modern",
    description: "Rounded square photo on top right, emerald green headers, and multi-column tech credentials",
    component: EmeraldTechTemplate,
    thumbnailColor: "#059669",
    tags: ["Software Engineer", "Tech", "Emerald", "Photo"],
  },
  "editorial-rule": {
    id: "editorial-rule",
    name: "Editorial Rule",
    category: "Classic",
    description: "Serif typography with bold horizontal rules and clean timeline dates",
    component: EditorialRuleTemplate,
    thumbnailColor: "#18181b",
    tags: ["Operations Manager", "Editorial", "Serif", "Clean Rules"],
  },
  "saffron-line": {
    id: "saffron-line",
    name: "Saffron Line",
    category: "Creative",
    description: "Warm golden saffron divider lines, circular photo badge, and organized left skills sidebar",
    component: SaffronLineTemplate,
    thumbnailColor: "#d97706",
    tags: ["Head of Operations", "Saffron Accent", "Photo", "Split"],
  },
  "steady-form": {
    id: "steady-form",
    name: "Steady Form",
    category: "Modern",
    description: "Centered modern header with circular avatar, left dates, and structured 3-column skills",
    component: SteadyFormTemplate,
    thumbnailColor: "#059669",
    tags: ["Project Engineer", "Centered", "Photo", "Balanced"],
  },
  "precision-line": {
    id: "precision-line",
    name: "Precision Line",
    category: "Executive",
    description: "Crisp emerald green header and subtitle accents with clean multi-column layout",
    component: PrecisionLineTemplate,
    thumbnailColor: "#047857",
    tags: ["Customer Service", "Emerald", "Executive", "Multi-column"],
  },
  "classic-clear": {
    id: "classic-clear",
    name: "Classic Clear",
    category: "Classic",
    description: "Centered serif title, black accent dividers, clean 2-column skills and certificate grids",
    component: ClassicClearTemplate,
    thumbnailColor: "#171717",
    tags: ["Project Manager", "Classic", "Serif", "Corporate"],
  },
  "atlantic-blue": {
    id: "atlantic-blue",
    name: "Atlantic Blue",
    category: "Creative",
    description: "Dark navy full-height sidebar with avatar, ratings dots, and iconized right-hand experience timeline",
    component: AtlanticBlueTemplate,
    thumbnailColor: "#1e2f42",
    tags: ["Business Development", "Sidebar", "Photo", "Iconized"],
  },
  "mercury-flow": {
    id: "mercury-flow",
    name: "Mercury Flow",
    category: "Modern",
    description: "Elegant serif typography with rounded profile photo, italic executive summary, and left-aligned dates",
    component: MercuryFlowTemplate,
    thumbnailColor: "#475569",
    tags: ["Sales Executive", "Photo", "Timeline", "Minimalist"],
  },
  "true-blue": {
    id: "true-blue",
    name: "True Blue",
    category: "Modern",
    description: "Royal blue title typography, blue-accented company markers, and structured multi-column credentials",
    component: TrueBlueTemplate,
    thumbnailColor: "#1d4ed8",
    tags: ["Vice President", "True Blue", "Executive", "ATS Friendly"],
  },
  modern: {
    id: "modern",
    name: "Modern Clean",
    category: "Modern",
    description: "FlowCV standard dual-column with clean accent dividers and badges",
    component: ModernTemplate,
    thumbnailColor: "#2563eb",
    tags: ["Popular", "Tech", "ATS Friendly"],
  },
  "zurich-sidebar": {
    id: "zurich-sidebar",
    name: "Zurich Dark Sidebar",
    category: "Creative",
    description: "High-contrast dark sidebar with avatar and crisp light body",
    component: ZurichSidebarTemplate,
    thumbnailColor: "#111827",
    tags: ["Sidebar", "Photo", "Design"],
  },
  "stockholm-modern": {
    id: "stockholm-modern",
    name: "Stockholm Timeline",
    category: "Modern",
    description: "Nordic layout with profile photo banner and timeline bullet markers",
    component: StockholmModernTemplate,
    thumbnailColor: "#059669",
    tags: ["Timeline", "Photo", "Clean"],
  },
  "tokyo-compact": {
    id: "tokyo-compact",
    name: "Tokyo Grid",
    category: "Minimal",
    description: "Balanced 2-equal columns for high content density and technical resumes",
    component: TokyoCompactTemplate,
    thumbnailColor: "#7c3aed",
    tags: ["Compact", "2-Column", "Engineering"],
  },
  "milan-executive": {
    id: "milan-executive",
    name: "Milan Executive Banner",
    category: "Executive",
    description: "Full-width colored banner top with sophisticated serif typography",
    component: MilanExecutiveTemplate,
    thumbnailColor: "#991b1b",
    tags: ["Banner", "Executive", "Serif"],
  },
  classic: {
    id: "classic",
    name: "Classic Academic",
    category: "Classic",
    description: "Centered traditional ivy-league layout with elegant margins",
    component: ClassicTemplate,
    thumbnailColor: "#374151",
    tags: ["Ivy League", "Traditional", "Law & Finance"],
  },
  minimal: {
    id: "minimal",
    name: "Minimalist Scandinavian",
    category: "Minimal",
    description: "Maximum whitespace, horizontal left headers, and crisp monochrome",
    component: MinimalTemplate,
    thumbnailColor: "#1e293b",
    tags: ["Minimal", "Whitespace", "Modern"],
  },
};

export const TEMPLATE_LIST = Object.values(TEMPLATE_REGISTRY);

export function getTemplateComponent(templateId: string): React.FC<{ data: ResumeData }> {
  return TEMPLATE_REGISTRY[templateId]?.component || ModernTemplate;
}

export { DEFAULT_RESUME_DATA, mergeWithDefaultData } from "@/lib/default-resume-data";
export { FormattedResumeText, cleanHtmlOrMarkdown } from "./formatted-text";

