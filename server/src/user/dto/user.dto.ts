import { Designation } from '@prisma/client';
import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { IsCompanyNameRequired } from './custom-validators';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEnum(Designation)
  @IsNotEmpty()
  readonly designation: Designation;

  @IsCompanyNameRequired({
    message: 'companyName must be provided when designation is COMPANY',
  })
  readonly companyName?: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export class ActivateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string;
}

export class ResendActivationEmailDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

export class SendPasswordResetEmailDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly token: string;
}

export class CheckPasswordResetTokenDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string;
}
