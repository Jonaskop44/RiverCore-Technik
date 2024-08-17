import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinChat')
  async handleJoinChat(client: Socket, chatId: number) {
    client.join(`chat-${chatId}`);
    console.log(`Client ${client.id} joined chat-${chatId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    client: Socket,
    payload: { chatId: number; content: string },
  ) {
    // const message = await this.chatService.sendMessage(
    //   payload.chatId,
    //   payload.content,
    // );
    // this.server.to(`chat-${payload.chatId}`).emit('message', message);
  }
}
