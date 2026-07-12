import { marked } from "marked";

/**
 * Minimal YAML-ish frontmatter parser (string key: value pairs only).
 * Shared by the app (via import.meta.glob) and build scripts (via fs).
 */
export interface Frontmatter {
  [key: string]: string;
}

export function parseFrontmatter(raw: string): { meta: Frontmatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { meta: {}, body: raw };
  const meta: Frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    if (key) meta[key] = value;
  }
  return { meta, body: raw.slice(match[0].length) };
}

export function renderMarkdown(body: string): string {
  return marked.parse(body, { async: false }) as string;
}

export function readingMinutes(body: string): number {
  return Math.max(1, Math.round(body.split(/\s+/).length / 225));
}
