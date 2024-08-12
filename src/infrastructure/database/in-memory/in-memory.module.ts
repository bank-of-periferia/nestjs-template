import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { inMemoryDatabaseConfig } from '@/main/config/database/in-memory-database.config';
import { TaskRepository } from '@/infrastructure/database/repositories/task.repository';
import { TaskSeedService } from '@/infrastructure/database/seeds/task-seed-service';
import { Task } from '@/infrastructure/database/entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [inMemoryDatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions =>
        configService.get<TypeOrmModuleOptions>('database.inMemory'),
    }),
    TypeOrmModule.forFeature([Task]),
  ],
  providers: [TaskRepository, TaskSeedService],
  exports: [TaskRepository, TaskSeedService],
})
export class InMemoryModule {}
