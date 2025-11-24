import { cvAnalysisService } from '../src/modules/ai/cvAnalysisService';

const testCV = `
Nguyen Quang Huy 
Ha Noi, Viet Nam | Phone: (+84) 344 265 925 
Email: ngquanghuy.work@gmail.com | Github: qnhuy | Facebook: Huy Nguyen 

Education 
FPT University - Software Engineer. 2022 - 2026 
Hoang Van Thu high school. 2019 - 2022 

Languages and Technologies 
Languages: C, Java, Javascript 
Technologies: HTML, CSS, ReactJS, TailwindCSS, Boostrap 5 
Other: Git, Postman, SQL Server 

Projects 

Pharmaflow - Frontend Developer
Developed a pharmacy management system including AI integration. 
Managed the end-to-end product development lifecycle, which involved detailed problem analysis, business requirements definition, and product development. 
Engineered a cohesive and user-friendly web interface (UI/UX) to ensure an optimal user experience. 
Technologies: ReactJS, Bootstrap, TailwindCSS, Vite (build-tool), NodeJS, ExpressJS, and PostgreSQL. 

Whatpad - Frontend Developer
Developed an online web application for reading and writing text stories. 
Focused on creating a user-friendly, responsive interface with good user experience (UX) across all devices. 
Technologies: ReactJS, Bootstrap, NodeJS, ExpressJS, and MySQL. 
Github: yunkhngn/whatpad 

Spotity Clone - Frontend Developer
Built a Spotify-like web application. 
Implemented Web Components to modularize UI elements and separate business logic. 
Complete knowledge of basic HTML, CSS and Javascript 
Github: qnhuy/f8-spotify 

Activities 
JS Club – Japanese Software Engineer Club President (01/2024 – 12/2024) 
Led and managed the club's operations, focusing on programming skill development and knowledge sharing among members. 
Event Deputy Organizer of Code Fest, a Java bot competition with over 100 participants. 
Head Organizer for Algorithm Arena 5.0 (AA), an algorithmic programming contest with over 60 competitors. 

Achievements 
30% FPT University Scholarship
`;

async function testCVAnalysis() {
  console.log('🧪 Testing CV Analysis with Gemini AI\n');
  console.log('📄 CV Content:');
  console.log('─'.repeat(80));
  console.log(testCV.trim());
  console.log('─'.repeat(80));
  console.log('\n🤖 Calling Gemini AI...\n');

  try {
    const result = await cvAnalysisService.analyzeCvAndJd(testCV);

    console.log('✅ Analysis Result:\n');
    
    console.log('👤 Candidate Info:');
    console.log(JSON.stringify(result.candidateInfo, null, 2));
    
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
      console.log(`${skill.categoryId.padEnd(20)} → ${questionCount} questions`);
    });
    
    console.log('\n✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    }
  }
}

testCVAnalysis()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
