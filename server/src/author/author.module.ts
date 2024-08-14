import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AuthorService, PrismaService],
  controllers: [AuthorController],
})
export class AuthorModule {}
