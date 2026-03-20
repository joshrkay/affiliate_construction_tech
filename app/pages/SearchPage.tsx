import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
  Search, X, Sparkles, Zap, Key, Eye, EyeOff, ArrowRight,
  ChevronRight, BadgeCheck, Star, TrendingUp, MessageSquare,
  Layers, Wrench, RotateCcw, Info, CheckCircle2, AlertTriangle,
  BarChart3, Bot, Building2, Lightbulb, Send,
} from "lucide-react";
import { trades, tools, Tool, Trade } from "../data/constructionData";
import { StarRating } from "../components/StarRating";
import { useApp } from "../context/AppContext";
import {
  runAISearch,
  AISearchResponse,
  AIToolMatch,
  AITradeMatch,
  parseIntent,
} from "../services/aiSearch";

// ─── Local storage key ────────────────────────────────────────────────────────
const API_KEY_STORAGE = "builtech_openai_key";

// ─── Quick search suggestions ─────────────────────────────────────────────────
const QUICK_QUERIES = [
  { label: "Best scheduling app for HVAC tech", icon: "🌡️" },
  { label: "AI estimating software for roofing", icon: "🤖" },
  { label: "Free invoicing for small painting crew", icon: "🎨" },
  { label: "Dispatch software for plumbers", icon: "🔧" },
  { label: "Solar design software with permit automation", icon: "☀️" },
  { label: "QuickBooks integration for electricians", icon: "⚡" },
  { label: "Photo documentation for contractors", icon: "📸" },
  { label: "Job costing for landscaping", icon: "🌿" },
];

