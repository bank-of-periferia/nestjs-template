import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '@/modules/task/task.controller';
import { TaskService } from '@/modules/task/task.service';
import { ModulesModule } from '@/modules/modules.module';
import { DatabaseModule } from '@/infrastructure/database/database.module';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ModulesModule, DatabaseModule.forRoot()],
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
