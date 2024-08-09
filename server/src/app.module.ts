import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthorModule } from './author/author.module';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './admin/admin.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    AuthorModule,
    MailModule,
    AdminModule,
    UploadModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
