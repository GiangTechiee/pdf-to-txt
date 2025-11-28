import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Checking Python questions in database...\n');

  const pythonQuestions = await prisma.question.findMany({
    where: {
      categoryId: 'python'
    },
    orderBy: {
      id: 'asc'
    },
    select: {
      id: true,
      content: true,
      difficulty: true,
    }
  });

  console.log(`📊 Total Python questions: ${pythonQuestions.length}\n`);

  // Check for duplicates
  const contentMap = new Map<string, number[]>();
  
  pythonQuestions.forEach(q => {
    const existing = contentMap.get(q.content) || [];
    existing.push(q.id);
    contentMap.set(q.content, existing);
  });

  const duplicates = Array.from(contentMap.entries()).filter(([_, ids]) => ids.length > 1);

  if (duplicates.length > 0) {
    console.log(`❌ Found ${duplicates.length} duplicate questions:\n`);
    duplicates.forEach(([content, ids]) => {
      console.log(`   "${content.substring(0, 60)}..."`);
      console.log(`   IDs: ${ids.join(', ')}\n`);
    });
  } else {
    console.log('✅ No duplicate questions found!\n');
  }

  // Show first 10 and last 10 questions
  console.log('📝 First 10 questions:');
  pythonQuestions.slice(0, 10).forEach((q, i) => {
    console.log(`   ${i + 1}. [${q.difficulty}] ${q.content.substring(0, 50)}...`);
  });

  console.log('\n📝 Last 10 questions:');
  pythonQuestions.slice(-10).forEach((q, i) => {
    console.log(`   ${pythonQuestions.length - 9 + i}. [${q.difficulty}] ${q.content.substring(0, 50)}...`);
  });

  // Difficulty distribution
  const difficultyCount = pythonQuestions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('\n📊 Difficulty distribution:');
  Object.entries(difficultyCount).forEach(([diff, count]) => {
    console.log(`   ${diff}: ${count} questions`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
