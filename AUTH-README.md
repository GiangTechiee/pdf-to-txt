# 🔐 Authentication System

## Quick Start

### 1. Create Admin User
```bash
npm run create-admin
```

Output:
```
✅ Admin user created!
   Email:    admin@example.com
   Password: admin123
```

### 2. Login
1. Visit http://localhost:3000
2. Click "Đăng nhập" (Recruiter card)
3. Enter credentials
4. Access `/recruiter/generate`

### 3. Logout
Click "Đăng xuất" button on generate page

## Features

- ✅ JWT-based authentication
- ✅ bcrypt password hashing
- ✅ HTTP-only cookies
- ✅ Route protection with middleware
- ✅ Auto redirect if not logged in
- ✅ 7-day session expiry

## Protected Routes

All routes under `/recruiter/*` require login:
- `/recruiter/generate` - Create test
- `/recruiter/tests/:id` - View test details

## Security

- 🔒 Passwords hashed with bcrypt
- 🔒 JWT tokens in HTTP-only cookies
- 🔒 CSRF protection
- 🔒 Secure cookies in production

## Files

```
src/
├── app/
│   ├── login/page.tsx              # Login UI
│   ├── api/auth/
│   │   ├── login/route.ts          # Login API
│   │   ├── logout/route.ts         # Logout API
│   │   └── me/route.ts             # Get user
│   └── recruiter/generate/page.tsx # Protected page
├── middleware.ts                    # Route protection
scripts/
└── create-admin.ts                  # Create admin
```

## Environment

```env
JWT_SECRET="your-secret-key"
```

## Docs

Full documentation: `docs/authentication-system.md`

## ⚠️ Important

**Change password in production!**

Default credentials are for development only.
