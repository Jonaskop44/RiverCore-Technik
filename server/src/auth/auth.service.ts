import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { compare } from 'bcrypt';

const EXPIRE_TIME = 1000 * 60 * 60 * 24;

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(dto: LoginDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (user && (await compare(dto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
