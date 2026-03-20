import { useParams, Link } from "react-router";
import { useMemo } from "react";
import { Check, X, Minus, ChevronRight, ExternalLink, Star, GitCompareArrows } from "lucide-react";
import { tools, trades, getTradeBySlug } from "../data/constructionData";
import { comparisonPages, getComparisonBySlug } from "../data/seoPages";
import { tradeCompareFeatures, toolCapabilityMap, CompareFeatureGroup } from "../data/comparisonData";
import { StarRating } from "../components/StarRating";

const GENERIC_FEATURES: CompareFeatureGroup[] = [
  {
    category: "Core Capabilities",
    features: [
      { key: "mobile-app", label: "Mobile App" },
      { key: "api", label: "Open API / Integrations" },
      { key: "document-mgmt", label: "Document Management" },
      { key: "photo-docs", label: "Photo Documentation" },
      { key: "daily-logs", label: "Daily Logs" },
    ],
  },
  {
    category: "Project & Finance",
    features: [
      { key: "scheduling", label: "Scheduling" },
      { key: "job-costing", label: "Job Costing" },
      { key: "budget-tracking", label: "Budget Tracking" },
      { key: "change-orders", label: "Change Order Management" },
      { key: "invoicing", label: "Invoicing & Billing" },
      { key: "quickbooks", label: "QuickBooks Integration" },
    ],
  },
  {
    category: "Estimating",
    features: [
      { key: "pdf-takeoff", label: "PDF Plan Takeoff" },
      { key: "ai-takeoff", label: "AI Auto-Detect Takeoff" },
      { key: "material-db", label: "Material Pricing Database" },
      { key: "bid-assembly", label: "Bid Assembly & Proposals" },
    ],
  },
  {
    category: "Field & Service",
    features: [
      { key: "dispatch", label: "Dispatch & Scheduling" },
      { key: "service-agreements", label: "Service Agreements" },
      { key: "crm", label: "Customer CRM" },
      { key: "bim-integration", label: "BIM Integration" },
    ],
  },
];

