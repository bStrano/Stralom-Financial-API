import { Injectable } from '@nestjs/common';
import { InvestmentRepository } from '../repositories/Investment.repository';
import { InvestmentStatisticsRepository } from '../repositories/investment-statistics.repository';

@Injectable()
export class InvestmentStatisticsService {
  constructor(private repository: InvestmentRepository, private investmentStatisticsRepository: InvestmentStatisticsRepository) {}

  findTotal(userId: number) {
    return this.repository.findTotal(userId);
  }

  async findAccumulatedByMonth(userId: number) {
    const investments = await this.investmentStatisticsRepository.getInvestmentsGroupedByMonth(userId);

    const accumulated = 0;
    return investments.map((item) => {
      return {
        ...item,
        accumulated: item.total + accumulated,
      };
    });
  }
}
