import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskservice: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskservice.getTasks(filterDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskservice.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskservice.createTask(createTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskservice.deleteTask(id);
  }

  @Patch(':id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.taskservice.updateTaskStatus(id, updateTaskDto.status);
  }
}
