import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { CompareBar } from "./components/CompareBar";
import { ReviewModal } from "./components/modals/ReviewModal";
import { SubmitToolModal } from "./components/modals/SubmitToolModal";
import { AppProvider } from "./context/AppContext";
function RootLayout() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (_jsxs("div", { className: "min-h-screen flex flex-col", style: { backgroundColor: "#f1f5f9" }, children: [_jsx(Header, {}), _jsx("main", { className: "flex-1", children: _jsx(Outlet, {}) }), _jsx(Footer, {}), _jsx(CompareBar, {}), _jsx(ReviewModal, {}), _jsx(SubmitToolModal, {})] }));
}
export function Root() {
    return (_jsx(AppProvider, { children: _jsx(RootLayout, {}) }));
}
