import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ActivateUserDto,
  CheckPasswordResetTokenDto,
  GetUserDataFromTokenDto,
  ResendActivationEmailDto,
  ResetPasswordDto,
  SendPasswordResetEmailDto,
} from './dto/user.dto';

@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('token/data/')
  async getUserDataFromToken(@Body() dto: GetUserDataFromTokenDto) {
    return this.userService.getUserDataFromToken(dto.token);
  }

  @Post('activate')
  async activateUser(@Body() dto: ActivateUserDto) {
    return this.userService.activateUser(dto.token);
  }

  @Post('activate/resend')
  async resendActivationEmail(@Body() dto: ResendActivationEmailDto) {
    return this.userService.resendActivationEmail(dto.email);
  }

  @Post('password/check/resttoken')
  async checkPasswordRestToken(@Body() dto: CheckPasswordResetTokenDto) {
    return this.userService.checkPasswordRestToken(dto.token);
  }

  @Post('password/resend')
  async sendPasswordResetEmail(@Body() dto: SendPasswordResetEmailDto) {
    return this.userService.sendPasswordResetEmail(dto.email);
  }

  @Post('password/reset')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.userService.resetPassword(dto);
  }
}
