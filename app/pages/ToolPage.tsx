import { useParams, Link } from "react-router";
import {
  ChevronRight,
  CheckCircle,
  CheckCircle2,
  XCircle,
  Star,
  ThumbsUp,
  ExternalLink,
  Shield,
  Calendar,
  Building2,
  DollarSign,
  Award,
  ChevronDown,
  ChevronUp,
  Bot,
  Globe,
  GitCompareArrows,
  Check,
} from "lucide-react";
import {
  getToolBySlug,
  getReviewsForTool,
  tools as allTools,
  trades,
  Review,
} from "../data/constructionData";
import { StarRating } from "../components/StarRating";
import { ToolCard } from "../components/ToolCard";
import { NotFound } from "./NotFound";
import { useState } from "react";
import { useApp } from "../context/AppContext";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "AI Agent": { bg: "#faf5ff", text: "#7c3aed", border: "#e9d5ff" },
  Platform: { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  Software: { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
};

export function ToolPage() {
  const { slug } = useParams<{ slug: string }>();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<number | null>(null);
  const {
    openReviewModal,
    addToCompare,
    removeFromCompare,
    isInCompare,
    compareList,
    setCompareTradeSlug,
    localReviews,
  } = useApp();

  const tool = getToolBySlug(slug || "");
  if (!tool) return <NotFound />;

  const seedReviews = getReviewsForTool(tool.id);
  const userReviews = localReviews.filter((r) => r.toolId === tool.id);
  const reviews = [...userReviews, ...seedReviews];
  const toolTrades = trades.filter((t) => tool.tradeIds.includes(t.id));
  const relatedTools = allTools
    .filter((t) => t.id !== tool.id && t.tradeIds.some((tid) => tool.tradeIds.includes(tid)))
    .slice(0, 3);

  const catStyle = categoryColors[tool.category] || categoryColors["Software"];

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
    pct:
      reviews.length > 0
        ? (reviews.filter((r) => Math.round(r.rating) === star).length / reviews.length) * 100
        : 0,
  }));

  const filteredReviews = reviewFilter
    ? reviews.filter((r) => Math.round(r.rating) === reviewFilter)
    : reviews;
  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 3);

  const inCompare = isInCompare(tool.id);
  const compareMax = compareList.length >= 4 && !inCompare;

  const handleCompareToggle = () => {
    if (inCompare) {
      removeFromCompare(tool.id);
    } else if (!compareMax) {
      addToCompare(tool);
      if (toolTrades[0]) setCompareTradeSlug(toolTrades[0].slug);
    }
  };

  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: "#0c1a2e" }} className="border-b" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap" style={{ color: "#64748b" }}>
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            {toolTrades[0] && (
              <>
                <Link
                  to={`/trades/${toolTrades[0].slug}`}
                  className="hover:text-white transition-colors"
                >
                  {toolTrades[0].name}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            <span style={{ color: "#fb923c" }}>{tool.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Logo */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg"
              style={{ backgroundColor: tool.logoColor }}
            >
              {tool.logoInitials}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{tool.name}</h1>
                {tool.verified && (
                  <div
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: "rgba(8,145,178,0.2)", color: "#22d3ee" }}
                  >
                    <Shield className="w-3 h-3" />
                    Verified
                  </div>
                )}
                {tool.overallRank && tool.overallRank <= 5 && (
                  <div
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: "rgba(245,158,11,0.2)", color: "#fbbf24" }}
                  >
                    <Award className="w-3 h-3" />
                    #{tool.overallRank} Overall
                  </div>
                )}
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-medium border"
                  style={{
                    backgroundColor: `${catStyle.bg}22`,
                    color: catStyle.text === "#7c3aed" ? "#c084fc" : catStyle.text === "#1d4ed8" ? "#60a5fa" : "#4ade80",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                >
                  {tool.category === "AI Agent" && <Bot className="w-3 h-3 inline mr-1" />}
                  {tool.category}
                </span>
              </div>

              <p className="text-lg" style={{ color: "#94a3b8" }}>
                {tool.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-5 mt-4">
                <div className="flex items-center gap-2">
                  <StarRating rating={tool.rating} size="lg" />
                  <span className="text-white font-bold text-xl">{tool.rating.toFixed(1)}</span>
                  <span style={{ color: "#64748b" }}>
                    ({tool.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {toolTrades.map((t) => (
                    <Link
                      key={t.id}
                      to={`/trades/${t.slug}`}
                      className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border hover:bg-white/5 transition-colors"
                      style={{ borderColor: "#1e3a5f", color: "#94a3b8" }}
                    >
                      {t.emoji} {t.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div
              className="shrink-0 p-5 rounded-2xl border text-center md:w-52"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "#1e3a5f" }}
            >
              <p className="text-xs" style={{ color: "#64748b" }}>
                Starting Price
              </p>
              <p className="text-2xl font-bold text-white mt-1">{tool.price}</p>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: "#64748b" }}>
                {tool.priceNote}
              </p>
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:brightness-110"
                style={{ backgroundColor: "#f97316" }}
              >
                Visit Website <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => openReviewModal(tool.id)}
                className="mt-2 w-full py-2.5 rounded-xl text-sm font-medium border transition-colors hover:bg-white/5"
                style={{ color: "#94a3b8", borderColor: "#1e3a5f" }}
              >
                Write a Review
              </button>
              <button
                onClick={handleCompareToggle}
                disabled={compareMax}
                className="mt-2 w-full py-2.5 rounded-xl text-sm font-medium border flex items-center justify-center gap-1.5 transition-all hover:bg-white/5 disabled:opacity-40"
                style={{
                  color: inCompare ? "#fb923c" : "#94a3b8",
                  borderColor: inCompare ? "#f97316" : "#1e3a5f",
                }}
              >
                {inCompare ? (
                  <><Check className="w-4 h-4" /> In Compare</>
                ) : (
                  <><GitCompareArrows className="w-4 h-4" /> Add to Compare</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-white rounded-2xl border p-7" style={{ borderColor: "#e2e8f0" }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: "#0f172a" }}>
                About {tool.name}
              </h2>
              <p className="leading-relaxed" style={{ color: "#374151" }}>
                {tool.description}
              </p>

              {/* Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t" style={{ borderColor: "#f1f5f9" }}>
                {[
                  { icon: Calendar, label: "Founded", value: tool.yearFounded.toString() },
                  { icon: Building2, label: "Company Size", value: tool.companySize + " employees" },
                  { icon: Globe, label: "Type", value: tool.type },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#f8fafc" }}
                    >
                      <item.icon className="w-4 h-4" style={{ color: "#64748b" }} />
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: "#94a3b8" }}>
                        {item.label}
                      </p>
                      <p className="text-sm font-medium" style={{ color: "#1e293b" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Features */}
            <section className="bg-white rounded-2xl border p-7" style={{ borderColor: "#e2e8f0" }}>
              <h2 className="text-lg font-bold mb-5" style={{ color: "#0f172a" }}>
                Key Features
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {tool.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#16a34a" }} />
                    <span className="text-sm" style={{ color: "#374151" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Pros & Cons */}
            <section className="grid sm:grid-cols-2 gap-5">
              <div
                className="rounded-2xl border p-6"
                style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" }}
              >
                <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: "#15803d" }}>
                  <CheckCircle className="w-5 h-5" />
                  Pros
                </h3>
                <ul className="space-y-2.5">
                  {tool.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm" style={{ color: "#166534" }}>
                      <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#16a34a" }} />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="rounded-2xl border p-6"
                style={{ backgroundColor: "#fff1f2", borderColor: "#fecdd3" }}
              >
                <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: "#b91c1c" }}>
                  <XCircle className="w-5 h-5" />
                  Cons
                </h3>
                <ul className="space-y-2.5">
                  {tool.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm" style={{ color: "#991b1b" }}>
                      <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#dc2626" }} />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Reviews */}
            <section id="reviews">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold" style={{ color: "#0f172a" }}>
                  User Reviews
                </h2>
                <button
                  className="text-sm font-medium px-4 py-2 rounded-xl border hover:bg-white transition-colors"
                  style={{ color: "#f97316", borderColor: "#fed7aa" }}
                  onClick={() => openReviewModal(tool.id)}
                >
                  Write a Review
                </button>
              </div>

              {userReviews.length > 0 && (
                <div
                  className="p-3 rounded-xl border mb-4 flex items-center gap-2"
                  style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" }}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#16a34a" }} />
                  <p className="text-xs" style={{ color: "#166534" }}>
                    {userReviews.length} new review{userReviews.length > 1 ? "s" : ""} submitted in this session — pending moderation.
                  </p>
                </div>
              )}

              {/* Rating Summary */}
              <div className="bg-white rounded-2xl border p-6 mb-5" style={{ borderColor: "#e2e8f0" }}>
                <div className="flex gap-8 items-center">
                  <div className="text-center shrink-0">
                    <p className="text-5xl font-bold" style={{ color: "#0f172a" }}>
                      {tool.rating.toFixed(1)}
                    </p>
                    <StarRating rating={tool.rating} size="md" />
                    <p className="text-xs mt-1" style={{ color: "#64748b" }}>
                      {tool.reviewCount.toLocaleString()} reviews
                    </p>
                  </div>
                  <div className="flex-1">
                    {ratingBreakdown.map(({ star, count, pct }) => (
                      <button
                        key={star}
                        onClick={() => setReviewFilter(reviewFilter === star ? null : star)}
                        className="flex items-center gap-2 w-full mb-1.5 group"
                      >
                        <span className="text-xs w-4 shrink-0 text-right" style={{ color: "#64748b" }}>
                          {star}
                        </span>
                        <Star className="w-3 h-3 shrink-0" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#f1f5f9" }}>
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: reviewFilter === star ? "#f97316" : "#f59e0b",
                            }}
                          />
                        </div>
                        <span className="text-xs w-6 shrink-0" style={{ color: "#94a3b8" }}>
                          {count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                {reviewFilter && (
                  <button
                    onClick={() => setReviewFilter(null)}
                    className="mt-3 text-xs flex items-center gap-1 hover:underline"
                    style={{ color: "#f97316" }}
                  >
                    Clear filter — show all reviews
                  </button>
                )}
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                {displayedReviews.length > 0 ? (
                  displayedReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))
                ) : (
                  <div
                    className="text-center py-10 rounded-2xl border"
                    style={{ backgroundColor: "#f8fafc", borderColor: "#e2e8f0", color: "#64748b" }}
                  >
                    No reviews yet. Be the first to share your experience!
                  </div>
                )}
              </div>

              {filteredReviews.length > 3 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="mt-4 w-full py-3 rounded-xl border font-medium text-sm flex items-center justify-center gap-2 transition-colors hover:bg-white"
                  style={{ borderColor: "#e2e8f0", color: "#374151" }}
                >
                  {showAllReviews ? (
                    <>
                      Show Less <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Show All {filteredReviews.length} Reviews <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-2xl border p-6" style={{ borderColor: "#e2e8f0" }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: "#0f172a" }}>
                Quick Info
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Category", value: tool.category },
                  { label: "Type", value: tool.type },
                  { label: "Price", value: tool.price },
                  { label: "Founded", value: tool.yearFounded.toString() },
                  { label: "Company Size", value: tool.companySize + " emp." },
                  {
                    label: "Verified",
                    value: tool.verified ? "✓ Verified Listing" : "Unverified",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-2 border-b"
                    style={{ borderColor: "#f1f5f9" }}
                  >
                    <span className="text-xs" style={{ color: "#94a3b8" }}>
                      {item.label}
                    </span>
                    <span className="text-xs font-medium" style={{ color: "#1e293b" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:brightness-110"
                style={{ backgroundColor: "#f97316" }}
              >
                Visit {tool.name} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Trades */}
            <div className="bg-white rounded-2xl border p-6" style={{ borderColor: "#e2e8f0" }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: "#0f172a" }}>
                Best For These Trades
              </h3>
              <div className="space-y-2">
                {toolTrades.map((t) => (
                  <Link
                    key={t.id}
                    to={`/trades/${t.slug}`}
                    className="flex items-center gap-2.5 py-2 group"
                  >
                    <span className="text-lg">{t.emoji}</span>
                    <span
                      className="text-sm group-hover:text-orange-500 transition-colors"
                      style={{ color: "#374151" }}
                    >
                      {t.name}
                    </span>
                    <ChevronRight className="w-4 h-4 ml-auto" style={{ color: "#cbd5e1" }} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <div>
                <h3 className="font-bold text-sm mb-3" style={{ color: "#0f172a" }}>
                  Similar Tools
                </h3>
                <div className="space-y-3">
                  {relatedTools.map((t) => (
                    <ToolCard key={t.id} tool={t} compact />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-2xl border p-6" style={{ borderColor: "#e2e8f0" }}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ backgroundColor: review.avatarColor }}
          >
            {review.author[0]}
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: "#0f172a" }}>
              {review.author}
            </p>
            <p className="text-xs" style={{ color: "#64748b" }}>
              {review.role} · {review.company}
            </p>
            <p className="text-xs" style={{ color: "#94a3b8" }}>
              {review.location} · {review.date}
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <StarRating rating={review.rating} size="sm" />
        </div>
      </div>

      <h4 className="font-semibold mt-4 text-sm" style={{ color: "#0f172a" }}>
        {review.title}
      </h4>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "#374151" }}>
        {review.content}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <button
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-gray-50"
          style={{ borderColor: "#e2e8f0", color: "#64748b" }}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          Helpful ({review.helpful})
        </button>
        <button
          className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-gray-50"
          style={{ borderColor: "#e2e8f0", color: "#94a3b8" }}
        >
          Report
        </button>
      </div>
    </div>
  );
}