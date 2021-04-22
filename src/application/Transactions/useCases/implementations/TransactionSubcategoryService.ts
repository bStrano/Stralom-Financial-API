import ITransactionSubcategoryService from '../ITransactionSubcategoryService';
import IDeleteSubcategoryDTO from '../../mappers/TransactionSubcategory/IDeleteSubcategoryDTO';
import TransactionSubcategory from '../../entities/TransactionSubcategory/TransactionSubcategory';
import ISaveSubcategoryDTO from '../../mappers/TransactionSubcategory/ISaveSubcategoryDTO';
import IUpdateSubcategoryDTO from '../../mappers/TransactionSubcategory/IUpdateSubcategoryDTO';
import {inject, injectable} from 'inversify';
import Symbols from '../../config/Symbols';
import ITransactionSubcategoryRepository from '../../adapters/repositories/ITransactionSubcategoryRepository';

@injectable()
class TransactionSubcategoryService implements ITransactionSubcategoryService{
  private readonly repository;

  constructor(@inject(Symbols.TransactionSubcategoryRepository)repository: ITransactionSubcategoryRepository) {
    this.repository = repository;
  }

  delete(transactionSubcategory: IDeleteSubcategoryDTO): Promise<void> {
    return this.repository.delete(transactionSubcategory.id);
  }

  findAll(): Promise<TransactionSubcategory[]> {
    return this.repository.findAll();
  }

  save(transactionSubcategory: ISaveSubcategoryDTO): Promise<TransactionSubcategory> {
    return this.repository.save(transactionSubcategory);
  }

  update(transactionSubcategory: IUpdateSubcategoryDTO): Promise<void> {
    return this.repository.update(transactionSubcategory)
  }

}

export default TransactionSubcategoryService;

