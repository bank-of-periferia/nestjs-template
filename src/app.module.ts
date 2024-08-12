import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infrastructure/database/database.module';
import { ModulesModule } from '@/modules/modules.module';
import { TaskController } from '@/modules/task/task.controller';
import { TaskService } from '@/modules/task/task.service';

@Module({
  imports: [DatabaseModule.forRoot(), ModulesModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class AppModule {}
