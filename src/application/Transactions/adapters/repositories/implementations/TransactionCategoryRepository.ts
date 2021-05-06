import TransactionCategory from '../../../entities/TransactionCategory/TransactionCategory';
import {injectable} from 'inversify';

import TransactionCategoryCollection, {ITransactionCategorySchema} from '../../../../Transactions/infra/database/mongodb/TransactionCategory'
import GenericRepository from '../../../../../shared/adapters/repositories/GenericRepository';
import * as mongoose from 'mongoose';
import ITransactionCategoryRepository from '../ITransactionCategoryRepository';
import TransactionSubcategoryCollection from '../../../infra/database/mongodb/TransactionSubcategory';
import TransactionSubcategory from '../../../entities/TransactionSubcategory/TransactionSubcategory';

@injectable()
class TransactionCategoryRepository extends GenericRepository<TransactionCategory, ITransactionCategorySchema> implements ITransactionCategoryRepository{


  constructor() {
    super();
  }

  instantiateObject(props: TransactionCategory): TransactionCategory {
    return new TransactionCategory(props);
  }

  getCollection(): mongoose.Model<ITransactionCategorySchema> {
    return TransactionCategoryCollection;
  }

  async findAllWithSubcategories(): Promise<TransactionCategory[]> {
    const categoriesDB = await TransactionCategoryCollection.find();
    const subcategoriesDB = await TransactionSubcategoryCollection.find();

    return categoriesDB.map( item => {
      const transactionCategory = new TransactionCategory(item);
      transactionCategory.subcategories = subcategoriesDB.filter(subcategory => {
        return subcategory.category.toString() === transactionCategory.id
      }).map( item => new TransactionSubcategory(item));
      return transactionCategory;
    })
  }


}

export default TransactionCategoryRepository;
