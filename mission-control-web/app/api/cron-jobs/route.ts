import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { NextResponse } from 'next/server';

const execAsync = promisify(exec);

export async function GET() {
  try {
    const { stdout } = await execAsync('openclaw cron list --json', {
      cwd: process.cwd(),
      timeout: 8000,
      maxBuffer: 1024 * 1024,
    });

    const parsed = JSON.parse(stdout);
    const jobs = (parsed.jobs || []).map((j: any) => ({
      id: j.id,
      name: j.name || 'Unnamed job',
      enabled: !!j.enabled,
      schedule:
        j.schedule?.kind === 'every'
          ? `every ${Math.floor((j.schedule.everyMs || 0) / 60000)}m`
          : `${j.schedule?.expr || 'cron'}`,
      nextRun: j.state?.nextRunAtMs ? new Date(j.state.nextRunAtMs).toISOString() : undefined,
    }));

    return NextResponse.json({ jobs });
  } catch {
    return NextResponse.json({ jobs: [] });
  }
}
