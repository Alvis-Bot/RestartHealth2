import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { GatewaySessionManager } from "./gateway.session";

@Injectable()
@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class GatewayService implements  OnGatewayConnection, OnGatewayDisconnect {


  @WebSocketServer()
  server: Server;
  constructor(private readonly sessions: GatewaySessionManager) {
  }
  handleConnection(client: Socket, ...args: any[]): any {
    console.log('client connected');
    console.log(client.id);
    this.sessions.setUserSocketId(1, client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string) {
    console.log('Received message from client: ' + message);
    this.server.emit('message', 'Server received your message: ' + message);
  }

  handleDisconnect(client: Socket): any {
    console.log('client disconnected');
    console.log(client.id);
    this.sessions.removeSocketId(1, client.id);
  }

}
