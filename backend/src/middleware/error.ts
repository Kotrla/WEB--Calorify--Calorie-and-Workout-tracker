import { Error } from 'mongoose';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const errMsg = err.message || 'Something went wrong';

  res.status(500).json({
    message: errMsg
  });
};
