import GenericRepository from '../../../../shared/adapters/repositories/GenericRepository';
import TransactionCategory from '../../entities/TransactionCategory/TransactionCategory';
import {ITransactionCategorySchema} from '../../infra/database/mongodb/TransactionCategory';


type ITransactionCategoryRepository = GenericRepository<TransactionCategory, ITransactionCategorySchema>

export default ITransactionCategoryRepository;
