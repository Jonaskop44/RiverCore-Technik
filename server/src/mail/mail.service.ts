import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private prisma: PrismaService,
  ) {}

  async sendUserConfirmation(user: User, token: string) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        //from: '"Support Team" <support@example.com>',
        subject: 'Bestätigungscode für das Elbe-Technik-Konto',
        template: './ActivateAccount',
        context: {
          name: user.firstName,
          email: user.email,
          code: token,
        },
      });
    } catch (error) {
      console.log('Error sending user confirmation email');
    }
  }

  async sendPasswordReset(user: User, token: string) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        //from: '"Support Team" <support@example.com>',
        subject: 'Zurücksetzung des Kennworts für das Elbe-Technik-Konto',
        template: './ResetPassword',
        context: {
          name: user.firstName,
          email: user.email,
          code: token,
        },
      });
    } catch (error) {
      console.log('Error sending password reset email', error);
    }
  }

  async sendNewsletterSubscribe(email: string, id: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        //from: '"Support Team" <support@example.com>',
        subject: 'Angemeldet für den Elbe-Technik-Newsletter',
        template: './SubscribeNewsletter',
        context: {
          url: `http://localhost:3000/newsletter/unsubscribe/${id}`,
        },
      });
    } catch (error) {
      console.log('Error sending newsletter activation email', error);
    }
  }

  async newsletterSubscribe(email: string) {
    const user = await this.prisma.newsletters.findUnique({
      where: {
        email: email,
      },
    });

    if (user) throw new ConflictException('User already subscribed');

    const newUser = await this.prisma.newsletters.create({
      data: {
        email: email,
      },
    });

    this.sendNewsletterSubscribe(newUser.email, newUser.id);
  }

  async newsletterUnsubscribe(mailID: string) {
    const user = await this.prisma.newsletters.findUnique({
      where: {
        id: mailID,
      },
    });

    if (!user) throw new ConflictException('User not found');

    await this.prisma.newsletters.delete({
      where: {
        id: mailID,
      },
    });
  }

  async getNewsletterIDInfo(mailID: string) {
    const user = await this.prisma.newsletters.findUnique({
      where: {
        id: mailID,
      },
    });

    if (!user) throw new ConflictException('User not found');

    return user;
  }
}
