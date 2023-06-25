import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/transaction/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/transaction/update-transaction.dto';
import { TransactionRepository } from '../repositories/transaction.repository';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from '../entities/transaction.entity';
import { cloneDeep, omit } from 'lodash';
import DateProviderInterface, { DATE_PROVIDER_TOKEN } from '../../../shared/providers/date/DateProviderInterface';
import { DateUnitEnum } from '../../../shared/providers/date/constants/DateUnitEnum';
import { Tag } from '../../tags/entities/tag.entity';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository, @Inject(DATE_PROVIDER_TOKEN) private readonly dateProvider: DateProviderInterface) {}
  create(createTransactionDto: CreateTransactionDto, userId: number) {
    const tags = createTransactionDto.tags.map((item) => {
      if (typeof item === 'string' || !item.hasOwnProperty('id')) {
        const newTag = new Tag();
        newTag.userId = userId;
        newTag.color = typeof item !== 'string' && item.color ? item.color : '000000';
        newTag.name = typeof item !== 'string' ? item.name : item;
        return newTag;
      }
      return item as Tag;
    });
    const transaction: Partial<Transaction> = { ...createTransactionDto, tags, id: uuidv4(), instalmentCurrent: 1, userId };
    const transactions = [transaction];
    if (transaction.instalments && transaction.instalments >= 1) {
      for (let instalment = 2; instalment <= transaction.instalments; instalment++) {
        const childrenTransaction = cloneDeep(omit(transaction, ['id']));
        childrenTransaction.instalmentCurrent = instalment;
        childrenTransaction.referenceTransactionId = transaction.id;
        childrenTransaction.date = this.dateProvider.add(transaction.date!, instalment - 1, DateUnitEnum.MONTH);
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
  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionRepository.save({ ...updateTransactionDto, id });
  }

  remove(ids: string[]) {
    return this.transactionRepository.remove(ids);
  }
}
