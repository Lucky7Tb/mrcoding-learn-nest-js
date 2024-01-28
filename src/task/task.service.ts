import { CreateTaskDto } from './dto/CreateTaskDto';
import { UpdateTaskDto } from './dto/UpdateTaskDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTask(data: CreateTaskDto, user: any) {
    const createdTask = await this.prismaService.tasks.create({
      data: { ...data, id_user: user.id },
    });

    return {
      statusCode: 200,
      data: createdTask,
    };
  }

  async getAllTask(user: any) {
    const tasks = await this.prismaService.tasks.findMany({
      where: { id_user: user.id },
    });

    return {
      statusCode: 200,
      data: tasks,
    };
  }

  async getTaskById(id: number, user: any) {
    try {
      const task = await this.prismaService.tasks.findFirstOrThrow({
        where: { id, id_user: user.id },
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

  async updateTask(id: number, data: UpdateTaskDto, user: any) {
    try {
      const task = await this.prismaService.tasks.update({
        where: { id, id_user: user.id },
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

  async deleteTask(id: number, user: any) {
    try {
      const task = await this.prismaService.tasks.delete({
        where: { id, id_user: user.id },
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
