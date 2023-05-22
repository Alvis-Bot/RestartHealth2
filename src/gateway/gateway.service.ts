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
import { HistoryService } from "../history/history.service";
import { CreateHistoryDto } from "../history/dto/create-history.dto";
@Injectable()
@WebSocketGateway()
export class GatewayService implements  OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: ws.Server;

  constructor(private readonly sessions: GatewaySessionManager ,
              private readonly historyService: HistoryService) {
  }

  handleConnection(client: ws.WebSocket, ...args: any[])  {
    console.log('client connected');
    console.log(client);
    client.send('hello');
  }

  @SubscribeMessage('info')
  handleMessage(client: ws.WebSocket, payload: any){
    console.log('handleMessage', payload);
    this.server.clients.forEach((c) => {
        console.log('send to client');
        c.send(JSON.stringify(payload));
    });
  }

  @SubscribeMessage('message')
   onEvent(client: any, payload: CreateHistoryDto) {
    console.log('onEvent' ,payload);
    this.server.clients.forEach(async (c) => {
        console.log('send to client');
        if (c !== client) {
          await this.historyService.saveHistory(payload);
            console.log('send to client');
          c.send(JSON.stringify(payload));
        }

    });
  }


  handleDisconnect(client: ws.WebSocket): any {
    console.log('client disconnected');
    console.log(client);
  }

}
