import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthorService } from './author/author.service';
import { AuthorModule } from './author/author.module';
import { MailService } from './mail/mail.service';
import { MailController } from './mail/mail.controller';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, AuthorModule, MailModule],
  controllers: [MailController],
  providers: [PrismaService, MailService],
})
export class AppModule {}
