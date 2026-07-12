import { createBrowserRouter } from "react-router";
import { lazy, Suspense, createElement } from "react";
import { Root } from "./Root";
import { routeTable } from "./routeTable";

function withSuspense(Component: React.LazyExoticComponent<React.ComponentType>) {
  return function SuspenseWrapper() {
    return createElement(Suspense, { fallback: null }, createElement(Component));
  };
}

// Lazy-load page components for code splitting (route definitions live in routeTable.ts)
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: routeTable.map((def) => {
      const Component = withSuspense(lazy(() => def.load().then((m) => ({ default: m.Component }))));
      return def.index ? { index: true as const, Component } : { path: def.path, Component };
    }),
  },
]);
