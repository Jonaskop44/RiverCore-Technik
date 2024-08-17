import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto, CreateMessageDto } from './dto/chat.dto';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  async createChat(@Body() dto: CreateChatDto) {
    return this.chatService.createChat(dto);
  }

  @UseGuards(JwtGuard)
  @Post('message/create')
  async createMessage(@Body() dto: CreateMessageDto, @Request() request) {
    return this.chatService.sendMessage(dto);
  }
}
