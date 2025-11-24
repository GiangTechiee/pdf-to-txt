# Login Troubleshooting - Khắc phục lỗi đăng nhập

## 🐛 Vấn đề: Treo ở "Đang đăng nhập..."

### Nguyên nhân:
1. API trả về 200 nhưng frontend không redirect
2. `router.push()` không hoạt động do Next.js caching
3. Cookie không được set đúng

### ✅ Giải pháp đã áp dụng:

#### 1. Đổi từ `router.push()` sang `window.location.href`
```typescript
// Trước (có thể bị cache):
router.push('/recruiter/generate');

// Sau (hard redirect):
window.location.href = '/recruiter/generate';
```

**Lý do:** `window.location.href` tạo hard redirect, đảm bảo:
- Middleware chạy lại
- Cookie được gửi đúng
- Không bị cache

#### 2. Thêm logging để debug
```typescript
// Frontend
console.log('Login successful, redirecting...');

// Backend
console.log('✅ Login successful for:', user.email);
```

## 🔍 Cách debug

### 1. Mở Browser DevTools
- Press F12
- Chọn tab "Console"
- Chọn tab "Network"

### 2. Thử login
- Nhập email: `admin@example.com`
- Nhập password: `admin123`
- Click "Đăng nhập"

### 3. Kiểm tra Console
Nên thấy:
```
Login successful, redirecting...
```

### 4. Kiểm tra Network tab
Tìm request `/api/auth/login`:
- Status: `200 OK`
- Response:
  ```json
  {
    "success": true,
    "user": {
      "id": "...",
      "email": "admin@example.com",
      "name": "Admin",
      "role": "admin"
    }
  }
  ```

### 5. Kiểm tra Cookies
- Tab "Application" → "Cookies"
- Nên thấy cookie `auth-token`
- HttpOnly: ✓
- Path: `/`
- Expires: 7 days

### 6. Kiểm tra Server logs
Terminal nên hiển thị:
```
✅ Login successful for: admin@example.com
POST /api/auth/login 200 in 1804ms
```

## 🔧 Các lỗi thường gặp

### Lỗi 1: "Email hoặc mật khẩu không đúng"

**Nguyên nhân:**
- Email/password sai
- Admin user chưa được tạo
- Password hash không khớp

**Giải pháp:**
```bash
# Tạo lại admin user
npm run create-admin
```

### Lỗi 2: Cookie không được set

**Nguyên nhân:**
- `sameSite` setting không đúng
- Domain không khớp

**Kiểm tra:**
```typescript
// src/app/api/auth/login/route.ts
cookieStore.set('auth-token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // false in dev
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 7,
  path: '/',
});
```

### Lỗi 3: Middleware không chạy

**Nguyên nhân:**
- Middleware config sai
- Token không được gửi

**Kiểm tra:**
```typescript
// src/middleware.ts
export const config = {
  matcher: ['/recruiter/:path*'], // Đúng pattern
};
```

### Lỗi 4: CORS error

**Nguyên nhân:**
- Frontend và backend khác domain

**Giải pháp:**
- Đảm bảo cùng domain (localhost:3000)
- Hoặc config CORS

## 🧪 Test Steps

### Test 1: Login thành công
1. Visit http://localhost:3000/login
2. Enter: `admin@example.com` / `admin123`
3. Click "Đăng nhập"
4. Should redirect to `/recruiter/generate`
5. Should see "Đăng xuất" button

### Test 2: Login thất bại
1. Visit http://localhost:3000/login
2. Enter wrong password
3. Should see error: "Email hoặc mật khẩu không đúng"
4. Should stay on login page

### Test 3: Protected route
1. Logout (if logged in)
2. Try to visit http://localhost:3000/recruiter/generate
3. Should redirect to `/login`

### Test 4: Logout
1. Login first
2. Visit `/recruiter/generate`
3. Click "Đăng xuất"
4. Should redirect to home `/`
5. Try to visit `/recruiter/generate` again
6. Should redirect to `/login`

## 📊 Expected Flow

```
┌─────────────────────────────────────────────────────────┐
│ 1. User enters credentials                              │
│    ↓                                                     │
│ 2. POST /api/auth/login                                 │
│    ↓                                                     │
│ 3. Server validates                                     │
│    ├─ Find user by email                                │
│    ├─ Compare password hash                             │
│    └─ Generate JWT token                                │
│    ↓                                                     │
│ 4. Set HTTP-only cookie                                 │
│    ↓                                                     │
│ 5. Return success response                              │
│    ↓                                                     │
│ 6. Frontend receives response                           │
│    ↓                                                     │
│ 7. window.location.href = '/recruiter/generate'         │
│    ↓                                                     │
│ 8. Browser navigates (with cookie)                      │
│    ↓                                                     │
│ 9. Middleware checks cookie                             │
│    ├─ Verify JWT token                                  │
│    └─ Allow access                                      │
│    ↓                                                     │
│ 10. Show /recruiter/generate page                       │
└─────────────────────────────────────────────────────────┘
```

## 🔍 Debug Checklist

- [ ] Admin user exists in database
- [ ] Password is correct
- [ ] API returns 200 status
- [ ] Cookie is set in response
- [ ] Cookie appears in browser
- [ ] Console shows "Login successful, redirecting..."
- [ ] Server logs show "✅ Login successful for: ..."
- [ ] Redirect happens
- [ ] Middleware allows access
- [ ] Generate page loads

## 💡 Quick Fixes

### Fix 1: Clear everything and restart
```bash
# 1. Clear browser cookies
# DevTools → Application → Cookies → Delete all

# 2. Restart dev server
# Ctrl+C to stop
npm run dev
```

### Fix 2: Re-create admin
```bash
# Delete old admin
# In Prisma Studio or SQL:
# DELETE FROM users WHERE email = 'admin@example.com';

# Create new admin
npm run create-admin
```

### Fix 3: Check environment
```bash
# Verify .env has JWT_SECRET
cat .env | grep JWT_SECRET

# Should output:
# JWT_SECRET="b73d6e496049b1d6800d9ca300777ed0"
```

## 📞 Still not working?

1. Check browser console for errors
2. Check server terminal for errors
3. Check Network tab for failed requests
4. Verify cookie is set
5. Try different browser
6. Clear cache and cookies
7. Restart dev server

## 🎯 Success Indicators

When login works correctly, you should see:

**Browser Console:**
```
Login successful, redirecting...
```

**Server Terminal:**
```
✅ Login successful for: admin@example.com
POST /api/auth/login 200 in 1804ms
GET /recruiter/generate 200 in 123ms
```

**Browser:**
- URL changes to `/recruiter/generate`
- Page shows "Tạo Bài kiểm tra Phỏng vấn"
- "Đăng xuất" button visible
