import { Injectable } from '@nestjs/common';
import { name, version } from '../package.json';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  status() {
    const { environment } = this.configService.get('server');

    return {
      name,
      version,
      environment,
    };
  }
}
