"use client";

import { useMemo, useState } from 'react';
import { sampleActivity, type ActivityItem } from '../lib/activity';

const statusDot: Record<ActivityItem['status'], string> = {
  working: '#2563eb',
  blocked: '#dc2626',
  completed: '#16a34a',
};

export default function ActivityFeed() {
  const [filter, setFilter] = useState<'all' | ActivityItem['status']>('all');

  const items = useMemo(
    () => (filter === 'all' ? sampleActivity : sampleActivity.filter((i) => i.status === filter)),
    [filter]
  );

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Active Activity Feed</h2>
          <p className="muted">Live-style pulse to keep tabs on who is doing what now.</p>
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
          <option value="all">All</option>
          <option value="working">Working</option>
          <option value="blocked">Blocked</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
        {!items.length && <div className="muted">No live activity loaded yet.</div>}
        {items.map((item) => (
          <div className="feed-item" key={item.id}>
            <span className="dot" style={{ background: statusDot[item.status] }} />
            <div>
              <div className="ticket-title">
                {item.agent} • {item.project}
              </div>
              <div className="ticket-meta">{item.action}</div>
            </div>
            <div className="muted" style={{ marginLeft: 'auto' }}>
              {item.minutesAgo}m ago
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