export function ComparisonDetailPage() {
  const { slug } = useParams();
  
  const comparison = useMemo(() => {
    if (!slug) return null;
    return getComparisonBySlug(slug);
  }, [slug]);

  const selectedTools = useMemo(() => {
    if (!comparison) return [];
    return comparison.tools
      .map((id) => tools.find((t) => t.id === id))
      .filter(Boolean) as typeof tools;
  }, [comparison]);

  const trade = comparison?.tradeId 
    ? trades.find((t) => t.id === comparison.tradeId) 
    : null;

  const featureGroups: CompareFeatureGroup[] = trade
    ? tradeCompareFeatures[trade.id] || GENERIC_FEATURES
    : GENERIC_FEATURES;

  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    "AI Agent": { bg: "#faf5ff", text: "#7c3aed", border: "#e9d5ff" },
    Platform: { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
    Software: { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
  };

  const hasCapability = (toolId: string, featureKey: string) => {
    return toolCapabilityMap[toolId]?.includes(featureKey) ?? false;
  };

  // 404 if not found
  if (!comparison || selectedTools.length < 2) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8fafc" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#0f172a" }}>Comparison Not Found</h1>
          <p className="mb-4" style={{ color: "#64748b" }}>The comparison you're looking for doesn't exist.</p>
          <Link to="/compare" className="text-orange-500 hover:underline">Browse all comparisons</Link>
        </div>
      </div>
    );
  }

  // Build canonical URL
  const canonicalUrl = `https://bestconstructionapps.com/compare/${slug}`;
  const higherRatedTool = selectedTools[0].rating >= selectedTools[1].rating ? selectedTools[0] : selectedTools[1];
  const lowerRatedTool = selectedTools[0].rating >= selectedTools[1].rating ? selectedTools[1] : selectedTools[0];
  const verdictText = `${higherRatedTool.name} is rated ${higherRatedTool.rating.toFixed(1)}/5 (${higherRatedTool.reviewCount.toLocaleString()} reviews) vs ${lowerRatedTool.name} at ${lowerRatedTool.rating.toFixed(1)}/5 (${lowerRatedTool.reviewCount.toLocaleString()} reviews). ${higherRatedTool.name} starts at ${higherRatedTool.price} while ${lowerRatedTool.name} starts at ${lowerRatedTool.price}.`;

  return (
    <>
      <title>{comparison.title}</title>
      <meta name="description" content={comparison.description} />
      <meta name="keywords" content={comparison.keywords.join(", ")} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={comparison.title} />
      <meta property="og:description" content={comparison.description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="BUILTECH" />
      <meta property="og:image" content="https://bestconstructionapps.com/og-default.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={comparison.title} />
      <meta name="twitter:description" content={comparison.description} />
      <meta name="twitter:image" content="https://bestconstructionapps.com/og-default.png" />

      {/* WebPage Schema with SoftwareApplication items */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": comparison.title,
          "description": comparison.description,
          "url": canonicalUrl,
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
          "datePublished": "2026-03-11",
          "dateModified": "2026-03-13",
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": selectedTools.length,
            "itemListElement": selectedTools.map((tool, idx) => ({
              "@type": "ListItem",
              "position": idx + 1,
              "item": {
                "@type": "SoftwareApplication",
                "name": tool.name,
                "description": tool.description,
                "applicationCategory": "BusinessApplication",
                "url": tool.website,
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": tool.rating.toFixed(1),
                  "bestRating": "5",
                  "ratingCount": tool.reviewCount
                },
                "offers": {
                  "@type": "Offer",
                  "price": tool.price.replace(/[^0-9.]/g, "") || "0",
                  "priceCurrency": "USD"
                }
              }
            }))
          }
        })}
      </script>

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bestconstructionapps.com/" },
            { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://bestconstructionapps.com/compare" },
            { "@type": "ListItem", "position": 3, "name": `${selectedTools[0].name} vs ${selectedTools[1].name}`, "item": canonicalUrl }
          ]
        })}
      </script>

      {/* Header */}
      <div style={{ backgroundColor: "#0c1a2e" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "#64748b" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/compare" className="hover:text-white transition-colors">Compare</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: "#fb923c" }}>{selectedTools[0].name} vs {selectedTools[1].name}</span>
          </nav>

          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(249,115,22,0.2)" }}
            >
              <GitCompareArrows className="w-6 h-6" style={{ color: "#f97316" }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                <span style={{ color: "#fb923c" }}>{selectedTools[0].name}</span> vs{" "}
                <span style={{ color: "#fb923c" }}>{selectedTools[1].name}</span>
              </h1>
              {trade && (
                <p className="mt-1" style={{ color: "#94a3b8" }}>
                  {trade.emoji} {trade.name} — {comparison.description}
                </p>
              )}
              {!trade && (
                <p className="mt-1" style={{ color: "#94a3b8" }}>
                  {comparison.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI-extractable Verdict Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: "#f8fafc" }}>
          <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
            <strong style={{ color: "#0f172a" }}>Quick Verdict:</strong> {verdictText}
          </p>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {selectedTools.map((tool) => {
            const cat = categoryColors[tool.category] || categoryColors["Software"];
            return (
              <div
                key={tool.id}
                className="bg-white rounded-2xl border p-6 shadow-sm"
                style={{ borderColor: "#e2e8f0" }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                    style={{ backgroundColor: tool.logoColor }}
                  >
                    {tool.logoInitials}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold" style={{ color: "#0f172a" }}>{tool.name}</h2>
                    <span
                      className="inline-block text-xs px-2 py-0.5 rounded-full font-medium mt-1"
                      style={{ backgroundColor: cat.bg, color: cat.text }}
                    >
                      {tool.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={tool.rating} size="md" />
                  <span className="text-lg font-bold" style={{ color: "#374151" }}>{tool.rating}</span>
                  <span className="text-sm" style={{ color: "#94a3b8" }}>({tool.reviewCount} reviews)</span>
                </div>

                <p className="text-sm mb-4" style={{ color: "#64748b" }}>{tool.tagline}</p>

                <div className="flex gap-3">
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="flex-1 py-2.5 rounded-xl border text-sm font-medium text-center transition-colors hover:bg-gray-50"
                    style={{ borderColor: "#e2e8f0", color: "#374151" }}
                  >
                    Full Review
                  </Link>
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 flex-1 py-2.5 rounded-xl text-sm font-medium text-white"
                    style={{ backgroundColor: "#f97316" }}
                  >
                    Visit <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison */}
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#0f172a" }}>
          Feature Comparison
        </h2>

        <div className="overflow-x-auto">
          <div style={{ minWidth: `${280 + selectedTools.length * 200}px` }}>
            {featureGroups.slice(0, 3).map((group) => (
              <div key={group.category} className="mb-6">
                <div
                  className="grid gap-4 px-4 py-3 rounded-xl mb-2"
                  style={{
                    gridTemplateColumns: `260px repeat(${selectedTools.length}, 1fr)`,
                    backgroundColor: "#0c1a2e",
                  }}
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    {group.category}
                  </span>
                  {selectedTools.map((tool) => <div key={tool.id} />)}
                </div>

                {group.features.slice(0, 5).map((feature, fIdx) => (
                  <div
                    key={feature.key}
                    className="grid gap-4 px-4 py-3 items-center border-b"
                    style={{
                      gridTemplateColumns: `260px repeat(${selectedTools.length}, 1fr)`,
                      backgroundColor: fIdx % 2 === 0 ? "white" : "#fafbfc",
                      borderColor: "#f1f5f9",
                    }}
                  >
                    <span className="text-sm" style={{ color: "#374151" }}>{feature.label}</span>
                    {selectedTools.map((tool) => {
                      const supported = hasCapability(tool.id, feature.key);
                      return (
                        <div key={tool.id} className="flex justify-center">
                          {supported ? (
                            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "#dcfce7" }}>
                              <Check className="w-4 h-4" style={{ color: "#16a34a" }} />
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "#f1f5f9" }}>
                              <Minus className="w-4 h-4" style={{ color: "#cbd5e1" }} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 p-6 rounded-2xl" style={{ backgroundColor: "#fff7ed" }}>
          <h3 className="text-lg font-bold mb-2" style={{ color: "#92400e" }}>
            Ready to choose?
          </h3>
          <p className="text-sm mb-4" style={{ color: "#b45309" }}>
            Compare more tools or browse by your trade to find the perfect fit.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/compare"
              className="px-5 py-2.5 rounded-xl font-medium text-sm text-white"
              style={{ backgroundColor: "#f97316" }}
            >
              Start New Comparison
            </Link>
            {trade && (
              <Link
                to={`/trades/${trade.slug}`}
                className="px-5 py-2.5 rounded-xl border text-sm font-medium"
                style={{ borderColor: "#e2e8f0", color: "#374151" }}
              >
                {trade.name} Software
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
