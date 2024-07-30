import { IsEmail, IsNotEmpty } from 'class-validator';

export class NewsletterSubscribeDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

export class NewsletterUnsubscribeDto {
  @IsEmail()
  @IsNotEmpty()
  readonly mailID: string;
}
