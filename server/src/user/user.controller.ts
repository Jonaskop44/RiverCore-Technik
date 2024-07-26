import { Controller, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('activate/:token')
  async activateUser(@Param('token') token: string) {
    return this.userService.activateUser(token);
  }
}
