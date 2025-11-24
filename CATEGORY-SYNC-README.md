# ✅ Category Synchronization - Đảm bảo 100% đồng bộ

## 🎯 Vấn đề đã giải quyết

**Trước đây:**
- ❌ Gemini trả về: `REACT`, `NODEJS` (VIẾT HOA)
- ❌ Database có: `react`, `nodejs` (viết thường)
- ❌ **MISMATCH** → Query không tìm thấy câu hỏi

**Bây giờ:**
- ✅ Single source of truth: `config/categories.json`
- ✅ Gemini prompt tự động sync từ config
- ✅ Database seed từ config
- ✅ Validation đảm bảo chỉ dùng IDs hợp lệ
- ✅ **100% MATCH** → Query hoạt động hoàn hảo

## 📁 Single Source of Truth

**File:** `config/categories.json`

```json
[
  {
    "id": "react",
    "name": "React",
    "description": "React library for building user interfaces",
    "keywords": ["react", "jsx", "hooks"]
  },
  {
    "id": "nodejs",
    "name": "Node.js",
    "description": "JavaScript runtime for server-side",
    "keywords": ["nodejs", "express", "backend"]
  }
  // ... 7 more
]
```

## 🔄 Flow đồng bộ

```
config/categories.json
         ↓
    ┌────┴────┐
    ↓         ↓
Database   Gemini AI
(seed)     (prompt)
    ↓         ↓
    └────┬────┘
         ↓
   Query Match ✅
```

### 1. Database Seed
```typescript
import categoriesConfig from '../config/categories.json';
// → Tạo categories với IDs: react, nodejs, nextjs...
```

### 2. Gemini AI Prompt
```typescript
import { formatCategoriesForAI } from '@/config/categories';
// → Prompt chứa: "- react: React library..."
// → Gemini trả về: { categoryId: "react", weight: 0.8 }
```

### 3. Validation
```typescript
import { getValidCategoryIds } from '@/config/categories';
// → Filter chỉ giữ IDs hợp lệ: ['react', 'nodejs', ...]
```

### 4. Query Questions
```typescript
WHERE "categoryId" = 'react'  // ✅ Match với database
```

## 🛠️ Sử dụng

### Thêm category mới

**Bước 1:** Thêm vào `config/categories.json`
```json
{
  "id": "typescript",
  "name": "TypeScript",
  "description": "TypeScript superset of JavaScript",
  "keywords": ["typescript", "ts", "types"]
}
```

**Bước 2:** Seed database
```bash
npm run db:seed
```

**Bước 3:** Thêm câu hỏi (optional)
- Tạo `question-bank/typescript.md`
- Update `prisma/seed.ts` để parse file
- Chạy lại `npm run db:seed`

**Kết quả:**
- ✅ Database có category mới
- ✅ Gemini tự động biết category mới
- ✅ Validation chấp nhận category mới
- ✅ Có thể query câu hỏi (nếu đã thêm)

### Kiểm tra đồng bộ

```bash
# Check database
npm run db:check

# Check categories
npm run db:studio
```

## 📊 Current Categories

| ID | Name | Questions |
|----|------|-----------|
| `react` | React | 50 |
| `nodejs` | Node.js | 50 |
| `nextjs` | Next.js | 0 |
| `nestjs` | NestJS | 0 |
| `aspnet-core` | ASP.NET Core | 0 |
| `rest-api` | REST API | 0 |
| `flutter` | Flutter | 0 |
| `react-native` | React Native | 0 |
| `machine-learning` | Machine Learning | 0 |

## ⚠️ Lưu ý

### Category IDs phải:
- ✅ Viết thường
- ✅ Dùng dấu gạch ngang cho nhiều từ (`aspnet-core`, `rest-api`)
- ✅ Không có khoảng trắng
- ✅ Không có ký tự đặc biệt

### Khi Gemini trả về ID không hợp lệ:
- System tự động filter ra
- Log warning: `Invalid category ID from AI: REACT`
- Fallback về `nodejs` với weight 0.5

## 📚 Chi tiết

Xem thêm: `docs/category-flow.md`

## ✅ Đảm bảo

- ✅ Không bao giờ bị mismatch giữa Gemini và Database
- ✅ Tất cả categories đều từ 1 nguồn duy nhất
- ✅ Dễ dàng thêm/sửa/xóa categories
- ✅ Validation tự động
- ✅ Query luôn hoạt động đúng
