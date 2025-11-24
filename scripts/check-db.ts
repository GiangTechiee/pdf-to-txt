import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabase() {
  console.log('🔍 Checking database...\n');

  // Count categories
  const categoryCount = await prisma.category.count();
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: { questions: true },
      },
    },
    orderBy: { name: 'asc' },
  });

  console.log(`📦 Categories: ${categoryCount}`);
  console.log('─'.repeat(60));
  categories.forEach((cat) => {
    console.log(`   ${cat.name.padEnd(20)} (${cat.id.padEnd(20)}) - ${cat._count.questions} questions`);
  });

  // Count total questions
  const totalQuestions = await prisma.question.count();
  console.log('─'.repeat(60));
  console.log(`📝 Total Questions: ${totalQuestions}\n`);

  // Check for duplicates (same content in same category)
  const duplicates = await prisma.$queryRaw<Array<{ categoryId: string; content: string; count: bigint }>>`
    SELECT "categoryId", "content", COUNT(*) as count
    FROM "questions"
    GROUP BY "categoryId", "content"
    HAVING COUNT(*) > 1
  `;

  if (duplicates.length > 0) {
    console.log('⚠️  Found duplicate questions:');
    duplicates.forEach((dup) => {
      console.log(`   Category: ${dup.categoryId}, Count: ${dup.count}, Content: ${dup.content.substring(0, 50)}...`);
    });
  } else {
    console.log('✅ No duplicate questions found');
  }

  // Show difficulty distribution
  console.log('\n📊 Difficulty Distribution:');
  const difficultyStats = await prisma.question.groupBy({
    by: ['difficulty', 'categoryId'],
    _count: true,
  });

  const reactStats = difficultyStats.filter((s) => s.categoryId === 'react');
  const nodejsStats = difficultyStats.filter((s) => s.categoryId === 'nodejs');

  console.log('\n   React:');
  reactStats.forEach((stat) => {
    console.log(`      ${stat.difficulty}: ${stat._count} questions`);
  });

  console.log('\n   Node.js:');
  nodejsStats.forEach((stat) => {
    console.log(`      ${stat.difficulty}: ${stat._count} questions`);
  });
}

checkDatabase()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
