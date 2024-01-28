import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SchoolService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSchoolDto: CreateSchoolDto) {
    const createdSchool = await this.prismaService.schools.create({
      data: createSchoolDto,
    });

    return {
      statusCode: 200,
      data: createdSchool,
    };
  }

  async findAll() {
    const schools = await this.prismaService.schools.findMany();

    return {
      statusCode: 200,
      data: schools,
    };
  }

  async findOne(id: number) {
    const school = await this.prismaService.schools.findUnique({
      where: { id },
    });

    return {
      statusCode: 200,
      data: school,
    };
  }

  async update(id: number, updateSchoolDto: UpdateSchoolDto) {
    const school = await this.prismaService.schools.update({
      where: { id },
      data: updateSchoolDto,
    });

    return {
      statusCode: 200,
      data: school,
    };
  }

  async remove(id: number) {
    const school = await this.prismaService.schools.delete({
      where: { id },
    });

    return {
      statusCode: 200,
      data: school,
    };
  }
}
