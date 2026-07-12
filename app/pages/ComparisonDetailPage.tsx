import { useParams, Link } from "react-router";
import { Fragment, useMemo } from "react";
import { Check, X, Minus, ChevronRight, ExternalLink, GitCompareArrows } from "lucide-react";
import { tools, trades } from "../data/constructionData";
import { getComparisonBySlug } from "../data/seoPages";
import { tradeCompareFeatures, toolCapabilityMap, CompareFeatureGroup, comparisonDetailPages } from "../data/comparisonData";
import { StarRating } from "../components/StarRating";
import { PageByline } from "../components/PageByline";
import { defaultAuthor, defaultDatePublished, defaultDateModified } from "../data/editorial";

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

// Display names for tools referenced by editorial comparisons that aren't in
// the main tools dataset yet
const TOOL_DISPLAY_NAMES: Record<string, string> = {
  servicetitan: "ServiceTitan",
  housecallpro: "Housecall Pro",
  jobber: "Jobber",
  quickbooks: "QuickBooks",
  "quickbooks-construction": "QuickBooks",
  "sage-300": "Sage 300 CRE",
  bluebeam: "Bluebeam Revu",
  stack: "STACK",
  raken: "Raken",
  levelset: "Levelset",
  lienitnnow: "LienItNow",
  fieldwire: "Fieldwire",
  plangrid: "PlanGrid",
  primavera: "Primavera P6",
  xero: "Xero",
  deputy: "Deputy",
  textura: "Textura",
  companycam: "CompanyCam",
  "bridgit-bench": "Bridgit Bench",
  touchplan: "TouchPlan",
};

