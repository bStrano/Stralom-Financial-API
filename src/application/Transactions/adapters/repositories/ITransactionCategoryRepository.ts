import TransactionCategory from '../../entities/TransactionCategory/TransactionCategory';

interface ITransactionCategoryRepository {
  save(): Promise<TransactionCategory>;
  delete(id: number): Promise<void>;
  findAll() : Promise<TransactionCategory[]>;
}

export default ITransactionCategoryRepository;
