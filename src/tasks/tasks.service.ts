import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((t) => t.id == id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  deleteTask(id: string) : Task[]{
    const index = this.tasks.findIndex((task)=> task.id == id);
    return this.tasks.splice(index, 1);
  }
  updateTask(id: string, status: TaskStatus): Task{
    // let task = this.tasks.find((t) => t.id == id);
    // const index = this.tasks.findIndex((task)=> task.id == id);
    // this.tasks.splice(index, 1);
    // task.status = TaskStatus.IN_PROGRESS;
    // this.tasks.push(task);
    // return task;
   const task = this.getTaskById(id);
   task.status = status;
   return task;
  }
}
