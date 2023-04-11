import { Request, Response } from 'express';
import { IUserLoginResponse, IUserResponse } from '../ts/models/response/users-responses.model';
import { addUser, getUserByEmail, getUserById, updateUserById } from '../services/users.service';
import { IUserLoginRequest, IUserUpdateRegisterRequest } from '../ts/models/request/users-requests.model';
import { generateNewUserFromRequest, generateUpdatedUserFromRequest, isCorrectPassword, signJwt } from '../helpers/users.helper';

export const getUser = async (req: Request<{}, IUserResponse, {}>, res: Response) => {
  const { _id: userId } = req.user;
  const user = await getUserById(userId);

  res.send(user);
};

export const registerUser = async (req: Request<{}, IUserResponse, IUserUpdateRegisterRequest>, res: Response) => {
  const { email } = req.body.credentials;
  const isUserPresent = await getUserByEmail(email);

  if (isUserPresent) {
    return res.status(455).send('Email already in use');
  }

  const newUser = await generateNewUserFromRequest(req);
  const user = await addUser(newUser);

  return res.send(user);
};

export const loginUser = async (req: Request<{}, IUserLoginResponse, IUserLoginRequest>, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return res.status(400).send('Incorect credentials');
    }

    const isPasswordMatching = await isCorrectPassword(password, existingUser);

    if (!isPasswordMatching) {
      return res.status(400).send('Incorect credentials');
    }

    const token = signJwt(existingUser);

    return res.send({ token });
  } catch (e) {
    return res.status(400).send('Login failed');
  }
};

export const updateUser = async (req: Request<{}, IUserResponse, IUserUpdateRegisterRequest>, res: Response) => {
  const { _id: userId } = req.user;
  const updatedUser = generateUpdatedUserFromRequest(req);
  const user = await updateUserById(userId, updatedUser);

  res.send(user);
};

export const updateMacros = async (req: Request<{}, IUserResponse, IUserUpdateRegisterRequest>, res: Response) => {
  const userData = req.body;
  const { _id: userId } = req.user;
  const users = await updateUserById(userId, userData);

  res.send(users);
};
