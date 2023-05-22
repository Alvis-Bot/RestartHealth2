import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewaySessionManager } from './gateway.session';
import { HistoryModule } from "../history/history.module";

@Module({
  imports: [HistoryModule],
  providers: [GatewayService, GatewaySessionManager],
})
export class GatewayModule {}
