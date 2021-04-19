import {Router} from 'express';

const router = Router();
import transactionRouter from "./application/Transactions/adapters/routes"

router.all("/test",((req, res, next) => {
  console.log("Test: OK")
  return res.status(200).send()
}))

router.use("/transactions/", transactionRouter)


export default router;
