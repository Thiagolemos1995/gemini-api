import { Module } from '@nestjs/common';
import { GeminiController } from '../controllers';
import { GeminiUseCase } from '../usecases';
import { GeminiService } from '../services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measure } from '../entities';
import { GeminiRepository } from '../repositories';

@Module({
  controllers: [GeminiController],
  imports: [TypeOrmModule.forFeature([Measure])],
  providers: [GeminiService, GeminiUseCase, GeminiRepository],
})
export class GeminiModule {}
