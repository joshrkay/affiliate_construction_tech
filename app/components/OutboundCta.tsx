import { ExternalLink } from "lucide-react";
import { Link } from "react-router";
import type { CSSProperties, ReactNode } from "react";
import {
  getCtaLabel,
  getOutboundUrl,
  trackOutboundClick,
  type OutboundPlacement,
  type OutboundTool,
} from "../lib/outbound";

type Variant = "primary" | "secondary" | "link";

interface OutboundCtaProps {
  tool: OutboundTool;
  placement: OutboundPlacement;
  /** Override the auto-generated label ("Start Free Trial", "Get a Demo", ...). */
  label?: ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
  /** Hide the external-link icon (e.g. in tight table cells). */
  noIcon?: boolean;
}

const sizeClasses: Record<NonNullable<OutboundCtaProps["size"]>, string> = {
  sm: "py-2 px-3 text-xs",
  md: "py-2.5 px-4 text-sm",
  lg: "py-3.5 px-6 text-base",
};

/**
 * The one way to link out to a vendor. Renders an anchor that:
 *  - uses the affiliate tracking link when present, else the vendor site + UTMs
 *  - carries rel="sponsored" so the links are correctly disclosed to search engines
 *  - fires the `affiliate_click` analytics event with its placement
 */
export function OutboundCta({
  tool,
  placement,
  label,
  variant = "primary",
  size = "md",
  className = "",
  style,
  noIcon = false,
}: OutboundCtaProps) {
  const href = getOutboundUrl(tool, placement);
  const text = label ?? getCtaLabel(tool);

  const base =
    variant === "link"
      ? "inline-flex items-center gap-1 font-medium hover:underline"
      : `inline-flex items-center justify-center gap-1.5 rounded-xl font-semibold transition-all hover:brightness-110 ${sizeClasses[size]}`;

  const variantStyle: CSSProperties =
    variant === "primary"
      ? { backgroundColor: "#f97316", color: "white" }
      : variant === "secondary"
        ? { backgroundColor: "white", color: "#c2410c", border: "1px solid #fdba74" }
        : { color: "#f97316" };

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      data-placement={placement}
      data-tool={tool.slug}
      onClick={() => trackOutboundClick(tool, placement, href)}
      className={`${base} ${className}`}
      style={{ ...variantStyle, ...style }}
    >
      {text}
      {!noIcon && <ExternalLink className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />}
    </a>
  );
}

interface AffiliateDisclosureProps {
  variant?: "dark" | "light";
  className?: string;
}

/**
 * FTC-style disclosure placed next to outbound CTAs. Also a trust signal:
 * readers who see the disclosure next to the button trust the ranking more
 * than readers who find it buried in a footer.
 */
export function AffiliateDisclosure({ variant = "light", className = "" }: AffiliateDisclosureProps) {
  const color = variant === "dark" ? "#64748b" : "#94a3b8";
  const accent = variant === "dark" ? "#fb923c" : "#c2410c";
  return (
    <p className={`text-[11px] leading-snug ${className}`} style={{ color }}>
      We may earn a commission if you sign up through our links. It never changes a rating or rank.{" "}
      <Link to="/methodology" className="underline underline-offset-2" style={{ color: accent }}>
        How we rate tools
      </Link>
    </p>
  );
}
