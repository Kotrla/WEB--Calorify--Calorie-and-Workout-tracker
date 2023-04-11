import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IRequestUserInterface, IUserAuthInfoRequest } from '../ts/models/request/user-auth-info-request.model';

export const requireLogin = (request: Request, res: Response, next: NextFunction) => {
  try {
    const req = request as IUserAuthInfoRequest;

    if (!req.headers.authorization) {
      throw new Error('Unauthorized access');
    }

    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET || '');

    req.user = decode as IRequestUserInterface;

    return next();
  } catch (err) {
    return res.status(400).send('Unauthorized access');
  }
};
