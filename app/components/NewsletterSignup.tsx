import { useState } from "react";
import { Mail, Rss, Check } from "lucide-react";
import {
  NEWSLETTER_FORM_ACTION,
  NEWSLETTER_HEADLINE,
  NEWSLETTER_PITCH,
} from "../config/newsletter";

interface NewsletterSignupProps {
  /** "card" renders a standalone card for content pages; "footer" renders compact dark-background styling */
  variant?: "card" | "footer";
}

export function NewsletterSignup({ variant = "card" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dark = variant === "footer";

  // No provider configured yet — offer RSS so the block is still functional
  if (!NEWSLETTER_FORM_ACTION) {
    return (
      <a
        href="/feed.xml"
        className="inline-flex items-center gap-2 text-sm font-medium"
        style={{ color: "#f97316" }}
      >
        <Rss className="w-4 h-4" />
        Subscribe to new articles via RSS
      </a>
    );
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#16a34a" }}>
        <Check className="w-4 h-4" />
        Check your inbox to confirm your subscription.
      </div>
    );
  }

  return (
    <form
      action={NEWSLETTER_FORM_ACTION}
      method="post"
      target="_blank"
      onSubmit={() => setSubmitted(true)}
      className={dark ? "" : "bg-white rounded-2xl border p-6 shadow-sm"}
      style={dark ? undefined : { borderColor: "#e2e8f0" }}
    >
      <p className={`flex items-center gap-2 font-bold mb-1 ${dark ? "text-white" : ""}`} style={dark ? undefined : { color: "#0f172a" }}>
        <Mail className="w-4 h-4" style={{ color: "#f97316" }} />
        {NEWSLETTER_HEADLINE}
      </p>
      <p className="text-sm mb-3" style={{ color: dark ? "#94a3b8" : "#64748b" }}>
        {NEWSLETTER_PITCH}
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="flex-1 px-3 py-2.5 rounded-xl border text-sm outline-none"
          style={
            dark
              ? { backgroundColor: "rgba(255,255,255,0.06)", borderColor: "#1e3a5f", color: "white" }
              : { borderColor: "#e2e8f0", color: "#0f172a", backgroundColor: "white" }
          }
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl text-sm font-medium text-white shrink-0 hover:brightness-110 transition-all"
          style={{ backgroundColor: "#f97316" }}
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}
