// CV Analysis Service - Uses GEMINI_ANALYSIS_API_KEY (Key B)
// Purpose: Analyze CV text and extract structured information
import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '@/config/env';
import { formatAvailableCategoriesForAI, getAvailableCategoryIds } from '@/modules/question/questionService';
import { CvAnalysisService, CvAnalysisResult } from './types';

class GeminiCvAnalysisService implements CvAnalysisService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // Initialize with analysis API key (Key B)
    this.genAI = new GoogleGenerativeAI(env.GEMINI_ANALYSIS_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  async analyzeCvAndJd(cvText: string, jdText?: string): Promise<CvAnalysisResult> {
    try {
      // Get available categories from database
      const availableCategoryIds = await getAvailableCategoryIds();
      
      console.log('\n📋 Available categories for AI:', availableCategoryIds.join(', '));
      
      if (availableCategoryIds.length === 0) {
        throw new Error('No categories with questions available in database');
      }

      const prompt = await this.buildAnalysisPrompt(cvText, jdText);

      console.log('🤖 Sending request to Gemini AI...');
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from AI');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      console.log('\n✨ Gemini AI Analysis Result:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('👤 Candidate Info:');
      console.log(`   Name: ${parsed.candidateInfo?.fullName || 'N/A'}`);
      console.log(`   Email: ${parsed.candidateInfo?.email || 'N/A'}`);
      console.log(`   Position: ${parsed.candidateInfo?.positionApplied || 'N/A'}`);
      console.log('\n🎯 Skills & Weights (Raw from AI):');
      if (Array.isArray(parsed.skillsWithWeights)) {
        parsed.skillsWithWeights.forEach((skill: any) => {
          const percentage = (skill.weight * 100).toFixed(0);
          console.log(`   • ${skill.categoryId}: ${skill.weight.toFixed(2)} (${percentage}%)`);
        });
      }
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      // Validate and normalize the response
      const normalizedResult = this.normalizeAnalysisResult(parsed, availableCategoryIds);
      
      console.log('✅ Final Skills After Validation:');
      normalizedResult.skillsWithWeights.forEach((skill) => {
        const percentage = (skill.weight * 100).toFixed(0);
        console.log(`   • ${skill.categoryId}: ${skill.weight.toFixed(2)} (${percentage}%)`);
      });
      console.log('');
      
      return normalizedResult;
    } catch (error) {
      console.error('❌ CV analysis error:', error);
      throw new Error(`Failed to analyze CV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async buildAnalysisPrompt(cvText: string, jdText?: string): Promise<string> {
    const categoriesText = await formatAvailableCategoriesForAI();
    
    return `You are an expert IT recruiter. Analyze the following CV and extract structured information.

CV Content:
${cvText}

${jdText ? `Job Description:\n${jdText}\n` : ''}

Your task:
1. Extract candidate information (fullName, email, positionApplied)
2. Identify technical skills and categorize them with weights (0.0 to 1.0)
3. Create a concise 5-7 line CV summary

Available skill categories and their IDs (MUST use exact IDs):
${categoriesText}

IMPORTANT: Use ONLY the exact category IDs listed above (lowercase with hyphens).
These are the ONLY categories that have questions available in the database.

Return ONLY a valid JSON object in this exact format:
{
  "candidateInfo": {
    "fullName": "string or null",
    "email": "string or null",
    "positionApplied": "string or null"
  },
  "skillsWithWeights": [
    { "categoryId": "react", "weight": 0.8 },
    { "categoryId": "nodejs", "weight": 0.6 }
  ],
  "cvSummary": "5-7 line summary here"
}

Rules:
- Include only categories where the candidate has demonstrable skills
- Weight should reflect proficiency level (0.1 = beginner, 0.5 = intermediate, 0.8+ = advanced)
- Include at least 2 and at most 6 categories
- Summary MUST be written in Vietnamese language and should be professional and highlight key strengths
- Return ONLY the JSON, no additional text`;
  }

  private normalizeAnalysisResult(parsed: any, availableCategoryIds: string[]): CvAnalysisResult {
    // Validate and provide defaults
    const result: CvAnalysisResult = {
      candidateInfo: {
        fullName: parsed.candidateInfo?.fullName || undefined,
        email: parsed.candidateInfo?.email || undefined,
        positionApplied: parsed.candidateInfo?.positionApplied || undefined,
      },
      skillsWithWeights: [],
      cvSummary: parsed.cvSummary || 'No summary available',
    };

    // Validate skills
    if (Array.isArray(parsed.skillsWithWeights)) {
      result.skillsWithWeights = parsed.skillsWithWeights
        .filter((skill: any) => skill.categoryId && typeof skill.weight === 'number')
        .map((skill: any) => ({
          categoryId: skill.categoryId,
          weight: Math.max(0, Math.min(1, skill.weight)), // Clamp between 0 and 1
        }));
    }

    // Validate that all categoryIds are available (have questions in database)
    result.skillsWithWeights = result.skillsWithWeights.filter(skill => {
      const isAvailable = availableCategoryIds.includes(skill.categoryId);
      if (!isAvailable) {
        console.warn(`Category ${skill.categoryId} has no questions in database, skipping`);
      }
      return isAvailable;
    });
    
    // Ensure at least one skill category (fallback to first available)
    if (result.skillsWithWeights.length === 0) {
      const fallbackCategory = availableCategoryIds[0] || 'nodejs';
      console.warn(`No valid categories found, using fallback: ${fallbackCategory}`);
      result.skillsWithWeights.push({ categoryId: fallbackCategory, weight: 0.5 });
    }

    return result;
  }
}

// Export singleton instance
export const cvAnalysisService = new GeminiCvAnalysisService();
