import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { EnHistory } from './entities/history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
  constructor(@InjectRepository(EnHistory)
  private historyRepository: Repository<EnHistory>
  ) { }

  // Create the new History

  async createHistory(createHistoryDto: CreateHistoryDto): Promise<EnHistory> {
    const newHistory = await this.historyRepository.create(createHistoryDto);
    return this.historyRepository.save(newHistory)
  }

  //   Get All the Histories

  async getAllHitories(): Promise<EnHistory[]> {
    const historyData = await this.historyRepository.find();
    return historyData;
  }

  //   Get the History against particular Id

  async getHistory(historyId: number): Promise<EnHistory> {
    const existingHistory = await this.historyRepository.findOne({
      where: { id: historyId }
    });

    return existingHistory;
  }
}
