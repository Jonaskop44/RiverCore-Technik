import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UploadController],
  providers: [UploadService, JwtService],
})
export class UploadModule {}
