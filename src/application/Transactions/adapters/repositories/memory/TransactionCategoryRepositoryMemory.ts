import ITransactionCategoryRepository from '../ITransactionCategoryRepository';
import TransactionCategory from '../../../entities/TransactionCategory/TransactionCategory';
import {injectable} from 'inversify';

@injectable()
class TransactionCategoryRepositoryMemory implements ITransactionCategoryRepository{

  categories = [
    new TransactionCategory({name: "Test Category 1", icon: "check", color: "red"})
  ]


  delete(id: number): Promise<void> {
    return new Promise( (resolve,reject) => {
        this.categories.pop()
    })
  }

  findAll(): Promise<TransactionCategory[]> {
    return new Promise( (resolve,reject) => {
      resolve(this.categories);
    })
  }

  save(): Promise<TransactionCategory> {
    return new Promise( (resolve,reject) => {
      this.categories.push(new TransactionCategory({name: "Test Category 2", icon: "check", color: "red"}))
    })
  }

}

export default TransactionCategoryRepositoryMemory;
