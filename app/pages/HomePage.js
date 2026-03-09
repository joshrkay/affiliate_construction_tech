import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { trades, tools } from "../data/constructionData";
import { StarRating } from "../components/StarRating";
import { TopRatedThisMonth } from "../components/TopRatedThisMonth";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { Search, Shield, Zap, Star, ChevronRight, ArrowRight, Bot, BarChart3, Users, } from "lucide-react";
export function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const { openReviewModal, openSubmitModal } = useApp();
    const handleSearch = () => {
        if (searchQuery.trim())
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    };
    const stats = [
        { label: "Tools & Platforms", value: "140+", icon: BarChart3 },
        { label: "Verified Reviews", value: "12,400+", icon: Star },
        { label: "Trade Categories", value: "8", icon: Users },
        { label: "AI-Powered Tools", value: "35+", icon: Bot },
    ];
    const featuredReviews = [
        {
            quote: "Togal.AI cut our takeoff time by 70%. We're bidding twice as many jobs now.",
            author: "Chris B.",
            role: "Chief Estimator",
            company: "BuildRight Mechanical",
            rating: 5,
            tool: "Togal.AI",
            avatarColor: "#7c3aed",
        },
        {
            quote: "Procore's analytics dashboard tells me which projects are at risk before they blow up.",
            author: "Derek F.",
            role: "VP of Operations",
            company: "Apex General Contractors",
            rating: 5,
            tool: "Procore",
            avatarColor: "#065f46",
        },
        {
            quote: "ALICE found a construction sequence that compressed our hospital project by 8 months.",
            author: "Michael O.",
            role: "Director of Project Controls",
            company: "Western Infrastructure Partners",
            rating: 5,
            tool: "ALICE Technologies",
            avatarColor: "#0f766e",
        },
    ];
    return (_jsxs("div", { children: [_jsxs("section", { className: "relative overflow-hidden py-20 md:py-28", style: { backgroundColor: "#0c1a2e" }, children: [_jsx("div", { className: "absolute inset-0 opacity-10", style: {
                            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
                            backgroundSize: "40px 40px",
                        } }), _jsx("div", { className: "absolute inset-0", style: {
                            background: "radial-gradient(ellipse at 70% 50%, rgba(249,115,22,0.12) 0%, transparent 60%)",
                        } }), _jsx("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-3xl", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6", style: { backgroundColor: "rgba(249,115,22,0.15)", color: "#fb923c" }, children: [_jsx(Zap, { className: "w-3.5 h-3.5" }), "The Construction Industry's AI & Software Directory"] }), _jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight", children: ["Find the Best", _jsx("span", { style: { color: "#f97316" }, children: " AI & Software" }), _jsx("br", {}), "for Construction"] }), _jsx("p", { className: "mt-5 text-lg leading-relaxed", style: { color: "#94a3b8" }, children: "Compare ratings, read real contractor reviews, and discover the tools transforming every trade \u2014 from AI estimating to intelligent scheduling and field management." }), _jsxs("div", { className: "mt-8 flex gap-3 max-w-xl", children: [_jsxs("div", { className: "flex-1 flex items-center gap-3 px-4 bg-white/10 backdrop-blur rounded-xl border", style: { borderColor: "rgba(255,255,255,0.1)" }, children: [_jsx(Search, { className: "w-4 h-4 shrink-0", style: { color: "#64748b" } }), _jsx("input", { type: "text", placeholder: "Search tools, trades, or features...", className: "flex-1 bg-transparent py-3 text-sm text-white placeholder-slate-500 outline-none", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), onKeyDown: (e) => e.key === "Enter" && handleSearch() })] }), _jsx("button", { onClick: handleSearch, className: "px-5 py-3 rounded-xl font-medium text-sm text-white shrink-0 hover:brightness-110 transition-all", style: { backgroundColor: "#f97316" }, children: "Search" })] }), _jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: ["AI Agents", "Project Management", "Estimating", "Field Service", "BIM"].map((tag) => (_jsx("button", { onClick: () => navigate(`/search?q=${encodeURIComponent(tag)}`), className: "px-3 py-1 rounded-full text-xs border transition-colors hover:bg-white/10", style: { color: "#64748b", borderColor: "#1e3a5f" }, children: tag }, tag))) })] }) })] }), _jsx("div", { style: { backgroundColor: "#0f2133" }, className: "border-b", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5", children: _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: stats.map((stat) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-9 h-9 rounded-lg flex items-center justify-center shrink-0", style: { backgroundColor: "rgba(249,115,22,0.15)" }, children: _jsx(stat.icon, { className: "w-4 h-4", style: { color: "#f97316" } }) }), _jsxs("div", { children: [_jsx("p", { className: "text-white font-bold text-lg leading-tight", children: stat.value }), _jsx("p", { className: "text-xs", style: { color: "#64748b" }, children: stat.label })] })] }, stat.label))) }) }) }), _jsxs("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold", style: { color: "#0f172a" }, children: "Browse by Trade" }), _jsx("p", { className: "text-sm mt-1", style: { color: "#64748b" }, children: "Explore AI tools and software tailored to your specific trade" })] }), _jsxs(Link, { to: "/", className: "hidden md:flex items-center gap-1 text-sm font-medium", style: { color: "#f97316" }, children: ["View all ", _jsx(ChevronRight, { className: "w-4 h-4" })] })] }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: trades.map((trade) => (_jsxs(Link, { to: `/trades/${trade.slug}`, className: "group relative overflow-hidden rounded-2xl p-5 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl", style: { backgroundColor: "#0c1a2e" }, children: [_jsx("div", { className: "absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity", style: {
                                        backgroundImage: `url(${trade.imageUrl})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    } }), _jsx("div", { className: "absolute inset-0", style: {
                                        background: `linear-gradient(135deg, ${trade.accentColor}44 0%, #0c1a2ebb 100%)`,
                                    } }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "text-3xl mb-3 block", children: trade.emoji }), _jsx("h3", { className: "font-semibold text-sm", children: trade.name }), _jsx("p", { className: "text-xs mt-1 opacity-70", children: trade.tagline }), _jsxs("div", { className: "mt-3 flex items-center gap-1 text-xs opacity-60 group-hover:opacity-100 transition-opacity", style: { color: "#fb923c" }, children: [_jsxs("span", { children: [tools.filter((t) => t.tradeIds.includes(trade.id)).length, " tools"] }), _jsx(ArrowRight, { className: "w-3 h-3" })] })] })] }, trade.id))) })] }), _jsx(TopRatedThisMonth, {}), _jsx("section", { className: "py-16", style: {
                    background: "linear-gradient(135deg, #0c1a2e 0%, #1e1b4b 100%)",
                }, children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center", children: [_jsxs("div", { children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5", style: { backgroundColor: "rgba(124,58,237,0.2)", color: "#c084fc" }, children: [_jsx(Bot, { className: "w-3.5 h-3.5" }), "AI Agent Spotlight"] }), _jsxs("h2", { className: "text-3xl font-bold text-white leading-tight", children: ["AI is Reshaping", _jsx("br", {}), _jsx("span", { style: { color: "#c084fc" }, children: "How Construction Works" })] }), _jsx("p", { className: "mt-4 leading-relaxed", style: { color: "#94a3b8" }, children: "From computer vision takeoffs that cut estimating time by 70% to AI scheduling platforms that find optimal construction sequences \u2014 artificial intelligence is delivering measurable ROI across every phase of construction." }), _jsx("div", { className: "mt-6 grid grid-cols-2 gap-4", children: [
                                            { stat: "70%", label: "Faster Takeoffs with AI" },
                                            { stat: "35%", label: "Fewer Safety Incidents" },
                                            { stat: "15%", label: "Schedule Compression" },
                                            { stat: "28%", label: "Higher Average Ticket" },
                                        ].map((item) => (_jsxs("div", { className: "p-4 rounded-xl", style: { backgroundColor: "rgba(255,255,255,0.05)" }, children: [_jsx("p", { className: "text-2xl font-bold", style: { color: "#c084fc" }, children: item.stat }), _jsx("p", { className: "text-xs mt-1", style: { color: "#94a3b8" }, children: item.label })] }, item.label))) }), _jsxs(Link, { to: "/trades/estimating-bidding", className: "inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl font-medium text-sm text-white transition-all hover:brightness-110", style: { backgroundColor: "#7c3aed" }, children: ["Explore AI Tools ", _jsx(ArrowRight, { className: "w-4 h-4" })] })] }), _jsx("div", { className: "space-y-4", children: tools
                                    .filter((t) => t.category === "AI Agent")
                                    .map((tool) => (_jsxs(Link, { to: `/tools/${tool.slug}`, className: "flex items-center gap-4 p-4 rounded-xl border transition-colors hover:bg-white/5", style: { backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }, children: [_jsx("div", { className: "w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0", style: { backgroundColor: tool.logoColor }, children: tool.logoInitials }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-white text-sm font-semibold", children: tool.name }), _jsx("p", { className: "text-xs truncate", style: { color: "#64748b" }, children: tool.type })] }), _jsxs("div", { className: "text-right shrink-0", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-3.5 h-3.5", style: { color: "#f59e0b", fill: "#f59e0b" } }), _jsx("span", { className: "text-white text-sm font-bold", children: tool.rating })] }), _jsx("span", { className: "text-xs px-2 py-0.5 rounded-full", style: { backgroundColor: "rgba(124,58,237,0.2)", color: "#c084fc" }, children: "AI Agent" })] })] }, tool.id))) })] }) }) }), _jsxs("section", { className: "py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-10", children: [_jsx("h2", { className: "text-2xl font-bold", style: { color: "#0f172a" }, children: "What Contractors Are Saying" }), _jsx("p", { className: "text-sm mt-2", style: { color: "#64748b" }, children: "Real reviews from verified construction professionals" })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-6", children: featuredReviews.map((review, idx) => (_jsxs("div", { className: "p-6 rounded-2xl bg-white border shadow-sm", style: { borderColor: "#e2e8f0" }, children: [_jsx(StarRating, { rating: review.rating, size: "sm" }), _jsxs("p", { className: "mt-4 text-sm leading-relaxed italic", style: { color: "#374151" }, children: ["\"", review.quote, "\""] }), _jsxs("div", { className: "mt-5 flex items-center gap-3", children: [_jsx("div", { className: "w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0", style: { backgroundColor: review.avatarColor }, children: review.author[0] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold", style: { color: "#0f172a" }, children: review.author }), _jsxs("p", { className: "text-xs", style: { color: "#64748b" }, children: [review.role, " \u00B7 ", review.company] })] }), _jsx("div", { className: "ml-auto", children: _jsx("span", { className: "text-xs px-2 py-1 rounded-full font-medium", style: { backgroundColor: "#fff7ed", color: "#c2410c" }, children: review.tool }) })] })] }, idx))) })] }), _jsx("section", { className: "py-16", style: { backgroundColor: "#0c1a2e" }, children: _jsxs("div", { className: "max-w-3xl mx-auto px-4 text-center", children: [_jsx(Shield, { className: "w-10 h-10 mx-auto mb-4", style: { color: "#f97316" } }), _jsx("h2", { className: "text-3xl font-bold text-white", children: "Have experience with construction software?" }), _jsx("p", { className: "mt-3", style: { color: "#94a3b8" }, children: "Your review helps other contractors make better decisions. Share your honest experience and help the industry grow smarter." }), _jsxs("div", { className: "mt-7 flex flex-col sm:flex-row gap-3 justify-center", children: [_jsx("button", { onClick: () => openReviewModal(), className: "px-6 py-3 rounded-xl font-medium text-white transition-all hover:brightness-110", style: { backgroundColor: "#f97316" }, children: "Write a Review" }), _jsx("button", { onClick: openSubmitModal, className: "px-6 py-3 rounded-xl font-medium border transition-colors hover:bg-white/5", style: { color: "#94a3b8", borderColor: "#1e3a5f" }, children: "Submit a Tool" })] })] }) })] }));
}
