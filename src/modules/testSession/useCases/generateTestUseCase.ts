// Use Case: Generate Test from CV and JD
import { pdfExtractorService } from '@/modules/ai/pdfExtractorService';
import { cvAnalysisService } from '@/modules/ai/cvAnalysisService';
import { candidateRepository } from '@/modules/candidate/candidateRepository';
import { testSessionRepository } from '../testSessionRepository';
import { questionRepository } from '@/modules/question/questionRepository';
import { generateTestCode } from '@/lib/utils';

export interface GenerateTestInput {
  pdfFile: Buffer;
  jdText?: string;
  totalQuestions?: number;
  timeLimitMinutes?: number;
  createdBy: string; // User ID
}

export interface GenerateTestOutput {
  testCode: string;
  testSessionId: string;
  candidateInfo: {
    fullName?: string;
    email?: string;
    positionApplied?: string;
  };
  cvSummary: string;
  categories: Array<{
    categoryId: string;
    categoryName: string;
    weight: number;
  }>;
}

export class GenerateTestUseCase {
  async execute(input: GenerateTestInput): Promise<GenerateTestOutput> {
    const {
      pdfFile,
      jdText,
      totalQuestions = 30,
      timeLimitMinutes = 15,
      createdBy,
    } = input;

    // Step 1: Extract text from PDF using Key A
    console.log('Step 1: Extracting text from PDF...');
    const cvText = await pdfExtractorService.extractTextFromPdf(pdfFile);

    // Step 2: Analyze CV using Key B
    console.log('Step 2: Analyzing CV with AI...');
    const analysis = await cvAnalysisService.analyzeCvAndJd(cvText, jdText);

    // Step 3: Find or create candidate record
    console.log('Step 3: Finding or creating candidate record...');
    const candidate = await candidateRepository.findOrCreate({
      fullName: analysis.candidateInfo.fullName,
      email: analysis.candidateInfo.email,
      positionApplied: analysis.candidateInfo.positionApplied,
      cvSummary: analysis.cvSummary,
    });

    // Step 4: Generate unique test code
    const testCode = generateTestCode();

    // Step 5: Create test session
    console.log('Step 4: Creating test session...');
    const testSession = await testSessionRepository.create({
      candidateId: candidate.id,
      createdBy,
      testCode,
      totalQuestions,
      timeLimitSeconds: timeLimitMinutes * 60,
      meta: {
        jdText,
        generatedAt: new Date().toISOString(),
      },
    });

    // Step 6: Save category weights
    console.log('Step 5: Saving category weights...');
    await testSessionRepository.addCategories(
      testSession.id,
      analysis.skillsWithWeights
    );

    // Step 7: Allocate questions based on category weights
    console.log('Step 6: Allocating questions...');
    console.log('\n📊 Question Allocation Plan:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const totalWeight = analysis.skillsWithWeights.reduce((sum, sw) => sum + sw.weight, 0);
    analysis.skillsWithWeights.forEach((sw) => {
      const count = Math.round((sw.weight / totalWeight) * totalQuestions);
      const adjustedCount = Math.max(1, count);
      console.log(`   ${sw.categoryId}: ${adjustedCount} questions (weight: ${sw.weight.toFixed(2)})`);
    });
    console.log(`   Total: ${totalQuestions} questions`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    const questions = await questionRepository.allocateQuestionsByWeights(
      analysis.skillsWithWeights,
      totalQuestions
    );

    console.log(`✅ Successfully allocated ${questions.length} questions\n`);

    if (questions.length < totalQuestions) {
      throw new Error(
        `Not enough questions available. Found ${questions.length}, needed ${totalQuestions}`
      );
    }

    // Step 8: Assign questions to test session
    const questionIds = questions.map((q) => q.id);
    await testSessionRepository.addQuestions(testSession.id, questionIds);

    console.log('Test generation completed successfully!');

    // Return result
    return {
      testCode,
      testSessionId: testSession.id,
      candidateInfo: analysis.candidateInfo,
      cvSummary: analysis.cvSummary,
      categories: analysis.skillsWithWeights.map((sw) => ({
        categoryId: sw.categoryId,
        categoryName: sw.categoryId, // Will be enriched with actual name from DB
        weight: sw.weight,
      })),
    };
  }
}

export const generateTestUseCase = new GenerateTestUseCase();
