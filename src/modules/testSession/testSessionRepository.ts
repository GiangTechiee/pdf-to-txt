// Test Session Repository
import { prisma } from '@/lib/db';
import { TestStatus, CorrectOption } from '@prisma/client';

export class TestSessionRepository {
  async create(data: {
    candidateId: string;
    testCode: string;
    totalQuestions: number;
    timeLimitSeconds: number;
    createdBy: string;
    meta?: any;
  }) {
    return prisma.testSession.create({
      data,
      include: {
        candidate: true,
      },
    });
  }

  async findByTestCode(testCode: string) {
    return prisma.testSession.findUnique({
      where: { testCode },
      include: {
        candidate: true,
        testSessionCategories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return prisma.testSession.findUnique({
      where: { id },
      include: {
        candidate: true,
        testSessionCategories: {
          include: {
            category: true,
          },
        },
        testSessionQuestions: {
          include: {
            question: true,
          },
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });
  }

  async updateStatus(id: string, status: TestStatus, additionalData?: any) {
    return prisma.testSession.update({
      where: { id },
      data: {
        status,
        ...additionalData,
      },
    });
  }

  async addQuestions(testSessionId: string, questionIds: number[]) {
    const data = questionIds.map((questionId, index) => ({
      testSessionId,
      questionId,
      orderIndex: index + 1,
    }));

    return prisma.testSessionQuestion.createMany({
      data,
    });
  }

  async addCategories(testSessionId: string, categories: { categoryId: string; weight: number }[]) {
    const data = categories.map((cat) => ({
      testSessionId,
      categoryId: cat.categoryId,
      weight: cat.weight,
    }));

    return prisma.testSessionCategory.createMany({
      data,
    });
  }

  async updateAnswer(testSessionId: string, questionId: number, selectedOption: CorrectOption | null) {
    return prisma.testSessionQuestion.updateMany({
      where: {
        testSessionId,
        questionId,
      },
      data: {
        selectedOption,
        answeredAt: new Date(),
      },
    });
  }

  async getQuestionsForTest(testSessionId: string) {
    return prisma.testSessionQuestion.findMany({
      where: { testSessionId },
      include: {
        question: true,
      },
      orderBy: {
        orderIndex: 'asc',
      },
    });
  }

  async calculateResults(testSessionId: string) {
    const questions = await this.getQuestionsForTest(testSessionId);

    let correctCount = 0;

    // Update isCorrect for each question
    for (const tsq of questions) {
      const isCorrect = tsq.selectedOption === tsq.question.correctOption;
      if (isCorrect) correctCount++;

      await prisma.testSessionQuestion.update({
        where: { id: tsq.id },
        data: { isCorrect },
      });
    }

    return {
      correctCount,
      totalQuestions: questions.length,
      score: Math.round((correctCount / questions.length) * 100),
    };
  }
}

export const testSessionRepository = new TestSessionRepository();
