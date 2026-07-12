/**
 * Build-time server entry for prerendering full page HTML.
 * Built with `vite build --ssr entry-server.tsx` and consumed by scripts/prerender.ts.
 */
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import { Root } from "./app/Root";
import { routeTable } from "./app/routeTable";

// Resolve all lazy page modules once, eagerly, and reuse across renders.
const childrenPromise = Promise.all(
  routeTable.map(async (def) => {
    const { Component } = await def.load();
    return def.index ? { index: true as const, Component } : { path: def.path, Component };
  })
);

export async function render(url: string): Promise<string> {
  const children = await childrenPromise;
  const router = createMemoryRouter([{ path: "/", Component: Root, children }], {
    initialEntries: [url],
  });
  try {
    return renderToString(createElement(RouterProvider, { router }));
  } finally {
    router.dispose();
  }
}
