import {injectable} from 'inversify';
import RepositoryNotFound from '../../../../../shared/errors/repository/implementations/RepositoryNotFound';
import ITransactionSubcategoryRepository from '../ITransactionSubcategoryRepository';
import TransactionSubcategoryCollection from '../../../infra/database/mongodb/TransactionSubcategory';
import TransactionSubcategory from '../../../entities/TransactionSubcategory/TransactionSubcategory';
import ISaveSubcategoryDTO from '../../../mappers/TransactionSubcategory/ISaveSubcategoryDTO';
import IUpdateSubcategoryDTO from '../../../mappers/TransactionSubcategory/IUpdateSubcategoryDTO';

@injectable()
class TransactionSubcategoryRepository implements ITransactionSubcategoryRepository{

  async delete(id: string): Promise<void> {
    await TransactionSubcategoryCollection.deleteOne({_id: id});
  }

  async findAll(): Promise<TransactionSubcategory[]> {
    const subcategories = await TransactionSubcategoryCollection.find();
    return subcategories.map( (subcategory) => {
      return new TransactionSubcategory({...subcategory.toObject(), id: subcategory._id.toString()})
    })
  }

  async save(transactionSubcategory: ISaveSubcategoryDTO): Promise<TransactionSubcategory> {
    const subcategory = await TransactionSubcategoryCollection.create(transactionSubcategory)
    return new TransactionSubcategory({...subcategory.toObject(), id: subcategory._id.toString()})
  }

  async update(transactionSubcategory: IUpdateSubcategoryDTO): Promise<void> {
    const subcategory = await TransactionSubcategoryCollection.findOneAndUpdate({_id: transactionSubcategory.id},transactionSubcategory)
    if(!subcategory) throw new RepositoryNotFound()
    new TransactionSubcategory({...subcategory.toObject(), id: subcategory._id.toString()})
  }

}

export default TransactionSubcategoryRepository;
