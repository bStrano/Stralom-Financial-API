import {injectable} from 'inversify';

import TransactionSubcategoryCollection, {ITransactionSubcategorySchema} from '../../../infra/database/mongodb/TransactionSubcategory';
import TransactionSubcategory from '../../../entities/TransactionSubcategory/TransactionSubcategory';

import * as mongoose from 'mongoose';
import GenericRepository from '../../../../../shared/adapters/repositories/GenericRepository';

@injectable()
class TransactionSubcategoryRepository  extends GenericRepository<TransactionSubcategory, ITransactionSubcategorySchema>{


  constructor() {
    super();
  }

  getCollection():mongoose.Model<ITransactionSubcategorySchema> {
    return TransactionSubcategoryCollection;
  }

  instantiateObject(props: TransactionSubcategory): TransactionSubcategory {
    return new TransactionSubcategory(props);
  }

}

export default TransactionSubcategoryRepository;
