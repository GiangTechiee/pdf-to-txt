// Recruiter: Generate Test Page
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Upload, FileText, Settings, Clock, HelpCircle, File, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function GenerateTestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState('');
  const [totalQuestions, setTotalQuestions] = useState(30);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(15);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setPdfFile(file);
        setError(null);
      } else {
        setError('Vui lòng tải lên tệp PDF');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setPdfFile(file);
        setError(null);
      } else {
        setError('Vui lòng tải lên tệp PDF');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!pdfFile) {
      setError('Vui lòng tải lên tệp PDF CV');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('pdfFile', pdfFile);
      formData.append('jdText', jdText);
      formData.append('totalQuestions', totalQuestions.toString());
      formData.append('timeLimitMinutes', timeLimitMinutes.toString());

      const response = await fetch('/api/tests/generate', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Không thể tạo bài kiểm tra');
      }

      // Redirect to test details page
      router.push(`/recruiter/tests/${result.data.testSessionId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight">Tạo Bài kiểm tra Phỏng vấn</h1>
        <p className="text-muted-foreground mt-2">
          Tải lên CV và hệ thống sẽ tự động tạo bộ câu hỏi phù hợp.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* CV Upload */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Tải lên CV (PDF)
              </CardTitle>
              <CardDescription>Tải lên CV của ứng viên ở định dạng PDF để phân tích.</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ease-in-out",
                  dragActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
                  pdfFile ? "bg-green-50 border-green-200" : ""
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={!!pdfFile}
                />

                {pdfFile ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4 text-green-600">
                      <File className="h-8 w-8" />
                    </div>
                    <p className="text-lg font-medium text-green-700">{pdfFile.name}</p>
                    <p className="text-sm text-green-600 mb-4">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering file input
                        setPdfFile(null);
                      }}
                      className="z-20 relative"
                    >
                      <X className="mr-2 h-4 w-4" /> Xóa file
                    </Button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                      <Upload className="h-8 w-8" />
                    </div>
                    <p className="text-lg font-medium mb-2">Kéo và thả PDF vào đây</p>
                    <p className="text-sm text-muted-foreground mb-4">hoặc nhấp để chọn file từ máy tính</p>
                    <Button type="button" variant="outline" className="pointer-events-none">
                      Chọn File
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Job Description */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Mô tả công việc (Tùy chọn)
              </CardTitle>
              <CardDescription>Cung cấp JD để câu hỏi bám sát yêu cầu tuyển dụng hơn.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Dán nội dung mô tả công việc vào đây..."
                rows={6}
                className="resize-none"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Test Configuration */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Cấu hình Bài kiểm tra
              </CardTitle>
              <CardDescription>Tùy chỉnh thông số cho bài kiểm tra.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="questions" className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" /> Số lượng câu hỏi
                  </Label>
                  <Input
                    id="questions"
                    type="number"
                    min={10}
                    max={50}
                    value={totalQuestions}
                    onChange={(e) => setTotalQuestions(parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">Khuyên dùng: 20-30 câu</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Giới hạn thời gian (phút)
                  </Label>
                  <Input
                    id="time"
                    type="number"
                    min={15}
                    max={180}
                    value={timeLimitMinutes}
                    onChange={(e) => setTimeLimitMinutes(parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">Khuyên dùng: 30-45 phút</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-destructive/15 border border-destructive/20 text-destructive px-4 py-3 rounded-md flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            {error}
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="flex justify-end">
          <Button type="submit" disabled={loading} size="lg" className="w-full md:w-auto min-w-[200px]">
            {loading ? (
              <>
                <span className="animate-spin mr-2">⏳</span> Đang xử lý...
              </>
            ) : (
              'Tạo Bài kiểm tra'
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
