// API Route: Answer Question
import { NextRequest, NextResponse } from 'next/server';
import { answerQuestionUseCase } from '@/modules/testSession/useCases/answerQuestionUseCase';
import { CorrectOption } from '@prisma/client';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const testCode = code;
    const body = await request.json();

    const { questionId, selectedOption } = body;

    if (!questionId) {
      return NextResponse.json(
        { error: 'questionId is required' },
        { status: 400 }
      );
    }

    // Execute use case
    const result = await answerQuestionUseCase.execute({
      testCode,
      questionId: parseInt(questionId),
      selectedOption: selectedOption as CorrectOption | null,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Answer question error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to save answer',
      },
      { status: 400 }
    );
  }
}
