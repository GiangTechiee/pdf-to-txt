// Test Log Repository
import { prisma } from '@/lib/db';
import { TestEventType } from '@prisma/client';

export class TestLogRepository {
  async create(data: {
    testSessionId: string;
    eventType: TestEventType;
    eventData?: any;
  }) {
    return prisma.testLog.create({
      data,
    });
  }

  async getLogsByTestSession(testSessionId: string) {
    return prisma.testLog.findMany({
      where: { testSessionId },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const testLogRepository = new TestLogRepository();
