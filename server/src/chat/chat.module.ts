import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatController } from './chat.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { AuthorService } from 'src/author/author.service';

@Module({
  controllers: [ChatController],
  providers: [
    ChatGateway,
    ChatService,
    PrismaService,
    JwtService,
    AuthService,
    UserService,
    AuthorService,
  ],
})
export class ChatModule {}
