// Candidate: Enter Test Code Page
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Code2, Wifi, Clock, VolumeX } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CandidateHomePage() {
  const router = useRouter();
  const [testCode, setTestCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!testCode || testCode.length !== 8) {
      setError('Vui lòng nhập mã bài kiểm tra hợp lệ gồm 8 ký tự');
      return;
    }

    router.push(`/candidate/${testCode.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-t-4 border-t-primary shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <Code2 className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold">Bài kiểm tra Phỏng vấn</CardTitle>
            <CardDescription>Nhập mã bài kiểm tra được cung cấp để bắt đầu</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="CODE1234"
                  value={testCode}
                  onChange={(e) => setTestCode(e.target.value.toUpperCase())}
                  maxLength={8}
                  className="text-center text-3xl tracking-[0.5em] font-mono h-16 uppercase placeholder:tracking-normal placeholder:text-base"
                />
                <p className="text-xs text-center text-muted-foreground">Mã gồm 8 ký tự chữ và số</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-destructive/15 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              <Button type="submit" className="w-full h-12 text-lg group">
                Bắt đầu làm bài <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <p className="font-medium text-sm text-center mb-3">Yêu cầu trước khi bắt đầu:</p>
              <div className="grid gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-green-600" />
                  <span>Kết nối internet ổn định</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>Khoảng 60 phút không bị gián đoạn</span>
                </div>
                <div className="flex items-center gap-2">
                  <VolumeX className="h-4 w-4 text-purple-600" />
                  <span>Môi trường yên tĩnh</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Hệ thống được hỗ trợ bởi AI & Giám sát thời gian thực
        </p>
      </motion.div>
    </div>
  );
}
