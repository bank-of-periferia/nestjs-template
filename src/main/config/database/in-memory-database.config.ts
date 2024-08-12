import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const inMemoryDatabaseConfig = registerAs(
  'database.inMemory',
  (): TypeOrmModuleOptions => ({
    type: 'sqlite',
    database: ':memory',
    entities: [
      __dirname +
        '/../../../infrastructure/database/entities/*.entity{.ts,.js}',
    ],
    migrations: [
      __dirname +
        '/../../../infrastructure/database/migrations/*.migration{.ts,.js}',
    ],
    synchronize: false,
    logging: ['error', 'query', 'warn', 'info', 'schema', 'log'],
  }),
);
