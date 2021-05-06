import GenericRepository from '../../../../shared/adapters/repositories/GenericRepository';
import TransactionCategory from '../../entities/TransactionCategory/TransactionCategory';
import {ITransactionCategorySchema} from '../../infra/database/mongodb/TransactionCategory';


interface ITransactionCategoryRepository extends GenericRepository<TransactionCategory,ITransactionCategorySchema>{
  findAllWithSubcategories: () => Promise<TransactionCategory[]>;
}
export default ITransactionCategoryRepository;
