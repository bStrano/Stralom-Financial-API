import ITransactionCategoryService from '../ITransactionCategoryService';
import TransactionCategory from '../../entities/TransactionCategory/TransactionCategory';
import ITransactionCategoryRepository from '../../adapters/repositories/ITransactionCategoryRepository';
import {inject, injectable} from 'inversify';
import Symbols from '../../config/Symbols';
import ISaveCategoryDTO from '../../mappers/TransactionCategory/ISaveCategoryDTO';
import IDeleteCategoryDTO from '../../mappers/TransactionCategory/IDeleteCategoryDTO';
import IUpdateCategoryDTO from '../../mappers/TransactionCategory/IUpdateCategoryDTO';


@injectable()
class TransactionCategoryService implements ITransactionCategoryService {
  private repository;


  constructor(@inject(Symbols.TransactionCategoryRepository)repository: ITransactionCategoryRepository) {
    this.repository = repository;
  }


  async delete(transactionCategory: IDeleteCategoryDTO): Promise<void> {
    await this.repository.delete(transactionCategory.id);
  }

  async findAll(): Promise<TransactionCategory[]> {
    return await this.repository.findAll();
  }

  async save(transactionCategory: ISaveCategoryDTO): Promise<TransactionCategory> {
    return  await this.repository.save(transactionCategory);
  }

  async update(transactionCategory: IUpdateCategoryDTO): Promise<void> {
    await this.repository.update(transactionCategory);
  }


}

export default TransactionCategoryService;
