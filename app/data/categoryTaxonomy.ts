/**
 * Category Taxonomy for Affiliate SEO System
 *
 * ~50 constructor job categories mapped to search intent and affiliate opportunities
 * These are NOT product categories, but rather job functions that contractors search for
 *
 * Example: "field-crew-scheduling" targets someone searching "best software for scheduling crews"
 * not just "scheduling tools" (which is product-focused, not intent-focused)
 */

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  primaryKeyword: string          // Main SEO target keyword
  relatedKeywords: string[]       // LSI/related keywords to target
  toolTypes: string[]             // What kind of tools belong here
  affiliateIntentLevel: 'high' | 'medium' | 'low'  // How monetizable
  monthlySearchVolume?: number    // Optional: for prioritization
  relatedCategoryIds?: string[]   // Cross-linking within categories
}

export const categories: Category[] = [
  // ========== PROJECT MANAGEMENT & PLANNING ==========
  {
    id: 'project-estimating',
    slug: 'project-estimating',
    name: 'Project Estimating & Bidding',
    description: 'Software for contractors to estimate project costs, create bids, and manage labor estimates',
    primaryKeyword: 'construction estimating software',
    relatedKeywords: ['bidding software for contractors', 'takeoff software', 'labor estimating tools', 'free construction estimating software'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 2400,
    relatedCategoryIds: ['project-scheduling', 'cost-tracking']
  },
  {
    id: 'project-scheduling',
    slug: 'project-scheduling',
    name: 'Project Scheduling & Timeline Management',
    description: 'Tools for creating project timelines, managing dependencies, and tracking milestones',
    primaryKeyword: 'construction project scheduling software',
    relatedKeywords: ['project timeline software', 'critical path method', 'gantt chart for construction', 'project management timeline'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 1800,
    relatedCategoryIds: ['project-estimating', 'field-crew-scheduling']
  },
  {
    id: 'project-budget-tracking',
    slug: 'project-budget-tracking',
    name: 'Project Budget Tracking & Cost Control',
    description: 'Monitor project budgets, track expenses, and manage cost overruns in real-time',
    primaryKeyword: 'construction project budget tracking software',
    relatedKeywords: ['construction cost control', 'budget management for contractors', 'expense tracking construction', 'project profitability tracking'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 1600,
    relatedCategoryIds: ['project-estimating', 'financial-management']
  },
  {
    id: 'project-document-management',
    slug: 'project-document-management',
    name: 'Project Document Management & Central Repository',
    description: 'Store, organize, and share blueprints, specs, permits, and project documents',
    primaryKeyword: 'construction document management system',
    relatedKeywords: ['blueprint management software', 'spec management', 'permit tracking software', 'construction document storage'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 1200,
    relatedCategoryIds: ['photo-documentation', 'client-communication']
  },

  // ========== FIELD & CREW MANAGEMENT ==========
  {
    id: 'field-crew-scheduling',
    slug: 'field-crew-scheduling',
    name: 'Field Crew Scheduling & Dispatch',
    description: 'Assign crews to jobs, manage job sites, and track worker locations',
    primaryKeyword: 'construction crew scheduling software',
    relatedKeywords: ['field management software', 'job site dispatch app', 'crew management software', 'mobile crew scheduling'],
    toolTypes: ['Software', 'Platform', 'AI Agent'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 2200,
    relatedCategoryIds: ['field-time-tracking', 'project-scheduling']
  },
  {
    id: 'field-time-tracking',
    slug: 'field-time-tracking',
    name: 'Field Time Tracking & Labor Tracking',
    description: 'Track worker hours, job time allocation, and labor costs in the field',
    primaryKeyword: 'construction time tracking software',
    relatedKeywords: ['worker time clock app', 'labor cost tracking', 'job costing software', 'field time sheets'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 1900,
    relatedCategoryIds: ['field-crew-scheduling', 'payroll-management']
  },
  {
    id: 'photo-documentation',
    slug: 'photo-documentation',
    name: 'Photo Documentation & Site Progress Tracking',
    description: 'Capture, organize, and share job site photos with GPS, timestamps, and annotations',
    primaryKeyword: 'construction photo documentation software',
    relatedKeywords: ['job site photo app', 'progress photos software', 'photo management construction', 'site documentation app'],
    toolTypes: ['Software', 'Platform', 'AI Agent'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 1400,
    relatedCategoryIds: ['quality-assurance', 'project-document-management']
  },
  {
    id: 'equipment-inventory',
    slug: 'equipment-inventory',
    name: 'Equipment & Tool Inventory Management',
    description: 'Track tools, equipment, and assets across multiple job sites and warehouses',
    primaryKeyword: 'construction equipment tracking software',
    relatedKeywords: ['tool inventory management', 'equipment management for contractors', 'asset tracking construction', 'tool tracking app'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 980,
    relatedCategoryIds: ['supply-chain-management']
  },
  {
    id: 'quality-assurance',
    slug: 'quality-assurance',
    name: 'Quality Assurance & Site Inspections',
    description: 'Conduct inspections, track defects, create punch lists, and ensure quality standards',
    primaryKeyword: 'construction quality assurance software',
    relatedKeywords: ['punch list software', 'defect tracking', 'site inspection app', 'QA checklist construction'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 890,
    relatedCategoryIds: ['photo-documentation']
  },

  // ========== COMMUNICATION & COORDINATION ==========
  {
    id: 'client-communication',
    slug: 'client-communication',
    name: 'Client Communication & Project Updates',
    description: 'Send automated updates, progress reports, and photos to clients',
    primaryKeyword: 'construction client communication software',
    relatedKeywords: ['project update app for clients', 'customer portal construction', 'construction progress notifications', 'homeowner communication tool'],
    toolTypes: ['Software', 'Platform', 'AI Agent'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 1100,
    relatedCategoryIds: ['photo-documentation']
  },
  {
    id: 'team-collaboration',
    slug: 'team-collaboration',
    name: 'Team Collaboration & Internal Communication',
    description: 'Chat, messaging, and collaboration tools for construction teams',
    primaryKeyword: 'construction team collaboration software',
    relatedKeywords: ['construction messaging app', 'team communication platform', 'site communication tool'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'low',
    monthlySearchVolume: 750,
    relatedCategoryIds: []
  },
  {
    id: 'safety-compliance-communication',
    slug: 'safety-compliance-communication',
    name: 'Safety Briefings & Compliance Communication',
    description: 'Distribute safety briefs, incident reports, and compliance documentation',
    primaryKeyword: 'construction safety management software',
    relatedKeywords: ['OSHA compliance software', 'incident reporting construction', 'safety training app', 'hazard communication tool'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 1200,
    relatedCategoryIds: ['quality-assurance']
  },

  // ========== FINANCIAL & ADMIN ==========
  {
    id: 'customer-invoicing',
    slug: 'customer-invoicing',
    name: 'Customer Invoicing & Billing',
    description: 'Create and send invoices, track payments, and manage billing cycles',
    primaryKeyword: 'construction invoicing software',
    relatedKeywords: ['contractor billing software', 'project invoicing app', 'payment tracking construction', 'progress billing software'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 2100,
    relatedCategoryIds: ['financial-management', 'customer-payment-collection']
  },
  {
    id: 'customer-payment-collection',
    slug: 'customer-payment-collection',
    name: 'Customer Payment Collection & Processing',
    description: 'Accept payments online, process credit cards, and reconcile payments',
    primaryKeyword: 'construction payment processing software',
    relatedKeywords: ['contractor payment app', 'online payment collection', 'merchant services construction', 'payment gateway contractors'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 1700,
    relatedCategoryIds: ['customer-invoicing', 'financial-management']
  },
  {
    id: 'financial-management',
    slug: 'financial-management',
    name: 'Business Financial Management & Accounting',
    description: 'Manage general ledger, cash flow, P&L, and financial reporting',
    primaryKeyword: 'construction accounting software',
    relatedKeywords: ['construction bookkeeping software', 'contractor accounting app', 'financial reporting construction', 'job costing accounting'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 2300,
    relatedCategoryIds: ['customer-invoicing', 'project-budget-tracking']
  },
  {
    id: 'payroll-management',
    slug: 'payroll-management',
    name: 'Payroll & Employee Management',
    description: 'Process payroll, manage benefits, track labor compliance, and HR administration',
    primaryKeyword: 'construction payroll software',
    relatedKeywords: ['contractor payroll app', 'construction HR software', 'employee time tracking', 'prevailing wage compliance'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 1900,
    relatedCategoryIds: ['field-time-tracking']
  },
  {
    id: 'insurance-safety-compliance',
    slug: 'insurance-safety-compliance',
    name: 'Insurance Management & Safety Compliance',
    description: 'Track insurance, manage certifications, and ensure compliance reporting',
    primaryKeyword: 'construction safety compliance software',
    relatedKeywords: ['OSHA tracking software', 'worker certification management', 'insurance documentation', 'compliance documentation app'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 1100,
    relatedCategoryIds: ['safety-compliance-communication']
  },
  {
    id: 'tax-reporting',
    slug: 'tax-reporting',
    name: 'Tax Reporting & Deduction Tracking',
    description: 'Track deductible expenses, manage tax documents, and prepare tax reports',
    primaryKeyword: 'construction tax software',
    relatedKeywords: ['contractor tax app', 'self-employed tax software', 'deduction tracker construction', 'construction tax preparation'],
    toolTypes: ['Software'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 1200,
    relatedCategoryIds: ['financial-management']
  },

  // ========== SUPPLY CHAIN & PROCUREMENT ==========
  {
    id: 'supply-chain-management',
    slug: 'supply-chain-management',
    name: 'Supply Chain & Procurement Management',
    description: 'Manage suppliers, purchase orders, deliveries, and inventory',
    primaryKeyword: 'construction supply chain software',
    relatedKeywords: ['purchase order software', 'vendor management construction', 'material procurement app', 'supply ordering system'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 980,
    relatedCategoryIds: ['equipment-inventory']
  },
  {
    id: 'material-takeoff',
    slug: 'material-takeoff',
    name: 'Material Takeoff & Quantity Estimation',
    description: 'Extract quantities from plans and specifications for accurate material ordering',
    primaryKeyword: 'construction material takeoff software',
    relatedKeywords: ['digital takeoff software', 'blueprint quantity estimation', 'takeoff app construction'],
    toolTypes: ['Software'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 740,
    relatedCategoryIds: ['project-estimating']
  },

  // ========== SPECIALIZED CONSTRUCTION OPERATIONS ==========
  {
    id: 'change-order-management',
    slug: 'change-order-management',
    name: 'Change Order Management & Tracking',
    description: 'Create, approve, and track change orders and scope changes',
    primaryKeyword: 'construction change order software',
    relatedKeywords: ['change order app', 'scope change management', 'change order tracking'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 1100,
    relatedCategoryIds: ['project-estimating', 'project-budget-tracking']
  },
  {
    id: 'lien-and-contract-management',
    slug: 'lien-and-contract-management',
    name: 'Lien Management & Legal Documentation',
    description: 'Create mechanic\'s liens, legal documents, and manage contract compliance',
    primaryKeyword: 'construction lien software',
    relatedKeywords: ['mechanics lien filing', 'legal document management construction', 'contract template construction'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 890,
    relatedCategoryIds: ['financial-management']
  },
  {
    id: 'contractor-licensing-credentials',
    slug: 'contractor-licensing-credentials',
    name: 'Contractor Licensing & Credentials Management',
    description: 'Track licenses, certifications, and credentials for employees and subcontractors',
    primaryKeyword: 'construction licensing software',
    relatedKeywords: ['contractor credential tracking', 'license management app', 'certification tracking construction'],
    toolTypes: ['Software'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 750,
    relatedCategoryIds: ['insurance-safety-compliance']
  },
  {
    id: 'bid-management',
    slug: 'bid-management',
    name: 'Bid Management & RFQ Processing',
    description: 'Manage incoming bids, send RFQs to vendors, and compare quotes',
    primaryKeyword: 'construction bid management software',
    relatedKeywords: ['RFQ software construction', 'quote comparison tool', 'bid tracking app'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 1000,
    relatedCategoryIds: ['supply-chain-management', 'project-estimating']
  },

  // ========== REPORTING & ANALYTICS ==========
  {
    id: 'business-analytics-reporting',
    slug: 'business-analytics-reporting',
    name: 'Business Analytics & Performance Reporting',
    description: 'Create dashboards, KPI reports, and business intelligence insights',
    primaryKeyword: 'construction business analytics software',
    relatedKeywords: ['construction reporting dashboard', 'KPI tracking construction', 'business intelligence tool contractors'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'low',
    monthlySearchVolume: 650,
    relatedCategoryIds: []
  },
  {
    id: 'job-profitability-analysis',
    slug: 'job-profitability-analysis',
    name: 'Job Profitability & Performance Analysis',
    description: 'Analyze profitability by job, track actual vs. budget, and identify trends',
    primaryKeyword: 'construction profitability analysis software',
    relatedKeywords: ['job profitability tracking', 'performance analysis construction', 'job margin analysis'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 1300,
    relatedCategoryIds: ['financial-management', 'project-budget-tracking']
  },

  // ========== CUSTOMER RELATIONSHIP MANAGEMENT ==========
  {
    id: 'customer-relationship-management',
    slug: 'customer-relationship-management',
    name: 'Customer Relationship Management (CRM)',
    description: 'Manage customer contacts, interactions, sales pipeline, and lead follow-up',
    primaryKeyword: 'construction CRM software',
    relatedKeywords: ['contractor CRM', 'construction sales pipeline software', 'lead management construction', 'customer database app'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 2000,
    relatedCategoryIds: ['sales-lead-generation']
  },
  {
    id: 'sales-lead-generation',
    slug: 'sales-lead-generation',
    name: 'Sales Lead Generation & Prospecting',
    description: 'Find new leads, manage prospect lists, and track sales activities',
    primaryKeyword: 'construction lead generation software',
    relatedKeywords: ['homeowner leads software', 'sales prospecting app', 'lead tracking construction'],
    toolTypes: ['Software', 'Platform', 'AI Agent'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 1600,
    relatedCategoryIds: ['customer-relationship-management']
  },
  {
    id: 'customer-retention-retention',
    slug: 'customer-retention-retention',
    name: 'Customer Retention & Follow-Up',
    description: 'Automate follow-ups, manage repeat jobs, and improve customer retention',
    primaryKeyword: 'construction customer retention software',
    relatedKeywords: ['repeat customer management', 'customer follow-up automation', 'retention automation construction'],
    toolTypes: ['Software', 'Platform', 'AI Agent'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 890,
    relatedCategoryIds: ['customer-relationship-management']
  },

  // ========== ESTIMATING & BIDDING SPECIALIZATIONS ==========
  {
    id: 'residential-estimating',
    slug: 'residential-estimating',
    name: 'Residential Project Estimating',
    description: 'Estimating tools built for residential contractors and remodeling',
    primaryKeyword: 'residential construction estimating software',
    relatedKeywords: ['remodel estimating software', 'residential takeoff app', 'home construction estimating'],
    toolTypes: ['Software'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 1400,
    relatedCategoryIds: ['project-estimating']
  },
  {
    id: 'commercial-estimating',
    slug: 'commercial-estimating',
    name: 'Commercial Project Estimating',
    description: 'Estimating tools built for commercial contractors and large projects',
    primaryKeyword: 'commercial construction estimating software',
    relatedKeywords: ['commercial bid software', 'large project estimating', 'commercial takeoff tool'],
    toolTypes: ['Software'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 1100,
    relatedCategoryIds: ['project-estimating']
  },

  // ========== SPECIALIZED TRADES & NICHES ==========
  {
    id: 'hvac-management',
    slug: 'hvac-management',
    name: 'HVAC Business Management Software',
    description: 'All-in-one software built specifically for HVAC contractors',
    primaryKeyword: 'HVAC business management software',
    relatedKeywords: ['HVAC service software', 'HVAC job management app', 'HVAC contractor software'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 1600,
    relatedCategoryIds: []
  },
  {
    id: 'plumbing-management',
    slug: 'plumbing-management',
    name: 'Plumbing Business Management Software',
    description: 'All-in-one software built specifically for plumbing contractors',
    primaryKeyword: 'plumbing business management software',
    relatedKeywords: ['plumber software', 'plumbing job scheduling app', 'plumbing contractor software'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 1500,
    relatedCategoryIds: []
  },
  {
    id: 'electrical-management',
    slug: 'electrical-management',
    name: 'Electrical Business Management Software',
    description: 'All-in-one software built specifically for electrical contractors',
    primaryKeyword: 'electrical business management software',
    relatedKeywords: ['electrician software', 'electrical job scheduling app', 'electrical contractor software'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 1400,
    relatedCategoryIds: []
  },
  {
    id: 'landscape-management',
    slug: 'landscape-management',
    name: 'Landscape & Grounds Management Software',
    description: 'All-in-one software built specifically for landscaping and grounds contractors',
    primaryKeyword: 'landscape business management software',
    relatedKeywords: ['landscaping scheduling software', 'grounds maintenance app', 'landscape contractor software'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 1300,
    relatedCategoryIds: []
  },
  {
    id: 'restoration-management',
    slug: 'restoration-management',
    name: 'Water Damage & Restoration Management Software',
    description: 'All-in-one software for water damage, fire damage, and restoration contractors',
    primaryKeyword: 'restoration software construction',
    relatedKeywords: ['water damage software', 'restoration contractor app', 'claims management software'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 890,
    relatedCategoryIds: []
  },

  // ========== EMERGING & AI-FOCUSED ==========
  {
    id: 'ai-powered-project-management',
    slug: 'ai-powered-project-management',
    name: 'AI-Powered Project Management & Automation',
    description: 'AI agents and tools that automate project management tasks',
    primaryKeyword: 'AI construction project management',
    relatedKeywords: ['AI for contractors', 'construction automation AI', 'AI project assistant'],
    toolTypes: ['AI Agent', 'Software', 'Platform'],
    affiliateIntentLevel: 'high',
    monthlySearchVolume: 950,
    relatedCategoryIds: []
  },
  {
    id: 'ai-document-processing',
    slug: 'ai-document-processing',
    name: 'AI Document Processing & Extraction',
    description: 'AI tools to extract data from documents, plans, and invoices',
    primaryKeyword: 'AI document processing construction',
    relatedKeywords: ['document extraction tool', 'AI plan reading', 'invoice processing AI'],
    toolTypes: ['AI Agent', 'Software'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 620,
    relatedCategoryIds: []
  },

  // ========== INTEGRATIONS & INFRASTRUCTURE ==========
  {
    id: 'construction-software-integrations',
    slug: 'construction-software-integrations',
    name: 'Construction Software Integrations & APIs',
    description: 'Platforms and tools that integrate construction software and automate data flow',
    primaryKeyword: 'construction software integration platform',
    relatedKeywords: ['construction API integrations', 'software connector construction', 'construction workflow automation'],
    toolTypes: ['Platform', 'Software'],
    affiliateIntentLevel: 'low',
    monthlySearchVolume: 540,
    relatedCategoryIds: []
  },
  {
    id: 'mobile-field-apps',
    slug: 'mobile-field-apps',
    name: 'Mobile Apps for Field Operations',
    description: 'Mobile-first apps for offline field work and real-time synchronization',
    primaryKeyword: 'construction mobile app',
    relatedKeywords: ['field app for contractors', 'offline mobile construction app', 'mobile first construction software'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 1100,
    relatedCategoryIds: []
  },

  // ========== BUSINESS GROWTH & SCALING ==========
  {
    id: 'multi-location-management',
    slug: 'multi-location-management',
    name: 'Multi-Location & Multi-Company Management',
    description: 'Software for managing multiple job sites, teams, or subsidiary companies',
    primaryKeyword: 'multi-location construction management software',
    relatedKeywords: ['multi-company project management', 'enterprise construction software', 'multi-site software contractors'],
    toolTypes: ['Software', 'Platform'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 750,
    relatedCategoryIds: []
  },
  {
    id: 'contractor-back-office',
    slug: 'contractor-back-office',
    name: 'Back-Office Support Services',
    description: 'Outsourced administrative and bookkeeping services for contractors',
    primaryKeyword: 'construction back office service',
    relatedKeywords: ['construction bookkeeping service', 'administrative support contractors', 'construction accounting service'],
    toolTypes: ['Service'],
    affiliateIntentLevel: 'medium',
    monthlySearchVolume: 890,
    relatedCategoryIds: ['financial-management', 'payroll-management']
  }
];

/**
 * Helper functions for category lookup
 */
export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getCategoriesByAffiliatePotential(level: 'high' | 'medium' | 'low'): Category[] {
  return categories.filter(c => c.affiliateIntentLevel === level);
}

export function getTopSearchVolumeCategories(limit: number = 20): Category[] {
  return [...categories]
    .filter(c => c.monthlySearchVolume)
    .sort((a, b) => (b.monthlySearchVolume || 0) - (a.monthlySearchVolume || 0))
    .slice(0, limit);
}

export function getAllCategorySlugs(): string[] {
  return categories.map(c => c.slug);
}
