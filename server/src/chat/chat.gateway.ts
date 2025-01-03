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

enum OnlineStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}
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
      const decoded = this.jwtService.decode(client.handshake.auth.accessToken);
      if (!decoded || !decoded.email) {
        throw new ConflictException('Token is invalid or malformed');
      }

      const verified = await this.jwtService.verify(
        client.handshake.auth.accessToken,
        {
          secret: process.env.JWT_SECRET,
        },
      );

      const user = await this.userService.getUserByEmail(verified.email);
      if (!user) throw new ConflictException('User not found');

      const { password, ...result } = user;
      AuthenticatedUsers.set(client.id, result);

      //Set online status
      this.server.emit('userStatus', {
        status: OnlineStatus.ONLINE,
        userId: user.id,
      });
    } catch (error) {
      console.error('Error verifying token:', error.message);
    }
  }

  async handleDisconnect(client: Socket) {
    const user = AuthenticatedUsers.get(client.id);
    if (user) {
      AuthenticatedUsers.delete(client.id);

      this.server.emit('userStatus', {
        userId: user.id,
        status: OnlineStatus.OFFLINE,
      });

      console.log('Client disconnected:', client.id);
    }
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody('chatId') chatId: number,
    @ConnectedSocket() client: Socket,
  ) {
    const user = AuthenticatedUsers.get(client.id);
    if (user) {
      this.server.to(chatId.toString()).emit('userTyping', { ...user, chatId });
    }
  }

  @SubscribeMessage('stopTyping')
  handleStopTyping(
    @MessageBody('chatId') chatId: number,
    @ConnectedSocket() client: Socket,
  ) {
    const user = AuthenticatedUsers.get(client.id);
    if (user) {
      this.server
        .to(chatId.toString())
        .emit('userStoppedTyping', { ...user, chatId });
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

    const user = await this.userService.getUserById(chat.creatorId);

    client.join(chat.id.toString());
    this.server.emit('chatCreated', { ...chat, user }); // this.server.to(chat.id.toString()).emit('chatCreated', chat)
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() dto: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = AuthenticatedUsers.get(client.id);
    const message = await this.chatService.sendMessage(dto, user);

    this.server.to(dto.chatId.toString()).emit('receiveMessage', {
      ...message,
      user: user,
    });
  }

  @SubscribeMessage('joinChat')
  async handleJoinChat(
    @MessageBody('chatId') chatId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(chatId.toString());
    const user = AuthenticatedUsers.get(client.id);

    //mark messages as read
    await this.chatService.markMessageAsRead(chatId, user);
    this.server.to(chatId.toString()).emit('messageReaded', {
      chatId,
      userId: user.id,
    });

    const messages = await this.chatService.getMessages(chatId, user);

    const formattedMessages = messages.map((message) => ({
      ...message,
      user: message.user,
    }));

    client.emit('chatMessages', formattedMessages);
  }

  @SubscribeMessage('markMessageAsReaded')
  async handleMarkMessageAsReaded(
    @MessageBody('chatId') chatId: number,
    @ConnectedSocket() client: Socket,
  ) {
    const user = AuthenticatedUsers.get(client.id);
    await this.chatService.markMessageAsRead(chatId, user);

    //Notify other users
    this.server.to(chatId.toString()).emit('messageReaded', {
      chatId,
      userId: user.id,
    });
  }

  @SubscribeMessage('getChats')
  async handleGetChats(@ConnectedSocket() client: Socket) {
    const chats = await this.chatService.getChats(
      AuthenticatedUsers.get(client.id),
    );

    const formattedChats = await Promise.all(
      chats.map(async (chat) => {
        const creatorUser = await this.userService.getUserById(chat.creatorId);
        const user = await this.userService.getUserById(
          AuthenticatedUsers.get(client.id).id,
        );

        const unreaded = await this.chatService.getUnreadMessageCount(
          chat.id,
          user,
        );

        return {
          id: chat.id,
          title: chat.title,
          user: creatorUser,
          unreaded: unreaded,
        };
      }),
    );

    client.emit('chatsList', formattedChats);
  }
}
