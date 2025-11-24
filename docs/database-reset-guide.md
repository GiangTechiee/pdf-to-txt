# Database Reset & Seed Guide

## 📋 Tổng Quan

Sau khi migrate database với schema mới, cần seed lại data.

## ✅ Đã Hoàn Thành

### 1. Database Schema Updated
- Thêm `createdBy` field vào TestSession
- Thêm relation giữa User và TestSession
- Reset database để apply changes

### 2. Questions Seeded
```
✅ 200 câu hỏi đã được thêm vào database:
   - React: 50 câu (easy: 10, medium: 30, hard: 10)
   - Node.js: 50 câu (easy: 10, medium: 30, hard: 10)
   - REST API: 50 câu (easy: 10, medium: 30, hard: 10)
   - SQL: 50 câu (easy: 10, medium: 30, hard: 10)
```

### 3. Admin User Created
```
✅ Admin account:
   Email: admin@example.com
   Password: admin123
   Role: admin
```

## 🚀 Commands Used

### 1. Reset Database & Apply Schema
```bash
npx prisma db push --skip-generate
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

### 3. Seed Questions
```bash
# Remove tracking file to force re-seed
Remove-Item "question-bank/.tracking.json" -ErrorAction SilentlyContinue

# Run seed
npx prisma db seed
```

### 4. Create Admin User
```bash
npx tsx scripts/create-admin.ts
```

### 5. Verify Database
```bash
npx tsx scripts/check-db.ts
```

## 📊 Current Database State

### Categories: 10
- React
- Node.js
- Next.js
- NestJS
- ASP.NET Core
- REST API
- SQL
- Flutter
- React Native
- Machine Learning

### Questions: 200
- React: 50 questions
- Node.js: 50 questions
- REST API: 50 questions
- SQL: 50 questions

### Users: 1
- admin@example.com (admin role)

### Test Sessions: 0
- Cần tạo tests mới để test features

## 🔄 Nếu Cần Reset Lại

### Full Reset
```bash
# 1. Reset database
npx prisma db push --skip-generate

# 2. Generate client
npx prisma generate

# 3. Remove tracking
Remove-Item "question-bank/.tracking.json" -ErrorAction SilentlyContinue

# 4. Seed questions
npx prisma db seed

# 5. Create admin
npx tsx scripts/create-admin.ts

# 6. Verify
npx tsx scripts/check-db.ts
```

### Seed Questions Only
```bash
# Remove tracking and re-seed
Remove-Item "question-bank/.tracking.json" -ErrorAction SilentlyContinue
npx prisma db seed
```

### Create Admin Only
```bash
npx tsx scripts/create-admin.ts
```

## 🧪 Testing After Reset

### 1. Test Login
1. Vào http://localhost:3000/login
2. Đăng nhập với admin@example.com / admin123
3. Kiểm tra redirect về /recruiter/generate

### 2. Test Create Test
1. Upload CV (PDF)
2. Nhập Job Description
3. Tạo test
4. Kiểm tra test được tạo với createdBy = admin's ID

### 3. Test Search
1. Tạo vài tests
2. Vào /recruiter/tests
3. Search theo mã test hoặc tên ứng viên

### 4. Test Ownership
1. Tạo user thứ 2 (nếu có UI)
2. Đăng nhập với user 2
3. Kiểm tra chỉ thấy tests của user 2

## 📝 Scripts Created

### scripts/create-admin.ts
```typescript
// Tạo admin user với:
// - Email: admin@example.com
// - Password: admin123 (hashed)
// - Role: admin
```

### scripts/check-db.ts
```typescript
// Kiểm tra database:
// - Số categories
// - Số questions per category
// - Difficulty distribution
// - Duplicate questions
```

## ⚠️ Important Notes

1. **Password Policy**: Password "admin123" không đáp ứng password policy mới (cần chữ hoa). Đây chỉ là demo account.

2. **Tracking File**: File `.tracking.json` trong `question-bank/` theo dõi câu hỏi đã seed. Xóa file này để force re-seed.

3. **Database Reset**: Mỗi lần reset database, tất cả data (users, tests, candidates) đều bị xóa.

4. **Production**: Trong production, KHÔNG nên reset database. Sử dụng migrations thay vì db push.

## 🎯 Next Steps

Sau khi seed xong:
1. ✅ Đăng nhập với admin account
2. ✅ Tạo test đầu tiên
3. ✅ Test search functionality
4. ✅ Verify ownership (chỉ thấy tests của mình)

## 🔐 Security Reminder

- Đổi password admin trong production
- Sử dụng strong passwords
- Enable password policy validation
- Consider 2FA for admin accounts
