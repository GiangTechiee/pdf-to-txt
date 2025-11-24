// API Route: Get Test Details (for monitoring)
import { NextRequest, NextResponse } from 'next/server';
import { getTestDetailsUseCase } from '@/modules/testSession/useCases/getTestDetailsUseCase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const testSessionId = id;

    // Execute use case
    const result = await getTestDetailsUseCase.execute({ testSessionId });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Get test details error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get test details',
      },
      { status: 400 }
    );
  }
}