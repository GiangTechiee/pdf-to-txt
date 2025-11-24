# Hướng dẫn hệ thống Tracking câu hỏi

## Tổng quan

Hệ thống tracking giúp tối ưu hóa quá trình seeding bằng cách:
- ✅ Đánh dấu câu hỏi đã được thêm vào database
- ⚡ Chỉ thêm câu hỏi mới, không kiểm tra trùng lặp
- 💾 Lưu trạng thái vào file `.tracking.json`

## Cách hoạt động

### File tracking: `question-bank/.tracking.json`

```json
{
  "react": {
    "totalQuestions": 50,
    "addedToDb": 50,
    "lastSync": "2025-11-23T00:00:00.000Z"
  },
  "sql": {
    "totalQuestions": 50,
    "addedToDb": 0,
    "lastSync": null
  }
}
```

- `totalQuestions`: Tổng số câu hỏi trong file markdown
- `addedToDb`: Số câu hỏi đã thêm vào database
- `lastSync`: Thời gian sync lần cuối

## Quy trình thêm câu hỏi mới

### 1. Thêm câu hỏi vào file markdown

Ví dụ: Thêm 10 câu mới vào `sql.md` (từ câu 51-60)

```markdown
### Câu 51

Câu hỏi mới?
A. Đáp án A
B. Đáp án B
C. Đáp án C
D. Đáp án D

**Đáp án: A**

---
```

### 2. Chạy seed

```bash
npm run db:seed
```

Hệ thống sẽ:
- Đọc file tracking
- Phát hiện có 10 câu mới (từ index 50 trở đi)
- Chỉ thêm 10 câu mới vào database
- Cập nhật tracking: `addedToDb: 60`

### 3. Kết quả

```
🔄 Processing SQL questions...
📝 Found 60 questions in file
➕ Adding 10 new questions (skipping first 50)...
✅ Added 10 new SQL questions
```

## Lệnh hữu ích

### Seed bình thường (chỉ thêm câu mới)
```bash
npm run db:seed
```

### Reset tracking cho một category
```bash
npm run db:reset-tracking sql
```

### Reset tracking cho tất cả categories
```bash
npm run db:reset-tracking
```

### Xem database
```bash
npm run db:studio
```

## Lưu ý quan trọng

### ⚠️ Không xóa câu hỏi giữa file

**SAI:**
```
Câu 1
Câu 2
[Xóa câu 3]  ❌
Câu 4
```

Nếu xóa câu giữa file, các câu sau sẽ bị shift và có thể bị thêm lại.

**ĐÚNG:**
- Chỉ thêm câu mới vào cuối file
- Hoặc reset tracking nếu cần sửa câu cũ

### ⚠️ Khi nào cần reset tracking?

Reset tracking khi:
- Sửa nội dung câu hỏi cũ
- Xóa câu hỏi
- Thay đổi thứ tự câu hỏi
- Muốn seed lại từ đầu

```bash
# Reset category cụ thể
npm run db:reset-tracking sql

# Sau đó seed lại
npm run db:seed
```

### ⚠️ File tracking không được commit

File `.tracking.json` đã được thêm vào `.gitignore` vì:
- Mỗi môi trường có database riêng
- Trạng thái tracking khác nhau giữa các máy
- Tránh conflict khi merge code

## Ví dụ thực tế

### Scenario 1: Thêm 50 câu SQL mới

```bash
# Bước 1: Thêm 50 câu vào sql.md (câu 1-50)

# Bước 2: Chạy seed
npm run db:seed

# Kết quả:
# ✅ Added 50 new SQL questions
# Tracking: addedToDb: 50
```

### Scenario 2: Thêm thêm 20 câu nữa

```bash
# Bước 1: Thêm 20 câu vào sql.md (câu 51-70)

# Bước 2: Chạy seed
npm run db:seed

# Kết quả:
# ➕ Adding 20 new questions (skipping first 50)...
# ✅ Added 20 new SQL questions
# Tracking: addedToDb: 70
```

### Scenario 3: Sửa câu 10

```bash
# Bước 1: Sửa nội dung câu 10 trong sql.md

# Bước 2: Reset tracking
npm run db:reset-tracking sql

# Bước 3: Xóa câu hỏi SQL cũ trong database (qua Prisma Studio hoặc SQL)
# DELETE FROM Question WHERE categoryId = 'sql';

# Bước 4: Seed lại
npm run db:seed

# Kết quả:
# ✅ Added 70 SQL questions (tất cả)
# Tracking: addedToDb: 70
```

## So sánh với cách cũ

### Cách cũ (chậm)
```typescript
// Xóa toàn bộ câu hỏi cũ
await prisma.question.deleteMany({ where: { categoryId: 'sql' } });

// Thêm lại tất cả 50 câu
for (const question of allQuestions) {
  await prisma.question.create({ data: question });
}
// ⏱️ Mất ~5-10 giây cho 50 câu
```

### Cách mới (nhanh)
```typescript
// Chỉ thêm 10 câu mới
const newQuestions = allQuestions.slice(40); // Từ câu 41
for (const question of newQuestions) {
  await prisma.question.create({ data: question });
}
// ⚡ Mất ~1-2 giây cho 10 câu mới
```

## Troubleshooting

### Lỗi: "All questions already in database"

Nghĩa là tracking cho biết đã thêm đủ câu rồi.

**Giải pháp:**
- Kiểm tra xem có thêm câu mới vào file markdown chưa
- Hoặc reset tracking nếu muốn seed lại

### Lỗi: Câu hỏi bị trùng

Có thể do:
- File tracking bị xóa hoặc reset
- Database không khớp với tracking

**Giải pháp:**
```bash
# Xóa câu hỏi trong database
# Qua Prisma Studio hoặc:
# DELETE FROM Question WHERE categoryId = 'sql';

# Reset tracking
npm run db:reset-tracking sql

# Seed lại
npm run db:seed
```

### Tracking file bị mất

File tracking sẽ tự động tạo lại với giá trị mặc định (addedToDb: 0).

**Giải pháp:**
- Kiểm tra số câu hỏi hiện tại trong database
- Cập nhật file tracking thủ công cho đúng
- Hoặc xóa database và seed lại từ đầu
