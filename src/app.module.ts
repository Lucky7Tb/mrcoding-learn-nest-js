import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './auth/strategy/jwt.strategy';

@Module({
  imports: [TaskModule, PrismaModule, AuthModule, PassportModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
