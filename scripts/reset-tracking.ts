import * as fs from 'fs';
import * as path from 'path';

const TRACKING_FILE = path.join(process.cwd(), 'question-bank', '.tracking.json');

interface TrackingData {
  [categoryId: string]: {
    totalQuestions: number;
    addedToDb: number;
    lastSync: string | null;
  };
}

function resetTracking(categoryId?: string) {
  if (!fs.existsSync(TRACKING_FILE)) {
    console.log('❌ Tracking file not found!');
    return;
  }

  const tracking: TrackingData = JSON.parse(fs.readFileSync(TRACKING_FILE, 'utf-8'));

  if (categoryId) {
    if (tracking[categoryId]) {
      tracking[categoryId].addedToDb = 0;
      tracking[categoryId].lastSync = null;
      console.log(`✅ Reset tracking for category: ${categoryId}`);
    } else {
      console.log(`❌ Category not found: ${categoryId}`);
      return;
    }
  } else {
    // Reset all
    for (const key of Object.keys(tracking)) {
      tracking[key].addedToDb = 0;
      tracking[key].lastSync = null;
    }
    console.log('✅ Reset tracking for all categories');
  }

  fs.writeFileSync(TRACKING_FILE, JSON.stringify(tracking, null, 2), 'utf-8');
  console.log('💾 Saved tracking file');
}

// Get category from command line args
const categoryArg = process.argv[2];

console.log('🔄 Resetting tracking...\n');
resetTracking(categoryArg);
console.log('\n✨ Done!');
