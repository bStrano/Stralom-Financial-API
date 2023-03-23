import { Injectable } from '@nestjs/common';
import { CreateTransactionCategoryDto } from '../dto/category/create-transaction-category.dto';
import { UpdateTransactionCategoryDto } from '../dto/category/update-transaction-category.dto';
import { TransactionCategory } from '../entities/transaction-category.entity';
import { plainToInstance } from 'class-transformer';
import { TransactionCategoryRepository } from '../repositories/transaction-category.repository';

@Injectable()
export class TransactionCategoryService {
  constructor(private repository: TransactionCategoryRepository) {}

  async create(createTransactionCategoryDto: CreateTransactionCategoryDto) {
    const category = plainToInstance(TransactionCategory, createTransactionCategoryDto);
    return this.repository.save(category);
  }

  async findAll() {
    console.log("Find All", this.repository)
    return this.repository.findAll();
  }

  async findAllWithSubcategories() {
    // return this.repository.findAll({ relations: ['subcategories'] });
    return this.repository.findAll();
  }

  async findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, updateTransactionCategoryDto: UpdateTransactionCategoryDto) {
    return this.repository.update(id, updateTransactionCategoryDto);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}
