import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from './prisma/prisma.module';
import { SchoolModule } from './school/school.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtStrategy } from './auth/strategy/jwt.strategy';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),
    TaskModule,
    PrismaModule,
    AuthModule,
    PassportModule,
    SchoolModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
