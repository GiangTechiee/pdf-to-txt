/**
 * Central configuration for all skill categories
 * This ensures consistency between:
 * - Database seed
 * - AI analysis
 * - Frontend display
 */

import categoriesData from '../../config/categories.json';

export interface CategoryConfig {
  id: string;
  name: string;
  description: string;
  keywords: string[];
}

export const CATEGORIES: CategoryConfig[] = categoriesData as CategoryConfig[];

/**
 * Get all valid category IDs
 */
export function getValidCategoryIds(): string[] {
  return CATEGORIES.map(cat => cat.id);
}

/**
 * Get category by ID
 */
export function getCategoryById(id: string): CategoryConfig | undefined {
  return CATEGORIES.find(cat => cat.id === id);
}

/**
 * Get category name by ID
 */
export function getCategoryName(id: string): string {
  return getCategoryById(id)?.name || id;
}

/**
 * Format categories for AI prompt
 * @param availableOnly - If true, only include categories with questions in database
 */
export function formatCategoriesForAI(availableOnly: boolean = false): string {
  let categoriesToFormat = CATEGORIES;
  
  // If availableOnly is true, filter to only categories with questions
  // This will be set dynamically by the service
  if (availableOnly) {
    // This will be filtered by the service layer
    categoriesToFormat = CATEGORIES;
  }
  
  return categoriesToFormat.map(cat => 
    `- ${cat.id}: ${cat.description} (${cat.keywords.slice(0, 3).join(', ')})`
  ).join('\n');
}

/**
 * Validate if a category ID exists
 */
export function isValidCategoryId(id: string): boolean {
  return CATEGORIES.some(cat => cat.id === id);
}
