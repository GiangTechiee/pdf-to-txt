// AI module types

export interface CandidateInfo {
  fullName?: string;
  email?: string;
  positionApplied?: string;
}

export interface SkillWeight {
  categoryId: string;
  weight: number;
}

export interface CvAnalysisResult {
  candidateInfo: CandidateInfo;
  skillsWithWeights: SkillWeight[];
  cvSummary: string;
}

export interface PdfExtractorService {
  extractTextFromPdf(file: Buffer): Promise<string>;
}

export interface CvAnalysisService {
  analyzeCvAndJd(cvText: string, jdText?: string): Promise<CvAnalysisResult>;
}
