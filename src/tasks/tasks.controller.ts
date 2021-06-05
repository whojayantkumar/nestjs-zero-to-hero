import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskservice: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskservice.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskservice.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskservice.createTask(createTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id')id: string){
   return this.taskservice.deleteTask(id);
  }
  @Patch(':id/status')
  updateTask(@Param('id')id: string,@Body('status') status: TaskStatus): Task{
    return this.taskservice.updateTask(id, status);
  }
}
