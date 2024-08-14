import { ReviewStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  readonly rating: number;

  @IsString()
  @IsNotEmpty()
  readonly body: string;
}

export class UpadateReviewDto {
  @IsEnum(ReviewStatus)
  @IsNotEmpty()
  readonly status: ReviewStatus;
}
