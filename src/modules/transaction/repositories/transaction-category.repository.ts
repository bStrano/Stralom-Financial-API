import { Repository } from 'typeorm';
import { TransactionCategory } from '../entities/transaction-category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTransactionCategoryDto } from '../dto/category/update-transaction-category.dto';

@Injectable()
export class TransactionCategoryRepository {
  constructor(@InjectRepository(TransactionCategory) private transactionCategory: Repository<TransactionCategory>) {}

  findAll(): Promise<TransactionCategory[]> {
    return this.transactionCategory.find();
  }

  save(transactionCategory: TransactionCategory): Promise<TransactionCategory | null> {
    return this.transactionCategory.save(transactionCategory);
  }

  update(id: string, transactionCategory: UpdateTransactionCategoryDto): Promise<TransactionCategory | null> {
    console.log(transactionCategory);
    return this.transactionCategory.findOneBy({ id });
  }

  findOne(id: string): Promise<TransactionCategory | null> {
    return this.transactionCategory.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.transactionCategory.delete({ id });
  }
}
