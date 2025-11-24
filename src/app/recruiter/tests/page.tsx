// Recruiter: Tests List Page
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Plus, Calendar, Clock, HelpCircle, FileText, MoreVertical, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface TestSession {
  id: string;
  testCode: string;
  status: string;
  createdAt: string;
  candidate: {
    fullName: string | null;
    email: string | null;
    positionApplied: string | null;
  };
  totalQuestions: number;
  timeLimitSeconds: number;
  correctCount: number | null;
}

export default function TestsListPage() {
  const router = useRouter();
  const [tests, setTests] = useState<TestSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async (search?: string) => {
    try {
      setSearching(true);
      const url = search ? `/api/tests?search=${encodeURIComponent(search)}` : '/api/tests';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch tests');
      const data = await res.json();
      setTests(data.tests || []);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách test');
      console.error(err);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTests(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchTests();
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      in_progress: 'bg-blue-100 text-blue-700 border-blue-200',
      completed: 'bg-green-100 text-green-700 border-green-200',
      expired: 'bg-red-100 text-red-700 border-red-200',
    };
    const labels = {
      pending: 'Chờ làm',
      in_progress: 'Đang làm',
      completed: 'Hoàn thành',
      expired: 'Hết hạn',
    };
    return (
      <span className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-medium border",
        styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800 border-gray-200'
      )}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
      className="max-w-6xl mx-auto space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold tracking-tight">Danh Sách Bài Test</h1>
          <p className="text-muted-foreground mt-1">Quản lý và theo dõi các bài kiểm tra của ứng viên.</p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Button onClick={() => router.push('/recruiter/generate')} className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Tạo Test Mới
          </Button>
        </motion.div>
      </div>

      {/* Search Box */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm theo mã test, tên ứng viên, email..."
                  className="pl-9 pr-9"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button type="submit" disabled={searching}>
                {searching ? '...' : 'Tìm kiếm'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {error && (
        <motion.div
          variants={itemVariants}
          className="bg-destructive/15 border border-destructive/20 text-destructive px-4 py-3 rounded-md"
        >
          {error}
        </motion.div>
      )}

      {loading ? (
        <div className="py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Đang tải danh sách...</p>
        </div>
      ) : tests.length === 0 ? (
        <motion.div variants={itemVariants}>
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Chưa có bài test nào</h3>
              <p className="text-muted-foreground mb-6">Hãy tạo bài test đầu tiên để bắt đầu tuyển dụng.</p>
              <Button onClick={() => router.push('/recruiter/generate')}>
                <Plus className="mr-2 h-4 w-4" /> Tạo Test Đầu Tiên
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} className="grid gap-4">
          {tests.map((test) => (
            <motion.div key={test.id} variants={itemVariants}>
              <Card className="hover:shadow-md transition-shadow group">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          {test.candidate.fullName || 'Chưa có tên'}
                        </h3>
                        {getStatusBadge(test.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {test.candidate.positionApplied || 'Chưa có vị trí'} • {test.candidate.email || 'No email'}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5" /> {test.testCode}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" /> {new Date(test.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 md:border-l md:pl-6">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Câu hỏi</p>
                        <p className="font-semibold">{test.totalQuestions}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Thời gian</p>
                        <p className="font-semibold">{Math.round(test.timeLimitSeconds / 60)}p</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Điểm</p>
                        <p className={cn(
                          "font-semibold",
                          test.correctCount !== null ? "text-primary" : "text-muted-foreground"
                        )}>
                          {test.correctCount !== null
                            ? `${test.correctCount}/${test.totalQuestions}`
                            : '-'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/recruiter/tests/${test.id}`)}
                        >
                          Chi tiết
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/recruiter/tests/${test.id}`)}>
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Xóa bài thi
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
