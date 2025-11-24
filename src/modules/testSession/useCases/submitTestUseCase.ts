// Use Case: Submit Test
import { testSessionRepository } from '../testSessionRepository';
import { testLogRepository } from '../testLogRepository';

export interface SubmitTestInput {
  testCode: string;
}

export interface SubmitTestOutput {
  testSessionId: string;
  correctCount: number;
  totalQuestions: number;
  score: number;
  finishedAt: Date;
}

export class SubmitTestUseCase {
  async execute(input: SubmitTestInput): Promise<SubmitTestOutput> {
    const { testCode } = input;

    // Find test session
    const testSession = await testSessionRepository.findByTestCode(testCode);

    if (!testSession) {
      throw new Error('Test not found');
    }

    // Check if test is in progress
    if (testSession.status !== 'in_progress') {
      throw new Error(`Cannot submit test. Current status: ${testSession.status}`);
    }

    // Calculate results
    const results = await testSessionRepository.calculateResults(testSession.id);

    // Determine finish reason
    let finishedReason = 'Submitted by candidate';

    if (testSession.startedAt) {
      const elapsed = Date.now() - testSession.startedAt.getTime();
      const timeLimit = testSession.timeLimitSeconds * 1000;

      if (elapsed > timeLimit) {
        finishedReason = 'Time limit exceeded';
      }
    }

    // Update test session with results
    await testSessionRepository.updateStatus(testSession.id, 'completed', {
      finishedAt: new Date(),
      correctCount: results.correctCount,
      score: results.score,
      finishedReason,
    });

    // Log the submit event
    await testLogRepository.create({
      testSessionId: testSession.id,
      eventType: 'submit',
      eventData: {
        correctCount: results.correctCount,
        totalQuestions: results.totalQuestions,
        score: results.score,
        finishedReason,
        submittedAt: new Date().toISOString(),
      },
    });

    return {
      testSessionId: testSession.id,
      correctCount: results.correctCount,
      totalQuestions: results.totalQuestions,
      score: results.score,
      finishedAt: new Date(),
    };
  }
}

export const submitTestUseCase = new SubmitTestUseCase();
