import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UseCase } from 'src/common/interfaces/usecase.interface';
import { GeminiService } from '../services';
import { MeasureFilterDto, MeasureResponseDto } from '../dtos';

@Injectable()
export class FetchMeasuresUseCase
  implements UseCase<MeasureFilterDto, MeasureResponseDto>
{
  constructor(private readonly geminiService: GeminiService) {}

  async execute(payload: MeasureFilterDto): Promise<MeasureResponseDto> {
    try {
      return await this.geminiService.fetchAll(payload);
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        throw new UnprocessableEntityException(error);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
