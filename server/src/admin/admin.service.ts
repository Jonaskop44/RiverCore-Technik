import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { UpdateUserDto } from './dto/admin.dto';
import { Designation } from '@prisma/client';

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

  async updateUser(id: number, data: UpdateUserDto) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new ConflictException('User not found');
    }

    if (data.designation === Designation.PERSON && data.companyName) {
      throw new ConflictException(
        'Company name is not required for PERSON designation',
      );
    } else if (data.designation === Designation.COMPANY && !data.companyName) {
      throw new ConflictException(
        'Company name is required for COMPANY designation',
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });

    const { password, ...result } = updatedUser;
    return result;
  }
}
