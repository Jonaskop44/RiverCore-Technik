import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'types/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    await this.mailerService.sendMail({
      to: user.email,
      //from: '"Support Team" <support@example.com>',
      subject: 'Bestätigungscode für das Elbe-Technik-Konto',
      template: './confirmation',
      context: {
        name: user.firstName,
        email: user.email,
        code: token,
      },
    });
  }
}
