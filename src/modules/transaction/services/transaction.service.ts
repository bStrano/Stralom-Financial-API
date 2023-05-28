import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/transaction/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/transaction/update-transaction.dto';
import { TransactionRepository } from '../repositories/transaction.repository';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from '../entities/transaction.entity';
import { cloneDeep, omit } from 'lodash';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}
  create(createTransactionDto: CreateTransactionDto, userId: number) {
    const transaction: Partial<Transaction> = { ...createTransactionDto, id: uuidv4(), instalmentCurrent: 1, userId };
    const transactions = [transaction];
    if (transaction.instalments && transaction.instalments >= 1) {
      for (let instalment = 2; instalment <= transaction.instalments; instalment++) {
        const childrenTransaction = cloneDeep(omit(transaction, ['id']));
        childrenTransaction.instalmentCurrent = instalment;
        childrenTransaction.referenceTransactionId = transaction.id;
        transactions.push(childrenTransaction);
      }
    }
    return this.transactionRepository.saveMultiple(transactions);
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
    console.log(updateTransactionDto);
    return `This action updates a #${id} transaction`;
  }

  remove(ids: string[]) {
    return this.transactionRepository.remove(ids);
  }
}
