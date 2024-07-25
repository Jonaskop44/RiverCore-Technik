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
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
        userId: user.id,
      },
    });

    return token.token;
  }
}
