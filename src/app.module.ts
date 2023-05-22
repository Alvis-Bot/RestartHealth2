import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'health',
      username: 'health',
      password: '123456',
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
    })
    ,GatewayModule, HistoryModule],
})
export class AppModule {}
