import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UploadService {
  constructor(private readonly jwtService: JwtService) {}

  multerConfig = {
    storage: diskStorage({
      destination: (request, file, callback) => {
        const uploadPath = './public/images/profilePictures';

        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath, { recursive: true });
        }

        callback(null, uploadPath);
      },
      filename: (request, file, callback) => {
        // Authorization header extraction to get the user id
        const authorizationHeader = request.headers.authorization;

        if (!authorizationHeader) {
          return callback(
            new UnauthorizedException('Authorization header is missing'),
            null,
          );
        }

        const token = authorizationHeader.replace('Bearer ', '');

        try {
          const decoded = this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET,
          });

          const userId = decoded?.id; // Assuming the token contains the user ID

          if (!userId) {
            throw new ConflictException('User ID not found in token');
          }

          const name = file.originalname.split('.')[0];
          const extension = extname(file.originalname);
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${userId}-${name}-${randomName}${extension}`);
        } catch (error) {
          return callback(new ConflictException('Invalid token'), null);
        }
      },
    }),
    fileFilter: (request, file, callback) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        callback(null, true);
      } else {
        callback(new ConflictException('File not supported'), false);
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
  };
}
