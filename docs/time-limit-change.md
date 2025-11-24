# Thay đổi thời gian làm bài mặc định

## 📝 Thay đổi

Thời gian làm bài mặc định đã được thay đổi từ **60 phút** xuống **15 phút**.

## 🔧 Files đã sửa

### 1. Frontend (UI)
**File:** `src/app/recruiter/generate/page.tsx`
```typescript
// Trước: const [timeLimitMinutes, setTimeLimitMinutes] = useState(60);
// Sau:
const [timeLimitMinutes, setTimeLimitMinutes] = useState(15);
```

### 2. API Route
**File:** `src/app/api/tests/generate/route.ts`
```typescript
// Trước: timeLimitMinutes: timeLimitMinutes ? parseInt(timeLimitMinutes as string) : 60,
// Sau:
timeLimitMinutes: timeLimitMinutes ? parseInt(timeLimitMinutes as string) : 15,
```

### 3. Validator
**File:** `src/lib/validators/test.ts`
```typescript
// Trước: timeLimitMinutes: z.number().min(15).max(180).default(60),
// Sau:
timeLimitMinutes: z.number().min(15).max(180).default(15),
```

### 4. Use Case
**File:** `src/modules/testSession/useCases/generateTestUseCase.ts`
```typescript
// Trước: timeLimitMinutes = 60,
// Sau:
timeLimitMinutes = 15,
```

### 5. Database Schema
**File:** `prisma/schema.prisma`
```prisma
// Trước: timeLimitSeconds Int @default(3600) // 60 minutes
// Sau:
timeLimitSeconds Int @default(900) // 15 minutes
```

## ✅ Kết quả

- ✅ Thời gian mặc định trong form: **15 phút**
- ✅ Thời gian mặc định khi tạo test: **15 phút** (900 giây)
- ✅ Database schema đã được cập nhật
- ✅ Người dùng vẫn có thể thay đổi thời gian (min: 15 phút, max: 180 phút)

## 🎯 Ảnh hưởng

### Trước:
- Form hiển thị: 60 phút
- Test được tạo với: 60 phút (3600 giây)

### Sau:
- Form hiển thị: 15 phút
- Test được tạo với: 15 phút (900 giây)

## 📊 Tính toán

| Thời gian | Phút | Giây |
|-----------|------|------|
| Cũ | 60 | 3600 |
| Mới | 15 | 900 |
| Giảm | 45 | 2700 |

## 🔄 Rollback (nếu cần)

Nếu muốn đổi lại về 60 phút:

```bash
# 1. Sửa lại các file (thay 15 → 60, 900 → 3600)
# 2. Push schema
npm run db:push
```

## 💡 Lưu ý

- Thời gian tối thiểu vẫn là **15 phút**
- Thời gian tối đa vẫn là **180 phút** (3 giờ)
- Người dùng có thể tùy chỉnh thời gian khi tạo test
- Thay đổi này chỉ ảnh hưởng đến **test mới**, không ảnh hưởng test đã tạo
