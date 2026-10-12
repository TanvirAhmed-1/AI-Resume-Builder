import React from "react";
import { ResumeData } from "@/lib/validations/resume";
import { getTemplateComponent } from "@/components/template";
import { mergeWithDefaultData } from "@/lib/default-resume-data";

interface ResumeRendererProps {
  data: ResumeData;
  scale?: number;
}

export const ResumeRenderer: React.FC<ResumeRendererProps> = ({ data, scale = 1 }) => {
  const mergedData = mergeWithDefaultData(data);
  const TemplateComponent = getTemplateComponent(mergedData.templateId);

  const getFontFamilyStyle = (font: string) => {
    switch (font) {
      case "Inter":
        return "var(--font-inter), sans-serif";
      case "Roboto":
        return "var(--font-roboto), sans-serif";
      case "Merriweather":
        return "var(--font-merriweather), serif";
      case "Playfair Display":
        return "var(--font-playfair), serif";
      case "Outfit":
        return "var(--font-outfit), sans-serif";
      case "Plus Jakarta Sans":
        return "var(--font-plus-jakarta), sans-serif";
      case "Lora":
        return "var(--font-lora), serif";
      default:
        return "var(--font-inter), sans-serif";
    }
  };

  return (
    <div
      className="bg-white shadow-2xl transition-all origin-top mx-auto"
      style={{
        width: "210mm",
        minHeight: "297mm",
        transform: `scale(${scale})`,
        fontFamily: getFontFamilyStyle(mergedData.fontFamily || "Inter"),
      }}
    >
      <TemplateComponent data={mergedData} />
    </div>
  );
};
