# Cấu trúc CV Summary

## Tổng quan

Hệ thống đã được cập nhật để tạo ra phân tích CV chi tiết hơn theo cấu trúc JSON. Dữ liệu được lưu trong cột `cvSummary` của bảng `Candidate` dưới dạng JSON string.

## Cấu trúc JSON

```json
{
  "thongTinUngVien": {
    "hoTen": "Họ tên đầy đủ",
    "viTriMongMuon": "Vị trí ứng tuyển",
    "kinhNghiem": "Mô tả kinh nghiệm. Nhiều công ty thì mỗi công ty 1 dòng (\\n)",
    "hocVanChungChi": "Trình độ học vấn. Cách nhau bằng dấu chấm phẩy (;)",
    "kyNang": "Kỹ năng lập trình: C, Java\\nCông nghệ: ReactJS, NodeJS\\nKỹ năng mềm: Teamwork, Leadership",
    "ngonNgu": "Tiếng Anh (TOEIC 850), Tiếng Nhật (N3)",
    "duAnThanhTich": [
      {
        "type": "project",
        "title": "Pharmaflow",
        "role": "Frontend Developer",
        "description": "Phát triển hệ thống quản lý nhà thuốc có tích hợp AI",
        "technologies": "ReactJS, Bootstrap, TailwindCSS, NodeJS, PostgreSQL"
      },
      {
        "type": "achievement",
        "title": "Chủ tịch JS Club",
        "description": "Lãnh đạo và quản lý hoạt động của câu lạc bộ"
      }
    ]
  },
  "nhanXetDanhGia": {
    "mucDoPhuHop": "Đánh giá mức độ phù hợp với vị trí (cao/trung bình/thấp và lý do)",
    "diemManh": [
      "Điểm mạnh 1",
      "Điểm mạnh 2",
      "Điểm mạnh 3"
    ],
    "diemCanCaiThien": [
      "Điểm cần cải thiện 1",
      "Điểm cần cải thiện 2"
    ],
    "chatLuongCV": "Nhận xét về cách trình bày CV",
    "goiYBoSung": [
      "Gợi ý 1 để CV tốt hơn",
      "Gợi ý 2 để CV tốt hơn"
    ]
  },
  "cauHoiPhongVan": [
    {
      "cauHoi": "Câu hỏi phỏng vấn số 1",
      "yChinhCanCo": "Các ý chính mà câu trả lời nên có để đánh giá ứng viên"
    },
    {
      "cauHoi": "Câu hỏi phỏng vấn số 2",
      "yChinhCanCo": "Các ý chính mà câu trả lời nên có"
    }
  ]
}
```

## Prompt AI

Prompt đã được cập nhật để AI đóng vai trò là **chuyên gia tuyển dụng & phỏng vấn với hơn 10 năm kinh nghiệm**. AI sẽ:

1. **Trích xuất thông tin từ CV**
   - Họ tên, vị trí mong muốn
   - Kinh nghiệm làm việc (mỗi công ty 1 dòng nếu có nhiều)
   - Học vấn và chứng chỉ (cách nhau bằng dấu `;`)
   - Kỹ năng (phân loại rõ: lập trình, công nghệ, kỹ năng mềm - mỗi loại 1 dòng)
   - Ngôn ngữ (kèm trình độ)
   - Dự án/Thành tích (ARRAY of objects)

2. **Đánh giá & Nhận xét**
   - Mức độ phù hợp với vị trí
   - Điểm mạnh nổi bật (array)
   - Điểm cần cải thiện (array)
   - Chất lượng trình bày CV
   - Gợi ý bổ sung (array)

3. **Gợi ý câu hỏi phỏng vấn**
   - 5-7 câu hỏi phù hợp
   - Kèm ý chính mà câu trả lời nên có

### Quy tắc Format quan trọng:

- **KHÔNG dùng markdown** (`**bold**`, `_italic_`) trong bất kỳ trường nào
- **kyNang**: Sử dụng `\n` để xuống dòng giữa các nhóm
- **duAnThanhTich**: PHẢI là ARRAY, không phải string
- **Dự án** phải có: `type: "project"`, `title`, `role`, `description`, `technologies`
- **Thành tích** phải có: `type: "achievement"`, `title`, `description`

## Hiển thị trên Frontend

Component `CVSummaryDisplay` được tạo để parse và hiển thị cấu trúc JSON này một cách đẹp mắt:

### Sử dụng Component

```tsx
import { CVSummaryDisplay } from '@/components/CVSummaryDisplay';

// Trong component của bạn
<CVSummaryDisplay cvSummary={candidate.cvSummary} />
```

### Tính năng hiển thị

- **Thông tin ứng viên**: Card với icon User
  - Kinh nghiệm (hỗ trợ xuống dòng với `\n`)
  - Học vấn & Chứng chỉ (hỗ trợ xuống dòng)
  - Kỹ năng (tự động xuống dòng theo `\n`)
  - Ngôn ngữ
  - Dự án/Thành tích (render đặc biệt):
    - **Dự án**: Border xanh, badge "Dự án", hiển thị role, description, và technologies dạng tags
    - **Thành tích**: Border vàng, badge "Thành tích", hiển thị title và description

- **Nhận xét & Đánh giá**: Card với icon Award
  - Mức độ phù hợp (highlight màu xanh)
  - Điểm mạnh (icon ✓ màu xanh, dạng list)
  - Điểm cần cải thiện (icon ⚠ màu cam, dạng list)
  - Chất lượng CV
  - Gợi ý bổ sung (icon → màu xanh, dạng list)

- **Câu hỏi phỏng vấn**: Card với icon MessageSquare
  - Badge số thứ tự
  - Câu hỏi (font-medium)
  - Ý chính cần có (background trắng, border xanh)

### Backward Compatibility

Component tự động xử lý cả 2 trường hợp:
- **Format mới** (Array): Render đẹp với border, badge, và tags
- **Format cũ** (String với markdown): Parse markdown và hiển thị với bullet points

## Lưu trữ Database

- **Cột**: `Candidate.cvSummary` (type: `Text`)
- **Format**: JSON string (sử dụng `JSON.stringify(data, null, 2)`)
- **Không cần migration**: Cột đã tồn tại, chỉ thay đổi nội dung

## Testing

### Xem prompt mới

```bash
npm run show-prompt
```

### Test phân tích CV

```bash
npm run test:cv-analysis
```

## Files đã thay đổi

1. **src/modules/ai/cvAnalysisService.ts**
   - Cập nhật prompt tiếng Việt
   - Thay đổi cấu trúc cvSummary từ string sang object
   - Normalize result để convert object thành JSON string

2. **src/components/CVSummaryDisplay.tsx** (MỚI)
   - Component hiển thị CV summary
   - Parse JSON và render theo cấu trúc
   - Fallback cho format cũ

3. **src/components/ui/badge.tsx** (MỚI)
   - UI component cho badges

4. **src/app/recruiter/tests/[id]/page.tsx**
   - Import và sử dụng CVSummaryDisplay
   - Tách phần CV Summary thành card riêng

5. **scripts/show-gemini-prompt.ts**
   - Cập nhật để hiển thị prompt mới

## Lưu ý

- Tất cả nội dung AI trả về đều bằng **tiếng Việt**
- Không cần sửa database schema
- Dữ liệu cũ vẫn hoạt động bình thường (hiển thị dạng text)
- Dữ liệu mới sẽ có cấu trúc JSON đầy đủ
