import ITransactionCategoryController from '../ITransactionCategoryController';
import TransactionCategory from '../../../entities/TransactionCategory/TransactionCategory';
import {inject, injectable} from 'inversify';
import Symbols from '../../../config/Symbols';
import ITransactionCategoryService from '../../../useCases/ITransactionCategoryService';

@injectable()
class TransactionCategoryController implements ITransactionCategoryController {
  private readonly _service: ITransactionCategoryService;


  constructor(
    @inject(Symbols.ITransactionCategoryService) service: ITransactionCategoryService
  ) {
    console.log("Repository", Symbols.ITransactionCategoryService,service);
      this._service = service;
  }

  delete(id: number): Promise<void> {
    return this._service.delete(id);
  }

  findAll(): Promise<TransactionCategory[]> {
    return  this._service.findAll();
  }

  save(): Promise<TransactionCategory> {
    return this._service.save();
  }


}
export default TransactionCategoryController;
