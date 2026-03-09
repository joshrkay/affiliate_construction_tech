import { useSearchParams, Link, useNavigate } from "react-router";
import { useMemo, useState } from "react";
import {
  Check,
  X,
  Minus,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Star,
  GitCompareArrows,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import { tools, trades, getTradeBySlug } from "../data/constructionData";
import {
  tradeCompareFeatures,
  toolCapabilityMap,
  CompareFeatureGroup,
} from "../data/comparisonData";
import { StarRating } from "../components/StarRating";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";

const MAX_TOOLS = 4;

const GENERIC_FEATURES: CompareFeatureGroup[] = [
  {
    category: "Core Capabilities",
    features: [
      { key: "mobile-app", label: "Mobile App" },
      { key: "api", label: "Open API / Integrations" },
      { key: "document-mgmt", label: "Document Management" },
      { key: "photo-docs", label: "Photo Documentation" },
      { key: "daily-logs", label: "Daily Logs" },
    ],
  },
  {
    category: "Project & Finance",
    features: [
      { key: "scheduling", label: "Scheduling" },
      { key: "job-costing", label: "Job Costing" },
      { key: "budget-tracking", label: "Budget Tracking" },
      { key: "change-orders", label: "Change Order Management" },
      { key: "invoicing", label: "Invoicing & Billing" },
      { key: "quickbooks", label: "QuickBooks Integration" },
    ],
  },
  {
    category: "Estimating",
    features: [
      { key: "pdf-takeoff", label: "PDF Plan Takeoff" },
      { key: "ai-takeoff", label: "AI Auto-Detect Takeoff" },
      { key: "material-db", label: "Material Pricing Database" },
      { key: "bid-assembly", label: "Bid Assembly & Proposals" },
    ],
  },
  {
    category: "Field & Service",
    features: [
      { key: "dispatch", label: "Dispatch & Scheduling" },
      { key: "service-agreements", label: "Service Agreements" },
      { key: "crm", label: "Customer CRM" },
      { key: "bim-integration", label: "BIM Integration" },
    ],
  },
];

// ─── Step-1: Trade Selector ─────────────────────────────────────────────────
function TradeStep({
  onSelect,
}: {
  onSelect: (tradeId: string) => void;
}) {
  return (
    <div>
      <div className="text-center mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#f97316" }}>
          Step 1 of 2
        </p>
        <h2 className="text-2xl font-bold" style={{ color: "#0f172a" }}>
          Which trade are you comparing tools for?
        </h2>
        <p className="mt-2 text-sm" style={{ color: "#64748b" }}>
          Selecting a trade shows features most relevant to that discipline.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {trades.map((trade) => (
          <button
            key={trade.id}
            onClick={() => onSelect(trade.id)}
            className="group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl border bg-white text-center transition-all hover:shadow-lg hover:-translate-y-0.5"
            style={{ borderColor: "#e2e8f0" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: "#fff7ed" }}
            >
              {trade.emoji}
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight" style={{ color: "#0f172a" }}>
                {trade.name}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                {trade.toolIds.length} tools
              </p>
            </div>
            <div
              className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ borderColor: "#f97316" }}
            />
          </button>
        ))}

        {/* No preference option */}
        <button
          onClick={() => onSelect("__all__")}
          className="group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl border bg-white text-center transition-all hover:shadow-lg hover:-translate-y-0.5"
          style={{ borderColor: "#e2e8f0" }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#f8fafc" }}
          >
            <SlidersHorizontal className="w-6 h-6" style={{ color: "#64748b" }} />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight" style={{ color: "#0f172a" }}>
              All Tools
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
              No trade filter
            </p>
          </div>
          <div
            className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ borderColor: "#64748b" }}
          />
        </button>
      </div>
    </div>
  );
}

