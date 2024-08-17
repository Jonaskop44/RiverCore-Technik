import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  chatId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
