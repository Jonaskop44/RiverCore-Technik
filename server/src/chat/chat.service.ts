import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(dto: CreateChatDto) {
    const supporter = await this.prisma.user.findMany({
      where: {
        role: {
          in: ['MODERATOR', 'ADMIN'],
        },
      },
    });

    return await this.prisma.chat.create({
      data: {
        title: dto.title,
        userId: dto.userId,
      },
    });
  }

  async getMessages(chatId: number) {
    return this.prisma.message.findMany({
      where: { chatId: chatId },
    });
  }

  async sendMessage(chatId: number, content: string) {
    return this.prisma.message.create({
      data: {
        content: content,
        chatId: chatId,
      },
    });
  }

  async getUserChats(userId: number) {
    return this.prisma.chat.findMany({
      where: { userId: userId },
      include: {
        messages: true,
      },
    });
  }
}
