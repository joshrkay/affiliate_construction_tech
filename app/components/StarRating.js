import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Star } from "lucide-react";
export function StarRating({ rating, size = "md", showValue = false }) {
    const sizes = {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
    };
    return (_jsxs("div", { className: "flex items-center gap-1", children: [[1, 2, 3, 4, 5].map((star) => {
                const filled = rating >= star;
                const partial = !filled && rating >= star - 0.5;
                return (_jsxs("div", { className: "relative", children: [_jsx(Star, { className: `${sizes[size]}`, style: { color: "#e2e8f0", fill: "#e2e8f0" } }), (filled || partial) && (_jsx("div", { className: "absolute inset-0 overflow-hidden", style: { width: filled ? "100%" : "50%" }, children: _jsx(Star, { className: `${sizes[size]}`, style: { color: "#f59e0b", fill: "#f59e0b" } }) }))] }, star));
            }), showValue && (_jsx("span", { className: "text-sm font-semibold ml-0.5", style: { color: "#1e293b" }, children: rating.toFixed(1) }))] }));
}
