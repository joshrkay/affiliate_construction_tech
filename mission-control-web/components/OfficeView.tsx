"use client";

import { useMemo, useState } from 'react';
import { teamAgents } from '../lib/team-data';

const positions: Record<string, { x: number; y: number }> = {
  henry: { x: 50, y: 16 },
  lisbeth: { x: 20, y: 34 },
  leslie: { x: 34, y: 34 },
  don: { x: 48, y: 34 },
  elliot: { x: 62, y: 34 },
  spock: { x: 76, y: 34 },
  dexter: { x: 22, y: 56 },
  olivia: { x: 38, y: 56 },
  marty: { x: 54, y: 56 },
  donna: { x: 70, y: 56 },
};

const sampleEvents = [
  'Lisbeth updated keyword validation set',
  'Elliot pushed template layout improvements',
  'Dexter reviewed QA gate checklist changes',
  'Olivia drafted metadata/schema refinements',
  'Marty posted KPI baseline adjustments',
];

function AgentSprite({
  id,
  name,
  status,
  model,
  currentWork,
  onHover,
}: {
  id: string;
  name: string;
  status: string;
  model: string;
  currentWork: string;
  onHover: (v: null | { name: string; status: string; model: string; currentWork: string; x: number; y: number }) => void;
}) {
  const p = positions[id] || { x: 10, y: 10 };
  const working = status === 'online' || status === 'busy';

  return (
    <div
      className={`agent-sprite ${working ? 'working' : 'away'}`}
      style={{ left: `${p.x}%`, top: `${p.y}%` }}
      onMouseEnter={() => onHover({ name, status, model, currentWork, x: p.x, y: p.y })}
      onMouseLeave={() => onHover(null)}
    >
      <div className="sprite-head" />
      <div className="sprite-body" />
      <div className="sprite-label">{name}</div>
    </div>
  );
}

export default function OfficeView() {
  const [hovered, setHovered] = useState<null | {
    name: string;
    status: string;
    model: string;
    currentWork: string;
    x: number;
    y: number;
  }>(null);

  const activeCount = useMemo(() => teamAgents.filter((a) => a.status !== 'blocked').length, []);

  return (
    <div className="card office-v2">
      <div className="office-topbar">
        <h2>Office</h2>
        <div className="office-controls">
          <input placeholder="Search agents/tasks" />
          <button>Pause</button>
          <button>Ping Henry</button>
        </div>
      </div>
      <p className="muted">Live team floor. Hover agents to see current work details.</p>

      <div className="office-layout">
        <div className="office-main">
          <div className="office-map">
            <div className="desk" style={{ left: '16%', top: '28%' }} />
            <div className="desk" style={{ left: '30%', top: '28%' }} />
            <div className="desk" style={{ left: '44%', top: '28%' }} />
            <div className="desk" style={{ left: '58%', top: '28%' }} />
            <div className="desk" style={{ left: '72%', top: '28%' }} />
            <div className="desk" style={{ left: '18%', top: '50%' }} />
            <div className="desk" style={{ left: '34%', top: '50%' }} />
            <div className="desk" style={{ left: '50%', top: '50%' }} />
            <div className="desk" style={{ left: '66%', top: '50%' }} />

            {teamAgents.map((a) => (
              <AgentSprite
                key={a.id}
                id={a.id}
                name={a.name}
                status={a.status}
                model={a.model}
                currentWork={a.currentWork}
                onHover={setHovered}
              />
            ))}

            {hovered && (
              <div className="hover-card" style={{ left: `${Math.min(84, hovered.x + 6)}%`, top: `${Math.max(8, hovered.y - 10)}%` }}>
                <div className="ticket-title">{hovered.name}</div>
                <div className="ticket-meta">Status: {hovered.status}</div>
                <div className="ticket-meta">Model: {hovered.model}</div>
                <div className="ticket-meta">Now: {hovered.currentWork}</div>
              </div>
            )}
          </div>

          <div className="office-strip">
            {teamAgents.map((a) => (
              <div key={a.id} className="office-agent-card">
                <strong>{a.name}</strong>
                <div className="ticket-meta">{a.role}</div>
                <div className="ticket-meta">{a.currentWork}</div>
              </div>
            ))}
          </div>
        </div>

        <aside className="office-rail">
          <div className="ticket-title">Activity</div>
          <div className="ticket-meta" style={{ marginBottom: 8 }}>{activeCount}/{teamAgents.length} active</div>
          <div className="office-events">
            {sampleEvents.map((e, i) => (
              <div className="feed-item" key={i}>
                <span className="dot" style={{ background: '#60a5fa' }} />
                <div className="ticket-meta">{e}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
