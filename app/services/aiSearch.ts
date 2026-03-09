import { Tool, Trade, tools, trades } from "../data/constructionData";

// ─── Intent Model ─────────────────────────────────────────────────────────────
export interface ParsedIntent {
  tradeIds: string[];
  tradeLabels: string[];
  problemTypes: string[];
  problemLabels: string[];
  budgetSignal: "low" | "mid" | "high" | "unknown";
  teamSizeSignal: "solo" | "small" | "medium" | "large" | "unknown";
  categoryPreference: "AI Agent" | "Platform" | "Software" | null;
  reformattedQuery: string;
}

export interface AIToolMatch {
  tool: Tool;
  relevanceScore: number; // 0–100
  headline: string;
  explanation: string;
  bestFor: string;
  keyHighlights: string[];
  caution?: string;
}

export interface AITradeMatch {
  trade: Trade;
  relevanceScore: number;
  explanation: string;
}

export interface AISearchResponse {
  mode: "ai" | "simulated";
  intent: ParsedIntent;
  answerText: string; // Top-level AI answer
  topPick: AIToolMatch | null;
  toolMatches: AIToolMatch[];
  tradeMatches: AITradeMatch[];
  followUpQuestions: string[];
  categoryInsight: string;
  didYouMean?: string;
}

// ─── Ontology ─────────────────────────────────────────────────────────────────
const TRADE_SIGNALS: Record<string, string[]> = {
  "general-contracting": ["general contractor", "gc", "general contracting", "construction manager", "prime contractor"],
  electrical: ["electrical", "electrician", "electric", "wiring", "panel", "conduit", "low voltage", "volt", "lighting"],
  plumbing: ["plumbing", "plumber", "pipe", "drain", "fixture", "water heater", "sewer", "repiping"],
  hvac: ["hvac", "heating", "cooling", "air conditioning", "refrigeration", "heat pump", "ventilation", "ac ", "furnace"],
  roofing: ["roofing", "roofer", "shingles", "flat roof", "metal roof", "membrane", "gutters"],
  "concrete-masonry": ["concrete", "masonry", "block", "foundation", "flatwork", "paving", "cement", "grading"],
  "carpentry-framing": ["carpentry", "framing", "framer", "lumber", "wood framing", "timber"],
  "estimating-bidding": ["estimating", "bidding", "takeoff", "quantity", "estimate", "bidding platform"],
  "painting-coatings": ["painting", "painter", "paint", "coating", "staining", "finish"],
  flooring: ["flooring", "floor installer", "hardwood", "carpet", "vinyl", "lvp", "laminate", "floor"],
  "drywall-insulation": ["drywall", "insulation", "gypsum", "spray foam", "blown-in", "batt"],
  "landscaping-irrigation": ["landscaping", "landscape", "irrigation", "lawn", "hardscape", "sod", "planting"],
  "windows-doors": ["window", "door", "fenestration", "replacement window", "entry door", "sliding door"],
  "solar-renewable": ["solar", "photovoltaic", "pv system", "battery storage", "ev charger", "renewable energy", "solar panel"],
  "cabinetry-countertops": ["cabinet", "countertop", "kitchen remodel", "millwork", "cabinetry", "vanity"],
  "tile-stone": ["tile", "stone setter", "grout", "porcelain", "ceramic tile", "marble", "tile installation"],
};

