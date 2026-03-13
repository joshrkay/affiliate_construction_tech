import { Link } from "react-router";
import { useState } from "react";
import { ChevronRight, BookOpen, Lightbulb, ShoppingCart, TrendingUp, Settings } from "lucide-react";
import { guidePages, GuidePage } from "../data/guidePages";

const categoryLabels: Record<string, string> = {
  "how-to": "How-To",
  "explainer": "Explainer",
  "buying-guide": "Buying Guide",
  "industry": "Industry",
  "implementation": "Implementation",
};

const categoryBadgeStyles: Record<string, { bg: string; text: string }> = {
  "how-to": { bg: "#dbeafe", text: "#1d4ed8" },
  "explainer": { bg: "#fef3c7", text: "#92400e" },
  "buying-guide": { bg: "#dcfce7", text: "#15803d" },
  "industry": { bg: "#fae8ff", text: "#86198f" },
  "implementation": { bg: "#fee2e2", text: "#b91c1c" },
};

export function GuidesIndexPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Guides", icon: BookOpen },
    { id: "how-to", label: "How-To", icon: Settings },
    { id: "explainer", label: "Explainers", icon: Lightbulb },
    { id: "buying-guide", label: "Buying Guides", icon: ShoppingCart },
    { id: "industry", label: "Industry", icon: TrendingUp },
    { id: "implementation", label: "Implementation", icon: Settings },
  ];

  const filtered =
    activeCategory === "all"
      ? guidePages
      : guidePages.filter((g) => g.category === activeCategory);

  const canonicalUrl = "https://bestconstructionapps.com/guides";
  const currentYear = new Date().getFullYear();
  const pageTitle = `Construction Software Guides & Resources | BUILTECH`;
  const pageDescription =
    "In-depth guides on construction software, AI technology, estimating, project management, and implementation. Written for contractors and construction professionals.";

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="BUILTECH" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />

      {/* CollectionPage JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Construction Software Guides & Resources (${currentYear})`,
          description: pageDescription,
          url: canonicalUrl,
          publisher: {
            "@type": "Organization",
            name: "BUILTECH",
            url: "https://bestconstructionapps.com",
          },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: guidePages.length,
            itemListElement: guidePages.map((guide, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: guide.title,
              url: `https://bestconstructionapps.com/guides/${guide.slug}`,
            })),
          },
        })}
      </script>

      {/* BreadcrumbList JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://bestconstructionapps.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Guides",
              item: canonicalUrl,
            },
          ],
        })}
      </script>

      {/* Dark Hero */}
      <section
        className="relative overflow-hidden"
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm mb-6"
            style={{ color: "#64748b" }}
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: "#fb923c" }}>Guides</span>
          </nav>

          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(249,115,22,0.2)" }}
            >
              <BookOpen className="w-6 h-6" style={{ color: "#f97316" }} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Construction Software{" "}
                <span style={{ color: "#fb923c" }}>Guides & Resources</span>
              </h1>
              <p className="mt-2 text-lg" style={{ color: "#94a3b8" }}>
                In-depth guides to help you evaluate, choose, and implement
                the right construction technology for your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{
                    backgroundColor: isActive ? "#f97316" : "white",
                    color: isActive ? "white" : "#64748b",
                    border: isActive ? "1px solid #f97316" : "1px solid #e2e8f0",
                    boxShadow: isActive ? undefined : "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guide Cards Grid */}
      <section style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: "#cbd5e1" }}
              />
              <p className="text-lg font-semibold" style={{ color: "#0f172a" }}>
                No guides in this category yet
              </p>
              <p className="mt-1 text-sm" style={{ color: "#64748b" }}>
                Check back soon — new guides are published regularly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function GuideCard({ guide }: { guide: GuidePage }) {
  const badge = categoryBadgeStyles[guide.category] || categoryBadgeStyles["how-to"];
  const label = categoryLabels[guide.category] || guide.category;

  return (
    <Link
      to={`/guides/${guide.slug}`}
      className="group flex flex-col bg-white rounded-2xl border shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
      style={{ borderColor: "#e2e8f0" }}
    >
      {/* Card Body */}
      <div className="flex-1 p-6">
        {/* Category Badge */}
        <span
          className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
          style={{ backgroundColor: badge.bg, color: badge.text }}
        >
          {label}
        </span>

        {/* Title */}
        <h2
          className="text-lg font-bold leading-snug mb-2 group-hover:text-orange-500 transition-colors"
          style={{ color: "#0f172a" }}
        >
          {guide.title}
        </h2>

        {/* Description */}
        <p
          className="text-sm leading-relaxed line-clamp-3"
          style={{ color: "#64748b" }}
        >
          {guide.description}
        </p>
      </div>

      {/* Card Footer */}
      <div
        className="px-6 py-4 border-t flex items-center justify-between"
        style={{ borderColor: "#f1f5f9" }}
      >
        <span
          className="text-xs font-medium flex items-center gap-1.5 group-hover:text-orange-500 transition-colors"
          style={{ color: "#f97316" }}
        >
          Read Guide
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
        {guide.lastUpdated && (
          <span className="text-xs" style={{ color: "#94a3b8" }}>
            Updated{" "}
            {new Date(guide.lastUpdated).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
        )}
      </div>
    </Link>
  );
}
