// Pre-defined comparison pages for SEO
// Each comparison targets specific keyword searches

export interface ComparisonPage {
  slug: string;
  title: string;
  description: string;
  tools: [string, string]; // tool IDs
  keywords: string[];
  tradeId?: string;
}

export const comparisonPages: ComparisonPage[] = [
  {
    slug: "procore-vs-servicetitan",
    title: "Procore vs ServiceTitan (2026) – Which is Better for Construction?",
    description: "Comprehensive comparison of Procore vs ServiceTitan for construction companies. Features, pricing, pros, cons, and which trades each tool serves best.",
    tools: ["procore", "servicetitan"],
    keywords: ["procore vs servicetitan", "construction management software comparison", "field service software"],
    tradeId: "general-contracting",
  },
  {
    slug: "procore-vs-jobtread",
    title: "Procore vs JobTread (2026) – Compare Construction Software",
    description: "Side-by-side comparison of Procore vs JobTread. Which construction software is right for your trade business? Features, pricing, and reviews.",
    tools: ["procore", "jobtread"],
    keywords: ["procore vs jobtread", "construction software for contractors", "project management software comparison"],
    tradeId: "general-contracting",
  },
  {
    slug: "servicetitan-vs-jobtread",
    title: "ServiceTitan vs JobTread (2026) – Field Service Software Comparison",
    description: "Compare ServiceTitan vs JobTread for field service management. Which platform offers better dispatch, CRM, and pricing for service contractors?",
    tools: ["servicetitan", "jobtread"],
    keywords: ["servicetitan vs jobtread", "field service management software", "HVAC software comparison"],
    tradeId: "hvac",
  },
  {
    slug: "togal-ai-vs-stack-takeoff",
    title: "Togal.AI vs STACK Takeoff (2026) – AI Estimating Software",
    description: "Compare Togal.AI vs STACK for construction estimating and takeoff. Which AI-powered tool saves more time on quantity takeoff?",
    tools: ["togal-ai", "stack-takeoff"],
    keywords: ["togal ai vs stack", "AI estimating software", "construction takeoff software comparison"],
    tradeId: "estimating-bidding",
  },
  {
    slug: "bluebeam-revu-vs-procore",
    title: "Bluebeam Revu vs Procore (2026) – Document Management",
    description: "Compare Bluebeam Revu vs Procore for construction document management. Which tool is better for markup, RFIs, and submittals?",
    tools: ["bluebeam-revu", "procore"],
    keywords: ["bluebeam vs procore", "construction document management", "RFI tracking software"],
    tradeId: "general-contracting",
  },
  {
    slug: "jobber-vs-servicetitan",
    title: "Jobber vs ServiceTitan (2026) – Home Service Software",
    description: "Compare Jobber vs ServiceTitan for home service businesses. Pricing, features, and which is better for painting, landscaping, and service trades.",
    tools: ["jobber", "servicetitan"],
    keywords: ["jobber vs servicetitan", "home service software", "field service software for contractors"],
    tradeId: "painting-coatings",
  },
  {
    slug: "jobber-vs-jobtread",
    title: "Jobber vs JobTread (2026) – Construction Software Comparison",
    description: "Compare Jobber vs JobTread for construction and service businesses. Which offers better estimating, scheduling, and job costing?",
    tools: ["jobber", "jobtread"],
    keywords: ["jobber vs jobtread", "construction management software", "contractor software comparison"],
  },
  {
    slug: "autodesk-vs-procore",
    title: "Autodesk Construction Cloud vs Procore (2026)",
    description: "Compare Autodesk Construction Cloud vs Procore for construction project management. BIM integration, features, and pricing comparison.",
    tools: ["autodesk-construction-cloud", "procore"],
    keywords: ["autodesk construction cloud vs procore", "construction project management software", "BIM software comparison"],
    tradeId: "general-contracting",
  },
  {
    slug: "togal-ai-vs-esticom",
    title: "Togal.AI vs Esticom (2026) – Electrical Estimating Software",
    description: "Compare Togal.AI vs Esticom for electrical estimating. AI-powered takeoff vs traditional methods – which saves more time?",
    tools: ["togal-ai", "esticom"],
    keywords: ["togal ai vs esticom", "electrical estimating software", "AI takeoff comparison"],
    tradeId: "electrical",
  },
  {
    slug: "aurora-solar-vs-opensolar",
    title: "Aurora Solar vs OpenSolar (2026) – Solar Design Software",
    description: "Compare Aurora Solar vs OpenSolar for solar design and sales. Which platform offers better design tools, pricing, and features?",
    tools: ["aurora-solar", "opensolar"],
    keywords: ["aurora solar vs opensolar", "solar design software", "solar proposal software"],
    tradeId: "solar-renewable",
  },
];

