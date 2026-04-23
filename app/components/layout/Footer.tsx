import { Link } from "react-router";
import { HardHat, Twitter, Linkedin, Youtube } from "lucide-react";
import { trades } from "../../data/constructionData";
import { useApp } from "../../context/AppContext";

export function Footer() {
  const { openSubmitModal, openReviewModal } = useApp();
  return (
    <footer style={{ backgroundColor: "#0c1a2e" }} className="border-t" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#f97316" }}
              >
                <HardHat className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">BUILTECH</p>
                <p className="text-xs" style={{ color: "#64748b" }}>
                  AI & Software Directory
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
              The construction industry's most trusted directory for AI tools, software platforms, and technology reviews — organized by trade.
            </p>
            <div className="flex gap-3 mt-5">
              {[Twitter, Linkedin, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                  style={{ backgroundColor: "#1e3a5f" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "#64748b" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Trades */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Browse by Trade</h4>
            <ul className="space-y-2.5">
              {trades.map((trade) => (
                <li key={trade.id}>
                  <Link
                    to={`/trades/${trade.slug}`}
                    className="text-sm flex items-center gap-2 hover:text-orange-400 transition-colors"
                    style={{ color: "#64748b" }}
                  >
                    <span className="text-xs">{trade.emoji}</span>
                    {trade.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/guides" className="text-sm hover:text-orange-400 transition-colors" style={{ color: "#64748b" }}>
                  All Guides
                </Link>
              </li>
              <li>
                <Link to="/guides/how-to-choose-construction-software" className="text-sm hover:text-orange-400 transition-colors" style={{ color: "#64748b" }}>
                  How to Choose Software
                </Link>
              </li>
              <li>
                <Link to="/guides/construction-software-pricing-guide" className="text-sm hover:text-orange-400 transition-colors" style={{ color: "#64748b" }}>
                  Pricing Guide
                </Link>
              </li>
              <li>
                <Link to="/guides/ai-construction-tools-guide" className="text-sm hover:text-orange-400 transition-colors" style={{ color: "#64748b" }}>
                  AI Tools Guide
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-sm hover:text-orange-400 transition-colors" style={{ color: "#64748b" }}>
                  Compare Software
                </Link>
              </li>
              <li>
                <Link to="/compare/procore-vs-buildertrend" className="text-sm hover:text-orange-400 transition-colors" style={{ color: "#64748b" }}>
                  Procore vs Buildertrend
                </Link>
              </li>
              <li>
                <Link to="/compare/jobber-vs-servicetitan" className="text-sm hover:text-orange-400 transition-colors" style={{ color: "#64748b" }}>
                  Jobber vs ServiceTitan
                </Link>
              </li>
              <li>
                <Link to="/guides/construction-software-for-small-contractors" className="text-sm hover:text-orange-400 transition-colors" style={{ color: "#64748b" }}>
                  Small Contractor Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="text-sm hover:text-orange-400 transition-colors" style={{ color: "#64748b" }}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/methodology" className="text-sm hover:text-orange-400 transition-colors" style={{ color: "#64748b" }}>
                  Methodology
                </Link>
              </li>
              <li>
                <button onClick={openSubmitModal} className="text-sm hover:text-orange-400 transition-colors text-left" style={{ color: "#64748b" }}>
                  Submit a Tool
                </button>
              </li>
              <li>
                <button onClick={() => openReviewModal()} className="text-sm hover:text-orange-400 transition-colors text-left" style={{ color: "#64748b" }}>
                  Write a Review
                </button>
              </li>
              {[
                { label: "Advertise", href: "/advertise" },
                { label: "Review Guidelines", href: "/review-guidelines" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm hover:text-orange-400 transition-colors" style={{ color: "#64748b" }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t"
          style={{ borderColor: "#1e3a5f" }}
        >
          <p className="text-sm" style={{ color: "#64748b" }}>
            © 2026 BUILTECH Directory. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#475569" }}>
            Reviews reflect independent user opinions. BUILTECH does not endorse any specific software vendor.
          </p>
        </div>
      </div>
    </footer>
  );
}