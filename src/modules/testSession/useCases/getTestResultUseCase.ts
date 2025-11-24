// Use Case: Get Test Result
import { testSessionRepository } from '../testSessionRepository';

export interface GetTestResultInput {
    testCode: string;
}

export interface GetTestResultOutput {
    testSessionId: string;
    candidateInfo: {
        fullName?: string;
        email?: string;
    };
    score: number;
    correctCount: number;
    totalQuestions: number;
    status: string;
    finishedAt?: Date;
}

export class GetTestResultUseCase {
    async execute(input: GetTestResultInput): Promise<GetTestResultOutput> {
        const { testCode } = input;

        // Find test session
        const testSession = await testSessionRepository.findByTestCode(testCode);

        if (!testSession) {
            throw new Error('Test not found');
        }

        // Check if test is completed or expired
        if (testSession.status !== 'completed' && testSession.status !== 'expired') {
            throw new Error('Test results are not available yet');
        }

        return {
            testSessionId: testSession.id,
            candidateInfo: {
                fullName: testSession.candidate.fullName || undefined,
                email: testSession.candidate.email || undefined,
            },
            score: testSession.score || 0,
            correctCount: testSession.correctCount || 0,
            totalQuestions: testSession.totalQuestions,
            status: testSession.status,
            finishedAt: testSession.finishedAt || undefined,
        };
    }
}

export const getTestResultUseCase = new GetTestResultUseCase();
