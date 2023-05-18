import { Injectable } from '@nestjs/common';
import * as ws from "ws";

@Injectable()
export class GatewaySessionManager {
  private readonly sessions : Map<string , ws.Server> = new Map<string, ws.Server>();
  getUserSocket(value: string) {
    return this.sessions.get(value);
  }

  setUserSocketId(value: string, socket: ws.Server) {
    this.sessions.set(value, socket);
  }

  removeUserSocketId(value: string) {
    this.sessions.delete(value);
  }

  removeSocketId(value: string, socket: ws.Server) {
    this.sessions.delete(value);
  }

  getSockets() {
    return this.sessions;
  }
}
