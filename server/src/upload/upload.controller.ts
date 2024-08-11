import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './config/multer.config';
import { JwtGuard } from 'src/guards/jwt.guard';
import { Response } from 'express';

@Controller('api/v1/upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @UseGuards(JwtGuard)
  @Post('profilePicture')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async uploadProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Request() request,
  ) {
    this.uploadService.saveProfilePicture(request, file);
  }

  @UseGuards(JwtGuard)
  @Get('profilePicture/:filename')
  async getProfilePicture(
    @Param('filename') filename: string,
    @Res() response: Response,
  ) {
    return this.uploadService.getProfilePicture(filename, response);
  }
}
