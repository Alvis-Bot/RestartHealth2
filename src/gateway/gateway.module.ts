import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewaySessionManager } from './gateway.session';

@Module({
  providers: [GatewayService, GatewaySessionManager],
})
export class GatewayModule {}
