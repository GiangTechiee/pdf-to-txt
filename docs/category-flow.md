# Category Flow - Từ CV đến Questions

## 🎯 Tổng quan

Hệ thống đảm bảo **đồng bộ 100%** giữa categories mà Gemini AI trả về và categories trong database.

## 📋 Single Source of Truth

**File:** `config/categories.json`

Tất cả categories được định nghĩa tập trung tại đây:

```json
[
  {
    "id": "react",
    "name": "React",
    "description": "React library for building user interfaces",
    "keywords": ["react", "jsx", "hooks", "context", "components"]
  },
  ...
]
```

## 🔄 Flow hoàn chỉnh

### 1. Database Seed (prisma/seed.ts)

```typescript
import categoriesConfig from '../config/categories.json';

// Tạo categories từ config
const categories = categoriesConfig.map(cat => ({
  id: cat.id,
  name: cat.name,
}));

// Upsert vào database
await prisma.category.upsert({
  where: { id: category.id },
  update: { name: category.name },
  create: category,
});
```

**Kết quả:** Database có đúng 9 categories với IDs: `react`, `nodejs`, `nextjs`, etc.

---

### 2. Upload CV & Phân tích (generateTestUseCase.ts)

```typescript
// Step 1: Extract text from PDF
const cvText = await pdfExtractorService.extractText(pdfFile);

// Step 2: Analyze CV with Gemini AI
const analysis = await cvAnalysisService.analyzeCvAndJd(cvText, jdText);

// analysis.skillsWithWeights = [
//   { categoryId: 'react', weight: 0.8 },
//   { categoryId: 'nodejs', weight: 0.6 }
// ]
```

---

### 3. Gemini AI Prompt (cvAnalysisService.ts)

```typescript
import { formatCategoriesForAI, getValidCategoryIds } from '@/config/categories';

// Prompt includes categories from config
const prompt = `
Available skill categories and their IDs (MUST use exact IDs):
${formatCategoriesForAI()}
// Output:
// - react: React library for building user interfaces (react, jsx, hooks)
// - nodejs: JavaScript runtime for server-side development (nodejs, node.js, express)
// ...

Return JSON with categoryId matching these exact IDs.
`;
```

**Gemini trả về:**
```json
{
  "skillsWithWeights": [
    { "categoryId": "react", "weight": 0.8 },
    { "categoryId": "nodejs", "weight": 0.6 }
  ]
}
```

---

### 4. Validation (cvAnalysisService.ts)

```typescript
// Validate categoryIds
const validCategoryIds = getValidCategoryIds(); // ['react', 'nodejs', ...]

result.skillsWithWeights = result.skillsWithWeights.filter(skill => {
  const isValid = validCategoryIds.includes(skill.categoryId);
  if (!isValid) {
    console.warn(`Invalid category ID from AI: ${skill.categoryId}`);
  }
  return isValid;
});

// Fallback nếu không có category hợp lệ
if (result.skillsWithWeights.length === 0) {
  result.skillsWithWeights.push({ categoryId: 'nodejs', weight: 0.5 });
}
```

---

### 5. Lưu Categories vào Test Session (testSessionRepository.ts)

```typescript
await prisma.testSessionCategory.createMany({
  data: categories.map(cat => ({
    testSessionId,
    categoryId: cat.categoryId, // 'react', 'nodejs', etc.
    weight: cat.weight,
  })),
});
```

---

### 6. Query Questions (questionRepository.ts)

```typescript
async allocateQuestionsByWeights(
  categoryWeights: { categoryId: string; weight: number }[],
  totalQuestions: number
) {
  // Allocate questions based on weights
  for (const allocation of allocations) {
    const questions = await this.getRandomQuestions({
      categoryId: allocation.categoryId, // 'react', 'nodejs'
      count: allocation.count,
      difficulties: { easy, medium, hard },
    });
  }
}

// Query với categoryId
const questions = await prisma.$queryRaw`
  SELECT * FROM questions
  WHERE "categoryId" = ${categoryId}  -- 'react' matches database
  AND difficulty = ${difficulty}
  AND "isActive" = true
`;
```

**✅ Match hoàn hảo:** `categoryId` từ Gemini = `categoryId` trong database

---

## 🔍 Kiểm tra đồng bộ

### Check categories trong database

```bash
npm run db:check
```

Output:
```
📦 Categories: 9
────────────────────────────────────────────────────────────
   React                (react              ) - 50 questions
   Node.js              (nodejs             ) - 50 questions
   Next.js              (nextjs             ) - 0 questions
   ...
```

### Check AI response

Khi test API, log sẽ hiển thị:
```
Step 2: Analyzing CV with AI...
AI returned categories: [
  { categoryId: 'react', weight: 0.8 },
  { categoryId: 'nodejs', weight: 0.6 }
]
✅ All categories valid
```

---

## ⚠️ Xử lý lỗi

### Nếu Gemini trả về category không hợp lệ

```typescript
// AI trả về: { categoryId: 'REACT', weight: 0.8 }  ❌ VIẾT HOA

// Validation filter sẽ loại bỏ
console.warn('Invalid category ID from AI: REACT');

// Fallback
result.skillsWithWeights.push({ categoryId: 'nodejs', weight: 0.5 });
```

### Nếu category không có câu hỏi

```typescript
// Query trả về 0 questions cho 'nextjs'
// System vẫn hoạt động, chỉ không có câu hỏi từ category đó
```

---

## 🎯 Đảm bảo đồng bộ

### Khi thêm category mới

1. **Thêm vào `config/categories.json`**
   ```json
   {
     "id": "typescript",
     "name": "TypeScript",
     "description": "TypeScript superset of JavaScript",
     "keywords": ["typescript", "ts", "types"]
   }
   ```

2. **Chạy seed**
   ```bash
   npm run db:seed
   ```
   → Category tự động được thêm vào database

3. **Gemini tự động biết**
   → Prompt tự động include category mới từ config

4. **Thêm câu hỏi**
   → Tạo file `question-bank/typescript.md` và update seed.ts

---

## 📊 Summary

| Component | Category Source | Format |
|-----------|----------------|--------|
| **Config** | `config/categories.json` | `{ id: "react", name: "React" }` |
| **Database** | Seed từ config | `categoryId: "react"` |
| **Gemini AI** | Prompt từ config | `categoryId: "react"` |
| **Validation** | Check từ config | `validIds.includes("react")` |
| **Query** | Match với DB | `WHERE categoryId = "react"` |

**✅ Kết luận:** Tất cả đều đồng bộ từ 1 nguồn duy nhất!

---

## 🛠️ Troubleshooting

### Lỗi: "No questions found for category"

**Nguyên nhân:** Category tồn tại nhưng chưa có câu hỏi

**Giải pháp:**
1. Tạo file markdown với câu hỏi
2. Update seed.ts để parse file đó
3. Chạy `npm run db:seed`

### Lỗi: "Invalid category ID from AI"

**Nguyên nhân:** Gemini trả về ID không có trong config

**Giải pháp:**
1. Check log để xem ID nào
2. Thêm vào `config/categories.json` nếu hợp lệ
3. Hoặc cải thiện prompt để Gemini không trả về ID đó

### Lỗi: "Foreign key constraint failed"

**Nguyên nhân:** Cố lưu categoryId không tồn tại trong database

**Giải pháp:**
1. Chạy `npm run db:check` để xem categories hiện có
2. Chạy `npm run db:seed` để đồng bộ lại
