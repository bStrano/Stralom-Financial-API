import ISaveSubcategoryDTO from '../mappers/TransactionSubcategory/ISaveSubcategoryDTO';
import IUpdateSubcategoryDTO from '../mappers/TransactionSubcategory/IUpdateSubcategoryDTO';
import IDeleteSubcategoryDTO from '../mappers/TransactionSubcategory/IDeleteSubcategoryDTO';
import TransactionSubcategory from '../entities/TransactionSubcategory/TransactionSubcategory';

interface ITransactionSubcategoryService{
  save(transactionCategory: ISaveSubcategoryDTO):Promise<TransactionSubcategory>,
  update(transactionCategory: IUpdateSubcategoryDTO):Promise<void>,
  delete(transactionCategory: IDeleteSubcategoryDTO):Promise<void>;
  findAll():Promise<TransactionSubcategory[]>;
}

export default ITransactionSubcategoryService;
