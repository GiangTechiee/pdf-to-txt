// Home page - Landing
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Code2, Cpu, Timer, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface User {
  id: string;
  email: string;
  role: string;
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (error) {
      console.log('Not authenticated');
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background z-0" />
        <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            {user && (
              <motion.div variants={itemVariants} className="mb-8 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
                  <span>Xin chào, <span className="text-primary">{user.email}</span></span>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-primary"
                    onClick={() => router.push('/recruiter/generate')}
                  >
                    Dashboard <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </motion.div>
            )}

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            >
              Hệ thống Kiểm tra Phỏng vấn IT
              <br />
              <span className="text-foreground">Thông minh & Hiệu quả</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            >
              Nền tảng tạo bài kiểm tra phỏng vấn và giám sát thời gian thực được hỗ trợ bởi AI.
              Tối ưu hóa quy trình tuyển dụng của bạn ngay hôm nay.
            </motion.p>

            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
              {/* Recruiter Card */}
              <Card className="relative overflow-hidden border-primary/20 hover:border-primary/50 transition-colors group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">Nhà tuyển dụng</CardTitle>
                  <CardDescription>Tạo và giám sát bài kiểm tra</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Tự động tạo câu hỏi từ CV
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Phân tích kỹ năng bằng AI
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Giám sát thời gian thực
                    </li>
                  </ul>
                  {loading ? (
                    <Button className="w-full" disabled>Đang tải...</Button>
                  ) : user ? (
                    <Button
                      className="w-full"
                      onClick={() => router.push('/recruiter/generate')}
                    >
                      Tạo Bài Kiểm Tra
                    </Button>
                  ) : (
                    <Link href="/login" className="block">
                      <Button className="w-full">Đăng nhập ngay</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>

              {/* Candidate Card */}
              <Card className="relative overflow-hidden hover:border-primary/50 transition-colors group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-600">
                    <Code2 className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">Ứng viên</CardTitle>
                  <CardDescription>Tham gia bài kiểm tra phỏng vấn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600" />
                      Làm bài thi trực tuyến
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600" />
                      Giao diện code thân thiện
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600" />
                      Kết quả tức thì
                    </li>
                  </ul>
                  <Link href="/candidate" className="block">
                    <Button variant="outline" className="w-full hover:text-purple-600 hover:border-purple-600">
                      Bắt đầu làm bài
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Tính năng nổi bật</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hệ thống cung cấp đầy đủ các công cụ cần thiết để đánh giá năng lực ứng viên một cách chính xác và hiệu quả nhất.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-background p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Power</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sử dụng Gemini AI để phân tích CV và tạo ra bộ câu hỏi phỏng vấn phù hợp nhất với từng ứng viên.
              </p>
            </div>

            <div className="bg-background p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-6">
                <Timer className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Monitoring</h3>
              <p className="text-muted-foreground leading-relaxed">
                Theo dõi quá trình làm bài của ứng viên trong thời gian thực thông qua kết nối WebSocket ổn định.
              </p>
            </div>

            <div className="bg-background p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Assessment</h3>
              <p className="text-muted-foreground leading-relaxed">
                Hệ thống chấm điểm tự động và đưa ra báo cáo chi tiết về năng lực của ứng viên.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