// ─── Relevance bar component ──────────────────────────────────────────────────
function RelevanceBar({ score, size = "md" }: { score: number; size?: "sm" | "md" }) {
  const color =
    score >= 85 ? "#22c55e" : score >= 65 ? "#f97316" : "#94a3b8";
  return (
    <div className={`flex items-center gap-2 ${size === "sm" ? "gap-1.5" : ""}`}>
      <div
        className={`${size === "sm" ? "w-16 h-1" : "w-20 h-1.5"} rounded-full overflow-hidden`}
        style={{ backgroundColor: "#e2e8f0" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <span className={`${size === "sm" ? "text-xs" : "text-xs"} font-bold`} style={{ color }}>
        {score}%
      </span>
    </div>
  );
}

// ─── Streaming text component ─────────────────────────────────────────────────
function StreamingText({ text, speed = 18 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed("");
    indexRef.current = 0;
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  // Render **bold** markers
  const parts = displayed.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} style={{ color: "#f97316" }}>{p.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

// ─── Thinking animation ───────────────────────────────────────────────────────
function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1 ml-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full animate-bounce"
          style={{
            backgroundColor: "#f97316",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </span>
  );
}

// ─── Category badge ───────────────────────────────────────────────────────────
const catStyle: Record<string, { bg: string; text: string }> = {
  "AI Agent": { bg: "#faf5ff", text: "#7c3aed" },
  Platform: { bg: "#eff6ff", text: "#1d4ed8" },
  Software: { bg: "#f0fdf4", text: "#15803d" },
};

// ─── Top Pick card ────────────────────────────────────────────────────────────
function TopPickCard({ match, query }: { match: AIToolMatch; query: string }) {
  const { tool } = match;
  const { addToCompare, isInCompare } = useApp();
  const tradeBadges = tool.tradeIds.map((id) => trades.find((t) => t.id === id)).filter(Boolean) as Trade[];

  return (
    <div
      className="relative rounded-2xl overflow-hidden border-2 p-6"
      style={{ borderColor: "#f97316", background: "linear-gradient(135deg, #fff7ed 0%, #fff 60%)" }}
    >
      {/* Crown label */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white"
        style={{ backgroundColor: "#f97316" }}>
        <Sparkles className="w-3 h-3" />
        AI Top Pick
      </div>

      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold shrink-0 shadow-lg"
          style={{ backgroundColor: tool.logoColor }}>
          {tool.logoInitials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to={`/tools/${tool.slug}`}
              className="text-xl font-bold transition-colors hover:text-orange-500"
              style={{ color: "#0f172a" }}
            >
              {tool.name}
            </Link>
            {tool.verified && <BadgeCheck className="w-5 h-5" style={{ color: "#3b82f6" }} />}
            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: catStyle[tool.category]?.bg, color: catStyle[tool.category]?.text }}>
              {tool.category}
            </span>
          </div>
          <p className="text-sm mt-0.5 font-semibold" style={{ color: "#f97316" }}>{match.headline}</p>

          {/* AI Explanation */}
          <p className="text-sm mt-2 leading-relaxed" style={{ color: "#374151" }}>
            {match.explanation}
          </p>

          {/* Highlights */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {match.keyHighlights.slice(0, 4).map((h) => (
              <span key={h} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg"
                style={{ backgroundColor: "#f0fdf4", color: "#15803d" }}>
                <CheckCircle2 className="w-3 h-3" />
                {h}
              </span>
            ))}
          </div>

          {/* Trade badges */}
          <div className="mt-3 flex flex-wrap gap-1.5 items-center">
            {tradeBadges.slice(0, 4).map((t) => (
              <Link key={t.id} to={`/trades/${t.slug}`}
                className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border transition-colors hover:border-orange-300"
                style={{ borderColor: "#e2e8f0", color: "#64748b" }}>
                {t.emoji} {t.name}
              </Link>
            ))}
          </div>

          {/* Caution */}
          {match.caution && (
            <div className="mt-3 flex items-start gap-2 p-2.5 rounded-lg"
              style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a" }}>
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "#d97706" }} />
              <p className="text-xs" style={{ color: "#92400e" }}>{match.caution}</p>
            </div>
          )}

          {/* Bottom row */}
          <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <div>
                <StarRating rating={tool.rating} size="sm" />
                <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>{tool.reviewCount.toLocaleString()} reviews</p>
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: "#0f172a" }}>{tool.price}</p>
                <p className="text-xs" style={{ color: "#94a3b8" }}>{tool.priceNote.slice(0, 40)}…</p>
              </div>
              <RelevanceBar score={match.relevanceScore} />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => addToCompare(tool)}
                className="text-xs px-3 py-2 rounded-lg border transition-all hover:border-orange-300"
                style={{ borderColor: isInCompare(tool.id) ? "#f97316" : "#e2e8f0", color: isInCompare(tool.id) ? "#f97316" : "#64748b" }}
              >
                {isInCompare(tool.id) ? "In Compare" : "+ Compare"}
              </button>
              <Link to={`/tools/${tool.slug}`}
                className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl font-semibold text-white transition-all hover:brightness-110"
                style={{ backgroundColor: "#f97316" }}>
                View Full Profile <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tool match card ──────────────────────────────────────────────────────────
function ToolMatchCard({ match, rank }: { match: AIToolMatch; rank: number }) {
  const [expanded, setExpanded] = useState(false);
  const { tool } = match;
  const { addToCompare, isInCompare } = useApp();
  const tradeBadges = tool.tradeIds.map((id) => trades.find((t) => t.id === id)).filter(Boolean) as Trade[];

  return (
    <div
      className="bg-white rounded-2xl border transition-all hover:shadow-md"
      style={{ borderColor: "#e2e8f0" }}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Rank badge */}
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-1"
            style={{ backgroundColor: "#f1f5f9", color: "#64748b" }}>
            {rank}
          </div>

          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ backgroundColor: tool.logoColor }}
          >
            {tool.logoInitials}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Link to={`/tools/${tool.slug}`}
                    className="font-bold text-sm hover:text-orange-500 transition-colors"
                    style={{ color: "#0f172a" }}>
                    {tool.name}
                  </Link>
                  {tool.verified && <BadgeCheck className="w-3.5 h-3.5" style={{ color: "#3b82f6" }} />}
                  <span className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: catStyle[tool.category]?.bg, color: catStyle[tool.category]?.text }}>
                    {tool.category}
                  </span>
                </div>
                <p className="text-xs mt-0.5 font-medium" style={{ color: "#f97316" }}>{match.headline}</p>
              </div>
              <RelevanceBar score={match.relevanceScore} size="sm" />
            </div>

            {/* AI explanation */}
            <p className="text-xs mt-2 leading-relaxed" style={{ color: "#374151" }}>
              {match.explanation}
            </p>

            {/* Expandable highlights */}
            {expanded && (
              <div className="mt-3 space-y-2">
                <p className="text-xs font-semibold" style={{ color: "#64748b" }}>Key Features</p>
                <div className="flex flex-wrap gap-1.5">
                  {match.keyHighlights.map((h) => (
                    <span key={h} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg"
                      style={{ backgroundColor: "#f8fafc", color: "#374151", border: "1px solid #e2e8f0" }}>
                      <CheckCircle2 className="w-2.5 h-2.5" style={{ color: "#22c55e" }} />
                      {h}
                    </span>
                  ))}
                </div>
                <p className="text-xs font-semibold mt-1" style={{ color: "#64748b" }}>Best for</p>
                <p className="text-xs" style={{ color: "#374151" }}>{match.bestFor}</p>
                {match.caution && (
                  <div className="flex items-start gap-1.5 p-2 rounded-lg mt-1"
                    style={{ backgroundColor: "#fffbeb" }}>
                    <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" style={{ color: "#d97706" }} />
                    <p className="text-xs" style={{ color: "#92400e" }}>{match.caution}</p>
                  </div>
                )}
              </div>
            )}

            {/* Bottom row */}
            <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                  <span className="text-xs font-bold" style={{ color: "#0f172a" }}>{tool.rating}</span>
                  <span className="text-xs" style={{ color: "#94a3b8" }}>({tool.reviewCount.toLocaleString()})</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: "#0f172a" }}>{tool.price}</span>
                <div className="flex gap-1">
                  {tradeBadges.slice(0, 2).map((t) => (
                    <span key={t.id} className="text-xs">{t.emoji}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border transition-all hover:bg-slate-50"
                  style={{ borderColor: "#e2e8f0", color: "#64748b" }}
                >
                  <Info className="w-3 h-3" />
                  {expanded ? "Less" : "Why this?"}
                </button>
                <button onClick={() => addToCompare(tool)}
                  className="text-xs px-2.5 py-1.5 rounded-lg border transition-all hover:border-orange-300"
                  style={{ borderColor: isInCompare(tool.id) ? "#f97316" : "#e2e8f0", color: isInCompare(tool.id) ? "#f97316" : "#64748b" }}>
                  {isInCompare(tool.id) ? "✓ Compare" : "+ Compare"}
                </button>
                <Link to={`/tools/${tool.slug}`}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-medium text-white transition-all hover:brightness-110"
                  style={{ backgroundColor: "#f97316" }}>
                  View <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── API Key modal ────────────────────────────────────────────────────────────
function APIKeyModal({ onClose, onSave }: { onClose: () => void; onSave: (key: string) => void }) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSave = () => {
    const trimmed = value.trim();
    if (!trimmed.startsWith("sk-")) {
      setError("OpenAI API keys start with 'sk-'");
      return;
    }
    localStorage.setItem(API_KEY_STORAGE, trimmed);
    onSave(trimmed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div className="w-full max-w-md bg-white rounded-2xl p-7 shadow-2xl">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#fff7ed" }}>
            <Key className="w-5 h-5" style={{ color: "#f97316" }} />
          </div>
          <div>
            <h2 className="font-bold" style={{ color: "#0f172a" }}>Connect OpenAI</h2>
            <p className="text-xs" style={{ color: "#64748b" }}>Enable real GPT-4o AI search</p>
          </div>
          <button onClick={onClose} className="ml-auto p-1.5 rounded-lg hover:bg-slate-100" style={{ color: "#64748b" }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 rounded-xl mb-5" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-xs leading-relaxed" style={{ color: "#374151" }}>
            Your API key is stored only in your browser's local storage and is sent directly to OpenAI. BUILTECH never stores or sees your key. Without a key, BUILTECH AI uses its built-in smart matching engine.
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold" style={{ color: "#0f172a" }}>
            OpenAI API Key
          </label>
          <div className="flex items-center gap-2 px-3 rounded-xl border" style={{ borderColor: error ? "#fca5a5" : "#e2e8f0" }}>
            <input
              type={show ? "text" : "password"}
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(""); }}
              placeholder="sk-..."
              className="flex-1 py-3 text-sm bg-transparent outline-none"
              style={{ color: "#0f172a" }}
            />
            <button onClick={() => setShow(!show)} style={{ color: "#94a3b8" }}>
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && <p className="text-xs" style={{ color: "#dc2626" }}>{error}</p>}
        </div>

        <div className="mt-5 flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border text-sm transition-colors hover:bg-slate-50"
            style={{ borderColor: "#e2e8f0", color: "#64748b" }}>
            Cancel
          </button>
          <button onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110"
            style={{ backgroundColor: "#f97316" }}>
            Save & Use GPT-4o
          </button>
        </div>

        <p className="text-xs text-center mt-4" style={{ color: "#94a3b8" }}>
          Get an API key at{" "}
          <a href="https://platform.openai.com" target="_blank" rel="noreferrer"
            className="underline hover:text-orange-500">platform.openai.com</a>
        </p>
      </div>
    </div>
  );
}

// ─── Intent chip ──────────────────────────────────────────────────────────────
function IntentChips({ response }: { response: AISearchResponse }) {
  const { intent } = response;
  const chips: Array<{ label: string; color: string; bg: string; icon: React.ReactNode }> = [];

  if (intent.tradeLabels.length > 0) {
    chips.push({ label: intent.tradeLabels[0], color: "#f97316", bg: "#fff7ed", icon: <Building2 className="w-3 h-3" /> });
  }
  if (intent.problemLabels.length > 0) {
    chips.push({ label: intent.problemLabels[0], color: "#7c3aed", bg: "#faf5ff", icon: <Wrench className="w-3 h-3" /> });
  }
  if (intent.budgetSignal !== "unknown") {
    chips.push({ label: `${intent.budgetSignal} budget`, color: "#0891b2", bg: "#f0f9ff", icon: <BarChart3 className="w-3 h-3" /> });
  }
  if (intent.teamSizeSignal !== "unknown") {
    chips.push({ label: `${intent.teamSizeSignal} team`, color: "#15803d", bg: "#f0fdf4", icon: <Layers className="w-3 h-3" /> });
  }
  if (intent.categoryPreference) {
    chips.push({ label: intent.categoryPreference, color: "#7c3aed", bg: "#faf5ff", icon: <Bot className="w-3 h-3" /> });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs" style={{ color: "#94a3b8" }}>AI understood:</span>
      {chips.map((c, i) => (
        <span key={i} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
          style={{ backgroundColor: c.bg, color: c.color }}>
          {c.icon}
          {c.label}
        </span>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const rawQuery = searchParams.get("q") || "";

  const [inputValue, setInputValue] = useState(rawQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AISearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(() => localStorage.getItem(API_KEY_STORAGE));
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showAllTools, setShowAllTools] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{ q: string; ts: number }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Run AI search when query changes
  useEffect(() => {
    if (!rawQuery) {
      setResponse(null);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    setResponse(null);
    setShowAllTools(false);

    runAISearch(rawQuery, apiKey)
      .then((res) => {
        setResponse(res);
        setConversationHistory((prev) => [
          { q: rawQuery, ts: Date.now() },
          ...prev.filter((h) => h.q !== rawQuery).slice(0, 7),
        ]);
      })
      .catch((err) => {
        setError(err.message || "Search failed. Try again.");
      })
      .finally(() => setIsLoading(false));
  }, [rawQuery, apiKey]);

  const handleSearch = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch(inputValue);
  };

  const clearKey = () => {
    localStorage.removeItem(API_KEY_STORAGE);
    setApiKey(null);
  };

  const visibleToolMatches = showAllTools ? response?.toolMatches ?? [] : (response?.toolMatches ?? []).slice(0, 4);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>

      {/* ── AI Header ─────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0c1a2e 0%, #0f172a 50%, #150a2e 100%)" }}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        {/* AI glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 opacity-20 blur-3xl rounded-full"
          style={{ backgroundColor: "#f97316" }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: "#475569" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "#f97316" }}>AI Search</span>
          </nav>

          {/* AI badge */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ backgroundColor: "rgba(249,115,22,0.15)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.3)" }}>
              <Sparkles className="w-3.5 h-3.5" />
              BUILTECH AI Search
            </div>
            {apiKey ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)" }}>
                <CheckCircle2 className="w-3 h-3" />
                GPT-4o Active
                <button onClick={clearKey} className="ml-1 opacity-60 hover:opacity-100">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowKeyModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all hover:opacity-80"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <Key className="w-3 h-3" />
                Upgrade to GPT-4o
              </button>
            )}
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            Ask anything about{" "}
            <span style={{ color: "#f97316" }}>construction software</span>
          </h1>
          <p className="text-sm mb-6" style={{ color: "#64748b" }}>
            Describe your trade, your problem, or your team — AI finds and explains the best tools for your exact situation.
          </p>

          {/* Main search bar */}
          <div
            className="flex items-center gap-3 px-4 rounded-2xl border-2 transition-all"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              borderColor: isLoading ? "#f97316" : "rgba(255,255,255,0.12)",
              boxShadow: isLoading ? "0 0 24px rgba(249,115,22,0.2)" : "none",
            }}
          >
            {isLoading ? (
              <div className="shrink-0">
                <Sparkles className="w-5 h-5 animate-pulse" style={{ color: "#f97316" }} />
              </div>
            ) : (
              <Search className="w-5 h-5 shrink-0" style={{ color: "#475569" }} />
            )}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Try: "I need dispatch software for my HVAC company with 8 techs"'
              className="flex-1 bg-transparent py-4 text-sm text-white placeholder-slate-500 outline-none"
            />
            {inputValue && (
              <button onClick={() => { setInputValue(""); inputRef.current?.focus(); }}
                className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
                style={{ color: "#64748b" }}>
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => handleSearch(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              style={{ backgroundColor: "#f97316" }}
            >
              {isLoading ? <ThinkingDots /> : <><Send className="w-4 h-4" /> Ask AI</>}
            </button>
          </div>

          {/* Quick query chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {QUICK_QUERIES.map((q) => (
              <button
                key={q.label}
                onClick={() => { setInputValue(q.label); handleSearch(q.label); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all hover:bg-white/10 hover:border-orange-500/30"
                style={{
                  borderColor: rawQuery === q.label ? "#f97316" : "rgba(255,255,255,0.1)",
                  color: rawQuery === q.label ? "#fb923c" : "#64748b",
                  backgroundColor: rawQuery === q.label ? "rgba(249,115,22,0.1)" : "transparent",
                }}
              >
                <span>{q.icon}</span>
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-7">

          {/* ── Sidebar ── */}
          <aside className="hidden lg:flex flex-col gap-5 w-60 shrink-0">

            {/* Mode info */}
            {response && (
              <div className="rounded-2xl p-4 border"
                style={{ backgroundColor: response.mode === "ai" ? "#f0fdf4" : "#fffbeb", borderColor: response.mode === "ai" ? "#bbf7d0" : "#fde68a" }}>
                <div className="flex items-center gap-2 mb-2">
                  {response.mode === "ai" ? (
                    <><Sparkles className="w-4 h-4" style={{ color: "#16a34a" }} />
                    <span className="text-xs font-bold" style={{ color: "#15803d" }}>GPT-4o Powered</span></>
                  ) : (
                    <><Zap className="w-4 h-4" style={{ color: "#d97706" }} />
                    <span className="text-xs font-bold" style={{ color: "#b45309" }}>BUILTECH Smart Search</span></>
                  )}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: response.mode === "ai" ? "#166534" : "#92400e" }}>
                  {response.mode === "ai"
                    ? "Results powered by GPT-4o with full context understanding."
                    : "Using built-in AI matching. Add your OpenAI key for deeper analysis."}
                </p>
                {response.mode === "simulated" && (
                  <button onClick={() => setShowKeyModal(true)}
                    className="mt-2.5 w-full text-xs py-1.5 rounded-lg font-semibold transition-all hover:brightness-105"
                    style={{ backgroundColor: "#f97316", color: "white" }}>
                    Enable GPT-4o →
                  </button>
                )}
              </div>
            )}

            {/* Category insight */}
            {response?.categoryInsight && (
              <div className="rounded-2xl p-4 border" style={{ backgroundColor: "white", borderColor: "#e2e8f0" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4" style={{ color: "#f97316" }} />
                  <p className="text-xs font-bold" style={{ color: "#0f172a" }}>AI Insight</p>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#64748b" }}>{response.categoryInsight}</p>
              </div>
            )}

            {/* Search history */}
            {conversationHistory.length > 1 && (
              <div className="rounded-2xl p-4 border" style={{ backgroundColor: "white", borderColor: "#e2e8f0" }}>
                <p className="text-xs font-bold mb-3" style={{ color: "#0f172a" }}>Recent Searches</p>
                <div className="space-y-1">
                  {conversationHistory.map((h) => (
                    <button
                      key={h.ts}
                      onClick={() => { setInputValue(h.q); handleSearch(h.q); }}
                      className="w-full text-left text-xs px-2 py-1.5 rounded-lg transition-colors hover:bg-slate-50 truncate"
                      style={{ color: rawQuery === h.q ? "#f97316" : "#64748b" }}
                    >
                      {rawQuery === h.q ? "→ " : ""}{h.q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trade quick links */}
            <div className="rounded-2xl p-4 border" style={{ backgroundColor: "white", borderColor: "#e2e8f0" }}>
              <p className="text-xs font-bold mb-3" style={{ color: "#0f172a" }}>Browse by Trade</p>
              <div className="space-y-0.5">
                {trades.slice(0, 10).map((t) => (
                  <Link
                    key={t.id}
                    to={`/trades/${t.slug}`}
                    className="flex items-center gap-2 text-xs px-2 py-1.5 rounded-lg transition-colors hover:bg-slate-50"
                    style={{ color: "#64748b" }}
                  >
                    <span>{t.emoji}</span>
                    {t.name}
                  </Link>
                ))}
                {trades.length > 10 && (
                  <p className="text-xs px-2 py-1" style={{ color: "#94a3b8" }}>+{trades.length - 10} more trades</p>
                )}
              </div>
            </div>
          </aside>

          {/* ── Main column ── */}
          <main className="flex-1 min-w-0">

            {/* Loading state */}
            {isLoading && (
              <div className="space-y-5">
                <div className="p-6 rounded-2xl border" style={{ backgroundColor: "white", borderColor: "#e2e8f0" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center animate-pulse"
                      style={{ backgroundColor: "#fff7ed" }}>
                      <Sparkles className="w-5 h-5" style={{ color: "#f97316" }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: "#0f172a" }}>
                        BUILTECH AI is analyzing your query<ThinkingDots />
                      </p>
                      <p className="text-xs" style={{ color: "#94a3b8" }}>
                        Scanning {tools.length} tools across {trades.length} trades…
                      </p>
                    </div>
                  </div>
                  {/* Animated skeleton */}
                  <div className="space-y-3">
                    {[80, 60, 90, 45].map((w, i) => (
                      <div key={i} className="animate-pulse rounded-lg h-3"
                        style={{ width: `${w}%`, backgroundColor: "#f1f5f9" }} />
                    ))}
                  </div>
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-28 rounded-2xl animate-pulse" style={{ backgroundColor: "#f1f5f9" }} />
                ))}
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="p-6 rounded-2xl border text-center" style={{ backgroundColor: "#fff1f2", borderColor: "#fecdd3" }}>
                <AlertTriangle className="w-8 h-8 mx-auto mb-3" style={{ color: "#f43f5e" }} />
                <p className="font-semibold" style={{ color: "#0f172a" }}>Search Error</p>
                <p className="text-sm mt-1" style={{ color: "#64748b" }}>{error}</p>
                <button onClick={() => handleSearch(rawQuery)}
                  className="mt-4 px-5 py-2 rounded-xl text-sm font-medium text-white"
                  style={{ backgroundColor: "#f97316" }}>
                  Try Again
                </button>
              </div>
            )}

            {/* Results */}
            {!isLoading && !error && response && (
              <div className="space-y-5">

                {/* AI answer header */}
                <div className="p-5 rounded-2xl border"
                  style={{ backgroundColor: "white", borderColor: "#e2e8f0" }}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#fff7ed" }}>
                      <Sparkles className="w-5 h-5" style={{ color: "#f97316" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold mb-1" style={{ color: "#f97316" }}>
                        BUILTECH AI · {response.mode === "ai" ? "GPT-4o" : "Smart Match"}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                        <StreamingText text={response.answerText} speed={14} />
                      </p>
                      <div className="mt-3">
                        <IntentChips response={response} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Pick */}
                {response.topPick && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4" style={{ color: "#f97316" }} />
                      <p className="text-sm font-bold" style={{ color: "#0f172a" }}>Best Match for Your Situation</p>
                    </div>
                    <TopPickCard match={response.topPick} query={rawQuery} />
                  </div>
                )}

                {/* Other tool matches */}
                {response.toolMatches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4" style={{ color: "#64748b" }} />
                        <p className="text-sm font-bold" style={{ color: "#0f172a" }}>
                          Also Consider ({response.toolMatches.length})
                        </p>
                      </div>
                      <span className="text-xs" style={{ color: "#94a3b8" }}>Ranked by AI relevance</span>
                    </div>
                    <div className="space-y-3">
                      {visibleToolMatches.map((match, i) => (
                        <ToolMatchCard key={match.tool.id} match={match} rank={i + 2} />
                      ))}
                    </div>
                    {!showAllTools && response.toolMatches.length > 4 && (
                      <button
                        onClick={() => setShowAllTools(true)}
                        className="mt-3 w-full py-3 rounded-2xl border text-sm font-medium transition-all hover:bg-slate-50"
                        style={{ borderColor: "#e2e8f0", color: "#64748b" }}
                      >
                        Show {response.toolMatches.length - 4} more results
                      </button>
                    )}
                  </div>
                )}

                {/* Trade matches */}
                {response.tradeMatches.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-4 h-4" style={{ color: "#64748b" }} />
                      <p className="text-sm font-bold" style={{ color: "#0f172a" }}>Related Trade Pages</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {response.tradeMatches.map((tm) => {
                        const tradeToolCount = tools.filter((t) => t.tradeIds.includes(tm.trade.id)).length;
                        return (
                          <Link
                            key={tm.trade.id}
                            to={`/trades/${tm.trade.slug}`}
                            className="flex items-center gap-3 p-4 bg-white rounded-2xl border transition-all hover:shadow-md hover:border-orange-200 group"
                            style={{ borderColor: "#e2e8f0" }}
                          >
                            <span className="text-2xl">{tm.trade.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold" style={{ color: "#0f172a" }}>{tm.trade.name}</p>
                              <p className="text-xs" style={{ color: "#94a3b8" }}>{tradeToolCount} tools · {tm.explanation}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                              style={{ color: "#f97316" }} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Follow-up questions */}
                {response.followUpQuestions.length > 0 && (
                  <div className="p-5 rounded-2xl border" style={{ backgroundColor: "white", borderColor: "#e2e8f0" }}>
                    <div className="flex items-center gap-2 mb-4">
                      <MessageSquare className="w-4 h-4" style={{ color: "#7c3aed" }} />
                      <p className="text-sm font-bold" style={{ color: "#0f172a" }}>Refine Your Search</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {response.followUpQuestions.map((q) => (
                        <button
                          key={q}
                          onClick={() => { setInputValue(q); handleSearch(q); }}
                          className="flex items-start gap-2 text-left p-3 rounded-xl border text-xs transition-all hover:shadow-sm hover:border-purple-300 group"
                          style={{ borderColor: "#e2e8f0", color: "#374151" }}
                        >
                          <ChevronRight className="w-3 h-3 shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform"
                            style={{ color: "#7c3aed" }} />
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Zero results */}
                {!response.topPick && response.toolMatches.length === 0 && (
                  <div className="text-center py-14">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                      style={{ backgroundColor: "#fff7ed" }}>
                      <Search className="w-8 h-8" style={{ color: "#f97316" }} />
                    </div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: "#0f172a" }}>No tools matched "{rawQuery}"</h3>
                    <p className="text-sm mb-6" style={{ color: "#64748b" }}>
                      Try describing your trade or the specific problem you're solving.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {QUICK_QUERIES.slice(0, 4).map((q) => (
                        <button key={q.label} onClick={() => { setInputValue(q.label); handleSearch(q.label); }}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm transition-colors hover:border-orange-300"
                          style={{ borderColor: "#e2e8f0", color: "#374151" }}>
                          {q.icon} {q.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Empty / no query state */}
            {!isLoading && !error && !response && !rawQuery && (
              <div className="space-y-8">
                {/* Prompt cards */}
                <div>
                  <p className="text-sm font-bold mb-4" style={{ color: "#0f172a" }}>
                    Try asking BUILTECH AI…
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {QUICK_QUERIES.map((q) => (
                      <button
                        key={q.label}
                        onClick={() => { setInputValue(q.label); handleSearch(q.label); }}
                        className="flex items-center gap-3 p-4 bg-white rounded-2xl border text-left transition-all hover:shadow-md hover:border-orange-200 group"
                        style={{ borderColor: "#e2e8f0" }}
                      >
                        <span className="text-xl">{q.icon}</span>
                        <p className="text-sm flex-1" style={{ color: "#374151" }}>{q.label}</p>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: "#f97316" }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Browse trades */}
                <div>
                  <p className="text-sm font-bold mb-4" style={{ color: "#0f172a" }}>Browse All Trades</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {trades.map((trade) => (
                      <Link
                        key={trade.id}
                        to={`/trades/${trade.slug}`}
                        className="flex items-center gap-3 p-3.5 bg-white rounded-xl border transition-all hover:shadow-md hover:border-orange-200 group"
                        style={{ borderColor: "#e2e8f0" }}
                      >
                        <span className="text-xl">{trade.emoji}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate" style={{ color: "#0f172a" }}>{trade.name}</p>
                          <p className="text-xs" style={{ color: "#94a3b8" }}>
                            {tools.filter((t) => t.tradeIds.includes(trade.id)).length} tools
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <APIKeyModal
          onClose={() => setShowKeyModal(false)}
          onSave={(key) => setApiKey(key)}
        />
      )}
    </div>
  );
}
