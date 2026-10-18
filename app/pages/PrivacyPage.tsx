import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { PageByline } from "../components/PageByline";
import { defaultDateModified } from "../data/editorial";

const canonicalUrl = "https://bestconstructionapps.com/privacy";

export function PrivacyPage() {
  return (
    <div>
      <title>Privacy Policy</title>
      <meta name="description" content="What BUILTECH collects when you visit bestconstructionapps.com, how analytics and affiliate links work, and how to contact us." />
      <link rel="canonical" href={canonicalUrl} />

      <div style={{ backgroundColor: "#0c1a2e" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "#64748b" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: "#fb923c" }}>Privacy Policy</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <PageByline dateModified={defaultDateModified} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border p-8 space-y-6 text-[15px] leading-relaxed" style={{ borderColor: "#e2e8f0", color: "#374151" }}>
          <p>
            BUILTECH (bestconstructionapps.com) is a research directory. You do not need an account to use it and we do not sell personal information. This page explains what is collected and why.
          </p>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#0f172a" }}>Analytics</h2>
            <p>
              We use Google Analytics 4 and Vercel Analytics to understand which pages are read and which outbound links are clicked. These services set cookies or use anonymized identifiers and may process your IP address, browser type, and the pages you visit. We use this data in aggregate to improve the site. You can opt out of Google Analytics with the{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#c2410c" }}>
                Google Analytics opt-out browser add-on
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#0f172a" }}>Outbound and affiliate links</h2>
            <p>
              Links to software vendors may be affiliate links. When you click one we record the click (the tool, the page, and where on the page the link was) and the vendor may set its own cookies to attribute a signup to us. We may earn a commission if you buy. This never changes a rating or ranking; see our{" "}
              <Link to="/methodology" className="underline" style={{ color: "#c2410c" }}>methodology</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#0f172a" }}>Things you submit</h2>
            <p>
              Reader reviews you write are stored in your own browser until they are moderated and published. Tool submissions and newsletter signups are sent to the third-party form or email provider named on the form, under that provider's privacy terms. We do not share submitted email addresses with vendors.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#0f172a" }}>Your choices</h2>
            <p>
              You can block cookies in your browser, use the analytics opt-out above, and ask us to delete anything you submitted. Contact details are on the{" "}
              <Link to="/about" className="underline" style={{ color: "#c2410c" }}>About page</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#0f172a" }}>Changes</h2>
            <p>
              We will update the date at the top of this page when this policy changes. Continued use of the site after a change means you accept the updated policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
