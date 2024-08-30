import { Injectable, Logger } from '@nestjs/common';
import { GeminiRepository } from '../repositories';
import {
  CreateMeasureDto,
  MeasureFilterDto,
  MeasureResponseDto,
} from '../dtos';
import { Measure } from '../entities';
import { GoogleVisionService } from './google-vision.service';
import { EMeasureType } from 'src/common/enums';

@Injectable()
export class GeminiService {
  private readonly logger: Logger = new Logger(GeminiService.name);
  constructor(
    private readonly geminiRepository: GeminiRepository,
    private readonly googleVisionService: GoogleVisionService,
  ) {}

  async fetchAll(payload: MeasureFilterDto): Promise<MeasureResponseDto> {
    this.logger.log('Fetching all data from database');

    const { order, skip, take } = payload;

    const response = await this.geminiRepository.fetchMeasures(payload);

    return {
      metadata: {
        take,
        skip,
        order: order ?? 'DESC',
        count: response[1],
      },
      data: response[0],
    };
  }

  async fetchByCustomerCode(customerCode: string, measureType: EMeasureType) {
    this.logger.log(`Fetch customer: ${customerCode}`);

    return await this.geminiRepository.fetchByCustomerCode(
      customerCode,
      measureType,
    );
  }

  async create(payload: CreateMeasureDto): Promise<Measure> {
    this.logger.log('Creating new measure');

    const measure = await this.geminiRepository.createMeasure(payload);
    const result = await this.googleVisionService
      .analyzeImage(payload.image)
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
    console.log(result);

    this.logger.log(`Measure created`);

    return measure;
  }
}
