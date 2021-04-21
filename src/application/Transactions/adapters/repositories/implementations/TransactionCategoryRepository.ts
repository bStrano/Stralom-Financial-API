import TransactionCategory from '../../../entities/TransactionCategory/TransactionCategory';
import ITransactionCategoryRepository from '../ITransactionCategoryRepository';
import {injectable} from 'inversify';
import TransactionCategoryCollection from '../../../infra/database/mongodb/TransactionCategory';
import ISaveCategoryDTO from '../../../mappers/ISaveCategoryDTO';
import IUpdateCategoryDTO from '../../../mappers/IUpdateCategoryDTO';
import RepositoryNotFound from '../../../../../shared/errors/repository/implementations/RepositoryNotFound';

@injectable()
class TransactionCategoryRepository implements ITransactionCategoryRepository{

  async delete(id: string): Promise<void> {
    await TransactionCategoryCollection.deleteOne({_id: id});
  }

  async findAll(): Promise<TransactionCategory[]> {
    let categories = await TransactionCategoryCollection.find();
    return categories.map( (category) => {
      return new TransactionCategory({...category.toObject(), id: category._id.toString()})
    })
  }

  async save(transactionCategory: ISaveCategoryDTO): Promise<TransactionCategory> {
    let category = await TransactionCategoryCollection.create(transactionCategory)
    return new TransactionCategory({...category.toObject(), id: category._id.toString()})
  }

  async update(transactionCategory: IUpdateCategoryDTO): Promise<void> {
    let category = await TransactionCategoryCollection.findOneAndUpdate({_id: transactionCategory.id},transactionCategory)
    if(!category) throw new RepositoryNotFound()
    new TransactionCategory({...category.toObject(), id: category._id.toString()})
  }

}

export default TransactionCategoryRepository;
