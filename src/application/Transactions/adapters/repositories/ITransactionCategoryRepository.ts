import TransactionCategory from '../../entities/TransactionCategory/TransactionCategory';
import ISaveCategoryDTO from '../../mappers/TransactionCategory/ISaveCategoryDTO';
import IUpdateCategoryDTO from '../../mappers/TransactionCategory/IUpdateCategoryDTO';

interface ITransactionCategoryRepository {
  save(transactionCategory: ISaveCategoryDTO): Promise<TransactionCategory>;
  update(transactionCategory: IUpdateCategoryDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findAll() : Promise<TransactionCategory[]>;
}

export default ITransactionCategoryRepository;
