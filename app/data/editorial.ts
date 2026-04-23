// Central source of truth for editorial attribution, dates, and author metadata.
// Update author entries here when real contributors are added.

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  url: string;
}

export const authors: Record<string, Author> = {
  "builtech-editorial": {
    id: "builtech-editorial",
    name: "BUILTECH Editorial Team",
    role: "Construction Technology Research",
    bio: "The BUILTECH editorial team reviews construction software and AI tools using aggregated contractor ratings from public review platforms, direct vendor research, and hands-on product evaluation. Ratings reflect weighted averages across G2, Capterra, Software Advice, and direct contractor submissions.",
    url: "https://bestconstructionapps.com/about",
  },
};

export const defaultAuthor = authors["builtech-editorial"];

// Default publication + modification dates used when a page has no specific dates.
// Keep `datePublished` stable across redeploys; bump `dateModified` when content changes.
export const defaultDatePublished = "2026-03-11";
export const defaultDateModified = new Date().toISOString().slice(0, 10);

export function authorSchema(author: Author = defaultAuthor) {
  return {
    "@type": "Person",
    name: author.name,
    url: author.url,
    jobTitle: author.role,
  };
}

export function publisherSchema() {
  return {
    "@type": "Organization",
    name: "BUILTECH",
    url: "https://bestconstructionapps.com",
    logo: {
      "@type": "ImageObject",
      url: "https://bestconstructionapps.com/og-default.png",
    },
  };
}
