import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from "@nestjs/websockets";
import * as ws from "ws";
import { GatewaySessionManager } from "./gateway.session";
@Injectable()
@WebSocketGateway()
export class GatewayService implements  OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: ws.Server;

  constructor(private readonly sessions: GatewaySessionManager) {
  }

  private
  handleConnection(client: ws.WebSocket, ...args: any[])  {
    console.log('client connected');
    console.log(client);
    client.send('hello');
  }

  @SubscribeMessage('info')
  handleMessage(client: ws.WebSocket, payload: any){
    console.log('handleMessage', payload);
    this.server.clients.forEach((c) => {
      if (c !== client) {
        console.log('send to client');
        c.send(JSON.stringify(payload));
      }
    });
  }

  @SubscribeMessage('message')
  onEvent(client: any, data: any) {
    console.log('onEvent' ,data);
  }


  handleDisconnect(client: ws.WebSocket): any {
    console.log('client disconnected');
    console.log(client);
  }

}
