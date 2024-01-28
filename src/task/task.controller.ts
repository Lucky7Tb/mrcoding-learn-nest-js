import {
  Get,
  Put,
  Req,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { UpdateTaskDto } from './dto/UpdateTaskDto';
import { JwtAuthGuard } from 'common/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() body: CreateTaskDto, @Req() req: any) {
    return await this.taskService.createTask(body, req.user);
  }

  @Get()
  async getAllTask(@Req() req: any) {
    return await this.taskService.getAllTask(req.user);
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return await this.taskService.getTaskById(id, req.user);
  }

  @Put(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Body() body: UpdateTaskDto,
  ) {
    return await this.taskService.updateTask(id, body, req.user);
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return await this.taskService.deleteTask(id, req.user);
  }
}
