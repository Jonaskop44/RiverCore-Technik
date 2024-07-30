import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendNewsletterActivationDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
