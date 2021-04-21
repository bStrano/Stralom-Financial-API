import TransactionCategory from '../entities/TransactionCategory/TransactionCategory';
import ISaveCategoryDTO from '../mappers/ISaveCategoryDTO';
import IDeleteCategoryDTO from '../mappers/IDeleteCategoryDTO';
import IUpdateCategoryDTO from '../mappers/IUpdateCategoryDTO';

interface ITransactionCategoryService{
  save(transactionCategory: ISaveCategoryDTO):Promise<TransactionCategory>,
  update(transactionCategory: IUpdateCategoryDTO):Promise<void>,
  delete(transactionCategory: IDeleteCategoryDTO):Promise<void>;
  findAll():Promise<TransactionCategory[]>;
}

export default ITransactionCategoryService;
