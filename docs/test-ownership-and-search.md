# Test Ownership & Search Feature

## 🎯 Tính Năng Mới

### 1. Test Ownership (Quyền Sở Hữu Test)
Mỗi bài test giờ đây được liên kết với người tạo ra nó (recruiter).

### 2. Search Functionality (Tìm Kiếm)
Tìm kiếm tests theo mã test, tên ứng viên, email, hoặc vị trí.

## 📊 Database Schema Changes

### TestSession Model
```prisma
model TestSession {
  id           String   @id
  candidateId  String   // Ứng viên
  createdBy    String   // 🆕 Người tạo test (User ID)
  testCode     String   @unique
  // ...
  candidate    Candidate @relation(...)
  creator      User      @relation(...) // 🆕 Relation
}
```

### User Model
```prisma
model User {
  id           String        @id
  email        String        @unique
  // ...
  testSessions TestSession[] // 🆕 Tests created by this user
}
```

## 🔄 Mối Quan Hệ

```
User (Recruiter)
    ↓ (1-to-many)
TestSession (Bài Test)
    ↓ (1-to-1)
Candidate (Ứng Viên)
```

**Ví dụ:**
```
Recruiter: admin@example.com
├── Test 1: TEST-ABC123
│   └── Candidate: Nguyễn Văn A
├── Test 2: TEST-XYZ789
│   └── Candidate: Trần Thị B
└── Test 3: TEST-DEF456
    └── Candidate: Lê Văn C
```

## 🔒 Security & Privacy

### Isolation by User
- Mỗi recruiter chỉ thấy tests của mình
- API tự động filter theo `createdBy = userId`
- Không thể xem tests của recruiter khác

```typescript
// API automatically filters
const where = {
  createdBy: userId, // From JWT token
};
```

## 🔍 Search Feature

### Search Fields
Tìm kiếm trong các trường:
- `testCode` - Mã test (TEST-ABC123)
- `candidate.fullName` - Tên ứng viên
- `candidate.email` - Email ứng viên
- `candidate.positionApplied` - Vị trí ứng tuyển

### Search Query
```typescript
where.OR = [
  { testCode: { contains: searchQuery, mode: 'insensitive' } },
  { candidate: { fullName: { contains: searchQuery, mode: 'insensitive' } } },
  { candidate: { email: { contains: searchQuery, mode: 'insensitive' } } },
  { candidate: { positionApplied: { contains: searchQuery, mode: 'insensitive' } } },
];
```

### Case Insensitive
- Tìm kiếm không phân biệt hoa thường
- "test" sẽ tìm thấy "TEST-ABC123"
- "nguyen" sẽ tìm thấy "Nguyễn Văn A"

## 💻 UI Components

### Search Box
```tsx
<Card>
  <CardContent>
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Tìm kiếm theo mã test, tên ứng viên..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button type="submit">🔍 Tìm kiếm</Button>
    </form>
  </CardContent>
</Card>
```

### Clear Search Button
- Nút "✕" xuất hiện khi có text
- Click để xóa và reload tất cả tests

## 🚀 Usage Flow

### Creating a Test
1. Recruiter đăng nhập
2. Tạo test từ CV
3. System lưu `createdBy = recruiter.id`
4. Test xuất hiện trong danh sách của recruiter đó

### Searching Tests
1. Vào trang "Danh Sách Test"
2. Nhập từ khóa vào search box
3. Nhấn "Tìm kiếm" hoặc Enter
4. Kết quả hiển thị ngay lập tức

### Example Searches
- `TEST-ABC` → Tìm test có mã chứa "TEST-ABC"
- `Nguyễn` → Tìm ứng viên có tên chứa "Nguyễn"
- `React` → Tìm vị trí ứng tuyển chứa "React"
- `@gmail.com` → Tìm email chứa "@gmail.com"

## 📝 API Changes

### POST /api/tests/generate
**Before:**
```typescript
{
  pdfFile: File,
  jdText: string,
  totalQuestions: number,
  timeLimitMinutes: number
}
```

**After:**
```typescript
{
  pdfFile: File,
  jdText: string,
  totalQuestions: number,
  timeLimitMinutes: number,
  createdBy: string // 🆕 Auto-extracted from JWT
}
```

### GET /api/tests
**Before:**
```typescript
GET /api/tests
// Returns all tests
```

**After:**
```typescript
GET /api/tests
// Returns only tests created by current user

GET /api/tests?search=keyword
// Returns filtered tests by search query
```

### Response Format
```typescript
{
  tests: [
    {
      id: string,
      testCode: string,
      status: string,
      candidate: {
        fullName: string,
        email: string,
        positionApplied: string
      },
      creator: { // 🆕 Creator info
        id: string,
        email: string,
        name: string
      },
      createdAt: string,
      // ...
    }
  ]
}
```

## 🧪 Testing

### Test 1: Create Test with Ownership
1. Đăng nhập với admin@example.com
2. Tạo test mới
3. Check database: `createdBy` = admin's user ID

### Test 2: View Only Own Tests
1. Đăng nhập với user A
2. Tạo 2 tests
3. Đăng nhập với user B
4. Tạo 1 test
5. User A chỉ thấy 2 tests của mình
6. User B chỉ thấy 1 test của mình

### Test 3: Search Functionality
1. Tạo test với mã "TEST-ABC123"
2. Search "ABC" → Tìm thấy
3. Search "xyz" → Không tìm thấy
4. Clear search → Hiển thị tất cả

### Test 4: Case Insensitive Search
1. Tạo test cho "Nguyễn Văn A"
2. Search "nguyen" → Tìm thấy
3. Search "NGUYEN" → Tìm thấy
4. Search "van a" → Tìm thấy

## 🔐 Security Benefits

1. **Data Isolation**: Mỗi recruiter chỉ thấy data của mình
2. **No Cross-Access**: Không thể truy cập tests của người khác
3. **Audit Trail**: Biết ai tạo test nào
4. **Accountability**: Trách nhiệm rõ ràng

## 📊 Database Migration

### Migration Applied
```sql
ALTER TABLE test_sessions 
ADD COLUMN "createdBy" TEXT NOT NULL;

ALTER TABLE test_sessions 
ADD CONSTRAINT test_sessions_createdBy_fkey 
FOREIGN KEY ("createdBy") REFERENCES users(id);

CREATE INDEX test_sessions_createdBy_idx 
ON test_sessions("createdBy");
```

### Data Reset
⚠️ Database đã được reset do thêm required field `createdBy`
- Tất cả data cũ đã bị xóa
- Cần seed lại database
- Tạo tests mới để test

## 🎯 Benefits

1. **Ownership**: Biết ai tạo test nào
2. **Privacy**: Mỗi recruiter có workspace riêng
3. **Search**: Tìm kiếm nhanh chóng
4. **Scalability**: Dễ mở rộng cho nhiều recruiters
5. **Audit**: Theo dõi hoạt động

## 📈 Future Enhancements

Có thể thêm:
- Filter by status (pending, completed, etc.)
- Filter by date range
- Sort by score, date, etc.
- Export search results
- Advanced search with multiple filters
- Share tests between recruiters (team feature)
