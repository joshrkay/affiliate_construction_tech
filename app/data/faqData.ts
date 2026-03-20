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
