# Hướng dẫn Seed Database

## 🎯 Tổng quan

Script seed được thiết kế để:
- ✅ **Không bị trùng lặp** - Tự động xóa câu hỏi cũ của category trước khi thêm mới
- ✅ **An toàn với categories** - Dùng `upsert` để không tạo trùng
- ✅ **Idempotent** - Chạy nhiều lần cho kết quả giống nhau
- ✅ **Giữ nguyên code format** - Code blocks được lưu đầy đủ

## 📋 Quy trình Seed

### 1. Kiểm tra database hiện tại (Optional)

```bash
npm run db:check
```

Output sẽ hiển thị:
- Số lượng categories
- Số câu hỏi trong mỗi category
- Phát hiện câu hỏi trùng lặp (nếu có)
- Phân bố độ khó

### 2. Chạy seed

```bash
npm run db:seed
```

**Quá trình thực hiện:**

1. **Tạo/Cập nhật Categories** (9 categories)
   - React, Next.js, Node.js, NestJS, ASP.NET Core
   - REST API, Flutter, React Native, Machine Learning

2. **Xử lý React Questions**
   - Parse file `question-bank/react.md`
   - Xóa tất cả câu hỏi React cũ
   - Thêm 50 câu hỏi React mới

3. **Xử lý Node.js Questions**
   - Parse file `question-bank/nodejs.md`
   - Xóa tất cả câu hỏi Node.js cũ
   - Thêm 50 câu hỏi Node.js mới

### 3. Kiểm tra lại sau khi seed

```bash
npm run db:check
```

Xác nhận:
- ✅ 9 categories
- ✅ 50 câu React (10 easy, 30 medium, 10 hard)
- ✅ 50 câu Node.js (10 easy, 30 medium, 10 hard)
- ✅ Không có câu trùng lặp

## 🔄 Chạy lại nhiều lần

**An toàn 100%!** Bạn có thể chạy `npm run db:seed` bao nhiêu lần cũng được:

```bash
# Lần 1
npm run db:seed
# Result: 0 câu cũ bị xóa, 100 câu mới được thêm

# Lần 2
npm run db:seed
# Result: 100 câu cũ bị xóa, 100 câu mới được thêm

# Lần 3
npm run db:seed
# Result: 100 câu cũ bị xóa, 100 câu mới được thêm
```

Kết quả luôn là: **100 câu hỏi, không trùng lặp**

## ⚠️ Lưu ý quan trọng

### 1. Dữ liệu test sessions sẽ BỊ ẢNH HƯỞNG

Khi xóa câu hỏi, các test sessions đang sử dụng câu hỏi đó sẽ bị ảnh hưởng do:
- `onDelete: Cascade` trong schema
- Tất cả `TestSessionQuestion` liên quan sẽ bị xóa theo

**Giải pháp:**
- Chỉ seed khi database còn trống hoặc đang development
- Không seed trên production khi đã có test sessions thật

### 2. Thêm category mới

Nếu muốn thêm category khác (ví dụ: TypeScript), cập nhật trong `prisma/seed.ts`:

```typescript
const categories = [
  // ... existing categories
  { id: 'typescript', name: 'TypeScript' },
];

// Thêm phần parse và seed
const typescriptQuestions = parseMarkdownQuestions(
  path.join(process.cwd(), 'question-bank', 'typescript.md'),
  'TypeScript'
);

const deletedTypescript = await prisma.question.deleteMany({
  where: { categoryId: 'typescript' },
});

for (const question of typescriptQuestions) {
  await prisma.question.create({
    data: {
      categoryId: 'typescript',
      ...question,
    },
  });
}
```

### 3. Sửa câu hỏi trong markdown

Nếu bạn sửa câu hỏi trong file `.md`:

1. Sửa file markdown
2. Chạy `npm run db:seed`
3. Câu hỏi cũ sẽ bị xóa và thay bằng câu mới

## 🧪 Testing

### Test parser locally

Tạo file test:

```javascript
const fs = require('fs');
const content = fs.readFileSync('question-bank/react.md', 'utf-8');
const blocks = content.split(/### Câu \d+/).slice(1);
console.log(`Found ${blocks.length} questions`);
```

### Test database connection

```bash
npm run db:studio
```

Mở Prisma Studio để xem dữ liệu trực quan.

## 📊 Expected Results

Sau khi seed thành công:

```
🌱 Seeding database...

📦 Creating categories...
✅ Created/Updated category: React
✅ Created/Updated category: Next.js
... (7 more)

📚 Parsing and adding questions...

🔄 Processing React questions...
📝 Found 50 React questions
🗑️  Deleted 0 old React questions
✅ Added 50 React questions

🔄 Processing Node.js questions...
📝 Found 50 Node.js questions
🗑️  Deleted 0 old Node.js questions
✅ Added 50 Node.js questions

✨ Seeding completed!

📊 Summary:
   - Categories: 9
   - React questions: 50
   - Node.js questions: 50
   - Total questions: 100
```

## 🔧 Troubleshooting

### Lỗi: "Invalid prisma.question.create()"

**Nguyên nhân:** Schema không đồng bộ

**Giải pháp:**
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### Lỗi: "Cannot find module"

**Nguyên nhân:** Thiếu dependencies

**Giải pháp:**
```bash
npm install
```

### Lỗi: "Database connection failed"

**Nguyên nhân:** Sai DATABASE_URL

**Giải pháp:**
- Kiểm tra file `.env`
- Đảm bảo database đang chạy
- Test connection: `npm run db:studio`

## 📚 Related Files

- `prisma/seed.ts` - Script seed chính
- `scripts/check-db.ts` - Script kiểm tra database
- `question-bank/*.md` - File câu hỏi markdown
- `question-bank/questions-added-log.md` - Log câu hỏi đã thêm
- `docs/code-rendering-guide.md` - Hướng dẫn render code
