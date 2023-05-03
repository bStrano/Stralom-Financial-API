import { Injectable } from '@nestjs/common';
import { TransactionStatisticsService } from '../../transaction/services/transaction-statistics.service';
import { InvestmentStatisticsService } from '../../investments/services/investment-statistics.service';
import { EquityDistribution } from '../entities/EquityDistribution';

@Injectable()
export class EquityStatisticsService {
  constructor(private readonly transactionStatisticsService: TransactionStatisticsService, private readonly investmentStatisticsService: InvestmentStatisticsService) {}

  async getEquityDistribution(userId: number) {
    const totalInvested = await this.investmentStatisticsService.findTotal(userId);
    const totalBalance = await this.transactionStatisticsService.findTotal(userId);

    return new EquityDistribution({ totalInvested, totalBalance });
  }
}
