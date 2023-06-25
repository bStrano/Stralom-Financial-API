import { Injectable } from '@nestjs/common';
import { TransactionStatisticsTagsRepository } from '../repositories/transaction-tag-statistics.repository';
import { GetTotalByTagDto } from '../dtos/GetTotalByTag.dto';

@Injectable()
export class TransactionTagsStatisticsService {
  constructor(private readonly transactionStatisticsRepository: TransactionStatisticsTagsRepository) {}

  getTotalGroupedByTag(userId: number, getTotalByTagDto?: GetTotalByTagDto) {
    return this.transactionStatisticsRepository.getTotalGroupedByTag(userId, getTotalByTagDto);
  }
}
