import { CreateTaskDto } from './dto/CreateTaskDto';
import { UpdateTaskDto } from './dto/UpdateTaskDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTask(data: CreateTaskDto) {
    const createdTask = await this.prismaService.tasks.create({ data });

    return {
      statusCode: 200,
      data: createdTask,
    };
  }

  async getAllTask() {
    const tasks = await this.prismaService.tasks.findMany();

    return {
      statusCode: 200,
      data: tasks,
    };
  }

  async getTaskById(id: number) {
    try {
      const task = await this.prismaService.tasks.findFirstOrThrow({
        where: { id },
      });

      return {
        statusCode: 200,
        data: task,
      };
    } catch (error) {
      switch (error.code) {
        case 'P2025':
          throw new NotFoundException({
            statusCode: 404,
            message: 'Task not found',
          });
        default:
          break;
      }
    }
  }

  async updateTask(id: number, data: UpdateTaskDto) {
    try {
      const task = await this.prismaService.tasks.update({
        where: { id },
        data,
      });

      return {
        statusCode: 200,
        data: task,
      };
    } catch (error) {
      switch (error.code) {
        case 'P2025':
          throw new NotFoundException({
            statusCode: 404,
            message: 'Task not found',
          });
        default:
          break;
      }
    }
  }

  async deleteTask(id: number) {
    try {
      const task = await this.prismaService.tasks.delete({
        where: { id },
      });

      return {
        statusCode: 200,
        data: task,
      };
    } catch (error) {
      switch (error.code) {
        case 'P2025':
          throw new NotFoundException({
            statusCode: 404,
            message: 'Task not found',
          });
        default:
          break;
      }
    }
  }
}
