// Schema.org markup for SEO and AI search optimization
// This file generates structured data for all pages

import { tools, trades } from "./constructionData";

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BUILTECH",
  "url": "https://bestconstructionapps.com",
  "description": "The construction industry's leading software directory. Compare 140+ tools rated by real contractors across 15+ trades.",
  "logo": "https://bestconstructionapps.com/logo.png",
  "sameAs": [
    "https://twitter.com/BUILTECH",
    "https://www.linkedin.com/company/bUILTECH",
    "https://www.youtube.com/@BUILTECH",
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@bestconstructionapps.com",
    "contactType": "customer service",
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US",
  },
};

// Website Schema with SearchAction
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "BUILTECH",
  "url": "https://bestconstructionapps.com",
  "description": "The construction industry's AI & software directory. Compare ratings, read reviews, and discover the best tools for your trade.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://bestconstructionapps.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// FAQPage Schema Generator
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Product Schema for Tools
export function generateProductSchema(toolId: string) {
  const tool = tools.find((t) => t.id === toolId);
  if (!tool) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tool.name,
    description: tool.description,
    brand: {
      "@type": "Brand",
      name: tool.name,
    },
    offers: {
      "@type": "Offer",
      price: tool.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating.toString(),
      bestRating: "5",
      worstRating: "1",
      ratingCount: tool.reviewCount.toString(),
    },
  };
}

// Review Schema for Tools
export function generateReviewSchema(toolId: string) {
  const tool = tools.find((t) => t.id === toolId);
  if (!tool) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: tool.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: tool.rating.toString(),
      bestRating: "5",
    },
    author: {
      "@type": "Organization",
      name: "BUILTECH",
    },
    publisher: {
      "@type": "Organization",
      name: "BUILTECH",
    },
  };
}

// BreadcrumbList Schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// HowTo Schema for Guide Pages
export function generateHowToSchema(
  title: string,
  description: string,
  steps: { name: string; text: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description: description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// Article Schema for Blog Posts
export function generateArticleSchema(
  title: string,
  description: string,
  author: string,
  datePublished: string,
  dateModified: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "BUILTECH",
      logo: {
        "@type": "ImageObject",
        url: "https://bestconstructionapps.com/logo.png",
      },
    },
    datePublished: datePublished,
    dateModified: dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://bestconstructionapps.com",
    },
  };
}

// LocalBusiness Schema
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "BUILTECH",
  "description": "Construction software directory and reviews",
  "url": "https://bestconstructionapps.com",
  "areaServed": {
    "@type": "Country",
    name: "United States",
  },
  "serviceType": "Software Reviews",
};

// Course Schema for Educational Content
export function generateCourseSchema(
  title: string,
  description: string,
  provider: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: title,
    description: description,
    provider: {
      "@type": "Organization",
      name: provider,
    },
  };
}

// Export all schemas as JSON-LD string
export function generateSchemaScript(schema: object): string {
  return JSON.stringify(schema, null, 2);
}
