import { NextResponse } from 'next/server';
import { generateSeed } from '@/utils/generateSeed';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userSeed = url.searchParams.get('userSeed');
  const pageNumber = url.searchParams.get('pageNumber');

  if (!userSeed || !pageNumber) {
    return NextResponse.json(
      { error: 'It is necessary to specify userSeed and pageNumber' },
      { status: 400 }
    );
  }

  try {
    const seed = await generateSeed(userSeed, parseInt(pageNumber, 10));
    return NextResponse.json({ seed });
  } catch (error) {
    console.error('Error generating seed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
