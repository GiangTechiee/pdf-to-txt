// Candidate Repository
import { prisma } from '@/lib/db';

export interface CreateCandidateData {
  fullName?: string;
  email?: string;
  positionApplied?: string;
  cvUrl?: string;
  cvSummary?: string;
}

export class CandidateRepository {
  async create(data: CreateCandidateData) {
    return prisma.candidate.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.candidate.findUnique({
      where: { id },
      include: {
        testSessions: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.candidate.findFirst({
      where: { email },
    });
  }

  /**
   * Find existing candidate by email or create new one
   * If email exists, update the candidate info with new data
   */
  async findOrCreate(data: CreateCandidateData) {
    // If no email provided, create new candidate
    if (!data.email) {
      console.log('⚠️  No email provided, creating new candidate');
      return this.create(data);
    }

    // Try to find existing candidate by email
    const existing = await this.findByEmail(data.email);

    if (existing) {
      console.log(`✅ Found existing candidate: ${existing.fullName || 'N/A'} (${existing.email})`);
      console.log(`   Updating candidate info...`);
      
      // Update existing candidate with new info
      return prisma.candidate.update({
        where: { id: existing.id },
        data: {
          fullName: data.fullName || existing.fullName,
          positionApplied: data.positionApplied || existing.positionApplied,
          cvSummary: data.cvSummary || existing.cvSummary,
          // Don't update email as it's used for lookup
        },
      });
    }

    // Create new candidate if not found
    console.log(`➕ Creating new candidate: ${data.fullName || 'N/A'} (${data.email})`);
    return this.create(data);
  }
}

export const candidateRepository = new CandidateRepository();
