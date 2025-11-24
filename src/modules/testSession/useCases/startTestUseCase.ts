// Use Case: Start Test
import { testSessionRepository } from '../testSessionRepository';
import { testLogRepository } from '../testLogRepository';

export interface StartTestInput {
  testCode: string;
}

export interface StartTestOutput {
  testSessionId: string;
  candidateInfo: {
    fullName?: string;
    email?: string;
    positionApplied?: string;
  };
  totalQuestions: number;
  timeLimitSeconds: number;
  questions: Array<{
    id: number;
    orderIndex: number;
    content: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    difficulty: string;
  }>;
}

export class StartTestUseCase {
  async execute(input: StartTestInput): Promise<StartTestOutput> {
    const { testCode } = input;

    // Find test session
    const testSession = await testSessionRepository.findByTestCode(testCode);

    if (!testSession) {
      throw new Error('Test not found');
    }

    // Check if test is in pending status
    if (testSession.status !== 'pending') {
      throw new Error(`Test cannot be started. Current status: ${testSession.status}`);
    }

    // Update status to in_progress and set startedAt
    await testSessionRepository.updateStatus(testSession.id, 'in_progress', {
      startedAt: new Date(),
    });

    // Log the start event
    await testLogRepository.create({
      testSessionId: testSession.id,
      eventType: 'start',
      eventData: {
        startedAt: new Date().toISOString(),
      },
    });

    // Get questions (without correct answers)
    const testQuestions = await testSessionRepository.getQuestionsForTest(testSession.id);

    // Map questions to output format (hide correct answers)
    const questions = testQuestions.map((tsq) => ({
      id: tsq.question.id,
      orderIndex: tsq.orderIndex,
      content: tsq.question.content,
      optionA: tsq.question.optionA,
      optionB: tsq.question.optionB,
      optionC: tsq.question.optionC,
      optionD: tsq.question.optionD,
      difficulty: tsq.question.difficulty,
    }));

    return {
      testSessionId: testSession.id,
      candidateInfo: {
        fullName: testSession.candidate.fullName || undefined,
        email: testSession.candidate.email || undefined,
        positionApplied: testSession.candidate.positionApplied || undefined,
      },
      totalQuestions: testSession.totalQuestions,
      timeLimitSeconds: testSession.timeLimitSeconds,
      questions,
    };
  }
}

export const startTestUseCase = new StartTestUseCase();
