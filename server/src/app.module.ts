import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthorService } from './author/author.service';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, AuthorModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
