# 📊 Hướng dẫn xem Log phân tích CV

## 🚀 Quick Start

1. Chạy dev server:
```bash
npm run dev
```

2. Upload CV và tạo test tại `http://localhost:3000`

3. Xem log trong **terminal** (không phải browser console)

## 📋 Log sẽ hiển thị

### 1. Categories có sẵn
```
📋 Available categories for AI: react, nodejs, rest-api, sql
```

### 2. Kết quả phân tích từ Gemini AI
```
✨ Gemini AI Analysis Result:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Candidate Info:
   Name: Nguyen Van A
   Email: nguyenvana@example.com
   Position: Full Stack Developer

🎯 Skills & Weights (Raw from AI):
   • react: 0.85 (85%)      ← 85% thành thạo
   • nodejs: 0.75 (75%)     ← 75% thành thạo
   • rest-api: 0.60 (60%)   ← 60% thành thạo
   • sql: 0.50 (50%)        ← 50% thành thạo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 3. Phân bổ câu hỏi
```
📊 Question Allocation Plan:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   react: 9 questions (weight: 0.85)     ← Nhiều câu nhất
   nodejs: 8 questions (weight: 0.75)
   rest-api: 7 questions (weight: 0.60)
   sql: 6 questions (weight: 0.50)       ← Ít câu nhất
   Total: 30 questions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Difficulty Distribution (30% easy, 50% medium, 20% hard):
   react: 2 easy, 4 medium, 3 hard
   nodejs: 2 easy, 4 medium, 2 hard
   rest-api: 2 easy, 3 medium, 2 hard
   sql: 1 easy, 3 medium, 2 hard

✅ Successfully allocated 30 questions
```

## 💡 Hiểu Weight (Mức độ thành thạo)

| Weight | Phần trăm | Mức độ | Ý nghĩa |
|--------|-----------|--------|---------|
| 0.1 - 0.3 | 10-30% | Beginner | Mới bắt đầu, biết cơ bản |
| 0.4 - 0.6 | 40-60% | Intermediate | Trung bình, có kinh nghiệm |
| 0.7 - 0.9 | 70-90% | Advanced | Nâng cao, thành thạo |
| 0.9+ | 90%+ | Expert | Chuyên gia, rất giỏi |

## 🎯 Ví dụ

**CV có:**
- 3 năm React → Weight: 0.80 (80%) → 11 câu hỏi
- 1 năm Node.js → Weight: 0.50 (50%) → 7 câu hỏi
- Biết REST API → Weight: 0.40 (40%) → 6 câu hỏi
- Ít SQL → Weight: 0.30 (30%) → 6 câu hỏi

**Tổng:** 30 câu hỏi

## 📖 Tài liệu chi tiết

Xem: `docs/viewing-gemini-analysis-logs.md`
