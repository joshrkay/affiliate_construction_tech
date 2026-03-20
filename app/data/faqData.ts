// FAQ data for AI search optimization
// These FAQs will be displayed on relevant pages and used for schema markup

export interface FAQ {
  question: string;
  answer: string;
  slug: string; // tool or trade slug
}

export const toolFAQs: FAQ[] = [
  // Procore
  {
    question: "What is Procore?",
    answer: "Procore is the #1 construction management platform used by over 7 million users worldwide. It provides project management, field productivity, and financial management tools for contractors.",
    slug: "procore",
  },
  {
    question: "How much does Procore cost?",
    answer: "Procore pricing ranges from $15-$50/user/month depending on the plan. Plus, Preferred, and Enterprise tiers available. Implementation fees extra.",
    slug: "procore",
  },
  {
    question: "Is Procore worth it for small contractors?",
    answer: "Procore is best for commercial GCs and companies with 5+ projects. Small contractors may find it expensive and complex. Buildertrend or Contractor Foreman may be better for small teams.",
    slug: "procore",
  },
  
  // Jobber
  {
    question: "What is Jobber?",
    answer: "Jobber is field service management software for home service businesses. It handles scheduling, invoicing, customer management, and quoting for HVAC, plumbing, and electrical contractors.",
    slug: "jobber",
  },
  {
    question: "How much does Jobber cost?",
    answer: "Jobber pricing starts at $29/user/month for Core, $49/user/month for Grow, and $249/user/month for Scale. Most small businesses use the Grow plan.",
    slug: "jobber",
  },
  {
    question: "Is Jobber free?",
    answer: "Jobber offers a 14-day free trial. After that, pricing starts at $29/user/month. No free tier is available.",
    slug: "jobber",
  },
  
  // ServiceTitan
  {
    question: "What is ServiceTitan?",
    answer: "ServiceTitan is comprehensive field service management software for home and commercial service businesses. It includes scheduling, CRM, invoicing, job costing, marketing, and 70+ integrations.",
    slug: "servicetitan",
  },
  {
    question: "How much does ServiceTitan cost?",
    answer: "ServiceTitan doesn't publish pricing publicly. Expect to budget $75-$150/user/month plus implementation fees of $5,000-$15,000.",
    slug: "servicetitan",
  },
  {
    question: "Is ServiceTitan worth the cost?",
    answer: "ServiceTitan is worth it for growing companies with 5+ technicians that need enterprise features. Smaller operations may find it expensive and complex.",
    slug: "servicetitan",
  },
  
  // Togal.AI
  {
    question: "What is Togal.AI?",
    answer: "Togal.AI is AI-powered takeoff software designed for electrical contractors. It automatically detects and measures electrical components on architectural plans using AI.",
    slug: "togal-ai",
  },
  {
    question: "How much does Togal.AI cost?",
    answer: "Togal.AI pricing ranges from $200-$500/month depending on features and team size. Exact pricing requires a sales call.",
    slug: "togal-ai",
  },
  {
    question: "Is Togal.AI accurate?",
    answer: "Togal.AI claims 98% accuracy on electrical takeoffs. User reviews indicate it significantly reduces takeoff time (up to 70%) but may need manual review for complex plans.",
    slug: "togal-ai",
  },
  
  // Buildertrend
  {
    question: "What is Buildertrend?",
    answer: "Buildertrend is construction management software designed for home builders, remodelers, and small general contractors. It offers project management, scheduling, and customer management.",
    slug: "buildertrend",
  },
  {
    question: "How much does Buildertrend cost?",
    answer: "Buildertrend pricing ranges from $10-$20/user/month depending on features. Annual billing provides discounts.",
    slug: "buildertrend",
  },
  
  // Housecall Pro
  {
    question: "What is Housecall Pro?",
    answer: "Housecall Pro is all-in-one field service management software for home service businesses. It includes scheduling, invoicing, customer management, and marketing automation.",
    slug: "housecall-pro",
  },
  {
    question: "How much does Housecall Pro cost?",
    answer: "Housecall Pro pricing ranges from $49/user/month for Essentials to $99/user/month for Enterprise. Most contractors use Professional at $79/user/month.",
    slug: "housecall-pro",
  },
];

