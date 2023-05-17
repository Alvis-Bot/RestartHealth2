import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer, WsResponse
} from "@nestjs/websockets";
import { Server  } from 'ws';
import { GatewaySessionManager } from "./gateway.session";
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GatewayService implements  OnGatewayConnection, OnGatewayDisconnect {


  @WebSocketServer()
  server: Server;
  constructor(private readonly sessions: GatewaySessionManager) {
  }
  handleConnection(client: any, ...args: any[]): any {
    console.log('client connected');
    console.log(client);
  }

  @SubscribeMessage('events')
  onEvent(client: any, data: any) {
    console.log('onEvent' ,data);
  }

  handleDisconnect(client: any): any {
    console.log('client disconnected');
    console.log(client);
  }

}
