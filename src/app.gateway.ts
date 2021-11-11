import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import {
  InternalServerErrorException,
  Logger,
  UseFilters,
} from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { Task } from './entity/old/task.entity';
import { TaskStatus } from './tasks/task-status.enum';
import { Message } from './entity/message.entity';
import { getRepository } from 'typeorm';
import { Trait } from './entity/old/trait.entity';
import { AllExceptionsFilter } from './shared/AllExceptionFilter';

@WebSocketGateway({
  //path: '/socket.io',
  //serveClient: true,
  namespace: '/chat',
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger(AppGateway.name);

  afterInit() {
    this.logger.log('Initialized!');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected:    ${client.id}`);
  }

  @SubscribeMessage('server')
  @UseFilters(new AllExceptionsFilter())
  async handleMessage(
    client: Socket,
    item: { sender: string; message: string },
  ): Promise<void> {
    this.logger.debug('msgToServer');

    const { sender, message } = item;
    const _message = new Message();
    _message.sender = sender;
    _message.message = message;

    try {
      await _message.save();

      const lastRecord = await getRepository(Message).find({
        order: {
          id: 'DESC',
        },
        take: 1,
      });

      this.wss.emit('client', lastRecord);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }

    // return { event: 'msgToClient', data: text };
  }
  //text: string
}
