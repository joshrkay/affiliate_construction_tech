/**
 * Site update log — powers /updates. Add an entry whenever content is added,
 * refreshed, or corrected so readers (and crawlers) can see the site is
 * actively maintained. Newest first.
 */
export interface SiteUpdate {
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
}

export const siteUpdates: SiteUpdate[] = [
  {
    date: "2026-07-12",
    title: "Construction Software Pricing Index launched",
    description:
      "Every tool in the directory now has a dedicated pricing page, and the new Pricing Index puts all starting prices and pricing models in one comparable table.",
    link: "/pricing",
    linkLabel: "Browse the Pricing Index",
  },
  {
    date: "2026-07-12",
    title: "Free cost calculator launched",
    description:
      "Estimate what construction software will actually cost your team per month and per year, based on real list prices and your team size.",
    link: "/cost-calculator",
    linkLabel: "Try the calculator",
  },
  {
    date: "2026-07-12",
    title: "16 in-depth comparisons now fully readable",
    description:
      "Editorial comparisons including ServiceTitan vs Housecall Pro and Jobber vs Housecall Pro previously failed to display their full analysis. All 23 in-depth comparisons now show the complete head-to-head tables, deep-dive sections, verdicts, and FAQs.",
    link: "/compare/servicetitan-vs-housecallpro",
    linkLabel: "ServiceTitan vs Housecall Pro",
  },
  {
    date: "2026-07-12",
    title: "BUILTECH blog launched",
    description:
      "Practical articles on construction software, pricing, and buying decisions — starting with our 2026 guide to the best construction software by category, trade, and company size.",
    link: "/blog",
    linkLabel: "Read the blog",
  },
];
