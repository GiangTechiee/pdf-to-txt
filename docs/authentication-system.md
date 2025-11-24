# Authentication System - Hệ thống Đăng nhập

## 🔐 Tổng quan

Hệ thống đăng nhập custom cho admin/recruiter sử dụng:
- JWT (JSON Web Token)
- bcryptjs để hash password
- HTTP-only cookies để lưu token
- Middleware để protect routes

## 🏗️ Architecture

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ├─ POST /api/auth/login
       │  ↓
       │  ├─ Verify email/password
       │  ├─ Generate JWT token
       │  └─ Set HTTP-only cookie
       │
       ├─ GET /recruiter/generate
       │  ↓
       │  ├─ Middleware checks cookie
       │  ├─ Verify JWT token
       │  └─ Allow/Deny access
       │
       └─ POST /api/auth/logout
          ↓
          └─ Delete cookie
```

## 📁 Files Structure

```
src/
├── app/
│   ├── login/
│   │   └── page.tsx                    # Login page UI
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts          # Login API
│   │       ├── logout/route.ts         # Logout API
│   │       └── me/route.ts             # Get current user
│   └── recruiter/
│       └── generate/page.tsx           # Protected page (with logout button)
├── middleware.ts                        # Route protection
└── ...

scripts/
└── create-admin.ts                      # Script to create admin user
```

## 🔑 Login Flow

### 1. User visits `/login`
```
┌─────────────────────────────────────┐
│  Login Page                         │
│  ┌───────────────────────────────┐  │
│  │ Email: admin@example.com      │  │
│  │ Password: ••••••••            │  │
│  │ [Đăng nhập]                   │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### 2. Submit credentials
```typescript
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### 3. Server validates
```typescript
// 1. Find user by email
const user = await prisma.user.findUnique({ where: { email } });

// 2. Compare password
const isValid = await compare(password, user.password);

// 3. Generate JWT
const token = sign({ userId, email, role }, JWT_SECRET, { expiresIn: '7d' });

// 4. Set cookie
cookies().set('auth-token', token, { httpOnly: true, ... });
```

### 4. Redirect to `/recruiter/generate`

## 🛡️ Route Protection

### Middleware (`src/middleware.ts`)

```typescript
export function middleware(request: NextRequest) {
  if (pathname.startsWith('/recruiter')) {
    const token = request.cookies.get('auth-token');
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    try {
      verify(token.value, JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}
```

### Protected Routes:
- `/recruiter/*` - Tất cả routes dưới /recruiter
- Redirect về `/login` nếu chưa đăng nhập

## 👤 User Management

### Create Admin User

```bash
npm run create-admin
```

Output:
```
✅ Admin user created successfully!

📋 Login credentials:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Email:    admin@example.com
   Password: admin123
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hashed
  name      String?
  role      String   @default("recruiter")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔒 Security Features

### 1. Password Hashing
```typescript
import { hash } from 'bcryptjs';

const hashedPassword = await hash(password, 10);
```

### 2. HTTP-Only Cookies
```typescript
cookies().set('auth-token', token, {
  httpOnly: true,        // Cannot access via JavaScript
  secure: true,          // HTTPS only (production)
  sameSite: 'lax',       // CSRF protection
  maxAge: 60 * 60 * 24 * 7, // 7 days
});
```

### 3. JWT Token
```typescript
const token = sign(
  { userId, email, role },
  JWT_SECRET,
  { expiresIn: '7d' }
);
```

### 4. Environment Variables
```env
JWT_SECRET="your-secret-key-here"
```

## 📊 API Endpoints

### POST `/api/auth/login`
**Request:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "user": {
    "id": "abc123",
    "email": "admin@example.com",
    "name": "Admin",
    "role": "admin"
  }
}
```

**Response (Error):**
```json
{
  "error": "Email hoặc mật khẩu không đúng"
}
```

### POST `/api/auth/logout`
**Response:**
```json
{
  "success": true
}
```

### GET `/api/auth/me`
**Response:**
```json
{
  "user": {
    "id": "abc123",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

## 🧪 Testing

### 1. Create admin user
```bash
npm run create-admin
```

### 2. Start dev server
```bash
npm run dev
```

### 3. Test login flow
1. Visit http://localhost:3000
2. Click "Đăng nhập" on Recruiter card
3. Login with:
   - Email: `admin@example.com`
   - Password: `admin123`
4. Should redirect to `/recruiter/generate`
5. Try accessing `/recruiter/generate` without login → Redirect to `/login`

### 4. Test logout
1. Click "Đăng xuất" button
2. Should redirect to home page
3. Try accessing `/recruiter/generate` → Redirect to `/login`

## 🔄 User Journey

```
Home Page (/)
    ↓
Click "Đăng nhập"
    ↓
Login Page (/login)
    ↓
Enter credentials
    ↓
Submit form
    ↓
API validates
    ↓
Set cookie
    ↓
Redirect to /recruiter/generate
    ↓
Upload CV & Generate Test
    ↓
Click "Đăng xuất"
    ↓
Delete cookie
    ↓
Redirect to Home (/)
```

## ⚠️ Important Notes

### 1. JWT Secret
- Đổi `JWT_SECRET` trong production
- Dùng random string dài và phức tạp
- Không commit vào git

### 2. Password Security
- Mật khẩu được hash với bcrypt (10 rounds)
- Không bao giờ lưu plain text password
- Đổi mật khẩu mặc định trong production

### 3. Cookie Security
- `httpOnly: true` - Không thể access qua JavaScript
- `secure: true` - Chỉ gửi qua HTTPS (production)
- `sameSite: 'lax'` - CSRF protection

### 4. Token Expiration
- Token hết hạn sau 7 ngày
- User phải login lại sau 7 ngày
- Có thể thay đổi trong code

## 🚀 Future Improvements

### 1. Forgot Password
- Email reset link
- Temporary token
- Password reset form

### 2. Email Verification
- Send verification email
- Verify email before login

### 3. Two-Factor Authentication (2FA)
- TOTP (Google Authenticator)
- SMS verification

### 4. Session Management
- View active sessions
- Logout from all devices
- Session timeout

### 5. Role-Based Access Control (RBAC)
- Admin role
- Recruiter role
- Different permissions

### 6. Audit Log
- Track login attempts
- Log user actions
- Security monitoring

## 🐛 Troubleshooting

### Cannot login
1. Check admin user exists:
   ```sql
   SELECT * FROM users WHERE email = 'admin@example.com';
   ```
2. Re-create admin:
   ```bash
   npm run create-admin
   ```

### Redirect loop
1. Clear cookies
2. Check JWT_SECRET in .env
3. Restart dev server

### Token invalid
1. Check JWT_SECRET matches
2. Token might be expired
3. Clear cookies and login again

## 📝 Environment Variables

```env
# Required
JWT_SECRET="your-secret-key-change-in-production"

# Optional
NODE_ENV="development" # or "production"
```

## 🔗 Related Files

- `src/app/page.tsx` - Home page (changed button to "Đăng nhập")
- `src/app/login/page.tsx` - Login page
- `src/app/api/auth/login/route.ts` - Login API
- `src/app/api/auth/logout/route.ts` - Logout API
- `src/middleware.ts` - Route protection
- `scripts/create-admin.ts` - Create admin script
