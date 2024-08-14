import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { UpadateReviewDto, UpdateUserDto } from './dto/admin.dto';
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

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new ConflictException('User not found');
    }

    if (dto.designation === Designation.PERSON && dto.companyName) {
      throw new ConflictException(
        'Company name is not required for PERSON designation',
      );
    } else if (dto.designation === Designation.COMPANY && !dto.companyName) {
      throw new ConflictException(
        'Company name is required for COMPANY designation',
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
        companyName: dto.companyName ? dto.companyName : null,
      },
    });

    const { password, ...result } = updatedUser;
    return result;
  }

  async getAllReviews() {
    return await this.prisma.review.findMany({
      include: {
        author: {
          include: {
            user: {},
          },
        },
      },
    });
  }

  async updateAuthor(id: number) {
    const author = await this.prisma.author.findUnique({
      where: {
        id: id,
      },
    });

    if (!author) throw new Error('Author not found');

    return await this.prisma.author.update({
      where: {
        id: author.id,
      },
      data: {
        blocked: !author.blocked,
      },
    });
  }

  async updateReview(id: number, dto: UpadateReviewDto) {
    const review = await this.prisma.review.findUnique({
      where: {
        id: id,
      },
    });

    if (!review) throw new ConflictException('Review not found');

    return await this.prisma.review.update({
      where: {
        id: review.id,
      },
      data: {
        status: dto.status,
      },
    });
  }
}
