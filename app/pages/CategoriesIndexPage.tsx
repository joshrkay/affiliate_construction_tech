import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { categoryPages } from "../data/categoryContent";
import { getCategoryById } from "../data/categoryTaxonomy";
import { PageByline } from "../components/PageByline";
import { defaultDateModified } from "../data/editorial";

const canonicalUrl = "https://bestconstructionapps.com/categories";

/** Hub page: every software category guide (estimating, scheduling, invoicing, ...). */
export function CategoriesIndexPage() {
  const year = new Date().getFullYear();
  const items = categoryPages
    .filter((p) => p.language === "en")
    .map((p) => ({ page: p, category: getCategoryById(p.categoryId) }))
    .sort((a, b) => (a.category?.name ?? a.page.h1).localeCompare(b.category?.name ?? b.page.h1));

  return (
    <div>
      <title>Construction Software Categories ({year})</title>
      <meta name="description" content={`${items.length} construction software categories explained: what the software does, which tools lead each category, and what to check before you buy.`} />
      <link rel="canonical" href={canonicalUrl} />

      <div style={{ backgroundColor: "#0c1a2e" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "#64748b" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: "#fb923c" }}>Categories</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Construction Software by Category</h1>
          <p className="text-lg max-w-2xl mb-4" style={{ color: "#94a3b8" }}>
            Browse by the job the software does rather than by trade: estimating, scheduling, invoicing, field apps, safety, and more.
          </p>
          <PageByline dateModified={defaultDateModified} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map(({ page, category }) => (
            <li key={page.slug}>
              <Link
                to={`/categories/${page.slug}`}
                className="block bg-white rounded-xl border p-4 hover:shadow-md transition-shadow h-full"
                style={{ borderColor: "#e2e8f0" }}
              >
                <p className="text-sm font-semibold leading-snug" style={{ color: "#0f172a" }}>
                  {category?.name ?? page.h1}
                </p>
                <p className="text-xs mt-1 line-clamp-2" style={{ color: "#64748b" }}>
                  {category?.description ?? page.metaDescription}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
