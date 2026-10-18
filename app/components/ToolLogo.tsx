import { useState } from "react";

interface ToolLogoProps {
  tool: { name: string; website: string; logoColor: string; logoInitials: string };
  /** Size and shape classes for the outer box, e.g. "w-12 h-12 rounded-xl". */
  className?: string;
}

function domainOf(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/**
 * Real vendor mark instead of colored initials. Uses the vendor's own favicon
 * (served by Google's favicon cache, no vendor request from the visitor's
 * browser) on a white tile, and falls back to initials if it fails to load.
 */
export function ToolLogo({ tool, className = "w-12 h-12 rounded-xl" }: ToolLogoProps) {
  const [failed, setFailed] = useState(false);
  const domain = domainOf(tool.website);
  const src = domain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128` : null;

  if (!src || failed) {
    return (
      <div
        className={`${className} flex items-center justify-center font-semibold text-white shrink-0`}
        style={{ backgroundColor: tool.logoColor, fontSize: "0.8em" }}
        aria-label={tool.name}
      >
        {tool.logoInitials}
      </div>
    );
  }
  return (
    <div
      className={`${className} flex items-center justify-center shrink-0 bg-white border overflow-hidden`}
      style={{ borderColor: "#e5e7eb" }}
    >
      <img
        src={src}
        alt={`${tool.name} logo`}
        width={32}
        height={32}
        loading="lazy"
        className="w-[60%] h-[60%] object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
