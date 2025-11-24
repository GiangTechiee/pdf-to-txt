import { z } from 'zod';

// Generate test request validation
export const generateTestSchema = z.object({
  jdText: z.string().optional(),
  totalQuestions: z.number().min(10).max(50).default(30),
  timeLimitMinutes: z.number().min(15).max(180).default(15),
});

export type GenerateTestInput = z.infer<typeof generateTestSchema>;

// Start test validation
export const startTestSchema = z.object({
  testCode: z.string().length(8),
});

// Answer question validation
export const answerQuestionSchema = z.object({
  testCode: z.string().length(8),
  questionId: z.number(),
  selectedOption: z.enum(['A', 'B', 'C', 'D']),
});

export type AnswerQuestionInput = z.infer<typeof answerQuestionSchema>;

// Submit test validation
export const submitTestSchema = z.object({
  testCode: z.string().length(8),
});
