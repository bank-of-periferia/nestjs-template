import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Task } from '@/infrastructure/database/entities/task.entity';

@Injectable()
export class TaskSeedService {
  private done = [0, 1];

  constructor(private readonly entityManager: EntityManager) {}

  async seed() {
    const tasks = Array.from({ length: 10 }).map((_element, index) => {
      const randomIndex = Math.floor(Math.random() * this.done.length);
      const task = new Task();
      task.id = index + 1;
      task.name = faker.word.verb();
      task.done = this.done[randomIndex];
      return task;
    });
    await this.entityManager.save(tasks);
  }
}
