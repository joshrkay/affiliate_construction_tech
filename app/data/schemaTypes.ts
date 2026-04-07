/**
 * Schema Types for Affiliate SEO System
 *
 * TypeScript interfaces for category pages, comparison features, and content structures
 * These are fully compatible with the existing constructionData schema
 */

/**
 * Category Page - The main content structure for each category landing page
 * Holds all content, metadata, and configuration for a single category page
 *
 * Supports bilingual content (English + Spanish)
 */
export interface CategoryPage {
  slug: string
  categoryId: string                   // Reference to Category in categoryTaxonomy
  language: 'en' | 'es'               // Language version
  title: string                        // SEO title (target 50-60 characters)
  metaDescription: string              // SEO description (target 150-160 characters)
  h1: string                           // Page heading
  introduction: string                 // Lead paragraph (SEO-optimized)
  whyItMatters?: string                // Why this category matters (business impact)

  // Dynamic comparison configuration
  toolsToCompare: string[]             // Tool IDs most relevant to this category (2-5 recommended)
  comparisonTableColumns: {
    key: string
    label: string
  }[]

  // Content sections (flexible structure for various content types)
  sections: {
    heading: string
    content: string                    // Can be markdown or HTML
    type?: 'text' | 'highlight' | 'warning'
  }[]

  // Call-to-action and monetization
  primaryCTA: string                   // e.g., "Get started with [Tool]"
  primaryToolId?: string               // Which tool gets top CTA placement
  secondaryToolIds?: string[]          // Additional tool CTAs (2-3)

  // SEO and metadata
  keywords: string[]                   // Primary + secondary target keywords
  canonicalUrl?: string                // If different from default
  lastUpdated: string                  // ISO 8601 date

  // FAQ structured content (for rich snippets)
  faqs?: {
    question: string
    answer: string
  }[]

  // Related content links
  relatedCategories?: string[]         // Category IDs for cross-linking
  relatedTools?: string[]              // Tool IDs for internal linking

  // Publishing status
  published: boolean
  featured?: boolean                   // Featured on homepage or category listings
}

/**
 * Category Comparison Features
 * Defines the feature matrix for comparing tools within a category
 */
export interface CategoryComparisonFeatures {
  categoryId: string
  featureGroups: {
    groupLabel: string                 // e.g., "Scheduling", "Financial", "Field Operations"
    features: {
      key: string                      // Unique identifier for this feature
      label: string                    // Display name
      description?: string             // Tooltip/help text
    }[]
  }[]
}

/**
 * Category SEO Metadata
 * Additional SEO-specific metadata for structured data and optimization
 */
export interface CategorySEOMetadata {
  categoryId: string
  keywords: {
    primary: string                    // Main keyword to target
    secondary: string[]                // Long-tail and LSI keywords
    searchVolume?: number
    difficulty?: number                // 1-100 SEO difficulty
  }
  schema: {
    type: 'article' | 'comparison' | 'guide'
    author?: string
    datePublished: string
    dateModified: string
    inLanguage: string
  }
  internalLinks: {
    text: string
    url: string
    type: 'related-category' | 'tool' | 'guide'
  }[]
}

/**
 * Tool Comparison Group
 * Maps tools and features for display in comparison tables
 */
export interface ToolComparisonRow {
  toolId: string
  features: Record<string, boolean | string>  // key -> feature value
}

/**
 * Category Content Template
 * Reusable template structure for consistent category pages
 */
export interface CategoryContentTemplate {
  id: string
  name: string                         // Template name
  description: string
  sections: {
    heading: string
    content: string
    order: number
  }[]
  faqs: {
    question: string
    answer: string
  }[]
}

/**
 * Category Page Request
 * Input structure for generating/updating category pages
 */
export interface CategoryPageRequest {
  categoryId: string
  toolIds: string[]
  contentTemplate?: string             // Template ID to use
  includeComparison?: boolean
  includeFAQ?: boolean
}

/**
 * Category Page Response
 * Output structure after processing/generation
 */
export interface CategoryPageResponse {
  success: boolean
  categoryPage?: CategoryPage
  error?: string
  generatedAt: string
}

