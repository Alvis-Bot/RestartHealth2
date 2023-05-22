import { Controller, Get, Query } from "@nestjs/common";
import { HistoryService } from "./history.service";

@Controller('history')
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
  ) {}


  @Get()
  getAll(@Query('mssv') mssv: string){
    return this.historyService.getHistory(mssv);
  }
}
