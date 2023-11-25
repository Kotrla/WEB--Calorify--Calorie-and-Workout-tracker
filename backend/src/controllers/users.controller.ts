import { NextFunction, Request, Response } from 'express';
import { IUserLoginResponse, IUserResponse } from '../ts/models/response/users-responses.model';
import { addUser, getUserByEmail, getUserById, updateUserById } from '../services/users.service';
import { IUserLoginRequest, IUserUpdateRegisterRequest } from '../ts/models/request/users-requests.model';
import { generateNewUserFromRequest, generateUpdatedUserFromRequest, isCorrectPassword, signJwt } from '../helpers/users.helper';

export const getUser = async (req: Request<{}, IUserResponse, {}>, res: Response, next: NextFunction) => {
  try {
    const { _id: userId } = req.user;
    const user = await getUserById(userId);

    res.send({ user });
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
    const user = await addUser(newUser);

    res.send(user);
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
    const user = await updateUserById(userId, updatedUser);

    res.send(user);
  } catch (e) {
    next(e);
  }
};

export const updateMacros = async (req: Request<{}, IUserResponse, IUserUpdateRegisterRequest>, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const { _id: userId } = req.user;
    const users = await updateUserById(userId, userData);

    res.send(users);
  } catch (e) {
    next(e);
  }
};
