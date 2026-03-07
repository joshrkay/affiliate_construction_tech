"use client";

import { useEffect, useMemo, useState } from 'react';
import type { CronJob } from '../lib/types';

export default function ScheduledTasksView() {
  const [jobs, setJobs] = useState<CronJob[]>([]);

  useEffect(() => {
    fetch('/api/cron-jobs')
      .then((r) => r.json())
      .then((d) => setJobs(d.jobs ?? []))
      .catch(() => setJobs([]));
  }, []);

  const sorted = useMemo(() => {
    return [...jobs].sort((a, b) => {
      const at = a.nextRun ? new Date(a.nextRun).getTime() : Number.MAX_SAFE_INTEGER;
      const bt = b.nextRun ? new Date(b.nextRun).getTime() : Number.MAX_SAFE_INTEGER;
      return at - bt;
    });
  }, [jobs]);

  return (
    <div className="card">
      <h2>Scheduled Tasks</h2>
      <p className="muted">Operational cron jobs and their upcoming run windows.</p>

      <div className="scheduled-grid head">
        <div>Name</div>
        <div>Schedule</div>
        <div>Next Run</div>
        <div>Status</div>
      </div>

      {sorted.length ? (
        sorted.map((job) => (
          <div className="scheduled-grid row" key={job.id}>
            <div>{job.name}</div>
            <div className="muted">{job.schedule}</div>
            <div className="muted">{job.nextRun ? new Date(job.nextRun).toLocaleString() : 'n/a'}</div>
            <div>
              <span className={`status-pill ${job.enabled ? 'ok' : 'off'}`}>{job.enabled ? 'Enabled' : 'Disabled'}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="muted" style={{ marginTop: 10 }}>
          No scheduled tasks found.
        </div>
      )}
    </div>
  );
}
