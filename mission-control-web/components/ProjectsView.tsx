"use client";

import { FormEvent, useMemo, useState } from 'react';
import type { Project, ProjectReference, Task, TaskStatus } from '../lib/types';

const statuses: TaskStatus[] = ['todo', 'progress', 'review', 'done'];

function label(s: TaskStatus) {
  if (s === 'todo') return 'Backlog';
  if (s === 'progress') return 'In Progress';
  if (s === 'review') return 'Review';
  return 'Done';
}

export default function ProjectsView({
  projects,
  tasks,
  references,
  setReferences,
}: {
  projects: Project[];
  tasks: Task[];
  references: ProjectReference[];
  setReferences: React.Dispatch<React.SetStateAction<ProjectReference[]>>;
}) {
  const [draft, setDraft] = useState({
    projectId: projects[0]?.id ?? 'p1',
    kind: 'document' as ProjectReference['kind'],
    label: '',
    url: '',
  });

  const refsByProject = useMemo(() => {
    const out: Record<string, ProjectReference[]> = {};
    references.forEach((r) => {
      out[r.projectId] = out[r.projectId] || [];
      out[r.projectId].push(r);
    });
    return out;
  }, [references]);

  const addRef = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.label.trim() || !draft.url.trim()) return;
    setReferences((prev) => [
      {
        id: crypto.randomUUID(),
        projectId: draft.projectId,
        kind: draft.kind,
        label: draft.label.trim(),
        url: draft.url.trim(),
      },
      ...prev,
    ]);
    setDraft((d) => ({ ...d, label: '', url: '' }));
  };

  return (
    <div className="card">
      <h2>Projects</h2>
      <p className="muted">Tasks grouped by project + linked memories/documents.</p>

      <form className="create-task" onSubmit={addRef} style={{ marginTop: 10 }}>
        <select value={draft.projectId} onChange={(e) => setDraft((d) => ({ ...d, projectId: e.target.value }))}>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          value={draft.kind}
          onChange={(e) => setDraft((d) => ({ ...d, kind: e.target.value as ProjectReference['kind'] }))}
        >
          <option value="memory">Memory</option>
          <option value="document">Document</option>
          <option value="link">Link</option>
        </select>
        <input placeholder="Label" value={draft.label} onChange={(e) => setDraft((d) => ({ ...d, label: e.target.value }))} />
        <input placeholder="URL or path" value={draft.url} onChange={(e) => setDraft((d) => ({ ...d, url: e.target.value }))} />
        <button type="submit">Attach</button>
      </form>

      <div className="projects-grid">
        {projects.map((p) => {
          const projectTasks = tasks.filter((t) => t.projectId === p.id);
          const total = projectTasks.length;
          const done = projectTasks.filter((t) => t.status === 'done').length;
          const progressPct = total ? Math.round((done / total) * 100) : 0;
          const owner = projectTasks[0]?.owner || 'Unassigned';
          const refs = refsByProject[p.id] || [];

          return (
            <div className="project-card" key={p.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <div className="ticket-title">{p.name}</div>
                <span className={`status-pill ${p.status === 'on-track' ? 'ok' : p.status === 'at-risk' ? 'warn' : 'off'}`}>
                  {p.status}
                </span>
              </div>

              <div className="ticket-meta" style={{ marginTop: 6 }}>
                {total} tasks • {done} done • owner: {owner}
              </div>

              <div className="progress-track" style={{ marginTop: 8 }}>
                <div className="progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
              <div className="muted" style={{ marginTop: 4 }}>{progressPct}% complete</div>

              <div className="bubble-row">
                {statuses.map((s) => {
                  const count = projectTasks.filter((t) => t.status === s).length;
                  return (
                    <span key={s} className={`bubble bubble-${s}`}>
                      {label(s)}: {count}
                    </span>
                  );
                })}
              </div>

              <div style={{ marginTop: 10 }}>
                <div className="muted" style={{ marginBottom: 6 }}>Associated memory/docs</div>
                {refs.length ? (
                  refs.map((r) => (
                    <div className="ticket-meta" key={r.id}>
                      <span className="bubble" style={{ marginRight: 6 }}>{r.kind}</span>
                      <a href={r.url} target="_blank" rel="noreferrer" style={{ color: '#93c5fd' }}>
                        {r.label}
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="muted">No links attached yet.</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
