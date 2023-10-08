import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/transaction/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/transaction/update-transaction.dto';
import { TransactionRepository } from '../repositories/transaction.repository';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from '../entities/transaction.entity';
import { cloneDeep, omit } from 'lodash';
import DateProviderInterface, { DATE_PROVIDER_TOKEN } from '../../../shared/providers/date/DateProviderInterface';
import { DateUnitEnum } from '../../../shared/providers/date/constants/DateUnitEnum';
import { Tag } from '../../tags/entities/tag.entity';
import { CreateTagDto } from '../../tags/dtos/create-tag.dto';
import { FindTransactionOptionalParamsDto } from '../dto/transaction/find-transaction-optional-params.dto';
import { PageMetaDto } from '../../../shared/dtos/pagination/paginated-response.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository, @Inject(DATE_PROVIDER_TOKEN) private readonly dateProvider: DateProviderInterface) {}
  create(createTransactionDto: CreateTransactionDto, userId: number) {
    const tags = this.setupTagsForSave(userId, createTransactionDto.tags);
    const transaction: Partial<Transaction> = { ...createTransactionDto, tags, id: uuidv4(), instalmentCurrent: 1, userId };
    const transactions = [transaction];
    if (transaction.instalments && transaction.instalments >= 1) {
      for (let instalment = 2; instalment <= transaction.instalments; instalment++) {
        const childrenTransaction = cloneDeep(omit(transaction, ['id']));
        childrenTransaction.instalmentCurrent = instalment;
        childrenTransaction.referenceTransactionId = transaction.id;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        childrenTransaction.date = this.dateProvider.add(transaction.date!, instalment - 1, DateUnitEnum.MONTH);
        transactions.push(childrenTransaction);
      }
    }
    return this.transactionRepository.saveMultiple(transactions);
  }

  private setupTagsForSave(userId: number, tags: (Tag | string | CreateTagDto)[]) {
    return tags.map((item) => {
      if (typeof item === 'string' || !item.hasOwnProperty('id')) {
        const newTag = new Tag();
        newTag.userId = userId;
        newTag.color = typeof item !== 'string' && item.color ? item.color : '000000';
        newTag.name = typeof item !== 'string' ? item.name : item;
        return newTag;
      }
      return item as Tag;
    });
  }

  findAll(userId: number) {
    return this.transactionRepository.findAll(userId);
  }

  async findAllPaginated(userId: number, optionalParams: FindTransactionOptionalParamsDto) {
    const [data, count] = await this.transactionRepository.findAll(userId, optionalParams);
    return {
      data,
      meta: new PageMetaDto({
        itemCount: count,
        take: optionalParams?.take,
        page: optionalParams?.page,
      }),
    };
  }

  findTotal(userId: number) {
    return this.transactionRepository.findTotal(userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }
  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) throw new NotFoundException('Transação não encontrada.');
    let transactions: Transaction[] = [transaction];
    if (transaction.instalments > 1) {
      transactions = await this.transactionRepository.findAllByIdOrReferenceTransaction(transaction.id, transaction.referenceTransactionId);
    }
    transactions.map((item) => {
      if (updateTransactionDto.type) {
        item.type = updateTransactionDto.type;
      }
      if (updateTransactionDto.description) {
        item.description = updateTransactionDto.description;
      }
      if (updateTransactionDto.date && transaction.instalments === 1) {
        item.date = updateTransactionDto.date;
      }
      if (updateTransactionDto.value) {
        item.value = updateTransactionDto.value;
      }
      if (updateTransactionDto.categoryId) {
        item.category.id = updateTransactionDto.categoryId;
      }
      if (updateTransactionDto.tags) {
        item.tags = this.setupTagsForSave(transaction.userId, updateTransactionDto.tags);
      }
    });

    return this.transactionRepository.saveMultiple(transactions);
  }

  remove(id: string) {
    return this.transactionRepository.remove(id);
  }
}
