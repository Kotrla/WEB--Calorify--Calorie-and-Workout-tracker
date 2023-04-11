import { IUserModel } from '../../../models/user.model';

export interface IUserResponse extends IUserModel { }

export interface IUserLoginResponse {
  token: string;
}
