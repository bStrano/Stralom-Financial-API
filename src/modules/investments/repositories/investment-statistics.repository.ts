import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from '../entities/investment.entity';
import { ValueByMonthInterface } from '@core/modules/statistics/ValueByMonthInterface';

export class InvestmentStatisticsRepository {
  constructor(@InjectRepository(Investment) private repository: Repository<Investment>) {}

  async getInvestmentsGroupedByMonth(userId: number): Promise<ValueByMonthInterface[]> {
    const queryBuilder = this.repository
      .createQueryBuilder('investment')
      .select('SUM(investment.currentAmount) as total, COUNT(1) as quantity')
      .addSelect(`date_part('year', investment.startDate) AS year`)
      .addSelect(`date_part('month', investment.startDate) AS month`)
      .groupBy(`date_part('year', investment.startDate)`)
      .addGroupBy(`date_part('month', investment.startDate)`)
      .where('investment.userId = :userId', { userId })
      // .andWhere('investment.redemptionDate is null')
      .addOrderBy(`year, month`);

    const result = await queryBuilder.getRawMany();
    return result.map((item) => {
      return {
        accumulated: 0,
        total: Number(item.total),
        quantity: Number(item.quantity),
        year: Number(item.year),
        month: Number(item.month),
      };
    });
  }
}
