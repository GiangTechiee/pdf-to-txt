import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkActiveQuestions() {
  console.log('🔍 Checking active questions...\n');

  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          questions: true,
        },
      },
    },
  });

  console.log('📊 Questions by category:\n');
  
  for (const category of categories) {
    const activeCount = await prisma.question.count({
      where: {
        categoryId: category.id,
        isActive: true,
      },
    });

    const inactiveCount = await prisma.question.count({
      where: {
        categoryId: category.id,
        isActive: false,
      },
    });

    const total = category._count.questions;

    if (total > 0) {
      console.log(`${category.name} (${category.id}):`);
      console.log(`  ✅ Active: ${activeCount}`);
      console.log(`  ❌ Inactive: ${inactiveCount}`);
      console.log(`  📝 Total: ${total}\n`);
    }
  }

  // Check difficulty distribution for active questions
  console.log('\n📊 Difficulty distribution (active only):\n');
  
  const difficulties = await prisma.question.groupBy({
    by: ['categoryId', 'difficulty'],
    where: {
      isActive: true,
    },
    _count: true,
  });

  const grouped: Record<string, Record<string, number>> = {};
  
  for (const item of difficulties) {
    if (!grouped[item.categoryId]) {
      grouped[item.categoryId] = {};
    }
    grouped[item.categoryId][item.difficulty] = item._count;
  }

  for (const [categoryId, diffs] of Object.entries(grouped)) {
    const category = categories.find(c => c.id === categoryId);
    console.log(`${category?.name || categoryId}:`);
    console.log(`  Easy: ${diffs.easy || 0}`);
    console.log(`  Medium: ${diffs.medium || 0}`);
    console.log(`  Hard: ${diffs.hard || 0}\n`);
  }
}

checkActiveQuestions()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
