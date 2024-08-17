import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto, SendMessageDto } from './dto/chat.dto';
import { UseGuards } from '@nestjs/common';
import { SocketGuard } from 'src/guards/socket.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    // console.log(`Client connected: ${client.id}`);
    // console.log(client.data);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(SocketGuard)
  @SubscribeMessage('createChat')
  async handleCreateChat(
    @MessageBody() dto: CreateChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    const chat = await this.chatService.createChat(dto, client.handshake);
    client.join(chat.id.toString());
    this.server.to(chat.id.toString()).emit('chatCreated', chat);
  }

  @UseGuards(SocketGuard)
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() dto: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.chatService.sendMessage(dto, client.handshake);
    this.server.to(dto.chatId.toString()).emit('receiveMessage', message);
  }

  @UseGuards(SocketGuard)
  @SubscribeMessage('joinChat')
  async handleJoinChat(
    @MessageBody('chatId') chatId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(chatId.toString());
    const messages = await this.chatService.getMessages(
      chatId,
      client.handshake,
    );
    client.emit('chatMessages', messages);
  }

  @UseGuards(SocketGuard)
  @SubscribeMessage('getChats')
  async handleGetChats(@ConnectedSocket() client: Socket) {
    const chats = await this.chatService.getChats(client.handshake);
    client.emit('chatsList', chats);
  }
}
