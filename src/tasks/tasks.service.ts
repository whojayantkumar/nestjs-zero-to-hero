import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exception } from 'console';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository,
  ) {}

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   //do something with status
  //   if (status) {
  //     return tasks.filter((task) => task.status == status);
  //   }
  //   if (search) {
  //     return tasks.filter(
  //       (task) =>
  //         task.title.toLowerCase().match(search.toLowerCase()) ||
  //         task.description.toLowerCase().match(search.toLowerCase()),
  //     );
  //   }
  // }
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException(`Task with id '${id}' not found`);
    }
  }
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
  // updateTask(id: string, status: TaskStatus): Task {
  //   // let task = this.tasks.find((t) => t.id == id);
  //   // const index = this.tasks.findIndex((task)=> task.id == id);
  //   // this.tasks.splice(index, 1);
  //   // task.status = TaskStatus.IN_PROGRESS;
  //   // this.tasks.push(task);
  //   // return task;
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
