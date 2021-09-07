import { Injectable } from '@nestjs/common';
import { CreateTransactionCategoryDto } from '../dto/create-transaction-category.dto';
import { UpdateTransactionCategoryDto } from '../dto/update-transaction-category.dto';
import { TransactionCategory } from '../entities/transaction-category.entity';
import { plainToClass } from 'class-transformer';
import { TransactionCategoryRepository } from '../repositories/transaction-category.repository';

@Injectable()
export class TransactionCategoryService {
  constructor(private repository: TransactionCategoryRepository) {}

  async create(createTransactionCategoryDto: CreateTransactionCategoryDto) {
    const category = plainToClass(
      TransactionCategory,
      createTransactionCategoryDto,
    );
    return this.repository.save(category);
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(
    id: number,
    updateTransactionCategoryDto: UpdateTransactionCategoryDto,
  ) {
    return `This action updates a #${id} transactionCategory`;
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
