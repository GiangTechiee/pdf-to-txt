// Question Service - Business logic for questions
import { prisma } from '@/lib/db';
import { CATEGORIES } from '@/config/categories';

/**
 * Get list of category IDs that have active questions in database
 */
export async function getAvailableCategoryIds(): Promise<string[]> {
  const categoriesWithQuestions = await prisma.category.findMany({
    where: {
      questions: {
        some: {
          isActive: true,
        },
      },
    },
    select: {
      id: true,
    },
  });

  return categoriesWithQuestions.map(c => c.id);
}

/**
 * Format only available categories for AI prompt
 */
export async function formatAvailableCategoriesForAI(): Promise<string> {
  const availableIds = await getAvailableCategoryIds();
  
  const availableCategories = CATEGORIES.filter(cat => 
    availableIds.includes(cat.id)
  );

  if (availableCategories.length === 0) {
    throw new Error('No categories with questions available in database');
  }

  return availableCategories.map(cat => 
    `- ${cat.id}: ${cat.description} (${cat.keywords.slice(0, 3).join(', ')})`
  ).join('\n');
}

/**
 * Get count of active questions per category
 */
export async function getQuestionCountByCategory(): Promise<Record<string, number>> {
  const counts = await prisma.question.groupBy({
    by: ['categoryId'],
    where: {
      isActive: true,
    },
    _count: true,
  });

  const result: Record<string, number> = {};
  for (const item of counts) {
    result[item.categoryId] = item._count;
  }

  return result;
}
