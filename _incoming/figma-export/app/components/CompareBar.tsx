import { useNavigate } from "react-router";
import { X, GitCompareArrows, ChevronRight, AlertCircle } from "lucide-react";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";

export function CompareBar() {
  const navigate = useNavigate();
  const { compareList, removeFromCompare, clearCompare, compareTradeSlug } = useApp();

  const handleCompare = () => {
    const toolIds = compareList.map((t) => t.id).join(",");
    const tradeParam = compareTradeSlug ? `&trade=${compareTradeSlug}` : "";
    navigate(`/compare?tools=${toolIds}${tradeParam}`);
  };

  return (
    <AnimatePresence>
      {compareList.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 shadow-2xl border-t"
          style={{ backgroundColor: "#0c1a2e", borderColor: "#1e3a5f" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 shrink-0">
                <GitCompareArrows className="w-4 h-4" style={{ color: "#f97316" }} />
                <span className="text-sm font-semibold text-white">
                  Compare ({compareList.length}/4)
                </span>
              </div>

              {/* Tool chips */}
              <div className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                {compareList.map((tool) => (
                  <div
                    key={tool.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border shrink-0"
                    style={{ backgroundColor: "rgba(255,255,255,0.06)", borderColor: "#1e3a5f" }}
                  >
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: tool.logoColor }}
                    >
                      {tool.logoInitials[0]}
                    </div>
                    <span className="text-xs text-white whitespace-nowrap">{tool.name}</span>
                    <button
                      onClick={() => removeFromCompare(tool.id)}
                      className="hover:text-red-400 transition-colors"
                      style={{ color: "#64748b" }}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {compareList.length < 4 && (
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dashed shrink-0"
                    style={{ borderColor: "#334155" }}
                  >
                    <span className="text-xs" style={{ color: "#475569" }}>
                      Add up to {4 - compareList.length} more
                    </span>
                  </div>
                )}
              </div>

              {compareList.length < 2 && (
                <div className="hidden sm:flex items-center gap-1 shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" style={{ color: "#64748b" }} />
                  <span className="text-xs" style={{ color: "#64748b" }}>
                    Select at least 2
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={clearCompare}
                  className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/5"
                  style={{ borderColor: "#1e3a5f", color: "#64748b" }}
                >
                  Clear
                </button>
                <button
                  onClick={handleCompare}
                  disabled={compareList.length < 2}
                  className="flex items-center gap-1.5 text-sm font-medium text-white px-4 py-2 rounded-xl transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#f97316" }}
                >
                  Compare Now
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}