function toolDisplayName(toolId: string): string {
  const known = tools.find((t) => t.id === toolId);
  if (known) return known.name;
  if (TOOL_DISPLAY_NAMES[toolId]) return TOOL_DISPLAY_NAMES[toolId];
  return toolId.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export function ComparisonDetailPage() {
  const { slug } = useParams();

  const comparison = useMemo(() => (slug ? getComparisonBySlug(slug) : null), [slug]);

  // Rich editorial content (introduction, in-depth sections, verdict, FAQs)
  const detail = useMemo(
    () => (slug ? comparisonDetailPages.find((p) => p.slug === slug) : undefined),
    [slug]
  );

  const selectedTools = useMemo(() => {
    if (!comparison) return [];
    return comparison.tools
      .map((id) => tools.find((t) => t.id === id))
      .filter(Boolean) as typeof tools;
  }, [comparison]);

  // A page can be driven by the directory dataset (comparison + tools), by
  // editorial detail content, or both.
  const hasToolData = !!comparison && selectedTools.length >= 2;

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

  // 404 only when neither data source knows this slug
  if (!hasToolData && !detail) {
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

  const canonicalUrl = `https://bestconstructionapps.com/compare/${slug}`;
  const pageTitle = comparison?.title ?? detail!.title;
  const pageDescription = comparison?.description ?? detail!.metaDescription;
  const name1 = hasToolData ? selectedTools[0].name : toolDisplayName(detail!.toolId1);
  const name2 = hasToolData ? selectedTools[1].name : toolDisplayName(detail!.toolId2);

  let verdictText = "";
  if (hasToolData) {
    const higherRatedTool = selectedTools[0].rating >= selectedTools[1].rating ? selectedTools[0] : selectedTools[1];
    const lowerRatedTool = selectedTools[0].rating >= selectedTools[1].rating ? selectedTools[1] : selectedTools[0];
    verdictText = `${higherRatedTool.name} is rated ${higherRatedTool.rating.toFixed(1)}/5 (${higherRatedTool.reviewCount.toLocaleString()} reviews) vs ${lowerRatedTool.name} at ${lowerRatedTool.rating.toFixed(1)}/5 (${lowerRatedTool.reviewCount.toLocaleString()} reviews). ${higherRatedTool.name} starts at ${higherRatedTool.price} while ${lowerRatedTool.name} starts at ${lowerRatedTool.price}.`;
  }

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {comparison && <meta name="keywords" content={comparison.keywords.join(", ")} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="BUILTECH" />
      <meta property="og:image" content="https://bestconstructionapps.com/og-default.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content="https://bestconstructionapps.com/og-default.png" />

      {/* WebPage Schema (with SoftwareApplication items when tool data exists) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": pageTitle,
          "description": pageDescription,
          "url": canonicalUrl,
          "author": {
            "@type": "Person",
            "name": defaultAuthor.name,
            "url": defaultAuthor.url,
            "jobTitle": defaultAuthor.role
          },
          "publisher": {
            "@type": "Organization",
            "name": "BUILTECH",
            "url": "https://bestconstructionapps.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://bestconstructionapps.com/og-default.png"
            }
          },
          "datePublished": defaultDatePublished,
          "dateModified": detail?.lastUpdated || defaultDateModified,
          ...(hasToolData && {
            mainEntity: {
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
                  "offers": {
                    "@type": "Offer",
                    "price": tool.price.replace(/[^0-9.]/g, "") || "0",
                    "priceCurrency": "USD"
                  }
                }
              }))
            }
          })
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
            { "@type": "ListItem", "position": 3, "name": `${name1} vs ${name2}`, "item": canonicalUrl }
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
            <span style={{ color: "#fb923c" }}>{name1} vs {name2}</span>
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
                <span style={{ color: "#fb923c" }}>{name1}</span> vs{" "}
                <span style={{ color: "#fb923c" }}>{name2}</span>
              </h1>
              {trade ? (
                <p className="mt-1" style={{ color: "#94a3b8" }}>
                  {trade.emoji} {trade.name} — {pageDescription}
                </p>
              ) : (
                <p className="mt-1" style={{ color: "#94a3b8" }}>
                  {pageDescription}
                </p>
              )}
              <div className="mt-3">
                <PageByline dateModified={detail?.lastUpdated || defaultDateModified} datePublished={defaultDatePublished} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI-extractable Verdict Summary */}
      {verdictText && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: "#f8fafc" }}>
            <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
              <strong style={{ color: "#0f172a" }}>Quick Verdict:</strong> {verdictText}
            </p>
          </div>
        </div>
      )}

      {/* Editorial introduction */}
      {detail && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div
            className="max-w-3xl text-[15px] leading-relaxed [&_p]:mb-4 [&_strong]:font-semibold"
            style={{ color: "#374151" }}
            dangerouslySetInnerHTML={{ __html: detail.introduction }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Summary cards (directory data) */}
        {hasToolData && (
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
        )}

        {/* Capability grid (directory data) */}
        {hasToolData && (
          <>
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
          </>
        )}

        {/* In-depth head-to-head table from editorial data */}
        {detail && detail.comparisonTable.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#0f172a" }}>
              {name1} vs {name2}: Head-to-Head Details
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border rounded-xl overflow-hidden" style={{ borderColor: "#e2e8f0" }}>
                <thead>
                  <tr style={{ backgroundColor: "#0c1a2e" }}>
                    <th className="text-left px-4 py-3 text-white font-semibold w-1/3"></th>
                    <th className="text-left px-4 py-3 text-white font-semibold">{name1}</th>
                    <th className="text-left px-4 py-3 text-white font-semibold">{name2}</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.comparisonTable.map((group) => (
                    <Fragment key={group.category}>
                      <tr style={{ backgroundColor: "#f8fafc" }}>
                        <td colSpan={3} className="px-4 py-2 text-xs font-bold uppercase tracking-wider" style={{ color: "#64748b" }}>
                          {group.category}
                        </td>
                      </tr>
                      {group.rows.map((row) => (
                        <tr key={`${group.category}-${row.label}`} className="border-t" style={{ borderColor: "#f1f5f9" }}>
                          <td className="px-4 py-3 font-medium" style={{ color: "#374151" }}>{row.label}</td>
                          {[row.tool1, row.tool2].map((val, i) => (
                            <td key={i} className="px-4 py-3" style={{ color: "#475569" }}>
                              {typeof val === "boolean" ? (
                                val ? (
                                  <Check className="w-4 h-4" style={{ color: "#16a34a" }} aria-label="Yes" />
                                ) : (
                                  <X className="w-4 h-4" style={{ color: "#dc2626" }} aria-label="No" />
                                )
                              ) : (
                                val
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Editorial deep-dive sections */}
        {detail && detail.sections.length > 0 && (
          <div className="mt-12 max-w-3xl">
            {detail.sections.map((section) => (
              <section key={section.heading} className="mb-8">
                <h2 className="text-2xl font-bold mb-4" style={{ color: "#0f172a" }}>{section.heading}</h2>
                <div
                  className="text-[15px] leading-relaxed [&_p]:mb-4 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1"
                  style={{ color: "#374151" }}
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </section>
            ))}
          </div>
        )}

        {/* Editorial verdict */}
        {detail?.verdict && (
          <div className="mt-4 max-w-3xl p-6 rounded-2xl border" style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#14532d" }}>Our Verdict</h2>
            <p className="text-[15px] leading-relaxed mb-3" style={{ color: "#166534" }}>{detail.verdict.bestFor}</p>
            <p className="text-[15px] leading-relaxed" style={{ color: "#166534" }}>{detail.verdict.recommendation}</p>
          </div>
        )}

        {/* FAQs */}
        {detail?.faqs && detail.faqs.length > 0 && (
          <div className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#0f172a" }}>Frequently Asked Questions</h2>
            {detail.faqs.map((faq) => (
              <div key={faq.question} className="mb-6">
                <h3 className="text-base font-semibold mb-2" style={{ color: "#0f172a" }}>{faq.question}</h3>
                <p className="text-[15px] leading-relaxed" style={{ color: "#475569" }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        )}

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
