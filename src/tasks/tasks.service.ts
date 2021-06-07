import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id == id);
    if (!found) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    } else {
      return found;
    }
  }
  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    //do something with status
    if (status) {
      return tasks.filter((task) => task.status == status);
    }
    if (search) {
      return tasks.filter(
        (task) =>
          task.title.toLowerCase().match(search.toLowerCase()) ||
          task.description.toLowerCase().match(search.toLowerCase()),
      );
    }
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
  deleteTask(id: string): Task[] {
    // const index = this.tasks.findIndex((task) => task.id == id);
    const task = this.getTaskById(id);
    return this.tasks.splice(this.tasks.indexOf(task), 1);
  }
  updateTask(id: string, status: TaskStatus): Task {
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
