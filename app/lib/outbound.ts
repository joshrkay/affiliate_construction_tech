/**
 * Outbound (vendor) link helpers — the site's conversion event.
 *
 * Every click that leaves BUILTECH for a vendor goes through here so that:
 *  1. the href is the affiliate tracking link when one exists, else the
 *     vendor site with UTM attribution;
 *  2. the click is recorded as a GA4 `affiliate_click` event (plus Vercel
 *     Analytics when present) with the tool and the on-page placement;
 *  3. the CTA label reflects the real next step (free trial / demo / pricing).
 */

export interface OutboundTool {
  id?: string;
  slug: string;
  name: string;
  website: string;
  /** Visitor-facing affiliate tracking link. Leave unset until the program approves us. */
  affiliateUrl?: string;
  price?: string;
  priceNote?: string;
}

/** Where on the page the click happened — used for CTA placement reporting. */
export type OutboundPlacement =
  | "tool_hero"
  | "tool_sidebar"
  | "tool_bottom_line"
  | "tool_sticky"
  | "tool_card"
  | "trade_top_pick"
  | "best_for_card"
  | "category_card"
  | "comparison_verdict"
  | "comparison_card"
  | "compare_builder"
  | "pricing_hero"
  | "cost_calculator"
  | "guide_top_picks"
  | "home_top_pick";

const UTM_SOURCE = "bestconstructionapps";
const UTM_MEDIUM = "referral";

/**
 * Returns the URL a visitor should land on.
 * Affiliate tracking links are passed through untouched (networks often reject
 * unknown query params). Plain vendor URLs get UTM attribution so the vendor
 * can see BUILTECH traffic in their own analytics — useful when negotiating a
 * program later.
 */
export function getOutboundUrl(tool: OutboundTool, placement: OutboundPlacement): string {
  if (tool.affiliateUrl) return tool.affiliateUrl;
  try {
    const url = new URL(tool.website);
    if (!url.searchParams.has("utm_source")) {
      url.searchParams.set("utm_source", UTM_SOURCE);
      url.searchParams.set("utm_medium", UTM_MEDIUM);
      url.searchParams.set("utm_campaign", tool.slug);
      url.searchParams.set("utm_content", placement);
    }
    return url.toString();
  } catch {
    return tool.website;
  }
}

export function hasAffiliateLink(tool: OutboundTool): boolean {
  return Boolean(tool.affiliateUrl);
}

/**
 * CTA copy that names the real next step instead of "Visit Website".
 */
export function getCtaLabel(tool: OutboundTool): string {
  const text = `${tool.price ?? ""} ${tool.priceNote ?? ""}`.toLowerCase();
  if (text.includes("free trial")) return "Start Free Trial";
  if ((tool.price ?? "").trim().toLowerCase() === "free" || text.includes("free tier") || text.includes("free plan")) {
    return "Get Started Free";
  }
  if (/(contact|custom|quote|enterprise pricing|sales)/.test(text)) return "Get a Demo";
  if ((tool.price ?? "").includes("$")) return "See Plans & Pricing";
  return `Visit ${tool.name}`;
}

/** Short, secondary-button-sized variant of getCtaLabel. */
export function getShortCtaLabel(tool: OutboundTool): string {
  const label = getCtaLabel(tool);
  if (label === "Start Free Trial") return "Free Trial";
  if (label === "Get Started Free") return "Try Free";
  if (label === "Get a Demo") return "Get Demo";
  if (label === "See Plans & Pricing") return "See Pricing";
  return "Visit Site";
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    va?: (event: "event", name: string, data?: Record<string, string | number | boolean>) => void;
  }
}

/**
 * Records the conversion event. Safe to call during SSR (no-op) and when
 * analytics is blocked.
 */
export function trackOutboundClick(tool: OutboundTool, placement: OutboundPlacement, href: string): void {
  if (typeof window === "undefined") return;
  const payload = {
    tool_id: tool.id ?? tool.slug,
    tool_name: tool.name,
    placement,
    page_path: window.location.pathname,
    link_url: href,
    affiliate_link: hasAffiliateLink(tool),
  };
  try {
    window.gtag?.("event", "affiliate_click", payload);
  } catch {
    /* analytics blocked */
  }
  try {
    window.va?.("event", "affiliate_click", payload);
  } catch {
    /* analytics blocked */
  }
}
