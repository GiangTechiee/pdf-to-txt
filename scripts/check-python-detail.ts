import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const questions = await prisma.question.findMany({
    where: { categoryId: 'python' },
    orderBy: { id: 'asc' },
    take: 5
  });

  console.log('📝 First 5 Python questions with full details:\n');
  
  questions.forEach((q, i) => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Câu ${i + 1}: ${q.content}`);
    console.log(`A. ${q.optionA}`);
    console.log(`B. ${q.optionB}`);
    console.log(`C. ${q.optionC}`);
    console.log(`D. ${q.optionD}`);
    console.log(`Đáp án: ${q.correctOption}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
