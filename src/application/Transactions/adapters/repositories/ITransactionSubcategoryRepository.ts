import ISaveSubcategoryDTO from '../../mappers/TransactionSubcategory/ISaveSubcategoryDTO';
import IUpdateSubcategoryDTO from '../../mappers/TransactionSubcategory/IUpdateSubcategoryDTO';
import TransactionSubcategory from '../../entities/TransactionSubcategory/TransactionSubcategory';

interface ITransactionCategoryRepository {
  save(transactionCategory: ISaveSubcategoryDTO): Promise<TransactionSubcategory>;
  update(transactionCategory: IUpdateSubcategoryDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findAll() : Promise<TransactionSubcategory[]>;
}

export default ITransactionCategoryRepository;
