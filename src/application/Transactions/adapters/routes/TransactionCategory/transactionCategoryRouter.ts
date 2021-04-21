import express from 'express';
import ExpressAdapter from '../../../../../infra/adapters/ExpressAdapter';

import ITransactionCategoryController from '../../controllers/ITransactionCategoryController';
import Symbols from '../../../config/Symbols';
import container from '../../../../../infra/config/inversify.config';


const router = express.Router();

const transactionController = container.get<ITransactionCategoryController>(Symbols.TransactionCategoryController)

router.get('/', ExpressAdapter.handle(async () =>  await transactionController.findAll() ));
router.post('/', ExpressAdapter.handle(async (data: any) => transactionController.save(data)));
router.delete('/:id', ExpressAdapter.handle(async (data: any) => transactionController.delete(data)));
router.patch('/:id', ExpressAdapter.handle(async (data: any) => transactionController.update(data)));


export default router;
