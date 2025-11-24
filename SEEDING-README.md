# 🌱 Database Seeding - Quick Start

## ✅ Đảm bảo không trùng lặp

Script seed đã được thiết kế để **AN TOÀN 100%** khi chạy nhiều lần:

### Categories
- ✅ Dùng `upsert` - Không tạo trùng
- ✅ Chỉ cập nhật nếu đã tồn tại

### Questions  
- ✅ **Xóa câu hỏi cũ** của category trước khi thêm mới
- ✅ Đảm bảo không bao giờ bị trùng lặp
- ✅ Chạy 100 lần vẫn chỉ có 100 câu hỏi

## 🚀 Cách sử dụng

### 1. Kiểm tra database (Optional)
```bash
npm run db:check
```

### 2. Chạy seed
```bash
npm run db:seed
```

### 3. Kiểm tra lại
```bash
npm run db:check
```

## 📊 Kết quả mong đợi

Mỗi lần chạy `npm run db:seed`:

```
✅ 9 Categories (không trùng)
✅ 50 React questions (xóa cũ → thêm mới)
✅ 50 Node.js questions (xóa cũ → thêm mới)
✅ Tổng: 100 câu hỏi
✅ 0 câu trùng lặp
```

## 🔄 Chạy nhiều lần

```bash
# Lần 1
npm run db:seed
# → Thêm 100 câu mới

# Lần 2  
npm run db:seed
# → Xóa 100 câu cũ → Thêm 100 câu mới

# Lần 3
npm run db:seed
# → Xóa 100 câu cũ → Thêm 100 câu mới

# Kết quả: Luôn có đúng 100 câu, không trùng!
```

## 📁 Files quan trọng

- `prisma/seed.ts` - Script seed (có logic xóa trùng)
- `scripts/check-db.ts` - Kiểm tra database
- `question-bank/react.md` - 50 câu React
- `question-bank/nodejs.md` - 50 câu Node.js
- `docs/seeding-guide.md` - Hướng dẫn chi tiết

## ⚠️ Lưu ý

**Không seed trên production khi đã có test sessions thật!**

Vì câu hỏi bị xóa sẽ làm mất dữ liệu test sessions liên quan (do `onDelete: Cascade`).

## 📚 Chi tiết

Xem thêm: `docs/seeding-guide.md`
