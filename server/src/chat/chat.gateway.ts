import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto, SendMessageDto } from './dto/chat.dto';
import { ConflictException } from '@nestjs/common';

@WebSocketGateway(3002, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  //New chat
  @SubscribeMessage('createChat')
  async handleCreateChat(client: Socket, payload: { dto: CreateChatDto }) {
    const { dto } = payload;

    await this.chatService.createChat(dto, {
      user: { email: client },
    });
  }

  @SubscribeMessage('joinChat')
  async handleJoinChat(client: Socket, chatId: number) {
    client.join(`chat-${chatId}`);
    console.log(`Client ${client.id} joined chat-${chatId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: { dto: SendMessageDto }) {
    const { dto } = payload;

    try {
      const message = await this.chatService.sendMessage(dto, {
        user: { email: client },
      });

      this.server.to(`chat-${dto.chatId}`).emit('receiveMessage', message);

      return message;
    } catch (error) {
      throw new ConflictException(
        'Sometthing during sending message went wrong',
      );
    }
  }
}
