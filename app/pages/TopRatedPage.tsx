import { Link } from "react-router";
import { StarRating } from "../components/StarRating";
import { TrendingUp, TrendingDown, Minus, Star, ChevronRight } from "lucide-react";

// Monthly top rated data
const monthlyData = [
  {
    toolId: "togal-ai",
    slug: "togal-ai",
    name: "Togal.AI",
    logoColor: "#7c3aed",
    logoInitials: "TG",
    category: "AI Agent",
    type: "AI Takeoff",
    currentRating: 4.8,
    previousRating: 4.5,
    reviewCount: 387,
    description: "AI-powered takeoff software that automatically detects and measures electrical components on architectural plans.",
  },
  {
    toolId: "bluebeam-revu",
    slug: "bluebeam-revu",
    name: "Bluebeam Revu",
    logoColor: "#00adef",
    logoInitials: "BB",
    category: "Software",
    type: "Document Management",
    currentRating: 4.7,
    previousRating: 4.6,
    reviewCount: 2341,
    description: "Professional PDF solution for construction document management, markup, and collaboration.",
  },
  {
    toolId: "procore",
    slug: "procore",
    name: "Procore",
    logoColor: "#e63b2e",
    logoInitials: "PC",
    category: "Platform",
    type: "Project Management",
    currentRating: 4.6,
    previousRating: 4.7,
    reviewCount: 1842,
    description: "The #1 construction management platform used by over 7 million users worldwide.",
  },
  {
    toolId: "servicetitan",
    slug: "servicetitan",
    name: "ServiceTitan",
    logoColor: "#ff6900",
    logoInitials: "ST",
    category: "Platform",
    type: "Field Service Management",
    currentRating: 4.6,
    previousRating: 4.5,
    reviewCount: 1567,
    description: "Comprehensive field service management platform for home and commercial service businesses.",
  },
  {
    toolId: "autodesk-construction-cloud",
    slug: "autodesk-construction-cloud",
    name: "Autodesk Construction Cloud",
    logoColor: "#1a56db",
    logoInitials: "ACC",
    category: "Platform",
    type: "BIM & Project Management",
    currentRating: 4.5,
    previousRating: 4.5,
    reviewCount: 1204,
    description: "Connect workflows, teams, and data from design to construction.",
  },
  {
    toolId: "jobtread",
    slug: "jobtread",
    name: "JobTread",
    logoColor: "#0d9488",
    logoInitials: "JT",
    category: "Software",
    type: "Project Management",
    currentRating: 4.5,
    previousRating: 4.3,
    reviewCount: 612,
    description: "End-to-end construction management platform for contractors.",
  },
  {
    toolId: "jobber",
    slug: "jobber",
    name: "Jobber",
    logoColor: "#0ea5e9",
    logoInitials: "JB",
    category: "Software",
    type: "Field Service Management",
    currentRating: 4.3,
    previousRating: 4.2,
    reviewCount: 4521,
    description: "Field service management software for home service businesses.",
  },
  {
    toolId: "buildertrend",
    slug: "buildertrend",
    name: "Buildertrend",
    logoColor: "#10b981",
    logoInitials: "BT",
    category: "Software",
    type: "Construction Management",
    currentRating: 4.5,
    previousRating: 4.4,
    reviewCount: 2134,
    description: "Construction management software designed for home builders and remodelers.",
  },
  {
    toolId: "stack-takeoff",
    slug: "stack-takeoff",
    name: "STACK Takeoff",
    logoColor: "#0d9488",
    logoInitials: "ST",
    category: "Software",
    type: "Takeoff & Estimating",
    currentRating: 4.4,
    previousRating: 4.3,
    reviewCount: 1823,
    description: "Cloud-based construction takeoff and estimating software.",
  },
  {
    toolId: "housecall-pro",
    slug: "housecall-pro",
    name: "Housecall Pro",
    logoColor: "#10b981",
    logoInitials: "HC",
    category: "Software",
    type: "Field Service Management",
    currentRating: 4.4,
    previousRating: 4.3,
    reviewCount: 2847,
    description: "All-in-one field service management platform for home service businesses.",
  },
];

const MONTH_LABEL = "March 2026";

export function TopRatedPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>
      {/* Header */}
      <div className="bg-white border-b" style={{ borderColor: "#e2e8f0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5" style={{ color: "#f97316" }} />
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#f97316" }}
            >
              {MONTH_LABEL}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#0f172a" }}>
            Top Rated Construction Software
          </h1>
          <p className="text-lg" style={{ color: "#64748b" }}>
            The highest-rated construction software tools based on verified contractor reviews.
          </p>
        </div>
      </div>

      {/* Rankings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {monthlyData.map((tool, idx) => {
            const delta = tool.currentRating - tool.previousRating;
            const isUp = delta > 0;
            const isDown = delta < 0;

            return (
              <div
                key={tool.toolId}
                className="bg-white rounded-2xl border p-6 transition-all hover:shadow-lg"
                style={{ borderColor: "#e2e8f0" }}
              >
                <div className="flex items-center gap-6">
                  {/* Rank */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shrink-0"
                    style={{
                      backgroundColor: idx === 0 ? "#fff7ed" : idx < 3 ? "#f8fafc" : "#f8fafc",
                      color: idx === 0 ? "#f97316" : idx < 3 ? "#0f172a" : "#94a3b8",
                    }}
                  >
                    {idx + 1}
                  </div>

                  {/* Logo */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                    style={{ backgroundColor: tool.logoColor }}
                  >
                    {tool.logoInitials}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <Link
                        to={`/tools/${tool.slug}`}
                        className="text-xl font-bold hover:text-orange-500 transition-colors"
                        style={{ color: "#0f172a" }}
                      >
                        {tool.name}
                      </Link>
                      <span
                        className="inline-block text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: "#f0fdf4",
                          color: "#15803d",
                        }}
                      >
                        {tool.category}
                      </span>
                      <span
                        className="inline-block text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: "#eff6ff",
                          color: "#1d4ed8",
                        }}
                      >
                        {tool.type}
                      </span>
                    </div>
                    <p className="text-sm mb-2" style={{ color: "#64748b" }}>
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <StarRating rating={tool.currentRating} size="md" />
                        <span className="text-lg font-bold" style={{ color: "#0f172a" }}>
                          {tool.currentRating.toFixed(1)}
                        </span>
                        {isUp && (
                          <span className="flex items-center gap-1 text-xs" style={{ color: "#15803d" }}>
                            <TrendingUp className="w-3 h-3" /> +{delta.toFixed(1)}
                          </span>
                        )}
                        {isDown && (
                          <span className="flex items-center gap-1 text-xs" style={{ color: "#b91c1c" }}>
                            <TrendingDown className="w-3 h-3" /> {delta.toFixed(1)}
                          </span>
                        )}
                      </div>
                      <span className="text-sm" style={{ color: "#94a3b8" }}>
                        {tool.reviewCount.toLocaleString()} reviews
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors hover:bg-orange-50"
                    style={{ color: "#f97316" }}
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm mt-8" style={{ color: "#94a3b8" }}>
          Rankings updated monthly • Based on verified contractor reviews • {MONTH_LABEL}
        </p>
      </div>
    </div>
  );
}