const PROBLEM_SIGNALS: Record<string, { label: string; keywords: string[] }> = {
  scheduling: { label: "Scheduling & Dispatch", keywords: ["schedule", "dispatch", "book", "appointment", "calendar", "route", "calendar", "assign jobs", "routing"] },
  estimating: { label: "Estimating & Bidding", keywords: ["estimate", "bid", "takeoff", "quote", "proposal", "measure", "quantity", "pricing"] },
  "job-costing": { label: "Job Costing & Financials", keywords: ["job cost", "budget", "margin", "profit", "financial", "overhead", "markup", "cost tracking"] },
  invoicing: { label: "Invoicing & Payments", keywords: ["invoice", "payment", "billing", "collect", "charge", "receipt", "accounts receivable"] },
  "field-management": { label: "Field Management", keywords: ["field", "mobile app", "crew management", "tech management", "on-site", "jobsite", "foreman"] },
  crm: { label: "Customer & Lead Management", keywords: ["crm", "customer", "client", "lead", "prospect", "follow up", "contact management", "sales pipeline"] },
  "project-management": { label: "Project Management", keywords: ["project management", "project tracking", "gantt", "milestone", "deadline", "task management"] },
  ai: { label: "AI-Powered Automation", keywords: ["ai", "artificial intelligence", "automated", "smart", "machine learning", "computer vision", "automate"] },
  photography: { label: "Photo Documentation", keywords: ["photo", "picture", "documentation", "before after", "document", "job photos", "site photos"] },
  bim: { label: "BIM & 3D Modeling", keywords: ["bim", "3d model", "revit", "clash detection", "4d", "design coordination"] },
  safety: { label: "Safety Management", keywords: ["safety", "incident", "osha", "inspection", "hazard", "toolbox talk"] },
  "time-tracking": { label: "Time Tracking", keywords: ["time tracking", "time clock", "hours", "timesheet", "payroll", "labor tracking"] },
};

const BUDGET_SIGNALS = {
  low: ["cheap", "affordable", "free", "budget", "low cost", "inexpensive", "small budget", "cost effective", "starter"],
  mid: ["reasonable", "mid range", "moderate", "mid-size", "growing"],
  high: ["enterprise", "premium", "large company", "commercial", "big company", "unlimited", "full featured"],
};

const TEAM_SIZE_SIGNALS = {
  solo: ["solo", "one man", "just me", "myself", "single tech", "owner operator", "1 person"],
  small: ["small team", "small shop", "2-5", "handful", "few techs", "small crew", "small business", "startup"],
  medium: ["mid-size", "medium", "growing", "15-50", "team of", "multiple crews"],
  large: ["large", "enterprise", "multiple locations", "big company", "100+", "fleet", "commercial scale"],
};

// ─── Intent Parser ────────────────────────────────────────────────────────────
export function parseIntent(query: string): ParsedIntent {
  const q = query.toLowerCase();

  // Detect trades
  const tradeIds: string[] = [];
  const tradeLabels: string[] = [];
  for (const [tradeId, keywords] of Object.entries(TRADE_SIGNALS)) {
    if (keywords.some((kw) => q.includes(kw))) {
      tradeIds.push(tradeId);
      const trade = trades.find((t) => t.id === tradeId);
      if (trade) tradeLabels.push(trade.name);
    }
  }

  // Detect problems
  const problemTypes: string[] = [];
  const problemLabels: string[] = [];
  for (const [problemType, { label, keywords }] of Object.entries(PROBLEM_SIGNALS)) {
    if (keywords.some((kw) => q.includes(kw))) {
      problemTypes.push(problemType);
      problemLabels.push(label);
    }
  }

  // Budget signal
  let budgetSignal: ParsedIntent["budgetSignal"] = "unknown";
  if (BUDGET_SIGNALS.low.some((s) => q.includes(s))) budgetSignal = "low";
  else if (BUDGET_SIGNALS.mid.some((s) => q.includes(s))) budgetSignal = "mid";
  else if (BUDGET_SIGNALS.high.some((s) => q.includes(s))) budgetSignal = "high";

  // Team size
  let teamSizeSignal: ParsedIntent["teamSizeSignal"] = "unknown";
  if (TEAM_SIZE_SIGNALS.solo.some((s) => q.includes(s))) teamSizeSignal = "solo";
  else if (TEAM_SIZE_SIGNALS.small.some((s) => q.includes(s))) teamSizeSignal = "small";
  else if (TEAM_SIZE_SIGNALS.medium.some((s) => q.includes(s))) teamSizeSignal = "medium";
  else if (TEAM_SIZE_SIGNALS.large.some((s) => q.includes(s))) teamSizeSignal = "large";

  // Category preference
  let categoryPreference: ParsedIntent["categoryPreference"] = null;
  if (q.includes("ai ") || q.includes(" ai") || q.includes("artificial intelligence") || q.includes("automated")) {
    categoryPreference = "AI Agent";
  } else if (q.includes("platform") || q.includes("all-in-one") || q.includes("full suite")) {
    categoryPreference = "Platform";
  }

  // Reformat query for display
  const reformattedQuery =
    tradeLabels.length > 0 || problemLabels.length > 0
      ? [
          tradeLabels.length > 0 ? tradeLabels.join(" / ") + " contractor" : "",
          problemLabels.length > 0 ? "looking for " + problemLabels.slice(0, 2).join(" & ") : "",
          budgetSignal !== "unknown" ? `(${budgetSignal} budget)` : "",
          teamSizeSignal !== "unknown" ? `(${teamSizeSignal} team)` : "",
        ]
          .filter(Boolean)
          .join(" — ")
      : query;

  return { tradeIds, tradeLabels, problemTypes, problemLabels, budgetSignal, teamSizeSignal, categoryPreference, reformattedQuery };
}

