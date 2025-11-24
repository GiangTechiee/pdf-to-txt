import { candidateRepository } from '../src/modules/candidate/candidateRepository';

async function testCandidateDeduplication() {
  console.log('🧪 Testing Candidate Deduplication Logic\n');
  console.log('━'.repeat(80));

  // Test 1: Create new candidate
  console.log('\n📝 Test 1: Create new candidate');
  console.log('─'.repeat(80));
  
  const candidate1 = await candidateRepository.findOrCreate({
    fullName: 'Test User 1',
    email: 'test@example.com',
    positionApplied: 'Frontend Developer',
    cvSummary: 'First CV summary',
  });
  
  console.log(`Result: Created candidate ID ${candidate1.id}`);
  console.log(`   Name: ${candidate1.fullName}`);
  console.log(`   Email: ${candidate1.email}`);
  console.log(`   Summary: ${candidate1.cvSummary?.substring(0, 50)}...`);

  // Test 2: Try to create same email again (should reuse)
  console.log('\n📝 Test 2: Upload CV with same email');
  console.log('─'.repeat(80));
  
  const candidate2 = await candidateRepository.findOrCreate({
    fullName: 'Test User 1 Updated',
    email: 'test@example.com',
    positionApplied: 'Full Stack Developer',
    cvSummary: 'Updated CV summary with more details',
  });
  
  console.log(`Result: ${candidate1.id === candidate2.id ? '✅ Reused' : '❌ Created new'} candidate ID ${candidate2.id}`);
  console.log(`   Name: ${candidate2.fullName}`);
  console.log(`   Email: ${candidate2.email}`);
  console.log(`   Position: ${candidate2.positionApplied}`);
  console.log(`   Summary: ${candidate2.cvSummary?.substring(0, 50)}...`);

  // Test 3: Create different email
  console.log('\n📝 Test 3: Create candidate with different email');
  console.log('─'.repeat(80));
  
  const candidate3 = await candidateRepository.findOrCreate({
    fullName: 'Test User 2',
    email: 'test2@example.com',
    positionApplied: 'Backend Developer',
    cvSummary: 'Different person CV',
  });
  
  console.log(`Result: Created new candidate ID ${candidate3.id}`);
  console.log(`   Name: ${candidate3.fullName}`);
  console.log(`   Email: ${candidate3.email}`);

  // Test 4: No email provided
  console.log('\n📝 Test 4: Create candidate without email');
  console.log('─'.repeat(80));
  
  const candidate4 = await candidateRepository.findOrCreate({
    fullName: 'Anonymous User',
    positionApplied: 'Developer',
    cvSummary: 'No email in CV',
  });
  
  console.log(`Result: Created new candidate ID ${candidate4.id}`);
  console.log(`   Name: ${candidate4.fullName}`);
  console.log(`   Email: ${candidate4.email || 'N/A'}`);

  // Summary
  console.log('\n📊 Summary');
  console.log('━'.repeat(80));
  console.log(`✅ Test 1 & 2: Same email → ${candidate1.id === candidate2.id ? 'REUSED ✓' : 'FAILED ✗'}`);
  console.log(`✅ Test 3: Different email → ${candidate3.id !== candidate1.id ? 'NEW CREATED ✓' : 'FAILED ✗'}`);
  console.log(`✅ Test 4: No email → ${candidate4.id !== candidate1.id ? 'NEW CREATED ✓' : 'FAILED ✗'}`);
  
  console.log('\n💡 Cleanup: You may want to delete test candidates from database');
  console.log(`   DELETE FROM candidates WHERE email IN ('test@example.com', 'test2@example.com');`);
}

testCandidateDeduplication()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
