import { IUserModel } from '../../../models/user.model.js';

export interface IUserLoginRequest {
	email: string;
	password: string;
}

export interface IUserUpdateRegisterRequest extends IUserModel {}
