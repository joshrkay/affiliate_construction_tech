import { createBrowserRouter } from "react-router";
import { lazy, Suspense, createElement } from "react";
import { Root } from "./Root";

// Lazy-load page components for code splitting
const HomePage = lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const TradePage = lazy(() => import("./pages/TradePage").then(m => ({ default: m.TradePage })));
const ToolPage = lazy(() => import("./pages/ToolPage").then(m => ({ default: m.ToolPage })));
const ComparePage = lazy(() => import("./pages/ComparePage").then(m => ({ default: m.ComparePage })));
const SearchPage = lazy(() => import("./pages/SearchPage").then(m => ({ default: m.SearchPage })));
const NotFound = lazy(() => import("./pages/NotFound").then(m => ({ default: m.NotFound })));
const ComparisonDetailPage = lazy(() => import("./pages/ComparisonDetailPage").then(m => ({ default: m.ComparisonDetailPage })));
const BestForPage = lazy(() => import("./pages/BestForPage").then(m => ({ default: m.BestForPage })));
const CategoryPage = lazy(() => import("./pages/CategoryPage").then(m => ({ default: m.CategoryPage })));
const GuidePage = lazy(() => import("./pages/GuidePage").then(m => ({ default: m.GuidePage })));
const GuidesIndexPage = lazy(() => import("./pages/GuidesIndexPage").then(m => ({ default: m.GuidesIndexPage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })));
const MethodologyPage = lazy(() => import("./pages/MethodologyPage").then(m => ({ default: m.MethodologyPage })));

function withSuspense(Component: React.LazyExoticComponent<React.ComponentType>) {
  return function SuspenseWrapper() {
    return createElement(Suspense, { fallback: null }, createElement(Component));
  };
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: withSuspense(HomePage) },
      { path: "trades/:slug", Component: withSuspense(TradePage) },
      { path: "tools/:slug", Component: withSuspense(ToolPage) },
      { path: "categories/:slug", Component: withSuspense(CategoryPage) },
      { path: "compare", Component: withSuspense(ComparePage) },
      { path: "compare/:slug", Component: withSuspense(ComparisonDetailPage) },
      { path: "best/:slug", Component: withSuspense(BestForPage) },
      { path: "guides", Component: withSuspense(GuidesIndexPage) },
      { path: "guides/:slug", Component: withSuspense(GuidePage) },
      { path: "about", Component: withSuspense(AboutPage) },
      { path: "methodology", Component: withSuspense(MethodologyPage) },
      { path: "search", Component: withSuspense(SearchPage) },
      { path: "*", Component: withSuspense(NotFound) },
    ],
  },
]);
