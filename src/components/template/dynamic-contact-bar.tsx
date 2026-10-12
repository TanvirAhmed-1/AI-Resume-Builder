import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Link2,
  Code,
  BookOpen,
  Briefcase,
  Calendar,
  Flag,
  Shield,
  Award,
  Clock,
  User,
  ExternalLink,
  FileText,
  Share2,
} from "lucide-react";

export interface ContactFieldItem {
  key: string;
  label: string;
  value: string;
  url?: string;
  isLink: boolean;
  displayText: string;
  iconName: string;
}

const FIELD_LABELS_MAP: Record<string, { label: string; icon: string; isLink?: boolean; prefix?: string }> = {
  email: { label: "Email", icon: "mail", isLink: true },
  phone: { label: "Phone", icon: "phone" },
  location: { label: "Location", icon: "map-pin" },
  website: { label: "Website", icon: "globe", isLink: true },
  linkedin: { label: "LinkedIn", icon: "linkedin", isLink: true },
  github: { label: "GitHub", icon: "github", isLink: true },
  gitbook: { label: "GitBook", icon: "book", isLink: true },
  portfolio: { label: "Portfolio", icon: "briefcase", isLink: true },
  medium: { label: "Medium", icon: "file-text", isLink: true },
  x: { label: "X", icon: "link", isLink: true },
  twitter: { label: "Twitter", icon: "link", isLink: true },
  skype: { label: "Skype", icon: "phone", isLink: true },
  threads: { label: "Threads", icon: "link", isLink: true },
  bluesky: { label: "Bluesky", icon: "globe", isLink: true },
  orcid: { label: "ORCID", icon: "award", isLink: true },
  nationality: { label: "Nationality", icon: "flag", prefix: "Nationality: " },
  passport: { label: "Passport", icon: "shield", prefix: "Passport: " },
  dateOfBirth: { label: "Date of Birth", icon: "calendar", prefix: "DOB: " },
  visa: { label: "Visa", icon: "award", prefix: "Visa: " },
  availability: { label: "Availability", icon: "clock", prefix: "Available: " },
  gender: { label: "Gender", icon: "user" },
  disability: { label: "Disability", icon: "user" },
  drivingLicense: { label: "Driving License", icon: "award", prefix: "License: " },
  maritalStatus: { label: "Marital Status", icon: "user" },
  militaryService: { label: "Military Service", icon: "shield" },
  placeOfBirth: { label: "Place of Birth", icon: "map-pin" },
  taxId: { label: "Tax ID", icon: "shield" },
  behance: { label: "Behance", icon: "link", isLink: true },
  dribbble: { label: "Dribbble", icon: "link", isLink: true },
  stackoverflow: { label: "Stack Overflow", icon: "code", isLink: true },
  youtube: { label: "YouTube", icon: "link", isLink: true },
  instagram: { label: "Instagram", icon: "link", isLink: true },
  facebook: { label: "Facebook", icon: "link", isLink: true },
  discord: { label: "Discord", icon: "link", isLink: true },
  customLink: { label: "Link", icon: "link", isLink: true },
};

