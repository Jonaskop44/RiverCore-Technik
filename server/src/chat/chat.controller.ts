import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('create')
  async createChat(@Body('userId') userId: string) {
    return this.chatService.createChat(Number(userId));
  }

  @Get('user/:userId')
  async getUserChats(@Param('userId') userId: string) {
    return this.chatService.getUserChats(Number(userId));
  }

  @Get('messages/:chatId')
  async getChatMessages(@Param('chatId') chatId: string) {
    return this.chatService.getMessages(Number(chatId));
  }

  @Post('message/:chatId')
  async sendMessage(
    @Param('chatId') chatId: string,
    @Body('content') content: string,
  ) {
    return this.chatService.sendMessage(Number(chatId), content);
  }
}
