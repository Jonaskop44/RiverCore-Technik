import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'w01dce97.kasserver.com',
        port: 465,
        secure: true,
        auth: {
          user: 'jonas@codeflexx.com',
          pass: 'JonasCode2023!',
        },
      },
      defaults: {
        from: '"No Reply" <jonas@codeflexx.com>',
      },
      template: {
        dir: join(__dirname, '../../mail/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
