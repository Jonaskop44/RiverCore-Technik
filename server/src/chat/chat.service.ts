import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatDto, SendMessageDto } from './dto/chat.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(dto: CreateChatDto, user: User) {
    const supporter = await this.prisma.user.findMany({
      where: {
        role: {
          in: ['MODERATOR', 'ADMIN'],
        },
      },
    });

    const newUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!newUser) throw new ConflictException('User not found');

    return await this.prisma.chat.create({
      data: {
        title: dto.title,
        creatorId: newUser.id,
        participants: {
          connect: [
            { id: newUser.id },
            ...supporter.map((s) => ({ id: s.id })),
          ],
        },
      },
    });
  }

  async sendMessage(dto: SendMessageDto, user: User) {
    //Check if user is part of the chat
    const chat = await this.prisma.chat.findUnique({
      where: {
        id: dto.chatId,
        participants: {
          some: {
            email: user.email,
          },
        },
      },
    });

    if (!chat) throw new ConflictException('Chat not found');

    const newUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!newUser) throw new ConflictException('User not found');

    return this.prisma.message.create({
      data: {
        content: dto.content,
        chatId: dto.chatId,
        userId: newUser.id,
      },
    });
  }

  async getChats(user: User) {
    const channelsExist = await this.prisma.chat.findMany({});

    if (!channelsExist) throw new ConflictException('No channels found');

    const newUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!newUser) throw new ConflictException('User not found');

    return this.prisma.chat.findMany({
      where: {
        participants: {
          some: {
            email: newUser.email,
          },
        },
      },
    });
  }

  async getMessages(chatId: number, user: User) {
    //Chck if user is part of the chat
    const chat = await this.prisma.chat.findUnique({
      where: {
        id: chatId,
        participants: {
          some: {
            email: user.email,
          },
        },
      },
    });

    if (!chat) throw new ConflictException('Chat not found');

    return this.prisma.message.findMany({
      where: {
        chatId: chatId,
      },
      include: {
        user: true,
      },
    });
  }
}
