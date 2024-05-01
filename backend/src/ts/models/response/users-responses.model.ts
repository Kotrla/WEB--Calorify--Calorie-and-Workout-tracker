import { IUserModel } from '../../../models/user.model.js';

export interface IUserResponse extends IUserModel {}

export interface IUserLoginResponse {
	token: string;
}
