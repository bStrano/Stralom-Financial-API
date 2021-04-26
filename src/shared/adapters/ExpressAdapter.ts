import RequestError from '../errors/RequestError';
import {Request, Response} from 'express';
import {ValidationError} from 'yup';

type ExpressCallback = (data: any) => any;

class ExpressAdapter {
  static  handle (fn: ExpressCallback ) {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return async function (req: Request, res: Response,onError?: (error: RequestError | Error) => void ) {
      try {
        console.log("Teste")
        const obj = await fn( {...req.body, ...req.params});
        console.log("Teste 2",obj)
        res.json(obj);
      } catch (e) {
        console.log("Catch error")
        // console.error(e);
        console.error("ERROOO");
        if(e instanceof RequestError){
          res.status(e.httpStatus).json(e.message);
        } else if ( e instanceof ValidationError) {
          console.error("XXX",e);
          res.status(400).json(e)
        } else {
          res.status(500).json("Unexpected Error");
        }
      }
    }
  }
}

export default ExpressAdapter;
