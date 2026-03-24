import { NextRequest, NextResponse } from 'next/server';
import { searchContent } from '@/lib/content';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';

  const results = await searchContent(query);

  return NextResponse.json(results);
}
