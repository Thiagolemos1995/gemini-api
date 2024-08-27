import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GeminiService {
  private readonly logger: Logger = new Logger(GeminiService.name);
  constructor() {}

  async fetchAll() {
    this.logger.log('Fetching all data from database');

    return {
      message: 'Returned all data from database (MOCKED)',
    };
  }
}
