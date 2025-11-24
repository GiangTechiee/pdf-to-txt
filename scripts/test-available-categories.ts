import { getAvailableCategoryIds, formatAvailableCategoriesForAI } from '../src/modules/question/questionService';

async function testAvailableCategories() {
  console.log('🔍 Testing available categories...\n');

  const availableIds = await getAvailableCategoryIds();
  
  console.log('✅ Available category IDs:');
  console.log(availableIds.join(', '));
  console.log(`\nTotal: ${availableIds.length} categories\n`);

  console.log('📝 Formatted for AI prompt:\n');
  const formatted = await formatAvailableCategoriesForAI();
  console.log(formatted);
}

testAvailableCategories()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
