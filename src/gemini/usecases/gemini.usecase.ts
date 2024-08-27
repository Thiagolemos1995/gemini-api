import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UseCase } from 'src/common/interfaces/usecase.interface';
import { GeminiService } from '../services';

@Injectable()
export class GeminiUseCase implements UseCase<any, any> {
  constructor(private readonly geminiService: GeminiService) {}

  async execute(): Promise<any> {
    try {
      return await this.geminiService.fetchAll();
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        throw new UnprocessableEntityException(error);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
