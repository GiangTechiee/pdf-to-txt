# Gemini lấy danh mục từ đâu?

## 🎯 Câu trả lời ngắn gọn

**Gemini KHÔNG lấy từ database.** Gemini nhận danh mục từ **PROMPT TEXT** được gửi kèm với CV.

## 📊 Flow chi tiết

```
┌─────────────────────────────────────────────────────────────┐
│  1. config/categories.json (Single Source of Truth)         │
│     [                                                        │
│       { "id": "react", "name": "React", ... },              │
│       { "id": "nodejs", "name": "Node.js", ... }            │
│     ]                                                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ├──────────────────┬─────────────────┐
                         ↓                  ↓                 ↓
         ┌───────────────────────┐  ┌──────────────┐  ┌──────────────┐
         │  2a. Database Seed    │  │ 2b. Gemini   │  │ 2c. Frontend │
         │  (prisma/seed.ts)     │  │ Prompt       │  │ Display      │
         │                       │  │              │  │              │
         │  import categories    │  │ formatCate-  │  │ getCategoryName()│
         │  from config          │  │ goriesForAI()│  │              │
         └───────────┬───────────┘  └──────┬───────┘  └──────────────┘
                     ↓                     ↓
         ┌───────────────────────┐  ┌──────────────────────────────┐
         │  3a. Database         │  │  3b. Prompt Text             │
         │  ┌─────────────────┐  │  │  "Available categories:      │
         │  │ categories      │  │  │   - react: React library..." │
         │  │ ├─ react        │  │  │   - nodejs: Node.js..."      │
         │  │ ├─ nodejs       │  │  │                              │
         │  │ └─ ...          │  │  │  MUST use exact IDs!"        │
         │  └─────────────────┘  │  └──────────┬───────────────────┘
         └───────────────────────┘             ↓
                                    ┌──────────────────────────────┐
                                    │  4. Gửi cho Gemini AI        │
                                    │  POST /generateContent       │
                                    │  {                           │
                                    │    prompt: "CV + Categories" │
                                    │  }                           │
                                    └──────────┬───────────────────┘
                                               ↓
                                    ┌──────────────────────────────┐
                                    │  5. Gemini đọc prompt        │
                                    │  - Thấy CV có React, Node.js │
                                    │  - Thấy list categories      │
                                    │  - Match skills với categories│
                                    └──────────┬───────────────────┘
                                               ↓
                                    ┌──────────────────────────────┐
                                    │  6. Gemini trả về JSON       │
                                    │  {                           │
                                    │    "skillsWithWeights": [    │
                                    │      { "categoryId": "react",│
                                    │        "weight": 0.8 },      │
                                    │      { "categoryId": "nodejs"│
                                    │        "weight": 0.6 }       │
                                    │    ]                         │
                                    │  }                           │
                                    └──────────┬───────────────────┘
                                               ↓
                                    ┌──────────────────────────────┐
                                    │  7. Validation               │
                                    │  getValidCategoryIds()       │
                                    │  Filter: chỉ giữ IDs hợp lệ  │
                                    └──────────┬───────────────────┘
                                               ↓
                                    ┌──────────────────────────────┐
                                    │  8. Query Database           │
                                    │  SELECT * FROM questions     │
                                    │  WHERE categoryId = 'react'  │
                                    │  ✅ MATCH!                   │
                                    └──────────────────────────────┘
```

## 📝 Ví dụ Prompt thực tế

### Input gửi cho Gemini:

```
You are an expert IT recruiter. Analyze the following CV...

CV Content:
Nguyen Van A
Skills: React, Node.js, TypeScript

Available skill categories and their IDs (MUST use exact IDs):
- react: React library for building user interfaces (react, jsx, hooks)
- nextjs: React framework with SSR and SSG (nextjs, next.js, app router)
- nodejs: JavaScript runtime for server-side development (nodejs, node.js, express)
- nestjs: Progressive Node.js framework (nestjs, nest.js, decorators)
- aspnet-core: Cross-platform .NET framework (asp.net, aspnet, c#)
- rest-api: RESTful API design and development (rest, api, restful)
- flutter: Cross-platform mobile development framework (flutter, dart, mobile)
- react-native: React framework for native mobile apps (react native, react-native, mobile)
- machine-learning: Machine learning and AI development (machine learning, ml, ai)

IMPORTANT: Use ONLY the exact category IDs listed above (lowercase with hyphens).

Return JSON with categoryId matching these exact IDs.
```

