# Xem Log Phân Tích CV của Gemini AI

## 📋 Tổng quan

Khi bạn upload CV và tạo bài kiểm tra, hệ thống sẽ hiển thị log chi tiết về:
- Categories mà AI có thể chọn
- Kết quả phân tích từ Gemini AI
- Skills và weights (phần trăm) cho mỗi category
- Phân bổ câu hỏi theo category và độ khó

## 🔍 Cách xem log

### 1. Chạy development server

```bash
npm run dev
```

### 2. Upload CV và tạo test

Truy cập: `http://localhost:3000`
- Upload file CV (PDF)
- (Optional) Nhập Job Description
- Click "Generate Test"

### 3. Xem log trong terminal

Terminal sẽ hiển thị log chi tiết như sau:

## 📊 Ví dụ Log Output

```
Step 2: Analyzing CV with AI...

📋 Available categories for AI: react, nodejs, rest-api, sql

🤖 Sending request to Gemini AI...

✨ Gemini AI Analysis Result:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Candidate Info:
   Name: Nguyen Van A
   Email: nguyenvana@example.com
   Position: Full Stack Developer

🎯 Skills & Weights (Raw from AI):
   • react: 0.85 (85%)
   • nodejs: 0.75 (75%)
   • rest-api: 0.60 (60%)
   • sql: 0.50 (50%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Final Skills After Validation:
   • react: 0.85 (85%)
   • nodejs: 0.75 (75%)
   • rest-api: 0.60 (60%)
   • sql: 0.50 (50%)

Step 6: Allocating questions...

📊 Question Allocation Plan:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   react: 9 questions (weight: 0.85)
   nodejs: 8 questions (weight: 0.75)
   rest-api: 7 questions (weight: 0.60)
   sql: 6 questions (weight: 0.50)
   Total: 30 questions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Difficulty Distribution (30% easy, 50% medium, 20% hard):
   react: 2 easy, 4 medium, 3 hard
   nodejs: 2 easy, 4 medium, 2 hard
   rest-api: 2 easy, 3 medium, 2 hard
   sql: 1 easy, 3 medium, 2 hard

✅ Successfully allocated 30 questions

Test generation completed successfully!
```

## 📖 Giải thích các phần log

### 1. Available Categories
```
📋 Available categories for AI: react, nodejs, rest-api, sql
```
- Danh sách categories có câu hỏi trong database
- AI chỉ có thể chọn từ các categories này

### 2. Gemini AI Analysis Result

#### Candidate Info
```
👤 Candidate Info:
   Name: Nguyen Van A
   Email: nguyenvana@example.com
   Position: Full Stack Developer
```
- Thông tin ứng viên được AI trích xuất từ CV

#### Skills & Weights (Raw)
```
🎯 Skills & Weights (Raw from AI):
   • react: 0.85 (85%)
   • nodejs: 0.75 (75%)
   • rest-api: 0.60 (60%)
   • sql: 0.50 (50%)
```
- **Weight (0.0 - 1.0)**: Mức độ thành thạo của ứng viên
  - 0.1 - 0.3: Beginner (Mới bắt đầu)
  - 0.4 - 0.6: Intermediate (Trung bình)
  - 0.7 - 0.9: Advanced (Nâng cao)
  - 0.9+: Expert (Chuyên gia)

- **Percentage**: Chuyển đổi weight sang phần trăm để dễ đọc

#### Final Skills After Validation
```
✅ Final Skills After Validation:
   • react: 0.85 (85%)
   • nodejs: 0.75 (75%)
```
- Skills sau khi validate (loại bỏ categories không có câu hỏi)
- Nếu AI chọn category không có trong database, sẽ bị loại bỏ ở đây

### 3. Question Allocation Plan
```
📊 Question Allocation Plan:
   react: 9 questions (weight: 0.85)
   nodejs: 8 questions (weight: 0.75)
   rest-api: 7 questions (weight: 0.60)
   sql: 6 questions (weight: 0.50)
   Total: 30 questions
```
- Số câu hỏi được phân bổ cho mỗi category
- Dựa trên weight: Category có weight cao → Nhiều câu hỏi hơn
- Công thức: `questions = round((weight / totalWeight) * totalQuestions)`