export function getDynamicContactFields(personalInfo: Record<string, any>): ContactFieldItem[] {
  if (!personalInfo) return [];

  const items: ContactFieldItem[] = [];
  const handledKeys = new Set<string>();

  // Determine key order: start with fieldsOrder if provided, else standard order
  const standardOrder = ["email", "phone", "location", "website", "linkedin", "github"];
  const userOrder: string[] = Array.isArray(personalInfo.fieldsOrder) ? personalInfo.fieldsOrder : [];
  
  // Combine user ordered keys with standard and all keys in personalInfo
  const allAvailableKeys = Array.from(
    new Set([
      ...userOrder,
      ...standardOrder,
      ...Object.keys(personalInfo).filter(
        (k) =>
          ![
            "fullName",
            "headline",
            "avatarUrl",
            "summary",
            "fieldsOrder",
            "customFields",
          ].includes(k) && !k.endsWith("Url")
      ),
    ])
  );

  for (const key of allAvailableKeys) {
    if (handledKeys.has(key)) continue;
    const rawVal = personalInfo[key];
    if (typeof rawVal !== "string" || !rawVal.trim()) continue;

    const val = rawVal.trim();
    const meta = FIELD_LABELS_MAP[key] || {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      icon: "link",
    };

    const isLink = Boolean(
      meta.isLink ||
      val.startsWith("http://") ||
      val.startsWith("https://") ||
      val.startsWith("mailto:") ||
      val.startsWith("tel:") ||
      personalInfo[`${key}Url`]
    );

    const url = personalInfo[`${key}Url`] || (isLink ? (val.startsWith("http") ? val : `https://${val}`) : undefined);

    let displayText = val;
    if (key === "website") {
      displayText = val.replace(/^https?:\/\//, "").replace(/\/$/, "");
    } else if (key === "linkedin") {
      displayText = val.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "in/").replace(/\/$/, "");
    } else if (key === "github") {
      displayText = val.replace(/^https?:\/\/(www\.)?github\.com\//, "gh/").replace(/\/$/, "");
    } else if (meta.prefix && !val.toLowerCase().startsWith(meta.label.toLowerCase())) {
      displayText = `${meta.prefix}${val}`;
    }

    items.push({
      key,
      label: meta.label,
      value: val,
      url,
      isLink,
      displayText,
      iconName: meta.icon,
    });
    handledKeys.add(key);
  }

  // Also include any items in personalInfo.customFields
  if (Array.isArray(personalInfo.customFields)) {
    for (const cf of personalInfo.customFields) {
      if (!cf || !cf.value || handledKeys.has(cf.key || cf.id)) continue;
      items.push({
        key: cf.key || cf.id,
        label: cf.label || "Detail",
        value: cf.value,
        url: cf.linkUrl,
        isLink: Boolean(cf.isLink || cf.linkUrl),
        displayText: cf.label ? `${cf.label}: ${cf.value}` : cf.value,
        iconName: cf.isLink ? "link" : "flag",
      });
      handledKeys.add(cf.key || cf.id);
    }
  }

  return items;
}

export function ContactFieldIcon({
  name,
  className = "w-3.5 h-3.5",
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  switch (name) {
    case "mail":
      return <Mail className={className} style={style} />;
    case "phone":
      return <Phone className={className} style={style} />;
    case "map-pin":
      return <MapPin className={className} style={style} />;
    case "globe":
      return <Globe className={className} style={style} />;
    case "linkedin":
    case "link":
      return <Link2 className={className} style={style} />;
    case "github":
    case "code":
      return <Code className={className} style={style} />;
    case "book":
      return <BookOpen className={className} style={style} />;
    case "briefcase":
      return <Briefcase className={className} style={style} />;
    case "calendar":
      return <Calendar className={className} style={style} />;
    case "flag":
      return <Flag className={className} style={style} />;
    case "shield":
      return <Shield className={className} style={style} />;
    case "award":
      return <Award className={className} style={style} />;
    case "clock":
      return <Clock className={className} style={style} />;
    case "user":
      return <User className={className} style={style} />;
    case "file-text":
      return <FileText className={className} style={style} />;
    default:
      return <ExternalLink className={className} style={style} />;
  }
}

interface DynamicContactBarProps {
  personalInfo: Record<string, any>;
  themeColor?: string;
  className?: string;
  itemClassName?: string;
  separator?: React.ReactNode;
}

export function DynamicContactBar({
  personalInfo,
  themeColor = "#2563eb",
  className = "flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-zinc-600",
  itemClassName = "flex items-center gap-1.5",
  separator,
}: DynamicContactBarProps) {
  const items = getDynamicContactFields(personalInfo);

  if (items.length === 0) return null;

  return (
    <div className={className}>
      {items.map((item, index) => (
        <React.Fragment key={item.key}>
          {index > 0 && separator}
          <div className={itemClassName}>
            <ContactFieldIcon
              name={item.iconName}
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: themeColor }}
            />
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-all"
              >
                {item.displayText}
              </a>
            ) : (
              <span>{item.displayText}</span>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
