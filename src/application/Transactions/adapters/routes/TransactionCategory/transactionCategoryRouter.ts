import express from 'express';
import ExpressAdapter from '../../../../../infra/adapters/ExpressAdapter';
import container from '../../../config/inversify.config';
import ITransactionCategoryController from '../../controllers/ITransactionCategoryController';
import Symbols from '../../../config/Symbols';


const router = express.Router();

const transactionController = container.get<ITransactionCategoryController>(Symbols.TransactionCategoryController)

router.get('/', ExpressAdapter.handle(async () =>  await transactionController.findAll() ));
// router.get('/', ExpressAdapter.handle(transactionController.findAll ));
router.post('/', ExpressAdapter.handle(transactionController.save));
router.delete('/:id', ExpressAdapter.handle(transactionController.delete));


export default router;
