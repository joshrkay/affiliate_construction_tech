export interface CompareFeatureGroup {
  category: string;
  features: { key: string; label: string }[];
}

// Per-trade feature matrix definitions
export const tradeCompareFeatures: Record<string, CompareFeatureGroup[]> = {
  "general-contracting": [
    {
      category: "Scheduling & Planning",
      features: [
        { key: "gantt", label: "Gantt Scheduling" },
        { key: "critical-path", label: "Critical Path Analysis" },
        { key: "resource-planning", label: "Resource Planning" },
        { key: "ai-schedule", label: "AI Schedule Optimization" },
        { key: "bim-4d", label: "4D BIM Integration" },
      ],
    },
    {
      category: "Financial Management",
      features: [
        { key: "budget-tracking", label: "Budget Tracking" },
        { key: "cost-forecasting", label: "Cost Forecasting" },
        { key: "change-orders", label: "Change Order Management" },
        { key: "invoicing", label: "Invoicing & Billing" },
        { key: "job-costing", label: "Job Costing" },
      ],
    },
    {
      category: "Field Operations",
      features: [
        { key: "daily-logs", label: "Daily Logs & Reports" },
        { key: "mobile-app", label: "Mobile App" },
        { key: "photo-docs", label: "Photo Documentation" },
        { key: "quality-inspections", label: "Quality Inspections" },
        { key: "safety", label: "Safety Programs" },
      ],
    },
    {
      category: "Collaboration & Docs",
      features: [
        { key: "rfi-tracking", label: "RFI Tracking" },
        { key: "submittals", label: "Submittal Management" },
        { key: "client-portal", label: "Client Portal" },
        { key: "subcontractor-mgmt", label: "Subcontractor Management" },
        { key: "bim-integration", label: "BIM Integration" },
      ],
    },
  ],
  "electrical": [
    {
      category: "Estimating & Takeoff",
      features: [
        { key: "pdf-takeoff", label: "PDF Plan Takeoff" },
        { key: "ai-takeoff", label: "AI Auto-Detect Takeoff" },
        { key: "neca-labor", label: "NECA Labor Units" },
        { key: "material-db", label: "Material Pricing Database" },
        { key: "bid-assembly", label: "Bid Assembly & Proposals" },
      ],
    },
    {
      category: "Project & Job Management",
      features: [
        { key: "job-costing", label: "Job Costing" },
        { key: "change-orders", label: "Change Order Pricing" },
        { key: "scheduling", label: "Scheduling" },
        { key: "mobile-app", label: "Mobile App" },
        { key: "document-mgmt", label: "Document Management" },
      ],
    },
    {
      category: "Service Operations",
      features: [
        { key: "dispatch", label: "Dispatch & Scheduling" },
        { key: "service-agreements", label: "Service Agreements" },
        { key: "crm", label: "Customer CRM" },
        { key: "inventory", label: "Inventory Management" },
        { key: "flat-rate", label: "Flat Rate Pricebook" },
      ],
    },
    {
      category: "Integrations",
      features: [
        { key: "quickbooks", label: "QuickBooks Integration" },
        { key: "invoicing", label: "Invoicing & Payments" },
        { key: "pm-integration", label: "PM Platform Integration" },
        { key: "api", label: "Open API / Integrations" },
      ],
    },
  ],
  "plumbing": [
    {
      category: "Service Management",
      features: [
        { key: "dispatch", label: "Dispatch & Scheduling" },
        { key: "service-agreements", label: "Service Agreement Management" },
        { key: "crm", label: "Customer CRM" },
        { key: "equipment-tracking", label: "Equipment Tracking" },
        { key: "work-orders", label: "Work Order Management" },
      ],
    },
    {
      category: "Financial Tools",
      features: [
        { key: "quickbooks", label: "QuickBooks Integration" },
        { key: "invoicing", label: "Invoicing & Payments" },
        { key: "job-costing", label: "Job Costing" },
        { key: "flat-rate", label: "Flat Rate Pricebook" },
        { key: "change-orders", label: "Change Order Management" },
      ],
    },
    {
      category: "Field Tools",
      features: [
        { key: "mobile-app", label: "Mobile App" },
        { key: "photo-docs", label: "Photo Documentation" },
        { key: "inventory", label: "Inventory Management" },
        { key: "daily-logs", label: "Daily Logs" },
        { key: "scheduling", label: "Crew Scheduling" },
      ],
    },
    {
      category: "Estimating",
      features: [
        { key: "pdf-takeoff", label: "PDF Plan Takeoff" },
        { key: "material-db", label: "Material Pricing Database" },
        { key: "bid-assembly", label: "Bid Assembly" },
      ],
    },
  ],
  "hvac": [
    {
      category: "Service Operations",
      features: [
        { key: "dispatch", label: "Dispatch Optimization" },
        { key: "service-agreements", label: "Service Agreement Management" },
        { key: "maintenance-scheduling", label: "Maintenance Scheduling" },
        { key: "equipment-tracking", label: "Equipment Tracking" },
        { key: "work-orders", label: "Work Order Management" },
      ],
    },
    {
      category: "Financial Tools",
      features: [
        { key: "flat-rate", label: "Flat Rate Pricebook" },
        { key: "quickbooks", label: "QuickBooks Integration" },
        { key: "invoicing", label: "Invoicing & Payments" },
        { key: "job-costing", label: "Job Costing" },
        { key: "change-orders", label: "Change Order Management" },
      ],
    },
    {
      category: "Field & Customer",
      features: [
        { key: "mobile-app", label: "Mobile App" },
        { key: "crm", label: "Customer CRM" },
        { key: "inventory", label: "Inventory Management" },
        { key: "photo-docs", label: "Photo Documentation" },
        { key: "daily-logs", label: "Daily Logs" },
      ],
    },
    {
      category: "Advanced Technology",
      features: [
        { key: "ai-predictive", label: "AI Predictive Maintenance" },
        { key: "iot-sensors", label: "IoT Sensor Integration" },
        { key: "load-calc", label: "Load Calculation Integration" },
        { key: "api", label: "Open API / Integrations" },
      ],
    },
  ],
  "roofing": [
    {
      category: "Measurement & Takeoff",
      features: [
        { key: "aerial-measurement", label: "Aerial / Drone Measurement" },
        { key: "ai-takeoff", label: "AI Auto-Detect Takeoff" },
        { key: "pdf-takeoff", label: "PDF Plan Takeoff" },
        { key: "material-estimation", label: "Material Estimation" },
        { key: "storm-damage", label: "Storm Damage Assessment" },
      ],
    },
    {
      category: "Project Management",
      features: [
        { key: "scheduling", label: "Project Scheduling" },
        { key: "job-costing", label: "Job Costing" },
        { key: "change-orders", label: "Change Order Management" },
        { key: "client-portal", label: "Client Portal" },
        { key: "subcontractor-mgmt", label: "Subcontractor Management" },
      ],
    },
    {
      category: "Sales & Insurance",
      features: [
        { key: "instant-quote", label: "Instant Quote Generation" },
        { key: "insurance-claims", label: "Insurance Claim Support" },
        { key: "photo-docs", label: "Photo Documentation" },
        { key: "mobile-app", label: "Mobile App" },
        { key: "document-mgmt", label: "Document Management" },
      ],
    },
    {
      category: "Financials",
      features: [
        { key: "invoicing", label: "Invoicing & Payments" },
        { key: "quickbooks", label: "QuickBooks Integration" },
        { key: "daily-logs", label: "Daily Logs" },
        { key: "budget-tracking", label: "Budget Tracking" },
      ],
    },
  ],
  "concrete-masonry": [
    {
      category: "Estimating",
      features: [
        { key: "quantity-takeoff", label: "Quantity Takeoff" },
        { key: "earthwork", label: "Earthwork Calculations" },
        { key: "equipment-cost", label: "Equipment Cost Estimating" },
        { key: "dot-formats", label: "DOT Bid Formats" },
        { key: "material-db", label: "Material Pricing Database" },
      ],
    },
    {
      category: "Project Management",
      features: [
        { key: "scheduling", label: "Project Scheduling" },
        { key: "bim-integration", label: "BIM Integration" },
        { key: "job-costing", label: "Job Costing" },
        { key: "change-orders", label: "Change Order Management" },
        { key: "daily-logs", label: "Daily Logs" },
      ],
    },
    {
      category: "Technology & Quality",
      features: [
        { key: "iot-sensors", label: "IoT Sensor Integration" },
        { key: "quality-inspections", label: "Quality Inspection Tools" },
        { key: "photo-docs", label: "Photo Documentation" },
        { key: "mobile-app", label: "Mobile App" },
        { key: "document-mgmt", label: "Document Management" },
      ],
    },
  ],
  "carpentry-framing": [
    {
      category: "Estimating & Planning",
      features: [
        { key: "lumber-takeoff", label: "Lumber / Material Takeoff" },
        { key: "pdf-takeoff", label: "PDF Plan Takeoff" },
        { key: "bim-integration", label: "BIM Integration" },
        { key: "prefab-optimization", label: "Prefab Optimization" },
        { key: "material-estimation", label: "Material Estimation" },
      ],
    },
    {
      category: "Project Management",
      features: [
        { key: "scheduling", label: "Project Scheduling" },
        { key: "job-costing", label: "Job Costing" },
        { key: "change-orders", label: "Change Order Management" },
        { key: "client-portal", label: "Client Portal" },
        { key: "subcontractor-mgmt", label: "Subcontractor Management" },
      ],
    },
    {
      category: "Field Tools",
      features: [
        { key: "mobile-app", label: "Mobile App" },
        { key: "daily-logs", label: "Daily Logs" },
        { key: "photo-docs", label: "Photo Documentation" },
        { key: "quality-inspections", label: "Quality Inspections" },
        { key: "document-mgmt", label: "Document Management" },
      ],
    },
  ],
  "estimating-bidding": [
    {
      category: "Takeoff Technology",
      features: [
        { key: "ai-takeoff", label: "AI Auto-Detect Takeoff" },
        { key: "pdf-takeoff", label: "PDF Plan Takeoff" },
        { key: "multi-trade", label: "Multi-Trade Support" },
        { key: "batch-processing", label: "Batch Plan Processing" },
        { key: "nl-search", label: "Natural Language Search" },
      ],
    },
    {
      category: "Cost & Pricing",
      features: [
        { key: "cost-db", label: "Cost Database (RSMeans)" },
        { key: "material-db", label: "Material Pricing Database" },
        { key: "neca-labor", label: "NECA Labor Units" },
        { key: "historical-bids", label: "Historical Bid Analysis" },
        { key: "equipment-cost", label: "Equipment Cost Estimating" },
      ],
    },
    {
      category: "Bid Management",
      features: [
        { key: "bid-leveling", label: "Bid Leveling" },
        { key: "assembly-libs", label: "Assembly Libraries" },
        { key: "bid-assembly", label: "Bid Assembly & Proposals" },
        { key: "change-orders", label: "Change Order Pricing" },
        { key: "dot-formats", label: "DOT Bid Formats" },
      ],
    },
    {
      category: "Integrations",
      features: [
        { key: "pm-integration", label: "PM Platform Integration" },
        { key: "quickbooks", label: "QuickBooks Integration" },
        { key: "api", label: "Open API / Integrations" },
      ],
    },
  ],

  // ── Residential Trade Feature Matrices ──────────────────────────────────
  "painting-coatings": [
    {
      category: "Estimating & Quoting",
      features: [
        { key: "surface-estimating", label: "Surface Area Estimating" },
        { key: "material-calc", label: "Paint & Material Calculator" },
        { key: "production-rates", label: "Production Rate Library" },
        { key: "bid-assembly", label: "Proposal Generation" },
        { key: "electronic-signature", label: "Electronic Signature" },
      ],
    },
    {
      category: "Job Management",
      features: [
        { key: "scheduling", label: "Job Scheduling" },
        { key: "crm", label: "Lead & Customer CRM" },
        { key: "mobile-app", label: "Mobile Field App" },
        { key: "photo-docs", label: "Before/After Photo Docs" },
        { key: "invoicing", label: "Invoicing & Payments" },
      ],
    },
    {
      category: "Customer & Finance",
      features: [
        { key: "client-portal", label: "Client Portal" },
        { key: "follow-up-automation", label: "Follow-Up Automation" },
        { key: "quickbooks", label: "QuickBooks Integration" },
        { key: "job-costing", label: "Job Costing" },
        { key: "change-orders", label: "Change Order Management" },
      ],
    },
  ],

  "flooring": [
    {
      category: "Measurement & Estimating",
      features: [
        { key: "floor-measurement", label: "Floor Area Measurement" },
        { key: "waste-factor", label: "Waste Factor Analysis" },
        { key: "pattern-matching", label: "Pattern Matching Calculation" },
        { key: "seam-placement", label: "Seam Placement Optimization" },
        { key: "material-estimation", label: "Material & Cost Estimating" },
      ],
    },
    {
      category: "Job & Field Management",
      features: [
        { key: "scheduling", label: "Job Scheduling" },
        { key: "mobile-app", label: "Mobile Field App" },
        { key: "photo-docs", label: "Photo Documentation" },
        { key: "job-costing", label: "Job Costing" },
        { key: "invoicing", label: "Invoicing & Payments" },
      ],
    },
    {
      category: "Customer & Sales",
      features: [
        { key: "crm", label: "Customer CRM" },
        { key: "client-portal", label: "Client Portal" },
        { key: "bid-assembly", label: "Proposal Generation" },
        { key: "quickbooks", label: "QuickBooks Integration" },
        { key: "product-visualization", label: "Product Visualization" },
      ],
    },
  ],

  "drywall-insulation": [
    {
      category: "Estimating",
      features: [
        { key: "quantity-takeoff", label: "Quantity Takeoff" },
        { key: "pdf-takeoff", label: "PDF Plan Takeoff" },
        { key: "material-estimation", label: "Material Estimation" },
        { key: "material-db", label: "Material Pricing Database" },
        { key: "bid-assembly", label: "Bid Assembly" },
      ],
    },
    {
      category: "Project Management",
      features: [
        { key: "scheduling", label: "Project Scheduling" },
        { key: "job-costing", label: "Job Costing" },
        { key: "change-orders", label: "Change Order Management" },
        { key: "subcontractor-mgmt", label: "Subcontractor Management" },
        { key: "daily-logs", label: "Daily Logs" },
      ],
    },
    {
      category: "Field & Documentation",
      features: [
        { key: "mobile-app", label: "Mobile App" },
        { key: "photo-docs", label: "Photo Documentation" },
        { key: "document-mgmt", label: "Document Management" },
        { key: "invoicing", label: "Invoicing & Payments" },
        { key: "quickbooks", label: "QuickBooks Integration" },
      ],
    },
  ],

  "landscaping-irrigation": [
    {
      category: "Estimating & Sales",
      features: [
        { key: "material-estimation", label: "Landscape Estimating" },
        { key: "bid-assembly", label: "Proposal Generation" },
        { key: "crm", label: "Customer CRM" },
        { key: "follow-up-automation", label: "Follow-Up Automation" },
        { key: "electronic-signature", label: "Electronic Signature" },
      ],
    },
    {
      category: "Scheduling & Operations",
      features: [
        { key: "scheduling", label: "Crew Scheduling" },
        { key: "route-optimization", label: "Route Optimization" },
        { key: "dispatch", label: "Dispatch Management" },
        { key: "mobile-app", label: "Mobile Field App" },
        { key: "work-orders", label: "Work Order Management" },
      ],
    },
    {
      category: "Finance & Maintenance",
      features: [
        { key: "service-agreements", label: "Maintenance Contracts" },
        { key: "job-costing", label: "Job Costing" },
        { key: "invoicing", label: "Invoicing & Payments" },
        { key: "quickbooks", label: "QuickBooks Integration" },
        { key: "equipment-tracking", label: "Equipment Management" },
      ],
    },
  ],

  "windows-doors": [
    {
      category: "Estimating & Sales",
      features: [
        { key: "bid-assembly", label: "Proposal Generation" },
        { key: "crm", label: "Lead & Customer CRM" },
        { key: "electronic-signature", label: "Electronic Signature" },
        { key: "follow-up-automation", label: "Follow-Up Automation" },
        { key: "material-estimation", label: "Material Estimation" },
      ],
    },
    {
      category: "Job Management",
      features: [
        { key: "scheduling", label: "Job Scheduling" },
        { key: "mobile-app", label: "Mobile App" },
        { key: "photo-docs", label: "Photo Documentation" },
        { key: "document-mgmt", label: "Document Management" },
        { key: "work-orders", label: "Work Order Management" },
      ],
    },
    {
      category: "Finance & Service",
      features: [
        { key: "invoicing", label: "Invoicing & Payments" },
        { key: "job-costing", label: "Job Costing" },
        { key: "change-orders", label: "Change Order Management" },
        { key: "service-agreements", label: "Warranty Management" },
        { key: "quickbooks", label: "QuickBooks Integration" },
      ],
    },
  ],

  "solar-renewable": [
    {
      category: "Design & Engineering",
      features: [
        { key: "ai-solar-design", label: "AI Solar System Design" },
        { key: "shade-analysis", label: "Shade Analysis" },
        { key: "3d-modeling", label: "3D System Modeling" },
        { key: "energy-simulation", label: "Energy Production Simulation" },
        { key: "battery-design", label: "Battery Storage Design" },
      ],
    },
    {
      category: "Sales & Proposals",
      features: [
        { key: "financial-modeling", label: "Financial ROI Modeling" },
        { key: "bid-assembly", label: "Proposal Generation" },
        { key: "crm", label: "Customer CRM & Pipeline" },
        { key: "electronic-signature", label: "Electronic Signature" },
        { key: "follow-up-automation", label: "Follow-Up Automation" },
      ],
    },
    {
      category: "Operations & Compliance",
      features: [
        { key: "permit-automation", label: "Permit Package Automation" },
        { key: "scheduling", label: "Installation Scheduling" },
        { key: "mobile-app", label: "Mobile Field App" },
        { key: "photo-docs", label: "Photo Documentation" },
        { key: "invoicing", label: "Invoicing & Payments" },
      ],
    },
  ],

  "cabinetry-countertops": [
    {
      category: "Design & Sales",
      features: [
        { key: "bid-assembly", label: "Proposal Generation" },
        { key: "crm", label: "Customer CRM" },
        { key: "electronic-signature", label: "Electronic Signature" },
        { key: "follow-up-automation", label: "Follow-Up Automation" },
        { key: "material-estimation", label: "Material Estimation" },
      ],
    },
    {
      category: "Project Management",
      features: [
        { key: "scheduling", label: "Project Scheduling" },
        { key: "client-portal", label: "Client Communication Portal" },
        { key: "photo-docs", label: "Photo Documentation" },
        { key: "change-orders", label: "Change Order Management" },
        { key: "document-mgmt", label: "Document Management" },
      ],
    },
    {
      category: "Finance",
      features: [
        { key: "job-costing", label: "Job Costing" },
        { key: "invoicing", label: "Invoicing & Payments" },
        { key: "quickbooks", label: "QuickBooks Integration" },
        { key: "mobile-app", label: "Mobile App" },
        { key: "pdf-takeoff", label: "PDF Plan Takeoff" },
      ],
    },
  ],

  "tile-stone": [
    {
      category: "Estimating & Takeoff",
      features: [
        { key: "floor-measurement", label: "Area Measurement" },
        { key: "waste-factor", label: "Waste Factor Analysis" },
        { key: "pattern-matching", label: "Pattern Layout Calculation" },
        { key: "material-estimation", label: "Material Estimating" },
        { key: "bid-assembly", label: "Proposal Generation" },
      ],
    },
    {
      category: "Job Management",
      features: [
        { key: "scheduling", label: "Job Scheduling" },
        { key: "mobile-app", label: "Mobile Field App" },
        { key: "photo-docs", label: "Before/After Photo Docs" },
        { key: "work-orders", label: "Work Order Management" },
        { key: "job-costing", label: "Job Costing" },
      ],
    },
    {
      category: "Customer & Finance",
      features: [
        { key: "crm", label: "Customer CRM" },
        { key: "client-portal", label: "Client Portal" },
        { key: "invoicing", label: "Invoicing & Payments" },
        { key: "quickbooks", label: "QuickBooks Integration" },
        { key: "change-orders", label: "Change Order Management" },
      ],
    },
  ],
};

