import { useParams, Link } from "react-router";
import { useMemo } from "react";
import { ChevronRight, Star, ExternalLink, Check } from "lucide-react";
import { tools, trades, getTradeBySlug, getToolsForTrade } from "../data/constructionData";
import { bestForPages, getBestForBySlug } from "../data/seoPages";
import { StarRating } from "../components/StarRating";
import { PageByline } from "../components/PageByline";
import { defaultAuthor, defaultDatePublished, defaultDateModified } from "../data/editorial";

export function BestForPage() {
  const { slug } = useParams();
  
  const page = useMemo(() => {
    if (!slug) return null;
    return getBestForBySlug(slug);
  }, [slug]);

  const trade = page?.tradeId 
    ? trades.find((t => t.id === page.tradeId))
    : null;

  const tradeTools = useMemo(() => {
    if (!trade) return tools.slice(0, 6);
    return getToolsForTrade(trade.id).slice(0, 6);
  }, [trade]);

  // 404 if not found
  if (!page || !trade) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8fafc" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#0f172a" }}>Page Not Found</h1>
          <p className="mb-4" style={{ color: "#64748b" }}>The page you're looking for doesn't exist.</p>
          <Link to="/" className="text-orange-500 hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `https://bestconstructionapps.com/best/${slug}`;
  const currentYear = new Date().getFullYear();

  // FAQ items for this best-for page
  const bestForFaqItems = [
    {
      question: `What is the best ${trade.name} software in ${currentYear}?`,
      answer: tradeTools.length > 0
        ? `The best ${trade.name} software in ${currentYear} is ${tradeTools[0].name} (rated ${tradeTools[0].rating.toFixed(1)}/5), followed by ${tradeTools.slice(1, 3).map((t) => `${t.name} (${t.rating.toFixed(1)}/5)`).join(" and ")}. Rankings are based on real contractor reviews and ratings.`
        : page.description,
    },
    {
      question: `How much does ${trade.name} software cost?`,
      answer: tradeTools.length > 0
        ? `${trade.name} software pricing varies: ${tradeTools.slice(0, 3).map((t) => `${t.name} starts at ${t.price}`).join(", ")}. Most tools offer free trials or demos.`
        : "Pricing varies by vendor. Most tools offer free trials.",
    },
    {
      question: `What features should I look for in ${trade.name} software?`,
      answer: trade.whyAI.slice(0, 3).join(" "),
    },
  ];

  return (
    <>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="keywords" content={page.keywords.join(", ")} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="BUILTECH" />
      <meta property="og:image" content="https://bestconstructionapps.com/og-default.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content="https://bestconstructionapps.com/og-default.png" />

      {/* Enhanced Article Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": page.title,
          "description": page.description,
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
          "dateModified": defaultDateModified,
          "mainEntityOfPage": canonicalUrl
        })}
      </script>

      {/* ItemList Schema for ranked tools */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": page.title,
          "description": page.description,
          "numberOfItems": tradeTools.length,
          "itemListOrder": "https://schema.org/ItemListOrderDescending",
          "itemListElement": tradeTools.map((t, idx) => ({
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
                "price": t.price.replace(/[^0-9.]/g, "") || "0",
                "priceCurrency": "USD"
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
            { "@type": "ListItem", "position": 2, "name": `Best ${trade.name} Software`, "item": canonicalUrl }
          ]
        })}
      </script>

      {/* FAQPage Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": bestForFaqItems.map((item) => ({
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
            <span style={{ color: "#fb923c" }}>Best {trade.name} Software</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Best <span style={{ color: "#fb923c" }}>{trade.name}</span> Software ({new Date().getFullYear()})
          </h1>
          <p className="text-lg max-w-2xl mb-4" style={{ color: "#94a3b8" }}>
            {page.description}
          </p>
          <PageByline dateModified={defaultDateModified} datePublished={defaultDatePublished} />
        </div>
      </div>

      {/* Top Tools List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Why Use Software Section */}
        <div className="mb-10 p-6 rounded-2xl" style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: "#166534" }}>
            Why Use Software for {trade.name}?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {trade.whyAI.slice(0, 4).map((reason, idx) => (
              <div key={idx} className="flex gap-3">
                <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#16a34a" }} />
                <p className="text-sm" style={{ color: "#374151" }}>{reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Rated Tools */}
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#0f172a" }}>
          Top-Rated {trade.name} Software
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tradeTools.map((tool, idx) => (
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
                    style={{ backgroundColor: tool.logoColor }}
                  >
                    {tool.logoInitials}
                  </div>
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{ 
                    backgroundColor: tool.category === "AI Agent" ? "#faf5ff" : tool.category === "Platform" ? "#eff6ff" : "#f0fdf4",
                    color: tool.category === "AI Agent" ? "#7c3aed" : tool.category === "Platform" ? "#1d4ed8" : "#15803d"
                  }}
                >
                  {tool.category}
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
                  <p className="font-semibold" style={{ color: "#0f172a" }}>{tool.price}</p>
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-4">
                <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>KEY FEATURES</p>
                <ul className="space-y-1">
                  {tool.features.slice(0, 4).map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs flex items-start gap-2" style={{ color: "#374151" }}>
                      <Check className="w-3 h-3 shrink-0 mt-0.5" style={{ color: "#16a34a" }} />
                      {feat}
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
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 flex-1 py-2 rounded-lg text-sm font-medium text-white"
                  style={{ backgroundColor: "#f97316" }}
                >
                  Visit <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* More Tools CTA */}
        {trade.toolIds.length > 6 && (
          <div className="mt-8 text-center">
            <Link
              to={`/trades/${trade.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white"
              style={{ backgroundColor: "#f97316" }}
            >
              View All {trade.toolIds.length} {trade.name} Tools
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Trade Overview */}
        <div className="mt-12 p-6 rounded-2xl" style={{ backgroundColor: "#f8fafc" }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: "#0f172a" }}>
            About {trade.name} Software
          </h2>
          <p className="text-sm mb-4" style={{ color: "#374151" }}>{trade.overview}</p>
          
          <h3 className="text-lg font-semibold mb-3" style={{ color: "#0f172a" }}>
            Key Challenges {trade.name} Companies Face
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {trade.challenges.map((challenge, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: "#f97316" }} />
                <span className="text-sm" style={{ color: "#374151" }}>{challenge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 p-6 rounded-2xl bg-white border" style={{ borderColor: "#e2e8f0" }}>
          <h2 className="text-xl font-bold mb-5" style={{ color: "#0f172a" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {bestForFaqItems.map((item, idx) => (
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

        {/* Related Comparisons */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#0f172a" }}>
            Related Comparisons
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/compare"
              className="px-4 py-2 rounded-lg border text-sm font-medium"
              style={{ borderColor: "#e2e8f0", color: "#374151" }}
            >
              Compare All Tools
            </Link>
            <Link
              to={`/trades/${trade.slug}`}
              className="px-4 py-2 rounded-lg border text-sm font-medium"
              style={{ borderColor: "#e2e8f0", color: "#374151" }}
            >
              {trade.name} Tools
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