### Output từ Gemini:

```json
{
  "candidateInfo": {
    "fullName": "Nguyen Van A",
    "email": null,
    "positionApplied": null
  },
  "skillsWithWeights": [
    { "categoryId": "react", "weight": 0.8 },
    { "categoryId": "nodejs", "weight": 0.7 }
  ],
  "cvSummary": "..."
}
```

## 🔍 Code thực tế

### 1. Tạo prompt (src/modules/ai/cvAnalysisService.ts)

```typescript
import { formatCategoriesForAI } from '@/config/categories';

private buildAnalysisPrompt(cvText: string): string {
  return `
    Available skill categories and their IDs (MUST use exact IDs):
    ${formatCategoriesForAI()}  // ← Đây là nơi categories được nhúng vào prompt
    
    IMPORTANT: Use ONLY the exact category IDs listed above.
  `;
}
```

### 2. Format categories (src/config/categories.ts)

```typescript
import categoriesData from '../../config/categories.json';

export function formatCategoriesForAI(): string {
  return categoriesData.map(cat => 
    `- ${cat.id}: ${cat.description} (${cat.keywords.slice(0, 3).join(', ')})`
  ).join('\n');
}
```

### 3. Gửi cho Gemini

```typescript
const prompt = this.buildAnalysisPrompt(cvText);
const result = await this.model.generateContent(prompt);
// Gemini nhận prompt chứa danh sách categories
```

## ✅ Ưu điểm của cách này

### 1. Không cần database connection
- Gemini không cần kết nối database
- Giảm độ phức tạp và latency
- Dễ test và debug

### 2. Linh hoạt
- Có thể thêm/sửa categories mà không cần retrain AI
- Chỉ cần update config file

### 3. Đồng bộ 100%
- Prompt luôn sync với database (cùng nguồn: config/categories.json)
- Không bao giờ bị mismatch

### 4. Dễ kiểm soát
- Biết chính xác Gemini nhận input gì
- Có thể xem và debug prompt dễ dàng

## ⚠️ Lưu ý

### Gemini KHÔNG biết:
- ❌ Categories nào có trong database
- ❌ Category nào có câu hỏi, category nào không
- ❌ Số lượng câu hỏi của mỗi category

### Gemini CHỈ biết:
- ✅ Danh sách categories trong prompt
- ✅ ID và description của mỗi category
- ✅ Keywords để match với CV

### Validation layer xử lý:
- ✅ Filter IDs không hợp lệ
- ✅ Đảm bảo chỉ dùng IDs có trong config
- ✅ Fallback nếu không có category hợp lệ

## 🛠️ Thêm category mới

### Bước 1: Thêm vào config/categories.json

```json
{
  "id": "typescript",
  "name": "TypeScript",
  "description": "TypeScript superset of JavaScript",
  "keywords": ["typescript", "ts", "types", "interfaces"]
}
```

### Bước 2: Seed database

```bash
npm run db:seed
```

### Bước 3: Tự động!

- ✅ Prompt tự động include category mới
- ✅ Gemini tự động biết category mới
- ✅ Validation tự động chấp nhận ID mới
- ✅ Query database hoạt động ngay

## 📊 So sánh với cách khác

| Cách | Ưu điểm | Nhược điểm |
|------|---------|------------|
| **Nhúng vào prompt** (hiện tại) | ✅ Đơn giản<br>✅ Không cần DB connection<br>✅ Dễ debug<br>✅ Linh hoạt | ⚠️ Prompt dài hơn |
| Gemini query DB | ✅ Prompt ngắn | ❌ Phức tạp<br>❌ Cần DB connection<br>❌ Khó debug<br>❌ Latency cao |
| Hardcode trong code | ✅ Nhanh | ❌ Khó maintain<br>❌ Không linh hoạt<br>❌ Dễ mismatch |

## 🎯 Kết luận

**Gemini lấy danh mục từ PROMPT TEXT**, được tạo tự động từ `config/categories.json`.

Đây là cách tốt nhất vì:
1. Đơn giản và dễ hiểu
2. Đồng bộ 100% với database
3. Dễ thêm/sửa/xóa categories
4. Không cần Gemini kết nối database
5. Dễ test và debug

## 📚 Xem thêm

- `config/categories.json` - Single source of truth
- `src/config/categories.ts` - Helper functions
- `src/modules/ai/cvAnalysisService.ts` - Prompt builder
- `docs/category-flow.md` - Flow chi tiết
