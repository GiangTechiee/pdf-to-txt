# IT Interview Test System

Hệ thống tạo bài test phỏng vấn IT tự động dựa trên CV và JD, với tính năng theo dõi realtime.

## 🚀 Tính năng chính

- **Tạo test tự động từ CV**: Upload PDF CV, hệ thống tự động phân tích và tạo bài test phù hợp
- **Phân tích AI thông minh**: Sử dụng 2 Gemini API keys riêng biệt cho trích xuất PDF và phân tích CV
- **Realtime monitoring**: Theo dõi tiến độ làm bài của ứng viên theo thời gian thực qua WebSocket
- **Phân loại kỹ năng**: Tự động xác định category và trọng số dựa trên CV
- **Chống gian lận**: Theo dõi tab switching, time tracking
- **Clean Architecture**: Kiến trúc phân lớp rõ ràng, dễ mở rộng

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **AI**: Google Gemini API
- **Realtime**: Socket.IO
- **UI**: TailwindCSS + shadcn/ui
- **Validation**: Zod

## 📁 Cấu trúc dự án

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── tests/
│   │       ├── generate/         # Generate test from CV
│   │       ├── [code]/
│   │       │   ├── start/        # Start test
│   │       │   ├── answer/       # Save answer
│   │       │   └── submit/       # Submit test
│   │       └── [id]/details/     # Get test details
│   ├── recruiter/                # Recruiter UI
│   │   ├── generate/             # Generate test page
│   │   └── tests/[id]/           # Monitor test page
│   └── candidate/                # Candidate UI
│       ├── page.tsx              # Enter test code
│       └── [code]/               # Take test
│           ├── page.tsx          # Test interface
│           └── results/          # Results page
├── modules/                      # Business logic modules
│   ├── ai/
│   │   ├── pdfExtractorService.ts    # PDF extraction (Key A)
│   │   └── cvAnalysisService.ts      # CV analysis (Key B)
│   ├── candidate/
│   │   └── candidateRepository.ts
│   ├── question/
│   │   └── questionRepository.ts
│   ├── testSession/
│   │   ├── testSessionRepository.ts
│   │   ├── testLogRepository.ts
│   │   └── useCases/
│   │       ├── generateTestUseCase.ts
│   │       ├── startTestUseCase.ts
│   │       ├── answerQuestionUseCase.ts
│   │       ├── submitTestUseCase.ts
│   │       └── getTestDetailsUseCase.ts
│   └── realtime/
│       └── websocketServer.ts
├── components/                   # UI Components
│   └── ui/                       # shadcn/ui components
├── hooks/                        # React hooks
│   └── useWebSocket.ts
├── lib/                          # Utilities
│   ├── db.ts                     # Prisma client
│   ├── utils.ts                  # Helper functions
│   └── validators/               # Zod schemas
└── config/
    └── env.ts                    # Environment config
```

## 🔧 Cài đặt

### 1. Clone và cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình môi trường

File `.env.local` đã được tạo với các thông tin:

```env
# Database (Supabase)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Gemini API Keys
GEMINI_PDF_API_KEY="AIzaSyDcCZngdFHqzuW2JjM6MOO7DmNEM2Vsv88"
GEMINI_ANALYSIS_API_KEY="AIzaSyC6idPRKbBekl2YqPOjVQqT1R37QbV9Org"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Lưu ý**: Thay `[YOUR-PASSWORD]` trong DATABASE_URL và DIRECT_URL bằng password thực của bạn từ Supabase.

### 3. Setup Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed sample data (categories & questions)
npx tsx prisma/seed.ts
```

### 4. Chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: http://localhost:3000

## 📖 Hướng dẫn sử dụng

### Recruiter Flow

1. Truy cập `/recruiter/generate`
2. Upload CV (PDF file)
3. Nhập Job Description (optional)
4. Cấu hình số câu hỏi và thời gian
5. Click "Generate Test"
6. Hệ thống sẽ:
   - Trích xuất text từ PDF (Gemini Key A)
   - Phân tích CV và xác định skills (Gemini Key B)
   - Tạo candidate record
   - Phân bổ câu hỏi theo category và độ khó
   - Tạo test code
7. Redirect đến trang monitoring `/recruiter/tests/[id]`
8. Theo dõi realtime khi ứng viên làm bài

### Candidate Flow

1. Truy cập `/candidate`
2. Nhập test code (8 ký tự)
3. Bắt đầu làm bài
4. Hệ thống tự động lưu câu trả lời
5. Submit khi hoàn thành
6. Xem trang kết quả

## 🔑 Hai API Keys Gemini

### Key A - PDF Extraction
- **Biến môi trường**: `GEMINI_PDF_API_KEY`
- **Mục đích**: Chỉ trích xuất text từ PDF
- **Service**: `pdfExtractorService.ts`
- **Input**: Buffer (PDF file)
- **Output**: String (extracted text)

### Key B - CV Analysis
- **Biến môi trường**: `GEMINI_ANALYSIS_API_KEY`
- **Mục đích**: Phân tích CV text và trích xuất thông tin
- **Service**: `cvAnalysisService.ts`
- **Input**: String (CV text), String (JD text - optional)
- **Output**: Structured data (candidate info, skills, summary)

**Quan trọng**: Mỗi service có client Gemini riêng, không tái sử dụng giữa 2 keys.

## 🗄 Database Schema

### Bảng chính

- **categories**: Danh mục kỹ năng (REACT, NODEJS, etc.)
- **questions**: Ngân hàng câu hỏi
- **candidates**: Thông tin ứng viên
- **test_sessions**: Phiên thi
- **test_session_questions**: Câu hỏi trong bài thi
- **test_session_categories**: Trọng số category cho mỗi test
- **test_logs**: Logs hoạt động (start, submit, tab_blur, etc.)

## 🌐 WebSocket Events

### Candidate → Server
- `join_test_room`: Join monitoring room
- `candidate_event`: Emit events (answer_change, tab_blur, tab_focus)

### Server → Recruiter
- `test_update`: Real-time updates về test progress

## 📊 Phân bổ câu hỏi

- **Theo category**: Dựa trên trọng số từ AI analysis
- **Theo độ khó**:
  - 50% Medium
  - 30% Easy
  - 20% Hard

## 🔒 Security Features

- Tab switching detection
- Time limit enforcement
- Auto-submit on timeout
- Activity logging

## 🚀 Production Deployment

1. Thay đổi `JWT_SECRET` trong production
2. Cấu hình CORS cho WebSocket
3. Setup SSL/TLS
4. Configure database connection pooling
5. Enable Prisma query logging

## 📝 Scripts

```bash
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to DB
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
```

## 🎯 Next Steps

- [ ] Thêm authentication cho recruiter
- [ ] Export results to PDF
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Question difficulty auto-adjustment
- [ ] Multi-language support

## 📄 License

MIT

---

**Developed with ❤️ using Next.js, Prisma, and Gemini AI**
