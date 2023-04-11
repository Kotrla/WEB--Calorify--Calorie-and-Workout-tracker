import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { IUserModel, getAge } from '../models/user.model';
import { calculateMacros } from '../utils/macroFunctions';
import { IUserResponse } from 'ts/models/response/users-responses.model';
import { IUserUpdateRegisterRequest } from 'ts/models/request/users-requests.model';

export async function getEncryptedPassword(password: string) {
  const { SALT } = process.env;
  const generatedSalt = await bcrypt.genSalt(Number(SALT));

  return bcrypt.hash(password, generatedSalt);
}

export function isCorrectPassword(password: string, user: IUserModel) {
  const { password: userPassword } = user.credentials;

  return bcrypt.compare(password, userPassword);
}

export function signJwt(user: IUserModel) {
  const { _id: userId } = user;
  const jwtSecret = process.env.JWT_SECRET || '';

  return jwt.sign({ _id: userId }, jwtSecret, { expiresIn: '365d' });
}

export async function generateNewUserFromRequest(req: Request<{}, IUserResponse, IUserUpdateRegisterRequest>) {
  const { personal, credentials, stats } = req.body;
  const { gender, goal, date } = personal;
  const { password } = credentials;
  const { height, weight } = stats;

  const calculatedAge = getAge(date);
  const encryptedPassword = await getEncryptedPassword(password);
  const { protein, carbs, fats, kcal } = calculateMacros(weight, height, gender, calculatedAge, goal);

  return {
    personal: { ...personal, age: calculatedAge }, needs: { protein, carbs, fats, kcal },
    credentials: { ...credentials, password: encryptedPassword }, stats
  };
}

export function generateUpdatedUserFromRequest(req: Request<{}, IUserResponse, IUserUpdateRegisterRequest>) {
  const { personal, credentials, stats } = req.body;
  const { height, weight } = stats;
  const { gender, goal, date } = personal;

  const calculatedAge = getAge(date);
  const { protein, carbs, fats, kcal } = calculateMacros(weight, height, gender, calculatedAge, goal);

  return {
    personal: { ...personal, age: calculatedAge }, credentials,
    stats, needs: { protein, carbs, fats, kcal }
  };
}