### 4. Difficulty Distribution
```
📝 Difficulty Distribution (30% easy, 50% medium, 20% hard):
   react: 2 easy, 4 medium, 3 hard
   nodejs: 2 easy, 4 medium, 2 hard
```
- Phân bổ độ khó cho mỗi category
- Tỷ lệ cố định: 30% dễ, 50% trung bình, 20% khó

## 🎯 Ví dụ thực tế

### Scenario 1: CV React Developer

**Input CV:**
- 3 năm kinh nghiệm React
- 2 năm Node.js
- Biết REST API cơ bản
- Ít kinh nghiệm SQL

**Expected Log:**
```
🎯 Skills & Weights (Raw from AI):
   • react: 0.80 (80%)      ← Kinh nghiệm nhiều
   • nodejs: 0.65 (65%)     ← Kinh nghiệm trung bình
   • rest-api: 0.45 (45%)   ← Biết cơ bản
   • sql: 0.30 (30%)        ← Ít kinh nghiệm

📊 Question Allocation Plan:
   react: 11 questions      ← Nhiều câu nhất
   nodejs: 9 questions
   rest-api: 6 questions
   sql: 4 questions         ← Ít câu nhất
   Total: 30 questions
```

### Scenario 2: CV Full Stack Developer

**Input CV:**
- Thành thạo cả Frontend và Backend
- Kinh nghiệm đều nhau

**Expected Log:**
```
🎯 Skills & Weights (Raw from AI):
   • react: 0.75 (75%)
   • nodejs: 0.75 (75%)
   • rest-api: 0.70 (70%)
   • sql: 0.70 (70%)

📊 Question Allocation Plan:
   react: 8 questions       ← Phân bổ đều
   nodejs: 8 questions
   rest-api: 7 questions
   sql: 7 questions
   Total: 30 questions
```

## 🔧 Troubleshooting

### Log không hiển thị?

**Nguyên nhân:** Console log bị ẩn

**Giải pháp:**
1. Kiểm tra terminal đang chạy `npm run dev`
2. Không xem trong browser console, phải xem trong terminal

### AI chọn category không có trong database?

**Log sẽ hiển thị:**
```
⚠️  Category typescript has no questions in database, skipping

✅ Final Skills After Validation:
   • react: 0.85 (85%)
   • nodejs: 0.75 (75%)
   [typescript đã bị loại bỏ]
```

**Giải pháp:** Thêm câu hỏi cho category đó:
```bash
# Thêm file typescript.md vào question-bank/
npm run db:seed
```

### Weight không hợp lý?

**Ví dụ:** CV có 5 năm React nhưng AI cho weight 0.3

**Nguyên nhân:** 
- CV không rõ ràng về kinh nghiệm
- Thiếu keywords quan trọng

**Giải pháp:**
- Cải thiện nội dung CV
- Thêm Job Description để AI hiểu rõ hơn

## 📝 Lưu ý

1. **Log chỉ hiển thị trong development mode** (`npm run dev`)
2. **Production mode** sẽ ẩn log chi tiết để tăng performance
3. **Weight tự động normalize** về khoảng 0.0 - 1.0
4. **Tổng số câu hỏi luôn đúng** với số yêu cầu (mặc định 30)

## 🚀 Tips

### Để AI phân tích chính xác hơn:

1. **CV rõ ràng:**
   - Liệt kê công nghệ cụ thể
   - Ghi rõ số năm kinh nghiệm
   - Mô tả dự án chi tiết

2. **Thêm Job Description:**
   - AI sẽ so sánh CV với JD
   - Weight sẽ phản ánh độ phù hợp với vị trí

3. **Keywords quan trọng:**
   - React, Node.js, REST API, SQL
   - Hooks, Express, PostgreSQL, MySQL
   - Các framework và tools cụ thể
