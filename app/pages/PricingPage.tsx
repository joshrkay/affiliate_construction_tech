import { Link, useParams } from "react-router";
import { useMemo } from "react";
import { ChevronRight, DollarSign, ExternalLink, Check } from "lucide-react";
import { tools, trades } from "../data/constructionData";
import { StarRating } from "../components/StarRating";
import { PageByline } from "../components/PageByline";
import { defaultAuthor, defaultDatePublished, defaultDateModified } from "../data/editorial";

/**
 * Per-tool pricing page targeting "[tool] pricing" / "[tool] cost" queries —
 * high-intent keywords that vendors themselves rarely answer.
 */
export function PricingPage() {
  const { slug } = useParams();
  const tool = useMemo(() => tools.find((t) => t.slug === slug), [slug]);

  const alternatives = useMemo(() => {
    if (!tool) return [];
    return tools
      .filter((t) => t.id !== tool.id && (t.type === tool.type || t.tradeIds.some((id) => tool.tradeIds.includes(id))))
      .sort((a, b) => (a.type === tool.type ? -1 : 0) - (b.type === tool.type ? -1 : 0) || b.rating - a.rating)
      .slice(0, 6);
  }, [tool]);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8fafc" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#0f172a" }}>Tool Not Found</h1>
          <p className="mb-4" style={{ color: "#64748b" }}>We don't have pricing data for that tool.</p>
          <Link to="/pricing" className="text-orange-500 hover:underline">Browse the pricing index</Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `https://bestconstructionapps.com/pricing/${tool.slug}`;
  const year = new Date().getFullYear();
  const isCustom = /custom|contact/i.test(tool.price);
  const toolTrades = trades.filter((t) => tool.tradeIds.includes(t.id));

  const faqs = [
    {
      question: `How much does ${tool.name} cost?`,
      answer: isCustom
        ? `${tool.name} does not publish list pricing — quotes are custom per company. ${tool.priceNote} Expect the final number to depend on company size, project volume, and which modules you license.`
        : `${tool.name} starts at ${tool.price}. ${tool.priceNote}`,
    },
    {
      question: `Is there a free trial of ${tool.name}?`,
      answer: /trial|demo/i.test(tool.priceNote)
        ? tool.priceNote
        : `Check ${tool.name}'s website for current trial or demo availability — vendors change trial terms frequently.`,
    },
    {
      question: `What affects the real cost of ${tool.name}?`,
      answer: `Beyond the sticker price, budget for onboarding and training time, data migration from your current system, per-user fees as your team grows, and any add-on modules. For most construction software, year-one total cost runs meaningfully above the subscription line item.`,
    },
  ];

  return (
    <>
      <title>{`${tool.name} Pricing (${year}) — Cost, Plans & Cheaper Alternatives | BUILTECH`}</title>
      <meta
        name="description"
        content={`${tool.name} pricing in ${year}: starts at ${tool.price}. ${tool.priceNote} Compare cost against ${alternatives.slice(0, 3).map((a) => a.name).join(", ")} and more.`}
      />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={`${tool.name} Pricing (${year})`} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        })}
      </script>

      {/* Header */}
      <div style={{ backgroundColor: "#0c1a2e" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "#64748b" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: "#fb923c" }}>{tool.name}</span>
          </nav>
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
              style={{ backgroundColor: tool.logoColor }}
            >
              {tool.logoInitials}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{tool.name} Pricing ({year})</h1>
              <div className="flex items-center gap-2 mt-2">
                <StarRating rating={tool.rating} size="sm" />
                <span className="text-sm" style={{ color: "#94a3b8" }}>
                  {tool.rating} ({tool.reviewCount} ratings) · {tool.type}
                </span>
              </div>
              <div className="mt-3">
                <PageByline dateModified={defaultDateModified} datePublished={defaultDatePublished} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Price summary card */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm mb-8" style={{ borderColor: "#e2e8f0" }}>
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#94a3b8" }}>
                Starting Price
              </p>
              <p className="text-3xl font-bold" style={{ color: "#f97316" }}>{tool.price}</p>
            </div>
            <div className="flex-1 min-w-[220px]">
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#94a3b8" }}>
                Pricing Model
              </p>
              <p className="text-sm" style={{ color: "#374151" }}>{tool.priceNote}</p>
            </div>
            <a
              href={tool.affiliateUrl || tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
              style={{ backgroundColor: "#f97316" }}
            >
              Visit {tool.name} <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* What you get */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#0f172a" }}>
            What You Get for the Price
          </h2>
          <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#374151" }}>{tool.description}</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {tool.features.slice(0, 8).map((feature) => (
              <div key={feature} className="flex items-start gap-2 text-sm" style={{ color: "#374151" }}>
                <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#16a34a" }} />
                {feature}
              </div>
            ))}
          </div>
        </section>

        {/* Cost planning */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#0f172a" }}>
            Budgeting for {tool.name}: Beyond the Sticker Price
          </h2>
          <ul className="space-y-3 text-[15px]" style={{ color: "#374151" }}>
            <li className="flex gap-2">
              <DollarSign className="w-4 h-4 mt-1 shrink-0" style={{ color: "#f97316" }} />
              <span>
                <strong>Subscription:</strong> {isCustom
                  ? `${tool.name} quotes per company — get pricing in writing for your exact team size and project volume, and ask what triggers a price increase at renewal.`
                  : `Starts at ${tool.price}. ${tool.priceNote}`}
              </span>
            </li>
            <li className="flex gap-2">
              <DollarSign className="w-4 h-4 mt-1 shrink-0" style={{ color: "#f97316" }} />
              <span>
                <strong>Implementation & training:</strong> plan for ramp-up time before the software pays for
                itself — ask the vendor what onboarding support is included versus billed separately.
              </span>
            </li>
            <li className="flex gap-2">
              <DollarSign className="w-4 h-4 mt-1 shrink-0" style={{ color: "#f97316" }} />
              <span>
                <strong>Growth costs:</strong> confirm how pricing scales with users, projects, or revenue so
                a good year doesn't turn into a surprise invoice.
              </span>
            </li>
          </ul>
        </section>

        {/* Alternatives price table */}
        {alternatives.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#0f172a" }}>
              How {tool.name} Pricing Compares
            </h2>
            <div className="overflow-x-auto bg-white rounded-2xl border shadow-sm" style={{ borderColor: "#e2e8f0" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "#e2e8f0", backgroundColor: "#f8fafc" }}>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "#475569" }}>Tool</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "#475569" }}>Starting Price</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: "#475569" }}>Rating</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell" style={{ color: "#475569" }}>Category</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b font-medium" style={{ borderColor: "#f1f5f9", backgroundColor: "#fff7ed" }}>
                    <td className="px-4 py-3" style={{ color: "#0f172a" }}>{tool.name} (this page)</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: "#f97316" }}>{tool.price}</td>
                    <td className="px-4 py-3" style={{ color: "#374151" }}>{tool.rating}</td>
                    <td className="px-4 py-3 hidden sm:table-cell" style={{ color: "#64748b" }}>{tool.type}</td>
                  </tr>
                  {alternatives.map((alt) => (
                    <tr key={alt.id} className="border-b last:border-0" style={{ borderColor: "#f1f5f9" }}>
                      <td className="px-4 py-3" style={{ color: "#0f172a" }}>
                        <Link to={`/pricing/${alt.slug}`} className="hover:text-orange-600">{alt.name}</Link>
                      </td>
                      <td className="px-4 py-3" style={{ color: "#374151" }}>{alt.price}</td>
                      <td className="px-4 py-3" style={{ color: "#374151" }}>{alt.rating}</td>
                      <td className="px-4 py-3 hidden sm:table-cell" style={{ color: "#64748b" }}>{alt.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="mb-10 max-w-3xl">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#0f172a" }}>
            {tool.name} Pricing FAQ
          </h2>
          {faqs.map((faq) => (
            <div key={faq.question} className="mb-6">
              <h3 className="text-base font-semibold mb-2" style={{ color: "#0f172a" }}>{faq.question}</h3>
              <p className="text-[15px] leading-relaxed" style={{ color: "#475569" }}>{faq.answer}</p>
            </div>
          ))}
        </section>

        {/* Cross links */}
        <div className="p-6 rounded-2xl" style={{ backgroundColor: "#fff7ed" }}>
          <h3 className="text-lg font-bold mb-2" style={{ color: "#92400e" }}>Keep researching</h3>
          <div className="flex flex-wrap gap-3 mt-3">
            <Link
              to={`/tools/${tool.slug}`}
              className="px-5 py-2.5 rounded-xl font-medium text-sm text-white"
              style={{ backgroundColor: "#f97316" }}
            >
              Read the Full {tool.name} Review
            </Link>
            <Link
              to="/pricing"
              className="px-5 py-2.5 rounded-xl border text-sm font-medium bg-white"
              style={{ borderColor: "#e2e8f0", color: "#374151" }}
            >
              Pricing Index
            </Link>
            {toolTrades[0] && (
              <Link
                to={`/trades/${toolTrades[0].slug}`}
                className="px-5 py-2.5 rounded-xl border text-sm font-medium bg-white"
                style={{ borderColor: "#e2e8f0", color: "#374151" }}
              >
                Best {toolTrades[0].name} Software
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