export const tradeFAQs: FAQ[] = [
  // HVAC
  {
    question: "What is the best HVAC software for small business?",
    answer: "For small HVAC businesses (1-10 technicians), Jobber and Housecall Pro are best. They're affordable, easy to use, and cover all basics. ServiceTitan is better for larger operations.",
    slug: "hvac",
  },
  {
    question: "How much does HVAC software cost?",
    answer: "HVAC software costs range from $29-$150/user/month. Budget options start at $29, while enterprise solutions like ServiceTitan can exceed $100/user/month plus implementation fees.",
    slug: "hvac",
  },
  {
    question: "Is HVAC software worth it?",
    answer: "Yes, HVAC software pays for itself by reducing administrative time, improving scheduling efficiency, and increasing revenue through better customer communication and online booking.",
    slug: "hvac",
  },
  
  // Plumbing
  {
    question: "What is the best plumbing software?",
    answer: "The best plumbing software depends on your size: Jobber or Housecall Pro for small teams, ServiceTitan for growing companies, and Buildertrend for those doing more project-based work.",
    slug: "plumbing",
  },
  {
    question: "Do plumbers need software?",
    answer: "Yes, plumbers benefit from software for scheduling, invoicing, customer management, and service agreements. It professionalizes the business and saves time on administrative tasks.",
    slug: "plumbing",
  },
  
  // Electrical
  {
    question: "What is the best estimating software for electricians?",
    answer: "Top estimating software for electricians includes Togal.AI (AI-powered), STACK, Accubid, and PlanSwift. Togal.AI is best for AI features, STACK for cloud collaboration.",
    slug: "electrical",
  },
  {
    question: "Is there free electrical estimating software?",
    answer: "Most electrical estimating software requires a subscription. However, some basic tools like spreadsheets can be used for simple estimates. Professional options start around $199/month.",
    slug: "electrical",
  },
  
  // General Construction
  {
    question: "What is the best construction management software?",
    answer: "Procore is the industry leader for commercial work. Buildertrend is best for residential builders and remodelers. Contractor Foreman offers the best value for small contractors.",
    slug: "general-contracting",
  },
  {
    question: "How do I choose construction software?",
    answer: "Consider your trade, company size, budget, and specific needs. Start with a free trial, ensure it integrates with your existing tools, and check reviews from similar contractors.",
    slug: "general-contracting",
  },
];

export function getToolFAQs(slug: string): FAQ[] {
  return toolFAQs.filter(faq => faq.slug === slug);
}

export function getTradeFAQs(slug: string): FAQ[] {
  return tradeFAQs.filter(faq => faq.slug === slug);
}

// AI Search - Question keywords to target
export const aiSearchQuestions = {
  // Questions starting with "what is"
  "what-is": [
    "What is the best construction software?",
    "What is Procore used for?",
    "What is Jobber software?",
    "What is ServiceTitan?",
    "What is field service management?",
    "What is construction estimating software?",
    "What is AI takeoff software?",
    "What is project management software?",
  ],
  // Questions starting with "how much"
  "how-much": [
    "How much does Procore cost?",
    "How much does Jobber cost?",
    "How much does ServiceTitan cost?",
    "How much does construction software cost?",
    "How much does takeoff software cost?",
    "How much is field service software?",
  ],
  // Questions starting with "best"
  "best": [
    "Best construction software for small business",
    "Best HVAC software",
    "Best plumbing software",
    "Best estimating software for contractors",
    "Best free construction software",
    "Best project management software",
  ],
  // Questions starting with "vs"
  "vs": [
    "Procore vs Buildertrend",
    "ServiceTitan vs Jobber",
    "Togal.AI vs STACK",
    "Jobber vs Housecall Pro",
    "Procore vs CoConstruct",
  ],
  // Questions starting with "how to"
  "how-to": [
    "How to choose construction software",
    "How to switch construction software",
    "How to estimate construction jobs",
    "How to use Procore",
    "How to get started with Jobber",
  ],
};

export function getFAQsByKeyword(keyword: string): FAQ[] {
  const allFAQs = [...toolFAQs, ...tradeFAQs];
  return allFAQs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(keyword.toLowerCase()) ||
      faq.answer.toLowerCase().includes(keyword.toLowerCase())
  );
}