/**
 * Best-For Page
 * Specific page type: "Best [Tool] for [Category]"
 */
export interface BestForPage {
  slug: string
  categoryId: string
  toolId: string
  title: string                        // e.g., "Best Procore for Project Managers"
  metaDescription: string
  h1: string
  introduction: string
  keyPoints: string[]                  // Why this tool is best
  useCases: string[]                   // Specific use cases
  alternativeTools?: string[]          // Runner-up tools
  sections: {
    heading: string
    content: string
  }[]
  faqs?: {
    question: string
    answer: string
  }[]
  published: boolean
  lastUpdated: string
}

/**
 * Comparison Page
 * Specific page type: "[Tool A] vs [Tool B]"
 */
export interface ComparisonDetailPage {
  slug: string
  toolId1: string
  toolId2: string
  title: string                        // e.g., "Procore vs Buildertrend"
  metaDescription: string
  h1: string
  introduction: string
  // Head-to-head comparison
  comparisonTable: {
    category: string
    rows: {
      label: string
      tool1: string | boolean
      tool2: string | boolean
    }[]
  }[]
  // Detailed sections
  sections: {
    heading: string
    content: string
  }[]
  verdict?: {
    bestFor: string
    recommendation: string
  }
  faqs?: {
    question: string
    answer: string
  }[]
  published: boolean
  lastUpdated: string
}

/**
 * SEO Metadata for JSON-LD Structured Data
 */
export interface SEOSchema {
  '@context': 'https://schema.org'
  '@type': 'Article' | 'ComparisonChart' | 'FAQPage' | 'BreadcrumbList'
  headline: string
  description: string
  image?: string
  datePublished: string
  dateModified: string
  author?: {
    '@type': 'Organization'
    name: string
  }
  mainEntity?: {
    '@type': string
    name: string
  }
  [key: string]: any  // Allow additional properties per schema type
}

/**
 * Content Generation Input
 * Structure for prompts to generate content
 */
export interface ContentGenerationInput {
  categoryId: string
  categoryName: string
  toolIds: string[]
  toolNames: string[]
  keywords: string[]
  toneOfVoice?: 'professional' | 'conversational' | 'expert'
  contentType: 'description' | 'introduction' | 'comparison' | 'faq'
}

/**
 * Content Generation Output
 */
export interface ContentGenerationOutput {
  categoryId: string
  contentType: string
  content: string
  keywords: string[]
  estimatedReadingTime?: number
  quality?: 'draft' | 'review' | 'approved'
}

/**
 * Analytics Metadata
 * Track performance of category pages
 */
export interface CategoryPageAnalytics {
  categoryId: string
  slug: string
  views: number
  uniqueVisitors: number
  bounceRate: number
  avgTimeOnPage: number
  ctaClickThrough: number
  affiliateLinkClicks: Record<string, number>  // toolId -> clicks
  period: {
    startDate: string
    endDate: string
  }
}

/**
 * Batch Operations
 * For bulk updates/generation
 */
export interface CategoryPageBatch {
  action: 'create' | 'update' | 'publish' | 'archive'
  categoryIds: string[]
  template?: string
  metadata?: Record<string, any>
}

export interface BatchOperationResult {
  action: string
  totalProcessed: number
  successful: number
  failed: number
  errors?: string[]
  completedAt: string
}

/**
 * Helper function to create default CategoryPage
 */
export function createDefaultCategoryPage(
  categoryId: string,
  slug: string,
  title: string,
  metaDescription: string,
  toolIds: string[] = []
): CategoryPage {
  return {
    slug,
    categoryId,
    title,
    metaDescription,
    h1: title,
    introduction: '',
    toolsToCompare: toolIds.slice(0, 4),
    comparisonTableColumns: [],
    sections: [],
    primaryCTA: 'Learn More',
    keywords: [],
    lastUpdated: new Date().toISOString(),
    published: false,
    featured: false
  }
}

/**
 * Helper function to create default SEO Schema
 */
export function createDefaultSEOSchema(
  title: string,
  description: string,
  type: 'Article' | 'ComparisonChart' | 'FAQPage' = 'Article'
): SEOSchema {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    headline: title,
    description: description,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Affiliate Construction Tech'
    }
  }
}
