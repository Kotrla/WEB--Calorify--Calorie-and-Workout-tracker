import { NextFunction, Request, Response } from 'express';
import { IUserResponse, IUserLoginResponse } from '../ts/models/response/users-responses.model.js';
import { getUserById, getUserByEmail, addUser, updateUserById } from '../services/users.service.js';
import { IUserUpdateRegisterRequest, IUserLoginRequest } from '../ts/models/request/users-requests.model.js';
import { generateNewUserFromRequest, isCorrectPassword, signJwt, generateUpdatedUserFromRequest } from '../helpers/users.helper.js';

export const getUser = async (req: Request<{}, IUserResponse, {}>, res: Response, next: NextFunction) => {
	try {
		const { _id: userId } = req.user;
		const userData = await getUserById(userId);

		res.send({ userData });
	} catch (e) {
		next(e);
	}
};

export const registerUser = async (req: Request<{}, IUserResponse, IUserUpdateRegisterRequest>, res: Response, next: NextFunction) => {
	try {
		const { email } = req.body.credentials;
		const isUserPresent = await getUserByEmail(email);

		if (isUserPresent) {
			res.status(455).send('Email already in use');

			return;
		}

		const newUser = await generateNewUserFromRequest(req);
		const userData = await addUser(newUser);

		res.send({ userData });
	} catch (e) {
		next(e);
	}
};

export const loginUser = async (req: Request<{}, IUserLoginResponse, IUserLoginRequest>, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		const existingUser = await getUserByEmail(email);

		if (!existingUser) {
			res.status(400).send('Incorect credentials');

			return;
		}

		const isPasswordMatching = await isCorrectPassword(password, existingUser);

		if (!isPasswordMatching) {
			res.status(400).send('Incorect credentials');

			return;
		}

		const token = signJwt(existingUser);

		res.send({ token });
	} catch (e) {
		next(e);
	}
};

export const updateUser = async (req: Request<{}, IUserResponse, IUserUpdateRegisterRequest>, res: Response, next: NextFunction) => {
	try {
		const { _id: userId } = req.user;
		const updatedUser = generateUpdatedUserFromRequest(req);
		const userData = await updateUserById(userId, updatedUser);

		res.send({ userData });
	} catch (e) {
		next(e);
	}
};

export const updateMacros = async (req: Request<{}, IUserResponse, IUserUpdateRegisterRequest>, res: Response, next: NextFunction) => {
	try {
		const user = req.body;
		const { _id: userId } = req.user;
		const userData = await updateUserById(userId, user);

		res.send({ userData });
	} catch (e) {
		next(e);
	}
};
