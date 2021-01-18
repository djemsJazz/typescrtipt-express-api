/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction, Request } from 'express';
import HttpException from '../exceptions/HttpException';

const errorMidelware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
  const { stack } = error;
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  return response.status(status).send({ status, message, stack });
};

export default errorMidelware;
