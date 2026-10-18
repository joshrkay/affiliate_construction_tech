import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { tools, trades } from "../data/constructionData";
import { StarRating } from "../components/StarRating";
import { ToolLogo } from "../components/ToolLogo";
import { PageByline } from "../components/PageByline";
import { OutboundCta } from "../components/OutboundCta";
import { AffiliateDisclosure } from "../components/OutboundCta";
import { getShortCtaLabel } from "../lib/outbound";
import { defaultDateModified, defaultDatePublished } from "../data/editorial";

const MIN_REVIEWS = 100;

/** Highest-rated tools in the directory, computed from the same data every other page uses. */
export function TopRatedPage() {
  const year = new Date().getFullYear();
  const ranked = tools
    .filter((t) => !t.duplicateOf && t.reviewCount >= MIN_REVIEWS)
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, 20);
  const tradeName = (id: string) => trades.find((t) => t.id === id)?.name;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>
      <title>Top Rated Construction Software ({year})</title>
      <meta name="description" content={`The ${ranked.length} highest-rated construction software tools with at least ${MIN_REVIEWS} aggregated contractor reviews, with starting prices and the trades each one fits.`} />
      <link rel="canonical" href="https://bestconstructionapps.com/top-rated" />

      <div className="bg-white border-b" style={{ borderColor: "#e2e8f0" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-3xl md:text-4xl font-medium mb-3" style={{ color: "#1a1714" }}>
            Top Rated Construction Software
          </h1>
          <p className="text-lg max-w-2xl mb-4" style={{ color: "#4b4640" }}>
            Every tool in the directory with at least {MIN_REVIEWS} aggregated contractor reviews, ranked by rating. Ties go to the tool with more reviews.
          </p>
          <PageByline dateModified={defaultDateModified} datePublished={defaultDatePublished} variant="light" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ol className="space-y-3">
          {ranked.map((tool, idx) => (
            <li key={tool.id} className="bg-white rounded-xl border p-4 sm:p-5" style={{ borderColor: "#e2e8f0" }}>
              <div className="flex flex-wrap items-center gap-4">
                <span className="w-8 text-lg font-semibold tabular-nums shrink-0" style={{ color: idx < 3 ? "#c2410c" : "#94a3b8" }}>
                  {idx + 1}
                </span>
                <ToolLogo tool={tool} className="w-12 h-12 rounded-lg" />
                <div className="flex-1 min-w-[12rem]">
                  <Link to={`/tools/${tool.slug}`} className="text-lg font-semibold hover:underline" style={{ color: "#0f172a" }}>
                    {tool.name}
                  </Link>
                  <p className="text-sm" style={{ color: "#64748b" }}>{tool.tagline}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="flex items-center gap-1.5">
                      <StarRating rating={tool.rating} size="sm" />
                      <strong style={{ color: "#0f172a" }}>{tool.rating.toFixed(1)}</strong>
                    </span>
                    <span style={{ color: "#94a3b8" }}>{tool.reviewCount.toLocaleString()} reviews</span>
                    <span style={{ color: "#94a3b8" }}>from {tool.price}</span>
                    <span style={{ color: "#94a3b8" }}>
                      {tool.tradeIds.slice(0, 2).map(tradeName).filter(Boolean).join(", ")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium border"
                    style={{ color: "#374151", borderColor: "#e2e8f0" }}
                  >
                    Review <ChevronRight className="w-4 h-4" />
                  </Link>
                  <OutboundCta tool={tool} placement="tool_card" label={getShortCtaLabel(tool)} size="sm" className="rounded-lg" />
                </div>
              </div>
            </li>
          ))}
        </ol>
        <AffiliateDisclosure className="mt-6" />
      </div>
    </div>
  );
}
