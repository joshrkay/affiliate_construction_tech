import { Link } from "react-router";
import { HardHat, ChevronRight, Search, Star, Users, Bot, Shield, FileText } from "lucide-react";
import { tools, trades } from "../data/constructionData";
import { comparisonPages } from "../data/seoPages";
import { guidePages } from "../data/guidePages";
import { defaultAuthor, defaultDateModified } from "../data/editorial";
import { PageByline } from "../components/PageByline";

export function AboutPage() {
  const canonicalUrl = "https://bestconstructionapps.com/about";
  const currentYear = new Date().getFullYear();

  return (
    <>
      <title>About BUILTECH — Who We Are & How We Evaluate Construction Software</title>
      <meta
        name="description"
        content={`BUILTECH is an independent construction technology directory tracking ${tools.length}+ software tools and AI platforms across ${trades.length} trades. Learn how we source ratings, evaluate tools, and keep the directory current.`}
      />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content="About BUILTECH — Construction Software Directory" />
      <meta property="og:description" content="Independent construction software directory. Ratings sourced from real contractor reviews across G2, Capterra, Software Advice, and direct submissions." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content="https://bestconstructionapps.com/og-default.png" />
      <meta name="twitter:card" content="summary_large_image" />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About BUILTECH",
          url: canonicalUrl,
          description: `Independent construction technology directory covering ${tools.length}+ software tools across ${trades.length} trades.`,
          publisher: {
            "@type": "Organization",
            name: "BUILTECH",
            url: "https://bestconstructionapps.com",
          },
        })}
      </script>

      <div style={{ backgroundColor: "#0c1a2e" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "#64748b" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: "#fb923c" }}>About</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f97316" }}>
              <HardHat className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">About BUILTECH</h1>
          </div>
          <p className="text-lg max-w-2xl mb-4" style={{ color: "#94a3b8" }}>
            An independent directory of construction software and AI tools, built for the contractors who use them every day.
          </p>
          <PageByline dateModified={defaultDateModified} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <section className="bg-white rounded-2xl border p-8" style={{ borderColor: "#e2e8f0" }}>
          <h2 className="text-xl font-bold mb-3" style={{ color: "#0f172a" }}>What BUILTECH is</h2>
          <p className="leading-relaxed mb-4" style={{ color: "#374151" }}>
            BUILTECH is a research directory covering <strong>{tools.length}+ construction software tools</strong>,{" "}
            <strong>{trades.length} trade categories</strong>, <strong>{comparisonPages.length} head-to-head comparisons</strong>, and{" "}
            <strong>{guidePages.length} buying & implementation guides</strong>. It exists to help general contractors, subcontractors, and trade businesses evaluate
            project management, estimating, field service, scheduling, and AI platforms without wading through vendor marketing.
          </p>
          <p className="leading-relaxed" style={{ color: "#374151" }}>
            We do not accept payment for editorial placement. Some tool pages link to vendors via affiliate links; those links do not influence rankings or ratings. See{" "}
            <Link to="/methodology" className="underline" style={{ color: "#f97316" }}>our methodology</Link> for full detail.
          </p>
        </section>

        <section className="bg-white rounded-2xl border p-8" style={{ borderColor: "#e2e8f0" }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: "#0f172a" }}>What we cover</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Search, label: "Tool reviews", body: `${tools.length}+ individual tool pages with features, pricing, ratings, pros, and cons.` },
              { icon: Users, label: "Trade-specific rankings", body: `${trades.length} trade pages — HVAC, electrical, plumbing, GC, roofing, and more.` },
              { icon: Star, label: "Head-to-head comparisons", body: `${comparisonPages.length} side-by-side matchups for the most-searched software decisions.` },
              { icon: FileText, label: "Buying & how-to guides", body: `${guidePages.length} guides covering selection, switching, pricing, and AI adoption.` },
              { icon: Bot, label: "AI tool coverage", body: "Dedicated tracking of AI estimating, scheduling, safety, and autonomous site tools." },
              { icon: Shield, label: "Independent ratings", body: "Ratings aggregate public review data; we do not sell placement." },
            ].map(({ icon: Icon, label, body }) => (
              <div key={label} className="flex gap-3">
                <Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#f97316" }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#0f172a" }}>{label}</p>
                  <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border p-8" style={{ borderColor: "#e2e8f0" }}>
          <h2 className="text-xl font-bold mb-3" style={{ color: "#0f172a" }}>Editorial team</h2>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: "#0c1a2e" }}>
              BT
            </div>
            <div>
              <p className="text-base font-semibold" style={{ color: "#0f172a" }}>{defaultAuthor.name}</p>
              <p className="text-sm mb-2" style={{ color: "#64748b" }}>{defaultAuthor.role}</p>
              <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                {defaultAuthor.bio}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border p-8" style={{ borderColor: "#e2e8f0" }}>
          <h2 className="text-xl font-bold mb-3" style={{ color: "#0f172a" }}>Contact & contributions</h2>
          <ul className="space-y-2 text-sm" style={{ color: "#374151" }}>
            <li>
              <strong>Tool vendors:</strong> submit your software at{" "}
              <Link to="/" className="underline" style={{ color: "#f97316" }}>bestconstructionapps.com</Link> using the "Submit a Tool" button.
            </li>
            <li>
              <strong>Contractors:</strong> write a review on any tool page — your experience helps other trades make better decisions.
            </li>
            <li>
              <strong>Corrections & feedback:</strong> if you spot an error in a rating, price, or feature, flag it on the relevant tool page.
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl border p-8" style={{ borderColor: "#e2e8f0" }}>
          <h2 className="text-xl font-bold mb-3" style={{ color: "#0f172a" }}>Read more</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/methodology" className="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg border transition-colors hover:bg-gray-50" style={{ borderColor: "#e2e8f0", color: "#0f172a" }}>
              Methodology <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/guides" className="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg border transition-colors hover:bg-gray-50" style={{ borderColor: "#e2e8f0", color: "#0f172a" }}>
              Browse guides <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/compare" className="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg border transition-colors hover:bg-gray-50" style={{ borderColor: "#e2e8f0", color: "#0f172a" }}>
              Compare software <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <p className="text-xs text-center" style={{ color: "#94a3b8" }}>
          © {currentYear} BUILTECH · Reviews reflect independent user opinions. BUILTECH does not endorse any specific vendor.
        </p>
      </div>
    </>
  );
}
