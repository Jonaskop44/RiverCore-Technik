import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/guards/jwt.guard';
import { CreateChatDto, SendMessageDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  async createChat(@Body() dto: CreateChatDto, @Request() request) {
    return this.chatService.createChat(dto, request);
  }

  @UseGuards(JwtGuard)
  @Post('message/send')
  async sendMessage(@Body() dto: SendMessageDto, @Request() request) {
    return this.chatService.sendMessage(dto, request);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getChats(@Request() request) {
    return this.chatService.getChats(request);
  }

  @UseGuards(JwtGuard)
  @Get('messages/:chatId')
  async getMessages(@Param('chatId') chatId: number, @Request() request) {
    return this.chatService.getMessages(chatId, request);
  }
}
