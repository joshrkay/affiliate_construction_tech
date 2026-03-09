import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, Link, useNavigate } from "react-router";
import { ChevronRight, CheckCircle2, AlertCircle, Zap, Filter, ArrowRight, Bot, BarChart3, TrendingUp, GitCompareArrows, Check, } from "lucide-react";
import { getTradeBySlug, getToolsForTrade, } from "../data/constructionData";
import { StarRating } from "../components/StarRating";
import { NotFound } from "./NotFound";
import { useState } from "react";
import { useApp } from "../context/AppContext";
export function TradePage() {
    const { slug } = useParams();
    const [filter, setFilter] = useState("All");
    const [sortBy, setSortBy] = useState("rating");
    const navigate = useNavigate();
    const { addToCompare, removeFromCompare, isInCompare, compareList, setCompareTradeSlug } = useApp();
    const trade = getTradeBySlug(slug || "");
    if (!trade)
        return _jsx(NotFound, {});
    const tradeTools = getToolsForTrade(trade.id);
    const filtered = tradeTools
        .filter((t) => filter === "All" || t.category === filter)
        .sort((a, b) => {
        if (sortBy === "rating")
            return b.rating - a.rating;
        if (sortBy === "reviews")
            return b.reviewCount - a.reviewCount;
        return a.name.localeCompare(b.name);
    });
    const topTool = tradeTools.sort((a, b) => b.rating - a.rating)[0];
    const aiTools = tradeTools.filter((t) => t.category === "AI Agent");
    const avgRating = tradeTools.reduce((sum, t) => sum + t.rating, 0) / tradeTools.length;
    const categoryColors = {
        All: { active: "#f97316", text: "white" },
        Software: { active: "#15803d", text: "white" },
        "AI Agent": { active: "#7c3aed", text: "white" },
        Platform: { active: "#1d4ed8", text: "white" },
    };
    const handleCompareSelected = () => {
        setCompareTradeSlug(trade.slug);
        const toolIds = compareList.map((t) => t.id).join(",");
        navigate(`/compare?tools=${toolIds}&trade=${trade.slug}`);
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "relative overflow-hidden", style: { backgroundColor: "#0c1a2e" }, children: [_jsx("div", { className: "absolute inset-0 opacity-25", style: {
                            backgroundImage: `url(${trade.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        } }), _jsx("div", { className: "absolute inset-0", style: {
                            background: `linear-gradient(to right, #0c1a2e 50%, ${trade.accentColor}22 100%)`,
                        } }), _jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [_jsxs("nav", { className: "flex items-center gap-2 text-sm mb-6", style: { color: "#64748b" }, children: [_jsx(Link, { to: "/", className: "hover:text-white transition-colors", children: "Home" }), _jsx(ChevronRight, { className: "w-4 h-4" }), _jsx("span", { className: "text-white", children: "Trades" }), _jsx(ChevronRight, { className: "w-4 h-4" }), _jsx("span", { style: { color: "#fb923c" }, children: trade.name })] }), _jsxs("div", { className: "flex items-start gap-5", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shrink-0 shadow-lg", style: { backgroundColor: `${trade.accentColor}33` }, children: trade.emoji }), _jsxs("div", { children: [_jsxs("div", { className: "inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full mb-3", style: { backgroundColor: `${trade.accentColor}22`, color: "#fb923c" }, children: [_jsx(BarChart3, { className: "w-3.5 h-3.5" }), tradeTools.length, " Tools Reviewed"] }), _jsxs("h1", { className: "text-3xl md:text-4xl font-bold text-white", children: ["Best AI & Software for", " ", _jsx("span", { style: { color: "#fb923c" }, children: trade.name })] }), _jsx("p", { className: "mt-2 text-lg", style: { color: "#94a3b8" }, children: trade.tagline })] })] }), _jsx("div", { className: "mt-10 grid grid-cols-2 md:grid-cols-4 gap-4", children: [
                                    { label: "Tools Listed", value: tradeTools.length.toString() },
                                    { label: "Avg. Rating", value: avgRating.toFixed(1) + " ★" },
                                    { label: "AI Tools", value: aiTools.length.toString() },
                                    { label: "Top Pick", value: topTool?.name || "—" },
                                ].map((stat) => (_jsxs("div", { className: "p-4 rounded-xl border", style: {
                                        backgroundColor: "rgba(255,255,255,0.04)",
                                        borderColor: "rgba(255,255,255,0.08)",
                                    }, children: [_jsx("p", { className: "text-xs", style: { color: "#64748b" }, children: stat.label }), _jsx("p", { className: "text-white font-bold mt-0.5 text-lg", children: stat.value })] }, stat.label))) })] })] }), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: _jsxs("div", { className: "grid lg:grid-cols-3 gap-10", children: [_jsxs("div", { className: "lg:col-span-2 space-y-10", children: [_jsxs("section", { className: "bg-white rounded-2xl border p-8", style: { borderColor: "#e2e8f0" }, children: [_jsxs("h2", { className: "text-xl font-bold mb-4", style: { color: "#0f172a" }, children: ["What is ", trade.name, "?"] }), _jsx("p", { className: "leading-relaxed", style: { color: "#374151" }, children: trade.overview }), _jsxs("h3", { className: "text-base font-semibold mt-7 mb-3", style: { color: "#0f172a" }, children: ["Key Challenges in ", trade.name] }), _jsx("ul", { className: "space-y-2", children: trade.challenges.map((challenge) => (_jsxs("li", { className: "flex items-start gap-2.5", children: [_jsx(AlertCircle, { className: "w-4 h-4 shrink-0 mt-0.5", style: { color: "#ef4444" } }), _jsx("span", { className: "text-sm", style: { color: "#374151" }, children: challenge })] }, challenge))) })] }), _jsxs("section", { className: "rounded-2xl p-8 border", style: {
                                        background: "linear-gradient(135deg, #0c1a2e 0%, #1e1b4b 100%)",
                                        borderColor: "#1e3a5f",
                                    }, children: [_jsxs("div", { className: "flex items-center gap-3 mb-5", children: [_jsx("div", { className: "w-9 h-9 rounded-xl flex items-center justify-center", style: { backgroundColor: "rgba(249,115,22,0.2)" }, children: _jsx(Zap, { className: "w-5 h-5", style: { color: "#f97316" } }) }), _jsxs("h2", { className: "text-xl font-bold text-white", children: ["Why AI & Software Matter for ", trade.name] })] }), _jsx("div", { className: "space-y-4", children: trade.whyAI.map((point, idx) => (_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-white", style: { backgroundColor: "#f97316" }, children: idx + 1 }), _jsx("p", { className: "text-sm leading-relaxed", style: { color: "#cbd5e1" }, children: point })] }, idx))) })] }), _jsxs("section", { children: [_jsxs("div", { className: "flex items-center justify-between mb-5", children: [_jsxs("h2", { className: "text-xl font-bold", style: { color: "#0f172a" }, children: ["Ranked Tools for ", trade.name] }), compareList.length >= 2 && (_jsxs("button", { onClick: handleCompareSelected, className: "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:brightness-110", style: { backgroundColor: "#f97316" }, children: [_jsx(GitCompareArrows, { className: "w-4 h-4" }), "Compare ", compareList.length, " Tools"] }))] }), _jsxs("div", { className: "flex flex-wrap gap-2 mb-5", children: [_jsx("div", { className: "flex gap-1 p-1 rounded-xl", style: { backgroundColor: "#f1f5f9" }, children: ["All", "Software", "AI Agent", "Platform"].map((f) => (_jsx("button", { onClick: () => setFilter(f), className: "px-3 py-1.5 rounded-lg text-xs font-medium transition-all", style: {
                                                            backgroundColor: filter === f ? categoryColors[f].active : "transparent",
                                                            color: filter === f ? categoryColors[f].text : "#64748b",
                                                        }, children: f }, f))) }), _jsxs("div", { className: "ml-auto flex items-center gap-2", children: [_jsx(Filter, { className: "w-3.5 h-3.5", style: { color: "#94a3b8" } }), _jsxs("select", { className: "text-xs border rounded-lg px-2 py-1.5 bg-white outline-none", style: { borderColor: "#e2e8f0", color: "#374151" }, value: sortBy, onChange: (e) => setSortBy(e.target.value), children: [_jsx("option", { value: "rating", children: "Highest Rated" }), _jsx("option", { value: "reviews", children: "Most Reviewed" }), _jsx("option", { value: "name", children: "Alphabetical" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [filtered.map((tool, idx) => (_jsx(RankedToolRow, { tool: tool, rank: idx + 1, inCompare: isInCompare(tool.id), compareMax: compareList.length >= 4 && !isInCompare(tool.id), onToggleCompare: () => {
                                                        if (isInCompare(tool.id)) {
                                                            removeFromCompare(tool.id);
                                                        }
                                                        else {
                                                            addToCompare(tool);
                                                            setCompareTradeSlug(trade.slug);
                                                        }
                                                    } }, tool.id))), filtered.length === 0 && (_jsx("div", { className: "text-center py-10", style: { color: "#64748b" }, children: "No tools found in this category." }))] })] })] }), _jsxs("div", { className: "space-y-6", children: [topTool && (_jsxs("div", { className: "rounded-2xl p-6 border", style: { backgroundColor: "#fffbeb", borderColor: "#fde68a" }, children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx(TrendingUp, { className: "w-4 h-4", style: { color: "#d97706" } }), _jsx("span", { className: "text-xs font-semibold uppercase tracking-wider", style: { color: "#d97706" }, children: "Top Pick" })] }), _jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("div", { className: "w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm", style: { backgroundColor: topTool.logoColor }, children: topTool.logoInitials }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-sm", style: { color: "#0f172a" }, children: topTool.name }), _jsx("p", { className: "text-xs", style: { color: "#64748b" }, children: topTool.type })] })] }), _jsx(StarRating, { rating: topTool.rating, showValue: true }), _jsx("p", { className: "text-xs mt-3 leading-relaxed", style: { color: "#374151" }, children: topTool.tagline }), _jsxs(Link, { to: `/tools/${topTool.slug}`, className: "mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:brightness-110", style: { backgroundColor: "#d97706" }, children: ["View Details ", _jsx(ArrowRight, { className: "w-4 h-4" })] })] })), aiTools.length > 0 && (_jsxs("div", { className: "rounded-2xl p-6 border", style: { backgroundColor: "#faf5ff", borderColor: "#e9d5ff" }, children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Bot, { className: "w-4 h-4", style: { color: "#7c3aed" } }), _jsxs("span", { className: "text-xs font-semibold uppercase tracking-wider", style: { color: "#7c3aed" }, children: ["AI Tools (", aiTools.length, ")"] })] }), _jsx("div", { className: "space-y-3", children: aiTools.map((tool) => (_jsxs(Link, { to: `/tools/${tool.slug}`, className: "flex items-center gap-3 group", children: [_jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0", style: { backgroundColor: tool.logoColor }, children: tool.logoInitials }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-xs font-semibold group-hover:text-purple-700 transition-colors", style: { color: "#1e293b" }, children: tool.name }), _jsx("p", { className: "text-xs truncate", style: { color: "#94a3b8" }, children: tool.type })] }), _jsxs("div", { className: "shrink-0 text-xs font-bold", style: { color: "#7c3aed" }, children: ["\u2605 ", tool.rating] })] }, tool.id))) })] })), _jsxs("div", { className: "rounded-2xl p-6 bg-white border", style: { borderColor: "#e2e8f0" }, children: [_jsx("h3", { className: "text-sm font-semibold mb-4", style: { color: "#0f172a" }, children: "Browse Other Trades" }), _jsx("div", { className: "space-y-2", children: [
                                                { id: "general-contracting", name: "General Contracting", emoji: "🏗️" },
                                                { id: "electrical", name: "Electrical", emoji: "⚡" },
                                                { id: "plumbing", name: "Plumbing", emoji: "🔧" },
                                                { id: "hvac", name: "HVAC", emoji: "🌡️" },
                                                { id: "roofing", name: "Roofing", emoji: "🏠" },
                                                { id: "estimating-bidding", name: "Estimating", emoji: "📊" },
                                            ]
                                                .filter((t) => t.id !== trade.id)
                                                .slice(0, 5)
                                                .map((t) => (_jsxs(Link, { to: `/trades/${t.id}`, className: "flex items-center gap-2 text-sm py-1.5 hover:text-orange-500 transition-colors", style: { color: "#374151" }, children: [_jsx("span", { children: t.emoji }), _jsx("span", { children: t.name }), _jsx(ChevronRight, { className: "w-3.5 h-3.5 ml-auto", style: { color: "#cbd5e1" } })] }, t.id))) })] })] })] }) })] }));
}
function RankedToolRow({ tool, rank, inCompare, compareMax, onToggleCompare, }) {
    const catColors = {
        "AI Agent": { bg: "#faf5ff", text: "#7c3aed" },
        Platform: { bg: "#eff6ff", text: "#1d4ed8" },
        Software: { bg: "#f0fdf4", text: "#15803d" },
    };
    const cat = catColors[tool.category] || catColors["Software"];
    return (_jsxs(Link, { to: `/tools/${tool.slug}`, className: "group flex items-center gap-4 bg-white rounded-2xl border p-4 hover:shadow-lg transition-all duration-200", style: { borderColor: "#e2e8f0" }, children: [_jsx("div", { className: "w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0", style: {
                    backgroundColor: rank === 1 ? "#f59e0b" : rank === 2 ? "#94a3b8" : rank === 3 ? "#cd7c4f" : "#f1f5f9",
                    color: rank <= 3 ? "white" : "#64748b",
                }, children: rank }), _jsx("div", { className: "w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm", style: { backgroundColor: tool.logoColor }, children: tool.logoInitials }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("p", { className: "font-semibold text-sm", style: { color: "#0f172a" }, children: tool.name }), tool.verified && (_jsx(CheckCircle2, { className: "w-3.5 h-3.5 shrink-0", style: { color: "#0891b2" } })), _jsx("span", { className: "text-xs px-2 py-0.5 rounded-full font-medium", style: { backgroundColor: cat.bg, color: cat.text }, children: tool.category })] }), _jsx("p", { className: "text-xs truncate mt-0.5", style: { color: "#64748b" }, children: tool.tagline }), _jsxs("div", { className: "flex items-center gap-3 mt-1.5", children: [_jsx(StarRating, { rating: tool.rating, size: "sm" }), _jsx("span", { className: "text-xs font-semibold", style: { color: "#1e293b" }, children: tool.rating.toFixed(1) }), _jsxs("span", { className: "text-xs", style: { color: "#94a3b8" }, children: ["(", tool.reviewCount.toLocaleString(), " reviews)"] })] })] }), _jsxs("div", { className: "text-right shrink-0 flex flex-col items-end gap-2", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs", style: { color: "#94a3b8" }, children: "from" }), _jsx("p", { className: "text-sm font-bold", style: { color: "#0f172a" }, children: tool.price })] }), _jsxs("button", { onClick: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!compareMax)
                                onToggleCompare();
                        }, title: inCompare ? "Remove from compare" : compareMax ? "Compare list full" : "Add to compare", className: "flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition-all", style: {
                            backgroundColor: inCompare ? "#fff7ed" : "white",
                            borderColor: inCompare ? "#f97316" : "#e2e8f0",
                            color: inCompare ? "#f97316" : "#94a3b8",
                            opacity: compareMax ? 0.4 : 1,
                            cursor: compareMax ? "not-allowed" : "pointer",
                        }, children: [inCompare ? _jsx(Check, { className: "w-3.5 h-3.5" }) : _jsx(GitCompareArrows, { className: "w-3.5 h-3.5" }), inCompare ? "Added" : "Compare"] }), _jsx(ArrowRight, { className: "w-4 h-4 ml-auto group-hover:translate-x-0.5 transition-transform", style: { color: "#f97316" } })] })] }));
}
