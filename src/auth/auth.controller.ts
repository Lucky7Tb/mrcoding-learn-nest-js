import {
  Body,
  Get,
  Post,
  Request,
  UseGuards,
  Controller,
  UseInterceptors,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/regiser.dto';
import { JwtAuthGuard } from 'common/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return this.authService.profile(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: 'public/uploads/image',
        filename: (_, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  @Post('avatar')
  uploadAvatar(@Req() req, @UploadedFile() file: Express.Multer.File) {
    return this.authService.uploadAvatar(
      req.user.id,
      '/uploads/image/' + file.filename,
    );
  }
}
