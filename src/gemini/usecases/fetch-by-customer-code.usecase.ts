import { UseCase } from 'src/common/interfaces';
import { GeminiService } from '../services';
import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EMeasureType } from 'src/common/enums';

@Injectable()
export class FetchByCustomerCodeUseCase implements UseCase<any, any> {
  constructor(private readonly geminiService: GeminiService) {}

  async execute(customerCode: string, measureType: EMeasureType): Promise<any> {
    try {
      return await this.geminiService.fetchByCustomerCode(
        customerCode,
        measureType,
      );
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        throw new UnprocessableEntityException(error);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
