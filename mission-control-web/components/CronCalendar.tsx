"use client";

import { useEffect, useMemo, useState } from 'react';
import type { CronJob } from '../lib/types';

type RecentWork = { id: string; when: number; subject: string };

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function toDateSafe(v?: string) {
  const d = v ? new Date(v) : new Date();
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export default function CronCalendar() {
  const [jobs, setJobs] = useState<CronJob[]>([]);
  const [recentWork, setRecentWork] = useState<RecentWork[]>([]);
  const [view, setView] = useState<'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    fetch('/api/cron-jobs')
      .then((r) => r.json())
      .then((d) => setJobs(d.jobs ?? []))
      .catch(() => setJobs([]));

    fetch('/api/recent-work')
      .then((r) => r.json())
      .then((d) => setRecentWork(d.items ?? []))
      .catch(() => setRecentWork([]));
  }, []);

  const startOfWeek = useMemo(() => {
    const now = new Date();
    const s = new Date(now);
    s.setDate(now.getDate() - now.getDay());
    s.setHours(0, 0, 0, 0);
    return s;
  }, []);

  const weekDates = useMemo(
    () => Array.from({ length: 7 }, (_, i) => new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i)),
    [startOfWeek]
  );

  const monthDates = useMemo(() => {
    const now = new Date();
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => new Date(now.getFullYear(), now.getMonth(), i + 1));
  }, []);

  const jobsByDateKey = useMemo(() => {
    const map: Record<string, CronJob[]> = {};
    jobs.forEach((j) => {
      const d = toDateSafe(j.nextRun);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      map[key] = map[key] || [];
      map[key].push(j);
    });
    return map;
  }, [jobs]);

  const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  const selectedJobs = useMemo(() => jobsByDateKey[dayKey(selectedDate)] || [], [jobsByDateKey, selectedDate]);

  const renderDay = (d: Date, label?: string) => {
    const key = dayKey(d);
    const dayJobs = jobsByDateKey[key] || [];
    const isSelected = dayKey(selectedDate) === key;
    return (
      <button key={key} className={`day day-btn ${isSelected ? 'day-active' : ''}`} onClick={() => setSelectedDate(d)}>
        <div className="day-label">{label || `${d.getDate()}`}</div>
        {dayJobs.length ? (
          dayJobs.slice(0, 2).map((job) => (
            <div className="pill" key={job.id} title={job.id}>
              {job.name}
            </div>
          ))
        ) : (
          <span className="muted">No jobs</span>
        )}
      </button>
    );
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Cron Calendar</h2>
          <p className="muted">Week/month views + day drill-down for scheduled jobs.</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => setView('week')}>Week</button>
          <button onClick={() => setView('month')}>Month</button>
        </div>
      </div>

      <div className={view === 'week' ? 'calendar' : 'calendar month'}>
        {view === 'week'
          ? weekDates.map((d) => renderDay(d, weekDays[d.getDay()]))
          : monthDates.map((d) => renderDay(d, `${d.getDate()}`))}
      </div>

      <div style={{ marginTop: 12 }}>
        <h3 style={{ marginBottom: 8 }}>Day Drill-down: {selectedDate.toDateString()}</h3>
        {selectedJobs.length ? (
          selectedJobs.map((job) => (
            <div className="feed-item" key={job.id}>
              <span className="dot" style={{ background: '#2563eb' }} />
              <div>
                <div className="ticket-title">{job.name}</div>
                <div className="ticket-meta">
                  {job.schedule} {job.nextRun ? `• next ${new Date(job.nextRun).toLocaleTimeString()}` : ''}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="muted">No scheduled jobs for this day.</div>
        )}
      </div>

      <div style={{ marginTop: 14 }}>
        <h3 style={{ marginBottom: 8 }}>Recent Tasks I’ve Been Doing</h3>
        {recentWork.length ? (
          recentWork.map((w) => (
            <div className="feed-item" key={w.id}>
              <span className="dot" style={{ background: '#16a34a' }} />
              <div>
                <div className="ticket-title">{w.subject}</div>
                <div className="ticket-meta">Commit {w.id} • {new Date(w.when).toLocaleString()}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="muted">No recent work items found.</div>
        )}
      </div>
    </div>
  );
}
