import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'types/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `http://localhost:3000/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      //from: '"Support Team" <support@example.com>',
      subject: 'Elbe Technik KG - Email Adresse bestätigen',
      template: './confirmation',
      context: {
        name: user.firstName,
        url,
      },
    });
  }
}
