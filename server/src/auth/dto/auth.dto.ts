import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export class VerifyTokenDto {
  @IsNotEmpty()
  @IsString()
  readonly token: string;
}
