/**
 * Script để xem prompt thực tế được gửi cho Gemini AI
 */

import { formatCategoriesForAI, CATEGORIES } from '../src/config/categories';

console.log('🤖 Gemini AI Prompt Structure\n');
console.log('═'.repeat(80));
console.log('📋 NGUỒN DANH MỤC: config/categories.json');
console.log('═'.repeat(80));

console.log('\n📦 Categories trong config:\n');
CATEGORIES.forEach((cat, index) => {
  console.log(`${index + 1}. ${cat.id.padEnd(20)} - ${cat.name}`);
  console.log(`   Description: ${cat.description}`);
  console.log(`   Keywords: ${cat.keywords.join(', ')}`);
  console.log();
});

console.log('═'.repeat(80));
console.log('📝 PROMPT GỬI CHO GEMINI');
console.log('═'.repeat(80));

const sampleCV = `
Nguyen Van A
Email: a@example.com
Skills: React, Node.js, TypeScript
`;

const prompt = `You are an expert IT recruiter. Analyze the following CV and extract structured information.

CV Content:
${sampleCV}

Your task:
1. Extract candidate information (fullName, email, positionApplied)
2. Identify technical skills and categorize them with weights (0.0 to 1.0)
3. Create a concise 5-7 line CV summary

Available skill categories and their IDs (MUST use exact IDs):
${formatCategoriesForAI()}

IMPORTANT: Use ONLY the exact category IDs listed above (lowercase with hyphens).

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
- Summary should be professional and highlight key strengths
- Return ONLY the JSON, no additional text`;

console.log(prompt);

console.log('\n═'.repeat(80));
console.log('🔍 PHẦN QUAN TRỌNG: Categories trong prompt');
console.log('═'.repeat(80));
console.log('\n' + formatCategoriesForAI());

console.log('\n═'.repeat(80));
console.log('✅ KẾT LUẬN');
console.log('═'.repeat(80));
console.log(`
1. Gemini KHÔNG truy cập database
2. Gemini KHÔNG biết categories nào có trong DB
3. Gemini chỉ nhận danh sách categories từ PROMPT
4. Prompt được tạo từ: config/categories.json
5. Gemini trả về categoryId theo đúng format trong prompt

Flow:
  config/categories.json
         ↓
  formatCategoriesForAI()
         ↓
  Prompt text (gửi cho Gemini)
         ↓
  Gemini đọc và trả về JSON với categoryId
         ↓
  Validation filter (chỉ giữ IDs hợp lệ)
         ↓
  Query database với categoryId
`);

console.log('═'.repeat(80));
console.log('💡 Để thêm category mới:');
console.log('═'.repeat(80));
console.log(`
1. Thêm vào config/categories.json
2. Chạy npm run db:seed (để thêm vào DB)
3. Gemini tự động biết category mới (vì prompt tự động update)
4. Không cần sửa code gì khác!
`);
