import { Module } from '@nestjs/common';
import { GeminiController } from '../controllers';
import {
  CreateMeasureUseCase,
  FetchByCustomerCodeUseCase,
  FetchMeasuresUseCase,
} from '../usecases';
import { GeminiService, GoogleVisionService } from '../services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measure } from '../entities';
import { GeminiRepository } from '../repositories';

@Module({
  controllers: [GeminiController],
  imports: [TypeOrmModule.forFeature([Measure])],
  providers: [
    GeminiService,
    GoogleVisionService,
    FetchMeasuresUseCase,
    CreateMeasureUseCase,
    FetchByCustomerCodeUseCase,
    GeminiRepository,
  ],
})
export class GeminiModule {}
