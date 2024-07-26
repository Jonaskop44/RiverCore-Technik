import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ActivateUserDto, ResendActivationEmailDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('activate')
  async activateUser(@Body() dto: ActivateUserDto) {
    return this.userService.activateUser(dto.token);
  }

  @Post('activate/resend')
  async resendActivationEmail(@Body() dto: ResendActivationEmailDto) {
    return this.userService.resendActivationEmail(dto.email);
  }
}
