import express from 'express';
import transactionCategoryRouter from './transactionCategoryRouter';
import transactionSubcategoryRouter from './transactionSubcategoryRouter';

const router = express.Router();

router.use("/categories/", transactionCategoryRouter)
router.use("/subcategories/", transactionSubcategoryRouter)


export default router;
