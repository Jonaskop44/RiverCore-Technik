import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatController } from './chat.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, PrismaService, JwtService],
})
export class ChatModule {}
