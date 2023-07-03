import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { TotalTagInterface } from '@core/modules/statistics/tags/TotalTagInterface';
import { GetTotalByTagDto } from '../dtos/GetTotalByTag.dto';
import { TransactionCategoryEnum } from '@core/modules/transactions/enums/TransactionCategoryEnum';

@Injectable()
export class TransactionStatisticsTagsRepository {
  constructor(@InjectRepository(Transaction) private repository: Repository<Transaction>) {}

  async getTotalGroupedByTag(userId: number, getTotalByTagDto?: GetTotalByTagDto): Promise<TotalTagInterface[]> {
    const queryBuilder = this.repository
      .createQueryBuilder('transaction')
      .innerJoinAndSelect('transaction.tags', 'tags')
      .select('SUM(transaction.value) as total, COUNT(1) as quantity, tags.name as name, tags.color as color')
      .groupBy(`tags.id`)
      .where('transaction.userId = :userId', { userId })
      .andWhere('transaction.categoryId != :categoryIgnored', { categoryIgnored: TransactionCategoryEnum.INVESTMENTS });
    if (getTotalByTagDto) {
      if (getTotalByTagDto.start && getTotalByTagDto.end) {
        queryBuilder.andWhere('transaction.date BETWEEN :start AND :end', { start: getTotalByTagDto.start, end: getTotalByTagDto.end });
      }

      if (getTotalByTagDto.type) {
        queryBuilder.andWhere('transaction.type = :type', { type: getTotalByTagDto.type });
      }
    }

    const result = await queryBuilder.getRawMany();
    return result.map((item) => {
      return {
        total: Number(item.total),
        quantity: Number(item.quantity),
        color: item.color,
        name: item.name,
      };
    });
  }
}
