import { useParams, Link } from "react-router";
import { useMemo } from "react";
import { ChevronRight, Star, ExternalLink, Check } from "lucide-react";
import { getCategoryBySlug } from "../data/categoryTaxonomy";
import { getToolsByCategory, getToolById } from "../data/toolDataset";
import { categoryPages } from "../data/categoryContent";
import { StarRating } from "../components/StarRating";
import { PageByline } from "../components/PageByline";
import { defaultAuthor } from "../data/editorial";

export function CategoryPage() {
  const { slug } = useParams();

  // Get category from taxonomy
  const category = useMemo(() => {
    if (!slug) return null;
    return getCategoryBySlug(slug);
  }, [slug]);

  // Get category content
  const categoryPage = useMemo(() => {
    if (!slug) return null;
    return categoryPages.find(p => p.slug === slug);
  }, [slug]);

  // Get comparison tools
  const comparisonTools = useMemo(() => {
    if (!category) return [];
    const toolIds = categoryPage?.toolsToCompare || [];
    return toolIds
      .map(id => getToolById(id))
      .filter((t): t is NonNullable<typeof t> => t !== undefined)
      .slice(0, 4);
  }, [category, categoryPage]);

  // 404 if not found
  if (!category || !categoryPage) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8fafc" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#0f172a" }}>Category Not Found</h1>
          <p className="mb-4" style={{ color: "#64748b" }}>The category you're looking for doesn't exist.</p>
          <Link to="/" className="text-orange-500 hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `https://bestconstructionapps.com/categories/${slug}`;
  const currentYear = new Date().getFullYear();

  // Generate FAQ from content if not provided
  const faqs = categoryPage.faqs || [
    {
      question: `What is the best ${category.name.toLowerCase()} software in ${currentYear}?`,
      answer: comparisonTools.length > 0
        ? `The best options for ${category.name.toLowerCase()} include ${comparisonTools
            .slice(0, 3)
            .map((t) => `${t.name} (rated ${t.rating.toFixed(1)}/5)`)
            .join(", ")}. Rankings are based on contractor reviews and feature sets.`
        : categoryPage.introduction,
    },
    {
      question: `What should I look for in ${category.name.toLowerCase()} software?`,
      answer: `Key features include: ${categoryPage.comparisonTableColumns
        .slice(0, 3)
        .map(c => c.label)
        .join(", ")}. Choose a tool that matches your specific workflow needs.`,
    },
    {
      question: `How much does ${category.name.toLowerCase()} software cost?`,
      answer: comparisonTools.length > 0
        ? `${category.name} software pricing varies: ${comparisonTools
            .slice(0, 3)
            .map((t) => `${t.name} starts at ${t.pricing}`)
            .join(", ")}. Most offer free trials or demos.`
        : "Pricing varies by vendor. Most tools offer free trials to test functionality.",
    },
  ];

  return (
    <>
      <title>{categoryPage.title}</title>
      <meta name="description" content={categoryPage.metaDescription} />
      <meta name="keywords" content={categoryPage.keywords.join(", ")} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={categoryPage.title} />
      <meta property="og:description" content={categoryPage.metaDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="BUILTECH" />
      <meta property="og:image" content="https://bestconstructionapps.com/og-default.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={categoryPage.title} />
      <meta name="twitter:description" content={categoryPage.metaDescription} />
      <meta name="twitter:image" content="https://bestconstructionapps.com/og-default.png" />

      {/* Enhanced Article Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": categoryPage.title,
          "description": categoryPage.metaDescription,
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
          "datePublished": categoryPage.lastUpdated,
          "dateModified": categoryPage.lastUpdated,
          "mainEntityOfPage": canonicalUrl
        })}
      </script>

      {/* ItemList Schema for comparison tools */}
      {comparisonTools.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": categoryPage.title,
            "description": categoryPage.metaDescription,
            "numberOfItems": comparisonTools.length,
            "itemListOrder": "https://schema.org/ItemListOrderDescending",
            "itemListElement": comparisonTools.map((t, idx) => ({
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
                },
                "offers": {
                  "@type": "Offer",
                  "price": t.pricing.replace(/[^0-9.]/g, "") || "0",
                  "priceCurrency": "USD"
                }
              }
            }))
          })}
        </script>
      )}

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bestconstructionapps.com/" },
            { "@type": "ListItem", "position": 2, "name": category.name, "item": canonicalUrl }
          ]
        })}
      </script>

      {/* FAQPage Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
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
            <span style={{ color: "#fb923c" }}>{category.name}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {categoryPage.h1}
          </h1>
          <p className="text-lg max-w-2xl mb-4" style={{ color: "#94a3b8" }}>
            {categoryPage.introduction}
          </p>
          <PageByline dateModified={categoryPage.lastUpdated} datePublished={categoryPage.lastUpdated} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Overview */}
        <div className="mb-10 p-6 rounded-2xl" style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: "#166534" }}>
            What is {category.name}?
          </h2>
          <p className="text-sm mb-4" style={{ color: "#374151" }}>
            {category.description}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {category.relatedKeywords.slice(0, 4).map((keyword, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <Check className="w-4 h-4 shrink-0" style={{ color: "#16a34a" }} />
                <span className="text-sm" style={{ color: "#374151" }}>
                  {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table Section */}
        {comparisonTools.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#0f172a" }}>
              Top {category.name} Software
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisonTools.map((tool, idx) => (
                <div
                  key={tool.id}
                  className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderColor: "#e2e8f0" }}
                >
                  {/* Rank Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                        style={{
                          backgroundColor: idx === 0 ? "#f97316" : idx === 1 ? "#64748b" : idx === 2 ? "#b45309" : "#e2e8f0",
                          color: idx < 3 ? "white" : "#64748b"
                        }}
                      >
                        {idx + 1}
                      </div>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: tool.website ? "#1f2937" : "#cbd5e1" }}
                      >
                        {tool.name.substring(0, 2).toUpperCase()}
                      </div>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: tool.type === "AI Agent" ? "#faf5ff" : tool.type === "Platform" ? "#eff6ff" : "#f0fdf4",
                        color: tool.type === "AI Agent" ? "#7c3aed" : tool.type === "Platform" ? "#1d4ed8" : "#15803d"
                      }}
                    >
                      {tool.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-1" style={{ color: "#0f172a" }}>{tool.name}</h3>
                  <p className="text-sm mb-3" style={{ color: "#64748b" }}>{tool.tagline}</p>

                  <div className="flex items-center gap-2 mb-4">
                    <StarRating rating={tool.rating} size="sm" />
                    <span className="text-sm font-bold" style={{ color: "#374151" }}>{tool.rating}</span>
                    <span className="text-xs" style={{ color: "#94a3b8" }}>({tool.reviewCount} reviews)</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs" style={{ color: "#94a3b8" }}>Starting at</span>
                      <p className="font-semibold" style={{ color: "#0f172a" }}>{tool.pricing}</p>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>KEY FEATURES</p>
                    <ul className="space-y-1">
                      {Object.entries(tool.comparisonFeatures)
                        .filter(([_, v]) => v)
                        .slice(0, 4)
                        .map(([key], fIdx) => (
                          <li key={fIdx} className="text-xs flex items-start gap-2" style={{ color: "#374151" }}>
                            <Check className="w-3 h-3 shrink-0 mt-0.5" style={{ color: "#16a34a" }} />
                            {key.replace(/-/g, " ").charAt(0).toUpperCase() + key.replace(/-/g, " ").slice(1)}
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/tools/${tool.slug}`}
                      className="flex-1 py-2 rounded-lg border text-sm font-medium text-center transition-colors hover:bg-gray-50"
                      style={{ borderColor: "#e2e8f0", color: "#374151" }}
                    >
                      Details
                    </Link>
                    {tool.affiliateUrl ? (
                      <a
                        href={tool.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 flex-1 py-2 rounded-lg text-sm font-medium text-white"
                        style={{ backgroundColor: "#f97316" }}
                      >
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 flex-1 py-2 rounded-lg text-sm font-medium text-white"
                        style={{ backgroundColor: "#f97316" }}
                      >
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Content Sections */}
        {categoryPage.sections.length > 0 && (
          <div className="mb-12 prose prose-sm max-w-none">
            {categoryPage.sections.map((section, idx) => (
              <div key={idx} className="mb-8 p-6 rounded-2xl bg-white border" style={{ borderColor: "#e2e8f0" }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: "#0f172a" }}>
                  {section.heading}
                </h2>
                <div
                  className="text-sm leading-relaxed"
                  style={{ color: "#374151" }}
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            ))}
          </div>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <div className="mb-12 p-6 rounded-2xl bg-white border" style={{ borderColor: "#e2e8f0" }}>
            <h2 className="text-xl font-bold mb-5" style={{ color: "#0f172a" }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((item, idx) => (
                <details key={idx} className="group border-b pb-4" style={{ borderColor: "#f1f5f9" }}>
                  <summary className="text-sm font-medium cursor-pointer list-none flex items-start gap-2" style={{ color: "#374151" }}>
                    <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 transition-transform group-open:rotate-90" style={{ color: "#f97316" }} />
                    {item.question}
                  </summary>
                  <p className="text-sm mt-3 ml-6 leading-relaxed" style={{ color: "#64748b" }}>
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Primary CTA Section */}
        {categoryPage.primaryToolId && (
          <div className="mb-12 p-8 rounded-2xl text-white text-center" style={{ backgroundColor: "#f97316" }}>
            <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              {categoryPage.primaryCTA}
            </p>
            <a
              href={`https://bestconstructionapps.com/tools/${comparisonTools[0]?.slug || ''}`}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium border-2 border-white hover:bg-white hover:text-orange-500 transition-colors"
            >
              Get Started Now
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Related Categories */}
        {categoryPage.relatedCategories && categoryPage.relatedCategories.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4" style={{ color: "#0f172a" }}>
              Related Categories
            </h2>
            <div className="flex flex-wrap gap-3">
              {categoryPage.relatedCategories.slice(0, 5).map((catId) => {
                const relatedCat = getCategoryBySlug(catId);
                return relatedCat ? (
                  <Link
                    key={catId}
                    to={`/categories/${catId}`}
                    className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50"
                    style={{ borderColor: "#e2e8f0", color: "#374151" }}
                  >
                    {relatedCat.name}
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
