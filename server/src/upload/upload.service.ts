import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { existsSync, mkdirSync, renameSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UploadService {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async saveProfilePicture(request, file: any) {
    const userEmail = request.user.email;

    if (!userEmail) {
      throw new UnauthorizedException('User not found');
    }

    const user = await this.userService.getUserByEmail(userEmail);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const userId = user.id;
    const newFileName = `${userId}-${file.filename}`;

    // Datei umbenennen, um die User-ID im Dateinamen zu speichern
    const oldPath = join(file.destination, file.filename);
    const newPath = join(file.destination, newFileName);
    renameSync(oldPath, newPath);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        profilePicture: file.filename,
      },
    });

    return {
      message: 'Profile picture uploaded and saved successfully',
      fileName: newFileName,
    };
  }
}
