import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TaskSeedService } from '@/infrastructure/database/seeds/task-seed-service';
import { TaskService } from '@/modules/task/task.service';
import { Task } from '@/infrastructure/database/entities/task.entity';
import { DatabaseModule } from '@/infrastructure/database/database.module';

describe('TaskService', () => {
  let service: TaskService;
  let taskSeedService: TaskSeedService;
  let connection: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule.forRoot(), TypeOrmModule.forFeature([Task])],
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
    taskSeedService = module.get<TaskSeedService>(TaskSeedService);

    connection = module.get<Connection>(Connection);
    await connection.runMigrations();
    await taskSeedService.seed();
  });

  afterAll(async () => {
    if (connection.isConnected) {
      let executedMigrations = await connection.query(
        'SELECT * FROM migrations ORDER BY timestamp DESC',
      );
      while (executedMigrations.length > 0) {
        await connection.undoLastMigration();
        executedMigrations = await connection.query(
          'SELECT * FROM migrations ORDER BY timestamp DESC',
        );
      }
      await connection.close();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return result when done equal to 1', async () => {
    const data = await service.execute(1);
    expect(data).toBeInstanceOf(Array);
  });

  it('should return result when done equal to 0', async () => {
    const data = await service.execute(0);
    expect(data).toBeInstanceOf(Array);
  });

  it('should return result when done equal to 5', async () => {
    const data = await service.execute(5);
    expect(data).toBeNull();
  });
});
