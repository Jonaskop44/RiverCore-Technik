import { Designation } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsOptional,
  ValidateIf,
} from 'class-validator';
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
