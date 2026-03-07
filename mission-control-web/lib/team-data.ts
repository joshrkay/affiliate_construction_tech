export type TeamAgent = {
  id: string;
  name: string;
  role: string;
  skills: string[];
  device: string;
  model: string;
  status: 'online' | 'busy' | 'blocked';
  currentWork: string;
};

export const teamAgents: TeamAgent[] = [
  {
    id: 'henry',
    name: 'Henry',
    role: 'Chief of Staff',
    skills: ['orchestration', 'delegation', 'execution'],
    device: "Mac's Mac mini",
    model: 'openai-codex/gpt-5.2',
    status: 'online',
    currentWork: 'Mission Control build + team coordination',
  },
  {
    id: 'lisbeth',
    name: 'Lisbeth',
    role: 'Research',
    skills: ['keyword research', 'market mapping', 'intent analysis'],
    device: "Mac's Mac mini",
    model: 'openai-codex/gpt-5.2',
    status: 'online',
    currentWork: 'SEO demand validation and opportunity mapping',
  },
  {
    id: 'leslie',
    name: 'Leslie',
    role: 'Briefing/Scoping',
    skills: ['content briefs', 'acceptance criteria', 'scope design'],
    device: "Mac's Mac mini",
    model: 'openai-codex/gpt-5.2',
    status: 'online',
    currentWork: 'Converting validated topics into production briefs',
  },
  {
    id: 'don',
    name: 'Don',
    role: 'Design/UX',
    skills: ['layout', 'UX structure', 'interaction design'],
    device: "Mac's Mac mini",
    model: 'openai-codex/gpt-5.2',
    status: 'online',
    currentWork: 'Refining Mission Control visual system',
  },
  {
    id: 'elliot',
    name: 'Elliot',
    role: 'Build',
    skills: ['implementation', 'component architecture', 'tooling'],
    device: "Mac's Mac mini",
    model: 'openai-codex/gpt-5.2',
    status: 'online',
    currentWork: 'Website/page implementation tasks',
  },
  {
    id: 'spock',
    name: 'Spock',
    role: 'Architecture',
    skills: ['systems review', 'technical decisions', 'constraints'],
    device: "Mac's Mac mini",
    model: 'openai-codex/gpt-5.2',
    status: 'online',
    currentWork: 'Architecture sanity checks',
  },
  {
    id: 'dexter',
    name: 'Dexter',
    role: 'QA',
    skills: ['launch gates', 'validation', 'checklist enforcement'],
    device: "Mac's Mac mini",
    model: 'openai-codex/gpt-5.2',
    status: 'online',
    currentWork: 'Pre-publish QA coverage and checklist pass',
  },
  {
    id: 'olivia',
    name: 'Olivia',
    role: 'SEO/Distribution',
    skills: ['on-page SEO', 'internal linking', 'metadata/schema'],
    device: "Mac's Mac mini",
    model: 'openai-codex/gpt-5.2',
    status: 'online',
    currentWork: 'Optimization standards for launch wave',
  },
  {
    id: 'marty',
    name: 'Marty',
    role: 'Metrics/ROI',
    skills: ['reporting', 'tracking', 'baseline analytics'],
    device: "Mac's Mac mini",
    model: 'openai-codex/gpt-5.2',
    status: 'online',
    currentWork: 'KPI baseline and reporting cadence',
  },
  {
    id: 'donna',
    name: 'Donna',
    role: 'Talent planning',
    skills: ['capacity planning', 'role planning', 'team scaling'],
    device: "Mac's Mac mini",
    model: 'openai-codex/gpt-5.2',
    status: 'online',
    currentWork: 'Standby for staffing and role support',
  },
];
