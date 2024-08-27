import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Get(':customerCode/list')
  async fetchByCustomerCode(@Param('customerCode') customerCode: string) {
    return { customerCode: customerCode, message: 'This will be implemented' };
  }

  @Post('upload')
  async create() {
    return { message: 'This will be implemented' };
  }

  @Patch('confirm')
  async confirm() {
    return { message: 'This will be implemented' };
  }
}
