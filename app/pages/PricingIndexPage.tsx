import { Link } from "react-router";
import { useMemo, useState } from "react";
import { ChevronRight, DollarSign, Search } from "lucide-react";
import { tools } from "../data/constructionData";

/**
 * Construction Software Pricing Index — every tool in the directory with its
 * starting price and pricing model in one comparable table. Vendors hide
 * pricing; this page is the citable answer.
 */
export function PricingIndexPage() {
  const [query, setQuery] = useState("");

  const types = useMemo(() => {
    const byType = new Map<string, typeof tools>();
    for (const tool of tools) {
      const list = byType.get(tool.type) ?? [];
      list.push(tool);
      byType.set(tool.type, list);
    }
    return [...byType.entries()].sort((a, b) => b[1].length - a[1].length);
  }, []);

  const q = query.trim().toLowerCase();
  const matches = (t: (typeof tools)[number]) =>
    !q || t.name.toLowerCase().includes(q) || t.type.toLowerCase().includes(q);

  return (
    <>
      <title>Construction Software Pricing Index (2026) — Real Starting Prices | BUILTECH</title>
      <meta
        name="description"
        content={`Starting prices and pricing models for ${tools.length} construction software tools in one table — project management, estimating, field service, and more. Updated continuously.`}
      />
      <link rel="canonical" href="https://bestconstructionapps.com/pricing" />

      {/* Header */}
      <div style={{ backgroundColor: "#0c1a2e" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "#64748b" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: "#fb923c" }}>Pricing Index</span>
          </nav>
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(249,115,22,0.2)" }}
            >
              <DollarSign className="w-6 h-6" style={{ color: "#f97316" }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Construction Software Pricing Index</h1>
              <p className="mt-1 max-w-2xl" style={{ color: "#94a3b8" }}>
                Starting prices and pricing models for {tools.length} construction software tools —
                because most vendors make you sit through a demo to hear a number.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search filter */}
        <div
          className="flex items-center gap-2 px-4 py-3 mb-8 bg-white rounded-xl border"
          style={{ borderColor: "#e2e8f0" }}
        >
          <Search className="w-4 h-4" style={{ color: "#94a3b8" }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by tool name or category…"
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ color: "#0f172a" }}
          />
        </div>

        {types.map(([type, typeTools]) => {
          const visible = typeTools.filter(matches).sort((a, b) => a.name.localeCompare(b.name));
          if (visible.length === 0) return null;
          return (
            <section key={type} className="mb-10">
              <h2 className="text-xl font-bold mb-4" style={{ color: "#0f172a" }}>{type}</h2>
              <div className="overflow-x-auto bg-white rounded-2xl border shadow-sm" style={{ borderColor: "#e2e8f0" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "#e2e8f0", backgroundColor: "#f8fafc" }}>
                      <th className="text-left px-4 py-3 font-semibold" style={{ color: "#475569" }}>Tool</th>
                      <th className="text-left px-4 py-3 font-semibold" style={{ color: "#475569" }}>Starting Price</th>
                      <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell" style={{ color: "#475569" }}>Pricing Notes</th>
                      <th className="text-left px-4 py-3 font-semibold" style={{ color: "#475569" }}>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((tool) => (
                      <tr key={tool.id} className="border-b last:border-0" style={{ borderColor: "#f1f5f9" }}>
                        <td className="px-4 py-3 font-medium" style={{ color: "#0f172a" }}>
                          <Link to={`/tools/${tool.slug}`} className="hover:text-orange-600">{tool.name}</Link>
                        </td>
                        <td className="px-4 py-3 font-semibold" style={{ color: "#f97316" }}>{tool.price}</td>
                        <td className="px-4 py-3 hidden sm:table-cell" style={{ color: "#64748b" }}>{tool.priceNote}</td>
                        <td className="px-4 py-3">
                          <Link to={`/pricing/${tool.slug}`} className="text-orange-600 hover:underline whitespace-nowrap">
                            Pricing details →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}

        <p className="text-xs mt-6" style={{ color: "#94a3b8" }}>
          Prices reflect vendor list pricing or the most recent publicly reported figures and can change
          without notice. "Custom" means the vendor quotes per company. See our{" "}
          <Link to="/methodology" className="underline">methodology</Link> for how we source and update this data.
        </p>
      </div>
    </>
  );
}
