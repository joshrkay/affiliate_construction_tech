import { NextRequest, NextResponse } from 'next/server';
import { readMissionData, writeMissionData } from '../../../lib/store';

export async function GET() {
  const data = await readMissionData();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await writeMissionData({
      projects: body.projects ?? [],
      tasks: body.tasks ?? [],
      references: body.references ?? [],
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
