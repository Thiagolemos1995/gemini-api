import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateMeasureUseCase,
  FetchByCustomerCodeUseCase,
  FetchMeasuresUseCase,
} from '../usecases';
import {
  CreateMeasureDto,
  MeasureFilterDto,
  MeasureResponseDto,
} from '../dtos';
import { Measure } from '../entities';
import { FileInterceptor } from '@nestjs/platform-express';
import { GeminiService } from '../services';
import { EMeasureType } from 'src/common/enums';

@Controller('gemini')
export class GeminiController {
  constructor(
    private readonly fetchMeasuresUseCase: FetchMeasuresUseCase,
    private readonly createMeasureUseCase: CreateMeasureUseCase,
    private readonly fetchByCustomerCodeUseCase: FetchByCustomerCodeUseCase,
    private readonly geminiService: GeminiService,
  ) {}

  @Get()
  async fetchAll(
    @Query() filters: MeasureFilterDto,
  ): Promise<MeasureResponseDto> {
    return await this.fetchMeasuresUseCase.execute(filters);
  }

  @Get(':customerCode/list')
  async fetchByCustomerCode(
    @Param('customerCode') customerCode: string,
    @Query() measureType: EMeasureType,
  ) {
    return await this.fetchByCustomerCodeUseCase.execute(
      customerCode,
      measureType,
    );
    // return await this.geminiService.fetchByCustomerCode(customerCode);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() payload: CreateMeasureDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Measure> {
    payload.image = image;
    return this.createMeasureUseCase.execute(payload);
  }

  @Patch('confirm')
  async confirm() {
    return { message: 'This will be implemented' };
  }
}
