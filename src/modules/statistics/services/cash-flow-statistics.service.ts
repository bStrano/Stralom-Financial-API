import { Injectable } from '@nestjs/common';
import { TransactionStatisticsRepository } from '../repositories/transaction-statistics.repository';
import { CashFlowStatistics } from '../entities/CashFlowStatistics';
import { add, lastDayOfMonth, sub } from 'date-fns';
import { TransactionTypeEnum } from '@core/modules/transactions/enums/TransactionTypeEnum';
import { CashFlowByDayCompiled } from '../entities/CashFlowByDayCompiled';
import { CashFlowSummaryInterface } from '@core/modules/statistics/CashFlowSummaryInterface';

@Injectable()
export class CashFlowStatisticsService {
  constructor(private readonly statisticsRepository: TransactionStatisticsRepository) {}

  async getCashFlowStatistics(userId: number): Promise<CashFlowSummaryInterface> {
    const today = new Date();
    const endCurrentMonth = lastDayOfMonth(today);
    const previous12Months = sub(today, { months: 12, days: today.getDay() + 1 });
    const balanceCashFlow = await this.statisticsRepository.getCashFlowGroupedByMonth(userId, { dateFrom: previous12Months, dateTo: endCurrentMonth, ignoreInvestment: true });
    const outComingCashFlow = await this.statisticsRepository.getCashFlowGroupedByMonth(userId, {
      dateFrom: previous12Months,
      dateTo: endCurrentMonth,
      type: TransactionTypeEnum.outComing,
      ignoreInvestment: true,
    });
    const incomingFlow = await this.statisticsRepository.getCashFlowGroupedByMonth(userId, {
      dateFrom: previous12Months,
      dateTo: endCurrentMonth,
      type: TransactionTypeEnum.incoming,
      ignoreInvestment: true,
    });
    return {
      balance: new CashFlowStatistics(balanceCashFlow),
      incoming: new CashFlowStatistics(incomingFlow),
      outComing: new CashFlowStatistics(outComingCashFlow),
    };
  }

  async getTransactionsTotalCompiledByDay(userId: number) {
    const today = new Date();
    const tomorrow = add(today, { days: 1 });
    const dateFrom = sub(today, { days: 31 });
    const result = await this.statisticsRepository.getCashFlowGroupedByMonth(userId, {
      dateFrom: dateFrom,
      dateTo: today,
      groupByDay: true,
      groupByType: true,
      ignoreInvestment: true,
    });

    return new CashFlowByDayCompiled(dateFrom, tomorrow, result);
  }

  async getExpensesTotalCompiledByCategory(userId: number) {
    const today = new Date();
    const endCurrentMonth = lastDayOfMonth(today);
    const startCurrentMonth = new Date();
    startCurrentMonth.setDate(1);
    return await this.statisticsRepository.getCashFlowGroupedByCategory(userId, {
      dateFrom: startCurrentMonth,
      dateTo: endCurrentMonth,
      type: TransactionTypeEnum.outComing,
    });
  }
}
