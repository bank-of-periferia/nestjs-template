import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '@/infrastructure/database/entities/task.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
  ) {}

  async findByState(done: number): Promise<Task[]> {
    return await this.repository
      .createQueryBuilder('task')
      .select(['task.id', 'task.name', 'task.done'])
      .where('task.done = :done', { done })
      .getMany();
  }
}
