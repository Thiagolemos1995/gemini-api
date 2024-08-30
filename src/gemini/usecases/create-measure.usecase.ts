import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UseCase } from 'src/common/interfaces/usecase.interface';
import { GeminiService } from '../services';
import { CreateMeasureDto } from '../dtos';
import { Measure } from '../entities';

@Injectable()
export class CreateMeasureUseCase
  implements UseCase<CreateMeasureDto, Measure>
{
  constructor(private readonly geminiService: GeminiService) {}

  async execute(payload: CreateMeasureDto): Promise<Measure> {
    try {
      return await this.geminiService.create(payload);
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        throw new UnprocessableEntityException(error);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
