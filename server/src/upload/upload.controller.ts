import {
  Controller,
  Delete,
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

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @UseGuards(JwtGuard)
  @Post('profilePicture')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async uploadProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Request() request,
  ) {
    return this.uploadService.saveProfilePicture(request, file);
  }

  @Get('profilePicture/:filename')
  async getProfilePicture(
    @Param('filename') filename: string,
    @Res() response: Response,
  ) {
    return this.uploadService.getProfilePicture(filename, response);
  }

  @UseGuards(JwtGuard)
  @Delete('profilePicture')
  async deleteProfilePicture(@Request() request) {
    return this.uploadService.deleteProfilePicture(request);
  }
}
