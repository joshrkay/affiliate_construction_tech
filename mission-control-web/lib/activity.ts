export interface ActivityItem {
  id: string;
  agent: string;
  project: string;
  action: string;
  status: 'working' | 'blocked' | 'completed';
  minutesAgo: number;
}

export const sampleActivity: ActivityItem[] = [];
