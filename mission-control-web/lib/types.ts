export type TaskStatus = 'todo' | 'progress' | 'review' | 'done';

export interface Project {
  id: string;
  name: string;
  status: 'on-track' | 'at-risk' | 'blocked';
}

export interface ProjectReference {
  id: string;
  projectId: string;
  kind: 'memory' | 'document' | 'link';
  label: string;
  url: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  owner: string;
  status: TaskStatus;
  estimateHours: number;
  remainingHours: number;
  currentWork: string;
  details: string;
  eta?: string;
}

export interface CronJob {
  id: string;
  name: string;
  enabled: boolean;
  schedule: string;
  nextRun?: string;
}
