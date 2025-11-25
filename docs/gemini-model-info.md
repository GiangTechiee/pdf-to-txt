# Gemini Model Configuration

## Current Model: `gemini-2.5-pro`

### Why gemini-2.5-pro?

**Ưu điểm:**
- ✅ **Chất lượng cao hơn**: Phân tích CV chính xác và chi tiết hơn
- ✅ **Context window lớn**: 2M tokens (vs 1M của flash)
- ✅ **Reasoning tốt hơn**: Đánh giá ứng viên sâu sắc hơn
- ✅ **Ổn định**: Stable model, không phải experimental
- ✅ **Hỗ trợ PDF tốt**: Extract text từ PDF chính xác hơn

**Nhược điểm:**
- ⚠️ **Chậm hơn**: ~3-5 giây (vs ~1-2 giây của flash)
- ⚠️ **Quota thấp hơn**: 2 RPM free tier (vs 15 RPM của flash)
- ⚠️ **Đắt hơn**: Nếu dùng paid tier

---

## So sánh Models

| Feature | gemini-2.5-flash | gemini-2.5-pro | Recommendation |
|---------|------------------|----------------|----------------|
| **Speed** | ⚡⚡⚡⚡⚡ | ⚡⚡⚡ | Flash nhanh hơn 2-3x |
| **Quality** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Pro chính xác hơn |
| **Context** | 1M tokens | 2M tokens | Pro tốt hơn cho CV dài |
| **Free RPM** | 15/min | 2/min | Flash tốt hơn cho volume cao |
| **Cost (Paid)** | $0.075/1M | $1.25/1M | Flash rẻ hơn 16x |
| **Use Case** | High volume | High quality | Tùy nhu cầu |

---

## Cấu hình hiện tại

### PDF Extraction Service
```typescript
// src/modules/ai/pdfExtractorService.ts
model: 'gemini-2.5-pro'
```

### CV Analysis Service
```typescript
// src/modules/ai/cvAnalysisService.ts
model: 'gemini-2.5-pro'
```

---

## Khi nào nên đổi model?

### Đổi về `gemini-2.5-flash` nếu:
- ❌ Bị rate limit (429 Too Many Requests) thường xuyên
- ❌ Cần xử lý nhiều CV cùng lúc (>2 CV/phút)
- ❌ Ưu tiên tốc độ hơn chất lượng
- ❌ Muốn tiết kiệm chi phí (nếu dùng paid tier)

### Giữ `gemini-2.5-pro` nếu:
- ✅ Ưu tiên chất lượng phân tích
- ✅ Xử lý ít CV (<2 CV/phút)
- ✅ CV phức tạp, dài (>5 trang)
- ✅ Cần đánh giá chi tiết và sâu sắc

---

## Cách đổi model

### 1. Đổi trong code:

**File:** `src/modules/ai/pdfExtractorService.ts`
```typescript
this.model = this.genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash' // hoặc 'gemini-2.5-pro'
});
```

**File:** `src/modules/ai/cvAnalysisService.ts`
```typescript
this.model = this.genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash' // hoặc 'gemini-2.5-pro'
});
```

### 2. Xóa cache và restart:
```bash
rm -rf .next
npm run dev
```

---

## Available Models (Gemini API)

### Recommended for Production:
- ✅ `gemini-2.5-pro` - Best quality
- ✅ `gemini-2.5-flash` - Best speed/cost ratio
- ✅ `gemini-2.0-flash` - Alternative stable option

### Experimental (NOT recommended):
- ❌ `gemini-2.0-flash-exp` - Low quota, unstable
- ❌ `gemini-2.0-pro-exp` - Experimental features

---

## Quota Limits (Free Tier)

| Model | RPM | TPM (Input) | TPM (Output) |
|-------|-----|-------------|--------------|
| gemini-2.5-flash | 15 | 1M | 4M |
| gemini-2.5-pro | 2 | 32K | 8K |
| gemini-2.0-flash | 15 | 1M | 4M |

**RPM** = Requests Per Minute  
**TPM** = Tokens Per Minute

---

## Monitoring & Troubleshooting

### Check current usage:
https://ai.google.dev/gemini-api/docs/api-key

### If you get 429 errors:
1. Wait 1 minute for quota reset
2. Consider switching to `gemini-2.5-flash`
3. Or enable billing for higher quota

### If you get 403 errors:
1. API key expired or leaked
2. Create new key at: https://aistudio.google.com/app/apikey
3. Update `.env` file

---

## Best Practices

1. **Development**: Use `gemini-2.5-flash` for faster iteration
2. **Production**: Use `gemini-2.5-pro` for better quality
3. **High Volume**: Use `gemini-2.5-flash` + caching
4. **Critical Analysis**: Use `gemini-2.5-pro` always

---

## Cost Estimation (if using Paid Tier)

### Typical CV Analysis:
- Input: ~2,000 tokens (CV + prompt)
- Output: ~3,000 tokens (analysis)

**Cost per CV:**
- `gemini-2.5-flash`: $0.0002 (~0.2 cent)
- `gemini-2.5-pro`: $0.006 (~0.6 cent)

**For 1,000 CVs/month:**
- `gemini-2.5-flash`: $0.20
- `gemini-2.5-pro`: $6.00

---

## Conclusion

**Current choice: `gemini-2.5-pro`** is optimal for:
- High-quality CV analysis
- Detailed candidate evaluation
- Professional recruitment process

If you need higher throughput, switch to `gemini-2.5-flash`.
