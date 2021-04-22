import express from 'express';
import ExpressAdapter from '../../../../../infra/adapters/ExpressAdapter';

import Symbols from '../../../config/Symbols';
import container from '../../../../../infra/config/inversify.config';
import ITransactionSubcategoryController from '../../controllers/ITransactionSubcategoryController';


const router = express.Router();

const transactionSubcategoryController = container.get<ITransactionSubcategoryController>(Symbols.TransactionSubcategoryController)

// router.post('/', ExpressAdapter.handle(async (data: any) => transactionSubcategoryController.save(data)));
router.get('/', ExpressAdapter.handle(async (data) => await transactionSubcategoryController.findAll() ));
router.get('/', ExpressAdapter.handle(transactionSubcategoryController.findAll ));
// router.delete('/:id', ExpressAdapter.handle(async (data: any) => transactionSubcategoryController.delete(data)));
router.patch('/:id', ExpressAdapter.handle(async (data: any) => transactionSubcategoryController.update(data)));


export default router;
