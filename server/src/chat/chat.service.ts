import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatDto, CreateMessageDto } from './dto/chat.dto';

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

    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
    });

    if (!user) throw new ConflictException('User not found');

    return await this.prisma.chat.create({
      data: {
        title: dto.title,
        participants: {
          connect: [
            { id: dto.userId },
            ...supporter.map((s) => ({ id: s.id })),
          ],
        },
      },
    });
  }

  async sendMessage(dto: CreateMessageDto) {
    const chat = await this.prisma.chat.findUnique({
      where: {
        id: dto.chatId,
      },
    });

    if (!chat) throw new ConflictException('Chat not found');

    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
    });

    if (!user) throw new ConflictException('User not found');

    return this.prisma.message.create({
      data: {
        content: dto.content,
        chatId: dto.chatId,
        userId: dto.userId,
      },
    });
  }
}
