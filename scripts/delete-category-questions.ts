import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteQuestions(categoryId: string) {
  console.log(`🗑️  Deleting questions for category: ${categoryId}...\n`);
  
  const result = await prisma.question.deleteMany({
    where: { categoryId },
  });
  
  console.log(`✅ Deleted ${result.count} questions`);
}

const categoryId = process.argv[2];

if (!categoryId) {
  console.error('❌ Please provide a category ID');
  console.log('Usage: npm run db:delete-questions <categoryId>');
  process.exit(1);
}

deleteQuestions(categoryId)
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
