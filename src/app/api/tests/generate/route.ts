// API Route: Generate Test from CV
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { generateTestUseCase } from '@/modules/testSession/useCases/generateTestUseCase';
import { generateTestSchema } from '@/lib/validators/test';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication and get user ID
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);
    const userId = payload.userId as string;

    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please login again.' },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const pdfFile = formData.get('pdfFile') as File;
    const jdText = formData.get('jdText') as string | null;
    const totalQuestions = formData.get('totalQuestions');
    const timeLimitMinutes = formData.get('timeLimitMinutes');

    // Validate PDF file
    if (!pdfFile) {
      return NextResponse.json(
        { error: 'PDF file is required' },
        { status: 400 }
      );
    }

    if (pdfFile.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'File must be a PDF' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await pdfFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validate input
    const validatedInput = generateTestSchema.parse({
      jdText: jdText || undefined,
      totalQuestions: totalQuestions ? parseInt(totalQuestions as string) : 30,
      timeLimitMinutes: timeLimitMinutes ? parseInt(timeLimitMinutes as string) : 15,
    });

    // Execute use case
    const result = await generateTestUseCase.execute({
      pdfFile: buffer,
      jdText: validatedInput.jdText,
      totalQuestions: validatedInput.totalQuestions,
      timeLimitMinutes: validatedInput.timeLimitMinutes,
      createdBy: userId,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Generate test error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to generate test',
      },
      { status: 500 }
    );
  }
}
