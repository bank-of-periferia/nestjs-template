import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const mysqlDatabaseConfig = registerAs(
  'database.mysql',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    entities: [
      __dirname +
        '/../../../infrastructure/database/entities/*.entity{.ts,.js}',
    ],
    migrations: [
      __dirname +
        '/../../../infrastructure/database/migrations/*.migration{.ts,.js}',
    ],
    synchronize: true,
    logging: ['error', 'query', 'warn', 'info', 'schema', 'log'],
  }),
);
