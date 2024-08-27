import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import serverConfig from './config/server.config';
import { GeminiModule } from './gemini/modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
      load: [serverConfig],
    }),
    // TypeOrmModule.forRoot(databaseConfig()),
    GeminiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
