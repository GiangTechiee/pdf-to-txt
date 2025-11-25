/**
 * Script để xem prompt thực tế được gửi cho Gemini AI
 */

import { formatCategoriesForAI, CATEGORIES } from '../src/config/categories';

console.log('🤖 Gemini AI Prompt Structure\n');
console.log('═'.repeat(80));
console.log('📋 NGUỒN DANH MỤC: config/categories.json');
console.log('═'.repeat(80));

console.log('\n📦 Categories trong config:\n');
CATEGORIES.forEach((cat, index) => {
  console.log(`${index + 1}. ${cat.id.padEnd(20)} - ${cat.name}`);
  console.log(`   Description: ${cat.description}`);
  console.log(`   Keywords: ${cat.keywords.join(', ')}`);
  console.log();
});

console.log('═'.repeat(80));
console.log('📝 PROMPT GỬI CHO GEMINI');
console.log('═'.repeat(80));

const sampleCV = `
Nguyen Van A
Email: a@example.com
Skills: React, Node.js, TypeScript
`;

const prompt = `Bạn là một chuyên gia tuyển dụng & phỏng vấn với hơn 10 năm kinh nghiệm trong các lĩnh vực CNTT, Marketing, và Kinh doanh. Nhiệm vụ của bạn là phân tích CV được tải lên, đánh giá mức độ phù hợp với yêu cầu tuyển dụng, đưa ra nhận xét chi tiết và gợi ý các câu hỏi phỏng vấn kèm các ý chính mà câu trả lời nên có.

⚠️ LƯU Ý QUAN TRỌNG VỀ FORMAT:
- Tất cả text PHẢI là plain text, KHÔNG dùng markdown (**bold**, _italic_)
- Sử dụng \\n để xuống dòng khi cần
- duAnThanhTich PHẢI là ARRAY of objects, KHÔNG phải string

Nội dung CV:
${sampleCV}

Quy trình xử lý:

1. Trích xuất thông tin từ CV:
   - Họ tên ứng viên
   - Vị trí mong muốn / lĩnh vực chuyên môn
   - Kinh nghiệm làm việc (số năm, lĩnh vực, công ty tiêu biểu)
   - Trình độ học vấn và chứng chỉ liên quan
   - Kỹ năng chính (technical & soft skills)
   - Ngôn ngữ và trình độ
   - Thành tích hoặc dự án nổi bật (nếu có)

2. Đánh giá & nhận xét:
   - Mức độ phù hợp với vị trí đang tuyển
   - Điểm mạnh nổi bật
   - Điểm cần cải thiện
   - Chất lượng trình bày CV (rõ ràng, chuyên nghiệp, thiếu thông tin…)
   - Gợi ý bổ sung để CV tốt hơn

3. Gợi ý câu hỏi phỏng vấn:
   - Chọn 5–7 câu hỏi phù hợp với vị trí và kinh nghiệm của ứng viên
   - Mỗi câu hỏi cần kèm ý chính mà câu trả lời nên có

Danh sách các kỹ năng kỹ thuật có sẵn (PHẢI sử dụng ĐÚNG ID):
${formatCategoriesForAI()}

QUAN TRỌNG: Chỉ sử dụng các category ID được liệt kê ở trên (viết thường, có dấu gạch ngang).
Đây là các category DUY NHẤT có câu hỏi trong cơ sở dữ liệu.

Trả về ĐÚNG định dạng JSON sau (không thêm text nào khác):
{
  "candidateInfo": {
    "fullName": "string hoặc null",
    "email": "string hoặc null",
    "positionApplied": "string hoặc null"
  },
  "skillsWithWeights": [
    { "categoryId": "react", "weight": 0.8 },
    { "categoryId": "nodejs", "weight": 0.6 }
  ],
  "cvSummary": {
    "thongTinUngVien": {
      "hoTen": "Họ tên đầy đủ",
      "viTriMongMuon": "Vị trí ứng tuyển",
      "kinhNghiem": "Mô tả kinh nghiệm (số năm, lĩnh vực, công ty). Nếu có nhiều công ty, mỗi công ty trên 1 dòng.",
      "hocVanChungChi": "Trình độ học vấn và các chứng chỉ. Mỗi bằng cấp/chứng chỉ cách nhau bằng dấu chấm phẩy (;).",
      "kyNang": "Danh sách kỹ năng. PHẢI phân loại rõ ràng:\\n- Dòng 1: Kỹ năng lập trình (ngôn ngữ)\\n- Dòng 2: Công nghệ/Framework\\n- Dòng 3: Kỹ năng mềm\\nMỗi loại trên 1 dòng riêng, cách nhau bằng \\n",
      "ngonNgu": "Các ngôn ngữ và trình độ. Ví dụ: Tiếng Anh (TOEIC 850), Tiếng Nhật (N3)",
      "duAnThanhTich": [
        {
          "type": "project",
          "title": "Tên dự án",
          "role": "Vai trò",
          "description": "Mô tả chi tiết",
          "technologies": "ReactJS, NodeJS, PostgreSQL"
        },
        {
          "type": "achievement",
          "title": "Tên thành tích",
          "description": "Mô tả chi tiết"
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
}

Nguyên tắc chung:
- Luôn phân tích dựa trên dữ liệu thật có trong CV (không suy đoán thông tin chưa có)
- Giữ giọng văn chuyên nghiệp, khách quan, không thiên vị
- Các gợi ý câu hỏi phỏng vấn phải sát với vị trí và giúp khai thác thêm thông tin mà CV chưa thể hiện rõ
- Nếu CV thiếu thông tin quan trọng, cần chỉ rõ trong phần đánh giá
- Chỉ bao gồm các category mà ứng viên có kỹ năng thực sự
- Weight phản ánh mức độ thành thạo (0.1 = mới bắt đầu, 0.5 = trung cấp, 0.8+ = nâng cao)
- Bao gồm ít nhất 2 và tối đa 6 categories
- Tất cả nội dung PHẢI viết bằng tiếng Việt
- Trả về CHỈ JSON, không có text bổ sung`;

console.log(prompt);

console.log('\n═'.repeat(80));
console.log('🔍 PHẦN QUAN TRỌNG: Categories trong prompt');
console.log('═'.repeat(80));
console.log('\n' + formatCategoriesForAI());

console.log('\n═'.repeat(80));
console.log('✅ KẾT LUẬN');
console.log('═'.repeat(80));
console.log(`
1. Gemini KHÔNG truy cập database
2. Gemini KHÔNG biết categories nào có trong DB
3. Gemini chỉ nhận danh sách categories từ PROMPT
4. Prompt được tạo từ: config/categories.json
5. Gemini trả về categoryId theo đúng format trong prompt

Flow:
  config/categories.json
         ↓
  formatCategoriesForAI()
         ↓
  Prompt text (gửi cho Gemini)
         ↓
  Gemini đọc và trả về JSON với categoryId
         ↓
  Validation filter (chỉ giữ IDs hợp lệ)
         ↓
  Query database với categoryId
`);

console.log('═'.repeat(80));
console.log('💡 Để thêm category mới:');
console.log('═'.repeat(80));
console.log(`
1. Thêm vào config/categories.json
2. Chạy npm run db:seed (để thêm vào DB)
3. Gemini tự động biết category mới (vì prompt tự động update)
4. Không cần sửa code gì khác!
`);
