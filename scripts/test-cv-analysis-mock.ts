/**
 * Mock test để demo kết quả phân tích CV
 * Không cần API key
 */

interface SkillWeight {
  categoryId: string;
  weight: number;
}

interface MockAnalysisResult {
  candidateInfo: {
    fullName: string;
    email: string;
    positionApplied: string;
  };
  skillsWithWeights: SkillWeight[];
  cvSummary: string;
}

function mockAnalyzeCV(): MockAnalysisResult {
  // Dựa trên CV của Nguyen Quang Huy
  // Skills: ReactJS, NodeJS, ExpressJS, HTML, CSS, Javascript
  // Projects: 3 frontend projects với React
  
  return {
    candidateInfo: {
      fullName: 'Nguyen Quang Huy',
      email: 'ngquanghuy.work@gmail.com',
      positionApplied: 'Frontend Developer',
    },
    skillsWithWeights: [
      { categoryId: 'react', weight: 0.85 },        // Rất mạnh React (3 projects)
      { categoryId: 'nodejs', weight: 0.6 },        // Có kinh nghiệm Node.js, Express
      { categoryId: 'rest-api', weight: 0.5 },      // Có dùng Postman, backend APIs
    ],
    cvSummary: `Frontend Developer with 2+ years of experience specializing in ReactJS and modern web technologies. 
Proven track record of building user-friendly web applications including pharmacy management systems and content platforms. 
Strong foundation in HTML, CSS, JavaScript, and React ecosystem (Bootstrap, TailwindCSS). 
Experience with full-stack development using Node.js, Express, and databases (PostgreSQL, MySQL). 
Demonstrated leadership as JS Club President and event organizer for programming competitions.`,
  };
}

function displayResults() {
  console.log('🧪 Mock CV Analysis Test\n');
  console.log('📄 CV: Nguyen Quang Huy - Frontend Developer');
  console.log('─'.repeat(80));
  
  const result = mockAnalyzeCV();
  
  console.log('\n✅ Analysis Result:\n');
  
  console.log('👤 Candidate Info:');
  console.log(`   Name: ${result.candidateInfo.fullName}`);
  console.log(`   Email: ${result.candidateInfo.email}`);
  console.log(`   Position: ${result.candidateInfo.positionApplied}`);
  
  console.log('\n📊 Skills with Weights:');
  console.log('─'.repeat(80));
  result.skillsWithWeights.forEach((skill, index) => {
    const percentage = (skill.weight * 100).toFixed(0);
    const bar = '█'.repeat(Math.floor(skill.weight * 20));
    console.log(`${index + 1}. ${skill.categoryId.padEnd(20)} | ${bar.padEnd(20)} | ${percentage}%`);
  });
  
  console.log('\n📝 CV Summary:');
  console.log('─'.repeat(80));
  console.log(result.cvSummary);
  
  console.log('\n🎯 Categories Analysis:');
  console.log('─'.repeat(80));
  const totalWeight = result.skillsWithWeights.reduce((sum, s) => sum + s.weight, 0);
  console.log(`Total weight: ${totalWeight.toFixed(2)}`);
  console.log(`Number of categories: ${result.skillsWithWeights.length}`);
  
  console.log('\n📈 Question Allocation (for 30 questions):');
  console.log('─'.repeat(80));
  result.skillsWithWeights.forEach((skill) => {
    const questionCount = Math.round((skill.weight / totalWeight) * 30);
    const easy = Math.floor(questionCount * 0.3);
    const medium = Math.floor(questionCount * 0.5);
    const hard = questionCount - easy - medium;
    
    console.log(`${skill.categoryId.padEnd(20)} → ${questionCount.toString().padStart(2)} questions (${easy}E + ${medium}M + ${hard}H)`);
  });
  
  console.log('\n✅ Validation Check:');
  console.log('─'.repeat(80));
  const validCategories = ['react', 'nextjs', 'nodejs', 'nestjs', 'aspnet-core', 'rest-api', 'flutter', 'react-native', 'machine-learning'];
  
  result.skillsWithWeights.forEach((skill) => {
    const isValid = validCategories.includes(skill.categoryId);
    const status = isValid ? '✅' : '❌';
    console.log(`${status} ${skill.categoryId} - ${isValid ? 'Valid (exists in database)' : 'Invalid (not in database)'}`);
  });
  
  console.log('\n🎯 Expected Database Queries:');
  console.log('─'.repeat(80));
  result.skillsWithWeights.forEach((skill) => {
    const questionCount = Math.round((skill.weight / totalWeight) * 30);
    console.log(`\nSELECT * FROM questions`);
    console.log(`WHERE "categoryId" = '${skill.categoryId}'  -- ✅ Match với DB`);
    console.log(`  AND "isActive" = true`);
    console.log(`ORDER BY RANDOM()`);
    console.log(`LIMIT ${questionCount};`);
  });
  
  console.log('\n✅ Mock test completed successfully!');
  console.log('\n💡 Để test với Gemini API thật:');
  console.log('   1. Thêm GEMINI_ANALYSIS_API_KEY vào file .env');
  console.log('   2. Chạy: npm run test:cv');
}

displayResults();
