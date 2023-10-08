import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { Injectable } from '@nestjs/common';
import { Tag } from '../../tags/entities/tag.entity';
import { FindTransactionOptionalParamsDto } from '../dto/transaction/find-transaction-optional-params.dto';

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

  async findAll(userId: number, optionalParams?: FindTransactionOptionalParamsDto) {
    const skip = optionalParams?.page ? (optionalParams.page - 1) * optionalParams.take : undefined;
    const whereCondition: FindOptionsWhere<Transaction> | FindOptionsWhere<Transaction>[] | undefined = {
      userId,
    };

    if (optionalParams?.ids) {
      whereCondition.id = In(optionalParams.ids);
    }

    return this.repository.findAndCount({ where: whereCondition, order: { date: 'DESC' }, take: optionalParams?.take, skip });
  }

  async findAllByIdOrReferenceTransaction(id: string, referencedTransactionId?: string) {
    const whereConditions: FindOptionsWhere<Transaction> | FindOptionsWhere<Transaction>[] | undefined = [
      {
        id,
      },
      {
        referenceTransactionId: id,
      },
    ];
    if (referencedTransactionId) {
      whereConditions.push({
        referenceTransactionId: referencedTransactionId,
      });
      whereConditions.push({
        id: referencedTransactionId,
      });
    }
    return this.repository.find({
      where: whereConditions,
      order: { date: 'DESC' },
    });
  }
  async findTotal(userId: number) {
    const data: { value: number } | undefined = await this.repository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.value)', 'value')
      .where('transaction.userId = :userId', { userId })
      .getRawOne();
    return Number(data?.value) || 0;
  }

  async remove(id: string) {
    const transaction = await this.repository.findOneOrFail({ where: { id } });
    const transactions = await this.findAllByIdOrReferenceTransaction(transaction.id, transaction.referenceTransactionId);
    const transactionWithInstalments: Transaction[] = [];
    transactions.map((item) => {
      transactionWithInstalments.push(item);
      if (item.childrenTransactions && item.childrenTransactions.length > 0) {
        transactionWithInstalments.push(...item.childrenTransactions);
      }
    });
    return this.repository.remove(transactionWithInstalments);
  }
}
