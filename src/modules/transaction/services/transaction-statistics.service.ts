import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import { TransactionStatisticsRepository } from '../../statistics/repositories/transaction-statistics.repository';

@Injectable()
export class TransactionStatisticsService {
  constructor(private readonly transactionRepository: TransactionRepository, private readonly transactionStatisticsRepository: TransactionStatisticsRepository) {}

  findTotal(userId: number) {
    return this.transactionRepository.findTotal(userId);
  }

  async findAccumulatedByMonth(userId: number) {
    const transactions = await this.transactionStatisticsRepository.getCashFlowGroupedByMonth(userId);
    const accumulated = 0;
    return transactions.map((item) => {
      return {
        ...item,
        accumulated: item.total + accumulated,
      };
    });
  }
}
