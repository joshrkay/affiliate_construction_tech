import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { PageByline } from "../components/PageByline";
import { defaultDateModified } from "../data/editorial";

const canonicalUrl = "https://bestconstructionapps.com/terms";

export function TermsPage() {
  return (
    <div>
      <title>Terms of Use</title>
      <meta name="description" content="Terms for using bestconstructionapps.com: editorial independence, affiliate disclosure, accuracy of pricing and ratings, and limits of liability." />
      <link rel="canonical" href={canonicalUrl} />

      <div style={{ backgroundColor: "#0c1a2e" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "#64748b" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: "#fb923c" }}>Terms of Use</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Terms of Use</h1>
          <PageByline dateModified={defaultDateModified} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border p-8 space-y-6 text-[15px] leading-relaxed" style={{ borderColor: "#e2e8f0", color: "#374151" }}>
          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#0f172a" }}>What this site is</h2>
            <p>
              BUILTECH publishes independent research about construction software: ratings aggregated from public review platforms, pricing collected from vendor websites, comparisons, and buying guides. It is information, not advice tailored to your business. Confirm pricing, features, and contract terms with the vendor before you buy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#0f172a" }}>Affiliate disclosure</h2>
            <p>
              Some links to vendors are affiliate links and we may earn a commission if you sign up through them. Vendors do not pay for placement, ratings, or rankings. How we rate tools and handle affiliate relationships is described on the{" "}
              <Link to="/methodology" className="underline" style={{ color: "#c2410c" }}>methodology page</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#0f172a" }}>Accuracy</h2>
            <p>
              Vendors change prices, plans, and features without notice. Every page shows the date it was last reviewed. We correct errors when we find them or when a reader or vendor reports one; use the contact details on the{" "}
              <Link to="/about" className="underline" style={{ color: "#c2410c" }}>About page</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#0f172a" }}>Reader reviews and submissions</h2>
            <p>
              By submitting a review or a tool you confirm it is your own honest experience or accurate information, and you give us a non-exclusive right to publish and edit it. We remove reviews that look fabricated, that come from a vendor about its own product or a competitor's, or that contain personal attacks.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#0f172a" }}>Trademarks and content</h2>
            <p>
              Product names and logos belong to their owners and are used to identify the products being reviewed. Our own text and data may be quoted with a link to the page it came from. Copying whole pages or the dataset for republication requires permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#0f172a" }}>Liability</h2>
            <p>
              The site is provided as is. To the extent allowed by law we are not liable for losses that result from relying on information here, including a software purchase that does not work out.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
