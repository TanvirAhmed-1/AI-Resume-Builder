import React from "react";

export function cleanHtmlOrMarkdown(str?: string | null): string {
  if (!str) return "";
  let html = str;

  // Convert markdown bold **word** -> <strong>word</strong>
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert markdown italic *word* -> <em>word</em> (avoiding single asterisk matching inside double)
  html = html.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");

  // Convert markdown links [text](url) -> <a href="url" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">$1</a>
  html = html.replace(
    /\[([^\]]+)\]\(([^)]*)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">$1</a>'
  );

  // If already structured HTML with lists or block containers, return it directly
  if (
    html.includes("<ul") ||
    html.includes("<ol") ||
    html.includes("<div") ||
    html.includes("<p")
  ) {
    return html;
  }

  // Convert bullet points (lines starting with • or - or *) into <ul><li>...</li></ul>
  const rawLines = html.split(/\r?\n/);
  const hasBullets = rawLines.some((l) => /^\s*[•\-\*]\s+/.test(l));

  if (hasBullets) {
    let result = "";
    let inList = false;

    for (const line of rawLines) {
      const match = line.match(/^\s*[•\-\*]\s+(.*)$/);
      if (match) {
        if (!inList) {
          result += '<ul class="list-disc pl-5 my-1 space-y-1">';
          inList = true;
        }
        result += `<li>${match[1]}</li>`;
      } else {
        if (inList) {
          result += "</ul>";
          inList = false;
        }
        if (line.trim()) {
          result += `<div>${line}</div>`;
        } else {
          result += "<br/>";
        }
      }
    }
    if (inList) {
      result += "</ul>";
    }
    return result;
  }

  // If plain text without block tags or <br>, convert \n to <br/>
  if (!html.includes("<br")) {
    html = html.replace(/\r?\n/g, "<br/>");
  }

  return html;
}

export function FormattedResumeText({
  content,
  className = "",
  style,
}: {
  content?: string | null;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (!content) return null;
  const html = cleanHtmlOrMarkdown(content);

  return (
    <div
      className={`rich-resume-text ${className}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

