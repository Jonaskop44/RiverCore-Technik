import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthorService } from 'src/author/author.service';

@Module({
  providers: [UserService, PrismaService, JwtService, AuthorService],
  controllers: [UserController],
})
export class UserModule {}
