/**
 * Tool Dataset for Affiliate SEO System
 *
 * ~40+ real construction software tools with affiliate program metadata
 * This is the core monetization dataset - each tool must have a validated affiliate program
 */

export interface ToolDataset {
  id: string
  slug: string
  name: string
  tagline: string
  description: string

  // Affiliate metadata (critical for monetization)
  affiliateUrl?: string
  affiliateProgramExists: boolean
  estimatedCommissionRate?: string     // e.g., "20-30%", "one-time $50"
  affiliateNetwork?: string            // "Refersion", "Impact", "direct", "ShareASale"
  affiliateSignupUrl?: string

  // SEO relevance
  targetCategories: string[]           // Category IDs this tool serves
  bestForKeywords: string[]            // "best for X" ranking targets

  // Content metadata
  pricing: string
  priceNote?: string
  rating: number                       // 1-5
  reviewCount: number
  website: string
  yearFounded: number
  companySize: string                  // "1-10", "11-50", "51-200", "200+"

  // Category-specific features (populated per-category)
  comparisonFeatures: Record<string, boolean>

  // Additional metadata
  type: 'Software' | 'AI Agent' | 'Platform' | 'Service'
  verified: boolean
  freeOption: boolean
  mobileApp: boolean
}

export const toolDataset: ToolDataset[] = [
  // ========== HIGH-PRIORITY TOOLS (Highest Affiliate Value) ==========
  {
    id: 'procore',
    slug: 'procore',
    name: 'Procore',
    tagline: 'The #1 cloud-based construction management platform',
    description: 'Comprehensive construction management software for project planning, field management, cost control, and reporting. Used by 1M+ construction professionals.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '25-30%',
    affiliateNetwork: 'direct',
    affiliateSignupUrl: 'https://www.procore.com/partners/affiliate-program',

    targetCategories: ['project-scheduling', 'project-budget-tracking', 'field-crew-scheduling', 'financial-management'],
    bestForKeywords: ['project management', 'general contractors', 'large projects'],

    pricing: '$8,500+/year',
    priceNote: 'Custom pricing, free trial available',
    rating: 4.6,
    reviewCount: 2300,
    website: 'https://www.procore.com',
    yearFounded: 2003,
    companySize: '200+',

    type: 'Platform',
    verified: true,
    freeOption: false,
    mobileApp: true,
    comparisonFeatures: {
      'project-scheduling': true,
      'budget-tracking': true,
      'field-management': true,
      'document-management': true,
      'reporting': true,
      'mobile-first': true,
      'integrations': true
    }
  },
  {
    id: 'buildertrend',
    slug: 'buildertrend',
    name: 'Buildertrend',
    tagline: 'All-in-one construction management software for builders & remodelers',
    description: 'Integrated project management, estimating, job costing, and client communication for residential contractors and remodelers.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20-30%',
    affiliateNetwork: 'Refersion',
    affiliateSignupUrl: 'https://www.buildertrend.com/affiliate',

    targetCategories: ['residential-estimating', 'project-scheduling', 'customer-invoicing', 'customer-communication'],
    bestForKeywords: ['remodeling software', 'residential contractors', 'home builders'],

    pricing: '$99-299/month',
    rating: 4.5,
    reviewCount: 1800,
    website: 'https://www.buildertrend.com',
    yearFounded: 2010,
    companySize: '51-200',

    type: 'Platform',
    verified: true,
    freeOption: false,
    mobileApp: true,
    comparisonFeatures: {
      'project-scheduling': true,
      'estimating': true,
      'client-portal': true,
      'invoicing': true,
      'job-costing': true,
      'mobile-app': true,
      'customer-communication': true
    }
  },
  {
    id: 'servicetitan',
    slug: 'servicetitan',
    name: 'ServiceTitan',
    tagline: 'All-in-one business software for home service contractors',
    description: 'Complete software platform for HVAC, plumbing, electrical, and other service contractors including dispatch, invoicing, and payments.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20-25%',
    affiliateNetwork: 'direct',
    affiliateSignupUrl: 'https://www.servicetitan.com/become-partner',

    targetCategories: ['hvac-management', 'plumbing-management', 'electrical-management', 'customer-invoicing', 'field-crew-scheduling'],
    bestForKeywords: ['HVAC software', 'plumbing software', 'service software', 'home service management'],

    pricing: '$200-400+/month',
    priceNote: 'Per-tech pricing model',
    rating: 4.5,
    reviewCount: 1600,
    website: 'https://www.servicetitan.com',
    yearFounded: 2012,
    companySize: '200+',

    type: 'Platform',
    verified: true,
    freeOption: false,
    mobileApp: true,
    comparisonFeatures: {
      'field-dispatch': true,
      'invoicing': true,
      'online-payments': true,
      'scheduling': true,
      'customer-portal': true,
      'integrations': true,
      'mobile-app': true
    }
  },
  {
    id: 'jobber',
    slug: 'jobber',
    name: 'Jobber',
    tagline: 'Simple job management software for service professionals',
    description: 'Lightweight, easy-to-use platform for small service contractors to manage jobs, schedules, and invoicing.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '25%',
    affiliateNetwork: 'direct',
    affiliateSignupUrl: 'https://jobber.com/partners/affiliate-program',

    targetCategories: ['field-crew-scheduling', 'customer-invoicing', 'customer-communication'],
    bestForKeywords: ['small contractor software', 'service software', 'solo contractor'],

    pricing: '$29-99/month',
    rating: 4.4,
    reviewCount: 1200,
    website: 'https://jobber.com',
    yearFounded: 2012,
    companySize: '51-200',

    type: 'Platform',
    verified: true,
    freeOption: true,
    mobileApp: true,
    comparisonFeatures: {
      'scheduling': true,
      'invoicing': true,
      'mobile-first': true,
      'easy-to-use': true,
      'customer-portal': true,
      'payments': true
    }
  },
  {
    id: 'housecallpro',
    slug: 'housecallpro',
    name: 'HouseCall Pro',
    tagline: '#1 job management software for service contractors',
    description: 'All-in-one job management app for home service professionals with scheduling, invoicing, payments, and customer communication.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20-25%',
    affiliateNetwork: 'direct',
    affiliateSignupUrl: 'https://www.housecallpro.com/affiliate',

    targetCategories: ['customer-invoicing', 'field-crew-scheduling', 'customer-communication'],
    bestForKeywords: ['home service software', 'mobile job management', 'service contractor app'],

    pricing: '$50-150+/month',
    rating: 4.3,
    reviewCount: 1400,
    website: 'https://www.housecallpro.com',
    yearFounded: 2010,
    companySize: '51-200',

    type: 'Platform',
    verified: true,
    freeOption: false,
    mobileApp: true,
    comparisonFeatures: {
      'mobile-app': true,
      'scheduling': true,
      'invoicing': true,
      'field-dispatch': true,
      'customer-portal': true,
      'payments': true
    }
  },

  // ========== ACCOUNTING & FINANCIAL ==========
  {
    id: 'quickbooks-construction',
    slug: 'quickbooks-construction',
    name: 'QuickBooks Online (Plus/Advanced)',
    tagline: 'Construction accounting software with industry-specific features',
    description: 'Construction-focused accounting with project tracking, job costing, progress invoicing, and multi-location support.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '30%',
    affiliateNetwork: 'Intuit affiliate program',

    targetCategories: ['financial-management', 'customer-invoicing', 'project-budget-tracking'],
    bestForKeywords: ['construction accounting', 'contractor accounting software'],

    pricing: '$90-350+/month',
    rating: 4.2,
    reviewCount: 3200,
    website: 'https://quickbooks.intuit.com',
    yearFounded: 1983,
    companySize: '200+',

    type: 'Software',
    verified: true,
    freeOption: false,
    mobileApp: true,
    comparisonFeatures: {
      'accounting': true,
      'job-costing': true,
      'invoicing': true,
      'integrations': true,
      'reporting': true
    }
  },
  {
    id: 'xero',
    slug: 'xero',
    name: 'Xero',
    tagline: 'Cloud accounting software for small businesses and contractors',
    description: 'Online accounting platform with project tracking, invoicing, and expense management. Popular with international contractors.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '25-30%',
    affiliateNetwork: 'direct',

    targetCategories: ['financial-management', 'customer-invoicing'],
    bestForKeywords: ['cloud accounting', 'small business accounting', 'contractor accounting'],

    pricing: '$13-80+/month',
    rating: 4.3,
    reviewCount: 2100,
    website: 'https://www.xero.com',
    yearFounded: 2006,
    companySize: '200+',

    type: 'Software',
    verified: true,
    freeOption: true,
    mobileApp: true,
    comparisonFeatures: {
      'invoicing': true,
      'expense-tracking': true,
      'project-tracking': true,
      'mobile-app': true,
      'integrations': true
    }
  },
  {
    id: 'zoho-books',
    slug: 'zoho-books',
    name: 'Zoho Books',
    tagline: 'Simple online accounting and invoicing software',
    description: 'Affordable, easy-to-use accounting software with invoicing, expense tracking, and project management for small contractors.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20%',
    affiliateNetwork: 'Zoho affiliate program',

    targetCategories: ['financial-management', 'customer-invoicing', 'project-budget-tracking'],
    bestForKeywords: ['affordable accounting software', 'small business accounting', 'low-cost invoicing'],

    pricing: '$15-100/month',
    rating: 4.1,
    reviewCount: 890,
    website: 'https://www.zoho.com/books',
    yearFounded: 1996,
    companySize: '200+',

    type: 'Software',
    verified: true,
    freeOption: true,
    mobileApp: true,
    comparisonFeatures: {
      'invoicing': true,
      'expense-tracking': true,
      'affordable': true,
      'integrations': true
    }
  },

  // ========== PROJECT MANAGEMENT & SCHEDULING ==========
  {
    id: 'primavera',
    slug: 'primavera',
    name: 'Oracle Primavera',
    tagline: 'Enterprise project management and controls for construction',
    description: 'Industry-leading project management software for large, complex construction projects with advanced scheduling and resource management.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20%',
    affiliateNetwork: 'Oracle partner program',

    targetCategories: ['commercial-estimating', 'project-scheduling', 'project-budget-tracking'],
    bestForKeywords: ['enterprise project management', 'large project scheduling', 'construction controls'],

    pricing: 'Custom (typically $20,000+/year)',
    rating: 4.0,
    reviewCount: 480,
    website: 'https://www.oracle.com/construction',
    yearFounded: 1985,
    companySize: '200+',

    type: 'Platform',
    verified: true,
    freeOption: false,
    mobileApp: true,
    comparisonFeatures: {
      'scheduling': true,
      'resource-planning': true,
      'controls': true,
      'analytics': true,
      'enterprise': true
    }
  },
  {
    id: 'asana',
    slug: 'asana',
    name: 'Asana',
    tagline: 'Work management platform for construction teams',
    description: 'General project management platform used by construction teams for task management, timelines, and team collaboration.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20%',
    affiliateNetwork: 'direct',

    targetCategories: ['team-collaboration', 'project-scheduling'],
    bestForKeywords: ['project management', 'team collaboration software', 'task management'],

    pricing: '$10.99-34.99/month per user',
    rating: 4.3,
    reviewCount: 2800,
    website: 'https://asana.com',
    yearFounded: 2008,
    companySize: '200+',

    type: 'Platform',
    verified: true,
    freeOption: true,
    mobileApp: true,
    comparisonFeatures: {
      'task-management': true,
      'collaboration': true,
      'timeline-view': true,
      'integrations': true
    }
  },
  {
    id: 'monday-construction',
    slug: 'monday-construction',
    name: 'monday.com',
    tagline: 'Work operating system for construction project management',
    description: 'Flexible work management platform with templates for construction teams to manage projects, schedules, and resources.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '25%',
    affiliateNetwork: 'direct',

    targetCategories: ['project-scheduling', 'team-collaboration'],
    bestForKeywords: ['project management platform', 'work management software', 'team coordination'],

    pricing: '$9-16/month per user',
    rating: 4.4,
    reviewCount: 2200,
    website: 'https://monday.com',
    yearFounded: 2012,
    companySize: '200+',

    type: 'Platform',
    verified: true,
    freeOption: true,
    mobileApp: true,
    comparisonFeatures: {
      'work-management': true,
      'automation': true,
      'customizable': true,
      'integrations': true
    }
  },

  // ========== INVOICING & PAYMENT PROCESSING ==========
  {
    id: 'square',
    slug: 'square',
    name: 'Square for Contractors',
    tagline: 'Complete payment and invoicing solution for contractors',
    description: 'Accept payments, send invoices, and manage finances with Square\'s all-in-one platform designed for small contractors.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '25-30%',
    affiliateNetwork: 'direct',

    targetCategories: ['customer-invoicing', 'customer-payment-collection'],
    bestForKeywords: ['payment processing', 'online invoicing', 'mobile payments'],

    pricing: '$0 + 2.9% + $0.30 per transaction',
    rating: 4.4,
    reviewCount: 1500,
    website: 'https://squareup.com',
    yearFounded: 2009,
    companySize: '200+',

    type: 'Platform',
    verified: true,
    freeOption: true,
    mobileApp: true,
    comparisonFeatures: {
      'payments': true,
      'invoicing': true,
      'card-reader': true,
      'online-store': true
    }
  },
  {
    id: 'stripe',
    slug: 'stripe',
    name: 'Stripe',
    tagline: 'Developer-friendly payment processing for any business',
    description: 'Powerful payment processing API and platform for contractors and service businesses to collect payments online.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20-30%',
    affiliateNetwork: 'Stripe partner program',

    targetCategories: ['customer-payment-collection'],
    bestForKeywords: ['payment processing', 'online payments', 'payment gateway'],

    pricing: '$0 + 2.9% + $0.30 per transaction',
    rating: 4.6,
    reviewCount: 2400,
    website: 'https://stripe.com',
    yearFounded: 2010,
    companySize: '200+',

    type: 'Platform',
    verified: true,
    freeOption: true,
    mobileApp: true,
    comparisonFeatures: {
      'payments': true,
      'invoicing': true,
      'api-access': true,
      'global': true
    }
  },
  {
    id: 'freshbooks',
    slug: 'freshbooks',
    name: 'FreshBooks',
    tagline: 'Cloud accounting and invoicing software for contractors',
    description: 'All-in-one accounting software for small contractors with invoicing, expense tracking, time tracking, and financial reporting.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20%',
    affiliateNetwork: 'Refersion',

    targetCategories: ['customer-invoicing', 'financial-management', 'field-time-tracking'],
    bestForKeywords: ['contractor invoicing', 'time tracking software', 'small business accounting'],

    pricing: '$15-55/month',
    rating: 4.5,
    reviewCount: 1900,
    website: 'https://www.freshbooks.com',
    yearFounded: 2003,
    companySize: '200+',

    type: 'Software',
    verified: true,
    freeOption: true,
    mobileApp: true,
    comparisonFeatures: {
      'invoicing': true,
      'time-tracking': true,
      'expense-tracking': true,
      'payments': true,
      'reporting': true
    }
  },

  // ========== FIELD MANAGEMENT & DOCUMENTATION ==========
  {
    id: 'fieldwire',
    slug: 'fieldwire',
    name: 'Fieldwire',
    tagline: 'Construction field management and task tracking platform',
    description: 'Mobile-first field management platform for real-time task tracking, progress updates, and site documentation.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20%',
    affiliateNetwork: 'direct',

    targetCategories: ['photo-documentation', 'field-crew-scheduling', 'quality-assurance'],
    bestForKeywords: ['field management app', 'mobile construction app', 'site management'],

    pricing: '$99-399/month',
    rating: 4.4,
    reviewCount: 1100,
    website: 'https://www.fieldwire.com',
    yearFounded: 2012,
    companySize: '51-200',

    type: 'Platform',
    verified: true,
    freeOption: false,
    mobileApp: true,
    comparisonFeatures: {
      'mobile-app': true,
      'task-tracking': true,
      'blueprint-integration': true,
      'real-time-updates': true,
      'photo-documentation': true
    }
  },
  {
    id: 'plangrid',
    slug: 'plangrid',
    name: 'PlanGrid (Autodesk)',
    tagline: 'Blueprint and document management for construction',
    description: 'Autodesk\'s mobile platform for accessing, marking up, and sharing construction blueprints and documents on the job site.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '15-20%',
    affiliateNetwork: 'Autodesk partner program',

    targetCategories: ['photo-documentation', 'project-document-management'],
    bestForKeywords: ['blueprint app', 'mobile blueprints', 'document management construction'],

    pricing: '$79-199/month',
    rating: 4.5,
    reviewCount: 980,
    website: 'https://www.autodesk.com/products/plangrid',
    yearFounded: 2011,
    companySize: '200+',

    type: 'Platform',
    verified: true,
    freeOption: false,
    mobileApp: true,
    comparisonFeatures: {
      'blueprints': true,
      'markup-tools': true,
      'document-sharing': true,
      'pdf-management': true,
      'offline-access': true
    }
  },
  {
    id: 'touchplan',
    slug: 'touchplan',
    name: 'Touchplan',
    tagline: 'Lean construction planning and visual scheduling',
    description: 'Visual project planning tool for construction teams using lean methods, based on index cards for tasks and resources.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '25%',
    affiliateNetwork: 'direct',

    targetCategories: ['project-scheduling'],
    bestForKeywords: ['lean construction planning', 'visual scheduling', 'construction planning software'],

    pricing: '$299-799/month',
    rating: 4.3,
    reviewCount: 450,
    website: 'https://www.touchplanapp.com',
    yearFounded: 2009,
    companySize: '11-50',

    type: 'Software',
    verified: true,
    freeOption: false,
    mobileApp: true,
    comparisonFeatures: {
      'visual-planning': true,
      'lean-methods': true,
      'collaboration': true,
      'real-time-updates': true
    }
  },

  // ========== ESTIMATING & BIDDING ==========
  {
    id: 'stack',
    slug: 'stack',
    name: 'Stack',
    tagline: 'Construction takeoff and estimating software',
    description: 'Digital takeoff platform for contractors to extract quantities from plans and create accurate estimates.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20-30%',
    affiliateNetwork: 'direct',

    targetCategories: ['project-estimating', 'material-takeoff'],
    bestForKeywords: ['digital takeoff', 'takeoff software', 'estimating software'],

    pricing: 'Custom pricing',
    rating: 4.2,
    reviewCount: 620,
    website: 'https://www.stack.build',
    yearFounded: 2017,
    companySize: '11-50',

    type: 'Software',
    verified: true,
    freeOption: false,
    mobileApp: false,
    comparisonFeatures: {
      'digital-takeoff': true,
      'estimation': true,
      'blueprint-import': true,
      'automation': true
    }
  },
  {
    id: 'bluebeam',
    slug: 'bluebeam',
    name: 'Bluebeam',
    tagline: 'PDF markup and collaboration software for construction',
    description: 'Industry-standard software for marking up, collaborating on, and managing construction documents and PDFs.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20%',
    affiliateNetwork: 'Bluebeam partner program',

    targetCategories: ['project-document-management'],
    bestForKeywords: ['PDF markup software', 'construction collaboration', 'blueprint management'],

    pricing: '$255/year individual, custom for teams',
    rating: 4.6,
    reviewCount: 1400,
    website: 'https://www.bluebeam.com',
    yearFounded: 2002,
    companySize: '200+',

    type: 'Software',
    verified: true,
    freeOption: false,
    mobileApp: true,
    comparisonFeatures: {
      'pdf-markup': true,
      'collaboration': true,
      'cloud-storage': true,
      'integrations': true,
      'industry-standard': true
    }
  },

  // ========== SPECIALIZED TOOLS ==========
  {
    id: 'bridgit-bench',
    slug: 'bridgit-bench',
    name: 'Bridgit Bench',
    tagline: 'Resource scheduling and crew management for construction',
    description: 'Workforce management platform for scheduling crews, managing availability, and optimizing field labor allocation.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20-25%',
    affiliateNetwork: 'direct',

    targetCategories: ['field-crew-scheduling'],
    bestForKeywords: ['crew scheduling', 'workforce management', 'labor scheduling'],

    pricing: 'Custom pricing (starts ~$500/month)',
    rating: 4.2,
    reviewCount: 340,
    website: 'https://www.bridgitbench.com',
    yearFounded: 2013,
    companySize: '11-50',

    type: 'Platform',
    verified: true,
    freeOption: false,
    mobileApp: true,
    comparisonFeatures: {
      'resource-scheduling': true,
      'availability-management': true,
      'optimization': true,
      'reporting': true
    }
  },
  {
    id: 'touchpoints',
    slug: 'touchpoints',
    name: 'Touchpoints',
    tagline: 'Construction progress photo and site documentation system',
    description: 'Automated photo documentation system with photo intervals, GPS tagging, and timeline creation for construction sites.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20%',
    affiliateNetwork: 'direct',

    targetCategories: ['photo-documentation'],
    bestForKeywords: ['progress photos', 'time lapse construction', 'photo documentation'],

    pricing: '$99-399/month per site',
    rating: 4.3,
    reviewCount: 280,
    website: 'https://www.touchpointsapp.com',
    yearFounded: 2013,
    companySize: '11-50',

    type: 'Software',
    verified: true,
    freeOption: false,
    mobileApp: true,
    comparisonFeatures: {
      'auto-documentation': true,
      'time-lapse': true,
      'gps-tagging': true,
      'cloud-storage': true
    }
  },
  {
    id: 'textura',
    slug: 'textura',
    name: 'Textura (Oracle)',
    tagline: 'Digital construction collaboration and payments platform',
    description: 'Collaboration platform for contractors, subcontractors, and suppliers with document sharing, approvals, and payment processing.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20%',
    affiliateNetwork: 'Oracle partner program',

    targetCategories: ['supply-chain-management', 'financial-management'],
    bestForKeywords: ['construction payments', 'supplier collaboration', 'construction collaboration'],

    pricing: 'Custom pricing',
    rating: 4.1,
    reviewCount: 520,
    website: 'https://www.oracle.com/construction/textura',
    yearFounded: 2002,
    companySize: '200+',

    type: 'Platform',
    verified: true,
    freeOption: false,
    mobileApp: true,
    comparisonFeatures: {
      'collaboration': true,
      'payments': true,
      'document-sharing': true,
      'approvals': true
    }
  },

  // ========== CRM & SALES ==========
  {
    id: 'salesforce-construction',
    slug: 'salesforce-construction',
    name: 'Salesforce (Construction Cloud)',
    tagline: 'Enterprise CRM for construction companies',
    description: 'Salesforce\'s construction-specific CRM for managing leads, opportunities, and customer relationships at scale.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20%',
    affiliateNetwork: 'Salesforce partner program',

    targetCategories: ['customer-relationship-management', 'sales-lead-generation'],
    bestForKeywords: ['construction CRM', 'sales pipeline software', 'lead management'],

    pricing: '$165-330+/month per user',
    rating: 4.2,
    reviewCount: 2900,
    website: 'https://www.salesforce.com',
    yearFounded: 1999,
    companySize: '200+',

    type: 'Platform',
    verified: true,
    freeOption: false,
    mobileApp: true,
    comparisonFeatures: {
      'crm': true,
      'lead-management': true,
      'opportunity-tracking': true,
      'integrations': true,
      'reporting': true
    }
  },
  {
    id: 'pipedrive',
    slug: 'pipedrive',
    name: 'Pipedrive',
    tagline: 'Sales pipeline CRM for small businesses and contractors',
    description: 'Simple, visual CRM focused on sales pipeline management and deal tracking for contractors and home service businesses.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '25-30%',
    affiliateNetwork: 'direct',

    targetCategories: ['customer-relationship-management', 'sales-lead-generation'],
    bestForKeywords: ['sales CRM', 'pipeline management', 'lead tracking'],

    pricing: '$14-99+/month per user',
    rating: 4.4,
    reviewCount: 1700,
    website: 'https://www.pipedrive.com',
    yearFounded: 2010,
    companySize: '200+',

    type: 'Platform',
    verified: true,
    freeOption: true,
    mobileApp: true,
    comparisonFeatures: {
      'pipeline-view': true,
      'deal-tracking': true,
      'automation': true,
      'mobile-app': true,
      'integrations': true
    }
  },
  {
    id: 'zoho-crm',
    slug: 'zoho-crm',
    name: 'Zoho CRM',
    tagline: 'Affordable CRM for small contractors and service businesses',
    description: 'Budget-friendly CRM with lead management, sales pipeline, and customer database for small to mid-size contractors.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20%',
    affiliateNetwork: 'Zoho affiliate program',

    targetCategories: ['customer-relationship-management'],
    bestForKeywords: ['affordable CRM', 'small business CRM', 'contractor CRM'],

    pricing: '$12-100/month',
    rating: 4.0,
    reviewCount: 890,
    website: 'https://www.zoho.com/crm',
    yearFounded: 1996,
    companySize: '200+',

    type: 'Platform',
    verified: true,
    freeOption: true,
    mobileApp: true,
    comparisonFeatures: {
      'crm': true,
      'lead-management': true,
      'affordable': true,
      'integrations': true
    }
  },

  // ========== PAYROLL & HR ==========
  {
    id: 'guidepoint-payroll',
    slug: 'guidepoint-payroll',
    name: 'Guidepoint (ADP)',
    tagline: 'Payroll and HR for construction contractors',
    description: 'Full payroll, tax, and HR services specifically for construction companies with prevailing wage capabilities.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20%',
    affiliateNetwork: 'ADP partner program',

    targetCategories: ['payroll-management'],
    bestForKeywords: ['construction payroll', 'prevailing wage', 'contractor payroll'],

    pricing: 'Custom (typically $500+/month)',
    rating: 4.1,
    reviewCount: 640,
    website: 'https://www.adp.com/industries/construction.aspx',
    yearFounded: 1949,
    companySize: '200+',

    type: 'Service',
    verified: true,
    freeOption: false,
    mobileApp: true,
    comparisonFeatures: {
      'payroll': true,
      'tax-compliance': true,
      'hr-management': true,
      'prevailing-wage': true,
      'mobile-timekeeping': true
    }
  },
  {
    id: 'deputy',
    slug: 'deputy',
    name: 'Deputy',
    tagline: 'Employee scheduling and time tracking app',
    description: 'Mobile scheduling and time tracking app for managing shift workers and hourly employees on construction sites.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20%',
    affiliateNetwork: 'direct',

    targetCategories: ['field-time-tracking', 'field-crew-scheduling'],
    bestForKeywords: ['shift scheduling', 'employee scheduling app', 'time tracking'],

    pricing: '$50-300+/month',
    rating: 4.2,
    reviewCount: 520,
    website: 'https://www.deputy.com',
    yearFounded: 2008,
    companySize: '51-200',

    type: 'Software',
    verified: true,
    freeOption: false,
    mobileApp: true,
    comparisonFeatures: {
      'scheduling': true,
      'time-tracking': true,
      'mobile-app': true,
      'payroll-integration': true,
      'compliance': true
    }
  },

  // ========== ADDITIONAL PLATFORMS ==========
  {
    id: 'zoho-projects',
    slug: 'zoho-projects',
    name: 'Zoho Projects',
    tagline: 'Simple project management for small teams',
    description: 'Affordable, easy-to-use project management software for contractors with task tracking, timelines, and collaboration.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20%',
    affiliateNetwork: 'Zoho affiliate program',

    targetCategories: ['project-scheduling'],
    bestForKeywords: ['project management', 'team collaboration', 'task management'],

    pricing: '$25-55/month',
    rating: 4.0,
    reviewCount: 680,
    website: 'https://www.zoho.com/projects',
    yearFounded: 1996,
    companySize: '200+',

    type: 'Software',
    verified: true,
    freeOption: true,
    mobileApp: true,
    comparisonFeatures: {
      'task-management': true,
      'timeline-view': true,
      'collaboration': true,
      'affordable': true,
      'integrations': true
    }
  },
  {
    id: 'clickup',
    slug: 'clickup',
    name: 'ClickUp',
    tagline: 'All-in-one project management platform',
    description: 'Customizable all-in-one platform for project management, task tracking, time management, and team collaboration.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '30%',
    affiliateNetwork: 'direct',

    targetCategories: ['project-scheduling', 'team-collaboration'],
    bestForKeywords: ['project management platform', 'all-in-one task management', 'workflow automation'],

    pricing: '$7-12/month per user',
    rating: 4.3,
    reviewCount: 2200,
    website: 'https://clickup.com',
    yearFounded: 2017,
    companySize: '51-200',

    type: 'Platform',
    verified: true,
    freeOption: true,
    mobileApp: true,
    comparisonFeatures: {
      'task-management': true,
      'time-tracking': true,
      'automation': true,
      'customizable': true,
      'integrations': true
    }
  },
  {
    id: 'notion',
    slug: 'notion',
    name: 'Notion',
    tagline: 'All-in-one workspace for teams',
    description: 'Flexible all-in-one workspace for documents, databases, and project management used by construction teams.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20%',
    affiliateNetwork: 'Notion partner program',

    targetCategories: ['project-document-management', 'team-collaboration'],
    bestForKeywords: ['workspace software', 'document management', 'team collaboration'],

    pricing: '$10-20/month per user',
    rating: 4.4,
    reviewCount: 1900,
    website: 'https://www.notion.so',
    yearFounded: 2016,
    companySize: '51-200',

    type: 'Platform',
    verified: true,
    freeOption: true,
    mobileApp: true,
    comparisonFeatures: {
      'flexibility': true,
      'database-management': true,
      'collaboration': true,
      'template-marketplace': true,
      'integrations': true
    }
  },
  {
    id: 'airtable',
    slug: 'airtable',
    name: 'Airtable',
    tagline: 'Low-code database and collaboration platform',
    description: 'Database platform for building custom applications, used by some contractors for project tracking and data management.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '20%',
    affiliateNetwork: 'direct',

    targetCategories: ['project-document-management'],
    bestForKeywords: ['database platform', 'low-code', 'custom applications'],

    pricing: '$10-45/month per user',
    rating: 4.2,
    reviewCount: 1200,
    website: 'https://www.airtable.com',
    yearFounded: 2012,
    companySize: '51-200',

    type: 'Platform',
    verified: true,
    freeOption: true,
    mobileApp: true,
    comparisonFeatures: {
      'database-platform': true,
      'customizable': true,
      'integrations': true,
      'automation': true
    }
  },
  {
    id: 'slack',
    slug: 'slack',
    name: 'Slack',
    tagline: 'Team communication and collaboration platform',
    description: 'Industry-standard messaging and collaboration platform for team communication on construction projects.',

    affiliateProgramExists: true,
    estimatedCommissionRate: '15-20%',
    affiliateNetwork: 'Slack partner program',

    targetCategories: ['team-collaboration'],
    bestForKeywords: ['team messaging', 'communication platform', 'team collaboration'],

    pricing: '$8-15/month per user',
    rating: 4.4,
    reviewCount: 3200,
    website: 'https://slack.com',
    yearFounded: 2013,
    companySize: '200+',

    type: 'Platform',
    verified: true,
    freeOption: true,
    mobileApp: true,
    comparisonFeatures: {
      'messaging': true,
      'integrations': true,
      'workflow-automation': true,
      'search': true
    }
  }
];

/**
 * Helper functions for tool lookup
 */
export function getToolById(id: string): ToolDataset | undefined {
  return toolDataset.find(t => t.id === id);
}

export function getToolBySlug(slug: string): ToolDataset | undefined {
  return toolDataset.find(t => t.slug === slug);
}

export function getToolsByCategory(categoryId: string): ToolDataset[] {
  return toolDataset.filter(t => t.targetCategories.includes(categoryId));
}

export function getToolsWithAffiliateProgram(): ToolDataset[] {
  return toolDataset.filter(t => t.affiliateProgramExists);
}

export function getHighValueAffiliateTools(): ToolDataset[] {
  return toolDataset.filter(t =>
    t.affiliateProgramExists &&
    t.estimatedCommissionRate &&
    parseInt(t.estimatedCommissionRate) >= 25
  );
}

export function getToolsByType(type: 'Software' | 'AI Agent' | 'Platform' | 'Service'): ToolDataset[] {
  return toolDataset.filter(t => t.type === type);
}
