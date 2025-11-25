// Candidate: Test Taking Page
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatTimeRemaining, cn } from '@/lib/utils';
import { useWebSocket } from '@/hooks/useWebSocket';

interface Question {
  id: number;
  orderIndex: number;
  content: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  difficulty: string;
  selectedOption?: string;
}

interface TestData {
  testSessionId: string;
  candidateInfo: {
    fullName?: string;
    email?: string;
    positionApplied?: string;
  };
  totalQuestions: number;
  timeLimitSeconds: number;
  questions: Question[];
}

export default function CandidateTestPage() {
  const params = useParams();
  const router = useRouter();
  const testCode = params.code as string;

  const [testData, setTestData] = useState<TestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const { emitCandidateEvent } = useWebSocket(testData?.testSessionId);

  // Start test
  useEffect(() => {
    const startTest = async () => {
      try {
        const response = await fetch(`/api/tests/${testCode}/start`, {
          method: 'POST',
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Không thể bắt đầu bài kiểm tra');
        }

        setTestData(result.data);
        setTimeRemaining(result.data.timeLimitSeconds);

        // Restore previously selected answers (in case of refresh)
        const restoredAnswers: Record<number, string | null> = {};
        result.data.questions.forEach((q: Question) => {
          if (q.selectedOption) {
            restoredAnswers[q.id] = q.selectedOption;
          }
        });
        setAnswers(restoredAnswers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    };

    startTest();
  }, [testCode]);

  // Timer countdown
  useEffect(() => {
    if (!testData || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [testData, timeRemaining]);

  // Track tab visibility
  useEffect(() => {
    if (!testData) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        emitCandidateEvent({
          type: 'tab_blur',
          testSessionId: testData.testSessionId,
          data: { timestamp: new Date().toISOString() },
        });
      } else {
        emitCandidateEvent({
          type: 'tab_focus',
          testSessionId: testData.testSessionId,
          data: { timestamp: new Date().toISOString() },
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [testData, emitCandidateEvent]);

  const handleAnswerSelect = async (option: string) => {
    if (!testData) return;

    const currentQuestion = testData.questions[currentQuestionIndex];
    const currentAnswer = answers[currentQuestion.id];

    // Toggle logic: if clicking the same option, deselect it (set to null)
    const newAnswer = currentAnswer === option ? null : option;

    // Update local state
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: newAnswer,
    }));

    // Save to backend
    try {
      await fetch(`/api/tests/${testCode}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          selectedOption: newAnswer,
        }),
      });

      // Emit WebSocket event
      emitCandidateEvent({
        type: 'answer_change',
        testSessionId: testData.testSessionId,
        data: {
          questionId: currentQuestion.id,
          selectedOption: newAnswer,
          answeredCount: Object.values(answers).filter(a => a !== null).length + (newAnswer ? 1 : (currentAnswer ? -1 : 0)),
        },
      });
    } catch (err) {
      console.error('Failed to save answer:', err);
    }
  };

  const handleAutoSubmit = async () => {
    if (!testData || submitting) return;
    await handleSubmit(true);
  };

  const handleSubmit = async (isAuto = false) => {
    if (!testData || submitting) return;

    const confirmed = isAuto || window.confirm('Bạn có chắc chắn muốn nộp bài kiểm tra không?');
    if (!confirmed) return;

    setSubmitting(true);

    try {
      const response = await fetch(`/api/tests/${testCode}/submit`, {
        method: 'POST',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Không thể nộp bài kiểm tra');
      }

      // Emit submit event
      emitCandidateEvent({
        type: 'test_submitted',
        testSessionId: testData.testSessionId,
        data: result.data,
      });

      // Redirect to results page
      router.push(`/candidate/${testCode}/results`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể nộp bài kiểm tra');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Đang chuẩn bị bài kiểm tra...</p>
        </div>
      </div>
    );
  }

  if (error || !testData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertCircle className="h-5 w-5" /> Lỗi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error || 'Không tìm thấy bài kiểm tra'}</p>
            <Button onClick={() => router.push('/candidate')} className="mt-4 w-full">
              Quay lại trang chủ
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = testData.questions[currentQuestionIndex];
  const answeredCount = Object.values(answers).filter(a => a !== null).length;
  const progress = Math.round((answeredCount / testData.totalQuestions) * 100);
  const isLastQuestion = currentQuestionIndex === testData.questions.length - 1;

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Header with Timer */}
      <header className="bg-background border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <h1 className="font-bold text-lg">Bài kiểm tra Phỏng vấn</h1>
              <p className="text-xs text-muted-foreground">
                Ứng viên: {testData.candidateInfo.fullName || 'N/A'}
              </p>
            </div>
            <div className="md:hidden">
              <span className="font-bold">Câu {currentQuestionIndex + 1}/{testData.totalQuestions}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-xs text-muted-foreground">Tiến độ</span>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-lg border transition-colors",
              timeRemaining < 300 ? "bg-red-50 text-red-600 border-red-200 animate-pulse" : "bg-blue-50 text-blue-600 border-blue-200"
            )}>
              <Clock className="h-5 w-5" />
              {formatTimeRemaining(timeRemaining)}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-6">
        {/* Question Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full shadow-sm border-t-4 border-t-primary">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Câu hỏi {currentQuestion.orderIndex}
                    </span>
                    <span className={cn(
                      "text-xs px-2.5 py-0.5 rounded-full font-medium border",
                      currentQuestion.difficulty === 'Easy' ? "bg-green-50 text-green-700 border-green-200" :
                        currentQuestion.difficulty === 'Medium' ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                          "bg-red-50 text-red-700 border-red-200"
                    )}>
                      {currentQuestion.difficulty}
                    </span>
                  </div>
                  <CardTitle className="text-xl md:text-2xl leading-relaxed mt-2">
                    {currentQuestion.content}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  {['A', 'B', 'C', 'D'].map((option) => {
                    const optionText = currentQuestion[`option${option}` as keyof Question] as string;
                    const isSelected = answers[currentQuestion.id] === option;

                    return (
                      <button
                        key={option}
                        onClick={() => handleAnswerSelect(option)}
                        className={cn(
                          "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-3 group relative overflow-hidden",
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-muted hover:border-primary/50 hover:bg-muted/30"
                        )}
                      >
                        <div className={cn(
                          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                          isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                        )}>
                          {option}
                        </div>
                        <span className={cn(
                          "flex-1 pt-1 font-medium",
                          isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                        )}>
                          {optionText}
                        </span>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-4 top-4 text-primary"
                          >
                            <CheckCircle2 className="h-5 w-5" />
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="w-32"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Trước
            </Button>

            {isLastQuestion && answeredCount === testData.totalQuestions ? (
              <Button
                onClick={() => handleSubmit(false)}
                disabled={submitting}
                className="w-40 bg-green-600 hover:bg-green-700"
              >
                {submitting ? 'Đang nộp...' : 'Nộp Bài'} <Send className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestionIndex((prev) => isLastQuestion ? 0 : prev + 1)}
                className="w-32"
              >
                {isLastQuestion ? 'Về câu 1' : 'Tiếp theo'} <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Sidebar / Question Grid */}
        <div className="w-full md:w-80 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex justify-between items-center">
                <span>Danh sách câu hỏi</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {answeredCount}/{testData.totalQuestions}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {testData.questions.map((q, idx) => {
                  const isAnswered = !!answers[q.id];
                  const isCurrent = idx === currentQuestionIndex;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={cn(
                        "aspect-square rounded-md flex items-center justify-center text-sm font-medium transition-all",
                        isCurrent
                          ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                          : isAnswered
                            ? "bg-green-100 text-green-700 border border-green-200 hover:bg-green-200"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary"></div>
                  <span>Đang chọn</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-100 border border-green-200"></div>
                  <span>Đã trả lời</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-muted"></div>
                  <span>Chưa trả lời</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <Button
                  onClick={() => handleSubmit(false)}
                  disabled={answeredCount < testData.totalQuestions || submitting}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {submitting ? 'Đang nộp...' : 'Nộp Bài Thi'} <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
