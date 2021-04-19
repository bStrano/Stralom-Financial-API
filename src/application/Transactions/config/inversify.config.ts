import {Container} from 'inversify';
import Symbols from './Symbols';
import TransactionCategoryRepository from '../adapters/repositories/implementations/TransactionCategoryRepository';
import TransactionCategoryController from '../adapters/controllers/implementations/TransactionCategoryController';
import TransactionCategoryService from '../useCases/implementations/TransactionCategoryService';
import ITransactionCategoryRepository from '../adapters/repositories/ITransactionCategoryRepository';
import ITransactionCategoryController from '../adapters/controllers/ITransactionCategoryController';
import ITransactionCategoryService from '../useCases/ITransactionCategoryService';


const container = new Container();
container.bind<ITransactionCategoryService>(Symbols.ITransactionCategoryService).to(TransactionCategoryService);
container.bind<ITransactionCategoryController>(Symbols.TransactionCategoryController).to(TransactionCategoryController);

container.bind<ITransactionCategoryRepository>(Symbols.TransactionCategoryRepository).to(TransactionCategoryRepository);
// container.bind<ITransactionCategoryRepository>(Symbols.TransactionCategoryRepository).to(TransactionCategoryRepositoryMemory);

export default container;
