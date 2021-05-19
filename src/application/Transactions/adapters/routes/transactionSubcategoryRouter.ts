import express from 'express';
import ExpressAdapter from '../../../../shared/adapters/ExpressAdapter';

import Symbols from '../../config/Symbols';
import container from '../../../../infra/config/inversify.config';
import ITransactionSubcategoryController from '../controllers/ITransactionSubcategoryController';
import {authenticateToken} from '../../../../middlewares/auth.middleware';


const router = express.Router();

const transactionSubcategoryController = container.get<ITransactionSubcategoryController>(Symbols.TransactionSubcategoryController)

router.use(authenticateToken)
router.post('/', ExpressAdapter.handle(transactionSubcategoryController.save.bind(transactionSubcategoryController)));
router.get('/', ExpressAdapter.handle(transactionSubcategoryController.findAll.bind(transactionSubcategoryController) ));
router.delete('/:id', ExpressAdapter.handle(transactionSubcategoryController.delete.bind(transactionSubcategoryController)));
router.patch('/:id', ExpressAdapter.handle(transactionSubcategoryController.update.bind(transactionSubcategoryController)));


export default router;
