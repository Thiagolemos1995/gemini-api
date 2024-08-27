import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USERNAME || 'unionaudio',
  password: process.env.DB_PASSWORD || 'unionaudio',
  database: process.env.DB_NAME || 'profile_svc_db',
  entities: ['src/**/entities/*.entity.ts'],
  migrations: ['src/**/migrations/*.ts'],
  synchronize: false,
});
