import TransactionCategory from '../entities/TransactionCategory/TransactionCategory';

interface ITransactionCategoryService{
  save():Promise<TransactionCategory>,
  delete(id: number):Promise<void>;
  findAll():Promise<TransactionCategory[]>;
}

export default ITransactionCategoryService;
