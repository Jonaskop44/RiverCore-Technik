import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

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
      },
    });

    const { password, ...result } = newUser;

    const UUID = Math.random().toString(36).substring(2, 15);
    await this.mailService.sendUserConfirmation(newUser, UUID);

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
}
