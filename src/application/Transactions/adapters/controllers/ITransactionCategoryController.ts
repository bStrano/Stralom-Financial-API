import TransactionCategory from '../../entities/TransactionCategory/TransactionCategory';
import ISaveCategoryDTO from '../../mappers/TransactionCategory/ISaveCategoryDTO';
import IDeleteCategoryDTO from '../../mappers/TransactionCategory/IDeleteCategoryDTO';
import IUpdateCategoryDTO from '../../mappers/TransactionCategory/IUpdateCategoryDTO';

interface ITransactionCategoryController {
  save(transactionCategory: ISaveCategoryDTO):Promise<TransactionCategory>,
  update(transactionCategory: IUpdateCategoryDTO):Promise<TransactionCategory>,
  delete(id: IDeleteCategoryDTO):Promise<void>;
  findAll(subcategories: boolean):Promise<TransactionCategory[]>;
}

export default ITransactionCategoryController;
