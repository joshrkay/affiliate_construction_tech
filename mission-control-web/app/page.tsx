"use client";

import { useEffect, useRef, useState } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import CronCalendar from '../components/CronCalendar';
import ActivityFeed from '../components/ActivityFeed';
import ScheduledTasksView from '../components/ScheduledTasksView';
import ProjectsView from '../components/ProjectsView';
import MemoryView from '../components/MemoryView';
import DocsView from '../components/DocsView';
import TeamView from '../components/TeamView';
import OfficeView from '../components/OfficeView';
import ExecutionProtocol from '../components/ExecutionProtocol';
import { initialProjects, initialReferences, initialTasks } from '../lib/mission-data';

type View = 'overview' | 'scheduled' | 'projects' | 'memory' | 'docs' | 'team' | 'office';

export default function Page() {
  const [view, setView] = useState<View>('overview');
  const [tasks, setTasks] = useState(initialTasks);
  const [projects, setProjects] = useState(initialProjects);
  const [references, setReferences] = useState(initialReferences);
  const [loaded, setLoaded] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch('/api/mission-data')
      .then((r) => r.json())
      .then((d) => {
        setProjects(d.projects ?? initialProjects);
        setTasks(d.tasks ?? initialTasks);
        setReferences(d.references ?? initialReferences);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(() => {
      fetch('/api/mission-data', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ projects, tasks, references }),
      }).catch(() => null);
    }, 350);

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [projects, tasks, references, loaded]);

  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <div>
          <h1>Mission Control</h1>
          <p className="muted">Website + Content operations center</p>
          <p style={{ marginTop: 6, fontSize: 13, color: '#c7d2fe' }}>
            We are an autonomous 24/7 organization delivering customer value through continuous improvement and execution.
          </p>
        </div>
        <div className="muted">Style: Linear-inspired</div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={() => setView('overview')}>Overview</button>
        <button onClick={() => setView('projects')}>Projects</button>
        <button onClick={() => setView('scheduled')}>Scheduled Tasks</button>
        <button onClick={() => setView('memory')}>Memory</button>
        <button onClick={() => setView('docs')}>Docs</button>
        <button onClick={() => setView('team')}>Team</button>
        <button onClick={() => setView('office')}>Office</button>
      </div>

      {view === 'overview' ? (
        <div className="grid">
          <KanbanBoard tasks={tasks} setTasks={setTasks} projects={projects} />
          <div style={{ display: 'grid', gap: 16 }}>
            <ExecutionProtocol />
            <ActivityFeed />
            <CronCalendar />
          </div>
        </div>
      ) : view === 'projects' ? (
        <ProjectsView projects={projects} tasks={tasks} references={references} setReferences={setReferences} />
      ) : view === 'memory' ? (
        <MemoryView />
      ) : view === 'docs' ? (
        <DocsView projects={projects} setReferences={setReferences} />
      ) : view === 'team' ? (
        <TeamView />
      ) : view === 'office' ? (
        <OfficeView />
      ) : (
        <ScheduledTasksView />
      )}
    </main>
  );
}
