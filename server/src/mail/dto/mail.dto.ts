import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class NewsletterSubscribeDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

export class NewsletterUnsubscribeDto {
  @IsString()
  @IsNotEmpty()
  readonly mailID: string;
}

export class SendNewsletterDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly subject: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
