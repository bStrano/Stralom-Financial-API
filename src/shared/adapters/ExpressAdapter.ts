import RequestError from '../errors/RequestError';
import {Request, Response} from 'express';
import {ValidationError} from 'yup';

type ExpressCallback = (data: any) => any;

class ExpressAdapter {
  static  handle (fn: ExpressCallback ) {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return async function (req: Request, res: Response,onError?: (error: RequestError | Error) => void ) {
      try {
        const obj = await fn( {...req.body, ...req.params, user: req.user?.id});

        res.json(obj);
      } catch (e) {
        console.error(e)
        if(onError) {
          onError(e);
        }
        if(e instanceof RequestError){
          res.status(e.httpStatus).json(e.message);
        } else if ( e instanceof ValidationError) {
          res.status(400).json(e)
        } else {
          res.status(500).json("Unexpected Error " + e);
        }
      }
    }
  }
}

export default ExpressAdapter;
