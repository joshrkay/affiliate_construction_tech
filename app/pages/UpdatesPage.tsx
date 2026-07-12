import { Link } from "react-router";
import { ChevronRight, Megaphone } from "lucide-react";
import { siteUpdates } from "../data/siteUpdates";

export function UpdatesPage() {
  return (
    <>
      <title>Latest Updates — What's New on BUILTECH</title>
      <meta
        name="description"
        content="New tools, refreshed reviews, corrected pricing, and site improvements — everything that changed recently on BUILTECH's construction software directory."
      />
      <link rel="canonical" href="https://bestconstructionapps.com/updates" />

      {/* Header */}
      <div style={{ backgroundColor: "#0c1a2e" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "#64748b" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: "#fb923c" }}>Updates</span>
          </nav>
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(249,115,22,0.2)" }}
            >
              <Megaphone className="w-6 h-6" style={{ color: "#f97316" }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">What's New on BUILTECH</h1>
              <p className="mt-1" style={{ color: "#94a3b8" }}>
                New tools, refreshed data, corrections, and site improvements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-6">
          {siteUpdates.map((update, idx) => (
            <div
              key={`${update.date}-${idx}`}
              className="bg-white rounded-2xl border p-6 shadow-sm"
              style={{ borderColor: "#e2e8f0" }}
            >
              <time className="text-xs font-semibold uppercase tracking-wider" dateTime={update.date} style={{ color: "#94a3b8" }}>
                {new Date(update.date + "T00:00:00").toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className="text-lg font-bold mt-1 mb-2" style={{ color: "#0f172a" }}>{update.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{update.description}</p>
              {update.link && (
                <Link to={update.link} className="inline-block mt-3 text-sm font-medium" style={{ color: "#f97316" }}>
                  {update.linkLabel || "Learn more"} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
