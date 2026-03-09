// Per-trade feature matrix definitions
export const tradeCompareFeatures = {
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
export const toolCapabilityMap = {
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
