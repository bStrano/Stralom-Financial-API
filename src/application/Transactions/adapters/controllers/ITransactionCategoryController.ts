import TransactionCategory from '../../entities/TransactionCategory/TransactionCategory';

interface ITransactionCategoryController {
  save():Promise<TransactionCategory>,
  delete(id: number):Promise<void>;
  findAll():Promise<TransactionCategory[]>;
}

export default ITransactionCategoryController;
