# Candidate Deduplication - Tránh trùng lặp ứng viên

## 🎯 Vấn đề

**Trước đây:**
- Mỗi lần upload CV → Tạo candidate mới
- Cùng 1 người upload CV nhiều lần → Nhiều bản ghi trùng lặp
- Không thể theo dõi lịch sử test của cùng 1 ứng viên

**Ví dụ:**
```
Upload CV lần 1 → Candidate ID: abc123
Upload CV lần 2 (cùng người) → Candidate ID: def456 ❌ Trùng lặp!
```

## ✅ Giải pháp

**Logic mới:**
1. Khi upload CV, AI trích xuất email
2. Kiểm tra email đã tồn tại trong database chưa
3. Nếu có → Dùng lại candidate cũ, cập nhật thông tin mới
4. Nếu không → Tạo candidate mới

**Ví dụ:**
```
Upload CV lần 1 → Candidate ID: abc123 (Tạo mới)
Upload CV lần 2 (cùng email) → Candidate ID: abc123 (Dùng lại) ✅
```

## 🔧 Implementation

### 1. CandidateRepository - Method mới

**File:** `src/modules/candidate/candidateRepository.ts`

```typescript
async findOrCreate(data: CreateCandidateData) {
  // Nếu không có email → Tạo mới
  if (!data.email) {
    return this.create(data);
  }

  // Tìm candidate theo email
  const existing = await this.findByEmail(data.email);

  if (existing) {
    // Tìm thấy → Cập nhật thông tin
    return prisma.candidate.update({
      where: { id: existing.id },
      data: {
        fullName: data.fullName || existing.fullName,
        positionApplied: data.positionApplied || existing.positionApplied,
        cvSummary: data.cvSummary || existing.cvSummary,
      },
    });
  }

  // Không tìm thấy → Tạo mới
  return this.create(data);
}
```

### 2. GenerateTestUseCase - Sử dụng findOrCreate

**File:** `src/modules/testSession/useCases/generateTestUseCase.ts`

```typescript
// Trước:
const candidate = await candidateRepository.create({...});

// Sau:
const candidate = await candidateRepository.findOrCreate({...});
```

## 📊 Flow Chart

```
Upload CV
    ↓
AI trích xuất email
    ↓
Email có trong CV?
    ├─ Không → Tạo candidate mới
    └─ Có → Tìm trong database
              ├─ Tìm thấy → Dùng lại + Cập nhật info
              └─ Không tìm thấy → Tạo candidate mới
```

## 🎯 Scenarios

### Scenario 1: Upload CV lần đầu
```
Input:
  - Name: Nguyen Van A
  - Email: nguyenvana@example.com
  - Position: Frontend Developer

Output:
  ➕ Creating new candidate: Nguyen Van A (nguyenvana@example.com)
  → Candidate ID: abc123
```

### Scenario 2: Upload CV lần 2 (cùng email)
```
Input:
  - Name: Nguyen Van A
  - Email: nguyenvana@example.com
  - Position: Full Stack Developer (updated)

Output:
  ✅ Found existing candidate: Nguyen Van A (nguyenvana@example.com)
     Updating candidate info...
  → Candidate ID: abc123 (same as before)
  → Position updated: Frontend → Full Stack
```

### Scenario 3: Upload CV khác email
```
Input:
  - Name: Tran Thi B
  - Email: tranthib@example.com
  - Position: Backend Developer

Output:
  ➕ Creating new candidate: Tran Thi B (tranthib@example.com)
  → Candidate ID: def456 (new)
```

### Scenario 4: CV không có email
```
Input:
  - Name: Anonymous
  - Email: null
  - Position: Developer

Output:
  ⚠️  No email provided, creating new candidate
  → Candidate ID: ghi789 (new)
```

## ✅ Lợi ích

1. **Tránh trùng lặp:**
   - Cùng 1 người chỉ có 1 bản ghi trong database
   - Dễ quản lý và theo dõi

2. **Lịch sử test:**
   - Xem tất cả test của 1 ứng viên
   - So sánh kết quả qua các lần test

3. **Cập nhật thông tin:**
   - CV mới có thể có thông tin cập nhật
   - Tự động cập nhật vào database

4. **Database sạch:**
   - Không có candidate trùng lặp
   - Dễ query và báo cáo

## 🧪 Testing

### Chạy test script:
```bash
npm run test:candidate-dedup
```

### Expected output:
```
📝 Test 1: Create new candidate
Result: Created candidate ID abc123

📝 Test 2: Upload CV with same email
✅ Found existing candidate: Test User 1 (test@example.com)
   Updating candidate info...
Result: ✅ Reused candidate ID abc123

📝 Test 3: Create candidate with different email
Result: Created new candidate ID def456

📊 Summary
✅ Test 1 & 2: Same email → REUSED ✓
✅ Test 3: Different email → NEW CREATED ✓
```

## 🔍 Kiểm tra trong database

### Xem candidates:
```sql
SELECT id, "fullName", email, "positionApplied", "createdAt"
FROM candidates
ORDER BY "createdAt" DESC;
```

### Xem test sessions của 1 candidate:
```sql
SELECT 
  c."fullName",
  c.email,
  ts."testCode",
  ts.status,
  ts."createdAt"
FROM candidates c
JOIN test_sessions ts ON ts."candidateId" = c.id
WHERE c.email = 'nguyenvana@example.com'
ORDER BY ts."createdAt" DESC;
```

## 📝 Lưu ý

### 1. Email là unique identifier
- Email được dùng để xác định ứng viên
- Nếu CV không có email → Luôn tạo mới

### 2. Cập nhật thông tin
- Khi tìm thấy candidate cũ, thông tin sẽ được cập nhật:
  - ✅ fullName (nếu có mới)
  - ✅ positionApplied (nếu có mới)
  - ✅ cvSummary (nếu có mới)
  - ❌ email (không đổi, dùng để lookup)

### 3. Test sessions
- Mỗi lần upload CV vẫn tạo test session mới
- Nhưng test sessions sẽ link đến cùng 1 candidate

### 4. Privacy
- Email được lưu trong database
- Cần tuân thủ GDPR/privacy laws nếu deploy production

## 🚀 Future Improvements

1. **Fuzzy matching:**
   - Tìm candidate theo tên nếu không có email
   - Dùng Levenshtein distance

2. **Merge candidates:**
   - Admin có thể merge 2 candidates trùng lặp
   - Chuyển tất cả test sessions sang 1 candidate

3. **Candidate profile:**
   - Trang profile cho candidate
   - Xem lịch sử tất cả tests
   - So sánh điểm qua các lần test

4. **Email verification:**
   - Gửi email xác nhận cho candidate
   - Đảm bảo email là thật
