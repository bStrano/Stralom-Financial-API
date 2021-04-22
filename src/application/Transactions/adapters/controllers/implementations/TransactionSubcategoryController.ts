import ITransactionSubcategoryController from '../ITransactionSubcategoryController';
import IDeleteSubcategoryDTO from '../../../mappers/TransactionSubcategory/IDeleteSubcategoryDTO';
import ISaveSubcategoryDTO from '../../../mappers/TransactionSubcategory/ISaveSubcategoryDTO';
import IUpdateSubcategoryDTO from '../../../mappers/TransactionSubcategory/IUpdateSubcategoryDTO';
import TransactionSubcategory from '../../../entities/TransactionSubcategory/TransactionSubcategory';
import {inject, injectable} from 'inversify';
import Symbols from '../../../config/Symbols';
import ITransactionSubcategoryService from '../../../useCases/ITransactionSubcategoryService';

@injectable()
class TransactionSubcategoryController implements ITransactionSubcategoryController{
  private readonly _service;

  constructor(
    @inject(Symbols.TransactionSubcategoryService) service: ITransactionSubcategoryService
  ) {
    this._service = service;
  }

  async delete(transactionSubcategoryDelete: IDeleteSubcategoryDTO): Promise<void> {
    this._service.delete(transactionSubcategoryDelete);
  }

  async findAll(): Promise<TransactionSubcategory[]> {
    return this._service.findAll();
  }

  async save(transactionSubcategorySave: ISaveSubcategoryDTO): Promise<TransactionSubcategory> {
    return this._service.save(transactionSubcategorySave);
  }

  async update(transactionSubcategoryUpdate: IUpdateSubcategoryDTO): Promise<void> {
    return this._service.update(transactionSubcategoryUpdate);
  }

}

export default TransactionSubcategoryController;
