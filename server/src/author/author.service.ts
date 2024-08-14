import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async createAuthor(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new Error('User not found');

    return await this.prisma.author.create({
      data: {
        userId: user.id,
      },
    });
  }
}