// ─── Scoring engine ───────────────────────────────────────────────────────────
function scoreToolForIntent(tool: Tool, intent: ParsedIntent, rawQuery: string): number {
  const q = rawQuery.toLowerCase();
  let score = 0;

  // Trade match
  const tradeOverlap = intent.tradeIds.filter((id) => tool.tradeIds.includes(id));
  score += tradeOverlap.length * 22;

  // Category preference
  if (intent.categoryPreference && tool.category === intent.categoryPreference) score += 18;

  // Problem → feature mapping
  const PROBLEM_FEATURE_MAP: Record<string, string[]> = {
    scheduling: ["scheduling", "dispatch", "calendar", "route"],
    estimating: ["estimating", "takeoff", "estimate", "bid", "proposal"],
    "job-costing": ["job costing", "budget", "cost tracking"],
    invoicing: ["invoicing", "payment", "billing"],
    "field-management": ["mobile", "field", "crew", "technician"],
    crm: ["crm", "customer", "lead", "client"],
    "project-management": ["project management", "gantt", "scheduling"],
    ai: ["ai", "artificial intelligence", "machine learning", "computer vision"],
    photography: ["photo", "documentation", "camera"],
    bim: ["bim", "3d", "revit"],
    safety: ["safety", "osha", "inspection"],
    "time-tracking": ["time tracking", "timesheet", "payroll"],
  };

  for (const prob of intent.problemTypes) {
    const featureKeywords = PROBLEM_FEATURE_MAP[prob] || [];
    const featureHits = featureKeywords.filter((kw) =>
      tool.features.some((f) => f.toLowerCase().includes(kw)) ||
      tool.description.toLowerCase().includes(kw) ||
      tool.type.toLowerCase().includes(kw)
    );
    score += featureHits.length * 10;
  }

  // Budget filter
  if (intent.budgetSignal === "low") {
    if (tool.price === "Free") score += 20;
    else if (tool.price.includes("/mo")) {
      const amount = parseFloat(tool.price.replace(/[^0-9.]/g, ""));
      if (amount < 100) score += 12;
      else if (amount > 300) score -= 8;
    }
  }
  if (intent.budgetSignal === "high" && tool.price === "Custom") score += 8;

  // Team size
  if (intent.teamSizeSignal === "solo" || intent.teamSizeSignal === "small") {
    if (tool.companySize.includes("10") || tool.companySize.includes("50")) score += 8;
    if (tool.companySize.includes("1000")) score -= 6;
  }
  if (intent.teamSizeSignal === "large") {
    if (tool.companySize.includes("1000") || tool.companySize.includes("500")) score += 8;
  }

  // Raw keyword hits across all fields
  const allText = [tool.name, tool.tagline, tool.type, tool.description, ...tool.features, ...tool.pros].join(" ").toLowerCase();
  const tokens = q.split(/\s+/).filter((t) => t.length > 2);
  const keywordHits = tokens.filter((t) => allText.includes(t)).length;
  score += keywordHits * 4;

  // Rating bonus
  score += tool.rating * 2;

  return Math.min(score, 100);
}

