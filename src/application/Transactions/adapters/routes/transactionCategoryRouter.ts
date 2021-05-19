import express from 'express';
import ExpressAdapter from '../../../../shared/adapters/ExpressAdapter';

import ITransactionCategoryController from '../controllers/ITransactionCategoryController';
import Symbols from '../../config/Symbols';
import container from '../../../../infra/config/inversify.config';
import {authenticateToken} from '../../../../middlewares/auth.middleware';


const router = express.Router();

const transactionController = container.get<ITransactionCategoryController>(Symbols.TransactionCategoryController)

router.use(authenticateToken)
router.get('/', ExpressAdapter.handle(transactionController.findAll.bind(transactionController)));
router.post('/', ExpressAdapter.handle(transactionController.save.bind(transactionController)));
router.delete('/:id', ExpressAdapter.handle(transactionController.delete.bind(transactionController)));
router.patch('/:id', ExpressAdapter.handle(transactionController.update.bind(transactionController)));


export default router;