// Capability keys each tool supports
export const toolCapabilityMap: Record<string, string[]> = {
  procore: [
    "gantt", "critical-path", "resource-planning", "daily-logs", "budget-tracking",
    "cost-forecasting", "change-orders", "invoicing", "job-costing", "mobile-app",
    "photo-docs", "quality-inspections", "safety", "rfi-tracking", "submittals",
    "client-portal", "subcontractor-mgmt", "bim-integration", "document-mgmt", "api",
    "scheduling", "material-estimation", "pm-integration", "quantity-takeoff",
  ],
  buildertrend: [
    "gantt", "daily-logs", "budget-tracking", "change-orders", "invoicing",
    "job-costing", "mobile-app", "photo-docs", "client-portal", "subcontractor-mgmt",
    "document-mgmt", "api", "scheduling", "material-estimation", "quickbooks",
  ],
  "autodesk-construction-cloud": [
    "gantt", "critical-path", "resource-planning", "daily-logs", "budget-tracking",
    "cost-forecasting", "change-orders", "job-costing", "mobile-app", "photo-docs",
    "quality-inspections", "rfi-tracking", "submittals", "client-portal",
    "subcontractor-mgmt", "bim-integration", "bim-4d", "document-mgmt", "api",
    "scheduling", "pdf-takeoff", "quantity-takeoff", "multi-trade", "pm-integration",
    "lumber-takeoff", "material-estimation",
  ],
  "bluebeam-revu": [
    "pdf-takeoff", "material-estimation", "rfi-tracking", "submittals",
    "document-mgmt", "photo-docs", "quantity-takeoff", "change-orders",
    "bid-assembly", "batch-processing", "lumber-takeoff", "multi-trade",
  ],
  servicetitan: [
    "dispatch", "service-agreements", "crm", "inventory", "quickbooks",
    "invoicing", "mobile-app", "equipment-tracking", "flat-rate", "job-costing",
    "work-orders", "maintenance-scheduling", "daily-logs", "photo-docs", "api",
    "scheduling", "analytics", "ai-predictive", "budget-tracking",
  ],
  fieldedge: [
    "dispatch", "service-agreements", "crm", "inventory", "quickbooks",
    "invoicing", "mobile-app", "equipment-tracking", "flat-rate", "job-costing",
    "work-orders", "maintenance-scheduling", "photo-docs", "scheduling",
  ],
  knowify: [
    "job-costing", "change-orders", "scheduling", "mobile-app", "document-mgmt",
    "quickbooks", "invoicing", "crm", "work-orders", "dispatch", "photo-docs",
    "subcontractor-mgmt", "bid-assembly",
  ],
  "stack-takeoff": [
    "pdf-takeoff", "material-estimation", "cost-db", "material-db", "multi-trade",
    "bid-leveling", "historical-bids", "assembly-libs", "bid-assembly", "change-orders",
    "pm-integration", "quantity-takeoff", "api", "lumber-takeoff", "batch-processing",
  ],
  esticom: [
    "pdf-takeoff", "neca-labor", "material-db", "bid-assembly", "job-costing",
    "change-orders", "pm-integration", "historical-bids", "api", "scheduling",
  ],
  "togal-ai": [
    "ai-takeoff", "pdf-takeoff", "multi-trade", "nl-search", "batch-processing",
    "pm-integration", "api", "quantity-takeoff", "material-estimation",
    "storm-damage", "historical-bids",
  ],
  "alice-technologies": [
    "gantt", "critical-path", "resource-planning", "bim-4d", "cost-forecasting",
    "ai-schedule", "bim-integration", "scheduling",
  ],
  versatile: [
    "daily-logs", "quality-inspections", "photo-docs", "resource-planning",
  ],
  jobtread: [
    "gantt", "scheduling", "daily-logs", "budget-tracking", "change-orders",
    "invoicing", "job-costing", "mobile-app", "photo-docs", "client-portal",
    "subcontractor-mgmt", "document-mgmt", "quickbooks", "material-estimation",
    "work-orders", "crm",
  ],
  "b2w-estimate": [
    "quantity-takeoff", "earthwork", "equipment-cost", "dot-formats",
    "historical-bids", "pm-integration", "cost-db", "material-db",
    "bid-assembly", "assembly-libs",
  ],
  jobber: [
    "scheduling", "crm", "mobile-app", "invoicing", "quickbooks",
    "client-portal", "photo-docs", "work-orders", "bid-assembly",
    "electronic-signature", "follow-up-automation", "job-costing",
    "dispatch", "change-orders", "document-mgmt",
  ],
  paintscout: [
    "surface-estimating", "material-calc", "production-rates", "bid-assembly",
    "electronic-signature", "follow-up-automation", "crm", "quickbooks",
    "invoicing", "scheduling", "mobile-app", "photo-docs",
  ],
  "lmn-landscape": [
    "material-estimation", "bid-assembly", "crm", "scheduling",
    "route-optimization", "dispatch", "mobile-app", "work-orders",
    "service-agreements", "job-costing", "invoicing", "quickbooks",
    "equipment-tracking", "electronic-signature", "follow-up-automation",
  ],
  measuresquare: [
    "floor-measurement", "waste-factor", "pattern-matching", "seam-placement",
    "material-estimation", "bid-assembly", "product-visualization", "invoicing",
  ],
  "aurora-solar": [
    "ai-solar-design", "shade-analysis", "3d-modeling", "energy-simulation",
    "battery-design", "financial-modeling", "bid-assembly", "crm",
    "electronic-signature", "permit-automation", "scheduling", "mobile-app",
    "photo-docs", "follow-up-automation",
  ],
  opensolar: [
    "ai-solar-design", "shade-analysis", "3d-modeling", "energy-simulation",
    "financial-modeling", "bid-assembly", "electronic-signature", "crm",
    "scheduling", "mobile-app", "invoicing", "follow-up-automation",
  ],
  companycam: [
    "photo-docs", "mobile-app", "document-mgmt", "daily-logs",
    "client-portal", "scheduling",
  ],
};

