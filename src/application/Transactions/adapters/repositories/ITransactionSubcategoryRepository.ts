import TransactionSubcategory from '../../entities/TransactionSubcategory/TransactionSubcategory';
import GenericRepository from '../../../../shared/adapters/repositories/GenericRepository';
import {ITransactionSubcategorySchema} from '../../infra/database/mongodb/TransactionSubcategory';


type ITransactionCategoryRepository = GenericRepository<TransactionSubcategory,ITransactionSubcategorySchema>

export default ITransactionCategoryRepository;
