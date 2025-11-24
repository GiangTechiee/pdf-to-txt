// API Route: Get Test Result
import { NextRequest, NextResponse } from 'next/server';
import { getTestResultUseCase } from '@/modules/testSession/useCases/getTestResultUseCase';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ code: string }> }
) {
    try {
        const { code } = await params;
        const testCode = code;

        // Execute use case
        const result = await getTestResultUseCase.execute({ testCode });

        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error('Get test result error:', error);

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Failed to get test result',
            },
            { status: 400 }
        );
    }
}
