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
  // Original comparisons
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
  // NEW: More comparison pages
  {
    slug: "procore-vs-buildertrend",
    title: "Procore vs Buildertrend (2026) – Which is Better?",
    description: "Compare Procore vs Buildertrend for construction project management. Features, pricing, pros, cons, and which is better for your size.",
    tools: ["procore", "buildertrend"],
    keywords: ["procore vs buildertrend", "construction software comparison", "project management software"],
    tradeId: "general-contracting",
  },
  {
    slug: "jobtread-vs-knowify",
    title: "JobTread vs Knowify (2026) – Construction Job Costing",
    description: "Compare JobTread vs Knowify for construction job costing, estimating, and project management. Which is better for small contractors?",
    tools: ["jobtread", "knowify"],
    keywords: ["jobtread vs knowify", "construction job costing software", "contractor estimating software"],
    tradeId: "general-contracting",
  },
  {
    slug: "fieldedge-vs-servicetitan",
    title: "FieldEdge vs ServiceTitan (2026) – HVAC Software",
    description: "Compare FieldEdge vs ServiceTitan for HVAC businesses. Pricing, features, dispatch, and which is better for field service.",
    tools: ["fieldedge", "servicetitan"],
    keywords: ["fieldedge vs servicetitan", "HVAC software", "field service management"],
    tradeId: "hvac",
  },
  {
    slug: "stack-vs-esticom",
    title: "STACK Takeoff vs Esticom (2026) – Estimating Software",
    description: "Compare STACK vs Esticom for construction estimating and takeoff. Features, pricing, and which saves more time.",
    tools: ["stack-takeoff", "esticom"],
    keywords: ["stack vs esticom", "construction takeoff software", "estimating software comparison"],
    tradeId: "estimating-bidding",
  },
  {
    slug: "jobber-vs-fieldedge",
    title: "Jobber vs FieldEdge (2026) – Field Service Software",
    description: "Compare Jobber vs FieldEdge for field service businesses. Pricing, features, and which is better for service contractors.",
    tools: ["jobber", "fieldedge"],
    keywords: ["jobber vs fieldedge", "field service software", "service contractor software"],
    tradeId: "hvac",
  },
  {
    slug: "procore-vs-jobber",
    title: "Procore vs Jobber (2026) – Construction vs Service",
    description: "Compare Procore vs Jobber. Which is better – construction project management or field service? Features and pricing comparison.",
    tools: ["procore", "jobber"],
    keywords: ["procore vs jobber", "construction software vs field service", "contractor software"],
    tradeId: "general-contracting",
  },
  {
    slug: "bluebeam-revu-vs-stack",
    title: "Bluebeam Revu vs STACK (2026) – Takeoff & Document Management",
    description: "Compare Bluebeam Revu vs STACK for construction takeoff and document management. Which tool is better for your workflow?",
    tools: ["bluebeam-revu", "stack-takeoff"],
    keywords: ["bluebeam vs stack", "construction takeoff software", "document management comparison"],
    tradeId: "estimating-bidding",
  },
  {
    slug: "knowify-vs-buildertrend",
    title: "Knowify vs Buildertrend (2026) – SMB Construction Software",
    description: "Compare Knowify vs Buildertrend for small to mid-size construction companies. Features, pricing, and which is better.",
    tools: ["knowify", "buildertrend"],
    keywords: ["knowify vs buildertrend", "construction software for small business", "SMB contractor software"],
    tradeId: "general-contracting",
  },
  {
    slug: "togal-ai-vs-b2w",
    title: "Togal.AI vs B2W Estimate (2026) – Heavy Civil Estimating",
    description: "Compare Togal.AI vs B2W Estimate for heavy civil and construction estimating. AI-powered vs traditional – which wins?",
    tools: ["togal-ai", "b2w-estimate"],
    keywords: ["togal ai vs b2w", "heavy civil estimating software", "construction bidding software"],
    tradeId: "estimating-bidding",
  },
  {
    slug: "companycam-vs-procore",
    title: "CompanyCam vs Procore (2026) – Photo Documentation",
    description: "Compare CompanyCam vs Procore for construction photo documentation. Which tool is better for site photos and progress tracking?",
    tools: ["companycam", "procore"],
    keywords: ["companycam vs procore", "construction photo documentation", "site progress photos"],
    tradeId: "general-contracting",
  },
  {
    slug: "versatile-vs-procore",
    title: "Versatile vs Procore (2026) – AI Project Management",
    description: "Compare Versatile vs Procore for construction project management. AI-powered scheduling vs enterprise features.",
    tools: ["versatile", "procore"],
    keywords: ["versatile vs procore", "AI construction software", "project management comparison"],
    tradeId: "general-contracting",
  },
  {
    slug: "alice-vs-versatile",
    title: "ALICE vs Versatile (2026) – AI Scheduling Software",
    description: "Compare ALICE vs Versatile for AI-powered construction scheduling. Which tool saves more time on project planning?",
    tools: ["alice-technologies", "versatile"],
    keywords: ["alice vs versatile", "AI scheduling software", "construction planning AI"],
    tradeId: "general-contracting",
  },
  {
    slug: "jobtread-vs-fieldedge",
    title: "JobTread vs FieldEdge (2026) – Trade Contractor Software",
    description: "Compare JobTread vs FieldEdge for trade contractors. Which offers better features for plumbing, HVAC, and electrical businesses?",
    tools: ["jobtread", "fieldedge"],
    keywords: ["jobtread vs fieldedge", "trade contractor software", "HVAC plumbing software"],
    tradeId: "hvac",
  },
  {
    slug: "lmn-vs-jobber",
    title: "LMN vs Jobber (2026) – Landscape Business Software",
    description: "Compare LMN vs Jobber for landscape businesses. Pricing, features, and which is better for lawn care and landscaping companies.",
    tools: ["lmn-landscape", "jobber"],
    keywords: ["lmn vs jobber", "landscape software", "lawn care business software"],
    tradeId: "landscaping-irrigation",
  },
  {
    slug: "paintscout-vs-jobber",
    title: "PaintScout vs Jobber (2026) – Painting Contractor Software",
    description: "Compare PaintScout vs Jobber for painting contractors. Which software is better for painting business management?",
    tools: ["paintscout", "jobber"],
    keywords: ["paintscout vs jobber", "painting contractor software", "painting business management"],
    tradeId: "painting-coatings",
  },
  {
    slug: "measuresquare-vs-stack",
    title: "MeasureSquare vs STACK (2026) – Flooring Takeoff",
    description: "Compare MeasureSquare vs STACK for flooring and carpet takeoff. Which tool is better for flooring contractors?",
    tools: ["measuresquare", "stack-takeoff"],
    keywords: ["measuresquare vs stack", "flooring takeoff software", "carpet measuring software"],
    tradeId: "flooring",
  },

  // ── General Construction ─────────────────────────────────────────────
  {
    slug: "buildertrend-vs-jobtread",
    title: "Buildertrend vs JobTread (2026) – Residential Construction Software",
    description: "Compare Buildertrend vs JobTread for residential builders and remodelers. Pricing, features, and which platform fits your project volume.",
    tools: ["buildertrend", "jobtread"],
    keywords: ["buildertrend vs jobtread", "residential construction software", "home builder software comparison"],
    tradeId: "general-contracting",
  },
  {
    slug: "procore-vs-monday-construction",
    title: "Procore vs monday.com for Construction (2026)",
    description: "Procore vs monday.com: enterprise construction PM vs flexible work management. Which fits your team's workflow and budget?",
    tools: ["procore", "monday-construction"],
    keywords: ["procore vs monday", "construction project management software", "procore alternative"],
    tradeId: "general-contracting",
  },
  {
    slug: "procore-vs-clickup",
    title: "Procore vs ClickUp for Construction (2026)",
    description: "Compare Procore vs ClickUp for construction project management. When does enterprise construction software beat a flexible PM tool?",
    tools: ["procore", "clickup"],
    keywords: ["procore vs clickup", "construction project management", "procore alternative"],
    tradeId: "general-contracting",
  },
  {
    slug: "buildertrend-vs-monday-construction",
    title: "Buildertrend vs monday.com for Contractors (2026)",
    description: "Compare Buildertrend vs monday.com for residential contractors. Construction-specific platform vs flexible work management tool.",
    tools: ["buildertrend", "monday-construction"],
    keywords: ["buildertrend vs monday", "construction management software", "residential contractor software"],
    tradeId: "general-contracting",
  },
  {
    slug: "procore-vs-touchplan",
    title: "Procore vs Touchplan (2026) – Lean Construction Scheduling",
    description: "Compare Procore vs Touchplan for commercial construction scheduling. Which platform handles lean planning and pull scheduling better?",
    tools: ["procore", "touchplan"],
    keywords: ["procore vs touchplan", "lean construction scheduling", "pull planning software"],
    tradeId: "general-contracting",
  },
  {
    slug: "procore-vs-primavera",
    title: "Procore vs Oracle Primavera P6 (2026) – Enterprise Construction",
    description: "Procore vs Primavera P6: which enterprise construction platform is right for your projects? Honest comparison of scheduling, cost control, and complexity.",
    tools: ["procore", "primavera"],
    keywords: ["procore vs primavera", "primavera p6 alternative", "enterprise construction software"],
    tradeId: "general-contracting",
  },
  {
    slug: "monday-construction-vs-clickup",
    title: "monday.com vs ClickUp for Construction Teams (2026)",
    description: "Compare monday.com vs ClickUp for contractor teams. Both are flexible PM tools — here's which adapts better to construction workflows.",
    tools: ["monday-construction", "clickup"],
    keywords: ["monday vs clickup construction", "construction project management tools", "contractor software comparison"],
    tradeId: "general-contracting",
  },
  {
    slug: "asana-vs-monday-construction",
    title: "Asana vs monday.com for Construction (2026)",
    description: "Asana vs monday.com compared for construction and contractor teams. Which general-purpose PM tool handles job workflows better?",
    tools: ["asana", "monday-construction"],
    keywords: ["asana vs monday construction", "project management for contractors", "construction team software"],
    tradeId: "general-contracting",
  },
  {
    slug: "procore-vs-asana",
    title: "Procore vs Asana for Construction (2026)",
    description: "Procore vs Asana: construction-specific PM vs general task management. Which tool is worth the price difference for your team?",
    tools: ["procore", "asana"],
    keywords: ["procore vs asana", "construction management vs task management", "procore alternative"],
    tradeId: "general-contracting",
  },

  // ── Estimating & Takeoff ─────────────────────────────────────────────
  {
    slug: "procore-vs-stack-takeoff",
    title: "Procore vs STACK Takeoff (2026) – Estimating Comparison",
    description: "Compare Procore vs STACK for construction estimating. Full PM platform vs dedicated digital takeoff tool — which fits your estimating workflow?",
    tools: ["procore", "stack-takeoff"],
    keywords: ["procore vs stack", "construction estimating software", "digital takeoff comparison"],
    tradeId: "estimating-bidding",
  },
  {
    slug: "buildertrend-vs-stack-takeoff",
    title: "Buildertrend vs STACK Takeoff (2026) – Residential Estimating",
    description: "Buildertrend vs STACK for residential estimating. Integrated job management vs dedicated takeoff tool — what residential GCs actually need.",
    tools: ["buildertrend", "stack-takeoff"],
    keywords: ["buildertrend vs stack", "residential estimating software", "construction takeoff tools"],
    tradeId: "estimating-bidding",
  },

  // ── Document Management ──────────────────────────────────────────────
  {
    slug: "procore-vs-plangrid",
    title: "Procore vs PlanGrid (2026) – Construction Document Management",
    description: "Compare Procore vs PlanGrid (now Autodesk) for construction document management. Full PM platform vs dedicated drawing and document tool.",
    tools: ["procore", "plangrid"],
    keywords: ["procore vs plangrid", "construction document management", "drawing management software"],
    tradeId: "general-contracting",
  },
  {
    slug: "bluebeam-revu-vs-plangrid",
    title: "Bluebeam Revu vs PlanGrid (2026) – Construction Document Tools",
    description: "Compare Bluebeam Revu vs PlanGrid for construction document workflows. PDF markup and collaboration vs cloud-based drawing management.",
    tools: ["bluebeam-revu", "plangrid"],
    keywords: ["bluebeam vs plangrid", "construction document software", "pdf markup construction"],
    tradeId: "general-contracting",
  },

  // ── Financial & Accounting ───────────────────────────────────────────
  {
    slug: "procore-vs-quickbooks-construction",
    title: "Procore vs QuickBooks for Contractors (2026)",
    description: "Procore vs QuickBooks for construction financial management. Construction PM platform vs dedicated accounting software — do you need both?",
    tools: ["procore", "quickbooks-construction"],
    keywords: ["procore vs quickbooks", "construction accounting software", "construction financial management"],
    tradeId: "general-contracting",
  },
  {
    slug: "buildertrend-vs-quickbooks-construction",
    title: "Buildertrend vs QuickBooks for Builders (2026)",
    description: "Compare Buildertrend vs QuickBooks for residential builders. When does integrated construction software beat a dedicated accounting tool?",
    tools: ["buildertrend", "quickbooks-construction"],
    keywords: ["buildertrend vs quickbooks", "residential builder accounting", "construction job costing software"],
    tradeId: "general-contracting",
  },
  {
    slug: "quickbooks-construction-vs-zoho-books",
    title: "QuickBooks vs Zoho Books for Contractors (2026)",
    description: "Compare QuickBooks vs Zoho Books for contractor accounting. Which is better for job costing, invoicing, and construction financial reporting?",
    tools: ["quickbooks-construction", "zoho-books"],
    keywords: ["quickbooks vs zoho books contractors", "contractor accounting software", "job costing software comparison"],
    tradeId: "general-contracting",
  },
  {
    slug: "freshbooks-vs-quickbooks-construction",
    title: "FreshBooks vs QuickBooks for Contractors (2026)",
    description: "FreshBooks vs QuickBooks compared for service contractors. Simple invoicing vs full accounting — which fits a 1–10 person contracting business?",
    tools: ["freshbooks", "quickbooks-construction"],
    keywords: ["freshbooks vs quickbooks contractors", "contractor invoicing software", "small contractor accounting"],
    tradeId: "general-contracting",
  },
  {
    slug: "jobber-vs-freshbooks",
    title: "Jobber vs FreshBooks for Service Contractors (2026)",
    description: "Compare Jobber vs FreshBooks for field service businesses. Job management platform vs accounting-first tool — what small service contractors need.",
    tools: ["jobber", "freshbooks"],
    keywords: ["jobber vs freshbooks", "service contractor software", "field service invoicing"],
    tradeId: "general-contracting",
  },

  // ── Field Service ────────────────────────────────────────────────────
  {
    slug: "servicetitan-vs-knowify",
    title: "ServiceTitan vs Knowify (2026) – Trade Contractor Software",
    description: "Compare ServiceTitan vs Knowify for specialty trade contractors. Enterprise field service platform vs mid-market job management tool.",
    tools: ["servicetitan", "knowify"],
    keywords: ["servicetitan vs knowify", "trade contractor software", "specialty contractor management"],
    tradeId: "hvac",
  },
  {
    slug: "jobber-vs-knowify",
    title: "Jobber vs Knowify for Contractors (2026)",
    description: "Compare Jobber vs Knowify for small to mid-size contractors. Which platform handles job management, invoicing, and project tracking better?",
    tools: ["jobber", "knowify"],
    keywords: ["jobber vs knowify", "contractor job management software", "small contractor platform comparison"],
    tradeId: "general-contracting",
  },
  {
    slug: "servicetitan-vs-zoho-books",
    title: "ServiceTitan vs Zoho Books for HVAC & Trade Contractors (2026)",
    description: "ServiceTitan vs Zoho Books: full field service platform vs accounting software for trade contractors. Do you need a dedicated service platform?",
    tools: ["servicetitan", "zoho-books"],
    keywords: ["servicetitan vs zoho", "hvac accounting software", "trade contractor financial software"],
    tradeId: "hvac",
  },

  // ── Scheduling & Planning ────────────────────────────────────────────
  {
    slug: "procore-vs-zoho-projects",
    title: "Procore vs Zoho Projects for Construction (2026)",
    description: "Compare Procore vs Zoho Projects for construction teams. Enterprise construction platform vs affordable general PM tool.",
    tools: ["procore", "zoho-projects"],
    keywords: ["procore vs zoho projects", "construction project management", "affordable procore alternative"],
    tradeId: "general-contracting",
  },
  {
    slug: "touchplan-vs-procore",
    title: "Touchplan vs Procore for Lean Construction (2026)",
    description: "Compare Touchplan vs Procore for lean construction planning. Visual pull planning tool vs full enterprise PM platform — do you need both?",
    tools: ["touchplan", "procore"],
    keywords: ["touchplan vs procore", "lean construction software", "pull planning tools construction"],
    tradeId: "general-contracting",
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
  // Original pages
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
  // NEW: Trade-specific "Best for" pages
  {
    slug: "best-construction-software-small-business",
    tradeId: "general-contracting",
    title: "Best Construction Software for Small Business (2026)",
    description: "Top-rated construction software designed for small contractors and SMBs. Affordable, easy to use, and built for small teams.",
    keywords: ["construction software for small business", "best construction software for small contractors", "affordable construction software"],
  },
  {
    slug: "best-construction-software-enterprise",
    tradeId: "general-contracting",
    title: "Best Enterprise Construction Software (2026)",
    description: "Top construction management platforms for large contractors and enterprise companies. Features, integrations, and pricing.",
    keywords: ["enterprise construction software", "construction software for large contractors", "Procore alternatives enterprise"],
  },
  {
    slug: "best-software-carpenters",
    tradeId: "carpentry-framing",
    title: "Best Software for Carpenters (2026)",
    description: "Top-rated business management software for carpentry and framing contractors. Estimates, job tracking, and invoicing.",
    keywords: ["software for carpenters", "carpentry business software", "framing contractor software"],
  },
  {
    slug: "best-software-concrete-contractors",
    tradeId: "concrete-masonry",
    title: "Best Software for Concrete Contractors (2026)",
    description: "Top construction software for concrete and masonry contractors. Job costing, scheduling, and project management tools.",
    keywords: ["concrete contractor software", "masonry business software", "construction software for concrete"],
  },
  {
    slug: "best-software-painters",
    tradeId: "painting-coatings",
    title: "Best Painting Contractor Software (2026)",
    description: "Top-rated software for painting contractors. Estimate jobs, track time, manage customers, and grow your painting business.",
    keywords: ["painting contractor software", "paint business software", "painting estimate software"],
  },
  {
    slug: "best-software-drywall-contractors",
    tradeId: "drywall-insulation",
    title: "Best Software for Drywall Contractors (2026)",
    description: "Top business management tools for drywall and insulation contractors. Estimate, schedule, and track jobs.",
    keywords: ["drywall contractor software", "insulation business software", "construction software for drywall"],
  },
  {
    slug: "best-software-tile-contractors",
    tradeId: "tile-stone",
    title: "Best Tile & Stone Contractor Software (2026)",
    description: "Top-rated software for tile and stone contractors. Business management, estimates, and project tracking.",
    keywords: ["tile contractor software", "stone installation software", "flooring contractor business software"],
  },
  {
    slug: "best-software-cabinetry",
    tradeId: "cabinetry-countertops",
    title: "Best Software for Cabinetry & Countertops (2026)",
    description: "Top business software for cabinet makers and countertop installers. Design, estimate, and manage your shop.",
    keywords: ["cabinetry software", "countertop business software", "custom cabinet software"],
  },
  {
    slug: "best-software-windows-doors",
    tradeId: "windows-doors",
    title: "Best Software for Window & Door Contractors (2026)",
    description: "Top-rated software for window and door installation contractors. CRM, estimates, and project management.",
    keywords: ["window installation software", "door contractor software", "window business management"],
  },
  {
    slug: "best-software-excavation",
    tradeId: "general-contracting",
    title: "Best Excavation & Grading Software (2026)",
    description: "Top construction software for excavation and grading contractors. Equipment tracking, job costing, and estimates.",
    keywords: ["excavation software", "grading contractor software", "earthwork business software"],
  },
  {
    slug: "best-field-service-software",
    tradeId: "hvac",
    title: "Best Field Service Management Software (2026)",
    description: "Top-rated field service management software for trade contractors. Dispatch, scheduling, invoicing, and customer management.",
    keywords: ["field service management software", "FSM software", "trade service software"],
  },
  {
    slug: "best-construction-crm",
    tradeId: "general-contracting",
    title: "Best Construction CRM Software (2026)",
    description: "Top customer relationship management tools for construction companies. Lead tracking, proposals, and client management.",
    keywords: ["construction CRM", "CRM for contractors", "lead management construction"],
  },
  {
    slug: "best-construction-accounting-software",
    tradeId: "general-contracting",
    title: "Best Construction Accounting Software (2026)",
    description: "Top accounting and job costing software for contractors. Financial management, invoicing, and payroll.",
    keywords: ["construction accounting software", "contractor accounting", "job costing software"],
  },
  {
    slug: "best-construction-scheduling-software",
    tradeId: "general-contracting",
    title: "Best Construction Scheduling Software (2026)",
    description: "Top scheduling and project planning tools for construction. Gantt charts, resource planning, and crew management.",
    keywords: ["construction scheduling software", "project scheduling for contractors", "crew scheduling software"],
  },
  {
    slug: "best-construction-document-management",
    tradeId: "general-contracting",
    title: "Best Construction Document Management (2026)",
    description: "Top document management and RFI tracking tools for construction. Submittals, blueprints, and project docs.",
    keywords: ["construction document management", "RFI tracking software", "construction PDF management"],
  },
  {
    slug: "best-construction-photo-documentation",
    tradeId: "general-contracting",
    title: "Best Construction Photo Documentation (2026)",
    description: "Top site photo and progress documentation tools for construction. Daily logs, markup, and team sharing.",
    keywords: ["construction photo software", "site documentation", "daily log photos construction"],
  },
  {
    slug: "best-takeoff-software",
    tradeId: "estimating-bidding",
    title: "Best Construction Takeoff Software (2026)",
    description: "Top digital takeoff tools for contractors. Electronic plan viewing, measurement, and quantity extraction.",
    keywords: ["construction takeoff software", "digital takeoff", "plan measuring software"],
  },
  {
    slug: "best-hvac-estimating-software",
    tradeId: "hvac",
    title: "Best HVAC Estimating Software (2026)",
    description: "Top estimating and bidding tools for HVAC contractors. Fast, accurate proposals and pricing.",
    keywords: ["HVAC estimating software", "HVAC bidding", "mechanical estimating"],
  },
  {
    slug: "best-electrical-estimating-software",
    tradeId: "electrical",
    title: "Best Electrical Estimating Software (2026)",
    description: "Top estimating tools for electrical contractors. Fast takeoffs, accurate bids, and labor pricing.",
    keywords: ["electrical estimating software", "electrical bidding", "electrical contractor estimates"],
  },
  {
    slug: "best-plumbing-estimating-software",
    tradeId: "plumbing",
    title: "Best Plumbing Estimating Software (2026)",
    description: "Top estimating and takeoff tools for plumbing contractors. Accurate bids, fast estimates.",
    keywords: ["plumbing estimating software", "plumbing bidding", "mechanical contractor software"],
  },
  {
    slug: "best-roofing-estimating-software",
    tradeId: "roofing",
    title: "Best Roofing Estimating Software (2026)",
    description: "Top takeoff and estimating tools for roofing contractors. Measure roofs, calculate materials, bid faster.",
    keywords: ["roofing estimating software", "roofing takeoff", "roof bidding software"],
  },
  {
    slug: "best-flooring-estimating-software",
    tradeId: "flooring",
    title: "Best Flooring Estimating Software (2026)",
    description: "Top takeoff and estimating tools for flooring contractors. Measure areas, calculate materials, win more bids.",
    keywords: ["flooring estimating software", "flooring takeoff", "carpet measuring software"],
  },
];

// Helper functions
export function getComparisonBySlug(slug: string): ComparisonPage | undefined {
  return comparisonPages.find((c) => c.slug === slug);
}

export function getBestForBySlug(slug: string): BestForPage | undefined {
  return bestForPages.find((b) => b.slug === slug);
}
