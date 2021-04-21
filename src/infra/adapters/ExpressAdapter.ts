import RequestError from '../../shared/errors/RequestError';
import {Request, Response} from 'express';

class ExpressAdapter {
  static  handle (fn: (data:unknown) => unknown ) {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return async function (req: Request, res: Response,onError?: (error: RequestError | Error) => void ) {
      try {
        const obj = await fn( {...req.body, ...req.params});
        res.json(obj);
      } catch (e) {
        console.error(e);
        if(e instanceof RequestError){
          res.status(e.httpStatus).json(e.message);
        } else {
          res.status(500).json("Unexpected Error");
        }
      }
    }
  }
}

export default ExpressAdapter;
