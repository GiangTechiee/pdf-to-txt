// API Route: Start Test
import { NextRequest, NextResponse } from 'next/server';
import { startTestUseCase } from '@/modules/testSession/useCases/startTestUseCase';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const testCode = code;

    // Execute use case
    const result = await startTestUseCase.execute({ testCode });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Start test error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to start test',
      },
      { status: 400 }
    );
  }
}
