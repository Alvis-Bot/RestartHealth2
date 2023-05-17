import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from "@nestjs/websockets";
import {Socket} from "socket.io";
import { GatewaySessionManager } from "./gateway.session";

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GatewayService implements  OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly sessions: GatewaySessionManager) {
  }
  handleConnection(client: Socket, ...args: any[]): any {
    console.log('client connected');
    console.log(client.id);
    this.sessions.setUserSocketId(1, client.id);
  }

  handleDisconnect(client: Socket): any {
    console.log('client disconnected');
    console.log(client.id);
    this.sessions.removeSocketId(1, client.id);
  }

}
