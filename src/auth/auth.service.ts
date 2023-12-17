import {
  Injectable,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/regiser.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prismaService.users.findFirst({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Email atau password salah',
      });
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Email atau password salah',
      });
    }

    const token = await this.jwtService.signAsync(user);

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successfull',
      data: {
        token: token,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.prismaService.users.findFirst({
      where: { email: registerDto.email },
    });

    if (user) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User sudah terdaftar',
      });
    }

    const createdUser = await this.prismaService.users.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        password: await bcrypt.hash(
          registerDto.password,
          await bcrypt.genSalt(10),
        ),
      },
    });

    if (createdUser) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Register successfull',
      };
    }
  }
}
