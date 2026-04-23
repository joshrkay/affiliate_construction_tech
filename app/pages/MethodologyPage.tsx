import { Link } from "react-router";
import { ChevronRight, ClipboardCheck, Database, Scale, RefreshCcw, AlertCircle } from "lucide-react";
import { tools, trades } from "../data/constructionData";
import { defaultDateModified } from "../data/editorial";
import { PageByline } from "../components/PageByline";

export function MethodologyPage() {
  const canonicalUrl = "https://bestconstructionapps.com/methodology";

  return (
    <>
      <title>BUILTECH Methodology — How We Evaluate Construction Software</title>
      <meta
        name="description"
        content="How BUILTECH sources ratings, scores tools, handles affiliate relationships, and keeps listings current across 140+ construction software and AI platforms."
      />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content="BUILTECH Methodology" />
      <meta property="og:description" content="How BUILTECH rates construction software, sources review data, and discloses affiliate relationships." />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content="https://bestconstructionapps.com/og-default.png" />
      <meta name="twitter:card" content="summary_large_image" />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "BUILTECH Methodology",
          description: "How BUILTECH sources ratings, scores tools, handles affiliate relationships, and keeps listings current.",
          url: canonicalUrl,
          datePublished: "2026-03-11",
          dateModified: defaultDateModified,
          author: {
            "@type": "Organization",
            name: "BUILTECH",
            url: "https://bestconstructionapps.com",
          },
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
            <span style={{ color: "#fb923c" }}>Methodology</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Our Methodology</h1>
          <p className="text-lg max-w-2xl mb-4" style={{ color: "#94a3b8" }}>
            How we source data, score {tools.length}+ tools across {trades.length} trades, and keep the directory honest.
          </p>
          <PageByline dateModified={defaultDateModified} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <Section icon={Database} title="Where ratings come from">
          <p>
            Every star rating on BUILTECH is a weighted aggregate drawn from publicly available contractor reviews. Primary sources include G2, Capterra, Software Advice, Trustpilot, and direct reviews submitted through this site. Where possible, we verify review volume against the vendor's own published review count.
          </p>
          <p className="mt-3">
            Ratings are recomputed when major platforms update their public averages, at minimum once per calendar quarter. The <code>reviewCount</code> shown on each tool page reflects the total across aggregated sources at the time of the last refresh.
          </p>
        </Section>

        <Section icon={ClipboardCheck} title="How tools are selected">
          <p>
            A tool is listed in BUILTECH when it meets all three of the following: (1) it is in active commercial use by U.S. construction contractors, (2) it has at least 20 verifiable third-party reviews, and (3) it serves one or more of the {trades.length} trade categories covered by the directory. We do not list software that is vaporware, beta-only, or purely whitelabeled.
          </p>
        </Section>

        <Section icon={Scale} title={`Rankings and "Top Pick" designations`}>
          <p>
            &ldquo;Top Pick&rdquo; and ranked lists reflect a composite of aggregate rating, review volume, breadth of features for the target use case, and pricing transparency. They are not paid placements. Ties on rating are broken by review volume.
          </p>
          <p className="mt-3">
            Comparisons between two tools present publicly available feature, pricing, and rating data. A comparison&apos;s &ldquo;winner by use case&rdquo; reflects our editorial read; it is not a universal recommendation.
          </p>
        </Section>

        <Section icon={AlertCircle} title="Affiliate & advertising disclosure">
          <p>
            BUILTECH may earn a referral commission when a reader signs up for a tool through an outbound link on a tool page. Affiliate relationships do not influence whether a tool is listed, how it is rated, or where it appears in rankings. We list tools that do not offer any affiliate relationship.
          </p>
          <p className="mt-3">
            We do not accept payment for editorial placement, review wording, or preferential ranking. Where we run sponsored content it is labeled as such.
          </p>
        </Section>

        <Section icon={RefreshCcw} title="Update cadence & corrections">
          <p>
            Tool pages are reviewed on a rolling quarterly basis. Every page displays a "Reviewed by" byline and a "Last updated" date reflecting the most recent editorial review, not just automated rebuilds.
          </p>
          <p className="mt-3">
            Found an outdated price, a feature we miscategorized, or a rating that feels off? Flag it on the tool page or email the editorial team — corrections are posted within seven business days.
          </p>
        </Section>

        <Section icon={ClipboardCheck} title="AI-generated content disclosure">
          <p>
            Some tool descriptions, trade overviews, and FAQ answers on BUILTECH are drafted with AI assistance, then reviewed by a human editor before publication. Ratings, review counts, and pricing data are sourced from primary data, never generated. Where a page relies on AI-assisted drafting, the "Reviewed by" byline indicates human review has occurred.
          </p>
        </Section>

        <div className="bg-white rounded-2xl border p-6 flex flex-wrap gap-3 justify-center" style={{ borderColor: "#e2e8f0" }}>
          <Link to="/about" className="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg border transition-colors hover:bg-gray-50" style={{ borderColor: "#e2e8f0", color: "#0f172a" }}>
            About BUILTECH <ChevronRight className="w-4 h-4" />
          </Link>
          <Link to="/guides" className="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg border transition-colors hover:bg-gray-50" style={{ borderColor: "#e2e8f0", color: "#0f172a" }}>
            Browse guides <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl border p-8" style={{ borderColor: "#e2e8f0" }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#fff7ed" }}>
          <Icon className="w-5 h-5" style={{ color: "#f97316" }} />
        </div>
        <h2 className="text-xl font-bold" style={{ color: "#0f172a" }}>{title}</h2>
      </div>
      <div className="text-sm leading-relaxed space-y-0" style={{ color: "#374151" }}>
        {children}
      </div>
    </section>
  );
}
