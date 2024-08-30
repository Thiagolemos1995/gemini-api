import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleVisionService {
  private genAI: GoogleGenerativeAI;
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  async analyzeImage(imagePayload: Express.Multer.File) {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const prompt = 'Return the measure value of the meter';
    console.log(imagePayload);
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: imagePayload.mimetype,
          fileUri: imagePayload.path,
        },
      },
      { text: prompt },
    ]);

    console.log(result.response.text());

    return result;
  }
}
