import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './config/multer.config';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RefreshJwtGuard } from 'src/guards/refresh.guard';

@Controller('api/v1/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(JwtGuard)
  @Post('profilePicture')
  @UseInterceptors(FileInterceptor('image', this.uploadService.multerConfig))
  async uploadProfilePicture(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
