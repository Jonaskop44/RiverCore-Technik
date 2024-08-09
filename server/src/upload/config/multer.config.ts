import { ConflictException } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

const multerConfig = {
  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = './public/images/profilePictures';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }

      callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
      //Authorization token is here needed to get the user id

      const name = file.originalname.split('.')[0];
      const extension = extname(file.originalname);
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      callback(null, `${name}-${randomName}${extension}`);
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

export default multerConfig;
