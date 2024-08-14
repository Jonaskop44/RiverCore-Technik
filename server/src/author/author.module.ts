import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AuthorService, UserService, PrismaService, JwtService],
  exports: [AuthorService],
  controllers: [AuthorController],
})
export class AuthorModule {}
