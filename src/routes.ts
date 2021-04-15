import {Router} from 'express';

const router = Router();

router.post("/test",((req, res, next) => {
  return res.status(200).send()
}))

export default router;
