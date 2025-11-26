import { NextResponse } from 'next/server';
import { defaultConfig } from '@/lib/config';

export async function GET() {
  // In production, this could fetch from a database or CMS
  return NextResponse.json(defaultConfig);
}

