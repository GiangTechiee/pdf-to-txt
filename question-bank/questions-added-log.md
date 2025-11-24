# Nhật ký câu hỏi đã thêm vào Database

## ✅ Đã thêm vào database (23/11/2025)

### 1. React - 50 câu hỏi
**File nguồn:** `question-bank/react.md`

**Phân bố độ khó:**
- Dễ (Easy): Câu 1-10 (10 câu)
- Trung bình (Medium): Câu 11-40 (30 câu)
- Khó (Hard): Câu 41-50 (10 câu)

**Nội dung bao gồm:**
- Phần 1: Cơ bản (Câu 1-10)
- Phần 2: State, Props, Event (Câu 11-20)
- Phần 3: Hooks & Lifecycle (Câu 21-30)
- Phần 4: Context, Performance, Routing (Câu 31-40)
- Phần 5: Nâng cao & Kiến trúc (Câu 41-50)

---

### 2. Node.js - 50 câu hỏi
**File nguồn:** `question-bank/nodejs.md`

**Phân bố độ khó:**
- Dễ (Easy): Câu 1-10 (10 câu)
- Trung bình (Medium): Câu 11-40 (30 câu)
- Khó (Hard): Câu 41-50 (10 câu)

**Nội dung bao gồm:**
- Phần 1: Kiến thức cơ bản (Câu 1-10)
- Phần 2: Core Modules & Async (Câu 11-20)
- Phần 3: Express.js (Câu 21-30)
- Phần 4: Module, Buffer, Streams (Câu 31-40)
- Phần 5: Security, Architecture, Advanced (Câu 41-50)

---

### 3. REST API - 50 câu hỏi
**File nguồn:** `question-bank/rest-api.md`

**Phân bố độ khó:**
- Dễ (Easy): Câu 1-10 (10 câu)
- Trung bình (Medium): Câu 11-40 (30 câu)
- Khó (Hard): Câu 41-50 (10 câu)

**Nội dung bao gồm:**
- Phần 1: Kiến thức cơ bản (Câu 1-10)
- Phần 2: URL, Resource, Status Codes (Câu 11-20)
- Phần 3: Headers, Auth, Payload (Câu 21-30)
- Phần 4: Pagination, Filtering, Versioning (Câu 31-40)
- Phần 5: Nâng cao & Best Practices (Câu 41-50)

---

## 📊 Tổng kết

| Danh mục | Số câu hỏi | Dễ | Trung bình | Khó |
|----------|------------|-----|------------|-----|
| React | 50 | 10 | 30 | 10 |
| Node.js | 50 | 10 | 30 | 10 |
| REST API | 50 | 10 | 30 | 10 |
| **TỔNG** | **150** | **30** | **90** | **30** |

---

## 🔄 Hướng dẫn thêm câu hỏi mới

### Bước 1: Tạo file markdown
Tạo file mới trong thư mục `question-bank/` với format:

```markdown
# Tiêu đề

### Câu 1

Nội dung câu hỏi có thể có `inline code`?

A. Đáp án text thường
B. Đáp án có code:

```jsx
const example = () => {
  return <div>Hello</div>;
}
```

C. Đáp án khác
D. Đáp án cuối

**Đáp án: B**

---

### Câu 2
...
```

**Lưu ý:**
- Code blocks được lưu nguyên format vào database
- Sử dụng `MarkdownRenderer` component để hiển thị đúng trên web
- Xem chi tiết: `docs/code-rendering-guide.md`

### Bước 2: Cập nhật seed.ts
Thêm đoạn code parse và insert vào `prisma/seed.ts`:

```typescript
const newCategoryQuestions = parseMarkdownQuestions(
  path.join(process.cwd(), 'question-bank', 'ten-file.md'),
  'Tên Category'
);

for (const question of newCategoryQuestions) {
  await prisma.question.create({
    data: {
      categoryId: 'category-id',
      ...question,
    },
  });
}
```

### Bước 3: Chạy seed
```bash
npm run db:seed
```

### Bước 4: Cập nhật file này
Ghi lại thông tin câu hỏi đã thêm vào phần "Đã thêm vào database" ở trên.

---

## 📝 Danh mục cần thêm câu hỏi (Pending)

- [ ] Next.js
- [ ] NestJS
- [ ] ASP.NET Core
- [ ] Flutter
- [ ] React Native
- [ ] Machine Learning
- [ ] TypeScript
- [ ] GraphQL
- [ ] Docker
- [ ] Kubernetes

---

## 🛠️ Lệnh hữu ích

```bash
# Chạy seed để thêm dữ liệu
npm run db:seed

# Xem database trong Prisma Studio
npm run db:studio

# Reset database (xóa toàn bộ dữ liệu)
npx prisma migrate reset

# Push schema changes
npm run db:push
```

---

**Lần cập nhật cuối:** 23/11/2025  
**Tổng số câu hỏi trong database:** 150 câu
