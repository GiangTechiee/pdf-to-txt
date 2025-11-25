// PDF Extractor Service - Uses GEMINI_PDF_API_KEY (Key A)
// Purpose: Extract text from PDF files only
import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '@/config/env';
import { PdfExtractorService } from './types';

class GeminiPdfExtractorService implements PdfExtractorService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // Initialize with PDF extraction API key (Key A)
    this.genAI = new GoogleGenerativeAI(env.GEMINI_PDF_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
  }

  async extractTextFromPdf(file: Buffer): Promise<string> {
    try {
      // Convert buffer to base64
      const base64Data = file.toString('base64');

      // Prepare the request with PDF data
      const prompt = `Extract all text content from this PDF document. 
Return only the extracted text without any additional formatting or commentary.`;

      const result = await this.model.generateContent([
        {
          inlineData: {
            mimeType: 'application/pdf',
            data: base64Data,
          },
        },
        { text: prompt },
      ]);

      const response = await result.response;
      const text = response.text();

      if (!text || text.trim().length === 0) {
        throw new Error('No text could be extracted from the PDF');
      }

      return text.trim();
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error(`Failed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export singleton instance
export const pdfExtractorService = new GeminiPdfExtractorService();