// ─── Explanation generators ───────────────────────────────────────────────────
function generateHeadline(tool: Tool, intent: ParsedIntent): string {
  const tradeMatch = intent.tradeIds.filter((id) => tool.tradeIds.includes(id));
  if (tool.category === "AI Agent") {
    return `AI-powered ${tool.type.toLowerCase()} for ${tradeMatch.length > 0 ? intent.tradeLabels[0] : "construction"}`;
  }
  if (tradeMatch.length > 0) {
    const trade = trades.find((t) => t.id === tradeMatch[0]);
    return `${trade?.emoji || ""} Built for ${trade?.name || "your trade"} — ${tool.type}`;
  }
  if (intent.problemTypes.includes("scheduling")) return `Industry-leading scheduling & ${tool.type.toLowerCase()}`;
  if (intent.problemTypes.includes("estimating")) return `Proven ${tool.type.toLowerCase()} trusted by thousands`;
  if (intent.problemTypes.includes("invoicing")) return `Streamlined invoicing inside ${tool.name}`;
  return tool.tagline;
}

function generateExplanation(tool: Tool, intent: ParsedIntent, rawQuery: string): string {
  const lines: string[] = [];
  const q = rawQuery.toLowerCase();

  // Trade context
  const tradeMatch = intent.tradeIds.filter((id) => tool.tradeIds.includes(id));
  if (tradeMatch.length > 0) {
    const tradeNames = tradeMatch.map((id) => trades.find((t) => t.id === id)?.name).filter(Boolean).join(" and ");
    lines.push(`Directly serves ${tradeNames} contractors — not adapted from a generic platform.`);
  }

  // Problem context
  if (intent.problemTypes.includes("scheduling") && tool.features.some((f) => f.toLowerCase().includes("schedul"))) {
    lines.push(`Scheduling is a core feature — crews, jobs, and routes are managed inside the same platform.`);
  }
  if (intent.problemTypes.includes("estimating") && tool.features.some((f) => f.toLowerCase().includes("estimat") || f.toLowerCase().includes("takeoff"))) {
    lines.push(`Estimating and takeoff are built in — build proposals without leaving the app.`);
  }
  if (intent.problemTypes.includes("invoicing") && tool.features.some((f) => f.toLowerCase().includes("invoic"))) {
    lines.push(`Invoicing and payment collection are native — get paid faster with less admin.`);
  }
  if (intent.problemTypes.includes("ai") && tool.category === "AI Agent") {
    lines.push(`This is a true AI Agent — machine learning drives the core functionality, not just a feature add-on.`);
  }
  if (intent.problemTypes.includes("field-management") && tool.features.some((f) => f.toLowerCase().includes("mobile"))) {
    lines.push(`Mobile-first field app means your crews can use it without training — on any smartphone.`);
  }

  // Budget context
  if (intent.budgetSignal === "low" && tool.price !== "Custom") {
    lines.push(`At ${tool.price}, this is one of the most cost-effective options for your situation.`);
  }
  if (intent.budgetSignal === "high" && tool.price === "Custom") {
    lines.push(`Enterprise pricing scales with your operation — contact for custom terms.`);
  }

  // Fallback from pros
  if (lines.length < 2 && tool.pros.length > 0) {
    lines.push(tool.pros[0]);
    if (tool.pros.length > 1) lines.push(tool.pros[1]);
  }

  return lines.slice(0, 3).join(" ") || tool.tagline;
}

function generateCaution(tool: Tool, intent: ParsedIntent): string | undefined {
  // Solo / small team using enterprise tool
  if ((intent.teamSizeSignal === "solo" || intent.teamSizeSignal === "small") && (tool.price === "Custom" || tool.companySize.includes("1000"))) {
    return `Best suited for larger operations — may be overkill for a small team.`;
  }
  // Budget-sensitive + expensive tool
  if (intent.budgetSignal === "low" && tool.price !== "Free") {
    const amount = parseFloat(tool.price.replace(/[^0-9.]/g, ""));
    if (amount > 250) return `Higher price point — verify ROI matches your current revenue.`;
  }
  // Trade mismatch
  if (intent.tradeIds.length > 0 && !intent.tradeIds.some((id) => tool.tradeIds.includes(id))) {
    return `Not specifically built for your trade — confirm it covers your workflow before committing.`;
  }
  return undefined;
}

