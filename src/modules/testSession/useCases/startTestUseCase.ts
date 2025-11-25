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
    selectedOption?: string;
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

    // Check if test is already completed, expired, or cancelled
    if (['completed', 'expired', 'cancelled'].includes(testSession.status)) {
      throw new Error(`Test cannot be started. Current status: ${testSession.status}`);
    }

    // If test is already in_progress (e.g., after refresh), return existing data
    if (testSession.status === 'in_progress') {
      // Calculate remaining time
      const startedAt = testSession.startedAt;
      const elapsedSeconds = startedAt 
        ? Math.floor((Date.now() - startedAt.getTime()) / 1000)
        : 0;
      const remainingSeconds = Math.max(0, testSession.timeLimitSeconds - elapsedSeconds);

      // If time expired, don't allow continuation
      if (remainingSeconds <= 0) {
        throw new Error('Test time has expired');
      }

      // Get questions with current answers
      const testQuestions = await testSessionRepository.getQuestionsForTest(testSession.id);

      const questions = testQuestions.map((tsq) => ({
        id: tsq.question.id,
        orderIndex: tsq.orderIndex,
        content: tsq.question.content,
        optionA: tsq.question.optionA,
        optionB: tsq.question.optionB,
        optionC: tsq.question.optionC,
        optionD: tsq.question.optionD,
        difficulty: tsq.question.difficulty,
        selectedOption: tsq.selectedOption || undefined,
      }));

      return {
        testSessionId: testSession.id,
        candidateInfo: {
          fullName: testSession.candidate.fullName || undefined,
          email: testSession.candidate.email || undefined,
          positionApplied: testSession.candidate.positionApplied || undefined,
        },
        totalQuestions: testSession.totalQuestions,
        timeLimitSeconds: remainingSeconds,
        questions,
      };
    }

    // If test is pending, start it normally
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
