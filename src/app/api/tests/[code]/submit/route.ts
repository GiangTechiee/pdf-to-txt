// API Route: Submit Test
import { NextRequest, NextResponse } from 'next/server';
import { submitTestUseCase } from '@/modules/testSession/useCases/submitTestUseCase';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const testCode = code;

    // Execute use case
    const result = await submitTestUseCase.execute({ testCode });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Submit test error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to submit test',
      },
      { status: 400 }
    );
  }
}
