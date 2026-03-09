import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router";
import { HardHat, ArrowLeft } from "lucide-react";
export function NotFound() {
    return (_jsxs("div", { className: "min-h-[60vh] flex flex-col items-center justify-center px-4 text-center", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl flex items-center justify-center mb-5", style: { backgroundColor: "#fff7ed" }, children: _jsx(HardHat, { className: "w-8 h-8", style: { color: "#f97316" } }) }), _jsx("h1", { className: "text-3xl font-bold", style: { color: "#0f172a" }, children: "Page Not Found" }), _jsx("p", { className: "mt-2 max-w-md", style: { color: "#64748b" }, children: "The tool or trade you're looking for doesn't exist in our directory yet." }), _jsxs(Link, { to: "/", className: "mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white", style: { backgroundColor: "#f97316" }, children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), "Back to Directory"] })] }));
}
