// Question Repository - Database operations for questions
import { prisma } from '@/lib/db';
import { QuestionDifficulty } from '@prisma/client';

export interface QuestionAllocationParams {
  categoryId: string;
  count: number;
  difficulties: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export class QuestionRepository {
  // Get random questions by category and difficulty
  async getRandomQuestions(params: QuestionAllocationParams) {
    const { categoryId, difficulties } = params;

    const questions = await Promise.all([
      this.getQuestionsByDifficulty(categoryId, 'easy', difficulties.easy),
      this.getQuestionsByDifficulty(categoryId, 'medium', difficulties.medium),
      this.getQuestionsByDifficulty(categoryId, 'hard', difficulties.hard),
    ]);

    return questions.flat();
  }

  private async getQuestionsByDifficulty(
    categoryId: string,
    difficulty: QuestionDifficulty,
    count: number
  ) {
    if (count === 0) return [];

    // Get random questions using raw SQL for better randomization
    const questions = await prisma.$queryRaw<any[]>`
      SELECT * FROM questions
      WHERE "categoryId" = ${categoryId}
        AND difficulty = ${difficulty}::"QuestionDifficulty"
        AND "isActive" = true
      ORDER BY RANDOM()
      LIMIT ${count}
    `;

    return questions;
  }

  // Allocate questions across multiple categories with weights
  async allocateQuestionsByWeights(
    categoryWeights: { categoryId: string; weight: number }[],
    totalQuestions: number
  ) {
    // Calculate question count per category based on weights
    const totalWeight = categoryWeights.reduce((sum, cw) => sum + cw.weight, 0);
    
    const allocations = categoryWeights.map((cw) => {
      const count = Math.round((cw.weight / totalWeight) * totalQuestions);
      return {
        categoryId: cw.categoryId,
        count: Math.max(1, count), // At least 1 question per category
      };
    });

    // Adjust to match exact total
    const currentTotal = allocations.reduce((sum, a) => sum + a.count, 0);
    if (currentTotal !== totalQuestions) {
      const diff = totalQuestions - currentTotal;
      allocations[0].count += diff;
    }

    console.log('📝 Difficulty Distribution (30% easy, 50% medium, 20% hard):');
    
    // Get questions for each category with difficulty distribution
    // 50% medium, 30% easy, 20% hard
    const allQuestions = await Promise.all(
      allocations.map(async (allocation) => {
        const easy = Math.floor(allocation.count * 0.3);
        const medium = Math.floor(allocation.count * 0.5);
        const hard = allocation.count - easy - medium;

        console.log(`   ${allocation.categoryId}: ${easy} easy, ${medium} medium, ${hard} hard`);

        return this.getRandomQuestions({
          categoryId: allocation.categoryId,
          count: allocation.count,
          difficulties: { easy, medium, hard },
        });
      })
    );

    return allQuestions.flat();
  }
}

export const questionRepository = new QuestionRepository();
