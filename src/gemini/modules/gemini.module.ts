import { Module } from '@nestjs/common';
import { GeminiController } from '../controllers';
import { GeminiUseCase } from '../usecases';
import { GeminiService } from '../services';

@Module({
  controllers: [GeminiController],
  // imports: [TypeOrmModule.forFeature([])],
  providers: [GeminiService, GeminiUseCase],
})
export class GeminiModule {}
