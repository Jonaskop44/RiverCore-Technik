import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthorService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async createAuthor(id: number) {
    const user = await this.userService.getUserById(id);

    if (!user) throw new Error('User not found');

    return await this.prisma.author.create({
      data: {
        userId: user.id,
      },
    });
  }
}
