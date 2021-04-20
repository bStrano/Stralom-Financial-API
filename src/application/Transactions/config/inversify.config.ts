import {Container, ContainerModule, interfaces} from 'inversify';
import Symbols from './Symbols';
import TransactionCategoryRepository from '../adapters/repositories/implementations/TransactionCategoryRepository';
import TransactionCategoryController from '../adapters/controllers/implementations/TransactionCategoryController';
import TransactionCategoryService from '../useCases/implementations/TransactionCategoryService';
import ITransactionCategoryRepository from '../adapters/repositories/ITransactionCategoryRepository';
import ITransactionCategoryController from '../adapters/controllers/ITransactionCategoryController';
import ITransactionCategoryService from '../useCases/ITransactionCategoryService';
import TransactionCategoryRepositoryMemory from '../adapters/repositories/memory/TransactionCategoryRepositoryMemory';



const containerTransactionCategory = new ContainerModule(((bind) => {
  bind<ITransactionCategoryService>(Symbols.TransactionCategoryService).to(TransactionCategoryService);
  bind<ITransactionCategoryController>(Symbols.TransactionCategoryController).to(TransactionCategoryController);
  bind<ITransactionCategoryRepository>(Symbols.TransactionCategoryRepository).to(TransactionCategoryRepository);
  bind<ITransactionCategoryRepository>(Symbols.TransactionCategoryRepositoryMemory).to(TransactionCategoryRepositoryMemory);
}));


export default containerTransactionCategory;
