import {ContainerModule} from 'inversify';
import Symbols from './Symbols';
import TransactionCategoryRepository from '../adapters/repositories/implementations/TransactionCategoryRepository';
import TransactionCategoryController from '../adapters/controllers/implementations/TransactionCategoryController';
import TransactionCategoryService from '../useCases/implementations/TransactionCategoryService';
import ITransactionCategoryRepository from '../adapters/repositories/ITransactionCategoryRepository';
import ITransactionCategoryController from '../adapters/controllers/ITransactionCategoryController';
import ITransactionCategoryService from '../useCases/ITransactionCategoryService';
import TransactionSubcategoryService from '../useCases/implementations/TransactionSubcategoryService';
import ITransactionSubcategoryService from '../useCases/ITransactionSubcategoryService';
import ITransactionSubcategoryController from '../adapters/controllers/ITransactionSubcategoryController';
import TransactionSubcategoryController from '../adapters/controllers/implementations/TransactionSubcategoryController';
import TransactionSubcategoryRepository
  from '../adapters/repositories/implementations/TransactionSubcategoryRepository';
import ITransactionSubcategoryRepository from '../adapters/repositories/ITransactionSubcategoryRepository';
// import TransactionCategoryRepositoryMemory from '../adapters/repositories/memory/TransactionCategoryRepositoryMemory';



const containerTransactionCategory = new ContainerModule(((bind) => {
  bind<ITransactionCategoryService>(Symbols.TransactionCategoryService).to(TransactionCategoryService);
  bind<ITransactionCategoryController>(Symbols.TransactionCategoryController).to(TransactionCategoryController);
  bind<ITransactionCategoryRepository>(Symbols.TransactionCategoryRepository).to(TransactionCategoryRepository);
  // bind<ITransactionCategoryRepository>(Symbols.TransactionCategoryRepositoryMemory).to(TransactionCategoryRepositoryMemory);

  bind<ITransactionSubcategoryService>(Symbols.TransactionSubcategoryService).to(TransactionSubcategoryService);
  bind<ITransactionSubcategoryController>(Symbols.TransactionSubcategoryController).to(TransactionSubcategoryController);
  bind<ITransactionSubcategoryRepository>(Symbols.TransactionSubcategoryRepository).to(TransactionSubcategoryRepository);
}));


export default containerTransactionCategory;
