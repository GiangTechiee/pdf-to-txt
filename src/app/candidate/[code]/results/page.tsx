// Candidate: Test Results Page
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Home, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function TestResultsPage() {
  const params = useParams();
  const router = useRouter();
  const testCode = params.code as string;

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/tests/${testCode}/result`);
        const data = await response.json();
        if (response.ok) {
          setResult(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch result:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [testCode]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(testCode);
    toast.success('Đã sao chép mã bài kiểm tra');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-t-4 border-t-green-500 shadow-xl">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-green-700 mb-2">Nộp bài thành công!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-8 pt-4">
            <div className="space-y-2">
              <p className="text-lg text-gray-700 font-medium">
                Chúc mừng {result?.candidateInfo?.fullName || 'bạn'} đã hoàn thành bài kiểm tra.
              </p>

              {result && (
                <div className="max-w-xs mx-auto mt-6">
                  <div className="bg-white p-4 rounded-xl border shadow-sm">
                    <p className="text-sm text-muted-foreground mb-1">Kết quả</p>
                    <p className="text-3xl font-bold text-green-600">
                      {result.correctCount}/{result.totalQuestions}
                    </p>
                    <p className="text-xs text-muted-foreground">Câu đúng</p>
                  </div>
                </div>
              )}

              <p className="text-muted-foreground max-w-md mx-auto mt-4">
                Hệ thống đã ghi nhận kết quả của bạn. Nhà tuyển dụng sẽ xem xét và liên hệ với bạn trong thời gian sớm nhất.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-muted/50 border border-muted rounded-xl p-6 max-w-sm mx-auto"
            >
              <p className="text-sm text-muted-foreground mb-2">Mã bài kiểm tra của bạn</p>
              <div className="flex items-center justify-center gap-2">
                <code className="text-2xl font-mono font-bold tracking-wider bg-background px-4 py-2 rounded border">
                  {testCode}
                </code>
                <Button variant="ghost" size="icon" onClick={handleCopyCode} title="Sao chép">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Vui lòng lưu lại mã này để tra cứu kết quả sau này
              </p>
            </motion.div>

            <div className="pt-6 border-t">
              <Button onClick={() => router.push('/')} variant="outline" className="gap-2">
                <Home className="h-4 w-4" /> Trở về trang chủ
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
