import { trades, tools } from "../data/constructionData";
import { StarRating } from "../components/StarRating";
import { TopRatedThisMonth } from "../components/TopRatedThisMonth";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import {
  Search,
  TrendingUp,
  Shield,
  Zap,
  Star,
  ChevronRight,
  ArrowRight,
  Bot,
  BarChart3,
  Users,
} from "lucide-react";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { openReviewModal, openSubmitModal } = useApp();

  const handleSearch = () => {
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const stats = [
    { label: "Tools & Platforms", value: "140+", icon: BarChart3 },
    { label: "Verified Reviews", value: "12,400+", icon: Star },
    { label: "Trade Categories", value: "8", icon: Users },
    { label: "AI-Powered Tools", value: "35+", icon: Bot },
  ];

  const featuredReviews = [
    {
      quote:
        "Togal.AI cut our takeoff time by 70%. We're bidding twice as many jobs now.",
      author: "Chris B.",
      role: "Chief Estimator",
      company: "BuildRight Mechanical",
      rating: 5,
      tool: "Togal.AI",
      toolSlug: "togal-ai",
      avatarColor: "#7c3aed",
    },
    {
      quote:
        "Procore's analytics dashboard tells me which projects are at risk before they blow up.",
      author: "Derek F.",
      role: "VP of Operations",
      company: "Apex General Contractors",
      rating: 5,
      tool: "Procore",
      toolSlug: "procore",
      avatarColor: "#065f46",
    },
    {
      quote:
        "ALICE found a construction sequence that compressed our hospital project by 8 months.",
      author: "Michael O.",
      role: "Director of Project Controls",
      company: "Western Infrastructure Partners",
      rating: 5,
      tool: "ALICE Technologies",
      toolSlug: "alice-technologies",
      avatarColor: "#0f766e",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div>
      <title>BUILTECH — Best AI & Construction Software Directory ({currentYear})</title>
      <meta name="description" content="Compare 140+ construction software tools rated by real contractors. Find the best AI-powered estimating, project management, field service, and scheduling software for your trade." />
      <link rel="canonical" href="https://bestconstructionapps.com/" />
      <meta property="og:title" content={`BUILTECH — Best AI & Construction Software Directory (${currentYear})`} />
      <meta property="og:description" content="Compare 140+ construction software tools rated by real contractors. Find the best AI-powered estimating, project management, field service, and scheduling software for your trade." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://bestconstructionapps.com/" />
      <meta property="og:site_name" content="BUILTECH" />
      <meta property="og:image" content="https://bestconstructionapps.com/og-default.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`BUILTECH — Best AI & Construction Software Directory (${currentYear})`} />
      <meta name="twitter:description" content="Compare 140+ construction software tools rated by real contractors. Find the best AI-powered estimating, project management, field service, and scheduling software for your trade." />
      <meta name="twitter:image" content="https://bestconstructionapps.com/og-default.png" />

      {/* WebSite Schema with SearchAction for Sitelinks Searchbox */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "BUILTECH",
          "url": "https://bestconstructionapps.com",
          "description": "The construction industry's AI & software directory. Compare ratings, read real contractor reviews, and discover the tools transforming every trade.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://bestconstructionapps.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>

      {/* CollectionPage Schema for AI extraction */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `Best AI & Construction Software Directory (${currentYear})`,
          "description": "Compare 140+ construction software tools rated by real contractors across 15+ trades.",
          "url": "https://bestconstructionapps.com/",
          "publisher": {
            "@type": "Organization",
            "name": "BUILTECH",
            "url": "https://bestconstructionapps.com"
          },
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": tools.length,
            "itemListElement": tools
              .sort((a, b) => (a.overallRank ?? 999) - (b.overallRank ?? 999))
              .slice(0, 10)
              .map((tool, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "name": tool.name,
                "url": `https://bestconstructionapps.com/tools/${tool.slug}`
              }))
          }
        })}
      </script>

      {/* Hero */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ backgroundColor: "#0c1a2e" }}
      >
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(249,115,22,0.12) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
              style={{ backgroundColor: "rgba(249,115,22,0.15)", color: "#fb923c" }}
            >
              <Zap className="w-3.5 h-3.5" />
              The Construction Industry's AI & Software Directory
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Find the Best
              <span style={{ color: "#f97316" }}> AI & Software</span>
              <br />
              for Construction
            </h1>
            <p className="mt-5 text-lg leading-relaxed" style={{ color: "#94a3b8" }}>
              Compare ratings, read real contractor reviews, and discover the tools transforming every trade — from AI estimating to intelligent scheduling and field management.
            </p>

            {/* Search */}
            <div className="mt-8 flex gap-3 max-w-xl">
              <div className="flex-1 flex items-center gap-3 px-4 bg-white/10 backdrop-blur rounded-xl border" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <Search className="w-4 h-4 shrink-0" style={{ color: "#64748b" }} />
                <input
                  type="text"
                  placeholder="Search tools, trades, or features..."
                  className="flex-1 bg-transparent py-3 text-sm text-white placeholder-slate-500 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-5 py-3 rounded-xl font-medium text-sm text-white shrink-0 hover:brightness-110 transition-all"
                style={{ backgroundColor: "#f97316" }}
              >
                Search
              </button>
            </div>

            {/* Quick filters */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["AI Agents", "Project Management", "Estimating", "Field Service", "BIM"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}
                  className="px-3 py-1 rounded-full text-xs border transition-colors hover:bg-white/10"
                  style={{ color: "#64748b", borderColor: "#1e3a5f" }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div style={{ backgroundColor: "#0f2133" }} className="border-b" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(249,115,22,0.15)" }}
                >
                  <stat.icon className="w-4 h-4" style={{ color: "#f97316" }} />
                </div>
                <div>
                  <p className="text-white font-bold text-lg leading-tight">{stat.value}</p>
                  <p className="text-xs" style={{ color: "#64748b" }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Browse by Trade */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "#0f172a" }}>
              Browse by Trade
            </h2>
            <p className="text-sm mt-1" style={{ color: "#64748b" }}>
              Explore AI tools and software tailored to your specific trade
            </p>
          </div>
          <Link
            to="/"
            className="hidden md:flex items-center gap-1 text-sm font-medium"
            style={{ color: "#f97316" }}
          >
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {trades.map((trade) => (
            <Link
              key={trade.id}
              to={`/trades/${trade.slug}`}
              className="group relative overflow-hidden rounded-2xl p-5 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              style={{ backgroundColor: "#0c1a2e" }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                style={{
                  backgroundImage: `url(${trade.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${trade.accentColor}44 0%, #0c1a2ebb 100%)`,
                }}
              />

              <div className="relative">
                <span className="text-3xl mb-3 block">{trade.emoji}</span>
                <h3 className="font-semibold text-sm">{trade.name}</h3>
                <p className="text-xs mt-1 opacity-70">{trade.tagline}</p>
                <div className="mt-3 flex items-center gap-1 text-xs opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: "#fb923c" }}>
                  <span>{tools.filter((t) => t.tradeIds.includes(trade.id)).length} tools</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated Tools */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between">
          <div></div>
          <Link
            to="/top-rated"
            className="flex items-center gap-1 text-sm font-medium hover:text-orange-500 transition-colors"
            style={{ color: "#f97316" }}
          >
            View All Top Rated <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <TopRatedThisMonth />

      {/* AI Spotlight */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(135deg, #0c1a2e 0%, #1e1b4b 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5"
                style={{ backgroundColor: "rgba(124,58,237,0.2)", color: "#c084fc" }}
              >
                <Bot className="w-3.5 h-3.5" />
                AI Agent Spotlight
              </div>
              <h2 className="text-3xl font-bold text-white leading-tight">
                AI is Reshaping
                <br />
                <span style={{ color: "#c084fc" }}>How Construction Works</span>
              </h2>
              <p className="mt-4 leading-relaxed" style={{ color: "#94a3b8" }}>
                From computer vision takeoffs that cut estimating time by 70% to AI scheduling platforms that find optimal construction sequences — artificial intelligence is delivering measurable ROI across every phase of construction.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { stat: "70%", label: "Faster Takeoffs with AI" },
                  { stat: "35%", label: "Fewer Safety Incidents" },
                  { stat: "15%", label: "Schedule Compression" },
                  { stat: "28%", label: "Higher Average Ticket" },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                    <p className="text-2xl font-bold" style={{ color: "#c084fc" }}>
                      {item.stat}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                to="/trades/estimating-bidding"
                className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl font-medium text-sm text-white transition-all hover:brightness-110"
                style={{ backgroundColor: "#7c3aed" }}
              >
                Explore AI Tools <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {tools
                .filter((t) => t.category === "AI Agent")
                .map((tool) => (
                  <Link
                    key={tool.id}
                    to={`/tools/${tool.slug}`}
                    className="flex items-center gap-4 p-4 rounded-xl border transition-colors hover:bg-white/5"
                    style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ backgroundColor: tool.logoColor }}
                    >
                      {tool.logoInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold">{tool.name}</p>
                      <p className="text-xs truncate" style={{ color: "#64748b" }}>
                        {tool.type}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                        <span className="text-white text-sm font-bold">{tool.rating}</span>
                      </div>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "rgba(124,58,237,0.2)", color: "#c084fc" }}
                      >
                        AI Agent
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold" style={{ color: "#0f172a" }}>
            What Contractors Are Saying
          </h2>
          <p className="text-sm mt-2" style={{ color: "#64748b" }}>
            Real reviews from verified construction professionals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredReviews.map((review, idx) => (
            <Link
              key={idx}
              to={`/tools/${review.toolSlug}#reviews`}
              className="block p-6 rounded-2xl bg-white border shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              style={{ borderColor: "#e2e8f0" }}
              aria-label={`Read ${review.tool} reviews`}
            >
              <StarRating rating={review.rating} size="sm" />
              <p className="mt-4 text-sm leading-relaxed italic" style={{ color: "#374151" }}>
                "{review.quote}"
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: review.avatarColor }}
                >
                  {review.author[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#0f172a" }}>
                    {review.author}
                  </p>
                  <p className="text-xs" style={{ color: "#64748b" }}>
                    {review.role} · {review.company}
                  </p>
                </div>
                <div className="ml-auto">
                  <span
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ backgroundColor: "#fff7ed", color: "#c2410c" }}
                  >
                    {review.tool}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: "#0c1a2e" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Shield className="w-10 h-10 mx-auto mb-4" style={{ color: "#f97316" }} />
          <h2 className="text-3xl font-bold text-white">
            Have experience with construction software?
          </h2>
          <p className="mt-3" style={{ color: "#94a3b8" }}>
            Your review helps other contractors make better decisions. Share your honest experience and help the industry grow smarter.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => openReviewModal()}
              className="px-6 py-3 rounded-xl font-medium text-white transition-all hover:brightness-110"
              style={{ backgroundColor: "#f97316" }}
            >
              Write a Review
            </button>
            <button
              onClick={openSubmitModal}
              className="px-6 py-3 rounded-xl font-medium border transition-colors hover:bg-white/5"
              style={{ color: "#94a3b8", borderColor: "#1e3a5f" }}
            >
              Submit a Tool
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}