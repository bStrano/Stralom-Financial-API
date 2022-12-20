import { EntityRepository, Repository } from 'typeorm';
import { TransactionCategory } from '../entities/transaction-category.entity';

@EntityRepository(TransactionCategory)
export class TransactionCategoryRepository extends Repository<TransactionCategory> {}
