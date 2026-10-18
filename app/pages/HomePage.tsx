import { trades, tools } from "../data/constructionData";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { defaultDateModified } from "../data/editorial";
import { Search, Shield, ArrowRight, ChevronRight } from "lucide-react";
import { ToolLogo } from "../components/ToolLogo";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { openReviewModal, openSubmitModal } = useApp();

  const handleSearch = () => {
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const totalReviews = tools.reduce((sum, t) => sum + (t.reviewCount || 0), 0);
  const highestRated = tools
    .filter((t) => !t.duplicateOf && t.reviewCount >= 100)
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, 8);

  const currentYear = new Date().getFullYear();

  return (
    <div>
      <title>Best Construction Software, Ranked by Trade ({currentYear})</title>
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
      <section className="border-b" style={{ backgroundColor: "#fbfaf7", borderColor: "#e7e2d8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "#9a3412" }}>
              Independent reviews · {trades.length} trades · {tools.filter((t) => !t.duplicateOf).length} tools
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-[1.08] tracking-tight" style={{ color: "#1a1714" }}>
              Construction software, ranked by the contractors who actually use it.
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: "#4b4640" }}>
              Pick your trade, see the tools that rank highest on {totalReviews.toLocaleString()} aggregated contractor reviews, check real starting prices, and compare before you book a demo. Vendors can't pay for placement.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#trades"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-white transition-colors"
                style={{ backgroundColor: "#c2410c" }}
              >
                Find software for my trade <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/top-rated"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold border transition-colors hover:bg-white"
                style={{ color: "#1a1714", borderColor: "#cfc8bb" }}
              >
                See the highest-rated tools
              </Link>
            </div>

            <form
              className="mt-8 flex gap-2 max-w-xl"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <div className="flex-1 flex items-center gap-3 px-4 bg-white rounded-lg border" style={{ borderColor: "#cfc8bb" }}>
                <Search className="w-4 h-4 shrink-0" style={{ color: "#8a8378" }} />
                <input
                  type="text"
                  placeholder="Search a tool, trade, or feature"
                  className="flex-1 bg-transparent py-3 text-sm outline-none"
                  style={{ color: "#1a1714" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 rounded-lg font-medium text-sm border transition-colors hover:bg-white"
                style={{ color: "#1a1714", borderColor: "#cfc8bb" }}
              >
                Search
              </button>
            </form>
            <p className="mt-4 text-xs" style={{ color: "#8a8378" }}>
              Ratings aggregated from G2, Capterra, Software Advice, and reader reviews. Last reviewed{" "}
              {new Date(defaultDateModified).toLocaleDateString("en-US", { month: "long", year: "numeric" })}.{" "}
              <Link to="/methodology" className="underline underline-offset-2">How we rate tools</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Free research tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              to: "/cost-calculator",
              title: "Cost Calculator",
              desc: "Estimate what software will cost your team per month and year.",
            },
            {
              to: "/pricing",
              title: "Pricing Index",
              desc: `Real starting prices for ${tools.filter((t) => !t.duplicateOf).length} tools. No demo required.`,
            },
            {
              to: "/updates",
              title: "What's New",
              desc: "Latest tools, refreshed data, and site improvements.",
            },
          ].map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow"
              style={{ borderColor: "#e2e8f0" }}
            >
              <h3 className="font-bold mb-1" style={{ color: "#0f172a" }}>{card.title}</h3>
              <p className="text-sm" style={{ color: "#64748b" }}>{card.desc}</p>
              <span className="inline-block mt-2 text-sm font-medium" style={{ color: "#f97316" }}>
                Open →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by Trade */}
      <section id="trades" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium" style={{ color: "#1a1714" }}>
              Start with your trade
            </h2>
            <p className="text-sm mt-1" style={{ color: "#8a8378" }}>
              An HVAC shop and a custom home builder need different software. Rankings change by trade.
            </p>
          </div>
          <Link
            to="/search"
            className="hidden md:flex items-center gap-1 text-sm font-medium"
            style={{ color: "#f97316" }}
          >
            View all tools <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {trades.map((trade) => {
            const count = tools.filter((t) => !t.duplicateOf && t.tradeIds.includes(trade.id)).length;
            const top = tools
              .filter((t) => !t.duplicateOf && t.tradeIds.includes(trade.id))
              .sort((a, b) => b.rating - a.rating)[0];
            return (
              <Link
                key={trade.id}
                to={`/trades/${trade.slug}`}
                className="group flex flex-col bg-white rounded-lg border p-5 transition-colors hover:border-orange-300"
                style={{ borderColor: "#e7e2d8" }}
              >
                <h3 className="font-serif text-lg font-medium" style={{ color: "#1a1714" }}>{trade.name}</h3>
                <p className="text-xs mt-1" style={{ color: "#8a8378" }}>
                  {count} tools ranked{top ? ` · top pick ${top.name}` : ""}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium" style={{ color: "#c2410c" }}>
                  See rankings <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Highest rated, computed from the directory (no hand-written "monthly" data) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium" style={{ color: "#1a1714" }}>
              Highest-rated across all trades
            </h2>
            <p className="text-sm mt-1" style={{ color: "#8a8378" }}>
              Tools with at least 100 aggregated reviews, ranked by rating.
            </p>
          </div>
          <Link to="/top-rated" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium" style={{ color: "#c2410c" }}>
            Full list <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ol className="divide-y bg-white rounded-lg border" style={{ borderColor: "#e7e2d8" }}>
          {highestRated.map((tool, idx) => (
            <li key={tool.id} className="flex items-center gap-4 px-4 py-3">
              <span className="w-6 text-sm font-semibold tabular-nums" style={{ color: "#8a8378" }}>{idx + 1}</span>
              <ToolLogo tool={tool} className="w-10 h-10 rounded-lg" />
              <div className="flex-1 min-w-0">
                <Link to={`/tools/${tool.slug}`} className="font-medium hover:underline" style={{ color: "#1a1714" }}>
                  {tool.name}
                </Link>
                <p className="text-xs truncate" style={{ color: "#8a8378" }}>
                  {tool.type} · from {tool.price}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold tabular-nums" style={{ color: "#1a1714" }}>{tool.rating.toFixed(1)}</p>
                <p className="text-xs" style={{ color: "#8a8378" }}>{tool.reviewCount.toLocaleString()} reviews</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: "#0c1a2e" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Shield className="w-10 h-10 mx-auto mb-4" style={{ color: "#f97316" }} />
          <h2 className="text-3xl font-bold text-white">
            Still deciding? Start with the shortlist.
          </h2>
          <p className="mt-3" style={{ color: "#94a3b8" }}>
            Pick your trade, compare up to four tools side by side, and check real starting prices before you book a single demo.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/top-rated"
              className="px-6 py-3 rounded-xl font-medium text-white transition-all hover:brightness-110"
              style={{ backgroundColor: "#f97316" }}
            >
              See Top-Rated Tools
            </Link>
            <Link
              to="/cost-calculator"
              className="px-6 py-3 rounded-xl font-medium border transition-colors hover:bg-white/5"
              style={{ color: "#e2e8f0", borderColor: "#1e3a5f" }}
            >
              Estimate My Software Cost
            </Link>
          </div>
          <p className="mt-8 text-sm" style={{ color: "#64748b" }}>
            Already use one of these tools?{" "}
            <button onClick={() => openReviewModal()} className="underline underline-offset-2 hover:text-white transition-colors">
              Write a review
            </button>{" "}
            or{" "}
            <button onClick={openSubmitModal} className="underline underline-offset-2 hover:text-white transition-colors">
              submit a tool
            </button>
            .
          </p>
        </div>
      </section>
    </div>
  );
}