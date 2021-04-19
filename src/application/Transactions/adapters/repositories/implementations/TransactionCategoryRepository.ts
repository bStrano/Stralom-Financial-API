import TransactionCategory from '../../../entities/TransactionCategory/TransactionCategory';
import ITransactionCategoryRepository from '../ITransactionCategoryRepository';
import {injectable} from 'inversify';
import TransactionCategoryCollection from '../../../../../infra/schemas/TransactionCategory';

@injectable()
class TransactionCategoryRepository implements ITransactionCategoryRepository{

  async delete(id: number): Promise<void> {
    throw new Error("Not implemented yet.")
  }

  async findAll(): Promise<TransactionCategory[]> {
    return TransactionCategoryCollection.find();
  }

  async save(): Promise<TransactionCategory> {
    throw new Error("Not implemented yet.")
  }

}

export default TransactionCategoryRepository;
