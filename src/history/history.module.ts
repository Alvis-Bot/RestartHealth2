import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { History } from "./history.entity";
import { HistoryController } from './history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  providers: [HistoryService],
  exports: [HistoryService],
  controllers: [HistoryController]
})
export class HistoryModule {}
