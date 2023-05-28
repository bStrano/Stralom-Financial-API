import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionRepository {
  constructor(@InjectDataSource() private dataSource: DataSource, @InjectRepository(Transaction) private repository: Repository<Transaction>) {}

  async save(transaction: Partial<Transaction>) {
    await this.repository.save(transaction);
  }

  async saveMultiple(transactions: Partial<Transaction>[]) {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      for (const transaction of transactions) {
        await transactionalEntityManager.save(Transaction, transaction);
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
