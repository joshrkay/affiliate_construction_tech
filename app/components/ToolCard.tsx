import { Link } from "react-router";
import { ArrowRight, CheckCircle, GitCompareArrows, Plus, Check } from "lucide-react";
import { Tool } from "../data/constructionData";
import { StarRating } from "./StarRating";
import { useApp } from "../context/AppContext";

interface ToolCardProps {
  tool: Tool;
  rank?: number;
  compact?: boolean;
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "AI Agent": { bg: "#fdf2f8", text: "#9333ea", border: "#e9d5ff" },
  Platform: { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  Software: { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
};

export function ToolCard({ tool, rank, compact = false }: ToolCardProps) {
  const catStyle = categoryColors[tool.category] || categoryColors["Software"];
  const { addToCompare, removeFromCompare, isInCompare, compareList } = useApp();
  const inCompare = isInCompare(tool.id);
  const compareMax = compareList.length >= 4 && !inCompare;

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(tool.id);
    } else if (!compareMax) {
      addToCompare(tool);
    }
  };

  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border overflow-hidden"
      style={{ borderColor: inCompare ? "#f97316" : "#e2e8f0" }}
    >
      {inCompare && (
        <div
          className="h-1 w-full"
          style={{ backgroundColor: "#f97316" }}
        />
      )}
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Rank Badge */}
          {rank && (
            <div
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: rank === 1 ? "#f59e0b" : rank === 2 ? "#94a3b8" : rank === 3 ? "#cd7c4f" : "#e2e8f0",
                color: rank <= 3 ? "white" : "#64748b",
              }}
            >
              {rank}
            </div>
          )}

          {/* Logo */}
          <div
            className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm"
            style={{ backgroundColor: tool.logoColor }}
          >
            {tool.logoInitials}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-semibold" style={{ color: "#0f172a" }}>
                {tool.name}
              </h3>
              {tool.verified && (
                <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "#0891b2" }} />
              )}
            </div>
            <p className="text-xs mt-0.5 truncate" style={{ color: "#64748b" }}>
              {tool.tagline}
            </p>
          </div>

          {/* Compare Toggle */}
          <button
            onClick={handleCompareToggle}
            title={inCompare ? "Remove from compare" : compareMax ? "Compare list full (max 4)" : "Add to compare"}
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-all"
            style={{
              backgroundColor: inCompare ? "#fff7ed" : "white",
              borderColor: inCompare ? "#f97316" : "#e2e8f0",
              opacity: compareMax ? 0.4 : 1,
              cursor: compareMax ? "not-allowed" : "pointer",
            }}
          >
            {inCompare ? (
              <Check className="w-4 h-4" style={{ color: "#f97316" }} />
            ) : (
              <GitCompareArrows className="w-4 h-4" style={{ color: "#94a3b8" }} />
            )}
          </button>
        </div>

        {/* Rating + Category */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating rating={tool.rating} size="sm" />
            <span className="text-xs font-semibold" style={{ color: "#1e293b" }}>
              {tool.rating.toFixed(1)}
            </span>
            <span className="text-xs" style={{ color: "#94a3b8" }}>
              ({tool.reviewCount.toLocaleString()})
            </span>
          </div>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium border"
            style={{
              backgroundColor: catStyle.bg,
              color: catStyle.text,
              borderColor: catStyle.border,
            }}
          >
            {tool.category}
          </span>
        </div>

        {!compact && (
          <>
            <p className="mt-3 text-xs leading-relaxed line-clamp-2" style={{ color: "#64748b" }}>
              {tool.description}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs" style={{ color: "#94a3b8" }}>
                  Starting at
                </p>
                <p className="text-sm font-semibold" style={{ color: "#0f172a" }}>
                  {tool.price}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium" style={{ color: "#f97316" }}>
                View Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
