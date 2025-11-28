// Component to display structured CV Summary
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Briefcase, Award, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { FormattedText } from '@/components/FormattedText';

interface ProjectItem {
  type: 'project' | 'achievement';
  title: string;
  role?: string;
  description: string;
  technologies?: string;
}

interface CVSummaryData {
  thongTinUngVien?: {
    hoTen?: string;
    viTriMongMuon?: string;
    kinhNghiem?: string;
    hocVanChungChi?: string;
    kyNang?: string;
    ngonNgu?: string;
    duAnThanhTich?: ProjectItem[] | string; // Support both new array format and old string format
  };
  nhanXetDanhGia?: {
    mucDoPhuHop?: string;
    diemManh?: string[];
    diemCanCaiThien?: string[];
    chatLuongCV?: string;
    goiYBoSung?: string[];
  };
  cauHoiPhongVan?: Array<{
    cauHoi: string;
    yChinhCanCo: string;
  }>;
}

interface CVSummaryDisplayProps {
  cvSummary?: string;
}

// Helper function to render projects and achievements
function renderProjectsAndAchievements(data: ProjectItem[] | string) {
  // New format: Array of objects
  if (Array.isArray(data)) {
    return data.map((item, index) => {
      if (item.type === 'project') {
        return (
          <div key={index} className="border-l-4 border-blue-500 pl-3 py-2 bg-blue-50/50">
            <div className="flex items-start gap-2 mb-1">
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300 shrink-0">
                Dự án
              </Badge>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">
                  {item.title}
                  {item.role && <span className="text-sm font-normal text-muted-foreground ml-2">({item.role})</span>}
                </h4>
              </div>
            </div>
            <p className="text-sm mt-1">{item.description}</p>
            {item.technologies && (
              <div className="mt-2 flex flex-wrap gap-1">
                {item.technologies.split(',').map((tech, i) => (
                  <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      } else {
        // Achievement
        return (
          <div key={index} className="border-l-4 border-amber-500 pl-3 py-2 bg-amber-50/50">
            <div className="flex items-start gap-2 mb-1">
              <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300 shrink-0">
                Thành tích
              </Badge>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{item.title}</h4>
              </div>
            </div>
            <p className="text-sm mt-1">{item.description}</p>
          </div>
        );
      }
    });
  }

  // Old format: String with markdown
  if (typeof data === 'string') {
    return formatMarkdownText(data);
  }

  return null;
}

// Helper function to format markdown-like text (for backward compatibility)
function formatMarkdownText(text: string) {
  const lines = text.split('\n').filter(line => line.trim());

  return lines.map((line, index) => {
    // Check if line starts with "- **" (bullet point with bold)
    if (line.trim().startsWith('- **')) {
      const match = line.match(/^-\s*\*\*(.+?)\*\*:\s*(.+)$/);
      if (match) {
        const [, boldText, restText] = match;
        return (
          <div key={index} className="flex items-start gap-2 mb-2">
            <span className="text-primary mt-1">•</span>
            <div className="flex-1">
              <span className="font-semibold text-foreground">{boldText}:</span>
              <span className="ml-1">{restText}</span>
            </div>
          </div>
        );
      }
    }

    // Regular line
    return (
      <p key={index} className="mb-1">
        {line.replace(/^-\s*/, '• ')}
      </p>
    );
  });
}

export function CVSummaryDisplay({ cvSummary }: CVSummaryDisplayProps) {
  if (!cvSummary) {
    return (
      <div className="text-sm text-muted-foreground italic">
        Không có thông tin tóm tắt CV
      </div>
    );
  }

  let summaryData: CVSummaryData;

  try {
    // Try to parse as JSON
    summaryData = JSON.parse(cvSummary);
  } catch {
    // Fallback to plain text display
    return (
      <div className="bg-muted/50 p-3 rounded-md text-sm leading-relaxed whitespace-pre-wrap">
        {cvSummary}
      </div>
    );
  }

  const { thongTinUngVien, nhanXetDanhGia, cauHoiPhongVan } = summaryData;

  return (
    <div className="space-y-4">
      {/* Thông tin ứng viên */}
      {thongTinUngVien && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4 text-blue-600" />
              Thông tin Ứng viên
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {thongTinUngVien.kinhNghiem && (
              <div>
                <span className="font-medium text-muted-foreground">Kinh nghiệm:</span>
                <p className="mt-1 whitespace-pre-line">{thongTinUngVien.kinhNghiem}</p>
              </div>
            )}
            {thongTinUngVien.hocVanChungChi && (
              <div>
                <span className="font-medium text-muted-foreground">Học vấn & Chứng chỉ:</span>
                <p className="mt-1 whitespace-pre-line">{thongTinUngVien.hocVanChungChi}</p>
              </div>
            )}
            {thongTinUngVien.kyNang && (
              <div>
                <span className="font-medium text-muted-foreground">Kỹ năng:</span>
                <div className="mt-1 whitespace-pre-line">{thongTinUngVien.kyNang}</div>
              </div>
            )}
            {thongTinUngVien.ngonNgu && (
              <div>
                <span className="font-medium text-muted-foreground">Ngôn ngữ:</span>
                <p className="mt-1 whitespace-pre-line">{thongTinUngVien.ngonNgu}</p>
              </div>
            )}
            {thongTinUngVien.duAnThanhTich && (
              <div>
                <span className="font-medium text-muted-foreground">Dự án/Thành tích:</span>
                <div className="mt-2 space-y-3">
                  {renderProjectsAndAchievements(thongTinUngVien.duAnThanhTich)}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Nhận xét & Đánh giá */}
      {nhanXetDanhGia && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Award className="h-4 w-4 text-purple-600" />
              Nhận xét & Đánh giá
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {nhanXetDanhGia.mucDoPhuHop && (
              <div>
                <span className="font-medium text-muted-foreground">Mức độ phù hợp:</span>
                <p className="mt-1 bg-blue-50 p-2 rounded border border-blue-100">
                  {nhanXetDanhGia.mucDoPhuHop}
                </p>
              </div>
            )}

            {nhanXetDanhGia.diemManh && nhanXetDanhGia.diemManh.length > 0 && (
              <div>
                <span className="font-medium text-muted-foreground flex items-center gap-1 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Điểm mạnh:
                </span>
                <ul className="space-y-1.5 ml-5">
                  {nhanXetDanhGia.diemManh.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {nhanXetDanhGia.diemCanCaiThien && nhanXetDanhGia.diemCanCaiThien.length > 0 && (
              <div>
                <span className="font-medium text-muted-foreground flex items-center gap-1 mb-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  Điểm cần cải thiện:
                </span>
                <ul className="space-y-1.5 ml-5">
                  {nhanXetDanhGia.diemCanCaiThien.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">⚠</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {nhanXetDanhGia.chatLuongCV && (
              <div>
                <span className="font-medium text-muted-foreground">Chất lượng CV:</span>
                <p className="mt-1">{nhanXetDanhGia.chatLuongCV}</p>
              </div>
            )}

            {nhanXetDanhGia.goiYBoSung && nhanXetDanhGia.goiYBoSung.length > 0 && (
              <div>
                <span className="font-medium text-muted-foreground">Gợi ý bổ sung:</span>
                <ul className="space-y-1.5 ml-5 mt-1">
                  {nhanXetDanhGia.goiYBoSung.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Câu hỏi phỏng vấn */}
      {cauHoiPhongVan && cauHoiPhongVan.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4 text-green-600" />
              Gợi ý Câu hỏi Phỏng vấn
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cauHoiPhongVan.map((item, idx) => (
              <div key={idx} className="border-l-4 border-green-500 pl-4 py-2 bg-green-50/50">
                <div className="flex items-start gap-2 mb-2">
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                    Câu {idx + 1}
                  </Badge>
                  <div className="font-medium text-sm flex-1">
                    <FormattedText text={item.cauHoi} />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground bg-white p-2 rounded border border-green-100">
                  <span className="font-medium">Ý chính cần có:</span>
                  <FormattedText text={item.yChinhCanCo} className="inline" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
