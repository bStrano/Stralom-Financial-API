import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { TransactionTypeEnum } from '@core/modules/transactions/enums/TransactionTypeEnum';
import { TransactionCategory } from '../../transaction/entities/transaction-category.entity';
import { CashFlowCompiledInterface } from '../interfaces/CashFlowCompiledInterface';

@Injectable()
export class TransactionStatisticsRepository {
  constructor(
    @InjectRepository(Transaction) private repository: Repository<Transaction>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async getCashFlowGroupedByMonth(userId: number, optionalParams?: CashFlowOptionalParams): Promise<CashFlowCompiledInterface[]> {
    const queryBuilder = this.repository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.value) as total, COUNT(1) as quantity')
      .addSelect(`date_part('year', transaction.date) AS year`)
      .addSelect(`date_part('month', transaction.date) AS month`)
      .groupBy(`date_part('year', transaction.date)`)
      .addGroupBy(`date_part('month', transaction.date)`)
      .where('transaction.userId = :userId', { userId })
      .addOrderBy(`year, month`);

    this.applyOptionalFilters(queryBuilder, optionalParams);

    const result = await queryBuilder.getRawMany();
    console.log(result);
    return result.map((item) => {
      return {
        total: Number(item.total),
        quantity: Number(item.quantity),
        year: item.year,
        month: item.month,
        day: item.day,
        type: item.type,
      };
    });
  }

  async getCashFlowGroupedByCategory(userId: number, optionalParams?: CashFlowOptionalParams) {
    const queryBuilder = this.dataSource
      .createQueryBuilder()
      .from((subQuery) => {
        const query = subQuery
          .select('SUM(transaction.value) as total, COUNT(1) as quantity, transaction.category as category')
          .from(Transaction, 'transaction')
          .groupBy(`transaction.category`)
          .where('transaction.userId = :userId', { userId });

        this.applyOptionalFilters(query, optionalParams);
        return query;
      }, 'transaction')
      .select('total, quantity, category')
      .innerJoinAndSelect(TransactionCategory, 'transactionCategory', 'category = transactionCategory.id');

    const result = await queryBuilder.getRawMany();

    return result.map((item) => {
      return {
        total: Number(item.total),
        quantity: Number(item.quantity),
        category: new TransactionCategory({
          id: item.transactionCategory_id,
          name: item.transactionCategory_name,
          icon: item.transactionCategory_icon,
          color: item.transactionCategory_color,
        }),
      };
    });
  }

  applyOptionalFilters(queryBuilder: SelectQueryBuilder<ObjectLiteral>, optionalParams?: CashFlowOptionalParams) {
    if (optionalParams?.dateFrom) {
      queryBuilder.andWhere('transaction.date >= :dateFrom', { dateFrom: optionalParams.dateFrom });
    }
    if (optionalParams?.dateTo) {
      queryBuilder.andWhere('transaction.date <= :dateTo', { dateTo: optionalParams.dateTo });
    }
    if (optionalParams?.type) {
      queryBuilder.andWhere('transaction.type = :type', { type: optionalParams.type });
    }

    if (optionalParams?.groupByType) {
      queryBuilder.addSelect(`transaction.type as type`);
      queryBuilder.addGroupBy(`transaction.type`);
    }

    if (optionalParams?.groupByDay) {
      queryBuilder.addSelect(`date_part('day', transaction.date) as day`);
      queryBuilder.addGroupBy(`date_part('day', transaction.date)`);
    }
  }
}

interface CashFlowOptionalParams {
  dateFrom?: Date;
  dateTo?: Date;
  type?: TransactionTypeEnum;
  groupByDay?: boolean;
  groupByType?: boolean;
}
