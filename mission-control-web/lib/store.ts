import { promises as fs } from 'node:fs';
import path from 'node:path';
import { initialProjects, initialReferences, initialTasks } from './mission-data';
import type { Project, ProjectReference, Task } from './types';

const STORE_PATH = '/Users/macmini/.openclaw/workspace-henry/mission-control-data.json';

type MissionData = {
  projects: Project[];
  tasks: Task[];
  references: ProjectReference[];
};

const defaultData: MissionData = {
  projects: initialProjects,
  tasks: initialTasks,
  references: initialReferences,
};

export async function readMissionData(): Promise<MissionData> {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      projects: parsed.projects ?? defaultData.projects,
      tasks: parsed.tasks ?? defaultData.tasks,
      references: parsed.references ?? defaultData.references,
    };
  } catch {
    await writeMissionData(defaultData);
    return defaultData;
  }
}

export async function writeMissionData(data: MissionData): Promise<void> {
  const dir = path.dirname(STORE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), 'utf8');
}
