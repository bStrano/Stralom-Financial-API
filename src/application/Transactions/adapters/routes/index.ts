import express from 'express';
import transactionCategoryRouter from './TransactionCategory/transactionCategoryRouter';

const router = express.Router();


router.use("/categories/", transactionCategoryRouter)


export default router;
