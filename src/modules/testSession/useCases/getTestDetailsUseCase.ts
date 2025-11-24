// Use Case: Get Test Details (for monitoring)
import { testSessionRepository } from '../testSessionRepository';
import { testLogRepository } from '../testLogRepository';

export interface GetTestDetailsInput {
  testSessionId: string;
}

export interface GetTestDetailsOutput {
  testSession: {
    id: string;
    testCode: string;
    status: string;
    totalQuestions: number;
    timeLimitSeconds: number;
    startedAt?: Date;
    finishedAt?: Date;
    correctCount?: number;
    score?: number;
  };
  candidate: {
    fullName?: string;
    email?: string;
    positionApplied?: string;
    cvSummary?: string;
  };
  categories: Array<{
    categoryId: string;
    categoryName: string;
    weight: number;
  }>;
  progress: {
    answeredCount: number;
    totalQuestions: number;
    percentage: number;
  };
  logs: Array<{
    eventType: string;
    eventData: any;
    createdAt: Date;
  }>;
}

export class GetTestDetailsUseCase {
  async execute(input: GetTestDetailsInput): Promise<GetTestDetailsOutput> {
    const { testSessionId } = input;

    // Get test session with all relations
    const testSession = await testSessionRepository.findById(testSessionId);

    if (!testSession) {
      throw new Error('Test session not found');
    }

    // Get logs
    const logs = await testLogRepository.getLogsByTestSession(testSessionId);

    // Calculate progress
    const answeredCount = testSession.testSessionQuestions.filter(
      (q) => q.selectedOption !== null
    ).length;

    return {
      testSession: {
        id: testSession.id,
        testCode: testSession.testCode,
        status: testSession.status,
        totalQuestions: testSession.totalQuestions,
        timeLimitSeconds: testSession.timeLimitSeconds,
        startedAt: testSession.startedAt || undefined,
        finishedAt: testSession.finishedAt || undefined,
        correctCount: testSession.correctCount || undefined,
        score: testSession.score || undefined,
      },
      candidate: {
        fullName: testSession.candidate.fullName || undefined,
        email: testSession.candidate.email || undefined,
        positionApplied: testSession.candidate.positionApplied || undefined,
        cvSummary: testSession.candidate.cvSummary || undefined,
      },
      categories: testSession.testSessionCategories.map((tsc) => ({
        categoryId: tsc.categoryId,
        categoryName: tsc.category.name,
        weight: tsc.weight,
      })),
      progress: {
        answeredCount,
        totalQuestions: testSession.totalQuestions,
        percentage: Math.round((answeredCount / testSession.totalQuestions) * 100),
      },
      logs: logs.map((log) => ({
        eventType: log.eventType,
        eventData: log.eventData,
        createdAt: log.createdAt,
      })),
    };
  }
}

export const getTestDetailsUseCase = new GetTestDetailsUseCase();
