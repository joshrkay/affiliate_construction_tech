import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextRequest, NextResponse } from 'next/server';

const WORKSPACE = '/Users/macmini/.openclaw/workspace-henry';
const ALLOWED_EXT = new Set(['.md', '.txt', '.csv']);

function resolveAllowed(relPath: string): string | null {
  const normalized = path.normalize(relPath).replace(/^\/+/, '');
  const abs = path.join(WORKSPACE, normalized);
  if (!abs.startsWith(WORKSPACE)) return null;

  const ext = path.extname(abs).toLowerCase();
  if (!ALLOWED_EXT.has(ext)) return null;

  return abs;
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