// ─── Step-2: Tool Selector ──────────────────────────────────────────────────
function ToolStep({
  tradeId,
  selected,
  onToggle,
  onBack,
  onCompare,
}: {
  tradeId: string;
  selected: string[];
  onToggle: (id: string) => void;
  onBack: () => void;
  onCompare: () => void;
}) {
  const trade = tradeId === "__all__" ? null : trades.find((t) => t.id === tradeId);
  const filteredTools = tradeId === "__all__"
    ? tools
    : tools.filter((t) => t.tradeIds.includes(tradeId));

  const categoryColors: Record<string, { bg: string; text: string }> = {
    "AI Agent": { bg: "#faf5ff", text: "#7c3aed" },
    Platform: { bg: "#eff6ff", text: "#1d4ed8" },
    Software: { bg: "#f0fdf4", text: "#15803d" },
  };

  return (
    <div>
      {/* Step header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm mb-2 transition-colors hover:text-orange-500"
            style={{ color: "#64748b" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Change trade
          </button>
          <p className="text-sm font-semibold uppercase tracking-widest mb-1" style={{ color: "#f97316" }}>
            Step 2 of 2
          </p>
          <h2 className="text-2xl font-bold" style={{ color: "#0f172a" }}>
            {trade ? (
              <>Select tools to compare &nbsp;{trade.emoji} {trade.name}</>
            ) : (
              "Select tools to compare"
            )}
          </h2>
          <p className="mt-1 text-sm" style={{ color: "#64748b" }}>
            Choose 2–4 tools. {selected.length}/4 selected.
          </p>
        </div>

        <button
          onClick={onCompare}
          disabled={selected.length < 2}
          className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#f97316" }}
        >
          <GitCompareArrows className="w-4 h-4" />
          Compare {selected.length > 0 ? `${selected.length} Tools` : ""}
        </button>
      </div>

      {/* Selection progress bar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-2 w-10 rounded-full transition-all"
              style={{
                backgroundColor: selected.length >= n ? "#f97316" : "#e2e8f0",
              }}
            />
          ))}
        </div>
        <span className="text-xs" style={{ color: "#94a3b8" }}>
          {selected.length < 2
            ? `Select ${2 - selected.length} more to compare`
            : selected.length < 4
            ? `Ready! Add up to ${4 - selected.length} more`
            : "Maximum 4 tools selected"}
        </span>
      </div>

      {/* Tool grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredTools.map((tool) => {
          const isSelected = selected.includes(tool.id);
          const isDisabled = !isSelected && selected.length >= MAX_TOOLS;
          const cat = categoryColors[tool.category] || categoryColors["Software"];

          return (
            <button
              key={tool.id}
              onClick={() => !isDisabled && onToggle(tool.id)}
              disabled={isDisabled}
              className="relative flex items-start gap-3 p-4 rounded-2xl border text-left transition-all"
              style={{
                backgroundColor: isSelected ? "#fff7ed" : "white",
                borderColor: isSelected ? "#f97316" : "#e2e8f0",
                opacity: isDisabled ? 0.45 : 1,
                cursor: isDisabled ? "not-allowed" : "pointer",
                boxShadow: isSelected ? "0 0 0 2px #f97316" : undefined,
              }}
            >
              {/* Logo */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ backgroundColor: tool.logoColor }}
              >
                {tool.logoInitials}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-sm leading-tight" style={{ color: "#0f172a" }}>
                    {tool.name}
                  </p>
                  {/* Checkbox */}
                  <div
                    className="w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all"
                    style={{
                      borderColor: isSelected ? "#f97316" : "#cbd5e1",
                      backgroundColor: isSelected ? "#f97316" : "white",
                    }}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span
                  className="inline-block text-xs px-2 py-0.5 rounded-full font-medium mt-1"
                  style={{ backgroundColor: cat.bg, color: cat.text }}
                >
                  {tool.category}
                </span>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <StarRating rating={tool.rating} size="sm" />
                  <span className="text-xs font-semibold" style={{ color: "#374151" }}>
                    {tool.rating}
                  </span>
                  <span className="text-xs" style={{ color: "#94a3b8" }}>
                    ({tool.reviewCount.toLocaleString()})
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: "#64748b" }}>
                  {tool.price}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12" style={{ color: "#94a3b8" }}>
          No tools found for this trade.
        </div>
      )}

      {/* Bottom CTA */}
      {selected.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={onCompare}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-white shadow-lg transition-all hover:brightness-110 hover:shadow-xl"
            style={{ backgroundColor: "#f97316" }}
          >
            <GitCompareArrows className="w-5 h-5" />
            Compare {selected.length} Tools
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ─── Main Compare Page ───────────────────────────────────────────────────────
export function ComparePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCompare, removeFromCompare } = useApp();

  // Selection flow state
  const [pickerTradeId, setPickerTradeId] = useState<string | null>(null);
  const [pickerSelectedIds, setPickerSelectedIds] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  const toolIds = (searchParams.get("tools") || "").split(",").filter(Boolean);
  const tradeSlug = searchParams.get("trade");

  const selectedTools = useMemo(
    () => toolIds.map((id) => tools.find((t) => t.id === id)).filter(Boolean) as typeof tools,
    [toolIds]
  );

  const trade = tradeSlug ? getTradeBySlug(tradeSlug) : null;
  const featureGroups: CompareFeatureGroup[] = trade
    ? tradeCompareFeatures[trade.id] || GENERIC_FEATURES
    : GENERIC_FEATURES;

  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    "AI Agent": { bg: "#faf5ff", text: "#7c3aed", border: "#e9d5ff" },
    Platform: { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
    Software: { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
  };

  const hasCapability = (toolId: string, featureKey: string) => {
    return toolCapabilityMap[toolId]?.includes(featureKey) ?? false;
  };

  // Picker handlers
  const handleTradeSelect = (tradeId: string) => {
    setPickerTradeId(tradeId);
    setPickerSelectedIds([]);
  };

  const handleToolToggle = (toolId: string) => {
    setPickerSelectedIds((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  const handlePickerCompare = () => {
    const tradeForNav = pickerTradeId && pickerTradeId !== "__all__"
      ? trades.find((t) => t.id === pickerTradeId)
      : null;
    const params = new URLSearchParams();
    params.set("tools", pickerSelectedIds.join(","));
    if (tradeForNav) params.set("trade", tradeForNav.slug);
    setPickerTradeId(null);
    setPickerSelectedIds([]);
    setShowPicker(false);
    navigate(`/compare?${params.toString()}`);
  };

  const openPicker = () => {
    setPickerTradeId(null);
    setPickerSelectedIds([]);
    setShowPicker(true);
  };

  const closePicker = () => {
    setPickerTradeId(null);
    setPickerSelectedIds([]);
    setShowPicker(false);
  };

  // ── No tools in URL → full-page picker ──────────────────────────────────
  if (selectedTools.length === 0 && !showPicker) {
    return (
      <div>
        {/* Dark header */}
        <div style={{ backgroundColor: "#0c1a2e" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "#64748b" }}>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span style={{ color: "#fb923c" }}>Compare Tools</span>
            </nav>
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "rgba(249,115,22,0.2)" }}
              >
                <GitCompareArrows className="w-6 h-6" style={{ color: "#f97316" }} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Compare <span style={{ color: "#fb923c" }}>Construction Tools</span>
                </h1>
                <p className="mt-1" style={{ color: "#94a3b8" }}>
                  Select your trade then pick tools to compare side-by-side
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Selection flow */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <AnimatePresence mode="wait">
            {!pickerTradeId ? (
              <motion.div
                key="trade-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <TradeStep onSelect={handleTradeSelect} />
              </motion.div>
            ) : (
              <motion.div
                key="tool-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <ToolStep
                  tradeId={pickerTradeId}
                  selected={pickerSelectedIds}
                  onToggle={handleToolToggle}
                  onBack={() => setPickerTradeId(null)}
                  onCompare={handlePickerCompare}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ── Inline picker modal overlay (triggered from "Modify Selection") ────────
  const PickerOverlay = () => (
    <AnimatePresence>
      {showPicker && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePicker}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          />
          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden"
            style={{ maxHeight: "88vh", backgroundColor: "#f8fafc" }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full" style={{ backgroundColor: "#cbd5e1" }} />
            </div>

            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: "#e2e8f0" }}
            >
              <div className="flex items-center gap-2">
                <GitCompareArrows className="w-5 h-5" style={{ color: "#f97316" }} />
                <span className="font-bold" style={{ color: "#0f172a" }}>
                  Modify Comparison
                </span>
              </div>
              <button
                onClick={closePicker}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" style={{ color: "#64748b" }} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto px-6 py-6" style={{ maxHeight: "calc(88vh - 100px)" }}>
              <AnimatePresence mode="wait">
                {!pickerTradeId ? (
                  <motion.div
                    key="modal-trade-step"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.18 }}
                  >
                    <TradeStep onSelect={handleTradeSelect} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="modal-tool-step"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.18 }}
                  >
                    <ToolStep
                      tradeId={pickerTradeId}
                      selected={pickerSelectedIds}
                      onToggle={handleToolToggle}
                      onBack={() => setPickerTradeId(null)}
                      onCompare={handlePickerCompare}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // ── Comparison Matrix ────────────────────────────────────────────────────
  return (
    <div>
      <PickerOverlay />

      {/* Header */}
      <div style={{ backgroundColor: "#0c1a2e" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "#64748b" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            {trade && (
              <>
                <Link to={`/trades/${trade.slug}`} className="hover:text-white transition-colors">
                  {trade.name}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            <span style={{ color: "#fb923c" }}>Compare Tools</span>
          </nav>

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "rgba(249,115,22,0.2)" }}
              >
                <GitCompareArrows className="w-6 h-6" style={{ color: "#f97316" }} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Compare{" "}
                  <span style={{ color: "#fb923c" }}>{selectedTools.length} Tools</span>
                </h1>
                {trade ? (
                  <p className="mt-1" style={{ color: "#94a3b8" }}>
                    Side-by-side for{" "}
                    <span className="text-white font-medium">{trade.emoji} {trade.name}</span> —
                    trade-specific features highlighted
                  </p>
                ) : (
                  <p className="mt-1" style={{ color: "#94a3b8" }}>
                    General feature comparison across selected tools
                  </p>
                )}
              </div>
            </div>

            {/* Modify selection */}
            <button
              onClick={openPicker}
              className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all hover:bg-white/10"
              style={{ borderColor: "#1e3a5f", color: "#94a3b8" }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Modify Selection</span>
              <span className="sm:hidden">Modify</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="overflow-x-auto">
          <div style={{ minWidth: `${300 + selectedTools.length * 220}px` }}>
            {/* Tool Headers */}
            <div
              className="grid gap-4 mb-6 sticky top-16 z-10 py-4"
              style={{
                gridTemplateColumns: `280px repeat(${selectedTools.length}, 1fr)`,
                backgroundColor: "#f1f5f9",
              }}
            >
              {/* Empty label column */}
              <div className="flex items-end pb-2">
                {trade && (
                  <Link
                    to={`/trades/${trade.slug}`}
                    className="text-xs flex items-center gap-1 hover:text-orange-500 transition-colors"
                    style={{ color: "#64748b" }}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to {trade.name}
                  </Link>
                )}
              </div>

              {/* Tool Cards */}
              {selectedTools.map((tool) => {
                const cat = categoryColors[tool.category] || categoryColors["Software"];
                return (
                  <div
                    key={tool.id}
                    className="bg-white rounded-2xl border p-4 shadow-sm"
                    style={{ borderColor: "#e2e8f0" }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                        style={{ backgroundColor: tool.logoColor }}
                      >
                        {tool.logoInitials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm" style={{ color: "#0f172a" }}>
                          {tool.name}
                        </p>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: cat.bg, color: cat.text }}
                        >
                          {tool.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 mb-2">
                      <StarRating rating={tool.rating} size="sm" />
                      <span className="text-xs font-bold" style={{ color: "#1e293b" }}>
                        {tool.rating}
                      </span>
                      <span className="text-xs" style={{ color: "#94a3b8" }}>
                        ({tool.reviewCount.toLocaleString()})
                      </span>
                    </div>

                    <div className="mb-3">
                      <span className="text-xs" style={{ color: "#94a3b8" }}>Starting at</span>
                      <p className="text-sm font-bold" style={{ color: "#0f172a" }}>
                        {tool.price}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/tools/${tool.slug}`}
                        className="flex-1 py-1.5 rounded-lg border text-xs font-medium text-center transition-colors hover:bg-gray-50"
                        style={{ borderColor: "#e2e8f0", color: "#374151" }}
                      >
                        Details
                      </Link>
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 flex-1 py-1.5 rounded-lg text-xs font-medium text-white"
                        style={{ backgroundColor: "#f97316" }}
                      >
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <button
                      onClick={() => removeFromCompare(tool.id)}
                      className="w-full mt-2 text-xs flex items-center justify-center gap-1 hover:text-red-500 transition-colors"
                      style={{ color: "#94a3b8" }}
                    >
                      <X className="w-3 h-3" />
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Feature Groups */}
            {featureGroups.map((group) => (
              <div key={group.category} className="mb-6">
                <div
                  className="grid gap-4 px-4 py-3 rounded-xl mb-1"
                  style={{
                    gridTemplateColumns: `280px repeat(${selectedTools.length}, 1fr)`,
                    backgroundColor: "#0c1a2e",
                  }}
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    {group.category}
                  </span>
                  {selectedTools.map((tool) => <div key={tool.id} />)}
                </div>

                {group.features.map((feature, fIdx) => {
                  const supportCount = selectedTools.filter((t) =>
                    hasCapability(t.id, feature.key)
                  ).length;

                  return (
                    <div
                      key={feature.key}
                      className="grid gap-4 px-4 py-3 items-center border-b transition-colors"
                      style={{
                        gridTemplateColumns: `280px repeat(${selectedTools.length}, 1fr)`,
                        backgroundColor: fIdx % 2 === 0 ? "white" : "#fafbfc",
                        borderColor: "#f1f5f9",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm" style={{ color: "#374151" }}>
                          {feature.label}
                        </span>
                        {supportCount === selectedTools.length && selectedTools.length > 1 && (
                          <span
                            className="text-xs px-1.5 py-0.5 rounded-full"
                            style={{ backgroundColor: "#dcfce7", color: "#15803d" }}
                          >
                            All
                          </span>
                        )}
                        {supportCount === 0 && selectedTools.length > 1 && (
                          <span
                            className="text-xs px-1.5 py-0.5 rounded-full"
                            style={{ backgroundColor: "#fee2e2", color: "#b91c1c" }}
                          >
                            None
                          </span>
                        )}
                      </div>

                      {selectedTools.map((tool) => {
                        const supported = hasCapability(tool.id, feature.key);
                        return (
                          <div key={tool.id} className="flex justify-center">
                            {supported ? (
                              <div
                                className="w-7 h-7 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "#dcfce7" }}
                              >
                                <Check className="w-4 h-4" style={{ color: "#16a34a" }} />
                              </div>
                            ) : (
                              <div
                                className="w-7 h-7 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "#f1f5f9" }}
                              >
                                <Minus className="w-4 h-4" style={{ color: "#cbd5e1" }} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Summary Row */}
            <div
              className="grid gap-4 p-4 rounded-2xl border mt-4"
              style={{
                gridTemplateColumns: `280px repeat(${selectedTools.length}, 1fr)`,
                backgroundColor: "#fff7ed",
                borderColor: "#fed7aa",
              }}
            >
              <div>
                <p className="text-sm font-bold" style={{ color: "#92400e" }}>
                  Feature Score
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#b45309" }}>
                  % of compared features supported
                </p>
              </div>
              {selectedTools.map((tool) => {
                const allFeatures = featureGroups.flatMap((g) => g.features);
                const supported = allFeatures.filter((f) =>
                  hasCapability(tool.id, f.key)
                ).length;
                const pct = Math.round((supported / allFeatures.length) * 100);
                return (
                  <div key={tool.id} className="text-center">
                    <div className="text-2xl font-bold" style={{ color: "#c2410c" }}>
                      {pct}%
                    </div>
                    <div
                      className="w-full h-2 rounded-full mt-1 overflow-hidden"
                      style={{ backgroundColor: "#fed7aa" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, backgroundColor: "#f97316" }}
                      />
                    </div>
                    <p className="text-xs mt-1" style={{ color: "#92400e" }}>
                      {supported}/{allFeatures.length} features
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Add More Tools */}
        {selectedTools.length < MAX_TOOLS && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold" style={{ color: "#0f172a" }}>
                Add More Tools to Compare
              </h3>
              <button
                onClick={openPicker}
                className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-orange-600"
                style={{ color: "#f97316" }}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Browse by trade
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tools
                .filter(
                  (t) =>
                    !toolIds.includes(t.id) &&
                    (!trade || t.tradeIds.includes(trade.id))
                )
                .slice(0, 8)
                .map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => addToCompare(tool)}
                    className="flex items-center gap-3 p-3 rounded-xl border bg-white text-left hover:shadow-md transition-all group"
                    style={{ borderColor: "#e2e8f0" }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0"
                      style={{ backgroundColor: tool.logoColor }}
                    >
                      {tool.logoInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: "#0f172a" }}>
                        {tool.name}
                      </p>
                      <p className="text-xs flex items-center gap-0.5" style={{ color: "#64748b" }}>
                        <Star className="w-3 h-3 inline" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                        {tool.rating}
                      </p>
                    </div>
                    <Plus
                      className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "#f97316" }}
                    />
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Bottom CTAs */}
        <div className="mt-10 flex flex-wrap gap-3">
          {trade ? (
            <Link
              to={`/trades/${trade.slug}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border font-medium text-sm transition-colors hover:bg-white"
              style={{ borderColor: "#e2e8f0", color: "#374151" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {trade.name}
            </Link>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border font-medium text-sm transition-colors hover:bg-white"
              style={{ borderColor: "#e2e8f0", color: "#374151" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Directory
            </Link>
          )}
          <button
            onClick={openPicker}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white transition-all hover:brightness-110"
            style={{ backgroundColor: "#f97316" }}
          >
            <GitCompareArrows className="w-4 h-4" />
            Start New Comparison
          </button>
        </div>
      </div>
    </div>
  );
}