function generateBestFor(tool: Tool, intent: ParsedIntent): string {
  if (intent.teamSizeSignal === "solo" || intent.teamSizeSignal === "small") {
    return `Small ${intent.tradeLabels[0] || "contractor"} teams wanting fast setup`;
  }
  if (intent.teamSizeSignal === "large") {
    return `Larger operations needing enterprise-grade ${tool.type.toLowerCase()}`;
  }
  if (tool.category === "AI Agent") {
    return `Teams ready to adopt AI automation for ${tool.type.toLowerCase()}`;
  }
  if (intent.tradeLabels.length > 0) {
    return `${intent.tradeLabels[0]} contractors needing ${intent.problemLabels[0] || tool.type.toLowerCase()}`;
  }
  return `${tool.type} across construction trades`;
}

function generateFollowUpQuestions(intent: ParsedIntent, topResults: AIToolMatch[]): string[] {
  const questions: string[] = [];
  const topTool = topResults[0]?.tool;

  if (intent.tradeIds.length === 0) questions.push("Which trade are you in? (HVAC, electrical, roofing, etc.)");
  if (intent.problemTypes.length === 0) questions.push("What's the biggest operational challenge you're trying to solve?");
  if (intent.budgetSignal === "unknown") questions.push("What's your monthly software budget range?");
  if (intent.teamSizeSignal === "unknown") questions.push("How many techs or crew members do you manage?");
  if (topTool) questions.push(`How does ${topTool.name} compare to what you're currently using?`);
  if (intent.problemTypes.includes("estimating")) questions.push("Do you need the estimating to integrate with your project management?");
  if (intent.problemTypes.includes("scheduling")) questions.push("Do you also need customer-facing booking or just internal dispatch?");
  if (intent.tradeIds.includes("solar-renewable")) questions.push("Are you focused on residential solar, commercial, or both?");
  if (intent.tradeIds.includes("landscaping-irrigation")) questions.push("Do you need maintenance route management or primarily installation project tracking?");

  return questions.slice(0, 4);
}

function generateAnswerText(intent: ParsedIntent, topMatches: AIToolMatch[], rawQuery: string): string {
  if (topMatches.length === 0) {
    return `I couldn't find a specific match for "${rawQuery}" in our directory. Try describing the problem you're trying to solve or the trade you work in.`;
  }
  const top = topMatches[0];
  const tradeContext = intent.tradeLabels.length > 0 ? `for ${intent.tradeLabels.slice(0, 2).join(" and ")} contractors` : "for your situation";
  const problemContext = intent.problemLabels.length > 0 ? ` focused on ${intent.problemLabels.slice(0, 2).join(" and ")}` : "";
  const sizeContext =
    intent.teamSizeSignal !== "unknown"
      ? ` for a ${intent.teamSizeSignal} team`
      : "";

  return `Based on your query${problemContext}${sizeContext}, the strongest match ${tradeContext} is **${top.tool.name}** — ${top.explanation.split(".")[0]}. I found ${topMatches.length} relevant tool${topMatches.length > 1 ? "s" : ""} in our directory.`;
}

function generateCategoryInsight(intent: ParsedIntent, matches: AIToolMatch[]): string {
  if (intent.categoryPreference === "AI Agent") {
    const aiCount = matches.filter((m) => m.tool.category === "AI Agent").length;
    return `${aiCount} AI Agent${aiCount !== 1 ? "s" : ""} found — these use machine learning as a core capability, not just automation.`;
  }
  if (intent.problemTypes.includes("estimating")) {
    return `Estimating tools range from trade-specific (highest accuracy) to multi-trade platforms. Specialty tools often win on precision, while multi-trade platforms win on workflow integration.`;
  }
  if (intent.problemTypes.includes("scheduling")) {
    return `Dispatch and scheduling tools split between field service platforms (ServiceTitan, Jobber) for service work and project management platforms (Procore, JobTread) for construction projects.`;
  }
  if (intent.tradeIds.includes("solar-renewable")) {
    return `Solar-specific tools like Aurora Solar and OpenSolar dramatically outperform general construction software for design, proposal, and permitting workflows.`;
  }
  if (intent.tradeIds.length > 0) {
    const trade = trades.find((t) => t.id === intent.tradeIds[0]);
    return `The ${trade?.name || "construction"} trade has ${matches.length} relevant tools in BUILTECH. Trade-specific tools generally deliver better ROI than general platforms adapted for your work.`;
  }
  return `Results ranked by how well each tool addresses your specific situation — not just keyword matches.`;
}

