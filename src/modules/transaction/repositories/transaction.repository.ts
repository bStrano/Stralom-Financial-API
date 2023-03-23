import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionRepository {
  constructor(@InjectRepository(Transaction) private repository: Repository<Transaction>) {}

  async save(transaction: Partial<Transaction>) {
    return this.repository.save(transaction);
  }

  async findById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(userId: number) {
    return this.repository.find({ where: { userId } });
  }
}
