import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextRequest, NextResponse } from 'next/server';

const WORKSPACE = '/Users/macmini/.openclaw/workspace-henry';

function resolveAllowed(file: string) {
  if (file === 'MEMORY.md') return path.join(WORKSPACE, 'MEMORY.md');
  if (/^memory\/\d{4}-\d{2}-\d{2}\.md$/.test(file)) return path.join(WORKSPACE, file);
  return null;
}

export async function GET(req: NextRequest) {
  const file = req.nextUrl.searchParams.get('file') || '';
  const resolved = resolveAllowed(file);
  if (!resolved) return NextResponse.json({ content: '', error: 'invalid_file' }, { status: 400 });

  try {
    const content = await fs.readFile(resolved, 'utf8');
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ content: '' });
  }
}
