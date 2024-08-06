import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users.map(({ password, ...rest }) => rest);
  }

  async deleteUser(id: number) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new ConflictException('User not found');
    }

    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
