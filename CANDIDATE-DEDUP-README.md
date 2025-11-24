# 🔄 Candidate Deduplication

## Vấn đề đã giải quyết

**Trước:** Upload CV nhiều lần → Tạo nhiều candidate trùng lặp ❌

**Sau:** Upload CV nhiều lần (cùng email) → Dùng lại candidate cũ ✅

## Cách hoạt động

1. AI trích xuất email từ CV
2. Kiểm tra email đã tồn tại chưa
3. Nếu có → Dùng lại + Cập nhật thông tin
4. Nếu không → Tạo mới

## Ví dụ

```
Lần 1: Upload CV (email: test@example.com)
→ ➕ Creating new candidate ID: abc123

Lần 2: Upload CV (cùng email: test@example.com)
→ ✅ Found existing candidate ID: abc123
→ Updating info...

Lần 3: Upload CV (email khác: other@example.com)
→ ➕ Creating new candidate ID: def456
```

## Log khi generate test

```
Step 3: Finding or creating candidate record...

✅ Found existing candidate: Nguyen Van A (nguyenvana@example.com)
   Updating candidate info...
```

hoặc

```
Step 3: Finding or creating candidate record...

➕ Creating new candidate: Nguyen Van A (nguyenvana@example.com)
```

## Lợi ích

- ✅ Không trùng lặp candidate
- ✅ Theo dõi lịch sử test của 1 người
- ✅ Tự động cập nhật thông tin mới
- ✅ Database sạch sẽ

## Test

```bash
npm run test:candidate-dedup
```

## Tài liệu chi tiết

Xem: `docs/candidate-deduplication.md`
