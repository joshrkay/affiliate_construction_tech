import { useParams, Link } from "react-router";
import { useMemo } from "react";
import { ChevronRight, BookOpen, ArrowRight } from "lucide-react";
import { getGuideBySlug, guidePages } from "../data/guidePages";
import { tools, trades } from "../data/constructionData";

export function GuidePage() {
  const { slug } = useParams();

  const guide = useMemo(() => {
    if (!slug) return null;
    return getGuideBySlug(slug);
  }, [slug]);

  // 404 if not found
  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8fafc" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#0f172a" }}>Page Not Found</h1>
          <p className="mb-4" style={{ color: "#64748b" }}>The guide you're looking for doesn't exist.</p>
          <Link to="/" className="text-orange-500 hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `https://bestconstructionapps.com/guides/${slug}`;
  const relatedTools = tools.filter(t => guide.relatedToolIds.includes(t.id));
  const relatedTrades = trades.filter(t => guide.relatedTradeIds.includes(t.id));

  const categoryLabels: Record<string, string> = {
    "how-to": "How-To Guide",
    "explainer": "Explainer",
    "buying-guide": "Buying Guide",
    "industry": "Industry Insight",
    "implementation": "Implementation Guide",
  };

  const categoryColors: Record<string, { bg: string; text: string }> = {
    "how-to": { bg: "#eff6ff", text: "#1d4ed8" },
    "explainer": { bg: "#faf5ff", text: "#7c3aed" },
    "buying-guide": { bg: "#f0fdf4", text: "#15803d" },
    "industry": { bg: "#fefce8", text: "#a16207" },
    "implementation": { bg: "#fdf2f8", text: "#be185d" },
  };

  const catStyle = categoryColors[guide.category] || categoryColors["explainer"];

  return (
    <>
      <title>{guide.title}</title>
      <meta name="description" content={guide.description} />
      <meta name="keywords" content={guide.keywords.join(", ")} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={guide.title} />
      <meta property="og:description" content={guide.description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="BUILTECH" />
      <meta property="og:image" content="https://bestconstructionapps.com/og-default.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={guide.title} />
      <meta name="twitter:description" content={guide.description} />
      <meta name="twitter:image" content="https://bestconstructionapps.com/og-default.png" />

      {/* Article Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": guide.title,
          "description": guide.description,
          "author": {
            "@type": "Organization",
            "name": "BUILTECH",
            "url": "https://bestconstructionapps.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "BUILTECH",
            "url": "https://bestconstructionapps.com"
          },
          "datePublished": guide.lastUpdated,
          "dateModified": guide.lastUpdated,
          "mainEntityOfPage": canonicalUrl
        })}
      </script>

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bestconstructionapps.com/" },
            { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://bestconstructionapps.com/guides" },
            { "@type": "ListItem", "position": 3, "name": guide.title, "item": canonicalUrl }
          ]
        })}
      </script>

      {/* FAQPage Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": guide.faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      </script>

      {/* Hero Section */}
      <div style={{ backgroundColor: "#0c1a2e" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "#64748b" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/guides" className="hover:text-white transition-colors">Guides</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: "#fb923c" }}>{guide.title}</span>
          </nav>

          <div className="mb-4">
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
            >
              {categoryLabels[guide.category]}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {guide.title}
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "#94a3b8" }}>
            {guide.description}
          </p>
          <p className="text-sm mt-4" style={{ color: "#64748b" }}>
            Last updated: {guide.lastUpdated}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sections */}
            {guide.sections.map((section, idx) => (
              <div key={idx} className="bg-white rounded-2xl border p-6" style={{ borderColor: "#e2e8f0" }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: "#0f172a" }}>
                  {section.heading}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                  {section.content}
                </p>
              </div>
            ))}

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl border p-6" style={{ borderColor: "#e2e8f0" }}>
              <h2 className="text-xl font-bold mb-5" style={{ color: "#0f172a" }}>
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {guide.faqs.map((faq, idx) => (
                  <details key={idx} className="group border-b pb-4" style={{ borderColor: "#f1f5f9" }}>
                    <summary className="text-sm font-medium cursor-pointer list-none flex items-start gap-2" style={{ color: "#374151" }}>
                      <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 transition-transform group-open:rotate-90" style={{ color: "#f97316" }} />
                      {faq.question}
                    </summary>
                    <p className="text-sm mt-3 ml-6 leading-relaxed" style={{ color: "#64748b" }}>
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 self-start">
            {/* Related Tools Card */}
            {relatedTools.length > 0 && (
              <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "#e2e8f0" }}>
                <h3 className="text-sm font-semibold mb-4" style={{ color: "#0f172a" }}>
                  Related Tools
                </h3>
                <div className="space-y-3">
                  {relatedTools.map((tool) => (
                    <Link
                      key={tool.id}
                      to={`/tools/${tool.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                        style={{ backgroundColor: tool.logoColor }}
                      >
                        {tool.logoInitials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: "#0f172a" }}>{tool.name}</p>
                        <p className="text-xs truncate" style={{ color: "#64748b" }}>{tool.tagline}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 shrink-0" style={{ color: "#94a3b8" }} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Trades Card */}
            {relatedTrades.length > 0 && (
              <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "#e2e8f0" }}>
                <h3 className="text-sm font-semibold mb-4" style={{ color: "#0f172a" }}>
                  Related Trades
                </h3>
                <div className="space-y-2">
                  {relatedTrades.map((trade) => (
                    <Link
                      key={trade.id}
                      to={`/trades/${trade.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg">{trade.emoji}</span>
                      <span className="text-sm font-medium" style={{ color: "#0f172a" }}>{trade.name}</span>
                      <ArrowRight className="w-4 h-4 ml-auto shrink-0" style={{ color: "#94a3b8" }} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Card */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: "#0c1a2e" }}>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5" style={{ color: "#f97316" }} />
                <h3 className="text-sm font-semibold text-white">Explore More Guides</h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "#94a3b8" }}>
                Browse our full library of construction technology guides, how-tos, and industry insights.
              </p>
              <Link
                to="/guides"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium text-white"
                style={{ backgroundColor: "#f97316" }}
              >
                View All Guides
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
