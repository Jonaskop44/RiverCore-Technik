import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { existsSync, renameSync, unlinkSync } from 'fs';
import { join } from 'path';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { of } from 'rxjs';
import { Response } from 'express';

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

    //Rename file with userId prefix
    const oldPath = join(file.destination, file.filename);
    const newPath = join(file.destination, newFileName);
    renameSync(oldPath, newPath);

    //Delete old profile picture
    if (user.profilePicture) {
      try {
        const oldProfilePicture = join(
          file.destination,
          `${user.profilePicture}`,
        );
        unlinkSync(oldProfilePicture);
      } catch (error) {
        console.error('Error deleting old profile picture', error);
      }
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        profilePicture: newFileName,
      },
    });
  }

  async getProfilePicture(filename: string, response: Response) {
    try {
      const file = await this.prisma.user.findFirst({
        where: {
          profilePicture: filename,
        },
      });

      if (!file) {
        return response.sendFile(
          join(process.cwd(), 'public/images/profilePictures/pb-default.png'),
        );
      }

      return response.sendFile(
        join(process.cwd(), 'public/images/profilePictures', filename),
      );
    } catch (error) {
      throw new ConflictException('File not found');
    }
  }

  // async getProfilePicture(response: Response) {
  //   try {
  //     const authorizationHeader =
  //       response.req.headers['authorization'].split(' ')[1];

  //     const user =
  //       await this.userService.getUserDataFromToken(authorizationHeader);

  //     if (!user) throw new ConflictException('User not found');

  //     if (!user.profilePicture) {
  //       return response.sendFile(
  //         join(process.cwd(), 'public/images/profilePictures/pb-default.png'),
  //       );
  //     }
  //     return response.sendFile(
  //       join(
  //         process.cwd(),
  //         'public/images/profilePictures',
  //         user.profilePicture,
  //       ),
  //     );
  //   } catch (error) {
  //     throw new ConflictException('File not found');
  //   }
  // }
}
