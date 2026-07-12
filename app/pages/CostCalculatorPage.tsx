import { Link } from "react-router";
import { useMemo, useState } from "react";
import { ChevronRight, Calculator, Users, ExternalLink } from "lucide-react";
import { tools } from "../data/constructionData";

interface ParsedPrice {
  low: number; // monthly $, per user when perUser
  high: number;
  perUser: boolean;
  note?: string;
}

/** Parse price strings like "$49-$99/user/month", "$2,499/yr", "$499/mo", "Free". */
function parsePrice(price: string): ParsedPrice | null {
  const p = price.toLowerCase();
  if (p === "free") return { low: 0, high: 0, perUser: false };
  const nums = [...price.matchAll(/\$\s?([\d,]+(?:\.\d+)?)/g)].map((m) => parseFloat(m[1].replace(/,/g, "")));
  if (nums.length === 0) return null; // Custom / Contact / percent-based
  let low = nums[0];
  let high = nums.length > 1 ? nums[1] : nums[0];
  const yearly = /\/\s?(yr|year)/.test(p);
  if (yearly) {
    low /= 12;
    high /= 12;
  }
  return { low, high, perUser: /\/\s?user/.test(p) };
}

function money(n: number): string {
  return "$" + Math.round(n).toLocaleString();
}

const MAX_SELECTED = 4;

