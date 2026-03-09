import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { X, Plus, Trash2, CheckCircle2, ChevronDown, Globe } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { trades } from "../../data/constructionData";
const CATEGORIES = ["Software", "AI Agent", "Platform"];
const TOOL_TYPES = [
    "Project Management",
    "Estimating & Takeoff",
    "Field Service Management",
    "BIM & Design",
    "Document Management",
    "AI Scheduling",
    "AI Estimating",
    "Site Intelligence",
    "Financial Management",
    "Safety Management",
    "Other",
];
export function SubmitToolModal() {
    const { submitModalOpen, closeSubmitModal } = useApp();
    const [step, setStep] = useState("form");
    const [featureInput, setFeatureInput] = useState("");
    const [form, setForm] = useState({
        name: "",
        website: "",
        category: "",
        type: "",
        tagline: "",
        description: "",
        price: "",
        selectedTrades: [],
        features: [],
        contactName: "",
        contactEmail: "",
        isVendor: false,
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (submitModalOpen) {
            setStep("form");
            setErrors({});
        }
    }, [submitModalOpen]);
    if (!submitModalOpen)
        return null;
    const toggleTrade = (tradeId) => {
        setForm((f) => ({
            ...f,
            selectedTrades: f.selectedTrades.includes(tradeId)
                ? f.selectedTrades.filter((t) => t !== tradeId)
                : [...f.selectedTrades, tradeId],
        }));
    };
    const addFeature = () => {
        if (featureInput.trim() && form.features.length < 12) {
            setForm((f) => ({ ...f, features: [...f.features, featureInput.trim()] }));
            setFeatureInput("");
        }
    };
    const removeFeature = (idx) => {
        setForm((f) => ({ ...f, features: f.features.filter((_, i) => i !== idx) }));
    };
    const validate = () => {
        const e = {};
        if (!form.name.trim())
            e.name = "Tool name is required";
        if (!form.website.trim())
            e.website = "Website URL is required";
        else if (!form.website.startsWith("http"))
            e.website = "Enter a valid URL (starting with http)";
        if (!form.category)
            e.category = "Please select a category";
        if (!form.type)
            e.type = "Please select a tool type";
        if (!form.tagline.trim())
            e.tagline = "A short tagline is required";
        if (form.description.trim().length < 80)
            e.description = "Description must be at least 80 characters";
        if (form.selectedTrades.length === 0)
            e.trades = "Select at least one trade";
        if (!form.contactEmail.trim())
            e.contactEmail = "Contact email is required";
        else if (!/\S+@\S+\.\S+/.test(form.contactEmail))
            e.contactEmail = "Enter a valid email";
        return e;
    };
    const handleSubmit = () => {
        const e = validate();
        if (Object.keys(e).length > 0) {
            setErrors(e);
            return;
        }
        setStep("success");
    };
    const categoryColors = {
        Software: "#15803d",
        "AI Agent": "#7c3aed",
        Platform: "#1d4ed8",
    };
    return (_jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", style: { backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }, children: _jsxs("div", { className: "w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden", style: { backgroundColor: "#fff", maxHeight: "90vh", overflowY: "auto" }, children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10 bg-white", style: { borderColor: "#e2e8f0" }, children: [_jsxs("div", { children: [_jsx("h2", { className: "font-bold", style: { color: "#0f172a" }, children: "Submit a Tool" }), _jsx("p", { className: "text-xs mt-0.5", style: { color: "#64748b" }, children: "Add your tool or software to the BUILTECH directory" })] }), _jsx("button", { onClick: closeSubmitModal, className: "w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors", children: _jsx(X, { className: "w-4 h-4", style: { color: "#64748b" } }) })] }), step === "success" ? (_jsxs("div", { className: "p-10 text-center", children: [_jsx("div", { className: "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4", style: { backgroundColor: "#f0fdf4" }, children: _jsx(CheckCircle2, { className: "w-8 h-8", style: { color: "#16a34a" } }) }), _jsx("h3", { className: "text-xl font-bold", style: { color: "#0f172a" }, children: "Submission Received!" }), _jsxs("p", { className: "mt-2", style: { color: "#64748b" }, children: ["Thank you for submitting ", _jsx("strong", { children: form.name }), " to the BUILTECH directory. Our team will review your submission within 3\u20135 business days."] }), _jsxs("p", { className: "text-sm mt-3 p-4 rounded-xl", style: { backgroundColor: "#f8fafc", color: "#64748b" }, children: ["We'll send a confirmation to ", _jsx("strong", { children: form.contactEmail }), " and reach out if we need additional information."] }), _jsx("button", { onClick: closeSubmitModal, className: "mt-6 px-6 py-2.5 rounded-xl font-medium text-white", style: { backgroundColor: "#f97316" }, children: "Done" })] })) : (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-wider mb-3", style: { color: "#64748b" }, children: "01 \u2014 Tool Details" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium mb-1", style: { color: "#374151" }, children: "Tool / Software Name *" }), _jsx("input", { type: "text", placeholder: "e.g., Procore, Togal.AI", className: "w-full px-3 py-2.5 rounded-xl border text-sm outline-none", style: { borderColor: errors.name ? "#ef4444" : "#e2e8f0" }, value: form.name, onChange: (e) => {
                                                                setForm((f) => ({ ...f, name: e.target.value }));
                                                                setErrors((err) => ({ ...err, name: "" }));
                                                            } }), errors.name && _jsx("p", { className: "text-xs mt-0.5", style: { color: "#ef4444" }, children: errors.name })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium mb-1", style: { color: "#374151" }, children: "Website URL *" }), _jsxs("div", { className: "relative", children: [_jsx(Globe, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5", style: { color: "#94a3b8" } }), _jsx("input", { type: "text", placeholder: "https://yourtool.com", className: "w-full pl-8 pr-3 py-2.5 rounded-xl border text-sm outline-none", style: { borderColor: errors.website ? "#ef4444" : "#e2e8f0" }, value: form.website, onChange: (e) => {
                                                                        setForm((f) => ({ ...f, website: e.target.value }));
                                                                        setErrors((err) => ({ ...err, website: "" }));
                                                                    } })] }), errors.website && _jsx("p", { className: "text-xs mt-0.5", style: { color: "#ef4444" }, children: errors.website })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium mb-1", style: { color: "#374151" }, children: "Category *" }), _jsx("div", { className: "flex gap-2", children: CATEGORIES.map((cat) => (_jsx("button", { onClick: () => {
                                                                    setForm((f) => ({ ...f, category: cat }));
                                                                    setErrors((err) => ({ ...err, category: "" }));
                                                                }, className: "flex-1 py-2 rounded-lg border text-xs font-medium transition-all", style: {
                                                                    backgroundColor: form.category === cat ? `${categoryColors[cat]}18` : "white",
                                                                    borderColor: form.category === cat ? categoryColors[cat] : "#e2e8f0",
                                                                    color: form.category === cat ? categoryColors[cat] : "#64748b",
                                                                }, children: cat }, cat))) }), errors.category && _jsx("p", { className: "text-xs mt-0.5", style: { color: "#ef4444" }, children: errors.category })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium mb-1", style: { color: "#374151" }, children: "Tool Type *" }), _jsxs("div", { className: "relative", children: [_jsxs("select", { className: "w-full px-3 py-2.5 rounded-xl border text-sm bg-white appearance-none outline-none pr-8", style: { borderColor: errors.type ? "#ef4444" : "#e2e8f0" }, value: form.type, onChange: (e) => {
                                                                        setForm((f) => ({ ...f, type: e.target.value }));
                                                                        setErrors((err) => ({ ...err, type: "" }));
                                                                    }, children: [_jsx("option", { value: "", children: "Select type..." }), TOOL_TYPES.map((t) => (_jsx("option", { value: t, children: t }, t)))] }), _jsx(ChevronDown, { className: "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none", style: { color: "#94a3b8" } })] }), errors.type && _jsx("p", { className: "text-xs mt-0.5", style: { color: "#ef4444" }, children: errors.type })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium mb-1", style: { color: "#374151" }, children: "Tagline \u2014 One sentence description *" }), _jsx("input", { type: "text", placeholder: "e.g., The #1 construction management platform", maxLength: 80, className: "w-full px-3 py-2.5 rounded-xl border text-sm outline-none", style: { borderColor: errors.tagline ? "#ef4444" : "#e2e8f0" }, value: form.tagline, onChange: (e) => {
                                                        setForm((f) => ({ ...f, tagline: e.target.value }));
                                                        setErrors((err) => ({ ...err, tagline: "" }));
                                                    } }), errors.tagline && _jsx("p", { className: "text-xs mt-0.5", style: { color: "#ef4444" }, children: errors.tagline })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium mb-1", style: { color: "#374151" }, children: "Full Description * (min 80 characters)" }), _jsx("textarea", { rows: 4, placeholder: "Describe what your tool does, who it's for, and what problems it solves for construction professionals...", className: "w-full px-3 py-2.5 rounded-xl border text-sm outline-none resize-none", style: { borderColor: errors.description ? "#ef4444" : "#e2e8f0" }, value: form.description, onChange: (e) => {
                                                        setForm((f) => ({ ...f, description: e.target.value }));
                                                        setErrors((err) => ({ ...err, description: "" }));
                                                    } }), _jsxs("div", { className: "flex justify-between mt-1", children: [errors.description ? (_jsx("p", { className: "text-xs", style: { color: "#ef4444" }, children: errors.description })) : _jsx("span", {}), _jsxs("span", { className: "text-xs", style: { color: form.description.length >= 80 ? "#16a34a" : "#94a3b8" }, children: [form.description.length, "/80 min"] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium mb-1", style: { color: "#374151" }, children: "Starting Price" }), _jsx("input", { type: "text", placeholder: "e.g., $299/mo, Custom, Free", className: "w-full px-3 py-2.5 rounded-xl border text-sm outline-none", style: { borderColor: "#e2e8f0" }, value: form.price, onChange: (e) => setForm((f) => ({ ...f, price: e.target.value })) })] })] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-wider mb-3", style: { color: "#64748b" }, children: "02 \u2014 Applicable Trades *" }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: trades.map((trade) => {
                                        const selected = form.selectedTrades.includes(trade.id);
                                        return (_jsxs("button", { onClick: () => {
                                                toggleTrade(trade.id);
                                                setErrors((err) => ({ ...err, trades: "" }));
                                            }, className: "flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all", style: {
                                                backgroundColor: selected ? "#fff7ed" : "white",
                                                borderColor: selected ? "#f97316" : "#e2e8f0",
                                                color: selected ? "#f97316" : "#64748b",
                                            }, children: [_jsx("span", { children: trade.emoji }), _jsx("span", { className: "truncate", children: trade.name })] }, trade.id));
                                    }) }), errors.trades && _jsx("p", { className: "text-xs mt-1", style: { color: "#ef4444" }, children: errors.trades })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-wider mb-3", style: { color: "#64748b" }, children: "03 \u2014 Key Features (up to 12)" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", placeholder: "Add a key feature...", className: "flex-1 px-3 py-2.5 rounded-xl border text-sm outline-none", style: { borderColor: "#e2e8f0" }, value: featureInput, onChange: (e) => setFeatureInput(e.target.value), onKeyDown: (e) => e.key === "Enter" && addFeature() }), _jsx("button", { onClick: addFeature, className: "px-3 py-2.5 rounded-xl font-medium text-white", style: { backgroundColor: form.features.length >= 12 ? "#94a3b8" : "#0f172a" }, disabled: form.features.length >= 12, children: _jsx(Plus, { className: "w-4 h-4" }) })] }), form.features.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2 mt-3", children: form.features.map((feature, idx) => (_jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border", style: { backgroundColor: "#f0fdf4", borderColor: "#bbf7d0", color: "#15803d" }, children: [feature, _jsx("button", { onClick: () => removeFeature(idx), className: "hover:text-red-500 transition-colors", children: _jsx(Trash2, { className: "w-3 h-3" }) })] }, idx))) }))] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-wider mb-3", style: { color: "#64748b" }, children: "04 \u2014 Contact Information" }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium mb-1", style: { color: "#374151" }, children: "Your Name" }), _jsx("input", { type: "text", placeholder: "Full name", className: "w-full px-3 py-2.5 rounded-xl border text-sm outline-none", style: { borderColor: "#e2e8f0" }, value: form.contactName, onChange: (e) => setForm((f) => ({ ...f, contactName: e.target.value })) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium mb-1", style: { color: "#374151" }, children: "Email Address *" }), _jsx("input", { type: "email", placeholder: "you@company.com", className: "w-full px-3 py-2.5 rounded-xl border text-sm outline-none", style: { borderColor: errors.contactEmail ? "#ef4444" : "#e2e8f0" }, value: form.contactEmail, onChange: (e) => {
                                                        setForm((f) => ({ ...f, contactEmail: e.target.value }));
                                                        setErrors((err) => ({ ...err, contactEmail: "" }));
                                                    } }), errors.contactEmail && _jsx("p", { className: "text-xs mt-0.5", style: { color: "#ef4444" }, children: errors.contactEmail })] })] }), _jsxs("label", { className: "flex items-start gap-2.5 mt-3 cursor-pointer", children: [_jsx("div", { className: "w-4 h-4 rounded border shrink-0 mt-0.5 flex items-center justify-center transition-colors", style: {
                                                borderColor: form.isVendor ? "#f97316" : "#e2e8f0",
                                                backgroundColor: form.isVendor ? "#f97316" : "white",
                                            }, onClick: () => setForm((f) => ({ ...f, isVendor: !f.isVendor })), children: form.isVendor && _jsx("span", { className: "text-white text-xs font-bold", children: "\u2713" }) }), _jsx("span", { className: "text-xs", style: { color: "#374151" }, children: "I am the vendor / developer of this tool and am submitting on behalf of my company." })] })] }), _jsxs("div", { className: "flex gap-3 pt-2", children: [_jsx("button", { onClick: closeSubmitModal, className: "flex-1 py-3 rounded-xl border text-sm font-medium transition-colors hover:bg-gray-50", style: { borderColor: "#e2e8f0", color: "#374151" }, children: "Cancel" }), _jsx("button", { onClick: handleSubmit, className: "flex-1 py-3 rounded-xl text-sm font-medium text-white transition-all hover:brightness-110", style: { backgroundColor: "#f97316" }, children: "Submit for Review" })] }), _jsx("p", { className: "text-xs text-center", style: { color: "#94a3b8" }, children: "Submissions are reviewed by our team. Listing is free. Sponsored placement is available upon request." })] }))] }) }));
}
