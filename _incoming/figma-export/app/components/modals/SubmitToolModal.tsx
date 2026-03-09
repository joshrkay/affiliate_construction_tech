import { useState, useEffect } from "react";
import { X, Plus, Trash2, CheckCircle2, ChevronDown, Globe } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { trades } from "../../data/constructionData";

const CATEGORIES = ["Software", "AI Agent", "Platform"] as const;
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
  const [step, setStep] = useState<"form" | "success">("form");
  const [featureInput, setFeatureInput] = useState("");
  const [form, setForm] = useState({
    name: "",
    website: "",
    category: "" as typeof CATEGORIES[number] | "",
    type: "",
    tagline: "",
    description: "",
    price: "",
    selectedTrades: [] as string[],
    features: [] as string[],
    contactName: "",
    contactEmail: "",
    isVendor: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (submitModalOpen) {
      setStep("form");
      setErrors({});
    }
  }, [submitModalOpen]);

  if (!submitModalOpen) return null;

  const toggleTrade = (tradeId: string) => {
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

  const removeFeature = (idx: number) => {
    setForm((f) => ({ ...f, features: f.features.filter((_, i) => i !== idx) }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Tool name is required";
    if (!form.website.trim()) e.website = "Website URL is required";
    else if (!form.website.startsWith("http")) e.website = "Enter a valid URL (starting with http)";
    if (!form.category) e.category = "Please select a category";
    if (!form.type) e.type = "Please select a tool type";
    if (!form.tagline.trim()) e.tagline = "A short tagline is required";
    if (form.description.trim().length < 80) e.description = "Description must be at least 80 characters";
    if (form.selectedTrades.length === 0) e.trades = "Select at least one trade";
    if (!form.contactEmail.trim()) e.contactEmail = "Contact email is required";
    else if (!/\S+@\S+\.\S+/.test(form.contactEmail)) e.contactEmail = "Enter a valid email";
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

  const categoryColors: Record<string, string> = {
    Software: "#15803d",
    "AI Agent": "#7c3aed",
    Platform: "#1d4ed8",
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: "#fff", maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10 bg-white"
          style={{ borderColor: "#e2e8f0" }}
        >
          <div>
            <h2 className="font-bold" style={{ color: "#0f172a" }}>
              Submit a Tool
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
              Add your tool or software to the BUILTECH directory
            </p>
          </div>
          <button
            onClick={closeSubmitModal}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" style={{ color: "#64748b" }} />
          </button>
        </div>

        {step === "success" ? (
          <div className="p-10 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#f0fdf4" }}
            >
              <CheckCircle2 className="w-8 h-8" style={{ color: "#16a34a" }} />
            </div>
            <h3 className="text-xl font-bold" style={{ color: "#0f172a" }}>
              Submission Received!
            </h3>
            <p className="mt-2" style={{ color: "#64748b" }}>
              Thank you for submitting <strong>{form.name}</strong> to the BUILTECH directory. Our team will review your submission within 3–5 business days.
            </p>
            <p className="text-sm mt-3 p-4 rounded-xl" style={{ backgroundColor: "#f8fafc", color: "#64748b" }}>
              We'll send a confirmation to <strong>{form.contactEmail}</strong> and reach out if we need additional information.
            </p>
            <button
              onClick={closeSubmitModal}
              className="mt-6 px-6 py-2.5 rounded-xl font-medium text-white"
              style={{ backgroundColor: "#f97316" }}
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Section: Tool Details */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#64748b" }}>
                01 — Tool Details
              </p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: "#374151" }}>
                      Tool / Software Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Procore, Togal.AI"
                      className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                      style={{ borderColor: errors.name ? "#ef4444" : "#e2e8f0" }}
                      value={form.name}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, name: e.target.value }));
                        setErrors((err) => ({ ...err, name: "" }));
                      }}
                    />
                    {errors.name && <p className="text-xs mt-0.5" style={{ color: "#ef4444" }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: "#374151" }}>
                      Website URL *
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#94a3b8" }} />
                      <input
                        type="text"
                        placeholder="https://yourtool.com"
                        className="w-full pl-8 pr-3 py-2.5 rounded-xl border text-sm outline-none"
                        style={{ borderColor: errors.website ? "#ef4444" : "#e2e8f0" }}
                        value={form.website}
                        onChange={(e) => {
                          setForm((f) => ({ ...f, website: e.target.value }));
                          setErrors((err) => ({ ...err, website: "" }));
                        }}
                      />
                    </div>
                    {errors.website && <p className="text-xs mt-0.5" style={{ color: "#ef4444" }}>{errors.website}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Category */}
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: "#374151" }}>
                      Category *
                    </label>
                    <div className="flex gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setForm((f) => ({ ...f, category: cat }));
                            setErrors((err) => ({ ...err, category: "" }));
                          }}
                          className="flex-1 py-2 rounded-lg border text-xs font-medium transition-all"
                          style={{
                            backgroundColor: form.category === cat ? `${categoryColors[cat]}18` : "white",
                            borderColor: form.category === cat ? categoryColors[cat] : "#e2e8f0",
                            color: form.category === cat ? categoryColors[cat] : "#64748b",
                          }}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    {errors.category && <p className="text-xs mt-0.5" style={{ color: "#ef4444" }}>{errors.category}</p>}
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: "#374151" }}>
                      Tool Type *
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-3 py-2.5 rounded-xl border text-sm bg-white appearance-none outline-none pr-8"
                        style={{ borderColor: errors.type ? "#ef4444" : "#e2e8f0" }}
                        value={form.type}
                        onChange={(e) => {
                          setForm((f) => ({ ...f, type: e.target.value }));
                          setErrors((err) => ({ ...err, type: "" }));
                        }}
                      >
                        <option value="">Select type...</option>
                        {TOOL_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "#94a3b8" }} />
                    </div>
                    {errors.type && <p className="text-xs mt-0.5" style={{ color: "#ef4444" }}>{errors.type}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "#374151" }}>
                    Tagline — One sentence description *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., The #1 construction management platform"
                    maxLength={80}
                    className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                    style={{ borderColor: errors.tagline ? "#ef4444" : "#e2e8f0" }}
                    value={form.tagline}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, tagline: e.target.value }));
                      setErrors((err) => ({ ...err, tagline: "" }));
                    }}
                  />
                  {errors.tagline && <p className="text-xs mt-0.5" style={{ color: "#ef4444" }}>{errors.tagline}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "#374151" }}>
                    Full Description * (min 80 characters)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe what your tool does, who it's for, and what problems it solves for construction professionals..."
                    className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none resize-none"
                    style={{ borderColor: errors.description ? "#ef4444" : "#e2e8f0" }}
                    value={form.description}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, description: e.target.value }));
                      setErrors((err) => ({ ...err, description: "" }));
                    }}
                  />
                  <div className="flex justify-between mt-1">
                    {errors.description ? (
                      <p className="text-xs" style={{ color: "#ef4444" }}>{errors.description}</p>
                    ) : <span />}
                    <span className="text-xs" style={{ color: form.description.length >= 80 ? "#16a34a" : "#94a3b8" }}>
                      {form.description.length}/80 min
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "#374151" }}>
                    Starting Price
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., $299/mo, Custom, Free"
                    className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                    style={{ borderColor: "#e2e8f0" }}
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Trades */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#64748b" }}>
                02 — Applicable Trades *
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {trades.map((trade) => {
                  const selected = form.selectedTrades.includes(trade.id);
                  return (
                    <button
                      key={trade.id}
                      onClick={() => {
                        toggleTrade(trade.id);
                        setErrors((err) => ({ ...err, trades: "" }));
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all"
                      style={{
                        backgroundColor: selected ? "#fff7ed" : "white",
                        borderColor: selected ? "#f97316" : "#e2e8f0",
                        color: selected ? "#f97316" : "#64748b",
                      }}
                    >
                      <span>{trade.emoji}</span>
                      <span className="truncate">{trade.name}</span>
                    </button>
                  );
                })}
              </div>
              {errors.trades && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.trades}</p>}
            </div>

            {/* Key Features */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#64748b" }}>
                03 — Key Features (up to 12)
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a key feature..."
                  className="flex-1 px-3 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "#e2e8f0" }}
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addFeature()}
                />
                <button
                  onClick={addFeature}
                  className="px-3 py-2.5 rounded-xl font-medium text-white"
                  style={{ backgroundColor: form.features.length >= 12 ? "#94a3b8" : "#0f172a" }}
                  disabled={form.features.length >= 12}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {form.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border"
                      style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0", color: "#15803d" }}
                    >
                      {feature}
                      <button onClick={() => removeFeature(idx)} className="hover:text-red-500 transition-colors">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#64748b" }}>
                04 — Contact Information
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "#374151" }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                    style={{ borderColor: "#e2e8f0" }}
                    value={form.contactName}
                    onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "#374151" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                    style={{ borderColor: errors.contactEmail ? "#ef4444" : "#e2e8f0" }}
                    value={form.contactEmail}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, contactEmail: e.target.value }));
                      setErrors((err) => ({ ...err, contactEmail: "" }));
                    }}
                  />
                  {errors.contactEmail && <p className="text-xs mt-0.5" style={{ color: "#ef4444" }}>{errors.contactEmail}</p>}
                </div>
              </div>

              <label className="flex items-start gap-2.5 mt-3 cursor-pointer">
                <div
                  className="w-4 h-4 rounded border shrink-0 mt-0.5 flex items-center justify-center transition-colors"
                  style={{
                    borderColor: form.isVendor ? "#f97316" : "#e2e8f0",
                    backgroundColor: form.isVendor ? "#f97316" : "white",
                  }}
                  onClick={() => setForm((f) => ({ ...f, isVendor: !f.isVendor }))}
                >
                  {form.isVendor && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <span className="text-xs" style={{ color: "#374151" }}>
                  I am the vendor / developer of this tool and am submitting on behalf of my company.
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={closeSubmitModal}
                className="flex-1 py-3 rounded-xl border text-sm font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: "#e2e8f0", color: "#374151" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-white transition-all hover:brightness-110"
                style={{ backgroundColor: "#f97316" }}
              >
                Submit for Review
              </button>
            </div>

            <p className="text-xs text-center" style={{ color: "#94a3b8" }}>
              Submissions are reviewed by our team. Listing is free. Sponsored placement is available upon request.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
