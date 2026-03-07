"use client";

import { useState } from 'react';
import { teamAgents } from '../lib/team-data';

type Draft = {
  to: string;
  title: string;
  acceptance: string;
  priority: 'P1' | 'P2' | 'P3';
};

export default function TeamView() {
  const [draft, setDraft] = useState<Draft | null>(null);

  const startDraft = (name: string, role: string) => {
    setDraft({
      to: name,
      title: `Task for ${name} (${role})`,
      acceptance: '- Deliverable:\n- Definition of done:\n- ETA:\n- Risks/Blockers:',
      priority: 'P1',
    });
  };

  const copyTemplate = async () => {
    if (!draft) return;
    const text = `To: ${draft.to}\nPriority: ${draft.priority}\nTitle: ${draft.title}\n\nAcceptance Criteria:\n${draft.acceptance}`;
    try {
      await navigator.clipboard.writeText(text);
      alert('Delegation template copied.');
    } catch {
      alert('Could not copy to clipboard.');
    }
  };

  return (
    <div className="card">
      <h2>Meet the Team</h2>
      <p className="muted">Roles, skills, device, current model, and active work context.</p>

      {draft && (
        <div className="draft-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <strong>Send task to {draft.to}</strong>
            <button onClick={() => setDraft(null)}>Close</button>
          </div>
          <div className="create-task" style={{ marginTop: 8 }}>
            <input value={draft.to} onChange={(e) => setDraft((d) => (d ? { ...d, to: e.target.value } : d))} />
            <select
              value={draft.priority}
              onChange={(e) => setDraft((d) => (d ? { ...d, priority: e.target.value as Draft['priority'] } : d))}
            >
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
            </select>
            <input
              value={draft.title}
              onChange={(e) => setDraft((d) => (d ? { ...d, title: e.target.value } : d))}
              style={{ gridColumn: 'span 2' }}
            />
            <input
              value={draft.acceptance}
              onChange={(e) => setDraft((d) => (d ? { ...d, acceptance: e.target.value } : d))}
              style={{ gridColumn: '1 / -2' }}
            />
            <button type="button" onClick={copyTemplate}>
              Copy template
            </button>
          </div>
        </div>
      )}

      <div className="team-grid">
        {teamAgents.map((a) => (
          <div key={a.id} className="team-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <div>
                <div className="ticket-title">{a.name}</div>
                <div className="ticket-meta">{a.role}</div>
              </div>
              <span className={`status-pill ${a.status === 'online' ? 'ok' : a.status === 'busy' ? 'warn' : 'off'}`}>
                {a.status}
              </span>
            </div>

            <div className="ticket-meta" style={{ marginTop: 8 }}>
              Device: {a.device}
            </div>
            <div className="ticket-meta">Model: {a.model}</div>
            <div className="ticket-meta">Current: {a.currentWork}</div>

            <div className="bubble-row" style={{ marginTop: 8 }}>
              {a.skills.map((s) => (
                <span key={s} className="bubble">{s}</span>
              ))}
            </div>

            <div style={{ marginTop: 8 }}>
              <button onClick={() => startDraft(a.name, a.role)}>Send task to…</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
