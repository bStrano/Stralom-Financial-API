import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';

@Injectable()
export class TransactionStatisticsService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  findTotal(userId: number) {
    return this.transactionRepository.findTotal(userId);
  }
}
