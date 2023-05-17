import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from "@nestjs/websockets";
import { GatewaySessionManager } from "./gateway.session";
import * as ws from "ws";
@Injectable()
@WebSocketGateway()
export class GatewayService implements  OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: ws.Server;

  constructor(private readonly sessions: GatewaySessionManager) {
  }
  private readonly sessionsss : Map<number , ws.Server> = new Map<number, ws.Server>();
  private
  handleConnection(client: ws.WebSocket, ...args: any[]): any {
    console.log('client connected');
    client.send('hello');
  }

  @SubscribeMessage('message')
  onEvent(client: any, data: any) {
    console.log('onEvent' ,data);
    const sockets = this.sessionsss.get(1);
    this.server.clients.forEach((client) => {
      client.send(JSON.stringify(data));
    });
  }


  handleDisconnect(client: any): any {
    console.log('client disconnected');
    console.log(client);
  }

}
