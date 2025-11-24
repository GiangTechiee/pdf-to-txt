# Quick Start - Hệ thống Tracking câu hỏi

## 🚀 Thêm câu hỏi mới (Nhanh)

### 1. Thêm câu vào file markdown
Ví dụ: Thêm 10 câu mới vào `question-bank/sql.md` (câu 51-60)

### 2. Chạy seed
```bash
npm run db:seed
```

✅ Hệ thống tự động:
- Phát hiện 10 câu mới
- Chỉ thêm 10 câu mới (không xóa/kiểm tra câu cũ)
- Cập nhật tracking

⚡ **Nhanh hơn 5-10 lần so với cách cũ!**

---

## 📋 Các lệnh thường dùng

```bash
# Seed (chỉ thêm câu mới)
npm run db:seed

# Xem database
npm run db:check

# Xem database trong Prisma Studio
npm run db:studio

# Reset tracking một category
npm run db:reset-tracking sql

# Reset tracking tất cả
npm run db:reset-tracking

# Xóa câu hỏi của một category
npm run db:delete-questions sql
```

---

## ⚠️ Lưu ý quan trọng

### ✅ ĐÚNG: Chỉ thêm câu mới vào cuối file
```
Câu 1
Câu 2
...
Câu 50
Câu 51 (mới) ✅
Câu 52 (mới) ✅
```

### ❌ SAI: Xóa/sửa câu giữa file
```
Câu 1
Câu 2
[Xóa câu 3] ❌
Câu 4
```

### 🔄 Nếu cần sửa câu cũ:
```bash
# 1. Xóa câu hỏi trong database
npm run db:delete-questions sql

# 2. Reset tracking
npm run db:reset-tracking sql

# 3. Seed lại
npm run db:seed
```

---

## 📖 Tài liệu chi tiết

Xem: `docs/tracking-system-guide.md`
