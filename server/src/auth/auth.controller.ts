import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto, VerifyTokenDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from 'src/guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Post('login')
  async loginUser(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh-token')
  async refreshToken(@Request() request) {
    return this.authService.refreshToken(request.user);
  }

  @Post('verify')
  async verifyUser(@Body() dto: VerifyTokenDto) {
    return this.authService.verifyToken(dto.token);
  }
}