export function CostCalculatorPage() {
  const [teamSize, setTeamSize] = useState(8);
  const [type, setType] = useState<string>("Project Management");
  const [selected, setSelected] = useState<string[] | null>(null); // null = default top 3

  const types = useMemo(
    () => [...new Set(tools.map((t) => t.type))].sort(),
    []
  );

  const typeTools = useMemo(
    () => tools.filter((t) => t.type === type).sort((a, b) => b.rating - a.rating),
    [type]
  );

  const selectedIds = selected ?? typeTools.slice(0, 3).map((t) => t.id);

  const toggle = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((s) => s !== id)
      : selectedIds.length >= MAX_SELECTED
        ? selectedIds
        : [...selectedIds, id];
    setSelected(next);
  };

  const rows = typeTools
    .filter((t) => selectedIds.includes(t.id))
    .map((tool) => {
      const parsed = parsePrice(tool.price);
      if (!parsed) return { tool, parsed: null, monthlyLow: null, monthlyHigh: null };
      const factor = parsed.perUser ? teamSize : 1;
      return {
        tool,
        parsed,
        monthlyLow: parsed.low * factor,
        monthlyHigh: parsed.high * factor,
      };
    });

  return (
    <>
      <title>Construction Software Cost Calculator (2026) — Estimate Your Annual Spend | BUILTECH</title>
      <meta
        name="description"
        content="Free calculator: estimate what construction software will actually cost your team per month and per year. Compare real list prices across project management, estimating, and field service tools."
      />
      <link rel="canonical" href="https://bestconstructionapps.com/cost-calculator" />

      {/* Header */}
      <div style={{ backgroundColor: "#0c1a2e" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "#64748b" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: "#fb923c" }}>Cost Calculator</span>
          </nav>
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(249,115,22,0.2)" }}
            >
              <Calculator className="w-6 h-6" style={{ color: "#f97316" }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Construction Software Cost Calculator</h1>
              <p className="mt-1 max-w-2xl" style={{ color: "#94a3b8" }}>
                Estimate what software will actually cost your team — per month and per year — using
                real list prices from our directory.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Controls */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm mb-8" style={{ borderColor: "#e2e8f0" }}>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: "#0f172a" }}>
                <Users className="w-4 h-4" style={{ color: "#f97316" }} />
                How many people need access?
              </label>
              <input
                type="range"
                min={1}
                max={100}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
              <p className="text-sm mt-1" style={{ color: "#64748b" }}>
                <strong style={{ color: "#f97316" }}>{teamSize}</strong> user{teamSize === 1 ? "" : "s"} (field + office)
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#0f172a" }}>
                Software category
              </label>
              <select
                value={type}
                onChange={(e) => { setType(e.target.value); setSelected(null); }}
                className="w-full px-3 py-2.5 rounded-xl border text-sm bg-white"
                style={{ borderColor: "#e2e8f0", color: "#0f172a" }}
              >
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tool picker */}
          <div className="mt-6">
            <p className="text-sm font-semibold mb-2" style={{ color: "#0f172a" }}>
              Tools to compare <span className="font-normal" style={{ color: "#94a3b8" }}>(up to {MAX_SELECTED})</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {typeTools.map((t) => {
                const active = selectedIds.includes(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => toggle(t.id)}
                    className="px-3 py-1.5 rounded-full text-sm border transition-colors"
                    style={
                      active
                        ? { backgroundColor: "#f97316", borderColor: "#f97316", color: "white" }
                        : { backgroundColor: "white", borderColor: "#e2e8f0", color: "#374151" }
                    }
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results */}
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#0f172a" }}>
          Estimated Cost for a {teamSize}-Person Team
        </h2>
        <div className="overflow-x-auto bg-white rounded-2xl border shadow-sm" style={{ borderColor: "#e2e8f0" }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "#e2e8f0", backgroundColor: "#f8fafc" }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#475569" }}>Tool</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#475569" }}>List Price</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#475569" }}>Est. Monthly</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#475569" }}>Est. Annual</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#475569" }}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ tool, parsed, monthlyLow, monthlyHigh }) => (
                <tr key={tool.id} className="border-b last:border-0" style={{ borderColor: "#f1f5f9" }}>
                  <td className="px-4 py-3 font-medium" style={{ color: "#0f172a" }}>
                    <Link to={`/tools/${tool.slug}`} className="hover:text-orange-600">{tool.name}</Link>
                    <span className="block text-xs font-normal" style={{ color: "#94a3b8" }}>
                      {parsed?.perUser ? "per-user pricing" : parsed ? "flat pricing" : "quote-based"}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ color: "#64748b" }}>{tool.price}</td>
                  {parsed && monthlyLow !== null ? (
                    <>
                      <td className="px-4 py-3 font-semibold" style={{ color: "#f97316" }}>
                        {monthlyLow === monthlyHigh ? money(monthlyLow) : `${money(monthlyLow)}–${money(monthlyHigh!)}`}
                      </td>
                      <td className="px-4 py-3 font-semibold" style={{ color: "#0f172a" }}>
                        {monthlyLow === monthlyHigh
                          ? money(monthlyLow * 12)
                          : `${money(monthlyLow * 12)}–${money(monthlyHigh! * 12)}`}
                      </td>
                    </>
                  ) : (
                    <td colSpan={2} className="px-4 py-3 italic" style={{ color: "#94a3b8" }}>
                      Custom quote — <Link to={`/pricing/${tool.slug}`} className="underline not-italic" style={{ color: "#f97316" }}>see pricing guide</Link>
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <a
                      href={tool.affiliateUrl || tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-medium whitespace-nowrap"
                      style={{ color: "#f97316" }}
                    >
                      Visit <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center" style={{ color: "#94a3b8" }}>
                    Select at least one tool above to see estimates.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 rounded-xl text-sm leading-relaxed" style={{ backgroundColor: "#f8fafc", color: "#64748b" }}>
          <strong style={{ color: "#374151" }}>How estimates work:</strong> per-user prices are multiplied by
          your team size; flat prices apply once regardless of team size; annual figures are monthly × 12.
          Estimates use vendor list prices from our{" "}
          <Link to="/pricing" className="underline" style={{ color: "#f97316" }}>Pricing Index</Link> and exclude
          implementation, training, and add-on modules — budget extra for year one. Vendors change prices;
          always confirm a written quote.
        </div>
      </div>
    </>
  );
}
