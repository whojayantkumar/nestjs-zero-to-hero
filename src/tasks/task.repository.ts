import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasaks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search.toLowerCase()}%` },
      );
    }
    if (search && status) {
      query.andWhere(
        'task.status = :status AND (LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { status, search: `%${search.toLowerCase()}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }
}
