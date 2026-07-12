import type { ComponentType } from "react";

/**
 * Single source of truth for route definitions.
 * - routes.ts consumes this with React.lazy for client-side code splitting
 * - entry-server.tsx consumes this eagerly for build-time prerendering
 */
export interface RouteDef {
  index?: boolean;
  path?: string;
  load: () => Promise<{ Component: ComponentType }>;
}

export const routeTable: RouteDef[] = [
  { index: true, load: () => import("./pages/HomePage").then((m) => ({ Component: m.HomePage })) },
  { path: "trades/:slug", load: () => import("./pages/TradePage").then((m) => ({ Component: m.TradePage })) },
  { path: "tools/:slug", load: () => import("./pages/ToolPage").then((m) => ({ Component: m.ToolPage })) },
  { path: "categories/:slug", load: () => import("./pages/CategoryPage").then((m) => ({ Component: m.CategoryPage })) },
  { path: "compare", load: () => import("./pages/ComparePage").then((m) => ({ Component: m.ComparePage })) },
  { path: "compare/:slug", load: () => import("./pages/ComparisonDetailPage").then((m) => ({ Component: m.ComparisonDetailPage })) },
  { path: "best/:slug", load: () => import("./pages/BestForPage").then((m) => ({ Component: m.BestForPage })) },
  { path: "top-rated", load: () => import("./pages/TopRatedPage").then((m) => ({ Component: m.TopRatedPage })) },
  { path: "guides", load: () => import("./pages/GuidesIndexPage").then((m) => ({ Component: m.GuidesIndexPage })) },
  { path: "guides/:slug", load: () => import("./pages/GuidePage").then((m) => ({ Component: m.GuidePage })) },
  { path: "blog", load: () => import("./pages/BlogIndexPage").then((m) => ({ Component: m.BlogIndexPage })) },
  { path: "blog/:slug", load: () => import("./pages/BlogPostPage").then((m) => ({ Component: m.BlogPostPage })) },
  // TEMP-DISABLED   { path: "pricing", load: () => import("./pages/PricingIndexPage").then((m) => ({ Component: m.PricingIndexPage })) },
  // TEMP-DISABLED   { path: "pricing/:slug", load: () => import("./pages/PricingPage").then((m) => ({ Component: m.PricingPage })) },
  // TEMP-DISABLED   { path: "cost-calculator", load: () => import("./pages/CostCalculatorPage").then((m) => ({ Component: m.CostCalculatorPage })) },
  // TEMP-DISABLED   { path: "updates", load: () => import("./pages/UpdatesPage").then((m) => ({ Component: m.UpdatesPage })) },
  { path: "about", load: () => import("./pages/AboutPage").then((m) => ({ Component: m.AboutPage })) },
  { path: "methodology", load: () => import("./pages/MethodologyPage").then((m) => ({ Component: m.MethodologyPage })) },
  { path: "search", load: () => import("./pages/SearchPage").then((m) => ({ Component: m.SearchPage })) },
  { path: "*", load: () => import("./pages/NotFound").then((m) => ({ Component: m.NotFound })) },
];
