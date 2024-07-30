import { Body, Controller, Post } from '@nestjs/common';
import { SendNewsletterActivationDto } from './dto/mail.dto';
import { UserService } from 'src/user/user.service';

@Controller('api/v1/mail')
export class MailController {
  constructor(private userService: UserService) {}

  @Post('newsletter/activate')
  async sendNewsletterActivation(@Body() dto: SendNewsletterActivationDto) {
    return this.userService.newsletterSubscribe(dto.email);
  }
}