// AI Search Optimized FAQs - These are designed to appear in AI Overviews
export const aiSearchFAQs = [
  // Pricing questions
  {
    question: "How much does construction software cost?",
    answer: "Construction software costs range from $0 to $150+/user/month. Budget options start at $0 (free tiers), mid-range at $29-75/user/month, and enterprise at $100+/user/month. Most small businesses spend $50-100/month.",
    slug: "general",
  },
  {
    question: "Is there free construction software?",
    answer: "Yes, some construction software offers free tiers or trials. QuickBooks Free has basic accounting. Many tools offer 14-30 day free trials. However, most professional construction software requires a paid subscription.",
    slug: "general",
  },
  {
    question: "What's the best free construction software?",
    answer: "The best free options include: QuickBooks Online Free (accounting), Trello (project management), and Google Sheets (basic tracking). For full features, expect to pay $29-100/month.",
    slug: "general",
  },
  // Choosing questions
  {
    question: "How do I choose construction software?",
    answer: "Start by: 1) List your pain points, 2) Set a budget, 3) Identify must-have features, 4) Check integrations, 5) Get references, 6) Use free trials. Choose software that fits your trade, company size, and growth plans.",
    slug: "general",
  },
  {
    question: "What software do most contractors use?",
    answer: "Most contractors use: Procore (commercial GC), Buildertrend (residential GC), Jobber (field service), QuickBooks (accounting), and Excel (basic tracking). The right choice depends on your trade and company size.",
    slug: "general",
  },
  // Procore questions
  {
    question: "Is Procore worth the cost?",
    answer: "Procore is worth it for commercial GCs with 5+ projects and $1M+ revenue. At $15-50/user/month plus implementation, it delivers ROI through better project tracking, reduced RFIs, and improved communication. Small contractors may find it expensive.",
    slug: "procore",
  },
  {
    question: "Can Procore be used for residential?",
    answer: "Yes, Procore can be used for residential projects but is optimized for commercial. Residential builders and remodelers often prefer Buildertrend or CoConstruct which are more affordable and easier to use.",
    slug: "procore",
  },
  // Jobber questions
  {
    question: "Is Jobber good for small business?",
    answer: "Yes, Jobber is excellent for small businesses with 1-10 technicians. Starting at $29/user/month, it offers scheduling, invoicing, and customer management. It's easy to learn and scales as you grow.",
    slug: "jobber",
  },
  {
    question: "Does Jobber do invoicing?",
    answer: "Yes, Jobber includes full invoicing features: create invoices, send automatically, accept online payments, track payment history, and send reminders. Integrated with Stripe and Square.",
    slug: "jobber",
  },
  // ServiceTitan questions
  {
    question: "Does ServiceTitan require a minimum number of users?",
    answer: "Yes, ServiceTitan typically requires a minimum of 3 users. This makes it better suited for growing companies rather than solo contractors or very small teams.",
    slug: "servicetitan",
  },
  {
    question: "Is ServiceTitan hard to learn?",
    answer: "ServiceTitan has a moderate learning curve. Most teams need 2-4 weeks to get comfortable. They offer training and implementation support. Smaller companies may find Jobber or Housecall Pro easier to learn.",
    slug: "servicetitan",
  },
  // AI/Technology questions
  {
    question: "Does construction software include AI?",
    answer: "Yes, newer construction software includes AI features. Examples: Togal.AI (AI takeoff), Procore AI (project insights), ServiceTitan AI (dispatch optimization), and ALICE (AI scheduling). Expect more AI features in 2026.",
    slug: "general",
  },
  {
    question: "What is AI takeoff software?",
    answer: "AI takeoff software uses artificial intelligence to automatically measure and count items from digital plans (PDFs). It can identify electrical components, HVAC ductwork, and materials. Popular options: Togal.AI, STACK, and PlanSwift.",
    slug: "general",
  },
  // Trade-specific
  {
    question: "What software do HVAC contractors use?",
    answer: "Top HVAC software includes: ServiceTitan (enterprise), Jobber (small business), Housecall Pro (value), FieldEdge (trade-specific), and SimPRO (trade-focused). Choice depends on company size and budget.",
    slug: "hvac",
  },
  {
    question: "What software do plumbers use?",
    answer: "Popular plumbing software: Jobber, Housecall Pro, ServiceTitan, and mHelpDesk. Most offer scheduling, invoicing, and customer management. Prices range from $29-150/user/month.",
    slug: "plumbing",
  },
  {
    question: "What software do electricians use?",
    answer: "Electricians use: Togal.AI (AI takeoff), STACK (estimating), Accubid (electrical estimating), Procore (project management), and Jobber (field service). For accounting: QuickBooks is standard.",
    slug: "electrical",
  },
  // Implementation questions
  {
    question: "How long does it take to implement construction software?",
    answer: "Implementation time varies: Simple cloud software (Jobber, Housecall Pro): 1-7 days. Mid-range (Buildertrend): 2-4 weeks. Enterprise (Procore): 1-6 months. Factor in training time.",
    slug: "general",
  },
  {
    question: "Can I import data from my current software?",
    answer: "Most modern construction software imports data from CSV, Excel, or directly from other platforms. QuickBooks integration is common. Check with your software provider about migration support.",
    slug: "general",
  },
];
