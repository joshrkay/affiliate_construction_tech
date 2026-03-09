import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Link } from "react-router";
import { TrendingUp, TrendingDown, Minus, Star, Info } from "lucide-react";
import { StarRating } from "./StarRating";
// March 2026 monthly snapshot — delta vs February 2026
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
        newReviewsThisMonth: 41,
        changeReasons: [
            "New batch-processing feature praised in 30+ reviews",
            "AI accuracy improvements reduced re-measurement requests",
            "Faster plan upload speeds resolved top complaint",
            "Positive response to new estimator dashboard UI",
        ],
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
        newReviewsThisMonth: 58,
        changeReasons: [
            "Studio Sessions stability improvements addressed major pain point",
            "New CAD plugin update widely praised by structural teams",
            "Faster PDF rendering on large plan sets noted by reviewers",
        ],
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
        newReviewsThisMonth: 63,
        changeReasons: [
            "Recent pricing increase drew negative feedback from SMB users",
            "Mobile app performance issues reported on Android devices",
            "Customer support wait times increased this month",
            "Offset partially by strong reviews for new budget forecasting module",
        ],
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
        newReviewsThisMonth: 49,
        changeReasons: [
            "New AI dispatch algorithm cut average response times by 18%",
            "Improved technician mobile app received strong field reviews",
            "Service agreement renewal automation praised by office managers",
        ],
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
        newReviewsThisMonth: 34,
        changeReasons: [
            "Rating stable — positive BIM integration reviews offset licensing complexity complaints",
            "New Takeoff module updates received mixed feedback",
            "No major product releases or incidents this month",
        ],
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
        newReviewsThisMonth: 37,
        changeReasons: [
            "New client portal redesign praised for ease of use",
            "QuickBooks sync improvements eliminated a common billing headache",
            "Growing word-of-mouth among remodeling contractors boosted review volume",
            "Budget tracking updates addressed top-requested feature",
        ],
    },
];
const MONTH_LABEL = "March 2026";
const PREV_MONTH_LABEL = "February";
const categoryColors = {
    "AI Agent": { bg: "#faf5ff", text: "#7c3aed" },
    Platform: { bg: "#eff6ff", text: "#1d4ed8" },
    Software: { bg: "#f0fdf4", text: "#15803d" },
};
// ─── Delta badge with hover tooltip ─────────────────────────────────────────
function DeltaBadge({ item }) {
    const [open, setOpen] = useState(false);
    const [tooltipSide, setTooltipSide] = useState("top");
    const ref = useRef(null);
    const delta = Math.round((item.currentRating - item.previousRating) * 10) / 10;
    const isUp = delta > 0;
    const isDown = delta < 0;
    const isFlat = delta === 0;
    const handleMouseEnter = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            // If less than 220px from top of viewport, show below
            setTooltipSide(rect.top < 220 ? "bottom" : "top");
        }
        setOpen(true);
    };
    const badgeStyle = isUp
        ? { bg: "#dcfce7", text: "#15803d", border: "#bbf7d0" }
        : isDown
            ? { bg: "#fee2e2", text: "#b91c1c", border: "#fecaca" }
            : { bg: "#f1f5f9", text: "#475569", border: "#e2e8f0" };
    const Icon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;
    return (_jsxs("div", { ref: ref, className: "relative inline-block", onMouseEnter: handleMouseEnter, onMouseLeave: () => setOpen(false), children: [_jsxs("div", { className: "flex items-center gap-1 px-2 py-1 rounded-full border cursor-default select-none", style: {
                    backgroundColor: badgeStyle.bg,
                    color: badgeStyle.text,
                    borderColor: badgeStyle.border,
                }, children: [_jsx(Icon, { className: "w-3 h-3" }), _jsx("span", { className: "text-xs font-bold", children: isFlat ? "—" : `${isUp ? "+" : ""}${delta.toFixed(1)}` }), _jsx(Info, { className: "w-3 h-3 opacity-60" })] }), open && (_jsxs("div", { className: "absolute z-50 w-64 rounded-xl border shadow-xl p-4", style: {
                    backgroundColor: "#0c1a2e",
                    borderColor: "#1e3a5f",
                    ...(tooltipSide === "top"
                        ? { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" }
                        : { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" }),
                }, children: [_jsx("div", { className: "absolute w-2.5 h-2.5 rotate-45 border", style: {
                            backgroundColor: "#0c1a2e",
                            borderColor: "#1e3a5f",
                            ...(tooltipSide === "top"
                                ? {
                                    bottom: "-6px",
                                    left: "50%",
                                    transform: "translateX(-50%) rotate(45deg)",
                                    borderTop: "none",
                                    borderLeft: "none",
                                }
                                : {
                                    top: "-6px",
                                    left: "50%",
                                    transform: "translateX(-50%) rotate(45deg)",
                                    borderBottom: "none",
                                    borderRight: "none",
                                }),
                        } }), _jsx("div", { className: "flex items-center gap-2 mb-3", children: _jsxs("div", { className: "flex items-center gap-1 px-2 py-0.5 rounded-full", style: { backgroundColor: badgeStyle.bg }, children: [_jsx(Icon, { className: "w-3 h-3", style: { color: badgeStyle.text } }), _jsx("span", { className: "text-xs font-bold", style: { color: badgeStyle.text }, children: isFlat
                                        ? "No change"
                                        : `${isUp ? "+" : ""}${delta.toFixed(1)} vs ${PREV_MONTH_LABEL}` })] }) }), _jsx("p", { className: "text-xs font-semibold mb-2", style: { color: "#94a3b8" }, children: "Why did this change?" }), _jsx("ul", { className: "space-y-1.5", children: item.changeReasons.map((reason, i) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "mt-0.5 w-1.5 h-1.5 rounded-full shrink-0", style: {
                                        backgroundColor: isUp ? "#4ade80" : isDown ? "#f87171" : "#64748b",
                                        marginTop: "5px",
                                    } }), _jsx("span", { className: "text-xs leading-relaxed", style: { color: "#cbd5e1" }, children: reason })] }, i))) }), _jsxs("div", { className: "mt-3 pt-3 border-t flex items-center gap-1.5", style: { borderColor: "#1e3a5f" }, children: [_jsx(Star, { className: "w-3 h-3", style: { color: "#f59e0b", fill: "#f59e0b" } }), _jsxs("span", { className: "text-xs", style: { color: "#64748b" }, children: ["Based on ", item.newReviewsThisMonth, " new reviews in ", MONTH_LABEL] })] })] }))] }));
}
// ─── Main section ────────────────────────────────────────────────────────────
export function TopRatedThisMonth() {
    const movers = [...monthlyData].sort((a, b) => Math.abs(b.currentRating - b.previousRating) -
        Math.abs(a.currentRating - a.previousRating));
    return (_jsx("section", { className: "py-16", style: { backgroundColor: "#f8fafc" }, children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex items-start justify-between mb-8", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(TrendingUp, { className: "w-5 h-5", style: { color: "#f97316" } }), _jsx("span", { className: "text-xs font-semibold uppercase tracking-wider", style: { color: "#f97316" }, children: "Monthly Rankings" })] }), _jsx("h2", { className: "text-2xl font-bold", style: { color: "#0f172a" }, children: "Top Rated This Month" }), _jsxs("p", { className: "text-sm mt-1", style: { color: "#64748b" }, children: [MONTH_LABEL, " ratings \u2014 hover the change badge to see what drove each shift"] })] }), _jsxs("div", { className: "hidden md:flex items-center gap-4 text-xs pt-1", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "w-5 h-5 rounded-full flex items-center justify-center", style: { backgroundColor: "#dcfce7" }, children: _jsx(TrendingUp, { className: "w-3 h-3", style: { color: "#15803d" } }) }), _jsx("span", { style: { color: "#64748b" }, children: "Rating rose" })] }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "w-5 h-5 rounded-full flex items-center justify-center", style: { backgroundColor: "#fee2e2" }, children: _jsx(TrendingDown, { className: "w-3 h-3", style: { color: "#b91c1c" } }) }), _jsx("span", { style: { color: "#64748b" }, children: "Rating fell" })] }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: "w-5 h-5 rounded-full flex items-center justify-center", style: { backgroundColor: "#f1f5f9" }, children: _jsx(Minus, { className: "w-3 h-3", style: { color: "#475569" } }) }), _jsx("span", { style: { color: "#64748b" }, children: "Unchanged" })] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: monthlyData.map((item, idx) => {
                        const cat = categoryColors[item.category] || categoryColors["Software"];
                        const delta = Math.round((item.currentRating - item.previousRating) * 10) / 10;
                        const isUp = delta > 0;
                        const isDown = delta < 0;
                        return (_jsxs("div", { className: "bg-white rounded-2xl border p-5 transition-all hover:shadow-md", style: { borderColor: "#e2e8f0" }, children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5", style: {
                                                backgroundColor: idx === 0 ? "#fff7ed" : "#f8fafc",
                                                color: idx === 0 ? "#f97316" : "#94a3b8",
                                            }, children: idx + 1 }), _jsx("div", { className: "w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0", style: { backgroundColor: item.logoColor }, children: item.logoInitials }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx(Link, { to: `/tools/${item.slug}`, className: "font-bold text-sm hover:text-orange-500 transition-colors block leading-tight", style: { color: "#0f172a" }, children: item.name }), _jsx("span", { className: "inline-block text-xs px-2 py-0.5 rounded-full font-medium mt-0.5", style: { backgroundColor: cat.bg, color: cat.text }, children: item.category })] })] }), _jsx("div", { className: "my-4 border-t", style: { borderColor: "#f1f5f9" } }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(StarRating, { rating: item.currentRating, size: "sm" }), _jsx("span", { className: "text-sm font-bold", style: { color: "#0f172a" }, children: item.currentRating.toFixed(1) })] }), _jsx(DeltaBadge, { item: item })] }), _jsxs("div", { className: "mt-2 flex items-center justify-between", children: [_jsxs("span", { className: "text-xs", style: { color: "#94a3b8" }, children: ["Was", " ", _jsx("span", { style: {
                                                        color: isUp ? "#b91c1c" : isDown ? "#15803d" : "#64748b",
                                                        textDecoration: "line-through",
                                                    }, children: item.previousRating.toFixed(1) }), " ", "in ", PREV_MONTH_LABEL] }), _jsxs("span", { className: "text-xs", style: { color: "#94a3b8" }, children: ["+", item.newReviewsThisMonth, " new reviews"] })] }), _jsxs("div", { className: "mt-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("span", { className: "text-xs", style: { color: "#94a3b8" }, children: "Monthly score" }), _jsx("span", { className: "text-xs font-medium", style: {
                                                        color: isUp ? "#15803d" : isDown ? "#b91c1c" : "#64748b",
                                                    }, children: isUp ? "↑ Rising" : isDown ? "↓ Falling" : "→ Stable" })] }), _jsx("div", { className: "h-1.5 rounded-full overflow-hidden", style: { backgroundColor: "#f1f5f9" }, children: _jsx("div", { className: "h-full rounded-full transition-all", style: {
                                                    width: `${((item.currentRating - 4) / 1) * 100}%`,
                                                    backgroundColor: isUp ? "#22c55e" : isDown ? "#ef4444" : "#94a3b8",
                                                } }) })] })] }, item.toolId));
                    }) }), _jsxs("p", { className: "text-center text-xs mt-6", style: { color: "#94a3b8" }, children: ["Rankings updated monthly \u00B7 Based on verified contractor reviews \u00B7", " ", _jsx("span", { className: "font-medium", style: { color: "#64748b" }, children: MONTH_LABEL })] })] }) }));
}
