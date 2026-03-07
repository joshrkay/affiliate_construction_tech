import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

const WORKSPACE = '/Users/macmini/.openclaw/workspace-henry';

export async function GET() {
  try {
    const memoryDir = path.join(WORKSPACE, 'memory');
    const entries = await fs.readdir(memoryDir, { withFileTypes: true }).catch(() => []);
    const daily = entries
      .filter((e) => e.isFile() && /^\d{4}-\d{2}-\d{2}\.md$/.test(e.name))
      .map((e) => e.name)
      .sort()
      .reverse();

    const longTermPath = path.join(WORKSPACE, 'MEMORY.md');
    const longTermExists = await fs
      .stat(longTermPath)
      .then(() => true)
      .catch(() => false);

    return NextResponse.json({
      longTerm: longTermExists ? 'MEMORY.md' : null,
      daily,
    });
  } catch {
    return NextResponse.json({ longTerm: null, daily: [] });
  }
}
