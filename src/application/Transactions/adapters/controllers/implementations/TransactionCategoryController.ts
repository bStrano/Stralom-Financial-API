import ITransactionCategoryController from '../ITransactionCategoryController';
import TransactionCategory from '../../../entities/TransactionCategory/TransactionCategory';
import {inject, injectable} from 'inversify';
import Symbols from '../../../config/Symbols';
import ITransactionCategoryService from '../../../useCases/ITransactionCategoryService';
import ISaveCategoryDTO from '../../../mappers/TransactionCategory/ISaveCategoryDTO';
import IDeleteCategoryDTO from '../../../mappers/TransactionCategory/IDeleteCategoryDTO';
import IUpdateCategoryDTO from '../../../mappers/TransactionCategory/IUpdateCategoryDTO';
import TransactionCategoryValidator from '../validators/TransactionCategoryValidator';

@injectable()
class TransactionCategoryController implements ITransactionCategoryController {
  private readonly _service: ITransactionCategoryService;


  constructor(
    @inject(Symbols.TransactionCategoryService) service: ITransactionCategoryService
  ) {
      this._service = service;
  }

  async delete(transactionCategory: IDeleteCategoryDTO): Promise<void> {
    await TransactionCategoryValidator.validateDelete(transactionCategory);
    return await this._service.delete(transactionCategory);
  }

  async findAll(subcategories: boolean): Promise<TransactionCategory[]> {
    if(subcategories) {
      return await this._service.findAllWithSubcategories()
    } else {
      return await this._service.findAll();
    }
  }

  async save(transactionCategory: ISaveCategoryDTO): Promise<TransactionCategory> {
      await TransactionCategoryValidator.validateSave(transactionCategory);
      return this._service.save(transactionCategory);
  }

  async update(transactionCategory: IUpdateCategoryDTO): Promise<TransactionCategory> {
    await TransactionCategoryValidator.validateUpdate(transactionCategory);
    return this._service.update(transactionCategory);
  }


}
export default TransactionCategoryController;
