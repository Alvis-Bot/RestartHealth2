import { Inject, Injectable } from "@nestjs/common";
import { CreateHistoryDto } from "./dto/create-history.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { History } from "./history.entity";

@Injectable()
export class HistoryService {

  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  async saveHistory(dto: CreateHistoryDto) {
    const entity = this.historyRepository.create(dto);
    return await this.historyRepository.save(entity);
  }

  getHistory(mssv: string) {
    return this.historyRepository.find({
      where: {
        mssv: mssv,
      }
    });

  }
}
