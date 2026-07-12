import { Link } from "react-router";
import { ChevronRight, BookOpen, Clock } from "lucide-react";
import { blogPosts } from "../data/blogPosts";

export function BlogIndexPage() {
  return (
    <>
      <title>Construction Tech Blog — News, Reviews & Buying Advice | BUILTECH</title>
      <meta
        name="description"
        content="Practical articles on construction software, AI tools, pricing, and buying decisions — written for contractors, estimators, and project managers."
      />
      <link rel="canonical" href="https://bestconstructionapps.com/blog" />

      {/* Header */}
      <div style={{ backgroundColor: "#0c1a2e" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "#64748b" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: "#fb923c" }}>Blog</span>
          </nav>
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(249,115,22,0.2)" }}
            >
              <BookOpen className="w-6 h-6" style={{ color: "#f97316" }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Construction Tech Blog</h1>
              <p className="mt-1" style={{ color: "#94a3b8" }}>
                Practical articles on construction software, AI tools, pricing, and buying decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Post list */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {blogPosts.length === 0 && (
          <p style={{ color: "#64748b" }}>No posts yet — check back soon.</p>
        )}
        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block bg-white rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md"
              style={{ borderColor: "#e2e8f0" }}
            >
              <div className="flex items-center gap-3 text-xs mb-2" style={{ color: "#94a3b8" }}>
                <time dateTime={post.date}>
                  {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {post.minutes} min read
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2" style={{ color: "#0f172a" }}>{post.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{post.description}</p>
              <span className="inline-block mt-3 text-sm font-medium" style={{ color: "#f97316" }}>
                Read article →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
