import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IUserAuthInfoRequest extends Request {
  user: IRequestUserInterface;
}

export interface IRequestUserInterface extends JwtPayload {
  _id: string;
}
