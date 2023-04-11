import { IUserModel } from '../../../models/user.model';

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUserUpdateRegisterRequest extends IUserModel {}
