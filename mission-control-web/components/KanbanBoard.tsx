"use client";

import { Dispatch, FormEvent, SetStateAction, useMemo, useState } from 'react';
import type { Project, Task, TaskStatus } from '../lib/types';

const emptyTaskDraft = {
  title: '',
  owner: 'Henry',
  projectId: 'p1',
  estimateHours: 2,
  remainingHours: 2,
  currentWork: '',
  details: '',
  status: 'todo' as TaskStatus,
};

const columns: { key: TaskStatus; label: string }[] = [
  { key: 'todo', label: 'Backlog' },
  { key: 'progress', label: 'In Progress' },
  { key: 'review', label: 'Review' },
  { key: 'done', label: 'Done' },
];

export default function KanbanBoard({
  tasks,
  setTasks,
  projects,
}: {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  projects: Project[];
}) {
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [draft, setDraft] = useState(emptyTaskDraft);
  const [showCreate, setShowCreate] = useState(false);

  const scopedTasks = useMemo(
    () => (projectFilter === 'all' ? tasks : tasks.filter((t) => t.projectId === projectFilter)),
    [tasks, projectFilter]
  );

  const grouped = useMemo(() => {
    return columns.reduce((acc, col) => {
      acc[col.key] = scopedTasks.filter((t) => t.status === col.key);
      return acc;
    }, {} as Record<TaskStatus, Task[]>);
  }, [scopedTasks]);

  const moveTask = (id: string, dir: -1 | 1) => {
    const order: TaskStatus[] = ['todo', 'progress', 'review', 'done'];
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const idx = order.indexOf(t.status);
        const next = Math.min(3, Math.max(0, idx + dir));
        return { ...t, status: order[next] };
      })
    );
  };

  const getProjectName = (projectId: string) => projects.find((p) => p.id === projectId)?.name ?? 'Unknown';

  const createTask = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    const t: Task = {
      id: crypto.randomUUID(),
      projectId: draft.projectId,
      title: draft.title.trim(),
      owner: draft.owner.trim() || 'Unassigned',
      status: draft.status,
      estimateHours: Number(draft.estimateHours) || 0,
      remainingHours: Number(draft.remainingHours) || 0,
      currentWork: draft.currentWork.trim() || 'Not started',
      details: draft.details.trim() || 'No details',
      eta: 'TBD',
    };
    setTasks((prev) => [t, ...prev]);
    setDraft(emptyTaskDraft);
    setShowCreate(false);
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
        <div>
          <h2>Task Board</h2>
          <p className="muted">Tasks are associated to projects with estimates + remaining time.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
            <option value="all">All projects</option>
            {projects.map((p) => (
              <option value={p.id} key={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <button onClick={() => setShowCreate((v) => !v)}>{showCreate ? 'Close' : '+ Create Task'}</button>
        </div>
      </div>

      {showCreate && (
        <form className="create-task" onSubmit={createTask}>
          <input
            placeholder="Task title"
            value={draft.title}
            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
          />
          <input
            placeholder="Owner"
            value={draft.owner}
            onChange={(e) => setDraft((d) => ({ ...d, owner: e.target.value }))}
          />
          <select value={draft.projectId} onChange={(e) => setDraft((d) => ({ ...d, projectId: e.target.value }))}>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <select value={draft.status} onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value as TaskStatus }))}>
            <option value="todo">Backlog</option>
            <option value="progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
          <input
            type="number"
            min={0}
            placeholder="Estimate (h)"
            value={draft.estimateHours}
            onChange={(e) => setDraft((d) => ({ ...d, estimateHours: Number(e.target.value) }))}
          />
          <input
            type="number"
            min={0}
            placeholder="Remaining (h)"
            value={draft.remainingHours}
            onChange={(e) => setDraft((d) => ({ ...d, remainingHours: Number(e.target.value) }))}
          />
          <input
            placeholder="Current work"
            value={draft.currentWork}
            onChange={(e) => setDraft((d) => ({ ...d, currentWork: e.target.value }))}
          />
          <input
            placeholder="Details"
            value={draft.details}
            onChange={(e) => setDraft((d) => ({ ...d, details: e.target.value }))}
          />
          <button type="submit">Add task</button>
        </form>
      )}

      <div className="project-strip">
        {projects.map((p) => (
          <div className="project-pill" key={p.id}>
            <strong>{p.name}</strong>
            <span className="muted"> • {p.status}</span>
          </div>
        ))}
      </div>

      <div className="kanban">
        {columns.map((col) => (
          <div key={col.key} className="column">
            <h3>{col.label}</h3>
            {!grouped[col.key]?.length && <div className="muted">No live tasks loaded yet.</div>}
            {grouped[col.key]?.map((task) => (
              <div className={`ticket ${task.status}`} key={task.id}>
                <div className="ticket-title">{task.title}</div>
                <div className="ticket-meta">{getProjectName(task.projectId)} • {task.owner}</div>
                <div className="ticket-meta">Estimate: {task.estimateHours}h • Remaining: {task.remainingHours}h</div>
                <div className="ticket-meta">Now: {task.currentWork}</div>
                <div className="ticket-meta">Details: {task.details}</div>
                <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                  <button onClick={() => moveTask(task.id, -1)}>{'←'}</button>
                  <button onClick={() => moveTask(task.id, +1)}>{'→'}</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
