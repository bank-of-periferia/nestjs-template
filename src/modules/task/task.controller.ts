import { Controller, Get, Query, Req, Res, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';
import { TaskService } from '@/modules/task/task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async searchTaskByState(
    @Query('done') done: string,
    @Req() _req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const doneParam = done !== undefined ? Number(done) : 1;
    const data = await this.taskService.execute(doneParam);
    if (data) {
      res.status(HttpStatus.OK).json(data);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({
        message: 'No tasks found with this state',
      });
    }
  }
}
