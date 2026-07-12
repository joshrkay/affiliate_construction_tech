import { Link, useParams } from "react-router";
import { useMemo } from "react";
import { ChevronRight, Clock } from "lucide-react";
import { blogPosts, getBlogPostBySlug } from "../data/blogPosts";
import { PageByline } from "../components/PageByline";
import { NewsletterSignup } from "../components/NewsletterSignup";
import { defaultAuthor } from "../data/editorial";

export function BlogPostPage() {
  const { slug } = useParams();
  const post = useMemo(() => (slug ? getBlogPostBySlug(slug) : undefined), [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8fafc" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#0f172a" }}>Post Not Found</h1>
          <p className="mb-4" style={{ color: "#64748b" }}>The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-orange-500 hover:underline">Browse all articles</Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `https://bestconstructionapps.com/blog/${post.slug}`;
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <title>{`${post.title} | BUILTECH`}</title>
      <meta name="description" content={post.description} />
      {post.keywords.length > 0 && <meta name="keywords" content={post.keywords.join(", ")} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          url: canonicalUrl,
          mainEntityOfPage: canonicalUrl,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            "@type": "Person",
            name: defaultAuthor.name,
            url: defaultAuthor.url,
            jobTitle: defaultAuthor.role,
          },
          publisher: {
            "@type": "Organization",
            name: "BUILTECH",
            url: "https://bestconstructionapps.com",
            logo: { "@type": "ImageObject", url: "https://bestconstructionapps.com/og-default.png" },
          },
        })}
      </script>

      {/* Header */}
      <div style={{ backgroundColor: "#0c1a2e" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "#64748b" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
          </nav>
          <h1 className="text-3xl font-bold text-white">{post.title}</h1>
          <div className="flex items-center gap-4 mt-3 text-sm" style={{ color: "#94a3b8" }}>
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
          <div className="mt-3">
            <PageByline dateModified={post.date} datePublished={post.date} />
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <article
          className="bg-white rounded-2xl border p-6 sm:p-10 shadow-sm text-[15px] leading-relaxed
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-slate-900
            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:text-slate-900
            [&_p]:mb-4 [&_strong]:font-semibold
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:mb-1
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4
            [&_a]:text-orange-600 [&_a]:underline [&_a]:underline-offset-2
            [&_blockquote]:border-l-4 [&_blockquote]:border-orange-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:mb-4"
          style={{ borderColor: "#e2e8f0", color: "#374151" }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="mt-8">
          <NewsletterSignup />
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4" style={{ color: "#0f172a" }}>More Articles</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="block bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderColor: "#e2e8f0" }}
                >
                  <h3 className="font-semibold text-sm mb-1" style={{ color: "#0f172a" }}>{p.title}</h3>
                  <p className="text-xs" style={{ color: "#64748b" }}>{p.description.slice(0, 120)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
