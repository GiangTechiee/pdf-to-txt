// CV Analysis Service - Uses GEMINI_ANALYSIS_API_KEY (Key B)
// Purpose: Analyze CV text and extract structured information
import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '@/config/env';
import { formatAvailableCategoriesForAI, getAvailableCategoryIds } from '@/modules/question/questionService';
import { CvAnalysisService, CvAnalysisResult } from './types';

class GeminiCvAnalysisService implements CvAnalysisService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // Initialize with analysis API key (Key B)
    this.genAI = new GoogleGenerativeAI(env.GEMINI_ANALYSIS_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
  }

  async analyzeCvAndJd(cvText: string, jdText?: string): Promise<CvAnalysisResult> {
    try {
      // Get available categories from database
      const availableCategoryIds = await getAvailableCategoryIds();
      
      console.log('\n📋 Available categories for AI:', availableCategoryIds.join(', '));
      
      if (availableCategoryIds.length === 0) {
        throw new Error('No categories with questions available in database');
      }

      const prompt = await this.buildAnalysisPrompt(cvText, jdText);

      console.log('🤖 Sending request to Gemini AI...');
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from AI');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      console.log('\n✨ Gemini AI Analysis Result:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('👤 Candidate Info:');
      console.log(`   Name: ${parsed.candidateInfo?.fullName || 'N/A'}`);
      console.log(`   Email: ${parsed.candidateInfo?.email || 'N/A'}`);
      console.log(`   Position: ${parsed.candidateInfo?.positionApplied || 'N/A'}`);
      console.log('\n🎯 Skills & Weights (Raw from AI):');
      if (Array.isArray(parsed.skillsWithWeights)) {
        parsed.skillsWithWeights.forEach((skill: any) => {
          const percentage = (skill.weight * 100).toFixed(0);
          console.log(`   • ${skill.categoryId}: ${skill.weight.toFixed(2)} (${percentage}%)`);
        });
      }
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      // Validate and normalize the response
      const normalizedResult = this.normalizeAnalysisResult(parsed, availableCategoryIds);
      
      console.log('✅ Final Skills After Validation:');
      normalizedResult.skillsWithWeights.forEach((skill) => {
        const percentage = (skill.weight * 100).toFixed(0);
        console.log(`   • ${skill.categoryId}: ${skill.weight.toFixed(2)} (${percentage}%)`);
      });
      console.log('');
      
      return normalizedResult;
    } catch (error) {
      console.error('❌ CV analysis error:', error);
      throw new Error(`Failed to analyze CV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async buildAnalysisPrompt(cvText: string, jdText?: string): Promise<string> {
    const categoriesText = await formatAvailableCategoriesForAI();
    
    return `Bạn là một chuyên gia tuyển dụng & phỏng vấn với hơn 10 năm kinh nghiệm trong các lĩnh vực CNTT, Marketing, và Kinh doanh. Nhiệm vụ của bạn là phân tích CV được tải lên, đánh giá mức độ phù hợp với yêu cầu tuyển dụng, đưa ra nhận xét chi tiết và gợi ý các câu hỏi phỏng vấn kèm các ý chính mà câu trả lời nên có.

Nội dung CV:
${cvText}

${jdText ? `Mô tả công việc (Job Description):\n${jdText}\n` : ''}

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
${categoriesText}

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
      "kyNang": "Danh sách kỹ năng. PHẢI phân loại rõ ràng:\n- Dòng 1: Kỹ năng lập trình (ngôn ngữ)\n- Dòng 2: Công nghệ/Framework\n- Dòng 3: Kỹ năng mềm\nMỗi loại trên 1 dòng riêng, cách nhau bằng \\n",
      "ngonNgu": "Các ngôn ngữ và trình độ. Ví dụ: Tiếng Anh (TOEIC 850), Tiếng Nhật (N3)",
      "duAnThanhTich": "ARRAY - Danh sách dự án và thành tích. MỖI ITEM là 1 object có cấu trúc:\n{\"type\": \"project\" hoặc \"achievement\", \"title\": \"Tên dự án/thành tích\", \"role\": \"Vai trò (chỉ có khi type=project)\", \"description\": \"Mô tả chi tiết\", \"technologies\": \"Công nghệ sử dụng (chỉ có khi type=project)\"}"
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

VÍ DỤ CỤ THỂ về duAnThanhTich (QUAN TRỌNG - PHẢI TUÂN THỦ):
"duAnThanhTich": [
  {
    "type": "project",
    "title": "Pharmaflow",
    "role": "Frontend Developer",
    "description": "Phát triển hệ thống quản lý nhà thuốc có tích hợp AI, quản lý toàn bộ vòng đời phát triển sản phẩm, xây dựng giao diện người dùng thân thiện",
    "technologies": "ReactJS, Bootstrap, TailwindCSS, Vite, NodeJS, ExpressJS, PostgreSQL"
  },
  {
    "type": "project",
    "title": "Whatpad",
    "role": "Frontend Developer",
    "description": "Phát triển ứng dụng đọc và viết truyện trực tuyến, tập trung vào giao diện thân thiện, responsive",
    "technologies": "ReactJS, Bootstrap, NodeJS, ExpressJS, MySQL"
  },
  {
    "type": "achievement",
    "title": "Chủ tịch JS Club",
    "description": "Japanese Software Engineer Club - Lãnh đạo và quản lý hoạt động của câu lạc bộ"
  },
  {
    "type": "achievement",
    "title": "Học bổng 30% Đại học FPT",
    "description": "Đạt học bổng dựa trên thành tích học tập"
  }
]

Nguyên tắc chung:
- Luôn phân tích dựa trên dữ liệu thật có trong CV (không suy đoán thông tin chưa có)
- Giữ giọng văn chuyên nghiệp, khách quan, không thiên vị
- Các gợi ý câu hỏi phỏng vấn phải sát với vị trí và giúp khai thác thêm thông tin mà CV chưa thể hiện rõ
- Nếu CV thiếu thông tin quan trọng, cần chỉ rõ trong phần đánh giá
- Chỉ bao gồm các category mà ứng viên có kỹ năng thực sự
- Weight phản ánh mức độ thành thạo (0.1 = mới bắt đầu, 0.5 = trung cấp, 0.8+ = nâng cao)
- Bao gồm ít nhất 2 và tối đa 6 categories
- Tất cả nội dung PHẢI viết bằng tiếng Việt
- Trả về CHỈ JSON, không có text bổ sung

QUY TẮC FORMAT QUAN TRỌNG:
- kyNang: Sử dụng \\n để xuống dòng giữa các nhóm kỹ năng
- duAnThanhTich: PHẢI là ARRAY of objects, KHÔNG được là string
- Mỗi dự án phải có đầy đủ: type, title, role (nếu là project), description, technologies (nếu là project)
- Mỗi thành tích phải có: type, title, description
- KHÔNG sử dụng markdown formatting (**bold**, _italic_) trong bất kỳ trường nào`;
  }

  private normalizeAnalysisResult(parsed: any, availableCategoryIds: string[]): CvAnalysisResult {
    // Validate and provide defaults
    const result: CvAnalysisResult = {
      candidateInfo: {
        fullName: parsed.candidateInfo?.fullName || undefined,
        email: parsed.candidateInfo?.email || undefined,
        positionApplied: parsed.candidateInfo?.positionApplied || undefined,
      },
      skillsWithWeights: [],
      cvSummary: '',
    };

    // Validate skills
    if (Array.isArray(parsed.skillsWithWeights)) {
      result.skillsWithWeights = parsed.skillsWithWeights
        .filter((skill: any) => skill.categoryId && typeof skill.weight === 'number')
        .map((skill: any) => ({
          categoryId: skill.categoryId,
          weight: Math.max(0, Math.min(1, skill.weight)), // Clamp between 0 and 1
        }));
    }

    // Validate that all categoryIds are available (have questions in database)
    result.skillsWithWeights = result.skillsWithWeights.filter(skill => {
      const isAvailable = availableCategoryIds.includes(skill.categoryId);
      if (!isAvailable) {
        console.warn(`Category ${skill.categoryId} has no questions in database, skipping`);
      }
      return isAvailable;
    });
    
    // Ensure at least one skill category (fallback to first available)
    if (result.skillsWithWeights.length === 0) {
      const fallbackCategory = availableCategoryIds[0] || 'nodejs';
      console.warn(`No valid categories found, using fallback: ${fallbackCategory}`);
      result.skillsWithWeights.push({ categoryId: fallbackCategory, weight: 0.5 });
    }

    // Convert cvSummary object to JSON string for storage
    if (parsed.cvSummary && typeof parsed.cvSummary === 'object') {
      result.cvSummary = JSON.stringify(parsed.cvSummary, null, 2);
    } else if (typeof parsed.cvSummary === 'string') {
      // Fallback for old format
      result.cvSummary = parsed.cvSummary;
    } else {
      result.cvSummary = JSON.stringify({
        thongTinUngVien: {
          hoTen: parsed.candidateInfo?.fullName || 'N/A',
          viTriMongMuon: parsed.candidateInfo?.positionApplied || 'N/A',
          kinhNghiem: 'Không có thông tin',
          hocVanChungChi: 'Không có thông tin',
          kyNang: 'Không có thông tin',
          ngonNgu: 'Không có thông tin',
          duAnThanhTich: 'Không có thông tin'
        },
        nhanXetDanhGia: {
          mucDoPhuHop: 'Chưa đánh giá',
          diemManh: [],
          diemCanCaiThien: [],
          chatLuongCV: 'Chưa đánh giá',
          goiYBoSung: []
        },
        cauHoiPhongVan: []
      }, null, 2);
    }

    return result;
  }
}

// Export singleton instance
export const cvAnalysisService = new GeminiCvAnalysisService();
