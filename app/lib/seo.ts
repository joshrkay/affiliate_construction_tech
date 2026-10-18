/**
 * Keeps data-driven titles inside the ~60-character SERP window.
 * "ServiceTitan vs JobTread (2026) – Field Service Software Comparison"
 * becomes "ServiceTitan vs JobTread (2026)" only when the full title is too long.
 */
export function shortTitle(title: string, max = 65): string {
  const t = title.trim();
  if (t.length <= max) return t;
  const m = t.match(/^(.*?\(\d{4}\))\s*[:–—-]\s*.+$/);
  if (m && m[1].length <= max) return m[1];
  const colon = t.indexOf(": ");
  if (colon > 20 && colon <= max) return t.slice(0, colon);
  return t;
}