// ─── Simulated AI (no API key) ────────────────────────────────────────────────
export function simulatedAISearch(rawQuery: string): AISearchResponse {
  const intent = parseIntent(rawQuery);

  // Score and sort tools
  const scoredTools = tools
    .map((tool) => ({ tool, score: scoreToolForIntent(tool, intent, rawQuery) }))
    .filter((r) => r.score > 8)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  const toolMatches: AIToolMatch[] = scoredTools.map(({ tool, score }) => ({
    tool,
    relevanceScore: Math.min(Math.round(score), 98),
    headline: generateHeadline(tool, intent),
    explanation: generateExplanation(tool, intent, rawQuery),
    bestFor: generateBestFor(tool, intent),
    keyHighlights: tool.features.slice(0, 4),
    caution: generateCaution(tool, intent),
  }));

  // Score trades
  const scoredTrades = trades
    .map((trade) => {
      let score = 0;
      if (intent.tradeIds.includes(trade.id)) score += 40;
      const q = rawQuery.toLowerCase();
      if (trade.name.toLowerCase().split(" ").some((w) => q.includes(w))) score += 20;
      if (trade.tagline.toLowerCase().split(" ").some((w) => w.length > 3 && q.includes(w))) score += 10;
      return { trade, score };
    })
    .filter((r) => r.score > 10)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const tradeMatches: AITradeMatch[] = scoredTrades.map(({ trade, score }) => ({
    trade,
    relevanceScore: Math.min(score, 95),
    explanation: `${tools.filter((t) => t.tradeIds.includes(trade.id)).length} tools in BUILTECH serve ${trade.name} contractors.`,
  }));

  return {
    mode: "simulated",
    intent,
    answerText: generateAnswerText(intent, toolMatches, rawQuery),
    topPick: toolMatches[0] || null,
    toolMatches: toolMatches.slice(1),
    tradeMatches,
    followUpQuestions: generateFollowUpQuestions(intent, toolMatches),
    categoryInsight: generateCategoryInsight(intent, toolMatches),
  };
}

// ─── OpenAI Integration ────────────────────────────────────────────────────────
function buildSystemPrompt(): string {
  const toolIndex = tools.map((t) => ({
    id: t.id,
    name: t.name,
    tagline: t.tagline,
    category: t.category,
    type: t.type,
    price: t.price,
    rating: t.rating,
    trades: t.tradeIds,
    features: t.features.slice(0, 6),
    pros: t.pros.slice(0, 3),
  }));

  return `You are BUILTECH AI — the expert search assistant for the BUILTECH construction software directory. You help construction professionals find the RIGHT software for their exact situation.

TOOL DATABASE (JSON):
${JSON.stringify(toolIndex)}

TRADE IDS: ${trades.map((t) => t.id + "=" + t.name).join(", ")}

YOUR JOB:
1. Understand the user's REAL problem (not just keywords)
2. Consider their trade, team size, budget, and specific pain points
3. Return ONLY valid JSON (no markdown, no code fences)

RESPONSE SCHEMA:
{
  "answerText": "2-3 sentence direct answer recommending the best option and why",
  "interpretation": {
    "trade_context": "what trade(s) you detected or empty string",
    "problem_summary": "what problem they're solving",
    "budget_signal": "low | mid | high | unknown",
    "team_size": "solo | small | medium | large | unknown",
    "reformatted_query": "professional restatement of their query"
  },
  "top_pick": {
    "tool_id": "exact id from database",
    "headline": "catchy one-line reason this is the top pick",
    "explanation": "2-3 sentences explaining why this specific tool fits",
    "best_for": "short phrase describing ideal user"
  },
  "recommendations": [
    {
      "tool_id": "id",
      "relevance_score": 85,
      "headline": "one-liner",
      "explanation": "1-2 sentences specific to the query",
      "best_for": "ideal user phrase",
      "key_highlights": ["feature 1", "feature 2", "feature 3"],
      "caution": "optional warning or null"
    }
  ],
  "trade_matches": [
    { "trade_id": "id", "relevance_score": 70, "explanation": "one sentence" }
  ],
  "follow_up_questions": ["question 1", "question 2", "question 3"],
  "category_insight": "1-2 sentences of expert insight about this category"
}

Return 3-6 recommendations sorted by relevance_score descending. Be specific and actionable. Never hallucinate tool names — only use IDs from the database.`;
}

