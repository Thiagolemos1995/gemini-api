import { Controller, Get } from '@nestjs/common';
import { GeminiUseCase } from '../usecases';
import { GeminiService } from '../services';

@Controller('gemini')
export class GeminiController {
  constructor(
    private readonly geminiUseCase: GeminiUseCase,
    private readonly geminiService: GeminiService,
  ) {}

  @Get()
  async fetchAll() {
    return await this.geminiUseCase.execute();
  }
}
