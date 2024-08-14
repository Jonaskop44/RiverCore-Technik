import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthorService } from 'src/author/author.service';

@Module({
  controllers: [UploadController],
  providers: [
    UploadService,
    JwtService,
    PrismaService,
    UserService,
    AuthorService,
  ],
})
export class UploadModule {}
