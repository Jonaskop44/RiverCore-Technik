import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { User } from 'types/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user)
      throw new ConflictException('There is already a user with this email');

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 12),
        companyName: dto.companyName ? dto.companyName : null,
      },
    });

    const { password, ...result } = newUser;

    const token = await this.createActivateToken(newUser);
    await this.mailService.sendUserConfirmation(newUser, token);

    return result;
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async getUserByLastname(lastname: string) {
    return this.prisma.user.findMany({
      where: {
        lastName: lastname,
      },
    });
  }

  async createActivateToken(user: User) {
    const token = await this.prisma.activateToken.create({
      data: {
        token: Math.floor(100000 + Math.random() * 900000).toString(),
        userId: user.id,
      },
    });

    return token.token;
  }

  async activateUser(token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        activateToken: {
          some: {
            AND: [
              {
                activatedAt: null,
              },
              {
                createdAt: {
                  gt: new Date(Date.now() - 15 * 60 * 1000),
                },
              },
              {
                token: token,
              },
            ],
          },
        },
      },
    });

    if (!user) {
      this.prisma.activateToken.delete({
        where: {
          token: token,
        },
      });
      throw new ConflictException('The token is invalid or expired');
    }

    const newUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        activated: true,
      },
    });

    await this.prisma.activateToken.update({
      where: {
        token: token,
      },
      data: {
        activatedAt: new Date(),
      },
    });

    return newUser;
  }

  async resendActivationEmail(email: string) {
    const user = await this.getUserByEmail(email);

    if (!user) throw new ConflictException('User not found');

    if (user.activated)
      throw new ConflictException('User is already activated');

    const token = await this.createActivateToken(user);
    await this.mailService.sendUserConfirmation(user, token);

    return;
  }
}
