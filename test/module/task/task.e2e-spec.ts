import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { ModulesModule } from '@/modules/modules.module';
import { TaskSeedService } from '@/infrastructure/database/seeds/task-seed-service';

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let taskSeedService: TaskSeedService;
  let connection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ModulesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    taskSeedService = app.get<TaskSeedService>(TaskSeedService);

    connection = app.get<Connection>(Connection);
    await connection.runMigrations();
    await taskSeedService.seed();
    await app.init();
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

  it('should return 200 when / (GET) is called with done equal to 1', () => {
    const done = '1';
    return request(app.getHttpServer())
      .get(`/tasks?done=${done}`)
      .expect(HttpStatus.OK);
  });

  it('should return 404 when / (GET) is called with done equal to 5', () => {
    const done = '5';
    return request(app.getHttpServer())
      .get(`/tasks?done=${done}`)
      .expect(HttpStatus.NOT_FOUND);
  });

  it('should return 200 when / (GET) is called without the query parameter done', () => {
    return request(app.getHttpServer()).get(`/tasks`).expect(HttpStatus.OK);
  });
});
