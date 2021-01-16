import { Request, Response, NextFunction } from 'express';

const loggerMidelware = (req: Request, res: Response, next: NextFunction) => {
  console.log('\x1b[32m%s\x1b[0m',`${req.method} [${req.path}] ==> ${`${res.statusCode}`}`);
  next();
}

export default loggerMidelware;