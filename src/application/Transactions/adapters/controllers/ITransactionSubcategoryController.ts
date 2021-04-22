import TransactionSubcategory from "../../entities/TransactionSubcategory/TransactionSubcategory";
import ISaveSubcategoryDTO from '../../mappers/TransactionSubcategory/ISaveSubcategoryDTO';
import IUpdateSubcategoryDTO from '../../mappers/TransactionSubcategory/IUpdateSubcategoryDTO';
import IDeleteSubcategoryDTO from '../../mappers/TransactionSubcategory/IDeleteSubcategoryDTO';

interface ITransactionSubcategoryController {
  save(transactionCategory: ISaveSubcategoryDTO):Promise<TransactionSubcategory>,
  update(transactionCategory: IUpdateSubcategoryDTO):Promise<void>,
  delete(id: IDeleteSubcategoryDTO):Promise<void>;
  findAll():Promise<TransactionSubcategory[]>;
}

export default ITransactionSubcategoryController;
