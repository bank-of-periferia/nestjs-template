import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mysqlDatabaseConfig } from '@/main/config/database/mysql-database.config';
import { TaskRepository } from '@/infrastructure/database/repositories/task.repository';
import { TaskSeedService } from '@/infrastructure/database/seeds/task-seed-service';
import { Task } from '@/infrastructure/database/entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mysqlDatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions =>
        configService.get<TypeOrmModuleOptions>('database.mysql'),
    }),
    TypeOrmModule.forFeature([Task]),
  ],
  providers: [TaskRepository, TaskSeedService],
  exports: [TaskRepository, TaskSeedService],
})
export class MysqlModule {}
