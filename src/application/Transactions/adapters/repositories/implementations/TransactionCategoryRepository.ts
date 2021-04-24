import TransactionCategory from '../../../entities/TransactionCategory/TransactionCategory';
import {injectable} from 'inversify';

import TransactionCategoryCollection, {ITransactionCategorySchema} from '../../../../Transactions/infra/database/mongodb/TransactionCategory'
import GenericRepository from '../../../../../shared/adapters/repositories/GenericRepository';
import * as mongoose from 'mongoose';

@injectable()
class TransactionCategoryRepository extends GenericRepository<TransactionCategory, ITransactionCategorySchema> {


  constructor() {
    super();
  }

  instantiateObject(props: TransactionCategory): TransactionCategory {
    return new TransactionCategory(props);
  }

  getCollection(): mongoose.Model<ITransactionCategorySchema> {
    return TransactionCategoryCollection;
  }


}

export default TransactionCategoryRepository;
