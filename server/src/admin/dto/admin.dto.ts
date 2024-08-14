import { Designation, ReviewStatus, Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsEnum(Role)
  @IsNotEmpty()
  readonly role: Role;

  @IsEnum(Designation)
  @IsNotEmpty()
  readonly designation: Designation;

  @IsString()
  readonly companyName: string;

  @IsNotEmpty()
  readonly activated: boolean;
}

export class UpadateReviewDto {
  @IsEnum(ReviewStatus)
  @IsNotEmpty()
  readonly status: ReviewStatus;
}
