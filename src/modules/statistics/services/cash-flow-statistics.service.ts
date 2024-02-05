import { Injectable } from '@nestjs/common';
import { TransactionStatisticsRepository } from '../repositories/transaction-statistics.repository';
import { CashFlowStatistics } from '../entities/CashFlowStatistics';
import { add, lastDayOfMonth, sub } from 'date-fns';
import { TransactionTypeEnum } from '@core/modules/transactions/enums/TransactionTypeEnum';
import { CashFlowByDayCompiled } from '../entities/CashFlowByDayCompiled';
import { CashFlowSummaryInterface } from '@core/modules/statistics/CashFlowSummaryInterface';
import { FilterOptionsDto } from '../dtos/FilterOptions.dto';
import { TransactionCategoryEnum } from '@core/modules/transactions/enums/TransactionCategoryEnum';

@Injectable()
export class CashFlowStatisticsService {
  constructor(private readonly statisticsRepository: TransactionStatisticsRepository) {}

  async getCashFlowStatistics(userId: number, optionalParams?: FilterOptionsDto): Promise<CashFlowSummaryInterface> {
    const today = optionalParams?.startDate ? optionalParams.startDate : new Date();
    const endCurrentMonth = optionalParams?.endDate ? optionalParams.endDate : lastDayOfMonth(today);
    const previous12Months = sub(today, { months: 12, days: today.getDay() + 1 });
    const balanceCashFlow = await this.statisticsRepository.getCashFlowGroupedByMonth(userId, {
      dateFrom: previous12Months,
      dateTo: endCurrentMonth,
      ignoreInvestment: !optionalParams?.withInstalments,
    });
    const outComingCashFlow = await this.statisticsRepository.getCashFlowGroupedByMonth(userId, {
      dateFrom: previous12Months,
      dateTo: endCurrentMonth,
      type: TransactionTypeEnum.outComing,
      ignoreInvestment: !optionalParams?.withInstalments,
    });
    const incomingFlow = await this.statisticsRepository.getCashFlowGroupedByMonth(userId, {
      dateFrom: previous12Months,
      dateTo: endCurrentMonth,
      type: TransactionTypeEnum.incoming,
      ignoreInvestment: !optionalParams?.withInstalments,
    });
    return {
      balance: new CashFlowStatistics(balanceCashFlow),
      incoming: new CashFlowStatistics(incomingFlow),
      outComing: new CashFlowStatistics(outComingCashFlow),
    };
  }

  async getTransactionsTotalCompiledByDay(userId: number, optionalParams?: FilterOptionsDto) {
    const today = new Date();
    const tomorrow = add(today, { days: 1 });
    const dateFrom = optionalParams?.startDate ? optionalParams.startDate : sub(today, { days: 31 });
    const dateTo = optionalParams?.endDate ? optionalParams.endDate : tomorrow;
    const result = await this.statisticsRepository.getCashFlowGroupedByMonth(userId, {
      dateFrom,
      dateTo,
      groupByDay: true,
      groupByType: true,
      ignoreInvestment: !optionalParams?.withInstalments,
    });
    return new CashFlowByDayCompiled(dateFrom, dateTo, result);
  }

  async getExpensesTotalCompiledByCategory(userId: number, optionalParams?: FilterOptionsDto) {
    const today = new Date();
    const endCurrentMonth = lastDayOfMonth(today);
    const startCurrentMonth = new Date();
    startCurrentMonth.setDate(1);
    return await this.statisticsRepository.getCashFlowGroupedByCategory(userId, {
      dateFrom: optionalParams?.startDate ? optionalParams.startDate : startCurrentMonth,
      dateTo: optionalParams?.endDate ? optionalParams?.endDate : endCurrentMonth,
      type: TransactionTypeEnum.outComing,
      ignoredCategories: [TransactionCategoryEnum.INVESTMENTS],
    });
  }
}
