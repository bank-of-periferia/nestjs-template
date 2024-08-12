import { Injectable } from '@nestjs/common';
import { TaskRepository } from '@/infrastructure/database/repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(done: number) {
    const data = await this.taskRepository.findByState(done);
    if (data.length) {
      return data;
    }
    return null;
  }
}