export async function searchWithOpenAI(
  rawQuery: string,
  apiKey: string,
  onChunk?: (text: string) => void
): Promise<AISearchResponse> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: rawQuery },
      ],
      temperature: 0.3,
      max_tokens: 1800,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error((err as any)?.error?.message || `OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";

  // Parse JSON from response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Invalid JSON response from OpenAI");
  const parsed = JSON.parse(jsonMatch[0]);

  // Map back to our AISearchResponse shape
  const intent: ParsedIntent = {
    tradeIds: trades.filter((t) => parsed.interpretation?.trade_context?.toLowerCase().includes(t.name.toLowerCase())).map((t) => t.id),
    tradeLabels: [],
    problemTypes: [],
    problemLabels: [],
    budgetSignal: parsed.interpretation?.budget_signal || "unknown",
    teamSizeSignal: parsed.interpretation?.team_size || "unknown",
    categoryPreference: null,
    reformattedQuery: parsed.interpretation?.reformatted_query || rawQuery,
  };
  intent.tradeLabels = intent.tradeIds.map((id) => trades.find((t) => t.id === id)?.name || "");

  const resolveToolMatch = (rec: any): AIToolMatch | null => {
    const tool = tools.find((t) => t.id === rec.tool_id);
    if (!tool) return null;
    return {
      tool,
      relevanceScore: rec.relevance_score || 70,
      headline: rec.headline || tool.tagline,
      explanation: rec.explanation || tool.tagline,
      bestFor: rec.best_for || tool.type,
      keyHighlights: rec.key_highlights || tool.features.slice(0, 4),
      caution: rec.caution || undefined,
    };
  };

  const topPickRaw = parsed.top_pick ? resolveToolMatch({ ...parsed.top_pick, relevance_score: 95 }) : null;
  const toolMatches = (parsed.recommendations || [])
    .map(resolveToolMatch)
    .filter((m: AIToolMatch | null): m is AIToolMatch => m !== null);

  const tradeMatches: AITradeMatch[] = (parsed.trade_matches || [])
    .map((tm: any) => {
      const trade = trades.find((t) => t.id === tm.trade_id);
      if (!trade) return null;
      return { trade, relevanceScore: tm.relevance_score || 60, explanation: tm.explanation || "" };
    })
    .filter(Boolean);

  return {
    mode: "ai",
    intent,
    answerText: parsed.answerText || "",
    topPick: topPickRaw,
    toolMatches,
    tradeMatches,
    followUpQuestions: parsed.follow_up_questions || [],
    categoryInsight: parsed.category_insight || "",
  };
}

// ─── Main orchestrator ────────────────────────────────────────────────────────
export async function runAISearch(
  rawQuery: string,
  apiKey: string | null
): Promise<AISearchResponse> {
  if (apiKey) {
    try {
      return await searchWithOpenAI(rawQuery, apiKey);
    } catch (err) {
      console.warn("OpenAI search failed, falling back to simulated AI:", err);
      return { ...simulatedAISearch(rawQuery), mode: "simulated" };
    }
  }
  // Simulate network latency for realistic feel
  await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
  return simulatedAISearch(rawQuery);
}
