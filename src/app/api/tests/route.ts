import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    // Verify authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);
    const userId = payload.userId as string;

    // Get search query from URL
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('search');

    // Build where clause
    const where: any = {
      createdBy: userId, // Only show tests created by this user
    };

    if (searchQuery) {
      where.OR = [
        { testCode: { contains: searchQuery, mode: 'insensitive' } },
        { candidate: { fullName: { contains: searchQuery, mode: 'insensitive' } } },
        { candidate: { email: { contains: searchQuery, mode: 'insensitive' } } },
        { candidate: { positionApplied: { contains: searchQuery, mode: 'insensitive' } } },
      ];
    }

    // Fetch test sessions
    const tests = await prisma.testSession.findMany({
      where,
      include: {
        candidate: {
          select: {
            fullName: true,
            email: true,
            positionApplied: true,
          },
        },
        creator: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ tests });
  } catch (error) {
    console.error('Fetch tests error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tests' },
      { status: 500 }
    );
  }
}
