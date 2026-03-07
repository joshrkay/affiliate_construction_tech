import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { NextResponse } from 'next/server';

const execAsync = promisify(exec);

export async function GET() {
  try {
    const { stdout } = await execAsync('git -C /Users/macmini/.openclaw/workspace-henry log --pretty=format:"%h|%ct|%s" -n 12', {
      timeout: 8000,
      maxBuffer: 1024 * 1024,
    });

    const items = stdout
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [sha, ts, subject] = line.split('|');
        return {
          id: sha,
          when: Number(ts) * 1000,
          subject,
        };
      });

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
