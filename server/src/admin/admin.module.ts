import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService, JwtService, Reflector, UserService],
})
export class AdminModule {}
