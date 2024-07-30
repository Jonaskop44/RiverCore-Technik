import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendNewsletterActivationDto } from './dto/mail.dto';

@Controller('api/v1/mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('newsletter/activate')
  async sendNewsletterActivation(@Body() dto: SendNewsletterActivationDto) {
    return this.mailService.sendNewsletterActivation(dto.email);
  }
}
