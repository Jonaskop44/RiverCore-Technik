import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  NewsletterSubscribeDto,
  NewsletterUnsubscribeDto,
  SendNewsletterDto,
} from './dto/mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('newsletter/subscribe')
  async newsletterSubscribe(@Body() dto: NewsletterSubscribeDto) {
    return this.mailService.newsletterSubscribe(dto.email);
  }

  @Delete('newsletter/unsubscribe')
  async newsletterUnsubscribe(@Body() dto: NewsletterUnsubscribeDto) {
    return this.mailService.newsletterUnsubscribe(dto.mailID);
  }

  @Get('newsletter/info/:mailID')
  async getNewsletterIDInfo(@Param('mailID') mailID: string) {
    return this.mailService.getNewsletterIDInfo(mailID);
  }
}
