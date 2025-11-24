# Fix: "Not enough questions available" Error

## 🐛 Vấn đề

Lỗi: `Not enough questions available. Found 28, needed 30`

## 🔍 Nguyên nhân

AI có thể chọn bất kỳ category nào trong config (10 categories), nhưng chỉ có 4 categories có câu hỏi trong database:
- ✅ React (50 câu)
- ✅ Node.js (50 câu)
- ✅ REST API (50 câu)
- ✅ SQL (50 câu)

Khi AI chọn category không có câu hỏi (ví dụ: Next.js, TypeScript, Docker...) → Không đủ 30 câu.

## ✅ Giải pháp đã áp dụng

### 1. Tạo service lọc categories có câu hỏi

File: `src/modules/question/questionService.ts`

```typescript
// Lấy danh sách category IDs có câu hỏi active
export async function getAvailableCategoryIds(): Promise<string[]>

// Format chỉ categories có câu hỏi cho AI prompt
export async function formatAvailableCategoriesForAI(): Promise<string>
```

### 2. Cập nhật CV Analysis Service

File: `src/modules/ai/cvAnalysisService.ts`

**Trước:**
- AI có thể chọn tất cả 10 categories
- Không kiểm tra category có câu hỏi hay không

**Sau:**
- Chỉ hiển thị categories có câu hỏi cho AI
- AI chỉ có thể chọn từ 4 categories: react, nodejs, rest-api, sql
- Validate kết quả AI trả về

### 3. Cải thiện error handling

- Fallback về category đầu tiên nếu AI không trả về category hợp lệ
- Log warning khi AI chọn category không có câu hỏi
- Đảm bảo luôn có ít nhất 1 category

## 🧪 Kiểm tra

### Xem categories có câu hỏi:
```bash
npm run test:categories
```

Output:
```
✅ Available category IDs:
react, nodejs, rest-api, sql

Total: 4 categories
```

### Xem chi tiết câu hỏi active:
```bash
npm run db:check-active
```

## 📊 Kết quả

- ✅ AI chỉ chọn categories có câu hỏi
- ✅ Luôn đủ 30 câu để tạo test
- ✅ Không còn lỗi "Not enough questions"

## 🚀 Khi thêm category mới

Khi bạn thêm category mới (ví dụ: TypeScript với 50 câu):

1. Thêm câu hỏi vào database:
```bash
npm run db:seed
```

2. AI sẽ **tự động** nhận diện category mới:
```bash
npm run test:categories
```

Output sẽ có thêm:
```
✅ Available category IDs:
react, nodejs, rest-api, sql, typescript

Total: 5 categories
```

3. Không cần sửa code gì thêm! 🎉

## 🔧 Debug

Nếu vẫn gặp lỗi:

### 1. Kiểm tra số câu hỏi:
```bash
npm run db:check
```

### 2. Kiểm tra câu hỏi active:
```bash
npm run db:check-active
```

### 3. Kiểm tra categories AI có thể chọn:
```bash
npm run test:categories
```

### 4. Xem log khi generate test:

Trong console sẽ có log:
```
Step 2: Analyzing CV with AI...
Category typescript has no questions in database, skipping
```

## 📝 Lưu ý

- Mỗi category cần **ít nhất 10 câu** để đảm bảo đủ phân bố độ khó (easy, medium, hard)
- Với 30 câu test và 4 categories, mỗi category cần ~7-8 câu
- Nếu muốn tăng số câu test lên 50, cần đảm bảo mỗi category có đủ câu hỏi
