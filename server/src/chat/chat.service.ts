import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatDto, CreateMessageDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(dto: CreateChatDto, request) {
    const supporter = await this.prisma.user.findMany({
      where: {
        role: {
          in: ['MODERATOR', 'ADMIN'],
        },
      },
    });

    const user = await this.prisma.user.findUnique({
      where: {
        email: request.user.email,
      },
    });

    if (!user) throw new ConflictException('User not found');

    return await this.prisma.chat.create({
      data: {
        title: dto.title,
        participants: {
          connect: [{ id: user.id }, ...supporter.map((s) => ({ id: s.id }))],
        },
      },
    });
  }

  async sendMessage(dto: CreateMessageDto, request) {
    const chat = await this.prisma.chat.findUnique({
      where: {
        id: dto.chatId,
        participants: {
          some: {
            email: request.user.email,
          },
        },
      },
    });

    if (!chat) throw new ConflictException('Chat not found');

    const user = await this.prisma.user.findUnique({
      where: {
        email: request.user.email,
      },
    });

    if (!user) throw new ConflictException('User not found');

    return this.prisma.message.create({
      data: {
        content: dto.content,
        chatId: dto.chatId,
        userId: user.id,
      },
    });
  }

  async getChats(request) {
    return this.prisma.chat.findMany({
      where: {
        participants: {
          some: {
            email: request.user.email,
          },
        },
      },
    });
  }

  async getMessages(chatId: number, request) {
    //Chck if user is part of the chat
    const chat = await this.prisma.chat.findUnique({
      where: {
        id: chatId,
        participants: {
          some: {
            email: request.user.email,
          },
        },
      },
    });

    if (!chat) throw new ConflictException('Chat not found');

    return this.prisma.message.findMany({
      where: {
        chatId: chatId,
      },
    });
  }
}
