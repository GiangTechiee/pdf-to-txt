# Homepage với Auth State

## 🎯 Tính Năng

Trang chủ (`/`) giờ đây hiển thị nội dung khác nhau tùy theo trạng thái đăng nhập của user.

## 🔄 Luồng Hoạt Động

### 1. Khi Chưa Đăng Nhập
```
- Hiển thị nút "Đăng nhập"
- Click → Chuyển đến /login
```

### 2. Khi Đã Đăng Nhập
```
- Hiển thị "Xin chào, [email]" ở góc phải
- Nút "Đăng nhập" → "Tạo Bài Kiểm Tra"
- Click → Chuyển đến /recruiter/generate
- Có nút "Dashboard →" để truy cập nhanh
```

## 💻 Implementation

### Client-Side Auth Check
```typescript
useEffect(() => {
  checkAuth();
}, []);

const checkAuth = async () => {
  try {
    const res = await fetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    }
  } catch (error) {
    console.log('Not authenticated');
  } finally {
    setLoading(false);
  }
};
```

### Conditional Rendering
```typescript
{loading ? (
  <Button disabled>Đang tải...</Button>
) : user ? (
  <Button onClick={() => router.push('/recruiter/generate')}>
    Tạo Bài Kiểm Tra
  </Button>
) : (
  <Link href="/login">
    <Button>Đăng nhập</Button>
  </Link>
)}
```

## 🎨 UI States

### Loading State
- Hiển thị "Đang tải..." trong nút
- Nút bị disable

### Authenticated State
- Badge "Xin chào, [email]" ở góc phải
- Nút "Dashboard →" để truy cập nhanh
- Nút chính: "Tạo Bài Kiểm Tra"

### Unauthenticated State
- Không có badge
- Nút chính: "Đăng nhập"

## 🔍 User Experience

### Scenario 1: User mới
1. Vào trang chủ
2. Thấy nút "Đăng nhập"
3. Click → Đến trang login
4. Đăng nhập thành công → Redirect về /recruiter/generate

### Scenario 2: User đã đăng nhập
1. Vào trang chủ
2. Thấy "Xin chào, admin@example.com"
3. Thấy nút "Tạo Bài Kiểm Tra"
4. Click → Đến /recruiter/generate ngay

### Scenario 3: User đã đăng nhập muốn về dashboard
1. Vào trang chủ
2. Click "Dashboard →" ở góc phải
3. Đến /recruiter/generate

## 🚀 Benefits

1. **Better UX**: User không cần đăng nhập lại nếu đã login
2. **Quick Access**: Truy cập nhanh vào dashboard
3. **Clear State**: Rõ ràng user đang ở trạng thái nào
4. **Seamless Flow**: Luồng mượt mà từ homepage → dashboard

## 📝 Technical Details

- **Component Type**: Client Component (`'use client'`)
- **Auth Check**: Gọi `/api/auth/me` để verify token
- **State Management**: React useState cho user và loading
- **Navigation**: useRouter từ next/navigation

## 🧪 Testing

### Test 1: Chưa đăng nhập
1. Xóa cookies
2. Vào http://localhost:3000
3. Kiểm tra: Thấy nút "Đăng nhập"

### Test 2: Đã đăng nhập
1. Đăng nhập với admin@example.com
2. Vào http://localhost:3000
3. Kiểm tra: 
   - Thấy "Xin chào, admin@example.com"
   - Thấy nút "Tạo Bài Kiểm Tra"
   - Click nút → Đến /recruiter/generate

### Test 3: Loading state
1. Throttle network trong DevTools
2. Reload trang
3. Kiểm tra: Thấy "Đang tải..." trong nút
