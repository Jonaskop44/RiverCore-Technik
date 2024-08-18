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
import { JwtService } from '@nestjs/jwt';
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
    private jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      console.log('Token:', client.handshake.auth.accessToken);
      const decoded = this.jwtService.decode(client.handshake.auth.accessToken);
      console.log('Decoded token payload:', decoded);

      if (!decoded || !decoded.email) {
        throw new ConflictException('Token is invalid or malformed');
      }

      const verified = this.jwtService.verify(
        client.handshake.auth.accessToken,
        {
          secret: process.env.JWT_SECRET,
        },
      );

      const user = await this.userService.getUserByEmail(verified.email);

      if (!user) throw new ConflictException('User not found');

      const { password, ...result } = user;
      AuthenticatedUsers.set(client.id, result);
    } catch (error) {
      console.error('Error verifying token:', error.message);
    }
  }

  async handleDisconnect(client: Socket) {
    AuthenticatedUsers.delete(client.id);
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody('chatId') chatId: number,
    @ConnectedSocket() client: Socket,
  ) {
    const user = AuthenticatedUsers.get(client.id);
    if (user) {
      this.server.to(chatId.toString()).emit('userTyping', user);
    }
  }

  @SubscribeMessage('stopTyping')
  handleStopTyping(
    @MessageBody('chatId') chatId: number,
    @ConnectedSocket() client: Socket,
  ) {
    const user = AuthenticatedUsers.get(client.id);
    if (user) {
      this.server.to(chatId.toString()).emit('userStoppedTyping', user);
    }
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
