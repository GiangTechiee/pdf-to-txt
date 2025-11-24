// Use Case: Answer Question
import { testSessionRepository } from '../testSessionRepository';
import { testLogRepository } from '../testLogRepository';
import { CorrectOption } from '@prisma/client';

export interface AnswerQuestionInput {
  testCode: string;
  questionId: number;
  selectedOption: CorrectOption | null;
}

export interface AnswerQuestionOutput {
  success: boolean;
  answeredAt: Date;
}

export class AnswerQuestionUseCase {
  async execute(input: AnswerQuestionInput): Promise<AnswerQuestionOutput> {
    const { testCode, questionId, selectedOption } = input;

    // Find test session
    const testSession = await testSessionRepository.findByTestCode(testCode);

    if (!testSession) {
      throw new Error('Test not found');
    }

    // Check if test is in progress
    if (testSession.status !== 'in_progress') {
      throw new Error(`Cannot answer questions. Test status: ${testSession.status}`);
    }

    // Check if test has expired
    if (testSession.startedAt) {
      const elapsed = Date.now() - testSession.startedAt.getTime();
      const timeLimit = testSession.timeLimitSeconds * 1000;

      if (elapsed > timeLimit) {
        // Auto-expire the test
        await testSessionRepository.updateStatus(testSession.id, 'expired', {
          finishedAt: new Date(),
          finishedReason: 'Time limit exceeded',
        });

        await testLogRepository.create({
          testSessionId: testSession.id,
          eventType: 'auto_expire',
          eventData: { reason: 'Time limit exceeded' },
        });

        throw new Error('Test has expired');
      }
    }

    // Update answer
    await testSessionRepository.updateAnswer(
      testSession.id,
      questionId,
      selectedOption
    );

    // Log the answer change
    await testLogRepository.create({
      testSessionId: testSession.id,
      eventType: 'answer_change',
      eventData: {
        questionId,
        selectedOption,
        timestamp: new Date().toISOString(),
      },
    });

    return {
      success: true,
      answeredAt: new Date(),
    };
  }
}

export const answerQuestionUseCase = new AnswerQuestionUseCase();
