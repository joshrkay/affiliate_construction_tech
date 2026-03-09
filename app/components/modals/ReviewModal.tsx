import { useState, useEffect } from "react";
import { X, Star, CheckCircle2, ChevronDown } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { tools, Review } from "../../data/constructionData";

const ROLES = [
  "Owner / Principal",
  "Project Manager",
  "Senior Project Manager",
  "Superintendent",
  "Estimator",
  "Chief Estimator",
  "VP of Operations",
  "Director of Project Controls",
  "Field Engineer",
  "Project Engineer",
  "Office Manager",
  "Foreman",
  "Technician",
  "Other",
];

export function ReviewModal() {
  const { reviewModalOpen, reviewToolId, closeReviewModal, addLocalReview } = useApp();

  const [step, setStep] = useState<"form" | "success">("form");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [form, setForm] = useState({
    toolId: reviewToolId || "",
    rating: 0,
    title: "",
    content: "",
    author: "",
    role: "",
    company: "",
    location: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (reviewModalOpen) {
      setStep("form");
      setForm((f) => ({ ...f, toolId: reviewToolId || "", rating: 0, title: "", content: "" }));
      setErrors({});
    }
  }, [reviewModalOpen, reviewToolId]);

  if (!reviewModalOpen) return null;

  const selectedTool = tools.find((t) => t.id === form.toolId);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.toolId) e.toolId = "Please select a tool";
    if (!form.rating) e.rating = "Please select a rating";
    if (!form.title.trim()) e.title = "Please add a review title";
    if (form.content.trim().length < 50) e.content = "Review must be at least 50 characters";
    if (!form.author.trim()) e.author = "Please enter your name";
    if (!form.role) e.role = "Please select your role";
    if (!form.company.trim()) e.company = "Please enter your company";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    const review: Review = {
      id: `user-${Date.now()}`,
      toolId: form.toolId,
      author: form.author,
      role: form.role,
      company: form.company,
      location: form.location || "Undisclosed",
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      rating: form.rating,
      title: form.title,
      content: form.content,
      helpful: 0,
      avatarColor: "#f97316",
    };
    addLocalReview(review);
    setStep("success");
  };

  const avatarColors = [
    "#1d4ed8", "#7c3aed", "#0891b2", "#065f46", "#f97316", "#b91c1c",
  ];
  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

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
              Write a Review
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
              Help other contractors make better decisions
            </p>
          </div>
          <button
            onClick={closeReviewModal}
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
              Review Submitted!
            </h3>
            <p className="mt-2" style={{ color: "#64748b" }}>
              Thank you, <strong>{form.author}</strong>. Your review of{" "}
              <strong>{selectedTool?.name}</strong> has been submitted and will appear after moderation.
            </p>
            <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>
              Your review is visible on this session.
            </p>
            <button
              onClick={closeReviewModal}
              className="mt-6 px-6 py-2.5 rounded-xl font-medium text-white"
              style={{ backgroundColor: "#f97316" }}
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Tool Selection */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1e293b" }}>
                Tool / Software Being Reviewed *
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 rounded-xl border text-sm appearance-none bg-white pr-10 outline-none focus:ring-2"
                  style={{
                    borderColor: errors.toolId ? "#ef4444" : "#e2e8f0",
                    color: form.toolId ? "#0f172a" : "#94a3b8",
                    ringColor: "#f97316",
                  }}
                  value={form.toolId}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, toolId: e.target.value }));
                    setErrors((err) => ({ ...err, toolId: "" }));
                  }}
                >
                  <option value="">Select a tool...</option>
                  {tools.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} — {t.type}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "#94a3b8" }}
                />
              </div>
              {errors.toolId && (
                <p className="text-xs mt-1" style={{ color: "#ef4444" }}>
                  {errors.toolId}
                </p>
              )}
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1e293b" }}>
                Overall Rating *
              </label>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => {
                        setForm((f) => ({ ...f, rating: star }));
                        setErrors((err) => ({ ...err, rating: "" }));
                      }}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className="w-8 h-8"
                        style={{
                          color: star <= (hoveredStar || form.rating) ? "#f59e0b" : "#e2e8f0",
                          fill: star <= (hoveredStar || form.rating) ? "#f59e0b" : "#e2e8f0",
                          transition: "all 0.1s",
                        }}
                      />
                    </button>
                  ))}
                </div>
                {(hoveredStar || form.rating) > 0 && (
                  <span className="text-sm font-medium" style={{ color: "#f59e0b" }}>
                    {ratingLabels[hoveredStar || form.rating]}
                  </span>
                )}
              </div>
              {errors.rating && (
                <p className="text-xs mt-1" style={{ color: "#ef4444" }}>
                  {errors.rating}
                </p>
              )}
            </div>

            {/* Review Title */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1e293b" }}>
                Review Headline *
              </label>
              <input
                type="text"
                placeholder="Sum up your experience in one line..."
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2"
                style={{ borderColor: errors.title ? "#ef4444" : "#e2e8f0" }}
                value={form.title}
                onChange={(e) => {
                  setForm((f) => ({ ...f, title: e.target.value }));
                  setErrors((err) => ({ ...err, title: "" }));
                }}
              />
              {errors.title && (
                <p className="text-xs mt-1" style={{ color: "#ef4444" }}>
                  {errors.title}
                </p>
              )}
            </div>

            {/* Review Body */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1e293b" }}>
                Your Review *
              </label>
              <textarea
                rows={5}
                placeholder="Share your experience — what problems does it solve? What could be better? How has it impacted your business?"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none focus:ring-2"
                style={{ borderColor: errors.content ? "#ef4444" : "#e2e8f0" }}
                value={form.content}
                onChange={(e) => {
                  setForm((f) => ({ ...f, content: e.target.value }));
                  setErrors((err) => ({ ...err, content: "" }));
                }}
              />
              <div className="flex justify-between mt-1">
                {errors.content ? (
                  <p className="text-xs" style={{ color: "#ef4444" }}>
                    {errors.content}
                  </p>
                ) : (
                  <span />
                )}
                <span
                  className="text-xs"
                  style={{ color: form.content.length >= 50 ? "#16a34a" : "#94a3b8" }}
                >
                  {form.content.length} / 50 min
                </span>
              </div>
            </div>

            {/* Reviewer Info */}
            <div
              className="p-4 rounded-xl border"
              style={{ backgroundColor: "#f8fafc", borderColor: "#e2e8f0" }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#64748b" }}>
                About You
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "#374151" }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="First name + last initial"
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none bg-white"
                    style={{ borderColor: errors.author ? "#ef4444" : "#e2e8f0" }}
                    value={form.author}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, author: e.target.value }));
                      setErrors((err) => ({ ...err, author: "" }));
                    }}
                  />
                  {errors.author && (
                    <p className="text-xs mt-0.5" style={{ color: "#ef4444" }}>
                      {errors.author}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "#374151" }}>
                    Your Role *
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-3 py-2 rounded-lg border text-sm bg-white appearance-none outline-none pr-7"
                      style={{ borderColor: errors.role ? "#ef4444" : "#e2e8f0" }}
                      value={form.role}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, role: e.target.value }));
                        setErrors((err) => ({ ...err, role: "" }));
                      }}
                    >
                      <option value="">Select...</option>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                      style={{ color: "#94a3b8" }}
                    />
                  </div>
                  {errors.role && (
                    <p className="text-xs mt-0.5" style={{ color: "#ef4444" }}>
                      {errors.role}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "#374151" }}>
                    Company *
                  </label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none bg-white"
                    style={{ borderColor: errors.company ? "#ef4444" : "#e2e8f0" }}
                    value={form.company}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, company: e.target.value }));
                      setErrors((err) => ({ ...err, company: "" }));
                    }}
                  />
                  {errors.company && (
                    <p className="text-xs mt-0.5" style={{ color: "#ef4444" }}>
                      {errors.company}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "#374151" }}>
                    Location (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="City, State"
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none bg-white"
                    style={{ borderColor: "#e2e8f0" }}
                    value={form.location}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>
              By submitting, you confirm this review is based on your genuine experience. Reviews are subject to our{" "}
              <a href="#" className="underline hover:text-orange-500">
                Review Guidelines
              </a>
              . Do not include personal, confidential, or defamatory content.
            </p>

            {/* Submit */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={closeReviewModal}
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
                Submit Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}