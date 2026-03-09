import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useSearchParams, Link, useNavigate } from "react-router";
import { useMemo, useState } from "react";
import { Check, X, Minus, ChevronRight, ArrowLeft, ExternalLink, Star, GitCompareArrows, Plus, SlidersHorizontal, } from "lucide-react";
import { tools, trades, getTradeBySlug } from "../data/constructionData";
import { tradeCompareFeatures, toolCapabilityMap, } from "../data/comparisonData";
import { StarRating } from "../components/StarRating";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";
const MAX_TOOLS = 4;
const GENERIC_FEATURES = [
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
function TradeStep({ onSelect, }) {
    return (_jsxs("div", { children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-widest mb-2", style: { color: "#f97316" }, children: "Step 1 of 2" }), _jsx("h2", { className: "text-2xl font-bold", style: { color: "#0f172a" }, children: "Which trade are you comparing tools for?" }), _jsx("p", { className: "mt-2 text-sm", style: { color: "#64748b" }, children: "Selecting a trade shows features most relevant to that discipline." })] }), _jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: [trades.map((trade) => (_jsxs("button", { onClick: () => onSelect(trade.id), className: "group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl border bg-white text-center transition-all hover:shadow-lg hover:-translate-y-0.5", style: { borderColor: "#e2e8f0" }, children: [_jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center text-2xl", style: { backgroundColor: "#fff7ed" }, children: trade.emoji }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold leading-tight", style: { color: "#0f172a" }, children: trade.name }), _jsxs("p", { className: "text-xs mt-0.5", style: { color: "#94a3b8" }, children: [trade.toolIds.length, " tools"] })] }), _jsx("div", { className: "absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none", style: { borderColor: "#f97316" } })] }, trade.id))), _jsxs("button", { onClick: () => onSelect("__all__"), className: "group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl border bg-white text-center transition-all hover:shadow-lg hover:-translate-y-0.5", style: { borderColor: "#e2e8f0" }, children: [_jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center", style: { backgroundColor: "#f8fafc" }, children: _jsx(SlidersHorizontal, { className: "w-6 h-6", style: { color: "#64748b" } }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold leading-tight", style: { color: "#0f172a" }, children: "All Tools" }), _jsx("p", { className: "text-xs mt-0.5", style: { color: "#94a3b8" }, children: "No trade filter" })] }), _jsx("div", { className: "absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none", style: { borderColor: "#64748b" } })] })] })] }));
}
// ─── Step-2: Tool Selector ──────────────────────────────────────────────────
function ToolStep({ tradeId, selected, onToggle, onBack, onCompare, }) {
    const trade = tradeId === "__all__" ? null : trades.find((t) => t.id === tradeId);
    const filteredTools = tradeId === "__all__"
        ? tools
        : tools.filter((t) => t.tradeIds.includes(tradeId));
    const categoryColors = {
        "AI Agent": { bg: "#faf5ff", text: "#7c3aed" },
        Platform: { bg: "#eff6ff", text: "#1d4ed8" },
        Software: { bg: "#f0fdf4", text: "#15803d" },
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-start justify-between gap-4 mb-6", children: [_jsxs("div", { children: [_jsxs("button", { onClick: onBack, className: "flex items-center gap-1.5 text-sm mb-2 transition-colors hover:text-orange-500", style: { color: "#64748b" }, children: [_jsx(ArrowLeft, { className: "w-3.5 h-3.5" }), "Change trade"] }), _jsx("p", { className: "text-sm font-semibold uppercase tracking-widest mb-1", style: { color: "#f97316" }, children: "Step 2 of 2" }), _jsx("h2", { className: "text-2xl font-bold", style: { color: "#0f172a" }, children: trade ? (_jsxs(_Fragment, { children: ["Select tools to compare \u00A0", trade.emoji, " ", trade.name] })) : ("Select tools to compare") }), _jsxs("p", { className: "mt-1 text-sm", style: { color: "#64748b" }, children: ["Choose 2\u20134 tools. ", selected.length, "/4 selected."] })] }), _jsxs("button", { onClick: onCompare, disabled: selected.length < 2, className: "shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed", style: { backgroundColor: "#f97316" }, children: [_jsx(GitCompareArrows, { className: "w-4 h-4" }), "Compare ", selected.length > 0 ? `${selected.length} Tools` : ""] })] }), _jsxs("div", { className: "flex items-center gap-3 mb-5", children: [_jsx("div", { className: "flex gap-1.5", children: [1, 2, 3, 4].map((n) => (_jsx("div", { className: "h-2 w-10 rounded-full transition-all", style: {
                                backgroundColor: selected.length >= n ? "#f97316" : "#e2e8f0",
                            } }, n))) }), _jsx("span", { className: "text-xs", style: { color: "#94a3b8" }, children: selected.length < 2
                            ? `Select ${2 - selected.length} more to compare`
                            : selected.length < 4
                                ? `Ready! Add up to ${4 - selected.length} more`
                                : "Maximum 4 tools selected" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: filteredTools.map((tool) => {
                    const isSelected = selected.includes(tool.id);
                    const isDisabled = !isSelected && selected.length >= MAX_TOOLS;
                    const cat = categoryColors[tool.category] || categoryColors["Software"];
                    return (_jsxs("button", { onClick: () => !isDisabled && onToggle(tool.id), disabled: isDisabled, className: "relative flex items-start gap-3 p-4 rounded-2xl border text-left transition-all", style: {
                            backgroundColor: isSelected ? "#fff7ed" : "white",
                            borderColor: isSelected ? "#f97316" : "#e2e8f0",
                            opacity: isDisabled ? 0.45 : 1,
                            cursor: isDisabled ? "not-allowed" : "pointer",
                            boxShadow: isSelected ? "0 0 0 2px #f97316" : undefined,
                        }, children: [_jsx("div", { className: "w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0", style: { backgroundColor: tool.logoColor }, children: tool.logoInitials }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsx("p", { className: "font-semibold text-sm leading-tight", style: { color: "#0f172a" }, children: tool.name }), _jsx("div", { className: "w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all", style: {
                                                    borderColor: isSelected ? "#f97316" : "#cbd5e1",
                                                    backgroundColor: isSelected ? "#f97316" : "white",
                                                }, children: isSelected && _jsx(Check, { className: "w-3 h-3 text-white" }) })] }), _jsx("span", { className: "inline-block text-xs px-2 py-0.5 rounded-full font-medium mt-1", style: { backgroundColor: cat.bg, color: cat.text }, children: tool.category }), _jsxs("div", { className: "flex items-center gap-1.5 mt-1.5", children: [_jsx(StarRating, { rating: tool.rating, size: "sm" }), _jsx("span", { className: "text-xs font-semibold", style: { color: "#374151" }, children: tool.rating }), _jsxs("span", { className: "text-xs", style: { color: "#94a3b8" }, children: ["(", tool.reviewCount.toLocaleString(), ")"] })] }), _jsx("p", { className: "text-xs mt-1", style: { color: "#64748b" }, children: tool.price })] })] }, tool.id));
                }) }), filteredTools.length === 0 && (_jsx("div", { className: "text-center py-12", style: { color: "#94a3b8" }, children: "No tools found for this trade." })), selected.length >= 2 && (_jsx(motion.div, { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, className: "mt-8 flex justify-center", children: _jsxs("button", { onClick: onCompare, className: "flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-white shadow-lg transition-all hover:brightness-110 hover:shadow-xl", style: { backgroundColor: "#f97316" }, children: [_jsx(GitCompareArrows, { className: "w-5 h-5" }), "Compare ", selected.length, " Tools", _jsx(ChevronRight, { className: "w-4 h-4" })] }) }))] }));
}
// ─── Main Compare Page ───────────────────────────────────────────────────────
export function ComparePage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { addToCompare, removeFromCompare } = useApp();
    // Selection flow state
    const [pickerTradeId, setPickerTradeId] = useState(null);
    const [pickerSelectedIds, setPickerSelectedIds] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const toolIds = (searchParams.get("tools") || "").split(",").filter(Boolean);
    const tradeSlug = searchParams.get("trade");
    const selectedTools = useMemo(() => toolIds.map((id) => tools.find((t) => t.id === id)).filter(Boolean), [toolIds]);
    const trade = tradeSlug ? getTradeBySlug(tradeSlug) : null;
    const featureGroups = trade
        ? tradeCompareFeatures[trade.id] || GENERIC_FEATURES
        : GENERIC_FEATURES;
    const categoryColors = {
        "AI Agent": { bg: "#faf5ff", text: "#7c3aed", border: "#e9d5ff" },
        Platform: { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
        Software: { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
    };
    const hasCapability = (toolId, featureKey) => {
        return toolCapabilityMap[toolId]?.includes(featureKey) ?? false;
    };
    // Picker handlers
    const handleTradeSelect = (tradeId) => {
        setPickerTradeId(tradeId);
        setPickerSelectedIds([]);
    };
    const handleToolToggle = (toolId) => {
        setPickerSelectedIds((prev) => prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]);
    };
    const handlePickerCompare = () => {
        const tradeForNav = pickerTradeId && pickerTradeId !== "__all__"
            ? trades.find((t) => t.id === pickerTradeId)
            : null;
        const params = new URLSearchParams();
        params.set("tools", pickerSelectedIds.join(","));
        if (tradeForNav)
            params.set("trade", tradeForNav.slug);
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
        return (_jsxs("div", { children: [_jsx("div", { style: { backgroundColor: "#0c1a2e" }, children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [_jsxs("nav", { className: "flex items-center gap-2 text-sm mb-5", style: { color: "#64748b" }, children: [_jsx(Link, { to: "/", className: "hover:text-white transition-colors", children: "Home" }), _jsx(ChevronRight, { className: "w-4 h-4" }), _jsx("span", { style: { color: "#fb923c" }, children: "Compare Tools" })] }), _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center shrink-0", style: { backgroundColor: "rgba(249,115,22,0.2)" }, children: _jsx(GitCompareArrows, { className: "w-6 h-6", style: { color: "#f97316" } }) }), _jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold text-white", children: ["Compare ", _jsx("span", { style: { color: "#fb923c" }, children: "Construction Tools" })] }), _jsx("p", { className: "mt-1", style: { color: "#94a3b8" }, children: "Select your trade then pick tools to compare side-by-side" })] })] })] }) }), _jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: _jsx(AnimatePresence, { mode: "wait", children: !pickerTradeId ? (_jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: { duration: 0.2 }, children: _jsx(TradeStep, { onSelect: handleTradeSelect }) }, "trade-step")) : (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, transition: { duration: 0.2 }, children: _jsx(ToolStep, { tradeId: pickerTradeId, selected: pickerSelectedIds, onToggle: handleToolToggle, onBack: () => setPickerTradeId(null), onCompare: handlePickerCompare }) }, "tool-step")) }) })] }));
    }
    // ── Inline picker modal overlay (triggered from "Modify Selection") ────────
    const PickerOverlay = () => (_jsx(AnimatePresence, { children: showPicker && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: closePicker, className: "fixed inset-0 z-40", style: { backgroundColor: "rgba(0,0,0,0.55)" } }), _jsxs(motion.div, { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" }, transition: { type: "spring", stiffness: 400, damping: 40 }, className: "fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden", style: { maxHeight: "88vh", backgroundColor: "#f8fafc" }, children: [_jsx("div", { className: "flex justify-center pt-3 pb-1", children: _jsx("div", { className: "w-10 h-1 rounded-full", style: { backgroundColor: "#cbd5e1" } }) }), _jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b", style: { borderColor: "#e2e8f0" }, children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(GitCompareArrows, { className: "w-5 h-5", style: { color: "#f97316" } }), _jsx("span", { className: "font-bold", style: { color: "#0f172a" }, children: "Modify Comparison" })] }), _jsx("button", { onClick: closePicker, className: "p-1.5 rounded-lg hover:bg-gray-100 transition-colors", children: _jsx(X, { className: "w-4 h-4", style: { color: "#64748b" } }) })] }), _jsx("div", { className: "overflow-y-auto px-6 py-6", style: { maxHeight: "calc(88vh - 100px)" }, children: _jsx(AnimatePresence, { mode: "wait", children: !pickerTradeId ? (_jsx(motion.div, { initial: { opacity: 0, x: -16 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -16 }, transition: { duration: 0.18 }, children: _jsx(TradeStep, { onSelect: handleTradeSelect }) }, "modal-trade-step")) : (_jsx(motion.div, { initial: { opacity: 0, x: 16 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 16 }, transition: { duration: 0.18 }, children: _jsx(ToolStep, { tradeId: pickerTradeId, selected: pickerSelectedIds, onToggle: handleToolToggle, onBack: () => setPickerTradeId(null), onCompare: handlePickerCompare }) }, "modal-tool-step")) }) })] })] })) }));
    // ── Comparison Matrix ────────────────────────────────────────────────────
    return (_jsxs("div", { children: [_jsx(PickerOverlay, {}), _jsx("div", { style: { backgroundColor: "#0c1a2e" }, children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [_jsxs("nav", { className: "flex items-center gap-2 text-sm mb-5", style: { color: "#64748b" }, children: [_jsx(Link, { to: "/", className: "hover:text-white transition-colors", children: "Home" }), _jsx(ChevronRight, { className: "w-4 h-4" }), trade && (_jsxs(_Fragment, { children: [_jsx(Link, { to: `/trades/${trade.slug}`, className: "hover:text-white transition-colors", children: trade.name }), _jsx(ChevronRight, { className: "w-4 h-4" })] })), _jsx("span", { style: { color: "#fb923c" }, children: "Compare Tools" })] }), _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center shrink-0", style: { backgroundColor: "rgba(249,115,22,0.2)" }, children: _jsx(GitCompareArrows, { className: "w-6 h-6", style: { color: "#f97316" } }) }), _jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold text-white", children: ["Compare", " ", _jsxs("span", { style: { color: "#fb923c" }, children: [selectedTools.length, " Tools"] })] }), trade ? (_jsxs("p", { className: "mt-1", style: { color: "#94a3b8" }, children: ["Side-by-side for", " ", _jsxs("span", { className: "text-white font-medium", children: [trade.emoji, " ", trade.name] }), " \u2014 trade-specific features highlighted"] })) : (_jsx("p", { className: "mt-1", style: { color: "#94a3b8" }, children: "General feature comparison across selected tools" }))] })] }), _jsxs("button", { onClick: openPicker, className: "shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all hover:bg-white/10", style: { borderColor: "#1e3a5f", color: "#94a3b8" }, children: [_jsx(SlidersHorizontal, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: "Modify Selection" }), _jsx("span", { className: "sm:hidden", children: "Modify" })] })] })] }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("div", { style: { minWidth: `${300 + selectedTools.length * 220}px` }, children: [_jsxs("div", { className: "grid gap-4 mb-6 sticky top-16 z-10 py-4", style: {
                                        gridTemplateColumns: `280px repeat(${selectedTools.length}, 1fr)`,
                                        backgroundColor: "#f1f5f9",
                                    }, children: [_jsx("div", { className: "flex items-end pb-2", children: trade && (_jsxs(Link, { to: `/trades/${trade.slug}`, className: "text-xs flex items-center gap-1 hover:text-orange-500 transition-colors", style: { color: "#64748b" }, children: [_jsx(ArrowLeft, { className: "w-3.5 h-3.5" }), "Back to ", trade.name] })) }), selectedTools.map((tool) => {
                                            const cat = categoryColors[tool.category] || categoryColors["Software"];
                                            return (_jsxs("div", { className: "bg-white rounded-2xl border p-4 shadow-sm", style: { borderColor: "#e2e8f0" }, children: [_jsxs("div", { className: "flex items-start gap-3 mb-3", children: [_jsx("div", { className: "w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0", style: { backgroundColor: tool.logoColor }, children: tool.logoInitials }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-bold text-sm", style: { color: "#0f172a" }, children: tool.name }), _jsx("span", { className: "text-xs px-2 py-0.5 rounded-full font-medium", style: { backgroundColor: cat.bg, color: cat.text }, children: tool.category })] })] }), _jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [_jsx(StarRating, { rating: tool.rating, size: "sm" }), _jsx("span", { className: "text-xs font-bold", style: { color: "#1e293b" }, children: tool.rating }), _jsxs("span", { className: "text-xs", style: { color: "#94a3b8" }, children: ["(", tool.reviewCount.toLocaleString(), ")"] })] }), _jsxs("div", { className: "mb-3", children: [_jsx("span", { className: "text-xs", style: { color: "#94a3b8" }, children: "Starting at" }), _jsx("p", { className: "text-sm font-bold", style: { color: "#0f172a" }, children: tool.price })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Link, { to: `/tools/${tool.slug}`, className: "flex-1 py-1.5 rounded-lg border text-xs font-medium text-center transition-colors hover:bg-gray-50", style: { borderColor: "#e2e8f0", color: "#374151" }, children: "Details" }), _jsxs("a", { href: tool.website, target: "_blank", rel: "noopener noreferrer", className: "flex items-center justify-center gap-1 flex-1 py-1.5 rounded-lg text-xs font-medium text-white", style: { backgroundColor: "#f97316" }, children: ["Visit ", _jsx(ExternalLink, { className: "w-3 h-3" })] })] }), _jsxs("button", { onClick: () => removeFromCompare(tool.id), className: "w-full mt-2 text-xs flex items-center justify-center gap-1 hover:text-red-500 transition-colors", style: { color: "#94a3b8" }, children: [_jsx(X, { className: "w-3 h-3" }), "Remove"] })] }, tool.id));
                                        })] }), featureGroups.map((group) => (_jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "grid gap-4 px-4 py-3 rounded-xl mb-1", style: {
                                                gridTemplateColumns: `280px repeat(${selectedTools.length}, 1fr)`,
                                                backgroundColor: "#0c1a2e",
                                            }, children: [_jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-white", children: group.category }), selectedTools.map((tool) => _jsx("div", {}, tool.id))] }), group.features.map((feature, fIdx) => {
                                            const supportCount = selectedTools.filter((t) => hasCapability(t.id, feature.key)).length;
                                            return (_jsxs("div", { className: "grid gap-4 px-4 py-3 items-center border-b transition-colors", style: {
                                                    gridTemplateColumns: `280px repeat(${selectedTools.length}, 1fr)`,
                                                    backgroundColor: fIdx % 2 === 0 ? "white" : "#fafbfc",
                                                    borderColor: "#f1f5f9",
                                                }, children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm", style: { color: "#374151" }, children: feature.label }), supportCount === selectedTools.length && selectedTools.length > 1 && (_jsx("span", { className: "text-xs px-1.5 py-0.5 rounded-full", style: { backgroundColor: "#dcfce7", color: "#15803d" }, children: "All" })), supportCount === 0 && selectedTools.length > 1 && (_jsx("span", { className: "text-xs px-1.5 py-0.5 rounded-full", style: { backgroundColor: "#fee2e2", color: "#b91c1c" }, children: "None" }))] }), selectedTools.map((tool) => {
                                                        const supported = hasCapability(tool.id, feature.key);
                                                        return (_jsx("div", { className: "flex justify-center", children: supported ? (_jsx("div", { className: "w-7 h-7 rounded-full flex items-center justify-center", style: { backgroundColor: "#dcfce7" }, children: _jsx(Check, { className: "w-4 h-4", style: { color: "#16a34a" } }) })) : (_jsx("div", { className: "w-7 h-7 rounded-full flex items-center justify-center", style: { backgroundColor: "#f1f5f9" }, children: _jsx(Minus, { className: "w-4 h-4", style: { color: "#cbd5e1" } }) })) }, tool.id));
                                                    })] }, feature.key));
                                        })] }, group.category))), _jsxs("div", { className: "grid gap-4 p-4 rounded-2xl border mt-4", style: {
                                        gridTemplateColumns: `280px repeat(${selectedTools.length}, 1fr)`,
                                        backgroundColor: "#fff7ed",
                                        borderColor: "#fed7aa",
                                    }, children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-bold", style: { color: "#92400e" }, children: "Feature Score" }), _jsx("p", { className: "text-xs mt-0.5", style: { color: "#b45309" }, children: "% of compared features supported" })] }), selectedTools.map((tool) => {
                                            const allFeatures = featureGroups.flatMap((g) => g.features);
                                            const supported = allFeatures.filter((f) => hasCapability(tool.id, f.key)).length;
                                            const pct = Math.round((supported / allFeatures.length) * 100);
                                            return (_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold", style: { color: "#c2410c" }, children: [pct, "%"] }), _jsx("div", { className: "w-full h-2 rounded-full mt-1 overflow-hidden", style: { backgroundColor: "#fed7aa" }, children: _jsx("div", { className: "h-full rounded-full", style: { width: `${pct}%`, backgroundColor: "#f97316" } }) }), _jsxs("p", { className: "text-xs mt-1", style: { color: "#92400e" }, children: [supported, "/", allFeatures.length, " features"] })] }, tool.id));
                                        })] })] }) }), selectedTools.length < MAX_TOOLS && (_jsxs("div", { className: "mt-10", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "font-bold", style: { color: "#0f172a" }, children: "Add More Tools to Compare" }), _jsxs("button", { onClick: openPicker, className: "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-orange-600", style: { color: "#f97316" }, children: [_jsx(SlidersHorizontal, { className: "w-4 h-4" }), "Browse by trade"] })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: tools
                                    .filter((t) => !toolIds.includes(t.id) &&
                                    (!trade || t.tradeIds.includes(trade.id)))
                                    .slice(0, 8)
                                    .map((tool) => (_jsxs("button", { onClick: () => addToCompare(tool), className: "flex items-center gap-3 p-3 rounded-xl border bg-white text-left hover:shadow-md transition-all group", style: { borderColor: "#e2e8f0" }, children: [_jsx("div", { className: "w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0", style: { backgroundColor: tool.logoColor }, children: tool.logoInitials }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-xs font-semibold truncate", style: { color: "#0f172a" }, children: tool.name }), _jsxs("p", { className: "text-xs flex items-center gap-0.5", style: { color: "#64748b" }, children: [_jsx(Star, { className: "w-3 h-3 inline", style: { color: "#f59e0b", fill: "#f59e0b" } }), tool.rating] })] }), _jsx(Plus, { className: "w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity", style: { color: "#f97316" } })] }, tool.id))) })] })), _jsxs("div", { className: "mt-10 flex flex-wrap gap-3", children: [trade ? (_jsxs(Link, { to: `/trades/${trade.slug}`, className: "flex items-center gap-2 px-5 py-2.5 rounded-xl border font-medium text-sm transition-colors hover:bg-white", style: { borderColor: "#e2e8f0", color: "#374151" }, children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), "Back to ", trade.name] })) : (_jsxs(Link, { to: "/", className: "flex items-center gap-2 px-5 py-2.5 rounded-xl border font-medium text-sm transition-colors hover:bg-white", style: { borderColor: "#e2e8f0", color: "#374151" }, children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), "Back to Directory"] })), _jsxs("button", { onClick: openPicker, className: "flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white transition-all hover:brightness-110", style: { backgroundColor: "#f97316" }, children: [_jsx(GitCompareArrows, { className: "w-4 h-4" }), "Start New Comparison"] })] })] })] }));
}
