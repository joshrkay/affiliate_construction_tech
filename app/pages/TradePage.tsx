import { useParams, Link, useNavigate } from "react-router";
import {
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Zap,
  Filter,
  ArrowRight,
  Bot,
  BarChart3,
  TrendingUp,
  GitCompareArrows,
  Check,
  Plus,
} from "lucide-react";
import {
  getTradeBySlug,
  getToolsForTrade,
  tools as allTools,
  Tool,
} from "../data/constructionData";
import { ToolCard } from "../components/ToolCard";
import { StarRating } from "../components/StarRating";
import { NotFound } from "./NotFound";
import { useState } from "react";
import { useApp } from "../context/AppContext";

type FilterType = "All" | "Software" | "AI Agent" | "Platform";

export function TradePage() {
  const { slug } = useParams<{ slug: string }>();
  const [filter, setFilter] = useState<FilterType>("All");
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "name">("rating");
  const navigate = useNavigate();
  const { addToCompare, removeFromCompare, isInCompare, compareList, setCompareTradeSlug } = useApp();

  const trade = getTradeBySlug(slug || "");

  if (!trade) return <NotFound />;

  const tradeTools = getToolsForTrade(trade.id);

  const filtered = tradeTools
    .filter((t) => filter === "All" || t.category === filter)
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
      return a.name.localeCompare(b.name);
    });

  const topTool = tradeTools.sort((a, b) => b.rating - a.rating)[0];
  const aiTools = tradeTools.filter((t) => t.category === "AI Agent");
  const avgRating =
    tradeTools.reduce((sum, t) => sum + t.rating, 0) / tradeTools.length;

  const categoryColors: Record<FilterType, { active: string; text: string }> = {
    All: { active: "#f97316", text: "white" },
    Software: { active: "#15803d", text: "white" },
    "AI Agent": { active: "#7c3aed", text: "white" },
    Platform: { active: "#1d4ed8", text: "white" },
  };

  const handleCompareSelected = () => {
    setCompareTradeSlug(trade.slug);
    const toolIds = compareList.map((t) => t.id).join(",");
    navigate(`/compare?tools=${toolIds}&trade=${trade.slug}`);
  };

  const currentYear = new Date().getFullYear();
  const canonicalUrl = `https://bestconstructionapps.com/trades/${slug}`;
  const metaDescription = `Compare the top ${tradeTools.length} ${trade.name} software tools rated by real contractors. Find AI-powered and traditional solutions for ${trade.name} businesses in ${currentYear}.`;

  // Build FAQ content from trade data
  const faqItems = [
    {
      question: `What is ${trade.name} software?`,
      answer: trade.overview,
    },
    {
      question: `What are the key challenges in ${trade.name}?`,
      answer: trade.challenges.join(". ") + ".",
    },
    {
      question: `Why should ${trade.name} companies use AI software?`,
      answer: trade.whyAI.join(" "),
    },
    {
      question: `What is the best ${trade.name} software in ${currentYear}?`,
      answer: `The top-rated ${trade.name} software in ${currentYear} is ${topTool?.name} with a ${topTool?.rating.toFixed(1)}/5 rating from ${topTool?.reviewCount.toLocaleString()} reviews. Other top options include ${tradeTools.slice(1, 4).map((t) => t.name).join(", ")}.`,
    },
  ];

  return (
    <div>
      <title>Best {trade.name} Software ({currentYear}) — Top AI & Tools | BUILTECH</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={`Best ${trade.name} Software (${currentYear}) — Top AI & Tools`} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="BUILTECH" />
      <meta property="og:image" content="https://bestconstructionapps.com/og-default.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`Best ${trade.name} Software (${currentYear}) | BUILTECH`} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content="https://bestconstructionapps.com/og-default.png" />

      {/* ItemList Schema for ranked tools */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": `Best ${trade.name} Software (${currentYear})`,
          "description": metaDescription,
          "numberOfItems": tradeTools.length,
          "itemListOrder": "https://schema.org/ItemListOrderDescending",
          "itemListElement": tradeTools
            .sort((a, b) => b.rating - a.rating)
            .map((t, idx) => ({
              "@type": "ListItem",
              "position": idx + 1,
              "name": t.name,
              "url": `https://bestconstructionapps.com/tools/${t.slug}`,
              "item": {
                "@type": "SoftwareApplication",
                "name": t.name,
                "description": t.tagline,
                "applicationCategory": "BusinessApplication",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": t.rating.toFixed(1),
                  "ratingCount": t.reviewCount
                }
              }
            }))
        })}
      </script>

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bestconstructionapps.com/" },
            { "@type": "ListItem", "position": 2, "name": "Trades", "item": "https://bestconstructionapps.com/" },
            { "@type": "ListItem", "position": 3, "name": trade.name, "item": canonicalUrl }
          ]
        })}
      </script>

      {/* FAQPage Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        })}
      </script>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ backgroundColor: "#0c1a2e" }}>
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url(${trade.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, #0c1a2e 50%, ${trade.accentColor}22 100%)`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: "#64748b" }}>
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Trades</span>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: "#fb923c" }}>{trade.name}</span>
          </nav>

          <div className="flex items-start gap-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shrink-0 shadow-lg"
              style={{ backgroundColor: `${trade.accentColor}33` }}
            >
              {trade.emoji}
            </div>
            <div>
              <div
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full mb-3"
                style={{ backgroundColor: `${trade.accentColor}22`, color: "#fb923c" }}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                {tradeTools.length} Tools Reviewed
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Best AI & Software for{" "}
                <span style={{ color: "#fb923c" }}>{trade.name}</span>
              </h1>
              <p className="mt-2 text-lg" style={{ color: "#94a3b8" }}>
                {trade.tagline}
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Tools Listed", value: tradeTools.length.toString() },
              { label: "Avg. Rating", value: avgRating.toFixed(1) + " ★" },
              { label: "AI Tools", value: aiTools.length.toString() },
              { label: "Top Pick", value: topTool?.name || "—" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <p className="text-xs" style={{ color: "#64748b" }}>
                  {stat.label}
                </p>
                <p className="text-white font-bold mt-0.5 text-lg">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* What is this trade */}
            <section className="bg-white rounded-2xl border p-8" style={{ borderColor: "#e2e8f0" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#0f172a" }}>
                What is {trade.name}?
              </h2>
              <p className="leading-relaxed" style={{ color: "#374151" }}>
                {trade.overview}
              </p>

              <h3 className="text-base font-semibold mt-7 mb-3" style={{ color: "#0f172a" }}>
                Key Challenges in {trade.name}
              </h3>
              <ul className="space-y-2">
                {trade.challenges.map((challenge) => (
                  <li key={challenge} className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
                    <span className="text-sm" style={{ color: "#374151" }}>
                      {challenge}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Why AI & Software */}
            <section
              className="rounded-2xl p-8 border"
              style={{
                background: "linear-gradient(135deg, #0c1a2e 0%, #1e1b4b 100%)",
                borderColor: "#1e3a5f",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(249,115,22,0.2)" }}
                >
                  <Zap className="w-5 h-5" style={{ color: "#f97316" }} />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Why AI & Software Matter for {trade.name}
                </h2>
              </div>
              <div className="space-y-4">
                {trade.whyAI.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-white"
                      style={{ backgroundColor: "#f97316" }}
                    >
                      {idx + 1}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#cbd5e1" }}>
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Tool Rankings */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold" style={{ color: "#0f172a" }}>
                  Ranked Tools for {trade.name}
                </h2>
                {compareList.length >= 2 && (
                  <button
                    onClick={handleCompareSelected}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: "#f97316" }}
                  >
                    <GitCompareArrows className="w-4 h-4" />
                    Compare {compareList.length} Tools
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-5">
                <div className="flex gap-1 p-1 rounded-xl" style={{ backgroundColor: "#f1f5f9" }}>
                  {(["All", "Software", "AI Agent", "Platform"] as FilterType[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        backgroundColor: filter === f ? categoryColors[f].active : "transparent",
                        color: filter === f ? categoryColors[f].text : "#64748b",
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <div className="ml-auto flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5" style={{ color: "#94a3b8" }} />
                  <select
                    className="text-xs border rounded-lg px-2 py-1.5 bg-white outline-none"
                    style={{ borderColor: "#e2e8f0", color: "#374151" }}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviewed</option>
                    <option value="name">Alphabetical</option>
                  </select>
                </div>
              </div>

              {/* Tool list */}
              <div className="space-y-4">
                {filtered.map((tool, idx) => (
                  <RankedToolRow
                    key={tool.id}
                    tool={tool}
                    rank={idx + 1}
                    inCompare={isInCompare(tool.id)}
                    compareMax={compareList.length >= 4 && !isInCompare(tool.id)}
                    onToggleCompare={() => {
                      if (isInCompare(tool.id)) {
                        removeFromCompare(tool.id);
                      } else {
                        addToCompare(tool);
                        setCompareTradeSlug(trade.slug);
                      }
                    }}
                  />
                ))}
                {filtered.length === 0 && (
                  <div className="text-center py-10" style={{ color: "#64748b" }}>
                    No tools found in this category.
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Pick */}
            {topTool && (
              <div
                className="rounded-2xl p-6 border"
                style={{ backgroundColor: "#fffbeb", borderColor: "#fde68a" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4" style={{ color: "#d97706" }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#d97706" }}>
                    Top Pick
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: topTool.logoColor }}
                  >
                    {topTool.logoInitials}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#0f172a" }}>
                      {topTool.name}
                    </p>
                    <p className="text-xs" style={{ color: "#64748b" }}>
                      {topTool.type}
                    </p>
                  </div>
                </div>
                <StarRating rating={topTool.rating} showValue />
                <p className="text-xs mt-3 leading-relaxed" style={{ color: "#374151" }}>
                  {topTool.tagline}
                </p>
                <Link
                  to={`/tools/${topTool.slug}`}
                  className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:brightness-110"
                  style={{ backgroundColor: "#d97706" }}
                >
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* AI Tools */}
            {aiTools.length > 0 && (
              <div
                className="rounded-2xl p-6 border"
                style={{ backgroundColor: "#faf5ff", borderColor: "#e9d5ff" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="w-4 h-4" style={{ color: "#7c3aed" }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#7c3aed" }}>
                    AI Tools ({aiTools.length})
                  </span>
                </div>
                <div className="space-y-3">
                  {aiTools.map((tool) => (
                    <Link
                      key={tool.id}
                      to={`/tools/${tool.slug}`}
                      className="flex items-center gap-3 group"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: tool.logoColor }}
                      >
                        {tool.logoInitials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold group-hover:text-purple-700 transition-colors" style={{ color: "#1e293b" }}>
                          {tool.name}
                        </p>
                        <p className="text-xs truncate" style={{ color: "#94a3b8" }}>
                          {tool.type}
                        </p>
                      </div>
                      <div className="shrink-0 text-xs font-bold" style={{ color: "#7c3aed" }}>
                        ★ {tool.rating}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Section for GEO */}
            <div className="rounded-2xl p-6 bg-white border" style={{ borderColor: "#e2e8f0" }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: "#0f172a" }}>
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqItems.map((item, idx) => (
                  <details key={idx} className="group">
                    <summary className="text-sm font-medium cursor-pointer list-none flex items-start gap-2" style={{ color: "#374151" }}>
                      <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 transition-transform group-open:rotate-90" style={{ color: "#f97316" }} />
                      {item.question}
                    </summary>
                    <p className="text-xs mt-2 ml-6 leading-relaxed" style={{ color: "#64748b" }}>
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            {/* Other Trades */}
            <div className="rounded-2xl p-6 bg-white border" style={{ borderColor: "#e2e8f0" }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: "#0f172a" }}>
                Browse Other Trades
              </h3>
              <div className="space-y-2">
                {[
                  { id: "general-contracting", name: "General Contracting", emoji: "🏗️" },
                  { id: "electrical", name: "Electrical", emoji: "⚡" },
                  { id: "plumbing", name: "Plumbing", emoji: "🔧" },
                  { id: "hvac", name: "HVAC", emoji: "🌡️" },
                  { id: "roofing", name: "Roofing", emoji: "🏠" },
                  { id: "estimating-bidding", name: "Estimating", emoji: "📊" },
                ]
                  .filter((t) => t.id !== trade.id)
                  .slice(0, 5)
                  .map((t) => (
                    <Link
                      key={t.id}
                      to={`/trades/${t.id}`}
                      className="flex items-center gap-2 text-sm py-1.5 hover:text-orange-500 transition-colors"
                      style={{ color: "#374151" }}
                    >
                      <span>{t.emoji}</span>
                      <span>{t.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-auto" style={{ color: "#cbd5e1" }} />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RankedToolRow({
  tool,
  rank,
  inCompare,
  compareMax,
  onToggleCompare,
}: {
  tool: Tool;
  rank: number;
  inCompare: boolean;
  compareMax: boolean;
  onToggleCompare: () => void;
}) {
  const catColors: Record<string, { bg: string; text: string }> = {
    "AI Agent": { bg: "#faf5ff", text: "#7c3aed" },
    Platform: { bg: "#eff6ff", text: "#1d4ed8" },
    Software: { bg: "#f0fdf4", text: "#15803d" },
  };
  const cat = catColors[tool.category] || catColors["Software"];

  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="group flex items-center gap-4 bg-white rounded-2xl border p-4 hover:shadow-lg transition-all duration-200"
      style={{ borderColor: "#e2e8f0" }}
    >
      {/* Rank */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
        style={{
          backgroundColor:
            rank === 1 ? "#f59e0b" : rank === 2 ? "#94a3b8" : rank === 3 ? "#cd7c4f" : "#f1f5f9",
          color: rank <= 3 ? "white" : "#64748b",
        }}
      >
        {rank}
      </div>

      {/* Logo */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm"
        style={{ backgroundColor: tool.logoColor }}
      >
        {tool.logoInitials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm" style={{ color: "#0f172a" }}>
            {tool.name}
          </p>
          {tool.verified && (
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: "#0891b2" }} />
          )}
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: cat.bg, color: cat.text }}
          >
            {tool.category}
          </span>
        </div>
        <p className="text-xs truncate mt-0.5" style={{ color: "#64748b" }}>
          {tool.tagline}
        </p>
        <div className="flex items-center gap-3 mt-1.5">
          <StarRating rating={tool.rating} size="sm" />
          <span className="text-xs font-semibold" style={{ color: "#1e293b" }}>
            {tool.rating.toFixed(1)}
          </span>
          <span className="text-xs" style={{ color: "#94a3b8" }}>
            ({tool.reviewCount.toLocaleString()} reviews)
          </span>
        </div>
      </div>

      {/* Price + Arrow */}
      <div className="text-right shrink-0 flex flex-col items-end gap-2">
        <div>
          <p className="text-xs" style={{ color: "#94a3b8" }}>
            from
          </p>
          <p className="text-sm font-bold" style={{ color: "#0f172a" }}>
            {tool.price}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!compareMax) onToggleCompare();
          }}
          title={inCompare ? "Remove from compare" : compareMax ? "Compare list full" : "Add to compare"}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition-all"
          style={{
            backgroundColor: inCompare ? "#fff7ed" : "white",
            borderColor: inCompare ? "#f97316" : "#e2e8f0",
            color: inCompare ? "#f97316" : "#94a3b8",
            opacity: compareMax ? 0.4 : 1,
            cursor: compareMax ? "not-allowed" : "pointer",
          }}
        >
          {inCompare ? <Check className="w-3.5 h-3.5" /> : <GitCompareArrows className="w-3.5 h-3.5" />}
          {inCompare ? "Added" : "Compare"}
        </button>
        <ArrowRight
          className="w-4 h-4 ml-auto group-hover:translate-x-0.5 transition-transform"
          style={{ color: "#f97316" }}
        />
      </div>
    </Link>
  );
}