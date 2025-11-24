// Environment configuration with validation
export const env = {
  // Database
  DATABASE_URL: process.env.DATABASE_URL!,
  DIRECT_URL: process.env.DIRECT_URL!,

  // Gemini API Keys - Separated by purpose
  GEMINI_PDF_API_KEY: process.env.GEMINI_PDF_API_KEY!,
  GEMINI_ANALYSIS_API_KEY: process.env.GEMINI_ANALYSIS_API_KEY!,

  // Auth
  JWT_SECRET: process.env.JWT_SECRET!,

  // App
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  NODE_ENV: process.env.NODE_ENV || 'development',
} as const;

// Validate required environment variables
export function validateEnv() {
  const required = [
    'DATABASE_URL',
    'DIRECT_URL',
    'GEMINI_PDF_API_KEY',
    'GEMINI_ANALYSIS_API_KEY',
    'JWT_SECRET',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
