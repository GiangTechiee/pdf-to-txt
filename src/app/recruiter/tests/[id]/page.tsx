// Recruiter: Test Monitoring Page
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Activity, Clock, User, FileText, AlertTriangle, CheckCircle2,
  BarChart3, Eye, ArrowLeft, MoreVertical, Copy, Check
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatTimeRemaining, cn } from '@/lib/utils';
import { useWebSocket } from '@/hooks/useWebSocket';
import { CVSummaryDisplay } from '@/components/CVSummaryDisplay';
import { toast } from 'sonner';

interface TestDetails {
  testSession: {
    id: string;
    testCode: string;
    status: string;
    totalQuestions: number;
    timeLimitSeconds: number;
    startedAt?: string;
    finishedAt?: string;
    correctCount?: number;
    score?: number;
  };
  candidate: {
    fullName?: string;
    email?: string;
    positionApplied?: string;
    cvSummary?: string;
  };
  categories: Array<{
    categoryId: string;
    categoryName: string;
    weight: number;
  }>;
  progress: {
    answeredCount: number;
    totalQuestions: number;
    percentage: number;
  };
  logs: Array<{
    eventType: string;
    eventData: any;
    createdAt: string;
  }>;
}

export default function TestMonitoringPage() {
  const params = useParams();
  const router = useRouter();
  const testSessionId = params.id as string;

  const [testDetails, setTestDetails] = useState<TestDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabBlurCount, setTabBlurCount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const { isConnected, lastEvent } = useWebSocket(testSessionId);

  // Fetch test details
  const fetchTestDetails = async () => {
    try {
      const response = await fetch(`/api/tests/details/${testSessionId}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Không thể tải chi tiết bài kiểm tra');
      }

      setTestDetails(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestDetails();
    // Refresh every 10 seconds
    const interval = setInterval(fetchTestDetails, 10000);
    return () => clearInterval(interval);
  }, [testSessionId]);

  // Handle real-time events
  useEffect(() => {
    if (!lastEvent) return;

    console.log('Received event:', lastEvent);

    if (lastEvent.type === 'tab_blur') {
      setTabBlurCount((prev) => prev + 1);
    }

    if (lastEvent.type === 'answer_change' || lastEvent.type === 'test_submitted') {
      fetchTestDetails();
    }
  }, [lastEvent]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Đang tải dữ liệu giám sát...</p>
        </div>
      </div>
    );
  }

  if (error || !testDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Lỗi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error || 'Không tìm thấy bài kiểm tra'}</p>
            <Button onClick={() => router.push('/recruiter/tests')} className="mt-4 w-full">
              Quay lại danh sách
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { testSession, candidate, categories, progress, logs } = testDetails;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const elapsedTime = testSession.startedAt
    ? Math.floor((Date.now() - new Date(testSession.startedAt).getTime()) / 1000)
    : 0;

  const timeRemaining = Math.max(0, testSession.timeLimitSeconds - elapsedTime);

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
      className="p-6 max-w-7xl mx-auto space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/recruiter/tests')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Giám sát Bài kiểm tra
              {isConnected && (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              )}
            </h1>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border", getStatusColor(testSession.status))}>
                {testSession.status.replace('_', ' ').toUpperCase()}
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-md border border-border/50">
            <span className="text-xs text-muted-foreground font-medium uppercase">Mã:</span>
            <code className="font-mono font-bold text-primary text-lg">{testSession.testCode}</code>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 ml-1 hover:bg-background relative"
              onClick={() => {
                navigator.clipboard.writeText(testSession.testCode);
                toast.success('Đã sao chép mã bài thi');
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
              }}
              title="Sao chép mã"
            >
              <motion.div
                key={isCopied ? "check" : "copy"}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {isCopied ? (
                  <Check className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Candidate Info */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="h-4 w-4 text-primary" /> Thông tin Ứng viên
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Họ và tên</p>
                  <p className="font-medium">{candidate.fullName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{candidate.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vị trí ứng tuyển</p>
                  <p className="font-medium">{candidate.positionApplied || 'N/A'}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CV Summary - Expanded Section */}
          {candidate.cvSummary && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="h-4 w-4 text-primary" /> Phân tích CV Chi tiết
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CVSummaryDisplay cvSummary={candidate.cvSummary} />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Skill Categories - Move this section after CV Summary */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="h-4 w-4 text-primary" /> Đánh giá Kỹ năng
                </CardTitle>
                <CardDescription>Trọng số các kỹ năng trong bài kiểm tra</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((cat) => (
                    <div key={cat.categoryId}>
                      <div className="flex justify-between mb-1.5 text-sm">
                        <span className="font-medium">{cat.categoryName}</span>
                        <span className="text-muted-foreground">{Math.round(cat.weight * 100)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${cat.weight * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="bg-primary h-full rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>



          {/* Activity Logs */}
          <motion.div variants={itemVariants}>
            <Card className="h-[400px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="h-4 w-4 text-primary" /> Nhật ký Hoạt động
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-3">
                  {logs.map((log, idx) => (
                    <div key={idx} className="flex gap-3 text-sm group">
                      <div className="min-w-[80px] text-xs text-muted-foreground pt-0.5">
                        {new Date(log.createdAt).toLocaleTimeString()}
                      </div>
                      <div className="flex-1 pb-3 border-b border-border/50 group-last:border-0">
                        <p className="font-medium text-foreground">
                          {log.eventType === 'tab_blur' ? 'Rời khỏi tab' :
                            log.eventType === 'tab_focus' ? 'Quay lại tab' :
                              log.eventType === 'answer_change' ? 'Trả lời câu hỏi' :
                                log.eventType === 'test_submitted' ? 'Nộp bài' :
                                  log.eventType.replace('_', ' ')}
                        </p>
                        {log.eventData && (
                          <p className="text-xs text-muted-foreground mt-0.5 font-mono bg-muted/30 p-1 rounded inline-block">
                            {JSON.stringify(log.eventData).substring(0, 60)}
                            {JSON.stringify(log.eventData).length > 60 && '...'}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  {logs.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">Chưa có hoạt động nào</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Real-time Panel */}
        <div className="space-y-6">
          {/* Progress */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/30 pb-4">
                <CardTitle className="text-center text-lg">Tiến độ Làm bài</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-center mb-6">
                  <div className="relative h-32 w-32 flex items-center justify-center">
                    <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="8"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      />
                      <motion.circle
                        className="text-primary stroke-current"
                        strokeWidth="8"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        initial={{ strokeDasharray: "0 251.2" }}
                        animate={{ strokeDasharray: `${progress.percentage * 2.512} 251.2` }}
                        transition={{ duration: 1 }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-2xl font-bold">{progress.percentage}%</span>
                    </div>
                  </div>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Đã trả lời <span className="font-medium text-foreground">{progress.answeredCount}</span> / {progress.totalQuestions} câu hỏi
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Timer */}
          {testSession.status === 'in_progress' && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Clock className="h-4 w-4 text-primary" /> Thời gian Còn lại
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={cn(
                    "text-3xl font-mono font-bold text-center py-2 rounded-lg",
                    timeRemaining < 300 ? "text-destructive bg-destructive/10 animate-pulse" : "text-primary bg-primary/5"
                  )}>
                    {formatTimeRemaining(timeRemaining)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Tab Monitoring */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base text-orange-600">
                  <Eye className="h-4 w-4" /> Cảnh báo Gian lận
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <span className="text-sm font-medium text-orange-800">Rời khỏi tab</span>
                  <span className="text-2xl font-bold text-orange-600">{tabBlurCount}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Số lần ứng viên chuyển sang tab khác hoặc cửa sổ khác.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          {testSession.status === 'completed' && (
            <motion.div variants={itemVariants}>
              <Card className="border-t-4 border-t-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base text-green-700">
                    <CheckCircle2 className="h-4 w-4" /> Kết quả
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-5xl font-bold text-green-600 mb-1">
                      {testSession.correctCount}/{testSession.totalQuestions}
                    </div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">Câu đúng</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
