import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'boilerplatenestjs',
    entities: ['dist/**/**/**/entities/*.entity.js'],
    logging: Boolean(process.env.DB_DEBUG) || false,
    ssl:
      process.env.NODE_ENV === 'production'
        ? {
            requestCert: true,
            rejectUnauthorized: false,
            ca: process.env.SSL_CERT,
          }
        : false,
  }),
);
