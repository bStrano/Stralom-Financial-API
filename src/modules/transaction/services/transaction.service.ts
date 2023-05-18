import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/transaction/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/transaction/update-transaction.dto';
import { TransactionRepository } from '../repositories/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}
  create(createTransactionDto: CreateTransactionDto, userId: number) {
    return this.transactionRepository.save({ ...createTransactionDto, userId });
  }

  findAll(userId: number) {
    return this.transactionRepository.findAll(userId);
  }

  findTotal(userId: number) {
    return this.transactionRepository.findTotal(userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }
  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(ids: string[]) {
    return this.transactionRepository.remove(ids);
  }
}
