import TransactionCategory from '../entities/TransactionCategory/TransactionCategory';
import ISaveCategoryDTO from '../mappers/TransactionCategory/ISaveCategoryDTO';
import IDeleteCategoryDTO from '../mappers/TransactionCategory/IDeleteCategoryDTO';
import IUpdateCategoryDTO from '../mappers/TransactionCategory/IUpdateCategoryDTO';

interface ITransactionCategoryService{
  save(transactionCategory: ISaveCategoryDTO):Promise<TransactionCategory>,
  update(transactionCategory: IUpdateCategoryDTO):Promise<TransactionCategory>,
  delete(transactionCategory: IDeleteCategoryDTO):Promise<void>;
  findAll():Promise<TransactionCategory[]>;
}

export default ITransactionCategoryService;
