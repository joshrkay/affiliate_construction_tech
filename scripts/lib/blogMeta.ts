/**
 * fs-based blog post metadata loader for build scripts (sitemap, feed,
 * prerender head tags). The app itself loads posts via import.meta.glob in
 * app/data/blogPosts.ts — keep the two in sync via app/lib/markdown.ts.
 */
import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import { parseFrontmatter } from "../../app/lib/markdown";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
}

const BLOG_DIR = resolve(import.meta.dirname, "..", "..", "content", "blog");

export function loadBlogPostMeta(): BlogPostMeta[] {
  return readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = readFileSync(resolve(BLOG_DIR, file), "utf-8");
      const { meta } = parseFrontmatter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: meta.title || "",
        description: meta.description || "",
        date: meta.date || "2026-01-01",
        keywords: meta.keywords ? meta.keywords.split(",").map((k) => k.trim()) : [],
      };
    })
    .filter((p) => p.title && p.description)
    .sort((a, b) => b.date.localeCompare(a.date));
}
