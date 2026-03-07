import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

const WORKSPACE = '/Users/macmini/.openclaw/workspace-henry';
const ALLOWED_EXT = new Set(['.md', '.txt', '.csv']);
const SKIP_DIRS = new Set(['.git', 'node_modules', '.next']);

type DocItem = {
  id: string;
  path: string;
  name: string;
  ext: string;
  category: string;
  size: number;
  mtimeMs: number;
};

function categorize(p: string): string {
  const lower = p.toLowerCase();
  if (lower.includes('/memory/')) return 'Memory';
  if (lower.includes('/deliverables/')) return 'Deliverables';
  if (lower.includes('mission_control')) return 'Ops';
  if (lower.endsWith('memory.md')) return 'Long-Term';
  if (lower.includes('brief')) return 'Content';
  if (lower.includes('checklist') || lower.includes('qa')) return 'QA';
  return 'Other';
}

async function walk(dir: string, out: DocItem[]) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const abs = path.join(dir, e.name);
    const rel = path.relative(WORKSPACE, abs);

    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      await walk(abs, out);
      continue;
    }

    const ext = path.extname(e.name).toLowerCase();
    if (!ALLOWED_EXT.has(ext)) continue;

    const st = await fs.stat(abs);
    out.push({
      id: rel,
      path: rel,
      name: e.name,
      ext,
      category: categorize(rel),
      size: st.size,
      mtimeMs: st.mtimeMs,
    });
  }
}

export async function GET() {
  try {
    const items: DocItem[] = [];
    await walk(WORKSPACE, items);
    items.sort((a, b) => b.mtimeMs - a.mtimeMs);
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
