import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X, HardHat, ChevronDown, GitCompareArrows, Search, Sparkles } from "lucide-react";
import { trades } from "../../data/constructionData";
import { useApp } from "../../context/AppContext";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tradesOpen, setTradesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { openReviewModal, openSubmitModal, compareList } = useApp();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className="sticky top-0 z-50 shadow-lg"
      style={{ backgroundColor: "#0c1a2e" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#f97316" }}
            >
              <HardHat className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-sm tracking-wide">BUILTECH</span>
              <span className="text-xs" style={{ color: "#94a3b8" }}>
                AI & Software Directory
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <div className="relative">
              <button
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors"
                style={{ color: "#94a3b8" }}
                onMouseEnter={() => setTradesOpen(true)}
                onMouseLeave={() => setTradesOpen(false)}
              >
                Browse by Trade <ChevronDown className="w-4 h-4" />
              </button>
              {tradesOpen && (
                <div
                  className="absolute top-full left-0 w-64 rounded-xl shadow-2xl border py-2 z-50"
                  style={{ backgroundColor: "#0f2133", borderColor: "#1e3a5f" }}
                  onMouseEnter={() => setTradesOpen(true)}
                  onMouseLeave={() => setTradesOpen(false)}
                >
                  {trades.map((trade) => (
                    <Link
                      key={trade.id}
                      to={`/trades/${trade.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                      style={{ color: "#cbd5e1" }}
                      onClick={() => setTradesOpen(false)}
                    >
                      <span className="text-base">{trade.emoji}</span>
                      <span>{trade.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-sm transition-colors"
              style={{ color: "#94a3b8" }}
            >
              Top Rated
            </Link>

            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-sm transition-colors"
              style={{ color: "#94a3b8" }}
            >
              AI Tools
            </Link>

            <Link
              to="/compare"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors relative"
              style={{ color: "#94a3b8" }}
            >
              <GitCompareArrows className="w-4 h-4" />
              Compare
              {compareList.length > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-xs font-bold text-white flex items-center justify-center"
                  style={{ backgroundColor: "#f97316" }}
                >
                  {compareList.length}
                </span>
              )}
            </Link>
          </nav>

          {/* Right side: Search + CTA */}
          <div className="hidden md:flex items-center gap-2">
            {/* Inline search */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2 px-3 rounded-lg border"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", borderColor: "#1e3a5f" }}
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: "#f97316" }} />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ask AI about tools…"
                    className="bg-transparent py-2 text-sm text-white placeholder-slate-500 outline-none w-52"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
                  style={{ color: "#64748b" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs border transition-all hover:bg-white/10"
                style={{ color: "#94a3b8", borderColor: "#1e3a5f" }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: "#f97316" }} />
                AI Search
              </button>
            )}
            <button
              onClick={openSubmitModal}
              className="text-sm px-4 py-2 rounded-lg border transition-colors hover:bg-white/5"
              style={{ color: "#94a3b8", borderColor: "#1e3a5f" }}
            >
              Submit Tool
            </button>
            <button
              onClick={() => openReviewModal()}
              className="text-sm px-4 py-2 rounded-lg font-medium text-white transition-all hover:brightness-110"
              style={{ backgroundColor: "#f97316" }}
            >
              Write a Review
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#94a3b8" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 py-4 space-y-1"
          style={{ backgroundColor: "#0f2133", borderColor: "#1e3a5f" }}
        >
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-3">
            <div
              className="flex-1 flex items-center gap-2 px-3 rounded-lg border"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", borderColor: "#1e3a5f" }}
            >
              <Search className="w-3.5 h-3.5 shrink-0" style={{ color: "#64748b" }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools…"
                className="flex-1 bg-transparent py-2.5 text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 rounded-lg text-sm font-medium text-white"
              style={{ backgroundColor: "#f97316" }}
            >
              Go
            </button>
          </form>

          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#64748b" }}>
            Browse by Trade
          </p>
          {trades.map((trade) => (
            <Link
              key={trade.id}
              to={`/trades/${trade.slug}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
              style={{ color: "#cbd5e1" }}
              onClick={() => setMobileOpen(false)}
            >
              <span>{trade.emoji}</span>
              <span>{trade.name}</span>
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link
              to="/compare"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium"
              style={{ color: "#94a3b8", borderColor: "#1e3a5f" }}
              onClick={() => setMobileOpen(false)}
            >
              <GitCompareArrows className="w-4 h-4" />
              Compare Tools {compareList.length > 0 && `(${compareList.length})`}
            </Link>
            <button
              onClick={() => { openSubmitModal(); setMobileOpen(false); }}
              className="w-full text-sm px-4 py-2.5 rounded-lg border font-medium"
              style={{ color: "#94a3b8", borderColor: "#1e3a5f" }}
            >
              Submit a Tool
            </button>
            <button
              onClick={() => { openReviewModal(); setMobileOpen(false); }}
              className="w-full text-sm px-4 py-2.5 rounded-lg font-medium text-white"
              style={{ backgroundColor: "#f97316" }}
            >
              Write a Review
            </button>
          </div>
        </div>
      )}
    </header>
  );
}