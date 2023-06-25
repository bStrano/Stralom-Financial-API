import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { Injectable } from '@nestjs/common';
import { Tag } from '../../tags/entities/tag.entity';

@Injectable()
export class TransactionRepository {
  constructor(@InjectDataSource() private dataSource: DataSource, @InjectRepository(Transaction) private repository: Repository<Transaction>) {}

  async save(transaction: Partial<Transaction>) {
    await this.repository.save(transaction);
  }

  async saveMultiple(transactions: Partial<Transaction>[]) {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      let tagsSaved: Tag[] = [];
      let index = 0;
      for (const transaction of transactions) {
        if (index > 0) {
          transaction.tags = tagsSaved;
        }
        const transactionNew = await transactionalEntityManager.save(Transaction, transaction);
        if (index === 0) {
          tagsSaved = transactionNew.tags;
        }
        index++;
      }
    });
  }
  async findById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(userId: number) {
    return this.repository.find({ where: { userId }, order: { date: 'DESC' } });
  }

  async findTotal(userId: number) {
    return (await this.repository.sum('value', { userId })) || 0;
  }

  async remove(ids: string[]) {
    return this.repository.delete({ id: In(ids) });
  }
}
