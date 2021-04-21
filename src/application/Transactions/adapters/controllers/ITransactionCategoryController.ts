import TransactionCategory from '../../entities/TransactionCategory/TransactionCategory';
import ISaveCategoryDTO from '../../mappers/ISaveCategoryDTO';
import IDeleteCategoryDTO from '../../mappers/IDeleteCategoryDTO';
import IUpdateCategoryDTO from '../../mappers/IUpdateCategoryDTO';

interface ITransactionCategoryController {
  save(transactionCategory: ISaveCategoryDTO):Promise<TransactionCategory>,
  update(transactionCategory: IUpdateCategoryDTO):Promise<void>,
  delete(id: IDeleteCategoryDTO):Promise<void>;
  findAll():Promise<TransactionCategory[]>;
}

export default ITransactionCategoryController;
