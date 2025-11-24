# Hướng Dẫn Setup & Chạy Dự Án

## 📋 Yêu Cầu

- Node.js 18+
- npm hoặc yarn
- PostgreSQL database (hoặc Supabase)

## 🚀 Cài Đặt

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Cấu Hình Environment Variables
File `.env` đã có sẵn với các giá trị:
```env
DATABASE_URL="..."
DIRECT_URL="..."
GEMINI_PDF_API_KEY="..."
GEMINI_ANALYSIS_API_KEY="..."
JWT_SECRET="b73d6e496049b1d6800d9ca300777ed0"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (tạo admin user)
npx prisma db seed
```

### 4. Chạy Development Server
```bash
npm run dev
```

Truy cập: http://localhost:3000

## 👤 Tài Khoản Demo

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

**Lưu ý:** Password này không đáp ứng password policy mới. Để test password policy, hãy tạo user mới với password mạnh hơn.

## 🔐 Password Policy

Mật khẩu mới phải có:
- Tối thiểu 8 ký tự
- Ít nhất 1 chữ hoa (A-Z)
- Ít nhất 1 chữ thường (a-z)
- Ít nhất 1 số (0-9)

Ví dụ password hợp lệ: `Admin123`, `Test1234`, `Secure99`

## 🛡️ Rate Limiting

- Giới hạn: 5 lần đăng nhập/phút theo IP
- Sau 5 lần thất bại: phải đợi 1 phút
- Tự động reset sau thời gian chờ

## 📱 Tính Năng

### Recruiter Dashboard
1. **Tạo Bài Test** (`/recruiter/generate`)
   - Upload CV (PDF)
   - Nhập Job Description
   - Cấu hình số câu hỏi & thời gian
   - AI tự động tạo câu hỏi

2. **Danh Sách Test** (`/recruiter/tests`)
   - Xem tất cả tests đã tạo
   - Filter theo status
   - Xem điểm số
   - Chi tiết từng test

3. **Header Navigation**
   - Logo & branding
   - Navigation tabs
   - User info
   - Logout button

### Candidate Test
- Truy cập bằng test code
- Làm bài test online
- Tự động chấm điểm

## 🔧 Troubleshooting

### Lỗi: "Too many login attempts"
- Đợi 1 phút và thử lại
- Hoặc restart server để reset rate limit

### Lỗi: "Token verification failed"
- Xóa cookies trong browser
- Đăng nhập lại

### Lỗi: Database connection
- Kiểm tra DATABASE_URL trong .env
- Chạy `npx prisma migrate dev`

### Lỗi: "Cannot find module 'jose'"
- Chạy `npm install jose`

## 📚 Cấu Trúc Dự Án

```
src/
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication endpoints
│   │   └── tests/         # Test management endpoints
│   ├── login/             # Login page
│   ├── recruiter/         # Recruiter dashboard
│   │   ├── layout.tsx     # Layout với Header
│   │   ├── generate/      # Tạo test
│   │   └── tests/         # Danh sách tests
│   └── candidate/         # Candidate test pages
├── components/
│   ├── layout/
│   │   └── Header.tsx     # Navigation header
│   └── ui/                # UI components
├── lib/
│   ├── rateLimit.ts       # Rate limiting
│   └── passwordPolicy.ts  # Password validation
└── middleware.ts          # Auth middleware

docs/
├── authentication-flow.md      # Chi tiết luồng đăng nhập
├── security-improvements.md    # Cải tiến bảo mật
└── setup-guide.md             # Hướng dẫn này
```

## 🎯 Next Steps

Sau khi setup xong, bạn có thể:
1. Đăng nhập với tài khoản admin
2. Tạo bài test đầu tiên
3. Test với candidate
4. Xem kết quả trong dashboard

## 💡 Tips

- Dùng Chrome DevTools để xem cookies và JWT token
- Check console logs để debug
- Xem `docs/authentication-flow.md` để hiểu luồng hoạt động
- Đọc `docs/security-improvements.md` để biết các cải tiến bảo mật
