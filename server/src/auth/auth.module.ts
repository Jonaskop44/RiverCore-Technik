import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthorModule } from 'src/author/author.module';
import { AuthorService } from 'src/author/author.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    JwtService,
    AuthorService,
  ],
})
export class AuthModule {}
