import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { bestForPages } from "../data/seoPages";
import { trades } from "../data/constructionData";
import { PageByline } from "../components/PageByline";
import { defaultDateModified } from "../data/editorial";

const canonicalUrl = "https://bestconstructionapps.com/best";

/** Hub page: every "best software for ..." list, grouped by trade. */
export function BestForIndexPage() {
  const year = new Date().getFullYear();
  const groups = trades
    .map((trade) => ({ trade, pages: bestForPages.filter((p) => p.tradeId === trade.id) }))
    .filter((g) => g.pages.length > 0);
  const unassigned = bestForPages.filter((p) => !trades.some((t) => t.id === p.tradeId));

  return (
    <div>
      <title>Best Construction Software by Trade and Use Case ({year})</title>
      <meta name="description" content={`${bestForPages.length} ranked lists of the best construction software for specific trades and jobs: HVAC, plumbing, electrical, roofing, estimating, scheduling, and more.`} />
      <link rel="canonical" href={canonicalUrl} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Best Construction Software by Trade and Use Case (${year})`,
          url: canonicalUrl,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: bestForPages.length,
            itemListElement: bestForPages.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.title,
              url: `https://bestconstructionapps.com/best/${p.slug}`,
            })),
          },
        })}
      </script>

      <div style={{ backgroundColor: "#0c1a2e" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "#64748b" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: "#fb923c" }}>Best Software Lists</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Best Construction Software by Trade and Use Case</h1>
          <p className="text-lg max-w-2xl mb-4" style={{ color: "#94a3b8" }}>
            {bestForPages.length} ranked shortlists. Each one is built from the same aggregated contractor ratings and starts with the tool we would pick first.
          </p>
          <PageByline dateModified={defaultDateModified} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {groups.map(({ trade, pages }) => (
          <section key={trade.id}>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: "#0f172a" }}>{trade.name}</h2>
              <Link to={`/trades/${trade.slug}`} className="text-sm font-medium hover:underline" style={{ color: "#c2410c" }}>
                All {trade.name} tools
              </Link>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pages.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/best/${p.slug}`}
                    className="block bg-white rounded-xl border p-4 hover:shadow-md transition-shadow h-full"
                    style={{ borderColor: "#e2e8f0" }}
                  >
                    <p className="text-sm font-semibold leading-snug" style={{ color: "#0f172a" }}>{p.title}</p>
                    <p className="text-xs mt-1 line-clamp-2" style={{ color: "#64748b" }}>{p.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {unassigned.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: "#0f172a" }}>More lists</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {unassigned.map((p) => (
                <li key={p.slug}>
                  <Link to={`/best/${p.slug}`} className="block bg-white rounded-xl border p-4 hover:shadow-md transition-shadow h-full" style={{ borderColor: "#e2e8f0" }}>
                    <p className="text-sm font-semibold leading-snug" style={{ color: "#0f172a" }}>{p.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
