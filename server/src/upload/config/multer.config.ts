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
      const extension = extname(file.originalname);
      const uuid = crypto.randomUUID();
      callback(null, `${uuid}${extension}`);
    },
  }),
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(
        new ConflictException(
          'File type not allowed! Only use: (jpg, jpeg, png)',
        ),
        false,
      );
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
};

export default multerConfig;
