import { PrismaClient, QuestionDifficulty, CorrectOption } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';
import categoriesConfig from '../config/categories.json';

const prisma = new PrismaClient();

// Tracking file path
const TRACKING_FILE = path.join(process.cwd(), 'question-bank', '.tracking.json');

interface TrackingData {
  [categoryId: string]: {
    totalQuestions: number;
    addedToDb: number;
    lastSync: string | null;
  };
}

function loadTracking(): TrackingData {
  if (fs.existsSync(TRACKING_FILE)) {
    return JSON.parse(fs.readFileSync(TRACKING_FILE, 'utf-8'));
  }
  return {};
}

function saveTracking(data: TrackingData): void {
  fs.writeFileSync(TRACKING_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

interface ParsedQuestion {
  content: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: CorrectOption;
  difficulty: QuestionDifficulty;
}

function parseMarkdownQuestions(filePath: string, categoryName: string): ParsedQuestion[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const questions: ParsedQuestion[] = [];
  
  // Split by ### Câu pattern
  const questionBlocks = content.split(/### Câu \d+/).slice(1);
  
  questionBlocks.forEach((block, index) => {
    const lines = block.trim().split('\n');
    
    // Extract question content and options
    let content = '';
    let optionA = '', optionB = '', optionC = '', optionD = '';
    let correctAnswer = '';
    let currentOption = '';
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeLanguage = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      
      // Handle code block start/end
      if (trimmedLine.startsWith('```')) {
        if (!inCodeBlock) {
          // Starting code block
          inCodeBlock = true;
          codeLanguage = trimmedLine.substring(3).trim() || 'javascript';
          codeBlockContent = [];
        } else {
          // Ending code block - add to current option
          inCodeBlock = false;
          const codeStr = `\`\`\`${codeLanguage}\n${codeBlockContent.join('\n')}\n\`\`\``;
          
          if (currentOption === 'A') optionA += (optionA ? '\n\n' : '') + codeStr;
          else if (currentOption === 'B') optionB += (optionB ? '\n\n' : '') + codeStr;
          else if (currentOption === 'C') optionC += (optionC ? '\n\n' : '') + codeStr;
          else if (currentOption === 'D') optionD += (optionD ? '\n\n' : '') + codeStr;
          
          codeBlockContent = [];
        }
        continue;
      }
      
      // Collect lines inside code blocks
      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }
      
      // Skip empty lines and separators
      if (!trimmedLine || trimmedLine === '---') continue;
      
      // Extract question content
      if (!content && !trimmedLine.startsWith('A.') && !trimmedLine.startsWith('**Đáp án:')) {
        content = trimmedLine;
        continue;
      }
      
      // Extract options
      if (trimmedLine.startsWith('A.')) {
        optionA = trimmedLine.substring(2).trim();
        currentOption = 'A';
      } else if (trimmedLine.startsWith('B.')) {
        optionB = trimmedLine.substring(2).trim();
        currentOption = 'B';
      } else if (trimmedLine.startsWith('C.')) {
        optionC = trimmedLine.substring(2).trim();
        currentOption = 'C';
      } else if (trimmedLine.startsWith('D.')) {
        optionD = trimmedLine.substring(2).trim();
        currentOption = 'D';
      } else if (trimmedLine.startsWith('**Đáp án:') || trimmedLine.includes('Đáp án:')) {
        const match = trimmedLine.match(/[ĐD]áp án:\s*([A-D])/i) || trimmedLine.match(/\*\*.*?([A-D])\*\*/);
        if (match) correctAnswer = match[1];
      }
    }
    
    if (!content || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
      console.warn(`⚠️  Skipping invalid question ${index + 1} in ${categoryName}`);
      console.warn(`   Content: ${content ? '✓' : '✗'}, A: ${optionA ? '✓' : '✗'}, B: ${optionB ? '✓' : '✗'}, C: ${optionC ? '✓' : '✗'}, D: ${optionD ? '✓' : '✗'}, Answer: ${correctAnswer ? '✓' : '✗'}`);
      return;
    }
    
    // Determine difficulty based on question number
    let difficulty: QuestionDifficulty;
    const questionNum = index + 1;
    if (questionNum <= 10) {
      difficulty = QuestionDifficulty.easy;
    } else if (questionNum <= 40) {
      difficulty = QuestionDifficulty.medium;
    } else {
      difficulty = QuestionDifficulty.hard;
    }
    
    questions.push({
      content,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption: correctAnswer as CorrectOption,
      difficulty,
    });
  });
  
  return questions;
}

async function seedCategory(
  categoryId: string,
  categoryName: string,
  filePath: string,
  tracking: TrackingData
): Promise<number> {
  console.log(`🔄 Processing ${categoryName} questions...`);
  
  const questions = parseMarkdownQuestions(filePath, categoryName);
  console.log(`📝 Found ${questions.length} questions in file`);
  
  const trackingInfo = tracking[categoryId] || { totalQuestions: 0, addedToDb: 0, lastSync: null };
  const alreadyAdded = trackingInfo.addedToDb;
  
  if (alreadyAdded >= questions.length) {
    console.log(`✅ All ${questions.length} questions already in database. Skipping...\n`);
    return 0;
  }
  
  // Only add new questions (from index alreadyAdded onwards)
  const newQuestions = questions.slice(alreadyAdded);
  console.log(`➕ Adding ${newQuestions.length} new questions (skipping first ${alreadyAdded})...`);
  
  let addedCount = 0;
  for (const question of newQuestions) {
    await prisma.question.create({
      data: {
        categoryId,
        ...question,
      },
    });
    addedCount++;
  }
  
  // Update tracking
  tracking[categoryId] = {
    totalQuestions: questions.length,
    addedToDb: alreadyAdded + addedCount,
    lastSync: new Date().toISOString(),
  };
  
  console.log(`✅ Added ${addedCount} new ${categoryName} questions\n`);
  return addedCount;
}

async function main() {
  console.log('🌱 Seeding database...\n');

  // Create default user (recruiter)
  console.log('👤 Creating default user...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const defaultUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'recruiter',
    },
  });
  console.log(`✅ Created/Updated user: ${defaultUser.email}\n`);

  // Load tracking data
  const tracking = loadTracking();
  console.log('📋 Loaded tracking data\n');

  // Create categories from centralized config
  const categories = categoriesConfig.map(cat => ({
    id: cat.id,
    name: cat.name,
  }));

  console.log(`📦 Creating ${categories.length} categories from config...`);
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: { name: category.name },
      create: category,
    });
    console.log(`✅ Created/Updated category: ${category.name} (${category.id})`);
  }

  console.log('\n📚 Processing questions...\n');

  let totalAdded = 0;

  // Seed each category
  totalAdded += await seedCategory(
    'react',
    'React',
    path.join(process.cwd(), 'question-bank', 'react.md'),
    tracking
  );

  totalAdded += await seedCategory(
    'nodejs',
    'Node.js',
    path.join(process.cwd(), 'question-bank', 'nodejs.md'),
    tracking
  );

  totalAdded += await seedCategory(
    'rest-api',
    'REST API',
    path.join(process.cwd(), 'question-bank', 'rest-api.md'),
    tracking
  );

  totalAdded += await seedCategory(
    'sql',
    'SQL',
    path.join(process.cwd(), 'question-bank', 'sql.md'),
    tracking
  );

  // Save tracking data
  saveTracking(tracking);
  console.log('💾 Saved tracking data\n');

  console.log('✨ Seeding completed!');
  console.log(`\n📊 Summary:`);
  console.log(`   - Categories: ${categories.length}`);
  console.log(`   - New questions added: ${totalAdded}`);
  console.log(`\n📈 Current database state:`);
  for (const [catId, info] of Object.entries(tracking)) {
    console.log(`   - ${catId}: ${info.addedToDb}/${info.totalQuestions} questions`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
