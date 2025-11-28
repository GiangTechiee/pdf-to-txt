import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🗑️  Deleting all Python questions from database...');
  
  // First, get all Python question IDs
  const pythonQuestions = await prisma.question.findMany({
    where: {
      categoryId: 'python'
    },
    select: {
      id: true
    }
  });
  
  const questionIds = pythonQuestions.map(q => q.id);
  console.log(`📝 Found ${questionIds.length} Python questions`);
  
  // Delete related test session questions first
  if (questionIds.length > 0) {
    const deletedSessionQuestions = await prisma.testSessionQuestion.deleteMany({
      where: {
        questionId: {
          in: questionIds
        }
      }
    });
    console.log(`🗑️  Deleted ${deletedSessionQuestions.count} test session questions`);
  }
  
  // Now delete the Python questions
  const result = await prisma.question.deleteMany({
    where: {
      categoryId: 'python'
    }
  });
  
  console.log(`✅ Deleted ${result.count} Python questions`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
