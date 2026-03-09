import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { TradePage } from "./pages/TradePage";
import { ToolPage } from "./pages/ToolPage";
import { ComparePage } from "./pages/ComparePage";
import { SearchPage } from "./pages/SearchPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "trades/:slug", Component: TradePage },
      { path: "tools/:slug", Component: ToolPage },
      { path: "compare", Component: ComparePage },
      { path: "search", Component: SearchPage },
      { path: "*", Component: NotFound },
    ],
  },
]);