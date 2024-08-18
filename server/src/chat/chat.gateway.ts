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
import { UserService } from 'src/user/user.service';
import { ConflictException } from '@nestjs/common';
export const AuthenticatedUsers = new Map();

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private userService: UserService,
  ) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    try {
      const user = await this.userService.getUserDataFromToken(
        client.handshake.auth.accessToken,
      );
      AuthenticatedUsers.set(client.id, user);
    } catch (error) {
      console.log(error);
    }
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createChat')
  async handleCreateChat(
    @MessageBody() dto: CreateChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    const chat = await this.chatService.createChat(
      dto,
      AuthenticatedUsers.get(client.id),
    );
    client.join(chat.id.toString());
    this.server.emit('chatCreated', chat);
    // this.server.to(chat.id.toString()).emit('chatCreated', chat)
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() dto: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.chatService.sendMessage(
      dto,
      AuthenticatedUsers.get(client.id),
    );
    this.server.to(dto.chatId.toString()).emit('receiveMessage', message);
  }

  @SubscribeMessage('joinChat')
  async handleJoinChat(
    @MessageBody('chatId') chatId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(chatId.toString());
    const messages = await this.chatService.getMessages(
      chatId,
      AuthenticatedUsers.get(client.id),
    );
    client.emit('chatMessages', messages);
  }

  @SubscribeMessage('getChats')
  async handleGetChats(@ConnectedSocket() client: Socket) {
    const chats = await this.chatService.getChats(
      AuthenticatedUsers.get(client.id),
    );
    client.emit('chatsList', chats);
  }
}
