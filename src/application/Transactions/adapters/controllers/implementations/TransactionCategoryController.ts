import ITransactionCategoryController from '../ITransactionCategoryController';
import TransactionCategory from '../../../entities/TransactionCategory/TransactionCategory';
import {inject, injectable} from 'inversify';
import Symbols from '../../../config/Symbols';
import ITransactionCategoryService from '../../../useCases/ITransactionCategoryService';
import ISaveCategoryDTO from '../../../mappers/TransactionCategory/ISaveCategoryDTO';
import IDeleteCategoryDTO from '../../../mappers/TransactionCategory/IDeleteCategoryDTO';
import IUpdateCategoryDTO from '../../../mappers/TransactionCategory/IUpdateCategoryDTO';

@injectable()
class TransactionCategoryController implements ITransactionCategoryController {
  private readonly _service: ITransactionCategoryService;


  constructor(
    @inject(Symbols.TransactionCategoryService) service: ITransactionCategoryService
  ) {
      this._service = service;
  }

  async delete(transactionCategory: IDeleteCategoryDTO): Promise<void> {
    return await this._service.delete(transactionCategory);
  }

  async findAll(): Promise<TransactionCategory[]> {
    return await this._service.findAll();
  }

  async save(transactionCategory: ISaveCategoryDTO): Promise<TransactionCategory> {
    return this._service.save(transactionCategory);
  }

  async update(transactionCategory: IUpdateCategoryDTO): Promise<void> {
    await this._service.update(transactionCategory);
  }


}
export default TransactionCategoryController;
