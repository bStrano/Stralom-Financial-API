import TransactionCategory from '../../../entities/TransactionCategory/TransactionCategory';
import {injectable} from 'inversify';

import TransactionCategoryCollection, {ITransactionCategorySchema} from '../../../../Transactions/infra/database/mongodb/TransactionCategory'
import GenericRepository from '../../../../../shared/adapters/repositories/GenericRepository';
import mongoose from 'mongoose';
import ITransactionCategoryRepository from '../ITransactionCategoryRepository';
import TransactionSubcategoryCollection from '../../../infra/database/mongodb/TransactionSubcategory';
import TransactionSubcategory from '../../../entities/TransactionSubcategory/TransactionSubcategory';
import ISaveCategoryDTO from '../../../mappers/TransactionCategory/ISaveCategoryDTO';


@injectable()
class TransactionCategoryRepository extends GenericRepository<TransactionCategory, ITransactionCategorySchema> implements ITransactionCategoryRepository {


  constructor() {
    super();
  }

  instantiateObject(props: TransactionCategory): TransactionCategory {
    const transactionCategory = new TransactionCategory(props);
    transactionCategory.subcategories = props.subcategories?.map(item => {
      return new TransactionSubcategory(item);
    })
    return transactionCategory;
  }

  getCollection(): mongoose.Model<ITransactionCategorySchema> {
    return TransactionCategoryCollection;
  }


  async save(category: ISaveCategoryDTO): Promise<TransactionCategory>  {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const categoryNew = await TransactionCategoryCollection.insertMany([category], {session});
      await TransactionSubcategoryCollection.insertMany(category.subcategories.map( item => {
        return {...item, category: category._id, user: category.user};
      }), {session});
      await  session.commitTransaction();
      return categoryNew;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    }finally {
      session.endSession();
    }
  }

  async findAllWithSubcategories(): Promise<TransactionCategory[]> {
    const categoriesDB = await TransactionCategoryCollection.find();
    const subcategoriesDB = await TransactionSubcategoryCollection.find();

    return categoriesDB.map(item => {
      const transactionCategory = new TransactionCategory(item);
      transactionCategory.subcategories = subcategoriesDB.filter(subcategory => {
        return subcategory.category === transactionCategory._id
      }).map(item => new TransactionSubcategory(item));
      return transactionCategory;
    })
  }


}

export default TransactionCategoryRepository;
