import express from 'express';
import transactionCategoryRouter from './TransactionCategory/transactionCategoryRouter';
import transactionSubcategoryRouter from './TransactionSubcategory/transactionSubcategoryRouter';

const router = express.Router();

router.use("/categories/", transactionCategoryRouter)
router.use("/subcategories/", transactionSubcategoryRouter)


export default router;
