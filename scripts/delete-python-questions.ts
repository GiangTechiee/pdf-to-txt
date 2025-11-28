import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🗑️  Deleting Python questions from database...\n');

  const result = await prisma.question.deleteMany({
    where: {
      categoryId: 'python'
    }
  });

  console.log(`✅ Deleted ${result.count} Python questions\n`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
