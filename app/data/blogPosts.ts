/// <reference types="vite/client" />
import { parseFrontmatter, renderMarkdown, readingMinutes } from "../lib/markdown";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date (YYYY-MM-DD)
  keywords: string[];
  html: string;
  minutes: number;
}

// Eagerly load every markdown post at build time (works in both the client
// bundle and the SSR prerender bundle)
const rawPosts = import.meta.glob("../../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const blogPosts: BlogPost[] = Object.entries(rawPosts)
  .map(([path, raw]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const { meta, body } = parseFrontmatter(raw);
    return {
      slug,
      title: meta.title || slug,
      description: meta.description || "",
      date: meta.date || "2026-01-01",
      keywords: meta.keywords ? meta.keywords.split(",").map((k) => k.trim()) : [],
      html: renderMarkdown(body),
      minutes: readingMinutes(body),
    };
  })
  .filter((p) => p.title && p.description)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
