import {Router} from 'express';
import transactionRouter from "./application/Transactions/adapters/routes"

const router = Router();

router.all("/test",((req, res) => {
  console.log("Test: OK")
  return res.status(200).send()
}))

router.use("/transactions/", transactionRouter)


export default router;
