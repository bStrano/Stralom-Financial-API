import ITransactionCategoryService from '../ITransactionCategoryService';
import TransactionCategory from '../../entities/TransactionCategory/TransactionCategory';
import ITransactionCategoryRepository from '../../adapters/repositories/ITransactionCategoryRepository';
import {inject, injectable} from 'inversify';
import Symbols from '../../config/Symbols';


@injectable()
class TransactionCategoryService implements ITransactionCategoryService {
  private repository;


  constructor(@inject(Symbols.TransactionCategoryRepository)repository: ITransactionCategoryRepository) {
    this.repository = repository;
  }


  delete(id: number): Promise<void> {
    throw new Error("Not implemented yet")
  }

  async findAll(): Promise<TransactionCategory[]> {
    let res = await this.repository.findAll();
    console.log(res);
    return res;
  }

  save(): Promise<TransactionCategory> {
    throw new Error("Not implemented yet")
  }


}

export default TransactionCategoryService;