// ============================================================
// Rich comparison content pages (full written articles)
// ============================================================

import { ComparisonDetailPage } from "./schemaTypes";

export const comparisonDetailPages: ComparisonDetailPage[] = [
  // ========== PROCORE VS BUILDERTREND ==========
  {
    slug: "procore-vs-buildertrend",
    toolId1: "procore",
    toolId2: "buildertrend",
    title: "Procore vs Buildertrend (2025): Which Is Right for Your Business?",
    metaDescription: "Procore vs Buildertrend: honest comparison for contractors. Pricing, features, and the real difference between commercial and residential construction software.",
    h1: "Procore vs Buildertrend: Honest Comparison for Contractors",
    introduction: "<p>The most common question from residential GCs looking to grow: should I upgrade to Procore or stay on Buildertrend? Both tools are solid — they're built for different contractors, and picking the wrong one means paying too much for features you don't need or missing critical ones you do.</p><p>Procore is built for commercial GCs managing multi-million dollar projects with large teams and complex document workflows. Buildertrend is built for residential contractors — custom home builders and remodelers who need client communication, proposals, and job management in one place. If you're residential under $3M, Buildertrend is almost certainly the better fit. If you're commercial over $2M with concurrent projects, Procore earns its price.</p>",
    comparisonTable: [
      {
        category: "Pricing & Access",
        rows: [
          { label: "Starting price", tool1: "$8,500+/year", tool2: "$99/month" },
          { label: "Pricing model", tool1: "Custom per seat", tool2: "Flat monthly" },
          { label: "Free trial", tool1: "Demo only", tool2: "Yes" },
          { label: "Setup time", tool1: "2–4 weeks", tool2: "3–5 days" },
        ]
      },
      {
        category: "Project Management",
        rows: [
          { label: "Scheduling", tool1: "Enterprise (critical path)", tool2: "Residential (Gantt)" },
          { label: "RFI & submittals", tool1: true, tool2: false },
          { label: "Bid management", tool1: "Full (scope leveling)", tool2: "Basic" },
          { label: "Document control", tool1: "Enterprise", tool2: "Basic" },
          { label: "Change orders", tool1: true, tool2: true },
        ]
      },
      {
        category: "Financial",
        rows: [
          { label: "Job costing", tool1: true, tool2: true },
          { label: "Estimating", tool1: "Via modules", tool2: "Built-in" },
          { label: "Invoicing", tool1: "Via integrations", tool2: "Built-in" },
          { label: "Budget tracking", tool1: true, tool2: true },
        ]
      },
      {
        category: "Client & Field",
        rows: [
          { label: "Client portal", tool1: "Basic", tool2: "Full" },
          { label: "Customer communication", tool1: "Limited", tool2: "Full" },
          { label: "Mobile app", tool1: true, tool2: true },
          { label: "Photo documentation", tool1: true, tool2: true },
        ]
      }
    ],
    sections: [
      {
        heading: "Procore: Built for Commercial Complexity",
        content: "<p><strong>Pricing: $8,500+/year</strong></p><p>Procore's strength is in managing complexity at scale. When you're running three concurrent commercial projects with 15 active subs each, managing hundreds of submittals, and tracking budget variances across multiple cost codes, Procore's document control and workflow tools earn their price. Scope leveling in bid management, RFI tracking with accountability chains, and deep budget controls are built for commercial PMs who live in the details.</p><p><strong>Where Procore wins:</strong> document management, bid management with scope leveling, RFI/submittal workflows, risk reporting, BuildingConnected sub discovery.</p><p><strong>Where Procore struggles:</strong> client-facing communication, proposal generation, onboarding speed, and price justification for residential contractors. If your clients want to see project photos and approve selections through a portal, Procore isn't designed for that experience.</p>"
      },
      {
        heading: "Buildertrend: Built for Residential Relationships",
        content: "<p><strong>Pricing: $99–299/month (flat rate)</strong></p><p>Buildertrend's core advantage is the integration of your business workflow with your client relationship. Proposals built from the same line items your subs bid against. Client portals where homeowners can approve selections, view schedules, and pay invoices. Communication tools that keep everyone on the same page without a dedicated PM managing email threads. For residential contractors doing $250K–$5M, that end-to-end flow is more valuable than Procore's enterprise features.</p><p><strong>Where Buildertrend wins:</strong> client portal, proposal generation, client communication, flat pricing, faster setup, integrated estimating and invoicing.</p><p><strong>Where Buildertrend struggles:</strong> complex commercial workflows, scope leveling, RFI management at scale, and sophisticated document control for projects with large sub teams.</p>"
      },
      {
        heading: "Pricing Breakdown: The Real Cost Difference",
        content: "<p>The sticker price gap is significant but the real cost depends on your usage. Procore at $8,500/year works out to roughly $700/month — compared to Buildertrend's $199/month mid-tier. At that difference, you need Procore to save you at least 4–5 hours per week to break even on labor cost alone.</p><p>For commercial GCs over $2M managing multiple projects simultaneously, Procore typically delivers that ROI through error prevention (one bad quote or missed submittal deadline costs more than a year of Procore fees). For residential contractors under $2M doing 15–20 jobs per year, Buildertrend at $199/month is hard to beat.</p><p>One note on Buildertrend pricing: the $99/month tier is limited. Most contractors who get real value are on the $199–299/month tier. Factor that into your comparison.</p>"
      }
    ],
    verdict: {
      bestFor: "Procore for commercial GCs over $2M. Buildertrend for residential builders and remodelers under $5M.",
      recommendation: "If you're asking whether to switch from Buildertrend to Procore: the answer is yes when you're consistently running 3+ concurrent projects over $500K each with multiple sub packages per project. Below that threshold, you're paying for complexity you don't need."
    },
    faqs: [
      {
        question: "Can I use Procore for residential construction?",
        answer: "Yes, but it's overkill. The client communication and proposal features that residential clients expect aren't Procore's strength. You'll spend more on software than the complexity justifies, and your clients will have a worse experience than they would with Buildertrend's client portal."
      },
      {
        question: "Can I use Buildertrend for commercial work?",
        answer: "For light commercial under $2M with straightforward sub management, yes. For complex commercial with extensive RFIs, submittals, and scope leveling requirements, you'll hit Buildertrend's ceiling quickly. Plan to upgrade when commercial work exceeds 40% of your volume."
      },
      {
        question: "Which has better QuickBooks integration?",
        answer: "Both integrate with QuickBooks. Buildertrend's integration is tighter for residential job costing — line items flow between systems cleanly. Procore's QuickBooks integration works better for complex commercial accounting with multiple cost codes and budget line items."
      },
      {
        question: "Is there a free trial for either platform?",
        answer: "Buildertrend offers a free trial. Procore offers demos and guided trials but no self-serve free access. If you're evaluating both, start with Buildertrend's free trial to validate the workflow, then request a Procore demo with your actual project scenarios."
      },
      {
        question: "Which is easier to learn?",
        answer: "Buildertrend. Most contractors are productive within a week. Procore has a steeper learning curve — plan on 2–4 weeks of setup and training before your team is running smoothly. Procore's onboarding team is good, but the platform's depth takes time to master."
      }
    ],
    published: false,
    lastUpdated: new Date().toISOString()
  },

  // ========== PROCORE VS SERVICETITAN ==========
  {
    slug: "procore-vs-servicetitan",
    toolId1: "procore",
    toolId2: "servicetitan",
    title: "Procore vs ServiceTitan (2025): Construction PM vs Field Service",
    metaDescription: "Procore vs ServiceTitan: which is right for your contracting business? Honest breakdown of who each platform is actually built for — and who needs both.",
    h1: "Procore vs ServiceTitan: Which Is Built for Your Business?",
    introduction: "<p>Procore and ServiceTitan are frequently compared, but they're not really competing for the same contractor. Procore manages construction projects — discrete jobs with defined starts, ends, and deliverables. ServiceTitan manages field service operations — dispatch, recurring service agreements, revenue per technician, and customer relationships that outlast any single job.</p><p>The comparison makes sense for one type of contractor: trade companies (HVAC, plumbing, electrical) doing both new construction installs and ongoing service work. For everyone else, the choice is usually obvious. Construction GCs use Procore. Service-first trade contractors use ServiceTitan.</p>",
    comparisonTable: [
      {
        category: "Pricing & Access",
        rows: [
          { label: "Starting price", tool1: "$8,500+/year", tool2: "$200–400+/month" },
          { label: "Pricing model", tool1: "Custom (project volume)", tool2: "Per technician" },
          { label: "Free trial", tool1: "Demo only", tool2: "Demo only" },
          { label: "Contract required", tool1: "Annual", tool2: "Annual" },
        ]
      },
      {
        category: "Core Workflow",
        rows: [
          { label: "Project management", tool1: "Enterprise", tool2: "Basic" },
          { label: "Field dispatch", tool1: "Basic", tool2: "Full (AI-optimized)" },
          { label: "Service agreements", tool1: false, tool2: true },
          { label: "Bid & estimating", tool1: "Full", tool2: "Field quotes only" },
          { label: "Document management", tool1: "Enterprise", tool2: "Basic" },
        ]
      },
      {
        category: "Financial",
        rows: [
          { label: "Job costing", tool1: true, tool2: "Service-focused" },
          { label: "Invoicing", tool1: "Via integrations", tool2: "Built-in" },
          { label: "Online payments", tool1: "Via integrations", tool2: "Built-in" },
          { label: "Price book management", tool1: false, tool2: true },
        ]
      },
      {
        category: "Customer & Field",
        rows: [
          { label: "Customer portal", tool1: "Basic", tool2: "Full" },
          { label: "Review generation", tool1: false, tool2: true },
          { label: "Mobile app", tool1: true, tool2: true },
          { label: "GPS tracking", tool1: "Limited", tool2: "Full" },
        ]
      }
    ],
    sections: [
      {
        heading: "Procore: The Construction Project Platform",
        content: "<p><strong>Pricing: $8,500+/year</strong></p><p>Procore is built around the project lifecycle: from bid to permit to punch list. Its strength is managing complexity across multiple concurrent projects with large sub teams — document control, RFI workflows, budget tracking, and schedule management at commercial scale. If your revenue comes primarily from construction projects rather than recurring service work, Procore is the better platform.</p><p><strong>Where Procore wins:</strong> project scheduling, document control, bid management with scope leveling, subcontractor coordination, budget tracking across complex cost codes.</p><p><strong>Where Procore falls short for service contractors:</strong> no recurring service agreement management, limited dispatch optimization, no price book tools, no built-in review generation, weak recurring customer relationship management.</p>"
      },
      {
        heading: "ServiceTitan: The Field Service Revenue Platform",
        content: "<p><strong>Pricing: $200–400+/month per technician</strong></p><p>ServiceTitan's core purpose is revenue optimization for field service companies. Dispatch board that shows tech location and job status in real time. Price book management that ensures consistent pricing. Membership programs that generate recurring revenue. Call recording and CSR coaching tools. These features only matter if your business model is built around repeat service customers — and they matter a lot if it is.</p><p><strong>Where ServiceTitan wins:</strong> dispatch optimization, service agreements, price book management, customer history, review generation, revenue-per-tech reporting, marketing attribution.</p><p><strong>Where ServiceTitan falls short for GCs:</strong> no meaningful project management for multi-phase construction jobs, limited document control, not built for complex sub coordination or commercial bid processes.</p>"
      },
      {
        heading: "Who Needs Both?",
        content: "<p>Trade contractors doing significant new construction AND service work often end up using both platforms — or wish they could. An HVAC company doing $3M in new construction installs and $2M in service and maintenance faces a genuine split: Procore handles the install side, ServiceTitan handles the service side, and the two don't integrate cleanly.</p><p>If you're in this situation, the practical answer is: use whichever matches your dominant revenue model and accept the friction on the other side. If 70% of your revenue is construction projects, run Procore and handle service jobs manually or with a lightweight tool like Jobber. If 70% is service work, run ServiceTitan and use a simpler PM tool for install projects.</p><p>At $8,500/year (Procore) plus $400/month per tech (ServiceTitan), running both is expensive. Most contractors in this position choose one and adapt their workflow.</p>"
      }
    ],
    verdict: {
      bestFor: "Procore for construction GCs and commercial contractors. ServiceTitan for service-first trade contractors (HVAC, plumbing, electrical) running 5+ technicians.",
      recommendation: "If you're primarily doing new construction projects, Procore is the right tool. If you're primarily doing service calls and maintenance agreements, ServiceTitan is the right tool. If you're doing both at scale, budget for both — or pick the one that matches your majority revenue stream and accept the friction."
    },
    faqs: [
      {
        question: "Can ServiceTitan handle construction project management?",
        answer: "Not well. ServiceTitan is built for field service dispatch and customer relationships. It doesn't have the document control, RFI workflows, or complex budget tracking that commercial construction projects require. Use it for service work; use Procore or a dedicated PM tool for construction projects."
      },
      {
        question: "Can Procore handle HVAC service work?",
        answer: "For the install side of HVAC work, yes. For recurring service agreements, maintenance contracts, and dispatch optimization, no. Procore doesn't have the price book management, service agreement tools, or dispatch board that HVAC service companies need."
      },
      {
        question: "Which is more expensive?",
        answer: "At face value, Procore ($8,500+/year) vs ServiceTitan ($200–400+/month per tech). For a 5-tech ServiceTitan operation at $300/month per tech, you're paying $18,000/year — more than most Procore contracts. ServiceTitan's per-tech pricing model scales with your team size."
      },
      {
        question: "Do Procore and ServiceTitan integrate with each other?",
        answer: "No native integration. Some contractors use middleware tools to sync customer and job data between the two platforms, but it's custom work. If you need both, budget for integration setup or accept some manual data transfer between systems."
      },
      {
        question: "Which has better reporting?",
        answer: "Depends on what you're reporting on. Procore's reporting is built for construction KPIs: budget variance, schedule performance, RFI response time. ServiceTitan's reporting is built for service KPIs: revenue per tech, close rate, average ticket value, membership renewal rate. Neither is better — they measure different businesses."
      }
    ],
    published: false,
    lastUpdated: new Date().toISOString()
  },

  // ========== JOBBER VS SERVICETITAN ==========
  {
    slug: "jobber-vs-servicetitan",
    toolId1: "jobber",
    toolId2: "servicetitan",
    title: "Jobber vs ServiceTitan (2025): Small Service vs Enterprise",
    metaDescription: "Jobber vs ServiceTitan compared honestly. Which field service software is right for your trade business? Real pricing, real differences, and who each is built for.",
    h1: "Jobber vs ServiceTitan: Which Field Service Software Is Right for You?",
    introduction: "<p>Jobber and ServiceTitan serve the same market — field service contractors — at completely different price points and capability levels. Jobber is designed for small service companies that need job management without complexity. ServiceTitan is designed for service companies scaling past 5 technicians who need revenue optimization tools, not just job tracking.</p><p>If you're a solo operator or 2–3 tech operation, ServiceTitan is expensive overkill. If you're running 8+ techs and trying to build a real service company, Jobber will hold you back. The decision is mostly about where you are and where you're going.</p>",
    comparisonTable: [
      {
        category: "Pricing & Access",
        rows: [
          { label: "Starting price", tool1: "$29/month", tool2: "$200+/month per tech" },
          { label: "Free option", tool1: "Free trial", tool2: "Demo only" },
          { label: "Pricing model", tool1: "Flat (by feature tier)", tool2: "Per technician" },
          { label: "Contract required", tool1: "Monthly or annual", tool2: "Annual" },
        ]
      },
      {
        category: "Core Features",
        rows: [
          { label: "Job scheduling", tool1: true, tool2: true },
          { label: "Invoicing", tool1: true, tool2: true },
          { label: "Online payments", tool1: true, tool2: true },
          { label: "Mobile app", tool1: true, tool2: true },
          { label: "Customer portal", tool1: true, tool2: true },
        ]
      },
      {
        category: "Advanced Features",
        rows: [
          { label: "Price book management", tool1: false, tool2: true },
          { label: "Service agreements", tool1: "Basic", tool2: "Full" },
          { label: "Dispatch optimization", tool1: "Manual", tool2: "AI-assisted" },
          { label: "Revenue per tech reporting", tool1: false, tool2: true },
          { label: "Marketing attribution", tool1: false, tool2: true },
          { label: "CSR call recording", tool1: false, tool2: true },
        ]
      },
      {
        category: "Ease of Use",
        rows: [
          { label: "Setup time", tool1: "1–3 days", tool2: "2–6 weeks" },
          { label: "Learning curve", tool1: "Low", tool2: "High" },
          { label: "Training required", tool1: "Minimal", tool2: "Significant" },
        ]
      }
    ],
    sections: [
      {
        heading: "Jobber: Simple Job Management That Gets Out of Your Way",
        content: "<p><strong>Pricing: $29–99/month (flat rate)</strong></p><p>Jobber's value proposition is simplicity: you can be fully set up in a day, start scheduling and invoicing by the end of the week, and your techs will figure out the mobile app without a training session. For a 1–5 person service operation, that speed and ease of use is genuinely valuable — you're not paying someone to manage software, you're running jobs.</p><p><strong>Where Jobber wins:</strong> quick setup, easy onboarding for techs, affordable flat pricing, solid scheduling and invoicing, good mobile app, excellent for small teams.</p><p><strong>Where Jobber has limits:</strong> no price book management (you're setting prices manually per job), limited service agreement tools, no revenue-per-tech reporting, no dispatch optimization. As you scale past 5 techs, you'll feel these gaps.</p>"
      },
      {
        heading: "ServiceTitan: Revenue Optimization for Growing Service Companies",
        content: "<p><strong>Pricing: $200–400+/month per technician</strong></p><p>ServiceTitan is built on the premise that the biggest problem in a growing service company isn't job tracking — it's revenue leakage. Techs pricing inconsistently in the field. Missed upsell opportunities. Service agreements not getting renewed. CSRs not converting calls. ServiceTitan has tools for all of these: price books that enforce consistent pricing, membership management that automates renewals, call recording and coaching tools for CSRs, and reporting that shows revenue-per-tech trends over time.</p><p><strong>Where ServiceTitan wins:</strong> price book consistency, service agreement management, revenue-per-tech reporting, dispatch board with GPS, CSR performance tools, marketing ROI tracking.</p><p><strong>Where ServiceTitan struggles:</strong> cost (a 5-tech team pays $1,000–2,000/month), steep learning curve, long implementation timeline, and pricing that punishes growth — every new tech adds $200–400/month.</p>"
      },
      {
        heading: "The Real Question: Where Are You in 18 Months?",
        content: "<p>The Jobber vs ServiceTitan decision is really a question about trajectory. If you're at 2 techs and planning to stay there, Jobber at $49/month is the obvious answer. If you're at 4 techs and planning to hit 10 within two years, the ServiceTitan transition is coming — the question is whether you do it now or later.</p><p>Switching platforms mid-growth is painful. You'll rebuild your customer database, retrain your team, and lose historical reporting continuity. The contractors who do it successfully plan the switch during a slow season with a 6-week implementation window.</p><p><strong>Switch to ServiceTitan when:</strong> you have 5+ techs and inconsistent pricing is visibly costing you margin, you're running service agreements that need systematic renewal management, or you need revenue-per-tech reporting to manage team performance.</p><p><strong>Stay on Jobber when:</strong> you're under 5 techs with no near-term plans to scale, you value simplicity over optimization, or you're not yet at the revenue level where ServiceTitan's per-tech cost makes financial sense.</p>"
      }
    ],
    verdict: {
      bestFor: "Jobber for 1–5 tech service companies that want fast, simple job management. ServiceTitan for 5+ tech operations focused on revenue optimization and systematic growth.",
      recommendation: "Start with Jobber. Upgrade to ServiceTitan when you hit 5 techs and start feeling the revenue leakage that comes with inconsistent pricing and unmanaged service agreements. Don't switch before you're ready — ServiceTitan's implementation cost and learning curve is real."
    },
    faqs: [
      {
        question: "How much does ServiceTitan actually cost for a small team?",
        answer: "For a 3-tech team at $300/month per tech, you're looking at $900/month or $10,800/year — compared to Jobber at $49–99/month. ServiceTitan also charges onboarding fees ($500–2,000+) and requires an annual contract. Make sure the revenue optimization features actually close that gap before committing."
      },
      {
        question: "Can Jobber handle service agreements?",
        answer: "Jobber has basic recurring job features that work as a lightweight service agreement tool. For a small number of maintenance contracts, it's adequate. For a service company where agreements are 30%+ of revenue and you need automated renewal tracking and reporting, Jobber's tools aren't deep enough."
      },
      {
        question: "Does ServiceTitan work for solo operators?",
        answer: "Technically yes, but it's not worth the cost or complexity. ServiceTitan's tools — price book management, CSR coaching, revenue-per-tech reporting — are designed for companies with multiple techs and layers of operation. A solo operator gets minimal value from most of what makes ServiceTitan expensive."
      },
      {
        question: "Which is better for HVAC contractors?",
        answer: "ServiceTitan was built with HVAC contractors as the primary target and has the deepest HVAC-specific features: equipment tracking per customer, seasonal agreement management, and diagnostic workflow tools. Jobber works for small HVAC operations but lacks the HVAC-specific depth that ServiceTitan has."
      },
      {
        question: "Is there a middle ground between Jobber and ServiceTitan?",
        answer: "Housecall Pro and Jobber's higher tiers sit in the middle of this market — more features than basic Jobber, far less expensive than ServiceTitan. If you're at 4–6 techs and ServiceTitan's price is a barrier, evaluate Housecall Pro before committing to the full ServiceTitan implementation cost."
      }
    ],
    published: false,
    lastUpdated: new Date().toISOString()
  }
];
