"use client";

import React, { useState } from "react";
import { ResumeData } from "@/lib/validations/resume";
import {
  Check,
  Link as LinkIcon,
  ChevronsUpDown,
  Plus,
  Trash2,
  Camera,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface PersonalDetailsEditorProps {
  resumeData: ResumeData;
  onUpdate: (updater: (prev: ResumeData) => ResumeData) => void;
  onDone: () => void;
}

interface DetailFieldConfig {
  id: string;
  key: string;
  label: string;
  placeholder?: string;
  isLink?: boolean;
  defaultLinkUrl?: string;
  category: "personal" | "link";
}

// All available Personal Details pills matching FlowCV
const ALL_PERSONAL_DETAILS_PILLS: Array<{ key: string; label: string; placeholder?: string }> = [
  { key: "passport", label: "Passport or Id", placeholder: "e.g. Passport: A12345678" },
  { key: "nationality", label: "Nationality", placeholder: "e.g. Bangladeshi" },
  { key: "dateOfBirth", label: "Date of Birth", placeholder: "e.g. 15 Jan 1996" },
  { key: "visa", label: "Visa", placeholder: "e.g. Work Permit (Tier 2)" },
  { key: "availability", label: "Availability", placeholder: "e.g. Immediate / 2 Weeks" },
  { key: "gender", label: "Gender/Pronoun", placeholder: "e.g. He/Him" },
  { key: "disability", label: "Disability", placeholder: "e.g. None / Optional" },
  // Extra options revealed via "Show More"
  { key: "drivingLicense", label: "Driving License", placeholder: "e.g. Full Class B" },
  { key: "maritalStatus", label: "Marital Status", placeholder: "e.g. Single" },
  { key: "militaryService", label: "Military Service", placeholder: "e.g. Completed" },
  { key: "placeOfBirth", label: "Place of Birth", placeholder: "e.g. Dhaka, Bangladesh" },
  { key: "taxId", label: "Tax ID / SSN", placeholder: "e.g. 123-45-6789" },
  { key: "securityClearance", label: "Security Clearance", placeholder: "e.g. Secret" },
];

// All available Links / Social Profiles pills matching FlowCV
const ALL_LINKS_PILLS: Array<{ key: string; label: string; defaultUrl: string }> = [
  { key: "portfolio", label: "Portfolio", defaultUrl: "https://" },
  { key: "github", label: "GitHub", defaultUrl: "https://github.com/" },
  { key: "gitbook", label: "GitBook", defaultUrl: "https://gitbook.com/" },
  { key: "medium", label: "Medium", defaultUrl: "https://medium.com/@" },
  { key: "orcid", label: "ORCID", defaultUrl: "https://orcid.org/" },
  { key: "skype", label: "Skype", defaultUrl: "skype:" },
  { key: "bluesky", label: "Bluesky", defaultUrl: "https://bsky.app/profile/" },
  { key: "threads", label: "Threads", defaultUrl: "https://threads.net/@" },
  { key: "x", label: "X", defaultUrl: "https://x.com/" },
  // Extra options revealed via "Show More"
  { key: "behance", label: "Behance", defaultUrl: "https://behance.net/" },
  { key: "dribbble", label: "Dribbble", defaultUrl: "https://dribbble.com/" },
  { key: "stackoverflow", label: "Stack Overflow", defaultUrl: "https://stackoverflow.com/users/" },
  { key: "youtube", label: "YouTube", defaultUrl: "https://youtube.com/@" },
  { key: "instagram", label: "Instagram", defaultUrl: "https://instagram.com/" },
  { key: "facebook", label: "Facebook", defaultUrl: "https://facebook.com/" },
  { key: "discord", label: "Discord", defaultUrl: "https://discord.gg/" },
  { key: "customLink", label: "Custom Link", defaultUrl: "https://" },
];

export function PersonalDetailsEditor({
  resumeData,
  onUpdate,
  onDone,
}: PersonalDetailsEditorProps) {
  const [showMorePersonal, setShowMorePersonal] = useState(false);
  const [showMoreLinks, setShowMoreLinks] = useState(false);
  const [activeUrlPopoverKey, setActiveUrlPopoverKey] = useState<string | null>(null);

  const info = resumeData.personalInfo as Record<string, any>;

  // Determine active fields order
  // Core contact fields from Screenshot 1: Email, Phone, Location, LinkedIn, Website
  const currentFieldsOrder: string[] = Array.isArray(info.fieldsOrder) && info.fieldsOrder.length > 0
    ? info.fieldsOrder
    : [
        "email",
        "phone",
        "location",
        ...(info.linkedin !== undefined ? ["linkedin"] : ["linkedin"]),
        ...(info.website !== undefined ? ["website"] : ["website"]),
        ...Object.keys(info).filter(
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
            info[k] !== undefined
        ),
      ];

  // Helper to get field meta
  const getFieldMeta = (key: string): DetailFieldConfig => {
    if (key === "email") return { id: "email", key: "email", label: "Email", placeholder: "alex@example.com", category: "personal" };
    if (key === "phone") return { id: "phone", key: "phone", label: "Phone", placeholder: "+1 (555) 000-0000", category: "personal" };
    if (key === "location") return { id: "location", key: "location", label: "Location", placeholder: "City, Country", category: "personal" };
    if (key === "linkedin") return { id: "linkedin", key: "linkedin", label: "LinkedIn", isLink: true, defaultLinkUrl: "https://linkedin.com/in/", category: "link" };
    if (key === "website") return { id: "website", key: "website", label: "Website", isLink: true, defaultLinkUrl: "https://", category: "link" };

    const personalMatch = ALL_PERSONAL_DETAILS_PILLS.find((p) => p.key === key);
    if (personalMatch) {
      return { id: key, key, label: personalMatch.label, placeholder: personalMatch.placeholder, category: "personal" };
    }

    const linkMatch = ALL_LINKS_PILLS.find((p) => p.key === key);
    if (linkMatch) {
      return { id: key, key, label: linkMatch.label, isLink: true, defaultLinkUrl: linkMatch.defaultUrl, category: "link" };
    }

    return { id: key, key, label: key.charAt(0).toUpperCase() + key.slice(1), category: "personal" };
  };

  // Reorder field up or down
  const moveField = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentFieldsOrder.length) return;

    const updated = [...currentFieldsOrder];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    onUpdate((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        fieldsOrder: updated,
      },
    }));
  };

  // Add a field when pill clicked
  const handleAddField = (key: string, isLink: boolean, defaultUrl?: string, label?: string) => {
    if (currentFieldsOrder.includes(key)) {
      return;
    }

    const updatedOrder = [...currentFieldsOrder, key];
    const defaultValue = isLink ? (label || key.charAt(0).toUpperCase() + key.slice(1)) : "";
    const defaultLinkValue = defaultUrl || "";

    onUpdate((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [key]: defaultValue,
        ...(isLink ? { [`${key}Url`]: defaultLinkValue } : {}),
        fieldsOrder: updatedOrder,
      },
    }));
  };

  // Remove a field
  const handleRemoveField = (key: string) => {
    const updatedOrder = currentFieldsOrder.filter((k) => k !== key);
    onUpdate((prev) => {
      const newInfo = { ...prev.personalInfo } as Record<string, any>;
      delete newInfo[key];
      delete newInfo[`${key}Url`];
      newInfo.fieldsOrder = updatedOrder;
      return {
        ...prev,
        personalInfo: newInfo as any,
      };
    });
  };

  // Update field value
  const handleFieldValueChange = (key: string, val: string) => {
    onUpdate((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [key]: val,
      },
    }));
  };

  // Update link URL for a link field
  const handleFieldLinkUrlChange = (key: string, url: string) => {
    onUpdate((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [`${key}Url`]: url,
      },
    }));
  };

  // Available pills not yet added
  const availablePersonalPills = ALL_PERSONAL_DETAILS_PILLS.filter(
    (p) => !currentFieldsOrder.includes(p.key)
  );
  const visiblePersonalPills = showMorePersonal
    ? availablePersonalPills
    : availablePersonalPills.slice(0, 7);

  const availableLinkPills = ALL_LINKS_PILLS.filter(
    (p) => !currentFieldsOrder.includes(p.key)
  );
  const visibleLinkPills = showMoreLinks
    ? availableLinkPills
    : availableLinkPills.slice(0, 9);

  return (
    <div className="pt-5 border-t border-gray-100/90 space-y-5 animate-in fade-in duration-200">
      {/* Top Profile Info: Name, Title & Avatar */}
      <div className="bg-[#f8f9fb] rounded-2xl p-4 border border-gray-100 flex items-start gap-4">
        <div className="flex-1 space-y-3">
          <div>
            <label className="text-[12px] font-bold text-gray-700 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={info.fullName || ""}
              onChange={(e) =>
                onUpdate((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, fullName: e.target.value },
                }))
              }
              placeholder="Your Full Name"
              className="w-full bg-white rounded-xl h-10 px-3.5 text-[14px] text-gray-900 border border-gray-200 focus:outline-none focus:border-purple-500 shadow-2xs"
            />
          </div>

          <div>
            <label className="text-[12px] font-bold text-gray-700 block mb-1">
              Headline / Job Title
            </label>
            <input
              type="text"
              value={info.headline || ""}
              onChange={(e) =>
                onUpdate((prev) => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, headline: e.target.value },
                }))
              }
              placeholder="e.g. Lead Full Stack Software Engineer"
              className="w-full bg-white rounded-xl h-10 px-3.5 text-[14px] text-gray-900 border border-gray-200 focus:outline-none focus:border-purple-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Photo Preview / URL Input */}
        <div className="shrink-0 flex flex-col items-center gap-1.5 pt-1">
          <div className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden shadow-2xs">
            {info.avatarUrl ? (
              <img
                src={info.avatarUrl}
                alt={info.fullName || "Avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-6 h-6 text-gray-300" />
            )}
          </div>
          <input
            type="text"
            value={info.avatarUrl || ""}
            onChange={(e) =>
              onUpdate((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, avatarUrl: e.target.value },
              }))
            }
            placeholder="Photo URL"
            className="w-24 text-[10px] bg-white border border-gray-200 rounded-lg px-2 py-1 text-center text-gray-600 focus:outline-none focus:border-purple-400"
          />
        </div>
      </div>

      {/* Active Contact & Link Fields (Matching Screenshot 1 exactly) */}
      <div className="space-y-4">
        {currentFieldsOrder.map((fieldKey, index) => {
          const meta = getFieldMeta(fieldKey);
          const fieldValue = info[fieldKey] !== undefined ? info[fieldKey] : "";
          const fieldLinkUrl = info[`${fieldKey}Url`] || "";
          const isUrlPopoverOpen = activeUrlPopoverKey === fieldKey;

          return (
            <div key={fieldKey} className="group relative">
              {/* Field Label */}
              <div className="flex items-center justify-between mb-1.5 px-0.5">
                <label className="text-[13px] font-semibold text-[#181236]">
                  {meta.label}
                </label>

                {/* Quick remove action for non-mandatory fields */}
                {!["email", "phone"].includes(fieldKey) && (
                  <button
                    type="button"
                    onClick={() => handleRemoveField(fieldKey)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 text-[11px] font-medium transition-opacity flex items-center gap-1 cursor-pointer"
                    title={`Remove ${meta.label}`}
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              {/* Input Box matching Screenshot 1 */}
              <div className="flex items-center gap-2">
                <div className="flex-1 relative flex items-center bg-[#f4f5f8] hover:bg-[#eff1f5] focus-within:bg-white focus-within:ring-2 focus-within:ring-purple-400/40 focus-within:border-purple-400 rounded-xl h-12 px-4 transition-all border border-transparent shadow-2xs">
                  <input
                    type="text"
                    value={fieldValue}
                    onChange={(e) => handleFieldValueChange(fieldKey, e.target.value)}
                    placeholder={meta.placeholder || `Enter ${meta.label.toLowerCase()}`}
                    className="w-full bg-transparent text-[14px] text-gray-900 font-normal focus:outline-none placeholder:text-gray-400"
                  />

                  {/* Purple Pill Button "[ 🔗 Link ]" for Link fields (Matching Screenshot 1) */}
                  {meta.isLink && (
                    <div className="shrink-0 ml-2">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveUrlPopoverKey(isUrlPopoverOpen ? null : fieldKey)
                        }
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[12px] font-semibold border transition-all cursor-pointer shadow-2xs ${
                          isUrlPopoverOpen || fieldLinkUrl
                            ? "bg-[#f5f3ff] border-[#c4b5fd] text-[#7c3aed]"
                            : "bg-white border-purple-200 text-[#7c3aed] hover:bg-purple-50"
                        }`}
                        title="Edit URL destination"
                      >
                        <LinkIcon className="w-3.5 h-3.5 text-[#7c3aed]" />
                        <span>Link</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Reorder Handle: "↕" Up-Down Arrow matching Screenshot 1 */}
                <div className="flex items-center gap-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => moveField(index, "up")}
                    disabled={index === 0}
                    className="w-5 h-9 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-20 disabled:hover:text-gray-400 transition-colors cursor-pointer"
                    title="Move Up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <div className="text-gray-400 select-none">
                    <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                  </div>
                  <button
                    type="button"
                    onClick={() => moveField(index, "down")}
                    disabled={index === currentFieldsOrder.length - 1}
                    className="w-5 h-9 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-20 disabled:hover:text-gray-400 transition-colors cursor-pointer"
                    title="Move Down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Expandable URL Destination Input when clicking [Link] */}
              {meta.isLink && isUrlPopoverOpen && (
                <div className="mt-2 p-3 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2 animate-in fade-in slide-in-from-top-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-purple-900">
                    <span>Web Address / Destination URL:</span>
                    {fieldLinkUrl && (
                      <a
                        href={fieldLinkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 flex items-center gap-1"
                      >
                        <span>Test link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={fieldLinkUrl}
                      onChange={(e) => handleFieldLinkUrlChange(fieldKey, e.target.value)}
                      placeholder={meta.defaultLinkUrl || "https://example.com/profile"}
                      className="flex-1 bg-white rounded-lg h-9 px-3 text-xs text-gray-800 border border-purple-200 focus:outline-none focus:border-purple-500 shadow-2xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setActiveUrlPopoverKey(null)}
                      className="px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Screenshot 2: "Add details" Section */}
      <div className="pt-4 border-t border-gray-100">
        <h3 className="text-[17px] font-bold text-[#181236] tracking-tight mb-3">
          Add details
        </h3>

        {/* Subsection 1: Personal details pills (Matching Screenshot 2) */}
        <div className="mb-5">
          <h4 className="text-[13px] font-bold text-[#181236] mb-2.5">
            Personal details
          </h4>

          <div className="flex flex-wrap gap-2">
            {visiblePersonalPills.map((pill) => (
              <button
                key={pill.key}
                type="button"
                onClick={() => handleAddField(pill.key, false, undefined, pill.label)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#f4f5f8] hover:bg-[#eaecf1] text-[13px] font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer group"
              >
                <Plus className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 transition-colors" />
                <span>{pill.label}</span>
              </button>
            ))}

            {/* Show More toggle pill button */}
            {availablePersonalPills.length > 7 && (
              <button
                type="button"
                onClick={() => setShowMorePersonal(!showMorePersonal)}
                className="px-3.5 py-2 rounded-xl bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-[13px] font-semibold text-[#181236] transition-colors cursor-pointer shadow-2xs"
              >
                {showMorePersonal ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </div>

        {/* Subsection 2: Links / social profiles pills (Matching Screenshot 2) */}
        <div>
          <h4 className="text-[13px] font-bold text-[#181236] mb-2.5">
            Links / social profiles
          </h4>

          <div className="flex flex-wrap gap-2">
            {visibleLinkPills.map((pill) => (
              <button
                key={pill.key}
                type="button"
                onClick={() => handleAddField(pill.key, true, pill.defaultUrl, pill.label)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#f4f5f8] hover:bg-[#eaecf1] text-[13px] font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer group"
              >
                <Plus className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 transition-colors" />
                <span>{pill.label}</span>
              </button>
            ))}

            {/* Show More toggle pill button */}
            {availableLinkPills.length > 9 && (
              <button
                type="button"
                onClick={() => setShowMoreLinks(!showMoreLinks)}
                className="px-3.5 py-2 rounded-xl bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-[13px] font-semibold text-[#181236] transition-colors cursor-pointer shadow-2xs"
              >
                {showMoreLinks ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sticky / Bottom Bar with "✓ Done" Button (Matching Screenshot 2) */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-center">
        <button
          type="button"
          onClick={onDone}
          className="w-full max-w-sm h-12 rounded-2xl bg-gradient-to-r from-[#fa2e69] to-[#f03d6d] hover:opacity-95 text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-md shadow-pink-500/20 active:scale-[0.99] transition-all cursor-pointer"
        >
          <Check className="w-4.5 h-4.5 text-white stroke-[2.5]" />
          <span>Done</span>
        </button>
      </div>
    </div>
  );
}
