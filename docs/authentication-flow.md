# Luồng Đăng Nhập (Authentication Flow)

## 📋 Tổng Quan

Hệ thống sử dụng JWT (JSON Web Token) với HttpOnly cookies để xác thực người dùng.

## 🔄 Luồng Hoạt Động

### 1. Đăng Nhập (Login)
```
User → Login Page → API /api/auth/login → Database → JWT Token → Cookie → Redirect
```

**Chi tiết:**
1. User nhập email/password tại `/login`
2. Frontend gửi POST request đến `/api/auth/login`
3. Backend:
   - Validate input (email, password không rỗng)
   - Tìm user trong database theo email
   - So sánh password với bcrypt hash
   - Tạo JWT token chứa: userId, email, role
   - Set token vào HttpOnly cookie (7 ngày)
4. Frontend nhận response và redirect đến `/recruiter/generate`

### 2. Xác Thực Request (Middleware)
```
Request → Middleware → Verify JWT → Allow/Deny
```

**Chi tiết:**
1. Mọi request đến `/recruiter/*` đều qua middleware
2. Middleware:
   - Đọc cookie `auth-token`
   - Verify JWT token bằng `jose` (Edge runtime compatible)
   - Nếu hợp lệ: cho phép truy cập
   - Nếu không: redirect về `/login`

### 3. Lấy Thông Tin User
```
Frontend → API /api/auth/me → Verify Token → Return User Info
```

### 4. Đăng Xuất (Logout)
```
User → API /api/auth/logout → Delete Cookie → Redirect to Login
```

## 🔒 Đánh Giá Bảo Mật

### ✅ Điểm Mạnh

1. **Password Hashing**
   - Sử dụng `bcryptjs` để hash password
   - Không lưu plain text password
   - Salt tự động được tạo

2. **HttpOnly Cookies**
   - Cookie không thể truy cập từ JavaScript
   - Chống XSS (Cross-Site Scripting)
   - `sameSite: 'lax'` chống CSRF cơ bản

3. **JWT Token**
   - Có thời hạn (7 ngày)
   - Chứa thông tin cần thiết (userId, email, role)
   - Signed với secret key

4. **Middleware Protection**
   - Tự động bảo vệ tất cả routes `/recruiter/*`
   - Verify token trước khi cho phép truy cập

5. **Edge Runtime Compatible**
   - Sử dụng `jose` thay vì `jsonwebtoken`
   - Tương thích với Next.js Edge Runtime

### ⚠️ Điểm Cần Cải Thiện

1. **Rate Limiting** ❌
   - Chưa có giới hạn số lần đăng nhập
   - Dễ bị brute force attack
   - **Khuyến nghị:** Thêm rate limiting (5 lần/phút)

2. **Refresh Token** ❌
   - Chỉ có access token, không có refresh token
   - Token hết hạn sau 7 ngày, user phải đăng nhập lại
   - **Khuyến nghị:** Implement refresh token pattern

3. **HTTPS Only** ⚠️
   - Cookie `secure: true` chỉ bật ở production
   - Development vẫn dùng HTTP
   - **OK cho development, nhưng PHẢI dùng HTTPS ở production**

4. **Password Policy** ❌
   - Không có yêu cầu độ mạnh password
   - Không có minimum length, special characters
   - **Khuyến nghị:** Thêm validation (min 8 ký tự, chữ hoa, số, ký tự đặc biệt)

5. **Account Lockout** ❌
   - Không có cơ chế khóa tài khoản sau nhiều lần đăng nhập sai
   - **Khuyến nghị:** Khóa tài khoản sau 5 lần sai

6. **Session Management** ❌
   - Không theo dõi active sessions
   - Không thể revoke token trước khi hết hạn
   - **Khuyến nghị:** Lưu session trong database hoặc Redis

7. **2FA (Two-Factor Authentication)** ❌
   - Chưa có xác thực 2 lớp
   - **Khuyến nghị:** Thêm OTP qua email/SMS cho tài khoản quan trọng

8. **Audit Logging** ❌
   - Không log các hoạt động đăng nhập
   - Không theo dõi IP, device, thời gian
   - **Khuyến nghị:** Log tất cả login attempts

9. **JWT Secret Rotation** ❌
   - Secret key cố định
   - Nếu bị lộ, tất cả token đều bị compromise
   - **Khuyến nghị:** Rotate secret key định kỳ

10. **CORS Configuration** ⚠️
    - Chưa thấy cấu hình CORS rõ ràng
    - **Khuyến nghị:** Cấu hình CORS chặt chẽ

## 🎯 Mức Độ Bảo Mật Hiện Tại

**Đánh giá: 6/10 - Trung Bình**

- ✅ Đủ cho môi trường development/demo
- ⚠️ Cần cải thiện trước khi production
- ❌ Chưa đủ cho hệ thống quan trọng/tài chính

## 🚀 Khuyến Nghị Ưu Tiên

### Mức Cao (Bắt buộc trước production)
1. Thêm rate limiting cho login endpoint
2. Bật HTTPS và `secure: true` cookie
3. Implement password policy
4. Thêm audit logging

### Mức Trung (Nên có)
5. Account lockout mechanism
6. Refresh token pattern
7. Session management

### Mức Thấp (Nice to have)
8. 2FA
9. JWT secret rotation
10. Advanced CORS configuration

## 📝 Code Example - Rate Limiting

```typescript
// lib/rateLimit.ts
import { LRUCache } from 'lru-cache';

const rateLimit = new LRUCache({
  max: 500,
  ttl: 60000, // 1 minute
});

export function checkRateLimit(ip: string): boolean {
  const count = (rateLimit.get(ip) as number) || 0;
  
  if (count >= 5) {
    return false; // Too many requests
  }
  
  rateLimit.set(ip, count + 1);
  return true;
}
```

## 📝 Code Example - Password Policy

```typescript
// lib/passwordPolicy.ts
export function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Mật khẩu phải có ít nhất 8 ký tự');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 chữ hoa');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 chữ thường');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 số');
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 ký tự đặc biệt');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}
```
