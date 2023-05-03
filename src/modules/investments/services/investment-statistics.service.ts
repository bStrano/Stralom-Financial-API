import { Injectable } from '@nestjs/common';
import { InvestmentRepository } from '../repositories/Investment.repository';

@Injectable()
export class InvestmentStatisticsService {
  constructor(private repository: InvestmentRepository) {}

  findTotal(userId: number) {
    return this.repository.findTotal(userId);
  }
}