// SEO-friendly "Best X for Y" pages
export interface BestForPage {
  slug: string;
  title: string;
  description: string;
  tradeId: string;
  keywords: string[];
}

export const bestForPages: BestForPage[] = [
  {
    slug: "best-construction-software-general-contractors",
    tradeId: "general-contracting",
    title: "Best Construction Management Software for General Contractors (2026)",
    description: "Top-rated construction management software for general contractors. Compare features, pricing, and reviews to find the right tool for your GC business.",
    keywords: ["best construction management software", "construction software for general contractors", "GC project management"],
  },
  {
    slug: "best-estimating-software-electrical-contractors",
    tradeId: "electrical",
    title: "Best Estimating Software for Electrical Contractors (2026)",
    description: "Top estimating and takeoff software designed for electrical contractors. AI-powered tools, pricing comparisons, and reviews from real electricians.",
    keywords: ["best estimating software for electricians", "electrical contractor software", "electrical takeoff software"],
  },
  {
    slug: "best-software-hvac-contractors",
    tradeId: "hvac",
    title: "Best Software for HVAC Contractors (2026)",
    description: "Top-rated software for HVAC companies – field service management, dispatch, and invoicing tools that actually work for HVAC businesses.",
    keywords: ["best HVAC software", "hvac contractor software", "field service management hvac"],
  },
  {
    slug: "best-software-plumbing-contractors",
    tradeId: "plumbing",
    title: "Best Software for Plumbing Contractors (2026)",
    description: "Compare top plumbing business software – service management, dispatch, invoicing, and job costing tools for plumbing companies.",
    keywords: ["best plumbing software", "plumbing contractor software", "service titan alternatives plumbing"],
  },
  {
    slug: "best-ai-estimating-software",
    tradeId: "estimating-bidding",
    title: "Best AI Estimating Software for Construction (2026)",
    description: "Discover the top AI-powered estimating and takeoff tools that are transforming how contractors bid on projects. Compare features, pricing, and reviews.",
    keywords: ["best AI estimating software", "AI construction takeoff", "automated estimating software"],
  },
  {
    slug: "best-roofing-software",
    tradeId: "roofing",
    title: "Best Roofing Software (2026) – Estimates, CRM, and More",
    description: "Top roofing company software for estimates, CRM, project management, and business management. Compare solutions built for roofers.",
    keywords: ["best roofing software", "roofing contractor software", "roofing business management"],
  },
  {
    slug: "best-landscape-software",
    tradeId: "landscaping-irrigation",
    title: "Best Landscape Business Software (2026)",
    description: "Top-rated landscape management software for landscaping and irrigation companies. Scheduling, CRM, estimating, and business tools.",
    keywords: ["best landscape software", "landscape business software", "lawn care software"],
  },
  {
    slug: "best-solar-software",
    tradeId: "solar-renewable",
    title: "Best Solar Sales & Design Software (2026)",
    description: "Top solar design and proposal software for solar contractors. AI-powered design, sales tools, and project management.",
    keywords: ["best solar software", "solar design software", "solar proposal software"],
  },
];

// Helper functions
export function getComparisonBySlug(slug: string): ComparisonPage | undefined {
  return comparisonPages.find((c) => c.slug === slug);
}

export function getBestForBySlug(slug: string): BestForPage | undefined {
  return bestForPages.find((b) => b.slug === slug);
}
